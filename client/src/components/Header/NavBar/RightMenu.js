import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { Menu, message as Message } from 'antd';
import { LogoutOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { LOGOUT_USER_REQUEST } from '../../../reducers/types';

function RightMenu(props) {

  const dispatch = useDispatch();
  const { currentUser, logoutUserDone, logoutUserError, message } = useSelector(state => state.user)

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/');
    }
    if (logoutUserError) {
      Message.error({ content: message, duration: 2 });
    }
  }, [logoutUserDone, logoutUserError, props.history, message])

  const handleLogout = () => {
    dispatch({
      type: LOGOUT_USER_REQUEST
    })
  }

  return (
    <> {currentUser?.isAuth
      ? <Menu mode={props.mode}>
        < Menu.Item key="logout"
          onClick={handleLogout} >
          <Link to='/'><LogoutOutlined />{props.mode === 'inline' ? '로그아웃' : ''}</Link>
        </Menu.Item >
        <Menu.Item key="edit" >
          <Link to='/edit'><UserOutlined />{props.mode === 'inline' ? '정보수정' : ''}</Link>
        </Menu.Item>
      </Menu >
      : <Menu mode={props.mode}>
        <Menu.Item key="login" >
          <Link to='/login'><LoginOutlined />{props.mode === 'inline' ? '로그인' : ''}</Link>
        </Menu.Item>
        <Menu.Item key="register" >
          <Link to='/register'><UserAddOutlined />{props.mode === 'inline' ? '회원가입' : ''}</Link>
        </Menu.Item>
      </Menu>
    }</>
  );

}
export default withRouter(RightMenu);
