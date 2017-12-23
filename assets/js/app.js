// ToDo: remove .hidden, adjust #newGame

$(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var qIndex;
  var currentQuestion;
  var questionsAsked;
  var questionsCorrect;
  var intervalId;
  var questionTime = 999;
  var questionDelay = 999;
  var timeLimit = questionTime;
  var answerPicked;

  function answerDecrement() {
    timeLimit--;
    $(".timeRemaining").text("Time remaining: " + timeLimit + " seconds!");
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
    $(".choice").off("click", pickAnswer);
    clearInterval(intervalId);
    endOfQuestion();
  };
  
  function roundTimer() {
    console.log("roundTimer() executed");
    intervalId = setInterval(roundDecrement, 1000);
    // $("body").on("click", roundTimeUp);    
  };
  
  function roundDecrement() {
    $(".timeRemaining").text("Next question in " + timeLimit + " seconds, or click to continue!");
    if (timeLimit === 0) {
      roundTimeUp();
    }
    timeLimit--;
  };

  function roundTimeUp() {
    console.log("executing roundTimeUp()");
    clearInterval(intervalId);
    $("body").off("click", roundTimeUp);    
    playRound();
  };
  
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
  
  function askQuestion(currentQuestion) {
    console.log("askQuestion() executing");
    $(".textArea").remove();
    $("#choiceArea").remove();
    $(".flavorImage").remove();
    $(".questionNumber").remove();
    currentQuestion = questions[pickQuestion()];
    var c1 = $("<div id='choice1'>").addClass("choice").html("<p>"+currentQuestion.choice1+"</p>");
    var c2 = $("<div id='choice2'>").addClass("choice").html("<p>"+currentQuestion.choice2+"</p>");
    var c3 = $("<div id='choice3'>").addClass("choice").html("<p>"+currentQuestion.choice3+"</p>");
    var c4 = $("<div id='choice4'>").addClass("choice").html("<p>"+currentQuestion.choice4+"</p>");
    questionsAsked++;
    $("#playArea").append("<p class='textArea'>"+(currentQuestion.question));
    $(".textArea").after("<p class='timeRemaining'>");
    $(".textArea").before("<p class='questionNumber'>Question "+questionsAsked+" / "+questionLimit);
    $("#playArea").append("<div id='choiceArea'>");
    $("#choiceArea").append(c1, c2, c3, c4);
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].image+"1.jpg' alt='image1.jpg'>");
    $(".choice").on("click", pickAnswer);    
    answerPicked = false;
    timeLimit = questionTime;
    answerTimer();
  };
  
  function pickAnswer() {
    console.log("pickAnswer() executing, this: ", this);
    $(this).siblings().addClass("notpicked");
    $("#" + questions[qIndex].answer).addClass("correct").removeClass("notpicked");
    answerPicked = this.id;
    $(".choice").off("click", pickAnswer);
    endOfQuestion(answerPicked);
  };
  
  function endOfQuestion(answerPicked) {
    console.log("endOfQuestion() executing");
    $(".notpicked").remove();
    if (answerPicked === questions[qIndex].answer) {
      questionsCorrect++;
    } else {
    };
    $("#" + answerPicked).append("<div class='incorrectResult'>");
    $(".correct").append("<div class='correctResult'>");
    $(".flavorImage").remove();
    $("#textArea").remove();    
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].image+"2.jpg' alt='image2.jpg'>");
    $(".textArea").text(questions[qIndex].funFact);
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
    clearInterval(intervalId);
    timeLimit = questionDelay;
    roundTimer();
  };

  function playRound() {
    console.log("playRound() executing");
    if (questionsAsked < questionLimit) {
      console.log("questionsAsked: ", questionsAsked);
      askQuestion(qIndex);
    }
  };

  function startGame() {
    console.log("startGame() executing");
    $("#newGame").remove();
    $("body").off("click", startGame);
    // $("#playArea").append("Time remaining: "+timeLimit+" seconds!");    
    questionsCorrect = 0;
    usedQuestions = [];
    questionsAsked = 0;
    playRound();
  };

  $("body").on("click", startGame);

}); // end ready() on document load

// click to start, start timer
// when either time runs out or question is selected
//  reset timer (not the interval), and load next question
// repeat until you have no more questions (use ifs to check)
