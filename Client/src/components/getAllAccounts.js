import axios from "axios";
import API_URL from '../config'

async function getAllAccounts(){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_URL}/action/all-accounts`,
            headers: { 
              'Content-Type': 'application/json',
              'authorization': "Bearer " + localStorage.getItem("token")
            },
        };
        
        const res = await axios.request(config);
        if (!res) return
        return res.data
    } catch(error){
        console.log(error)
    }
}

export default getAllAccounts;