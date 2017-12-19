// $(function() { // begin ready() on document load

  var usedQuestions = [];
  var questionLimit = 10;
  var currentQuestion;

    
  function refreshDisplay(currentQuestion) {
    $("#currentQuestion").text(currentQuestion.question);
    $("#questionCount").text(questionsCorrect + " / " + questionsAsked);
    $("#choice1 p").text(currentQuestion.choice1);
    $("#choice2 p").text(currentQuestion.choice2);
    $("#choice3 p").text(currentQuestion.choice3);
    $("#choice4 p").text(currentQuestion.choice4);
  };

  function checkVars(location) {
    console.log(location);
    console.log("usedQuestions: ", usedQuestions);
    console.log("currentQuestion: ", currentQuestion);
    console.log("");
  };

  function pickQuestion() {
    var qIndex = (Math.floor(Math.random() * questions.length));
    console.log("inside pickQuestion(), before IF, qIndex: ", qIndex);
    if (usedQuestions.indexOf(qIndex) === -1) {
      usedQuestions.push(qIndex);
      console.log("inside pickQuestion(), after IF (qIndex not in usedQuestions[], qIndex: ", qIndex)
      return qIndex;
    } 
    else {
      console.log("inside pickQuestion(), after ELSE (qindex IS in usedQuestions[], qIndex: ", qIndex);
      pickQuestion();
    };
    return qIndex;
    checkVars("end of pickQuestion()");
  };
  
  
  
  
  function startGame() {
    usedQuestions = [];
    
    function playRound() {

      // function checkChoice() {
      //   if $(this.id)=""
      // }
      if (questionsAsked < 8) {
        currentQuestion = questions[pickQuestion()];
        console.log("in playRound() currentQuestion: ", currentQuestion);
        questionsAsked++;
        refreshDisplay(currentQuestion);
        console.log("in playRound() usedQuestions: ", usedQuestions);
        // $(".choice").on("click", checkChoice);
      }
      else {
        $("body").off("click");
      }
    };
    
    $("body").on("click", playRound);
    
  };

  var questionsAsked = 0;
  var questionsCorrect = 0;
  
  startGame();

// }); // end ready() on document load
