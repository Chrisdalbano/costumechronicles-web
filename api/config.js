// api/config.js

const devConfig = {
    connectionString: "your_development_connection_string",
  };
  
  const prodConfig = {
    connectionString: "mysql://username:password@servername:portnumber/databasename?ssl=true&sslmode=required",
  };
  
  const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
  
  module.exports = config;
  