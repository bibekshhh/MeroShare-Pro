import axios from "axios";

async function getAllAccounts(){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/all-accounts',
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