import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login")
        }, 1000)

        return () => clearTimeout(timer)
    }, [navigate]);

    return(
        <h1>
            Page not found. Redirecting to login page.
        </h1>
    )
}

export default PageNotFound;