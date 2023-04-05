import axios from 'axios'
import API_URL from '../../../config';

const applyIndividualHandle = async (data, currentInfo) => {
    let applyResponseData = {};

    console.log(data)

    for (const share of data.share) {
        try{
            const {
                transactionPin,
                appliedKitta,
                companyShareId
              } = {
                transactionPin: data.t_pin,
                appliedKitta: data.quantity,
                companyShareId: share
              }

            const { name, boid, clientId, username, password, crnNumber } = currentInfo;

            const reqApplyData = {
                name,
                boid,
                clientId,
                username,
                password,
                transactionPin: transactionPin.toString(),
                crnNumber,
                appliedKitta: appliedKitta.toString(),
                companyShareId: (companyShareId.match(/^\d+/)).toString()
            };

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${API_URL}/apply/single`,
                headers: { },
                data : reqApplyData
            
            }
            const res = await axios.request(config)
            applyResponseData[share] = await res.data;
        } catch (error) {
            applyResponseData[share] = {success: false, error: error.message};
        }
    }

    console.log(applyResponseData)
    return applyResponseData
}

export default applyIndividualHandle;