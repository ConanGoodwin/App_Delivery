const ERROR_BODY = 'Some required fields are missing';

const validateBodyRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: ERROR_BODY,
      }); 
    }

  next();
};

const validateBodyAdm = async (req, res, next) => {
  const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: ERROR_BODY,
      }); 
    }

  next();
};

const validateBodyLogin = async (req, res, next) => {
  const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: ERROR_BODY,
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

module.exports = { 
  validateBodyRegister, 
  validateBodyAdm,
  validateBodyLogin, 
  validateEmail, 
  validateLength,
};