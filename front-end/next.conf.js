require('dotenv').config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
};

// module.exports = {
//   env: {
//     API_URL: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}`,
//   },
// };
