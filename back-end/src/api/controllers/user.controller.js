const UserService = require('../services/user.service')

const getAll = async (_req,res) => {
  const { type, message } = await UserService.getAll();

  if (type) return res.status(404).json({ message });


  return res.status(200).json(message);
  // return res.status(200).json('ok');
}

module.exports = {
  getAll,
};