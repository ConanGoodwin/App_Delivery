const { User } = require("../../database/models");

const getAll = async () => {
  const [users] = await User.findAll();

  return users;
};

module.exports = {
  getAll,
};

// const teste = async () => {
//   console.log(await getAll());
// }

// teste();