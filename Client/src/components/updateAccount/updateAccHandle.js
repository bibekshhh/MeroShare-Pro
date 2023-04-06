import axios from "axios";
import API_URL from '../../config';

async function handleFetch(data){
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_URL}/action/profile`,
            headers: { 
              'Content-Type': 'application/json',
              'authorization': "Bearer " + localStorage.getItem("token")
            },
            data : JSON.stringify({clientId: data.clientId, username: data.username, password: data.password})
        };
        
        const res = await axios.request(config);

        if (!res || res.success === false) {
            return new Error()
        }
        return res.data
    } catch(error){
        console.log(error)
    }
}

export default handleFetch;