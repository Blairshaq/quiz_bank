// Assignment code here
var quizTime = 15
var highScores = [] //array that shall contain the high scores of each user

var timerInterval

window.onload = function () {
  //on page load hide all divs except start div
  var questionDiv = document.querySelector("#questionDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#initialsDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#highScoresDiv")
  questionDiv.style.display = "none"



};

var questions = [
  {
    questionid: 1,
    question: "What is abbreviation of DOM?",
    answers: [{
      answerText: "Deployed Object Model",
      answer: "Wrong"
    },
    {
      answerText: "Document Object Model",
      answer: "Correct"
    },
    {
      answerText: "Distructor Object Model",
      answer: "Wrong"
    },
    {
      answerText: "Deep Object Model",
      answer: "Wrong"
    }]
  },
  {
    questionid: 2,
    question: "The Condition in an if/else condition is enclosed with ________?",
    answers: [{
      answerText: "Quotes",
      answer: "Wrong"
    },
    {
      answerText: "Paranthesis",
      answer: "Wrong"
    },
    {
      answerText: "Curly Braces",
      answer: "Correct"
    },
    {
      answerText: "Square Brackets",
      answer: "Wrong"
    }]
  }
]
var currentQuestionIndex = 0 //counter to iterate over questions array
let questionsLength = questions.length

//prints each question and its answers btn on screen
function populateQuestions() {
  //get the length of all questions


  for (var i = 0; i < questionsLength; i++) {
    //select question element from dom
    document.getElementById('question').innerHTML = questions[currentQuestionIndex].question
    document.getElementById('btn1').innerHTML = questions[currentQuestionIndex].answers[0].answerText
    document.getElementById('btn2').innerHTML = questions[currentQuestionIndex].answers[1].answerText
    document.getElementById('btn3').innerHTML = questions[currentQuestionIndex].answers[2].answerText
    document.getElementById('btn4').innerHTML = questions[currentQuestionIndex].answers[3].answerText

    document.getElementById('btn1').setAttribute("questionid", `${questions[currentQuestionIndex].questionid}`)
    document.getElementById('btn2').setAttribute("questionid", `${questions[currentQuestionIndex].questionid}`)
    document.getElementById('btn3').setAttribute("questionid", `${questions[currentQuestionIndex].questionid}`)
    document.getElementById('btn4').setAttribute("questionid", `${questions[currentQuestionIndex].questionid}`)
    break
  } //end for loop

  currentQuestionIndex++ //increasing the questions index after every answer given and displaying next question

} //end function

//on each answer button press this function validates the answer given by user
function checkAnswer(elem) {

  var questionid = parseInt(elem.getAttribute('questionid')) //get current questions id
  var givenAnswer = elem.innerHTML                          // gets the answer value from button

  //checks which question is currently attempted
  var answeredQuestion = questions.find(question => question.questionid === questionid)

  //finds which answer is given out of four options
  var validAnswer = answeredQuestion.answers.find(answer => answer.answerText === givenAnswer)

  //if answer is wrong then penalize the user by 10 seconds and subtract from timer
  if (validAnswer.answer == "Wrong") {
    quizTime -= 10
  }

  //if all answer are attempted then proceed to results
  if (currentQuestionIndex == questionsLength) {
    //clear the time
    clearInterval(timerInterval)
    var questionDiv = document.querySelector("#questionDiv")
    questionDiv.style.display = "none"

    var initialsDiv = document.querySelector("#initialsDiv")
    initialsDiv.style.display = "block"

    //display final score on screen
    document.getElementById('finalScore').innerHTML = "Your Score is: " + quizTime

    //display if the answer is correct or wrong in screen
    document.getElementById('answerOnInitialDiv').innerHTML = validAnswer.answer


  } else {
    //else if there are questions in questons array then populate next question
    populateQuestions()

    document.getElementById('answerGiven').innerHTML = validAnswer.answer
  }


} //end function

function getInitials() {
  var initialsValue = document.getElementById('initials').value

  document.getElementById('initials').value = ""

  //save current users initials and score obtained
  var userscore = {
    initials: initialsValue,
    score: quizTime
  }

  //save current users score in highscres array
  highScores.push(userscore)

  var questionDiv = document.querySelector("#initialsDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#highScoresDiv")
  questionDiv.style.display = "block"

  var highscroesdiv = document.getElementById("usersHighScores")
  highscroesdiv.innerHTML = ''

  //display all the scroes by all users
  for (var i = 0; i < highScores.length; i++) {
    const h4 = document.createElement("h4")
    h4.innerHTML = highScores[i].initials + " - " + highScores[i].score
    h4.style = 'background: grey;'
    highscroesdiv.appendChild(h4)

  }
} //end function

//when view high scroes link is clicked all the scores are displayed
function viewHighScores() {

  clearInterval(timerInterval)
  var questionDiv = document.querySelector("#startQuizDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#questionDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#initialsDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#highScoresDiv")
  questionDiv.style.display = "block"

  var highscroesdiv = document.getElementById("usersHighScores")
  highscroesdiv.innerHTML = ''

  for (var i = 0; i < highScores.length; i++) {

    const h4 = document.createElement("h4")
    h4.innerHTML = highScores[i].initials + " - " + highScores[i].score
    h4.style = 'background: grey;'
    highscroesdiv.appendChild(h4)

  }

} //end function

//called when clear High Scores function is called
function clearHighScores() {
  highScores = []
  viewHighScores()
}

function resetQuiz() {

  quizTime = 15
  currentQuestionIndex = 0

  var questionDiv = document.querySelector("#highScoresDiv")
  questionDiv.style.display = "none"

  var questionDiv = document.querySelector("#startQuizDiv")
  questionDiv.style.display = "block"

  document.getElementById('answerGiven').innerHTML = ""


} //end function

//start timer on each quiz attempt
function timer() {

  timerInterval = setInterval(function () {
    document.getElementById('quizTimer').innerHTML = 'Time:' + quizTime
    quizTime--;
    if (quizTime < 0) {
      var questionDiv = document.querySelector("#questionDiv")
      questionDiv.style.display = "none"

      var initialsDiv = document.querySelector("#initialsDiv")
      initialsDiv.style.display = "block"

      document.getElementById('finalScore').innerHTML = "Your Score is: " + quizTime
      clearInterval(timerInterval)
    }
  }, 1000);
} //en function

//start timer and quiz
function startQuiz() {

  var startQzDiv = document.querySelector("#startQuizDiv")
  startQzDiv.style.display = "none"

  var questionDiv = document.querySelector("#questionDiv")
  questionDiv.style.display = "block"

  timer()
  populateQuestions()

} //end function




function addEventListnerToAllAnswerBtns() {

  // Get references to the #answer button
  var answerBtns = document.getElementsByClassName("answerbtn")
  // Add event listeners to all buttons

  for (var i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener("click", checkAnswer)
  }

}

// Get references to the #start quiz button
var startQzBtn = document.querySelector("#startQzBtn")
// Add event listener to Start Quiz button
startQzBtn.addEventListener("click", startQuiz)