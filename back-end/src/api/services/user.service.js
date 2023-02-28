const { User } = require("../../database/models");

const getAll = async () => {
  const [users] = await User.findAll();

  if (users) return { type: null, message: users }

  return { type: 'NOT_FOUND', message: 'Users not found' };
};

module.exports = {
  getAll,
};

// const teste = async () => {
//   console.log(await getAll());
// }

// teste();