import fetch from "node-fetch";

export default async function getCustomerId(token, bankId) {
    try {

        const res = await fetch("https://webbackend.cdsc.com.np/api/meroShare/bank/" + bankId, {
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

