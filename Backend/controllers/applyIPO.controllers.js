import { getAuthToken } from "../utils/index.js";
import applyIPO from "../utils/applyIPO.js";

export async function SingleApplyIPO(req, res) {
  try {
    const {
      name,
      boid,
      clientId,
      username,
      password,
      transactionPin,
      crnNumber,
      appliedKitta,
      companyShareId,
    } = req.body;

    if (
      !name ||
      !boid ||
      !clientId ||
      !username ||
      !password ||
      !transactionPin ||
      !crnNumber ||
      !appliedKitta ||
      !companyShareId
    ) {
      return res
        .status(400)
        .json({ succcess: false, error: "All fields are required." });
    }

    const token = await getAuthToken(clientId, username, password);
    const applyIPOResponse = await applyIPO(
      token,
      transactionPin,
      crnNumber,
      appliedKitta,
      companyShareId
    );

    if( applyIPOResponse.error || applyIPOResponse.status == false ) {
        return res.json({ success: false, error: applyIPOResponse.error })
    }

    res.json({ success: true, message: `Applied Successfully for ${name}.` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}
