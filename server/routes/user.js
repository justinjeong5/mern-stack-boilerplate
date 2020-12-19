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

module.exports = router