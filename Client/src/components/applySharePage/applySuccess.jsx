const ApplySuccess = ({applyData}) => {
    if (!applyData) return
    console.log({applySuccessPage: applyData})
    
    return(
        <>
        <h1>Applying process</h1>
        </>
    )
}

export default ApplySuccess;

