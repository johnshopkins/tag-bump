import { createInterface } from 'readline';
import chalk from 'chalk';

const getReadline = () => {
  return createInterface({
    input: process.stdin,
    output: process.stdout
  });
};

const getQuestion = (question, defaultValue, optionsString) => {
  if (defaultValue !== undefined) {
    return question += ' (' + defaultValue + '): '
  } else if (optionsString !== undefined) {
    return question += ' (' + optionsString + '): '
  } else {
    return question += ': '
  }
};

const question = async (question, defaultValue) => {
  return new Promise((resolve) => {

    const rl = getReadline();

    rl.question(getQuestion(question, defaultValue), (answer) => {

      rl.close();
      answer = answer.trim();

      if (answer === '' && defaultValue !== undefined) {
        return resolve(defaultValue);
      }

      return resolve(answer);
    });
  });
};

const binary = async (question, defaultValue) => {
  return new Promise((resolve) => {

    const rl = getReadline();

    rl.question(getQuestion(question, defaultValue === true ? 'y' : 'n'), 'y/n', async (answer) => {

      rl.close();
      answer = answer.trim().toLowerCase();

      let resolveValue = null;

      if (answer === '' && defaultValue !== undefined) {
        resolveValue = defaultValue;
      }

      if (answer === 'y') {
        resolveValue = true;
      }

      if (answer === 'n') {
        resolveValue = false;
      }

      if (resolveValue !== null) {
        return resolve(resolveValue);
      }

      // show an error message
      process.stdout.write(chalk.red.bold('Invalid Response. Please enter `y` or `n` \n'));

      // ask again
      const result = await this.binary(question, defaultValue);
      resolve(result);
    });
  });
};

export { binary, question };
