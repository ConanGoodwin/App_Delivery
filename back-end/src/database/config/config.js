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
  username: "izjqkeo06fgybl66fyom",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_5AQSvcd54DuSUNFHxdkfDrauotfbV8bDTE4jKlWOKt1",
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
