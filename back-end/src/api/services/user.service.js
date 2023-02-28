const md5 = require('md5');
const { User } = require("../../database/models");

const getAll = async () => {
  const message = await User.findAll();

  if (message) return { type: null, message }

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

module.exports = {
  getAll,
  getByEmailPassword,
};

// const teste = async () => {
//   console.log(await getAll());
// }

// teste();