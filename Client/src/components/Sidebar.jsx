import { Menu } from '@arco-design/web-react';
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
            <MenuItem key='0_0' className="my-0 border-bottom">
              <Link to="/"><IconApps /><a href='/'>Dashboard</a></Link>
            </MenuItem>
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
              <MenuItem key='2_2'>Menu 3</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      );
}

export default Sidebar;