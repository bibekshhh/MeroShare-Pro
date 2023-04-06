import { Statistic, Typography} from '@arco-design/web-react';
import "./css/portfolioCards.css"
import EmptyData from '../emptyData';

const ValueStyle = ({value}) => {
    return(
        <Typography.Text type='success'>
            {
                !value ? "Rs 0" :  `Rs ${value.toLocaleString()}`
            }
        </Typography.Text>
    )
}

const PortfolioCards = ({loading, data}) => {
    if (!data) return <EmptyData />

    return (
        <>
        <label htmlFor="#" className="internal-content-header">Portfolio</label>
        <div className='portfolio-cards'>
        <Statistic
        title='Total Scripts'
        value={data.totalItems}
        groupSeparator
        loading={loading} />

        <Statistic
        title='Last Transaction'
        value={<ValueStyle value={data.totalValueAsOfLastTransactionPrice}/>}
        groupSeparator
        loading={loading} />

        <Statistic
        title='Previous Closing'
        value={<ValueStyle value={data.totalValueAsOfPreviousClosingPrice}/>}
        groupSeparator
        loading={loading} />
        </div>
        </>
    );
}

export default PortfolioCards;