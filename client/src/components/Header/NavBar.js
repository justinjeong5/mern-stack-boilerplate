import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'

const rightMenu = { style: { float: 'right' } }

function NavBar() {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item ><Link to='/'>HOME</Link></Menu.Item>
        <Menu.Item key="1" disabled ><Link to='/blog'>블로그</Link></Menu.Item>
        <Menu.Item key="2" disabled ><Link to='/MovieTrend'>영화</Link></Menu.Item>
        <Menu.Item key="3" disabled ><Link to='/jayTalk'>채팅</Link></Menu.Item>
        <Menu.Item key="4" disabled ><Link to='/jayMall'>쇼핑</Link></Menu.Item>
        <Menu.Item key="5" disabled ><Link to='/jayTube'>유투브</Link></Menu.Item>

        <Menu.Item key="12" {...rightMenu} ><Link to='/register'><UserAddOutlined /></Link></Menu.Item>
        <Menu.Item key="11" {...rightMenu} ><Link to='/login'><LoginOutlined /></Link></Menu.Item>
      </Menu >
    </>
  )
}

export default withRouter(NavBar)