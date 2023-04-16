import { getAuthToken } from "../utils/index.js";
import applyIPO from "../utils/applyIPO.js";
import logout from "../utils/logout.js";

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
        .json({ success: false, error: "All fields are required." });
    }

    let applyIPOResponse = await getApplyIPOResponse(
      clientId,
      username,
      password,
      transactionPin,
      crnNumber,
      appliedKitta,
      companyShareId
    );

    let retry = 0;
    while (retry <= 2 && applyIPOResponse.status === false) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      applyIPOResponse = await getApplyIPOResponse(
        clientId,
        username,
        password,
        transactionPin,
        crnNumber,
        appliedKitta,
        companyShareId  
      );
      retry++;
    }

    if (applyIPOResponse.error || applyIPOResponse.status === false) {
      return res.json({ success: false, error: applyIPOResponse.error });
    }

    res.json({
      success: true,
      message: `Applied Successfully for ${name}.`,
    });
  } catch (error) {
    console.log(`Something went wrong`);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}

async function getApplyIPOResponse(
  clientId,
  username,
  password,
  transactionPin,
  crnNumber,
  appliedKitta,
  companyShareId
) {
  try {
    const token = await getAuthToken(clientId, username, password);
    if (!token) return { status: false, error: "Account Unauthorized. The password might have expired." }
    const applyIPOResponse = await applyIPO(
      token,
      transactionPin,
      crnNumber,
      appliedKitta,
      companyShareId
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await logout(token);
    return applyIPOResponse;

  } catch (error) {
    console.log("Something went wrong");
    return { status: false, error: "Something went wrong" };
  }
}
