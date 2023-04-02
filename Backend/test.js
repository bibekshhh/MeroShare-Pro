import {
  getAuthToken,
  getIPOList,
  getBankId,
  getMyDetails,
  getOwnDetails,
  getShareDetails,
} from "./utils";

async function applyIPO() {
  const token = await getAuthToken(130, "", "");
  if (!token) return;
  console.log(await getBankId(token));
  process.exit(1);
}

applyIPO();
