const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
  // console.log("req.headers, ",req.headers)
  console.log("req ", req.headers)
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("LOG.INFO ==> decode ", decode)
      const user = await User.findById(decode.userId);
      console.log("user in isAuth, ",user)
      if (!user) {
        return res.json({ success: false, message: 'unauthorized access! in try' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'unauthorized access! catch' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'sesson expired try sign in!',
        });
      }

      res.res.json({ success: false, message: 'Internal server error!' });
    }
  } else {
    res.json({ success: false, message: 'unauthorized access! in else' });
  }
};
