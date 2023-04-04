import {
  getAuthToken,
  getOwnDetails,
  getIPOList,
  getShareDetails,
  getBankId,
  getMyDetails,
  getCustomerId,
} from "./index.js";

import fetch from "node-fetch";

export default async function applyIPO(
  token,
  transactionPin,
  crnNumber,
  appliedKitta,
  companyShareId
) {
  try {
    let demat,
      boid,
      accountNumber,
      customerId,
      accountBranchId,
      bankId;

    const ownDetails = await getOwnDetails(token);
    demat = ownDetails.demat;

    const myDetails = await getMyDetails(token, demat);
    const rawBankId = await getBankId(token);

    bankId = rawBankId[0] ? rawBankId[0].id : undefined;

    let count = 0;
    while (!bankId) {
      // Wait for 2.5 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2500));

      ownDetails = await getOwnDetails(token);
      demat = ownDetails.demat;
      myDetails = await getMyDetails(token, demat);
      
      let rawBankId;
      try {
        rawBankId = await getBankId(token);
      } catch (error) {
        console.error(error);
      }
      
      count++;
      console.log(`Attempt ${count}:`, rawBankId);
      bankId = rawBankId[0] ? rawBankId[0].id : undefined;
    }

    const rawCustomerId = await getCustomerId(token, bankId);
    customerId = rawCustomerId.id;
    accountBranchId = rawCustomerId.accountBranchId;

    boid = ownDetails.boid;

    accountNumber = myDetails.accountNumber;

    const res2 = await fetch(
      "https://webbackend.cdsc.com.np/api/meroShare/applicantForm/share/apply",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          demat,
          boid,
          accountNumber,
          customerId,
          accountBranchId,
          appliedKitta,
          crnNumber,
          transactionPin,
          companyShareId,
          bankId,
        }),
      }
    );

    const data = await res2.json();

    if (res2.status == 409) {
      return {
        success: false,
        error: data.message,
        status: "Conflict",
      };
    }

    if (res2.status >= 400) {
      return {
        success: false,
        error: "Failed to apply IPO due to insufficient permissions.",
      };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
