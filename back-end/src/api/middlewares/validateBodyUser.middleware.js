const validateBodyRegister = async (req, res, next) => {
  const { name, email, password, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({
        message: 'Some required fields are missing',
      }); 
    }

  next();
};

const validateBodyLogin = async (req, res, next) => {
  const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Some required fields are missing',
      }); 
    }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
    
    if (!(/^[^ ^@]+@[^ ^@^.]+\.[c][o][m](\.[A-Za-z^.]{2})?$/i).test(email)) {
      return res.status(400).json({
        message: '"email" must be a valid email',
      }); 
    }
  next();
};

const validateLength = async (req, res, next) => {
  const { name, password } = req.body;
    
  if (name && name.length < 12) {
    return res.status(400).json({
      message: 'The length of the "Name" must be at least 12 characters long',
    }); 
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'The length of the "Password" must be at least 6 characters long',
    }); 
  }
  next();
};

module.exports = { validateBodyRegister, validateBodyLogin, validateEmail, validateLength };