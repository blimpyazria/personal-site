/*
Hi there. Welcome to my javascript.
It's nearly as bad as my CSS.
 */

var classes;
var a;
var x;
var score;
var sum;
var casPass;
var isPass;
var passMessage;

var runAmounts = 0;

//When the button is pressed, do stuff.
function submitClasses(){
    a = document.getElementById("firstStep");

    /*
    if(checkIfEmpty() === true){
        document.getElementById("contentError").style.display = "block";
        console.log("No classes.");
        return false;
    }
     */

    document.getElementById("contentError").style.display = "none";

    document.getElementById("totalScore").style.background = "var(--gradientAccent)";
    casPass = 1;
    isPass = 1;

    runAmounts++;
    console.log("\n--" + runAmounts + " runs--");

    console.log("--- Log ---");
    x = 0;
    classes = ["", "", "", "", "", ""];

    for(let i = 0; i < a.length-2; i+=2){
        classes[x] += "<strong>" + a.elements[i].value + "</strong> " + a.elements[i+1].value;
       console.log(i + ": " + a.elements[i].value + " / " + a.elements[i+1].value);
        x++;
    }

    calculate();

    passCheck();

    appear();
}

//Makes sure all boxes are filled.
function checkIfEmpty(){
    for(let i = 0; i < a.length-2; i+=2){
        if(a.elements[i+1].value.length === 0){
            return true;
        }
    }
    return false;
}

//Calculates scores.
function calculate(){
    score = [];
    sum = 0;
    for(let i = 0; i < 6; i++){
        score[i] = scoreCalc();
        sum+=score[i];
    }

    console.log("Class score: " + sum);

    score[6] = tokEECalc();
    score[7] = tokEECalc();

    var te = tokEEScoreCalc()

    if(te > 0) sum += te;

    console.log("TOK/EE score: " + te);
    console.log("Total score: " + sum);

    if((Math.floor(Math.random() * 100) + 1) < 5){
        casPass = 0;
    }
}

//Checks for any diploma failing conditions
function passCheck(){
    document.getElementById("CASresult").style.background = "var(--resultColor)";

    passMessage = "";
    if(sum < 24) {
        passMessage += "You didn't meet the minimum score of 24.\n";
        isPass = 0;
    }
    if(casPass === 0) {
        passMessage += "You didn't meet the CAS requirement.\n";
        document.getElementById("CASresult").style.background = "var(--resultColorFail)";
        isPass = 0;
    }
    if(tokEEScoreCalc() === -1) {
        passMessage += "You received a failing condition in EE/TOK.\n";
        isPass = 0;
    }

    for(let i = 0; i < 6; i++){
        if(score[i] === 1){
            passMessage += "You received a failing score in " + document.getElementById("firstStep").elements[(i*2)+1].value + ".\n";
            isPass = 0;
        }
    }
}

