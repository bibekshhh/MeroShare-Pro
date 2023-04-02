import axios from "axios";

async function handleFetch(data){
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/profile',
            headers: { 
              'Content-Type': 'application/json',
              "authorization": "Bearer " + localStorage.getItem("token")
            },
            data : JSON.stringify(data)
        };
        
        const res = await axios.request(config);
        return res.data
    } catch(error){
        console.log(error)
    }
}

export default handleFetch;