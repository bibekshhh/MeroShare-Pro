import axios from "axios";

async function deleteAccount(boid){
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/delete-account',
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
    }
}

export default deleteAccount;