const { stdin, stdout } = process;
stdin.setEncoding("utf8");

const validateAns = function(quesDetails, answer) {
  const correctAns = `${quesDetails.questions[quesDetails.count].answer}\n`;
  return answer == correctAns;
};

const displayNextQues = function(quesDetails) {
  stdout.write("timeout...\n");
  quesDetails.count = quesDetails.count + 1;
  if (quesDetails.count == quesDetails.questions.length) {
    stopQuiz(quesDetails);
  }
  displayQues(quesDetails);
};

const displayQues = function(quesDetails) {
  const ques = quesDetails.questions[quesDetails.count];
  stdout.write(`Question:  ${ques.Question}\n`);
  stdout.write(`a. ${ques.options[0]}\n`);
  stdout.write(`b. ${ques.options[1]}\n`);
  stdout.write(`c. ${ques.options[2]}\n`);
  stdout.write(`d. ${ques.options[3]}\n`);

  quesDetails.setTimer = setTimeout(displayNextQues, 4000, quesDetails);
};

displayAnsResult = function(quesDetails, answer) {
  let result = "wrong";
  const ques = quesDetails.questions[quesDetails.count];

  if (validateAns(quesDetails, answer)) {
    result = "correct";
    quesDetails.scores += 1;
  }
  stdout.write(`\nyour ans was ${result}......\n`);
};

const stopQuiz = function(quesDetails) {
  stdout.write("quiz is over..\n");
  stdout.write(`your total scores : ${quesDetails.scores * 5}/30 \n`);
  process.exit();
};

const checkAns = function(quesDetails) {
  stdin.on("data", answer => {
    clearTimeout(quesDetails.setTimer);
    if (quesDetails.count == quesDetails.questions.length - 1) {
      stopQuiz(quesDetails);
    }

    displayAnsResult(quesDetails, answer);
    quesDetails.count = quesDetails.count + 1;
    displayQues(quesDetails);
  });
};

const main = function() {
  const questions = require("./quizQues.json");
  const quesDetails = { count: 0, scores: 0, questions, setTimer: {} };
  displayQues(quesDetails);
  checkAns(quesDetails);
};

main();