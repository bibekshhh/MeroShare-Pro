import axios from "axios";
import API_URL from '../../config';

async function deleteAccount(boid){
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_URL}/action/delete-account`,
            headers: { 
              'Content-Type': 'application/json',
              'authorization': "Bearer " + localStorage.getItem("token")
            },
            data: JSON.stringify({boid})
        };
        
        const res = await axios.request(config);
        return res.data
    } catch(error){
        console.log(error)
        return {success: false, error: error}
    }
}

export default deleteAccount;