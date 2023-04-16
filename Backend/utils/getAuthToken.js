import axios from 'axios'

async function getAuthToken(clientId, username, password) {
    let data = JSON.stringify({
        "clientId": clientId,
        "username": username,
        "password": password
    });

    try {
        const res = await axios({
            method: 'post',
            url: 'https://webbackend.cdsc.com.np/api/meroShare/auth/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        });
    
        if (res.accountExpired || res.dematExpired){
            console.log("Email or Demat has expired.")
            return null
        }
        
        const token = res.headers['authorization'];
        return token

    } catch (error) {
        console.log(error)
        return false
    }
}

export default getAuthToken;
