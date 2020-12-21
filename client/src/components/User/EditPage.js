import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Typography, message as Message, Space, Popover } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EDIT_USER_REQUEST, CONFIRM_USER_REQUEST } from '../../reducers/types';
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function EditPage(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { currentUser, editUserLoading, editUserDone, editUserError, message,
    confirmUserLoading, confirmUserDone, confirmUserError } = useSelector(state => state.user)

  useEffect(() => {
    form.setFieldsValue({
      userName: currentUser?.name,
    });
    if (editUserDone) {
      props.history.push('/')
    }
    if (editUserError || confirmUserError) {
      Message.error({ content: message, duration: 2 });
    }
  }, [currentUser, editUserDone, editUserError, confirmUserError, message, props.history, form])

  const handleEdit = (values) => {
    dispatch({
      type: EDIT_USER_REQUEST,
      payload: {
        name: values.userName,
      }
    })
  };

  const handleConfirm = (values) => {
    dispatch({
      type: CONFIRM_USER_REQUEST,
      payload: {
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
        form={form}
        name="basic"
        style={{ width: '400px' }}
        onFinish={confirmUserDone ? handleEdit : handleConfirm}
        onFinishFailed={onFinishFailed}
      >
        <Title level={2} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }} >회원정보수정</Title>

        <Form.Item label="이메일">
          <Popover placement="right" content='이메일은 변경할 수 없습니다.'>
            <span>{currentUser?.email}</span>
          </Popover>
        </Form.Item>
        {(confirmUserDone || confirmUserError === false)
          ? <Form.Item
            label="이름"
            name="userName"
            rules={[{ required: true, message: '이름을 입력해주세요.' },
            { type: "string", max: 20, message: '이름은 20자 이내로 입력해주세요' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="name" />
          </Form.Item>
          : <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
            { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
            { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
            { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="password" />
          </Form.Item>}

        <Form.Item {...tailLayout}>
          <Space >
            {(confirmUserDone || confirmUserError === false)
              ? <Button type="primary" htmlType="submit" loading={editUserLoading} disabled={editUserLoading}>
                수정하기
                </Button>
              : <Button type="primary" htmlType="submit" loading={confirmUserLoading} disabled={confirmUserLoading}>
                본인 확인
                </Button>}
            <Button onClick={() => { props.history.goBack() }} >
              취소
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div >
  )
}

export default withRouter(EditPage);