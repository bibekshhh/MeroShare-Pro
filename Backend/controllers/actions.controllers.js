import axios from "axios";
import fetch from "node-fetch";
import { getAuthToken, getOwnDetails } from "../utils/index.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";
import logout from "../utils/logout.js";

export async function getUpcomingIPOList(req, res) {
  try {
    const raw = JSON.stringify({
      offset: 1,
      limit: "10",
      categoryID: 2,
      portalID: "1",
      cultureCode: "en-US",
      StockSymbol: "",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.nepalipaisa.com/Modules/Investment/webservices/InvestmentService.asmx/GetAllInvestmentInfobyCategoryID",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };

    const resData = await axios.request(config);
    const filteredData = await resData.data.d
      .filter(
        (item) =>
          item.IsActive === true &&
          item.IsDeleted === false &&
          item.CategoryName === "IPO" &&
          new Date(item.StartDateString) > new Date()
      )
      .map((item) => ({
        StartDateNP: item.StartDateNP,
        EndDateNP: item.EndDateNP,
        ShareType: item.ShareType,
        IssueManager: item.IssueManager,
        CompanyName: item.CompanyName,
        StockSymbol: item.StockSymbol,
        StartDateString: item.StartDateString,
        EndDateString: item.EndDateString,
      }));

    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function getProfileData(req, res) {
  try {
    const { clientId, username, password } = req.body;

    if (!clientId || !username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    const token = await getAuthToken(clientId, username, password);
    if (!token) return {success: false, error: 'User not authorized'}

    const applicableIsssueOptions = {
      filterFieldParams: [
        {
          key: "companyIssue.companyISIN.script",
          alias: "Scrip",
        },
        {
          key: "companyIssue.companyISIN.company.name",
          alias: "Company Name",
        },
        {
          key: "companyIssue.assignedToClient.name",
          value: "",
          alias: "Issue Manager",
        },
      ],
      page: 1,
      size: 10,
      searchRoleViewConstants: "VIEW_APPLICABLE_SHARE",
      filterDateParams: [
        {
          key: "minIssueOpenDate",
          condition: "",
          alias: "",
          value: "",
        },
        {
          key: "maxIssueCloseDate",
          condition: "",
          alias: "",
          value: "",
        },
      ],
    };

    const applicableIssueResponse = await fetch(
      "https://webbackend.cdsc.com.np/api/meroShare/companyShare/applicableIssue/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(applicableIsssueOptions),
      }
    );

    const applicableIssueParsedResponse = await applicableIssueResponse.json();

    const rawOwnDetails = await getOwnDetails(token);

    const { clientCode, demat } = rawOwnDetails;

    const data = {
      sortBy: "script",
      demat: [demat],
      clientCode: clientCode,
      page: 1,
      size: 10,
      sortAsc: true,
    };

    const myPortfolioResponse = await fetch(
      "https://webbackend.cdsc.com.np/api/meroShareView/myPortfolio/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      }
    );

    const myPortfolioParsedResponse = await myPortfolioResponse.json();

    if (
      applicableIssueParsedResponse.errorCode == 401 ||
      rawOwnDetails.errorCode == 401 ||
      myPortfolioParsedResponse.errorCode == 401
    ) {
      return res.json({
        success: false,
        error: "Failed to fetch. Refresh the page.",
      });
    }

    res.json({
      success: true,
      myPortfoilio: myPortfolioParsedResponse,
      ownDetails: rawOwnDetails,
      applicableIssues: applicableIssueParsedResponse,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await logout(token);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function getRecentApplications(req, res) {
  const { clientId, username, password } = req.body;

  if (!clientId || !username || !password) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  const bodyData = {
    filterFieldParams: [
      {
        key: "companyShare.companyIssue.companyISIN.script",
        alias: "Scrip",
      },
      {
        key: "companyShare.companyIssue.companyISIN.company.name",
        alias: "Company Name",
      },
    ],
    page: 1,
    size: 200,
    searchRoleViewConstants: "VIEW_APPLICANT_FORM_COMPLETE",
    filterDateParams: [
      {
        key: "appliedDate",
        condition: "",
        alias: "",
        value: "",
      },
      {
        key: "appliedDate",
        condition: "",
        alias: "",
        value: "",
      },
    ],
  };

  let recentApplications;
  let token;
  let retries = 3;

  while (retries > 0) {
    try {
      token = await getAuthToken(clientId, username, password);
      if (!token) {
        return {
          success: false,
          error: "User is not authorized. The password might have expired",
        };
      }

      const myApplicationResponse = await fetch(
        "https://webbackend.cdsc.com.np/api/meroShare/applicantForm/active/search/",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(bodyData),
        }
      );
      
      let recentApplications = await myApplicationResponse.json();

      if (recentApplications.errorCode == 401) {
        throw new Error("Failed to fetch. Refresh the page.");
      }

      // Extract the first 5 objects from the "data" array
      if (!(recentApplications.object)) return recentApplications
      const firstFiveObjects = recentApplications.object.slice(0, 5);
      
      // Create a new object with the first 5 objects and metadata
      const newResponse = {
        object: firstFiveObjects,
        totalCount: firstFiveObjects.length
      };

      // console.log(newResponse.object.length)

      const updatedObject = await Promise.all(newResponse.object.map(async (application) => {
        if (application.statusName === "TRANSACTION_SUCCESS") {
            const res = await fetch(
              `https://webbackend.cdsc.com.np/api/meroShare/applicantForm/report/detail/${application.applicantFormId}`,
              {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  authorization: token,
                },
              }
            );
            
            const resStatus = await res.json();
            if (!resStatus) return application
            if (recentApplications.errorCode == 401) {
              // console.log("Failed to fetch. Refresh the page.");
              return application
            }

            application.allottedStatus = resStatus.statusName;
            return application
        } else {
          return application;
        }
      }));
      
      newResponse.object = updatedObject;  
      // console.log(newResponse)
      return res.status(200).json({success: true, data: newResponse});    
    } catch (error) {
      retries--;
      await logout(token);
      
      if (retries === 0) {
        return res.status(500).json({ success: false, error: error.message });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      await logout(token);
    }
  }

  res.status(200).json({ success: true, data: recentApplications });
}

export async function addAccounts(req, res) {
  try {
    const { name, boid, clientId, username, password, crnNumber } = req.body;

    let { userId } = req.userData;

    if (!name || !boid || !clientId || !username || !password || !crnNumber) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    const token = await getAuthToken(clientId, username, password);
    await logout(token);

    if (!token) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Invalid meroshare credentials provided.",
        });
    }

    const newAccount = new Account({
      userId,
      name,
      boid,
      clientId,
      username,
      password,
      crnNumber,
    });

    await newAccount.save();
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.boid === 1
    ) {
      res.status(409).json({ success: false, error: "BOID already exists." });
    } else {
      res.status(500).json({ success: false, error: "Internal server error." });
    }
  }
}

export async function getAllAccounts(req, res) {
  try {
    let { userId } = req.userData;

    const accounts = await Account.find({ userId });
    res.send(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function editAccount(req, res) {
  try {
    const { accountId, data } = req.body;
    if (!accountId || !data) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }
    let { userId } = req.userData;

    await Account.findByIdAndUpdate(accountId, data, {
      new: true,
    });

    res.json({ success: true, message: "Account updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function deleteAccount(req, res) {
  try {
    const { boid } = req.body;

    if (!boid) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }
    let { userId } = req.userData;

    await Account.deleteOne({
      boid,
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function getShareDetails(req, res) {
  try {
    const { shareId, clientId, username, password } = req.body;

    if (!clientId || !username || !password || shareId) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    const token = await getAuthToken(clientId, username, password);

    const res = await fetch(
      "https://webbackend.cdsc.com.np/api/meroShare/active/" + shareId,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );

    const data = await res.json();
    res.status(200).json({ status: true, data: data });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await logout(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}
