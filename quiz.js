let { stdin, stdout } = process;
let questions = require("./quizQues.json");
let correctAnsCount = 0;

const setTimer = () => {
  return setTimeout(() => {
    stdout.write("timeout...\n");
    stdin.emit("data");
  }, 10000);
};

const displayQues = ques => {
  stdout.write(`Question:  ${ques.Question}\n`);
  stdout.write(`a. ${ques.options[0]}\n`);
  stdout.write(`b. ${ques.options[1]}\n`);
  stdout.write(`c. ${ques.options[2]}\n`);
  stdout.write(`d. ${ques.options[3]}\n`);
};

const validateAns = function(question, answer) {
  const correctAns = `${question["answer"]}\n`;
  return answer == correctAns;
};

const setEnvForQuestion = function(count) {
  displayQues(questions[count]);
  let timer = setTimer();
  return timer;
};

function displayIsAnsCorrectOrWrong(answer, count) {
  let result = "wrong";
  if (validateAns(questions[count], answer)) {
    result = "correct";
    correctAnsCount += 1;
  }
  stdout.write(`\nyour ans was ${result}......\n`);
}

const main = function() {
  let count = 0;
  let timeForQuestion = setEnvForQuestion(count);
  stdin.on("data", answer => {
    answer && displayIsAnsCorrectOrWrong(answer, count);
    clearTimeout(timeForQuestion);
    count += 1;
    timeForQuestion = setEnvForQuestion(count);
  });
};

process.on("uncaughtException", () => {
  stdout.write("quiz is over..\n");
  process.exit(0);
});

process.on("exit", () => {
  stdout.write(`your total scores : ${correctAnsCount * 5}/30 \n`);
});

main();