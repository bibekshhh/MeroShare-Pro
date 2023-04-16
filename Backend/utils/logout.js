import fetch from "node-fetch";

export default async function logout(token) {
    await fetch("https://webbackend.cdsc.com.np/api/meroShare/auth/logout/", {
            method: "GET",
            headers: {
                "authorization": token
            }
        });
}

