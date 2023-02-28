const UserService = require('../services/user.service')
const { returnController, returnControllerToken } = require('../utils/returnServicesControllers');
const md5 = require('md5');

const getAll = async (_req,res) => {
  const { type, message } = await UserService.getAll();

  if (type) return res.status(404).json({ message });
  const arrayPass = message.map(({password}) => password === md5('$#zebirita#$'));
  console.log(arrayPass);

  return res.status(200).json(message);
  // return res.status(200).json('ok');
}

const login = async (req, res) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    }); 
  }

  const { type, message } = await UserService.getByEmailPassword(email, password);

  returnControllerToken(res, type, message, 200);
};

module.exports = {
  getAll,
};
