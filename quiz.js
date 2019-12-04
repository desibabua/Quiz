const fs = require(`fs`);
let { stdin, stdout } = process;
let questions = require("./quizQues.json");

const displayQues = ques => {
  stdout.write(`Question:  ${ques.Question}\n`);
  stdout.write(`a. ${ques.options[0]}\n`);
  stdout.write(`b. ${ques.options[1]}\n`);
  stdout.write(`c. ${ques.options[2]}\n`);
  stdout.write(`d. ${ques.options[3]}\n`);
  return setTimeout(() => {
    stdout.write("timeout...\n");
    process.exit(0);
  }, 10000);
};

const validateAns = function(question, answer) {
  const correctAns = `${question["answer"]}\n`;
  if (answer == correctAns) {
    return true;
  }
  return false;
};

const main = function() {
  let count = 0;
  let timer = displayQues(questions[count]);
  stdin.on("data", answer => {
    let result = "wrong";
    if (validateAns(questions[count], answer)) {
      result = "correct";
    }
    clearTimeout(timer);
    stdout.write(`\nyour ans was ${result}......\n`);
    count += 1;
    timer = displayQues(questions[count]);
  });
};

process.on("uncaughtException", () => {
  stdout.write("quiz is over..\n");
  process.exit(0);
});

main();
