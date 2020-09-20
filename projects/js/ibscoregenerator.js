var classes;
var a;
var x;
var score;
var sum;
var casPass = 1;
var isPass = 1;

function submitClasses(){
    console.log("--- Log ---");
    document.getElementById("submittingButton").style.display = "none";
    //alert("1");
    x = 0;
    classes = ["", "", "", "", "", ""];
    a = document.getElementById("firstStep");
    //alert("2");
    for(let i = 0; i < a.length-2; i+=2){
        classes[x] += "<strong>" + a.elements[i].value + "</strong> " + a.elements[i+1].value;
       console.log(i + ": " + a.elements[i].value + " / " + a.elements[i+1].value);
        x++;
    }
    //alert("3");
    //printTest();
    calculate();

    appear();
}

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
    else isPass = 0;

    console.log("TOK/EE score: " + te);
    console.log("Total score: " + sum);

    if((Math.floor(Math.random() * 100) + 1) < 5) casPass = 0;
}

function appear(){
    var y = document.getElementById("resultsArea");
    y.style.display = "none";

    document.getElementById("className1").innerHTML = classes[0];
    document.getElementById("className2").innerHTML = classes[1];
    document.getElementById("className3").innerHTML = classes[2];
    document.getElementById("className4").innerHTML = classes[3];
    document.getElementById("className5").innerHTML = classes[4];
    document.getElementById("className6").innerHTML = classes[5];

    document.getElementById("classScore1").innerHTML = score[0];
    document.getElementById("classScore2").innerHTML = score[1];
    document.getElementById("classScore3").innerHTML = score[2];
    document.getElementById("classScore4").innerHTML = score[3];
    document.getElementById("classScore5").innerHTML = score[4];
    document.getElementById("classScore6").innerHTML = score[5];

    document.getElementById("TokScore").innerHTML = score[6];
    document.getElementById("EEScore").innerHTML = score[7];

    document.getElementById("overallScore").innerHTML = sum;

    y.style.display = "inline-block";
    y.style.animationName = "textTransition";
    y.style.animationDuration = "1000ms";
    y.style.animationTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";

}

function scoreCalc(){
    //Scores based on the average percentage of IBDP candidates who score in a specific grade boundary.
    //Yes, I could probably vary this based on the class, but that's too much effort.
    var rawValue = Math.floor(Math.random() * 100) + 1;
    if(rawValue > 92) return 7;
    else if(rawValue > 72) return 6;
    else if(rawValue > 45) return 5;
    else if(rawValue > 21) return 4;
    else if(rawValue > 7) return 3;
    else if(rawValue > 2) return 2;
    else return 1;
}

function tokEECalc(){
    var rawValue = Math.floor(Math.random() * 100) + 1;
    if(rawValue > 90) return 'A';
    else if(rawValue > 66) return 'B';
    else if(rawValue > 27) return 'C';
    else if(rawValue > 2) return 'D';
    else return 'E';
}

function tokEEScoreCalc(){
    var tokEE = score[6] + score[7];
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

function printTest(){
    //alert("4");
    let print = "";
    for(let i = 0; i < classes.length; i++){
        print += classes[i] + "<br>";
    }
    document.getElementById("textTest").innerHTML = print;
}