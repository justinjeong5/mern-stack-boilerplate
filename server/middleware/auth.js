const { User } = require("../models/User");

const auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  if (!token) return res.status(200).json({
    payload: { isAuth: false },
    code: 'NoUserTokenAtCookie',
    message: '로그인 되지 않은 사용자입니다.',
  })

  User.findByToken(token, (err, user) => {
    if (err) return res.status(200).json({
      payload: { isAuth: false },
      code: 'JsonWebTokenError',
      message: '사용자 인증과정에서 문제가 발생했습니다.',
      err
    })
    if (!user) return res.status(200).json({
      payload: { isAuth: false },
      code: 'NoSuchUser',
      message: '존재하지 않는 사용자입니다.',
    })
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth }