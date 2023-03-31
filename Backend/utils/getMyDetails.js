import fetch from "node-fetch";

export default async function getMyDetails(token, demat) {
  try {
    const res = await fetch(
      "https://webbackend.cdsc.com.np/api/meroShareView/myDetail/" + demat,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
