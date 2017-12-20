// $(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var qIndex = [];
  var currentQuestion;

    
  function refreshDisplay(currentQuestion) {
    $("#currentQuestion").text(currentQuestion.question + "  " + questions.indexOf(currentQuestion));
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
    $("#choice1 p").text(currentQuestion.choice1);
    $("#choice2 p").text(currentQuestion.choice2);
    $("#choice3 p").text(currentQuestion.choice3);
    $("#choice4 p").text(currentQuestion.choice4);
  };

  function checkVars(location) {
    console.log(location, "  usedQuestions: ", usedQuestions);
    console.log(location, "  currentQuestion: ", currentQuestion);
    console.log("");
  };

  function pickQuestion() {
    qIndex = (Math.floor(Math.random() * questions.length));
    console.log("inside pickQuestion(), before IF, qIndex: ", qIndex);
    if (usedQuestions.indexOf(qIndex) === -1) {
      usedQuestions.push(qIndex);
      console.log("inside pickQuestion(), after IF (qIndex not in usedQuestions[]), qIndex: ", qIndex)
      return qIndex;
    } 
    else {
      console.log("inside pickQuestion(), after ELSE (qindex IS in usedQuestions[]), qIndex: ", qIndex);
      pickQuestion();
    };
    checkVars("end of pickQuestion()");
    console.log("end of pickQuestion() qIndex: ", qIndex);
    return qIndex;
  };
  
  
  
  
  function startGame() {
    $("#newGame").toggleClass("hidden");
    usedQuestions = [];
    
    function newQuestion() {

      // function checkChoice() {
      //   if $(this.id)=""
      // }
      console.log("-----MOUSE CLICK-----");
      if (questionsAsked < 8) {
        currentQuestion = questions[pickQuestion()];
        console.log("in newQuestion() currentQuestion: ", currentQuestion);
        questionsAsked++;
        refreshDisplay(currentQuestion);
        console.log("in playRound() usedQuestions: ", usedQuestions);
        // $(".choice").on("click", checkChoice);
      }
      else {
        $("body").off("click");
      }
    };
    
    $("body").on("click", newQuestion);
    
  };

  var questionsAsked = 0;
  var questionsCorrect = 0;
  
  startGame();

// }); // end ready() on document load
