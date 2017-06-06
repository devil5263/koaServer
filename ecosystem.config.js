module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "koaServer",
      script    : "--harmony-async-await server.js",
      watch     : true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "dev"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "node",
      host : "104.224.161.***",
      port : "280**",
      ref  : "origin/production",
      repo : "git@github.com:devil5263/koaServer.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 reload ecosystem.config.js --env production"
    },
    dev : {
      user : "lebron",
      host : "104.224.161.***",
      port : "280**",
      ref  : "origin/dev",
      repo : "git@github.com:devil5263/koaServer.git",
      path : "/var/www/development",
      "post-deploy" : "npm install && pm2 reload ecosystem.config.js --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
};
