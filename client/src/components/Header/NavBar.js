import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, message as Message } from 'antd';
import { LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER_REQUEST } from '../../reducers/types';

const rightMenu = { style: { float: 'right' } }

function NavBar(props) {

  const dispatch = useDispatch();
  const { currentUser, logoutUserDone, logoutUserError, message } = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch({
      type: LOGOUT_USER_REQUEST
    })
  }

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/');
    }
    if (logoutUserError) {
      Message.error({ content: message, duration: 2 });
    }
  }, [logoutUserDone, logoutUserError, props.history, message])


  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item ><Link to='/'>HOME</Link></Menu.Item>
        <Menu.Item key="1" disabled ><Link to='/blog'>블로그</Link></Menu.Item>
        <Menu.Item key="2" disabled ><Link to='/MovieTrend'>영화</Link></Menu.Item>
        <Menu.Item key="3" disabled ><Link to='/jayTalk'>채팅</Link></Menu.Item>
        <Menu.Item key="4" disabled ><Link to='/jayMall'>쇼핑</Link></Menu.Item>
        <Menu.Item key="5" disabled ><Link to='/jayTube'>유투브</Link></Menu.Item>

        {currentUser?.isAuth
          ? <>
            <Menu.Item key="11" {...rightMenu} onClick={handleLogout}><Link to='/'><LogoutOutlined /></Link></Menu.Item>
          </>
          : <>
            <Menu.Item key="12" {...rightMenu} ><Link to='/register'><UserAddOutlined /></Link></Menu.Item>
            <Menu.Item key="11" {...rightMenu} ><Link to='/login'><LoginOutlined /></Link></Menu.Item>
          </>}
      </Menu >
    </>
  )
}

export default withRouter(NavBar)