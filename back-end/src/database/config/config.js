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
  username: "21usbfqahny4y3r3cq03",
  host: "aws.connect.psdb.cloud",
  password: process.env.PLANET_PASS,
  dialect: "mysql",
  dialectModule: require('mysql2'),
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
