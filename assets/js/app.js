$(function() { // begin ready() on document load

  var pool;
  var question;
  var questionLimit = 10;
  var intervalId;
  var questionTime = 20;
  var roundDelay = 1;
  var timeLimit = questionTime;
  var answerPicked;
  var score = $("<div id='score'>");

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
    console.log("roundTimeUp() executing");
    // $("body").off("click", roundTimeUp);          
    clearInterval(intervalId);
    playRound();
  };

  function askQuestion(pool) {
    console.log("askQuestion() executing");
    $("h1").siblings().remove();
    question = pool.splice((Math.floor(Math.random() * pool.length)), 1)[0];
    var c1 = $("<div id='choice1'>").addClass("choice").html("<p>"+question.choice1+"</p>");
    var c2 = $("<div id='choice2'>").addClass("choice").html("<p>"+question.choice2+"</p>");
    var c3 = $("<div id='choice3'>").addClass("choice").html("<p>"+question.choice3+"</p>");
    var c4 = $("<div id='choice4'>").addClass("choice").html("<p>"+question.choice4+"</p>");
    $("#playArea").append("<p class='questionNumber'>Question "+(score.children().length + 1)+" / "+questionLimit);
    $("#playArea").append("<p class='textArea'>");
    $(".textArea").html(question.question);
    $("#playArea").append("<p class='timeRemaining'>");
    $("#playArea").append("<div id='choiceArea'>");
    $("#choiceArea").append(c1, c2, c3, c4);
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+question.image+"1.jpg' alt='image1.jpg'>");
    $(".choice").on("click", pickAnswer);    
    timeLimit = questionTime;
    answerTimer();
  };
  
  function pickAnswer() {
    console.log("pickAnswer() executing");
    $(this).siblings().addClass("notpicked");
    $("#" + question.answer).addClass("correct").removeClass("notpicked");
    answerPicked = this.id;
    $(".choice").off("click", pickAnswer);
    endOfQuestion(answerPicked);
  };
  
  function endOfQuestion(answerPicked) {
    console.log("endOfQuestion() executing");
    if (answerPicked === false) {        
      $("#"+question.answer).append("<img src='assets/images/redskullleft.png' class='flag' style='left:0'>");
      $("#"+question.answer).append("<img src='assets/images/redskullright.png' class='flag' style='right:0'>");
      $("#"+question.answer).siblings().remove();
      $(score).append("<img src='assets/images/redskullright.png' style='width: calc(80% / "+questionLimit+")'>");
      $("#choiceArea").prepend("<p class='incorrectAlert'>You ran out of time!");
    } else {
      if (answerPicked === question.answer) {
        $("#choiceArea").prepend("<p class='correctAlert'>Correct!");
        $(score).prepend("<img src='assets/images/greenskullleft.png' class='point' style='width: calc(80% / "+questionLimit+")'>");
      } else {
        $("#choiceArea").prepend("<p class='incorrectAlert'>Wrong!");
        $(score).append("<img src='assets/images/redskullright.png' style='width: calc(80% / "+questionLimit+")'>");
      };
      $(".notpicked").remove();
      $("#" + answerPicked).append("<img src='assets/images/redskullleft.png' class='flag' style='left:0'>");
      $("#" + answerPicked).append("<img src='assets/images/redskullright.png' class='flag' style='right:0'>");
      $(".correct").append("<img src='assets/images/greenskullleft.png' class='flag' style='left:0'>");
      $(".correct").append("<img src='assets/images/greenskullright.png' class='flag' style='right:0'>");
    };
    $(".flavorImage").remove();
    $("#playArea").append("<img class='flavorImage' src='assets/images/"+question.image+"2.jpg' alt='image2.jpg'>");
    $(".textArea").html(question.funFact);
    clearInterval(intervalId);
    timeLimit = roundDelay;
    roundTimer();
  };

  function endGame() {
    console.log("endGame() executing");
    $("h1").siblings().remove();
    var end1 = $("<p>").text("You answered "+score.children(".point").length+" out of "+score.children().length+" questions correctly!");
    var endImage = $("<img class='finalImage' src='assets/images/scarysupper.jpg' alt='image.jpg'>");
    var end2 = $("<p>").text("Thanks for playing! Click anywhere to try again!");
    $("<div id='endScreen'>").append(end1, score, endImage, end2).appendTo("#playArea");
    $("body").on("click", startGame);
  }

  function playRound() {
    console.log("playRound() executing");
    if (score.children().length < questionLimit) {
      askQuestion(pool);
    } else endGame();
  };

  function startGame() {
    console.log("startGame() executing");
    $("#newGame").remove();
    $("body").off("click", startGame);
    pool = questions.slice();
    score.empty();
    playRound();
  };

  $("body").on("click", startGame);

}); // end ready() on document load
