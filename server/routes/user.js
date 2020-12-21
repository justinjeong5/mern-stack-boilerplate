const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
const { auth } = require('../middleware/auth')

router.get('/auth', auth, (req, res) => {
  const isAdmin = (role) => {
    switch (role) {
      case 0:
        //0은 총괄 어드민
        return true;
      default:
        return false;
    }
  }
  res.status(200).json({
    payload: {
      userId: req.user._id,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      image: req.user.image,
      role: req.user.role,
      isAdmin: isAdmin(req.user.role),
      isAuth: true,
    },
    message: '정상적으로 사용자가 인증되었습니다.'
  })
})

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

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id, },
    { token: '' }, (error, user) => {
      if (error) {
        return res.status(400).json({ code: 'DatabaseError', message: '로그아웃하는 과정에서 문제가 발생했습니다.', error });
      }
      if (!user) {
        return res.status(400).json({ code: 'NoSuchUser', message: '존재하지 않는 사용자입니다.' });
      }
      res.cookie('x_auth', '').status(200)
        .json({ message: '로그아웃이 정상적으로 완료되었습니다.' });
    })
})

router.post('/confirm', auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (error, user) => {
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
      res.status(200).json({ message: '본인인증이 정상적으로 완료되었습니다.' });
    })
  })
})

router.post('/edit', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id, },
    { name: req.body.name }, (error, user) => {
      if (error) {
        return res.status(400).json({ code: 'DatabaseError', message: '회원정보를 찾는 과정에서 문제가 발생했습니다.', error });
      }
      if (!user) {
        return res.status(400).json({ code: 'NoSuchUser', message: '존재하지 않는 사용자입니다.' });
      }
      res.status(200).json({ message: '회원정보가 정상적으로 변경되었습니다.' });
    })
})


module.exports = router