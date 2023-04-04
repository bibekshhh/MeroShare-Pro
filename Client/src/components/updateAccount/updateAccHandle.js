import axios from "axios";

async function handleFetch(data){
    console.log({clientId: data.clientId, username: data.username, password: data.password})
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/profile',
            headers: { 
              'Content-Type': 'application/json',
              'authorization': "Bearer " + localStorage.getItem("token")
            },
            data : JSON.stringify({clientId: data.clientId, username: data.username, password: data.password})
        };
        
        const res = await axios.request(config);

        if (res.success === false) {
            return new Error()
        }
        return res.data
    } catch(error){
        console.log(error)
    }
}

export default handleFetch;