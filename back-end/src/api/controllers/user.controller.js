const UserService = require('../services/user.service')

const getAll = async (_req,res) => {
  const { type, message } = await UserService.getAll();

  if (type) return res.status(404).json({ message });


  res.status(200).json(message);
}

module.exports = {
  getAll,
};