var chalk = require('chalk');

module.exports = {

  info: function (message) {
    console.log(chalk.magenta(message));
  },

  error: function (message) {
    console.log(chalk.bold.red(message));
  }

};
