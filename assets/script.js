// These are the variables that will be utilized while a user is interacting with the application
let startButton = document.getElementById('startButton');
let questionEl = document.getElementById("question");
let selectedAnswer = document.getElementById('selectedAnswer');
let renderedScore = document.getElementById("currentScore");
let nextQuesh = document.getElementById("nextQuestion");
let submitBtn = document.getElementById("submitButton");
let initialKey = "q1";
let currentKey;
let currentKeyIndex;
let finalKey;
let chosenAnswer;
let currentScore;
let timer = 30;
let questions = {
    q1: "What kinds of data types can be used as a JS object's value?",

    q2: "How do you apply JS functionality on every paraphgraph element in an HTML file?",

    q3: "What is the correct JavaScript syntax to change the content of the HTML element below? \r\n <p id='demo'>This is a demonstration.</p>",

    q4: "How would a developer alert the message 'Hello World!'?",

    q5: "How do you create a function that is stored in a variable called 'myFunc'?"
};
let answers = {
    q1: ["Arrays", "Numbers", "Strings", "All possible answers"],

    q2: [
    "document.getElementbyId('p')", 
    "document.querySelectorAll('p')", 
    "document.selectParagraph()", 
    "document.p.setAttribute()"],

    q3: [
    "document.getElementById('demo').innerHTML = 'Hello World!'", 
    "document.querySelectorAll('p').innerHTML = 'Hello World!'", 
    "document.getElementByName('p').innerHTML = 'Hellow World!'", 
    "#demo.innerHTML = 'Hello World!'"],

    q4: [
        "msg('Hello World!')",
        "alertBox('Hello World!')",
        "alert('Hello World!')",
        "msgBox('Hello World!')"
    ],

    q5: [
        "function myFunc = function(){}",
        "let myFunc = function(){}",
        "let function = myFunc(){}",
        "let myFunc:function(){}"
    ]
};
let answerKey = {
    q1: answers["q1"][3],
    q2: answers["q2"][1],
    q3: answers["q3"][0],
    q4: answers["q4"][2],
    q5: answers["q5"][2]
}

// This is a function that will load the quiz itself upon clicking start
startButton.addEventListener("click", function(){
    document.getElementById('startButton').style.display = "none";
    document.getElementById('quiz').style.display = "inline-block"
})

// These are all functions that will be utilized to progress through the quiz itself
let initializer = function(){
    currentKey = initialKey;
    currentKeyIndex = 1;
    currentScore = 0;
    finalKey = Object.keys(questions)[Object.keys(questions).length-1];
}

let renderQuestion = function(){
    questionEl.textContent = questions[currentKey];
}

let renderAnswers = function(){
    let answersAvailable = [0, 1, 2, 3];
    let answerToBeRendered = 1;
    let currentAnswerSet = answers[currentKey]; 
    let answerRendered; 

    for(let i = 0; i < currentAnswerSet.length; i++){
        answerRendered = Math.floor(Math.random() * answersAvailable.length);
        if(answerRendered in answersAvailable){
            document.getElementById(`answerChoice${answerToBeRendered}`).textContent = currentAnswerSet[answerRendered];
            delete answersAvailable[answerRendered]
            answerToBeRendered++;
        } else {
            i--;
        }
    }
}

let nextKeyAssigner = function(){
    if(currentKey === `q${currentKeyIndex}`){
        currentKeyIndex++;
        currentKey = `q${currentKeyIndex}`;
    }
}

let chooseAnswer = function(answer){
    chosenAnswer = answer.textContent;
    selectedAnswer.textContent = `You Chose → ${chosenAnswer}`;
}

let checkAnswer = function(){
    if(chosenAnswer === answerKey[currentKey]){
        currentScore++;
        renderedScore.textContent = `Current Score: ${currentScore}`
    } else {
        timer -= 5;
    }
}

let renderAll = function(){
    checkAnswer();
    if(currentKey === finalKey){
        nextQuesh.style.display = "none";
        submitBtn.style.display = "inline-block";
        initializer();
        return;
    } else {
        nextKeyAssigner();
        renderQuestion();
        renderAnswers();
    }
}


// These are all of the functions that will be called as soon as the quiz is loaded to intialize all variables and load each question and answer set
initializer();
renderQuestion();
renderAnswers();

// This event handler will, upon click next question, run all of the functions specified in renderAll()
nextQuesh.addEventListener("click", renderAll);





// Functionality to ADD:
    // Working Timer that changes intermittently on screen and will decrease with each incorrect answer
    // Score page that will load when timer hits 0 or submit is clicked
        // Will have an input box for user initials to be stored to scores object that will be saved in localstorage
    // CSS styling