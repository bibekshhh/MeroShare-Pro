import axios from 'axios';
import { useEffect, useState } from "react";
import { Spin } from '@arco-design/web-react';
import ListUpcomingIPOs from './ipoUpcoming';

//importing styles
import "./manage.css"

const Manage = () => {
    const [upcomingIPOList, setUpcomingIPOList] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try{
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:9000/action/upcomingIPO',
                    headers: {},
                };
                
                const res = await axios.request(config);
                setUpcomingIPOList((res.data).reverse())
            } catch (error){
                setLoading(false)
            }
        })()
    },[setUpcomingIPOList, setLoading]);

    return (
        <div className='manage'>
        <label htmlFor="#" className="content-header">Manage Account</label>
        <br></br>
        <div className="content">
            <label htmlFor="#" className='sub-header'>Upcoming IPOs</label>
            <div className="ipoList">
                { upcomingIPOList.length > 0 ? (
                    upcomingIPOList.map(item => (
                        <ListUpcomingIPOs item={item} />
                    ))
                ) : ( loading === true ? (<Spin />) : (<p>No upcoming IPOs found.</p>))
                }
            </div>
        </div>
        </div>
    )

}

export default Manage;