import axios from "axios";
import fetch from "node-fetch";
import { getAuthToken, getOwnDetails } from "../utils/index.js";
import User from "../models/User.js";
import Account from "../models/Account.js";
import actionsRouter from "../routes/actions.routes.js";
import mongoose from "mongoose";

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
    console.log("Sent successfully");
    console.log(filteredData);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
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

    res.status(201).json({ success: true, message: "New account added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
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

    await User.updateOne({ _id: accountId, userId }, { ...data });

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
