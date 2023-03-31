import fetch from "node-fetch";

export default async function getShareDetails(token, shareId) {
    try {

        const res = await fetch("https://webbackend.cdsc.com.np/api/meroShare/active/" + shareId, {
            method: "GET",
            headers: {
                "authorization": token
            }
        });

        const data = await res.json();
        return data
        
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message }
    }
}