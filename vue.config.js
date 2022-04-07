
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "localhost", //frontend host name
    allowedHosts: "all",
    port: 8080, //frontend port
    https: false, //no ssl
    proxy: {
      "/api": { //proxy every thing from frontend http://localhost:8080/api/** to backend at http://localhost:8081/api/**
        //this is why api path on backend should begin with /api
        // target: "http://localhost:8081",
        target: "http://128.199.225.250:8081"
      },
    },
    headers: {
      // typical header setting
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":  "X-Request-With, content-type, Authorization",
    },
  },
};
