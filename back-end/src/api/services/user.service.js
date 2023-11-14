const md5 = require('md5');
const { User } = require('../../database/models');

const getAll = async () => {
  const message = await User.findAll({ attributes: { exclude: ['password'] } });
  // .catch((error) => console.log('ERROR', error));

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Users not found' };
};

const getByEmailPassword = async (email, noEcriptPassword) => {
  // try {
    const password = md5(noEcriptPassword);
    const message = await User.findOne({ where: { email, password } });

    if (message) return { type: null, message };
  
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  // } catch (error) {
  //   throwError(error);
  // }
};

const getById = async (id) => {
  // try {
    const message = await User.findOne({ where: { id } });

    if (message) return { type: null, message };
  
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  // } catch (error) {
  //   throwError(error);
  // }
};

const create = async ({ name, email, password: noEcriptPassword, role }, type) => {
  const password = md5(noEcriptPassword);
  // try {
  //   password = md5(noEcriptPassword);
  // } catch (error) {
  //   return { type: 'INVALID_PASSWORD', message: 'Password not encripted' };
  // }
  const ifExistEmail = await User.findOne({ where: { email } });
  const ifExistName = await User.findOne({ where: { name } });
  let message = '';

  if (ifExistEmail) {
    return { type: 'USER_ALREADY_EXIST', message: 'User already registered' };
  }

  if (ifExistName) {
    return { type: 'USER_ALREADY_EXIST', message: 'User already registered' };
  }

  if (type === 'client') {
    message = await User.create({ name, email, password, role: 'customer' });
  } else {
    message = await User.create({ name, email, password, role });
  }

  if (message) return { type: null, message };
  
  return { type: 'USER_NOT_CREATE', message: 'Failed create user' };
};

const exclude = async (id) => {
  const message = await User.destroy({ where: { id } });

  if (message) return { type: null, message };

  return { type: 'USER_NOT_FOUND', message: 'User not found' };
};

module.exports = {
  getAll,
  getByEmailPassword,
  getById,
  create,
  exclude,
};

// const teste = async () => {
//   console.log(await getAll());
// }

// teste();
