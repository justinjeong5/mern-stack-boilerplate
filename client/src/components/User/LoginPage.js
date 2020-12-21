import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Checkbox, Space, Typography, message as Message } from 'antd';
import { LOGIN_USER_REQUEST } from '../../reducers/types';
import EmailForm from './LoginForm/EmailForm';
import PasswordForm from './LoginForm/PasswordForm';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loginUserLoading, loginUserDone, loginUserError, message } = useSelector(state => state.user)

  useEffect(() => {
    if (loginUserDone) {
      props.history.push('/')
    }
    if (loginUserError) {
      Message.error({ content: message, duration: 2 });
    }
  }, [loginUserDone, loginUserError])

  const initialValues = {
    rememberMe: true,
    email: localStorage.getItem('rememberMe'),
  }

  const onFinish = (values) => {
    if (values.rememberMe) {
      localStorage.setItem('rememberMe', values.email);
    }
    dispatch({
      type: LOGIN_USER_REQUEST,
      payload: {
        email: values.email,
        password: values.password,
      }
    })
  };

  const onFinishFailed = ({ errorFields }) => {
    form.scrollToField(errorFields[0].name);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <Form
        {...layout}
        name="basic"
        style={{ width: '400px' }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title level={2} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }} >로그인</Title>
        <EmailForm />
        <PasswordForm />

        <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
          <Checkbox>아이디 기억하기</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loginUserLoading} disabled={loginUserLoading}>
              로그인
              </Button>
            <Button onClick={() => { props.history.goBack() }}>
              취소
              </Button>
          </Space>
        </Form.Item>

        <Form.Item  {...tailLayout} style={{ marginTop: -10 }}>
          <Link to='/register'>아직 회원이 아니시라면</Link>
        </Form.Item>
      </Form>
    </div >
  )
}

export default withRouter(LoginPage);