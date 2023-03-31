import fetch from "node-fetch";

export default async function getBankId(token) {
    try {

        const res = await fetch("https://webbackend.cdsc.com.np/api/meroShare/bank/", {
            method: "GET",
            headers: {
                "authorization": token
            }
        });

        const data = res.json();

        return data
        
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message }
    }
}

