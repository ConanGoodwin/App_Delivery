// const md5 = require('md5');
const UserService = require('../services/user.service');
const { returnController, returnControllerToken } = require('../utils/returnServicesControllers');

const getAll = async (_req, res) => {
  const { type, message } = await UserService.getAll();

  if (type) return res.status(404).json({ message });

  returnController(res, type, message, 200);
};

const login = async (req, res) => {
  const { email, password } = req.body; 

  const { type, message } = await UserService.getByEmailPassword(email, password);

  returnControllerToken(res, type, message, 200);
};

const validateToken = async (req, res) => {
  let type = null;
  let message = { role: req.user.role, name: req.user.name };

  if (!req.user) {
    type = 'EXPIRED_OR_INVALID_TOKEN';
    message = 'Expired or Ivalid Token';
  }
  // message.role = req.user.role;

  returnController(res, type, message, 200);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const { type, message } = await UserService.create({ name, email, password }, 'client');

  returnController(res, type, message, 201);
};

const createAdm = async (req, res) => {
  const { role: tokenRole } = req.user;
  if (!tokenRole || tokenRole !== 'administrator') {
    return res.status(401).json({ message: 'not valid adm Token.' });
  }
  const { name, email, password, role } = req.body;

  const { type, message } = await UserService.create({ name, email, password, role }, 'adm');

  returnController(res, type, message, 201);
};

module.exports = {
  getAll,
  login,
  validateToken,
  create,
  createAdm,
};
