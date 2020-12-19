const express = require('express');
const router = express.Router();
const { User } = require('../models/User')

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (error, alreadyExistUser) => {
    if (error) {
      return res.status(400).json({ code: 'DatabaseFindError', message: '기존 유저를 찾는 과정에서 문제가 발생했습니다.', error });
    }
    if (alreadyExistUser) {
      return res.status(400).json({ code: 'AlreadyExistUser', message: '이미 존재하는 사용자입니다.' });
    }

    const user = new User(req.body);
    user.save((error, doc) => {
      if (error) {
        return res.status(400).json({ code: 'DatabaseSaveError', message: '유저 정보를 저장하는 과정에서 문제가 발생했습니다.', error });
      }
      return res.status(200).json({ message: '회원가입이 정상적으로 완료되었습니다.' })
    })
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.status(400).json({ code: 'NoSuchUser', message: '존재하지 않는 사용자입니다.' });
    }
    if (error) {
      return res.status(400).json({ code: 'DatabaseFindError', message: '기존 유저를 찾는 과정에서 문제가 발생했습니다.', error });
    }
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) {
        return res.status(400).json({ code: 'DatabaseFindError', message: '비밀번호를 검증하는 과정에서 문제가 발생했습니다.', error });
      }
      if (!isMatch) {
        return res.status(400).json({ code: 'PasswordMismatch', message: '비밀번호가 일치하지 않습니다.' });
      }
      user.generateToken((error, user) => {
        if (error) {
          return res.status(400).json({ code: 'JsonWebTokenError', message: '토큰을 생성하는 과정에서 문제가 발생했습니다.', error });
        }
        res.cookie('x_auth', user.token).status(200)
          .json({ message: '로그인이 정상적으로 완료되었습니다.', payload: { userId: user._id } });
      })
    })
  })
})

module.exports = router