const validadeBody = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(/^[\w ]{8}/i).test(name)) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    }); 
  }

  if (!(/^[^ ^@]+@[^ ^@^.]+\.[A-Za-z]{2,3}(\.[A-Za-z^.]{2})?$/i).test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    }); 
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    }); 
  }

  next();
};

module.exports = validadeBody;