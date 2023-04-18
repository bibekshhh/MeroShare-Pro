import { useQuery } from "react-query";
import API_URL from "../../../config";
import axios from "axios";

function useDataFetcher(share, account, quantity, t_pin, setApplyRes) {
    const query = useQuery(
        [`globalApply-${share}-${account}`, share, account, quantity, t_pin, setApplyRes],
        async () => {
            try{
                const { name, boid, clientId, username, password, crnNumber } = account;
    
                const reqApplyData = {
                    name,
                    boid,
                    clientId,
                    username,
                    password,
                    transactionPin: t_pin.toString(),
                    crnNumber,
                    appliedKitta: quantity.toString(),
                    companyShareId: (share.match(/^\d+/)).toString()
                };
    
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${API_URL}/apply/single`,
                    headers: { },
                    data : reqApplyData
                
                }
                const res = await axios.request(config)
                const responseData = await res.data;

                setApplyRes({ success: responseData.success, responseData, account, share });

            } catch (error) {
                setApplyRes({success: false, responseData: error, account, share });
            } 
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: 0
        }
    );
    return query;
}

export default useDataFetcher;