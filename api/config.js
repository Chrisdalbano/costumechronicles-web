// api/config.js

const devConfig = {
    connectionString: "your_development_connection_string",
  };
  
  const prodConfig = {
    connectionString: "your_production_connection_string",
  };
  
  const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
  
  module.exports = config;
  