// These are the variables that will be utilized while a user is interacting with the application
let initialKey = "q1";
let currentKey;
let finalKey;
let chosenAnswer;
let currentScore;
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
    "document.getElementbyID('p')", 
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
document.getElementById('startButton').addEventListener("click", function(){
    document.getElementById('startButton').style.display = "none";
    document.getElementById('quiz').style.display = "inline-block"
})

// These are all functions that will be utilized to progress through the quiz itself
let initializer = function(){
    currentKey = initialKey;
    currentScore = 0;
    finalKey = Object.keys(questions).pop();
}

let renderQuestion = function(){
    document.getElementById("question").textContent = questions[currentKey];
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
    if(currentKey === finalKey){
        currentKey = initialKey;
    }
}

let nextKeyAssigner = function(){
    for(let i = 0; i < Object.keys(questions).length; i++){
        if(currentKey === finalKey){
            currentKey = initialKey;
            return;
        } else if(currentKey === `q${i}` ){
            i += 1;
            currentKey = `q${i}`;
            return;
        }
    }
}

let chooseAnswer = function(answer){
    chosenAnswer = answer.textContent;
    document.getElementById('selectedAnswer').textContent = `You Chose → ${chosenAnswer}`;
}

let checkAnswer = function(){
    if(chosenAnswer === answerKey[currentKey]){
        currentScore++;
    } else {
        currentScore--;
    }
    document.getElementById("currentScore").textContent = `Current Score: ${currentScore}`
}

let renderAll = function(){
    checkAnswer();
    nextKeyAssigner();
    renderQuestion();
    renderAnswers();
}


initializer();
renderQuestion();
renderAnswers();

document.getElementById("nextQuestion").addEventListener("click", renderAll);
