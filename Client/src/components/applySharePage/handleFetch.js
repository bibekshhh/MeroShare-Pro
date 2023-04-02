import axios from "axios";

const retryCount = 0;
async function handleFetch(data, reqParam){
    try{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/' + reqParam,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };
        
        const res = await axios.request(config);
        console.log(`fetched: ${retryCount}`)
        return res.data
    } catch(error){
        if (retryCount <= 3){
            let retryFetch = setTimeout(() => {
                handleFetch(data, reqParam)
            }, 2000)

            return () => clearTimeout(retryFetch)
        }
    }
}

export default handleFetch;