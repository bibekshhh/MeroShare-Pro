import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"

//importing pages
import ApplyShare from './pages/applyShare.route';
import Sidebar from './components/Sidebar';
import CheckResult from './pages/checkResult.route';
import Login from './pages/login.route';
import Manage from './pages/manage/Manage.route';
import Home from './pages/home.route';

import "@arco-design/web-react/dist/css/arco.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import PageNotFound from './pages/pageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div className="App">
        <div className='app-wrapper'>
          {
            loggedIn === true ? 
            <BrowserRouter>
            <Sidebar />
            <Outlet />
            <div className='main'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/apply' element={<ApplyShare />} />
                    <Route path='/result' element={<CheckResult />} />
                    <Route path='/manage' element={<Manage />} />
                  </Routes>
            </div>
          </BrowserRouter>
          : 
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={<Login logStatus={{loggedIn, setLoggedIn}}/>} />

                {/* 👇️ only match this when no other routes match */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
        }
        </div>
      </div>
    </>
  );
}

export default App;
