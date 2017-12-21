// $(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var qIndex;
  var currentQuestion;
  var questionsAsked;
  var questionsCorrect;
  var intervalId;
  var timeLimit;
  var answerPicked;

  function answerDecrement() {
    timeLimit--;
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
    endOfQuestion();
  };

  function roundDecrement() {
    timeLimit--;
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

  function refreshDisplay(currentQuestion) {
    console.log("refreshDisplay() executing");
    $("#currentQuestion").text(currentQuestion.question);
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
  }

  function pickQuestion() {
    qIndex = (Math.floor(Math.random() * questions.length));
    if (usedQuestions.indexOf(qIndex) === -1) {
      usedQuestions.push(qIndex);
      console.log("adding new qIndex to usedQuestions[]")
      return qIndex;
    } 
    else {
      console.log("rejecting new qIndex, executing pickQuestion() to find another");
      pickQuestion();
    };
    return qIndex;
  };
  
  
  function newGameScreen() {
    console.log("newGameScreen() executing");
    $("#newGame").toggleClass("hidden");
    $("#numbers").toggleClass("hidden");
  }
  
  function askQuestion(currentQuestion) {
    console.log("askQuestion() executing");
    $("#currentQuestion").remove();
    $("#choiceArea").remove();
    currentQuestion = questions[pickQuestion()];
    var c1 = $("<div id='choice1'>").addClass("choice").html("<p>"+currentQuestion.choice1+"</p>");
    var c2 = $("<div id='choice2'>").addClass("choice").html("<p>"+currentQuestion.choice2+"</p>");
    var c3 = $("<div id='choice3'>").addClass("choice").html("<p>"+currentQuestion.choice3+"</p>");
    var c4 = $("<div id='choice4'>").addClass("choice").html("<p>"+currentQuestion.choice4+"</p>");

    $("#playArea").append("<p id='currentQuestion'>" + currentQuestion.question);
    $("#playArea").append("<div id='choiceArea'>");
    $("#choiceArea").append(c1, c2, c3, c4);
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].pic1+".jpg' alt='pic1.jpg'>");
    questionsAsked++;
    answerPicked = false;
    timeLimit = 7;
    answerTimer();
  };
  
  function pickAnswer() {
    console.log("pickAnswer() executing, this: ", this);
    answerPicked = this.id;
    $(".choice").off("click", pickAnswer);
    endOfQuestion(answerPicked);
  };

  function endOfQuestion(answerPicked) {
    console.log("endOfQuestion() executing");
    $(".choice").off("click", pickAnswer);
    if (answerPicked === questions[qIndex].answer) {
      $("#" + questions[qIndex].answer).append("<div class='correctResult'>");
      questionsCorrect++;
    } else {
      $("#" + questions[qIndex].answer).append("<div class='incorrectResult'>");
    };
    $(".flavorImage").remove();
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].pic2+".jpg' alt='pic2.jpg'>");
    $("#choiceArea").append("<p class='funFact'>" + questions[qIndex].funFact);
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
    clearInterval(intervalId);
    timeLimit = 10;
    roundTimer();
  };

  function playRound() {
    console.log("playRound() executing");
    if (questionsAsked < questionLimit) {
      console.log("questionsAsked: ", questionsAsked);
      var wasCorrect = "";
      askQuestion(qIndex);
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
