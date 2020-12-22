import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function LeftMenu(props) {

  const { currentUser } = useSelector(state => state.user)

  return (
    <Menu mode={props.mode} >
      <Menu.Item ><Link to='/'>HOME</Link></Menu.Item>
      <Menu.Item key="blog" disabled ><Link to='/blog'>블로그</Link></Menu.Item>
      <Menu.SubMenu title={<span className='antd-menu-submenu-title-span'>영화</span >}>
        <Menu.Item key="favorite">{<Link to='/movieTrend'>트렌드</Link>}</Menu.Item>
        {currentUser?.isAuth &&
          <Menu.Item key="favorite">{<Link to='/movieTrend/favorite'>즐겨찾기</Link>}</Menu.Item>
        }
      </Menu.SubMenu>
      <Menu.Item key="justinTalk" disabled ><Link to='/justinTalk'>채팅</Link></Menu.Item>
      <Menu.Item key="jayMall"><Link to='/jayMall'>쇼핑</Link></Menu.Item>
      <Menu.Item key="jayTube" disabled ><Link to='/jayTube'>유투브</Link></Menu.Item>
    </Menu >
  )
}

export default LeftMenu
