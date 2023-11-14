require("dotenv").config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

// const options = {
//   // host: process.env.HOSTNAME || process.env.MYSQLHOST || "localhost",
//   host: process.env.MYSQLHOST || "localhost",
//   port: process.env.MYSQLPORT || "3306",
//   database: process.env.MYSQLDATABASE,
//   // `${process.env.MYSQLDATABASE || 'delivery-app'}${suffix[environment] || suffix.test}`,
//   username: process.env.MYSQLUSER || "root",
//   password: process.env.MYSQLPASSWORD || "password",
//   dialect: "mysql",
//   dialectOptions: {
//     timezone: "Z",
//   },
//   logging: false,
// };

const options = {
  database: "delivery-app",
  username: "ah3scl1jz70n2fbmnwbm",
  host: "aws.connect.psdb.cloud",
  password: process.env.PLANET_PASS,
  dialect: "mysql",
  // sslaccept: "strict",
  dialectOptions: {
    timezone: "Z",
    ssl: {
      rejectUnauthorized: false
    }
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
