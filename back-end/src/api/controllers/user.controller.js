const UserService = require('../services/user.service')
const crypto = require('crypto');
const md5 = require('md5');

const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = "secret_key"; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
// const IV_LENGTH = 16;

const ENC= 'bf3c199c2470cb477d907b1e0917c17b';
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-ctr"

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
