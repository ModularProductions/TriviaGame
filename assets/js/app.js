$(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var qIndex;
  var questionsAsked;
  var questionsCorrect;
  var intervalId;
  var questionTime = 20;
  var roundDelay = 10;
  var timeLimit = questionTime;
  var answerPicked;
  var finalScore = $("<div id='finalScore'>");

  function answerDecrement() {
    timeLimit--;
    $(".timeRemaining").text("Time remaining: " + timeLimit + " seconds!");
    if (timeLimit === 0) {
      answerTimeUp();
    }
  };

  function answerTimer() {
    $(".timeRemaining").text("Time remaining: " + timeLimit + " seconds!");
    intervalId = setInterval(answerDecrement, 1000);
    console.log("answerTimer() executed");
  };
  
  function answerTimeUp() {
    console.log("executing answerTimeUp()");
    $(".choice").off("click", pickAnswer);
    clearInterval(intervalId);
    endOfQuestion(false);
  };
  
  function roundTimer() {
    console.log("roundTimer() executed");
    $(".timeRemaining").text("Next question in " + timeLimit + " seconds!");
    intervalId = setInterval(roundDecrement, 1000);
    // $("body").on("click", roundTimeUp);    
  };
  
  function roundDecrement() {
    timeLimit--;
    $(".timeRemaining").text("Next question in " + timeLimit + " seconds!");
    if (timeLimit === 0) {
      roundTimeUp();
    }
  };

  function roundTimeUp() {
    console.log("executing roundTimeUp()");
    // $("body").off("click", roundTimeUp);          
    clearInterval(intervalId);
    playRound();
  };
  
  function pickQuestion() {
    qIndex = (Math.floor(Math.random() * questions.length));
    if (usedQuestions.indexOf(qIndex) === -1) {
      usedQuestions.push(qIndex);
      console.log("adding new qIndex to usedQuestions[]")
      return qIndex;
    } else {
      console.log("rejecting new qIndex, executing pickQuestion() to find another");
      pickQuestion();
    };
    return qIndex;
  };
  
  function askQuestion() {
    console.log("askQuestion() executing");
    $("h1").siblings().remove();
    pickQuestion();
    var c1 = $("<div id='choice1'>").addClass("choice").html("<p>"+questions[qIndex].choice1+"</p>");
    var c2 = $("<div id='choice2'>").addClass("choice").html("<p>"+questions[qIndex].choice2+"</p>");
    var c3 = $("<div id='choice3'>").addClass("choice").html("<p>"+questions[qIndex].choice3+"</p>");
    var c4 = $("<div id='choice4'>").addClass("choice").html("<p>"+questions[qIndex].choice4+"</p>");
    questionsAsked++;
    $("#playArea").append("<p class='questionNumber'>Question "+questionsAsked+" / "+questionLimit);
    $("#playArea").append("<p class='textArea'>");
    $(".textArea").html(questions[qIndex].question);
    $("#playArea").append("<p class='timeRemaining'>");
    $("#playArea").append("<div id='choiceArea'>");
    $("#choiceArea").append(c1, c2, c3, c4);
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].image+"1.jpg' alt='image1.jpg'>");
    $(".choice").on("click", pickAnswer);    
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
    console.log("endOfQuestion() executing, answerPicked = ", answerPicked);
    if (answerPicked === false) {        
      $("#"+questions[qIndex].answer).append("<img src='assets/images/redskullleft.png' class='flag' style='left:0'>");
      $("#"+questions[qIndex].answer).append("<img src='assets/images/redskullright.png' class='flag' style='right:0'>");
      $("#"+questions[qIndex].answer).siblings().remove();
      $(finalScore).append("<img src='assets/images/redskullright.png' style='width: calc(80% / "+questionLimit+")'>");
      $("#choiceArea").prepend("<p class='incorrectAlert'>You ran out of time!");
    } else {
      if (answerPicked === questions[qIndex].answer) {
        questionsCorrect++;
        $("#choiceArea").prepend("<p class='correctAlert'>Correct!");
        $(finalScore).prepend("<img src='assets/images/greenskullleft.png' style='width: calc(80% / "+questionLimit+")'>");

      } else {
        $("#choiceArea").prepend("<p class='incorrectAlert'>Wrong!");
        $(finalScore).append("<img src='assets/images/redskullright.png' style='width: calc(80% / "+questionLimit+")'>");
      };
      $(".notpicked").remove();
      $("#" + answerPicked).append("<img src='assets/images/redskullleft.png' class='flag' style='left:0'>");
      $("#" + answerPicked).append("<img src='assets/images/redskullright.png' class='flag' style='right:0'>");
      $(".correct").append("<img src='assets/images/greenskullleft.png' class='flag' style='left:0'>");
      $(".correct").append("<img src='assets/images/greenskullright.png' class='flag' style='right:0'>");
    };
    $(".flavorImage").remove();
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+questions[qIndex].image+"2.jpg' alt='image2.jpg'>");
    $(".textArea").html(questions[qIndex].funFact);
    clearInterval(intervalId);
    timeLimit = roundDelay;
    roundTimer();
  };

  function endGame() {
    $("h1").siblings().remove();
    var end1 = $("<p>").text("You answered "+questionsCorrect+" out of "+questionsAsked+" questions correctly!");
    var endImage = $("<img class='finalImage' src='assets/images/scarysupper.jpg' alt='image.jpg'>");
    var end2 = $("<p>").text("Thanks for playing! Click anywhere to try again!");
    $("<div id='endScreen'>").append(end1, finalScore, endImage, end2).appendTo("#playArea");
    $("body").on("click", startGame);
  }

  function playRound() {
    console.log("playRound() executing");
    if (questionsAsked < questionLimit) {
      console.log("questionsAsked: ", questionsAsked);
      askQuestion(qIndex);
    } else endGame();
  };

  function startGame() {
    console.log("startGame() executing");
    $("#newGame").remove();
    $("body").off("click", startGame);
    questionsCorrect = 0;
    usedQuestions = [];
    questionsAsked = 0;
    finalScore.empty();
    playRound();
  };

  $("body").on("click", startGame);

}); // end ready() on document load
