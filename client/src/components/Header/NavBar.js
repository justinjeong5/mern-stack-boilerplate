import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons'
import './NavBar/NavBar.css';
import LeftMenu from './NavBar/LeftMenu';
import RightMenu from './NavBar/RightMenu';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', top: 0, zIndex: 5, width: '100%' }}>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <div className="menu__mobile-title">
          <Link to='/'>HOME</Link>
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>
        <Drawer
          title="Boilerplate"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar