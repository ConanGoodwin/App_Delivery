const validateBody = async (req, res, next) => {
  const { name, email, password, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({
        message: 'Some required fields are missing',
      }); 
    }

    if (name.length < 12) {
      return res.status(400).json({
        message: 'The length of the "Name" must be at least 12 characters long',
      }); 
    }

  if (!(/^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/).test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    }); 
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'The length of the "Password" must be at least 6 characters long',
    }); 
  }

  next();
};

module.exports = validateBody;