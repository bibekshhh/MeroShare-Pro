import { Alert } from '@arco-design/web-react';
import useDataFetcher from './applyGlobalHandle';
import { useEffect, useState } from 'react';

function DataItem(props) {    
    const [applyRes, setApplyRes] = useState([]);
    let {
        share, 
        account, 
        quantity, 
        t_pin, 
        setCount
    } = props;

    const {isError, isLoading, isSuccess, refetch } = useDataFetcher(
        share, 
        account, 
        quantity, 
        t_pin,
        setApplyRes
    );

    useEffect(() => {
      if (!isLoading){
        setCount(prev => prev+1)
      }
    }, [setCount, isLoading])
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
        return (
            <div>
            Error fetching data.{" "}
            <button onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <Alert
                key={applyRes}
                style={{ marginBottom: 10, width: '100%' }}
                type={`${applyRes.success ? 'success' : 'error'}`}
                title={`${applyRes.account?.name + " - " + applyRes.share?.split(" ")[1]} · ${applyRes.success ? "Success" : "Failed"}`}
                content={applyRes.responseData?.message? applyRes.responseData?.message : applyRes.responseData?.error}
            />
        )
    }
}
  
function GlobalShareApply({ form, setConfirmLoading }) {
    const [count, setCount] = useState(0);
    if (count === Math.floor(form.Accounts.length * form.share.length)){
      setConfirmLoading(false)
    }
    return (
      <div>
        {form.share.map((share) => {
          return form.Accounts.map((account) => {
            return (
              <DataItem
                key={`${share}-${(JSON.parse(account)).boid}`}
                share={share}
                account={JSON.parse(account)}
                quantity={form.quantity}
                t_pin={form.t_pin}
                setCount={setCount}
              />
            );
          });
        })}
      </div>
    );
  }

export default GlobalShareApply;