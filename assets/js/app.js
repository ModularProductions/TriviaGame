// $(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var qIndex;
  var currentQuestion;
  var questionsAsked;
  var questionsCorrect;
  var intervalId;
  var timeLimit;

  function answerDecrement() {
    timeLimit--;
    // console.log("timeLimit", timeLimit);
    $("#timeRemaining").text("Time remaining: " + timeLimit + " seconds!");
    if (timeLimit === 0) {
      answerTimeUp();
    }
  };

  function answerTimer() {
    intervalId = setInterval(answerDecrement, 1000);
    console.log("answerTimer() executed");
  };
  
  function answerTimeUp() {
    console.log("executing answerTimeUp()");
    clearInterval(intervalId);
    wasAnswered = "no";
    endOfQuestion();
  };

  function roundDecrement() {
    timeLimit--;
    // console.log("timeLimit", timeLimit);
    $("#timeRemaining").text("Next question in " + timeLimit + " seconds!");
    if (timeLimit === 0) {
      roundTimeUp();
    }
  };

  function roundTimer() {
    intervalId = setInterval(roundDecrement, 1000);
    console.log("roundTimer() executed");
  };
  
  function roundTimeUp() {
    console.log("executing roundTimeUp()");
    clearInterval(intervalId);
    playRound();
  };

  // function pickAnswer() {
  //   clearInterval(intervalId);
  // }


    
  function refreshDisplay(currentQuestion) {
    console.log("refreshDisplay() executing");
    $("#currentQuestion").text(currentQuestion.question);
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
    $("#choice1 p").text(currentQuestion.choice1);
    $("#choice2 p").text(currentQuestion.choice2);
    $("#choice3 p").text(currentQuestion.choice3);
    $("#choice4 p").text(currentQuestion.choice4);
  };

  // function checkVars(location) {
    // console.log(location, "  usedQuestions: ", usedQuestions);
    // console.log(location, "  currentQuestion: ", currentQuestion);
    // console.log("");
  // };

  function pickQuestion() {
    qIndex = (Math.floor(Math.random() * questions.length));
    // console.log("inside pickQuestion(), before IF, qIndex: ", qIndex);
    if (usedQuestions.indexOf(qIndex) === -1) {
      usedQuestions.push(qIndex);
      console.log("adding new qIndex to usedQuestions[]")
      return qIndex;
    } 
    else {
      console.log("rejecting new qIndex, executing pickQuestion() to find another");
      pickQuestion();
    };
    // checkVars("end of pickQuestion()");
    // console.log("end of pickQuestion() qIndex: ", qIndex);
    return qIndex;
  };
  
  
  function newGameScreen() {
    console.log("newGameScreen() executing");
    $("#newGame").toggleClass("hidden");
    $("#choiceArea").toggleClass("hidden");
    $("#flavorImage").toggleClass("hidden");
    $("#currentQuestion").toggleClass("hidden");
    $("#numbers").toggleClass("hidden");
  }
  
  function askQuestion() {
    console.log("askQuestion() executing");
    currentQuestion = questions[pickQuestion()];
    refreshDisplay(currentQuestion);
    questionsAsked++;
  };
  
  function pickAnswer() {
    console.log("pickAnswer() executing, this: ", this);
    // console.log("this.id: ", this.id);
    // console.log("qIndex: ", qIndex);
    // console.log('questions', questions)
    // console.log("questions[qIndex].answer: ", questions[qIndex].answer);
    if (this.id === questions[qIndex].answer) {
      wasAnswered = "correct";
    } else {
      wasAnswered = "incorrect";
    };
    endOfQuestion();
  };

  function endOfQuestion() {
    console.log("endOfQuestion() executing");
    if (wasAnswered === "no") {
      console.log("Didn't answer in time!");
    } else if (wasAnswered === "correct") {
      console.log("Correct answer!");
    } else {
      console.log("Bad answer!");
    }
    clearInterval(intervalId);
    timeLimit = 10;
    roundTimer();
  };

  function playRound() {
    console.log("playRound() executing");
    if (questionsAsked < 10) {
      console.log("questionsAsked: ", questionsAsked);
      var wasAnswered = "";
      var wasCorrect = "";
      askQuestion();
      timeLimit = 7;
      answerTimer();
      $(".choice").on("click", pickAnswer);
    }
  };

  function startGame() {
    console.log("startGame() executing");
    newGameScreen();
    $("body").off("click", startGame);
    questionsCorrect = 0;
    usedQuestions = [];
    questionsAsked = 0;
    playRound();
  };

  $("body").on("click", startGame);

// }); // end ready() on document load

// click to start, start timer
// when either time runs out or question is selected
//  reset timer (not the interval), and load next question
// repeat until you have no more questions (use ifs to check)
