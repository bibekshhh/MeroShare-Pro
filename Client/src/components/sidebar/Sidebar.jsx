import { Menu, Popconfirm, Notification } from '@arco-design/web-react';
import { IconApps, IconList, IconUser } from '@arco-design/web-react/icon';
import { useState } from 'react';

import {Link} from 'react-router-dom'

import "./Sidebar.css"

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sidebar = () => {
    const [width] = useState(240)
    return (
        <div className='menu-demo sidebar-container'>
          <Menu
            style={{ width: width, height: '100%', paddingTop: 20 }}
            hasCollapseButton
            defaultOpenKeys={['1']}
            defaultSelectedKeys={['0_0']}
          >
            <Link to="/">
            <MenuItem key='0_0' className="my-0 border-bottom">
               <IconApps /> Dashboard
            </MenuItem> 
            </Link>

            <SubMenu
              key='1'
              className="my-0 border-bottom"
              title={
                <>
                  <IconList /> My Accounts
                </>
              }
            >
              <MenuItem key='1_0'>
                <Link to="/manage">Manage</Link>
              </MenuItem>
              <MenuItem key='1_1'>
                <Link to="/apply">Apply Share</Link>
              </MenuItem>
              <MenuItem key='1_2'>
                <Link to="/result">IPO Result</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu
              key='2'
              title={
                <>
                  <IconUser /> Profile
                </>
              }
            >
              <MenuItem key='2_0'>Menu 1</MenuItem>
              <MenuItem key='2_1'>Menu 2</MenuItem>
            </SubMenu>

            <MenuItem key='3_0' className="my-0 mx-0 border-top logout-btn">
              <Popconfirm
                focusLock
                position='bottom'
                style={{width: '270px', marginLeft: '50px'}}
                title='Confirm'
                okText='Logout'
                cancelText='Cancel'
                content='Are you sure you want to logout?'
                onOk={() => {
                  window.location.assign('/login')
                  localStorage.removeItem('token')
                  Notification.success({
                    title: 'Success',
                    content: 'Logged Out Successfully',
                  });
                }} >
                  <i className="bi bi-box-arrow-right me-3"></i> Logout
              </Popconfirm>
            </MenuItem> 
          </Menu>
        </div>
      );
}

export default Sidebar;