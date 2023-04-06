import axios  from "axios"

const handleRecentApplication = async(currentInfo) => {
    try{
        const bodyData = {
            clientId: currentInfo.clientId,
            username: currentInfo.username,
            password: currentInfo.password
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/action/recent-applications',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(bodyData)
        };

        const res = await axios.request(config);
        const recentApplications = await res.data

        return recentApplications
    } catch (error){
        return {success: false, error: error}
    }
}

export default handleRecentApplication;