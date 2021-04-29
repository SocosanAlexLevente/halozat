var jóVálasz;
var questionId = 4;

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;         //timer handler

myStorage = window.localStorage;

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    //localStorage.clear();
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
    /*console.log(myStorage.getItem('Answers'))
    if (myStorage != null) {
        for (i = 0; i < myStorage.length; i++) {
            console.log(myStorage.getItem('Answers'))
        }
    } else {

    }*/
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").classList.remove("rejtett");
    }
    else {
        document.getElementById("kép1").classList.add("rejtett");
    }
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
}

function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
    document.getElementById(`válasz1`).style.pointerEvents = "auto";
    document.getElementById(`válasz2`).style.pointerEvents = "auto";
    document.getElementById(`válasz3`).style.pointerEvents = "auto";
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion == -1) displayedQuestion = 2;
    kérdésMegjelenítés();
    document.getElementById(`válasz1`).style.pointerEvents = "auto";
    document.getElementById(`válasz2`).style.pointerEvents = "auto";
    document.getElementById(`válasz3`).style.pointerEvents = "auto";
}

function választás(n) {
    timeoutHandler = setTimeout(előre, 3000);
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById(`válasz1`).style.pointerEvents = "none";
        document.getElementById(`válasz2`).style.pointerEvents = "none";
        document.getElementById(`válasz3`).style.pointerEvents = "none";
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            console.log(displayedQuestion);
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
        document.getElementById(`válasz1`).style.pointerEvents = "none";
        document.getElementById(`válasz2`).style.pointerEvents = "none";
        document.getElementById(`válasz3`).style.pointerEvents = "none";
    }
    /*for (var i = 0; i < questionsInHotList; i++) {
        localStorage.setItem('question', hotList[i]);
    }*/
}

window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    init();
}