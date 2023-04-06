import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import { useState } from 'react';

import "@arco-design/web-react/dist/css/arco.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"

//importing pages
import ApplyShare from './pages/applyShare/applyShare.route';
import Sidebar from './components/sidebar/Sidebar';
import CheckResult from './pages/checkResult.route';
import Login from './pages/login/login.route';
import Manage from './pages/manage/Manage.route';
import Home from './pages/home/home.route';
import PageNotFound from './pages/pageNotFound';
import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }, [loggedIn])

  return (
    <>
      <div className="App">
        <div className='app-wrapper'>
          {
            loggedIn === true ? 
            <BrowserRouter>
            <Sidebar />
            <Outlet />
            <QueryClientProvider client={queryClient}>
            <div className='main'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/apply' element={<ApplyShare />} />
                    <Route path='/result' element={<CheckResult />} />
                    <Route path='/manage' element={<Manage />} />

                    {/* 👇️ only match this when no other routes match */}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
            </div>
            </QueryClientProvider>
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