//Makes the results stuff appear. Also makes the button text change for the lols.
//If you're reading this, and you know a better way to do this than document.getElementById repeated 20 times, please get in touch.
function appear(){
    var y = document.getElementById("resultsArea");

	/*
	Yes, if you write HTML tags in the text boxes, you can do funky stuff. 
	I could make this .innerText rather than innerHTML, but that breaks the stupid workaround that I have for
	bolding the HL/SL text by adding <strong> tags. 
	I'm too lazy to fix it. It'll happen eventually, I guess.
	Only web developers are going to notice anyways.
	*/
    document.getElementById("className1").innerHTML = classes[0];
    document.getElementById("className2").innerHTML = classes[1];
    document.getElementById("className3").innerHTML = classes[2];
    document.getElementById("className4").innerHTML = classes[3];
    document.getElementById("className5").innerHTML = classes[4];
    document.getElementById("className6").innerHTML = classes[5];

    document.getElementById("classScore1").innerText = score[0];
    document.getElementById("classScore2").innerText = score[1];
    document.getElementById("classScore3").innerText = score[2];
    document.getElementById("classScore4").innerText = score[3];
    document.getElementById("classScore5").innerText = score[4];
    document.getElementById("classScore6").innerText = score[5];

    document.getElementById("TokScore").innerText = score[6];
    document.getElementById("EEScore").innerText = score[7];

    document.getElementById("overallScore").innerText = sum;

    if(casPass === 1) document.getElementById("CASresult").innerText = "Y";
    else document.getElementById("CASresult").innerText = "N";

    document.getElementById("failConditions").innerText = passMessage;

    if(isPass === 1) document.getElementById("diplomaReceived").innerHTML = "<strong>You received an IB diploma.</strong>";
    else{
        document.getElementById("diplomaReceived").innerHTML = "<strong>You did not receive an IB diploma.</strong>";
        document.getElementById("totalScore").style.background = "var(--resultColorFail)";
    }

    //Animates in on first run
    y.style.display = "block";
    y.style.animationName = "textTransition";

    var buttonText = document.getElementById("submittingButton");

    //button memes because i don't need to make my javascript efficient anyway.
    if(runAmounts < 5) buttonText.value = "Try again?";
    else if(runAmounts < 10) buttonText.value = "Okay, you should stop now.";
    else if(runAmounts < 20) buttonText.value = "You don't get this many retries in real life.";
    else if(runAmounts < 40) buttonText.value = "What are you doing?";
    else if(runAmounts < 60) buttonText.value = "Go study or something.";
    else if(runAmounts < 100) buttonText.value = "Maybe eventually you'll get a 45.";
    else if(runAmounts < 101) buttonText.value = "Congrats. You've clicked a button 100 times. Yay.";
    else if(runAmounts < 102) buttonText.value = "Might as well start counting.";
    else if(runAmounts < 1000) buttonText.value = runAmounts;
    else if(runAmounts < 1001) buttonText.value = "If you make it here through clicking, you are insane.";
    else if(runAmounts < 1002) buttonText.value = "Ok, we're done. Go outside. Don't refresh.";
    else buttonText.style.display = "none";
}

//Calculates individual scores for a class.
function scoreCalc(){

    var rawValue = Math.floor(Math.random() * 100) + 1;

    if(rawValue > 80) return 7;
    else if(rawValue > 60) return 6;
    else if(rawValue > 45) return 5;
    else if(rawValue > 20) return 4;
    else if(rawValue > 7) return 3;
    else if(rawValue > 3) return 2;
    else return 1;

    /*
    This originally used a calculation that was roughly similar to the average percentage of people who receive each grade.
    But 99% of runs would end up giving a total 25-35, which was kinda boring.
    Now it uses my own custom curve, but I'm keeping the old calculation here in case I ever need it for some reason.

    var rawValue = Math.floor(Math.random() * 100) + 1;
    if(rawValue > 92) return 7;
    else if(rawValue > 72) return 6;
    else if(rawValue > 45) return 5;
    else if(rawValue > 21) return 4;
    else if(rawValue > 7) return 3;
    else if(rawValue > 2) return 2;
    else return 1;
     */
}

//Calculates EE/TOK letter scores.
function tokEECalc(){
    var rawValue = Math.floor(Math.random() * 100) + 1;
    if(rawValue > 80) return 'A';
    else if(rawValue > 60) return 'B';
    else if(rawValue > 25) return 'C';
    else if(rawValue > 10) return 'D';
    else return 'E';
}

//Calculates EE/TOK numeric score or fail condition.
function tokEEScoreCalc(){
    var tokEE = score[6] + score[7];

    //Puts highest grade first. Just to reduce the number of cases I need.
    tokEE = tokEE.split('');
    tokEE = tokEE.sort();
    tokEE = tokEE.join('');

    console.log("TOK/EE: " + tokEE);
    switch(tokEE){
        case('AA'): return 3;
        case('AB'): return 3;
        case('AC'): return 2;
        case('AD'): return 2;
        case('AE'): return -1;
        case('BB'): return 2;
        case('BC'): return 2;
        case('BD'): return 1;
        case('BE'): return -1;
        case('CC'): return 1;
        case('CD'): return 0;
        case('CE'): return -1;
        case('DD'): return 0;
        case('DE'): return -1;
        case('EE'): return -1;
    }
}