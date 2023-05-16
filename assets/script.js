//retrieve html elements by Id
var timeleft = document.getElementById("time-left");

var quizresultEl = document.getElementById("result");

var totalscoreEl = document.getElementById("totalScore");

var gameoverDiv = document.getElementById("gameover");

var quizQuestions = document.getElementById("questions");

var TimerDiv = document.getElementById("timer");

var StartQuizBtn = document.getElementById("startquiz");

var mainpage= document.getElementById("main-page");

var highScoreDiv = document.getElementById("high-score-mainpage");


var ViewHighScores = document.getElementById("view-high-scores");

var UserInitialsInput =  document.getElementById("initials");

var ScoreInitialsDiv =  document.getElementById("score-initials");

var GameEndDiv =  document.getElementById("gameend");

var SubmitBtn =  document.getElementById("submit");

var HighScoreEl = document.getElementById("highscore-value");

var OptionAbtn =  document.getElementById("option-1");

var OptionBbtn =  document.getElementById("option-2");

var OptionCbtn =  document.getElementById("option-3");

var OptionDbtn =  document.getElementById("option-4");


//Lets create Quiz Questions Object
var Allquestions =[
  //question1
  {
    question : "Commonly used data types doesnot include?",
    option1: "Boolean",
    option2 : "String",
    option3 : "Alerts",//option 3 is correct
    option4 : "Number",
    correctanswer : "option-3",
  },
//question2
{
  question:"What does API stands for?",
  option1: "Application Programming Interface",//option 1 is correct
  option2 : "Application Point Interface",
  option3 : "Application Programming Internet",
  option4 : "Alert Programming Interface",
  correctanswer : "option-1",
},
//question3

{
  question : "String values must be enclosed within___________when being assigned to variables ?",
  option1: "curly brackets",
  option2 : "commas",//option 2 is correct
  option3 : "quotes",
  option4 : "parenthesis",
  correctanswer : "option-2",
},
//question4
{
  question : "Arrays in Javascript can be used to store",
  option1: "Numbers and Strings",
  option2 : "other arrays",//option 2 is correct
  option3 : "booleams",
  option4 : "all of the above",
  correctanswer : "option-4",
},
//question5
{
question:"What does DOM stands for?",
  option1: "Document Object Manipulation",
  option2 : "Documentation Object Model",
  option3 : "Data Object Model",
  option4 : "Document Object Model",//option 4 is correct
  correctanswer : "option-4",
},
];

//Assign global variables
var finalQuestion = Allquestions.length;
var currentQuestion = 0;
var timeleft = 76;
var timeinterval;
var score = 0;
var correct;

//this function go through the oject array to get the questions and answers

function CreateQuizQuestions(){
  gameoverDiv.style.display = "none";
  if(currentQuestion === finalQuestion)
{
  return finalscore();
}

var currentQuestionType = Allquestions[currentQuestion];
quizQuestions.innerHTML = currentQuestionType.question;
OptionAbtn.innerHTML = currentQuestionType.option1;
OptionBbtn.innerHTML = currentQuestionType.option2;
OptionCbtn.innerHTML = currentQuestionType.option3;
OptionDbtn.innerHTML = currentQuestionType.option4;

};



//start quiz function
function startjavascriptQuiz(){
  gameoverDiv.style.display = "none";
  mainpage.style.display = "none";
  CreateQuizQuestions();
  
  //timer of the quiz
  timeinterval = setInterval(function(){
  timeleft--;
  TimerDiv.textContent = "Time Left: " + timeleft;
  
  if(timeleft === 0){
    clearInterval(timeinterval);
    finalscore();
  
  }
  
  },1000);
  mainpage.style.display = "block";
  }
  

//create a function that will display your scores
function finalscore(){
  // timeleft.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timeinterval);
  UserInitialsInput.value ="";
  totalscoreEl.innerHTML = "You got " + score + " out of " + Allquestions.length + " correct!";

} 

//Event listener on Submit button
SubmitBtn.addEventListener("click",function highscorefunction(){
  if(UserInitialsInput.value === ""){
   alert("Please Enter your initials!!");
   return false;
  }
  else{
   var savedscores = JSON.parse(localStorage.getItem("savedscores")) || [];
   var currentUser = UserInitialsInput.value.trim();
   var currrentscore = {
     name : currentUser,
     score : score
   };

gameoverDiv.style.display = "none";
highScoreDiv.style.display ="flex";
ViewHighScores.style.display ="block";


savedscores.push(currrentscore);
localStorage.setItem("savedscores",JSON.stringify(savedscores));
createHighScores();
}
});

//This function clears the list for the high scores and creates a new high score list from local storage
function createHighScores(){
  ScoreInitialsDiv.innerHTML = "";
  HighScoreEl.innerHTML = "";
  var quizscores = JSON.parse(localStorage.getItem("savedscores")) || [];
  for(index=0; index<quizscores.length;index++){
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = quizscores[index].name;
    newScore.textContent = quizscores[index].score;
    ScoreInitialsDiv.appendChild(newName);
    HighScoreEl.appendChild(newScore);
  }
}

//this function displays high scores

function showscores(){
mainpage.style.display = "none";
  gameoverDiv.style.display = "none";
  highScoreDiv.style.display ="flex";
  ViewHighScores.style.display = "block";
  GameEndDiv.style.display = "flex";

  createHighScores();
}








//this function is going to clear the local storage of high score
function clearAllScores(){
window.localStorage.clear();
ScoreInitialsDiv.textContent = "";
HighScoreEl.textContent = "";
}
//this function reset all the value 
function playagainQuiz(){
  highScoreDiv.style.display ="none";
  gameoverDiv.style.display = "none";
  mainpage.style.display = "flex";
  timeleft =76;
score = 0;
currentQuestion=0;
}

//this function check the answer
function checkAnswer(answer){
correct = Allquestions[currentQuestion].correctanswer;

if(answer === correct && currentQuestion !== finalQuestion){
  score++;
  alert("Correct");
  currentQuestion++;
  CreateQuizQuestions();
}
  else if (answer !== correct && currentQuestion !== finalQuestion){
    alert("Incorrect");
    currentQuestion++;
    timeleft = timeleft-15;
    CreateQuizQuestions();

  }
  else{
    finalscore();
  }

}
//this function to start the quiz
StartQuizBtn.addEventListener("click",startjavascriptQuiz);








