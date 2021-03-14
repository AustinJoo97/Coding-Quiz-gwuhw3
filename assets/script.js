// These are the variables that will be utilized while a user is interacting with the application
let startButton = document.getElementById('startButton');
let questionEl = document.getElementById('question');
let quizEl = document.getElementById('quiz')
let scoreEntry= document.getElementById('yourScore');
let hiScoreDisplay = document.getElementById('hiScoreTable');
let top5 = document.getElementById('top5List');
let selectedAnswer = document.getElementById('selectedAnswer');
let renderedScore = document.getElementById('currentScore');
let nextQuesh = document.getElementById('nextQuestion');
let submitBtn = document.getElementById('submitButton');
let saveBtn = document.getElementById('saveButton');
let timerDisplay = document.getElementById('timer');
let userInitials = document.getElementById('userInitials');
let initialKey = 'q1';
let currentKey;
let currentKeyIndex;
let finalKey;
let chosenAnswer;
let currentScore;
let timeLeft;
let youPlaced;
let questions = {
    q1: "What kinds of data types can be used as a JS object's value?",

    q2: "How do you apply JS functionality on every paraphgraph element in an HTML file?",

    q3: "What is the correct JavaScript syntax to change the content of the HTML element below? \n\n <p id='demo'>This is a demonstration.</p>",

    q4: "How would a developer alert the message 'Hello World!'?",

    q5: "How do you create a function that is stored in a variable called 'myFunc'?"
};
let answers = {
    q1: ["Arrays", "Numbers", "Strings", "All possible answers"],

    q2: [
    "document.getElementById('p')", 
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
    q5: answers["q5"][1]
}

// This is a function that will load the quiz itself upon clicking start
    // It will also begin the timer which corresponds with the quiz, forcing the user to finish the quiz in time alloted. Once the timer hits zero, it will run the enterScore() func below
startButton.addEventListener("click", function(){
    timeLeft = 30;
    timerDisplay.textContent = `${timeLeft} Seconds Remaining!`;
    document.getElementById('startButton').style.display = "none";
    document.getElementById('quiz').style.display = "inline-block";
})

// This function will begin the timer which corresponds with the quiz, forcing the user to finish the quiz in time alloted. 
    // Once the timer hits zero, it will run the enterScore() func below
let timeFunc = setInterval(function(){
    timeLeft--;
    timerDisplay.textContent = `${timeLeft} Seconds Remaining!`
    if(timeLeft === -1){
        timerDisplay.textContent = "TIME'S UP!"
        clearInterval(timeFunc);
        alert('TIME\'S UP!')
        enterScore();
    }
}, 1000)

// THESE FOLLOWING FUNCTIONS PERTAIN TO TRAVERSAL OF THE QUIZ ITSELF AND THE VALUES THAT SHIFT AS A RESULT

// This function will reset the variables used to manage progression through the quiz to ensure it starts at the beginning 
let initializer = function(){
    timeLeft = Number.MAX_VALUE;
    currentKey = initialKey;
    currentKeyIndex = 1;
    currentScore = 0;
    finalKey = Object.keys(questions)[Object.keys(questions).length-1];
}

// This function will render the current question to the DOM
let renderQuestion = function(){
    questionEl.textContent = questions[currentKey];
}

// This function renders each question's corresponding answers to the DOM
let renderAnswers = function(){
    let answersAvailable = [0, 1, 2, 3];
    let answerToBeRendered = 1;
    let currentAnswerSet = answers[currentKey]; 
    let answerRendered; 

    for(let i = 0; i < currentAnswerSet.length; i++){
        answerRendered = Math.floor(Math.random() * answersAvailable.length);
        if(answerRendered in answersAvailable){
            document.getElementById(`answerChoice${answerToBeRendered}`).textContent = currentAnswerSet[answerRendered];
            document.getElementById(`answerChoice${answerToBeRendered}`).style.backgroundColor = 'cyan';
            delete answersAvailable[answerRendered]
            answerToBeRendered++;
        } else {
            i--;
        }
    }
}

// This function will change the key to properly iterate through each question of the quiz
let nextKeyAssigner = function(){
    if(currentKey === `q${currentKeyIndex}`){
        currentKeyIndex++;
        currentKey = `q${currentKeyIndex}`;
    }
}

// This function will retain the value of a user selected answer and use it to compare for a point
let chooseAnswer = function(answer){
    for(let i = 1; i < 5; i++){
        document.getElementById(`answerChoice${i}`).style.backgroundColor = 'cyan';
    }
    answer.style.backgroundColor = 'greenyellow';
    chosenAnswer = answer.textContent;
}

// This function will compare the user selected answer to that which exists in the answerKey object
let checkAnswer = function(){
    if(chosenAnswer === answerKey[currentKey]){
        currentScore++;
        renderedScore.textContent = `Current Score: ${currentScore}`
    } else {
        timeLeft -= 3;
        if(timeLeft < 1){
            timerDisplay.innerHTML = `TIME'S UP!`
            alert("TIME'S UP!")
            enterScore();
        } else {
            timerDisplay.innerHTML = `${timeLeft} Seconds Remaining!`
        }

    }
}

// This function will render the quetion, answer choices, check the answer of a previous answer made (if possible), and either change the key to render the next question or change the save button to a submit button.
let renderAll = function(){
    checkAnswer();
    if(currentKey === finalKey){
        questionEl.style.display = "none";
        document.getElementById("answers").style.display = "none";
        nextQuesh.style.display = "none";
        submitBtn.style.display = "inline-block";
        return;
    } else {
        nextKeyAssigner();
        renderQuestion();
        renderAnswers();
    }
}


// THESE FOLLOWING FUNCTIONS PERTAIN TO TAKING THE SCORE FROM A QUIZ TAKER, THE USER'S INITIALS, SAVING THEM TO LOCAL STORAGE, AND RENDERING THE TOP 5 SCORES SAVED TO THE DOM

// This function will, upon clicking submit or time running out, take the user to a screen which shows their score. Here they can enter initials to be saved.
let enterScore = function(){
    clearInterval(timeFunc);
    quizEl.style.display = "none";
    scoreEntry.style.display = "block";
    document.getElementById('finalScore').textContent = `Final Score: ${currentScore}`;
}

// This func will take the user's score and added intials and save them into an object that will be pushed to localstorage.hiScore's value which will be established as an array;
let saveScore = function(event){
    event.preventDefault();
    initials = userInitials.value.toUpperCase(); 

    let scoreObj = {
        [currentScore]: initials,
    };
    let currentScoreTable 
    if(localStorage.hiScore === undefined || !Array.isArray(JSON.parse(localStorage.hiScore))){
        currentScoreTable = [];
    } else {
        currentScoreTable = JSON.parse(localStorage.hiScore);
    } 
    scoreOrganizer(currentScoreTable, scoreObj);
    localStorage.hiScore = JSON.stringify(currentScoreTable);
    initializer();
    renderHiScores();
}

// This function will take in an array and object then place the object in the array based on key's numerical value. 
    // If the obj's key is of greater value than that of arr[i], it will place the obj in at index i. 
    // If it is equal to arr[i]'s key, it will place the obj at arr[i+1]
    // If it is not, then it will continue to either iterate until it finds a value it is equal to or will just be placed at the end using .push()
let scoreOrganizer = function(arrOfObjs, obj){
    let valToCheck = Object.keys(obj)[0];

    if(arrOfObjs.length === 0){
        youPlaced = 1;
        arrOfObjs.push(obj);
        return;
    }

    for(i = 0; i < arrOfObjs.length; i++){
        if(Number(valToCheck) > Number(Object.keys(arrOfObjs[i])[0])){
            youPlaced = i+1;
            arrOfObjs.splice(i, 0, obj);
            return;
        } else if (Number(valToCheck) === Number(Object.keys(arrOfObjs[i])[0])){
            youPlaced = i+2;
            arrOfObjs.splice(i+1, 0, obj);
            return;
        } 
        if(i === arrOfObjs.length-1){
            arrOfObjs.push(obj);
            youPlaced = arrOfObjs.length;
            return arrOfObjs;
        }
    }
}

// This function will iterate through the first 5 items listed in the localstorage.hiScore array and append them to the DOM as <li> items
let renderHiScores = function(){
    scoreEntry.style.display = "none";
    hiScoreDisplay.style.display = "inline-block";
    let savedScores = JSON.parse(localStorage.hiScore);
    let initials;
    let userScore;
    let maxListItems;
    if(savedScores.length <= 4){
        maxListItems = savedScores.length;
    } else {
        maxListItems = 5
    }

    for(let i = 0; i < maxListItems; i++){
        initials = Object.values(savedScores[i])[0];
        userScore = Object.keys(savedScores[i])[0];
        let topScoreToAppend = document.createElement('li');
        topScoreToAppend.textContent = `${initials} : ${userScore}`
        topScoreToAppend.setAttribute("id", `topScore${i+1}`);
        top5.appendChild(topScoreToAppend);
    }

    document.getElementById('youPlaced').textContent = `You placed at spot ${youPlaced}!`
};


// These are all of the functions that will be called as soon as the quiz is loaded to intialize all variables and load each question and answer set
initializer();
renderQuestion();
renderAnswers();

// This event handler will, upon click next question, run all of the functions specified in renderAll()
nextQuesh.addEventListener("click", renderAll);
submitBtn.addEventListener("click", enterScore);
saveBtn.addEventListener("click", saveScore)