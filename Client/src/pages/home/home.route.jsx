import AddUserForm from './addUserForm';

//import styles
import "../css/home.css"

const Home = () => {

    return (
        <div className="home">
        <label htmlFor="#" className="content-header">Manage User</label>
        <div className="content">
            <div className="add-accounts">
            <div>
              <AddUserForm />
            </div>
            </div>
            <div className="accounts-list">

            </div>
        </div>
        </div>
    )
}

export default Home;