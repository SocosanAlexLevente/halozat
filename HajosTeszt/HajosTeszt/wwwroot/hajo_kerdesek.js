var aktual = 1;

function kérdésletöltés() {
    fetch(`/questions/${aktual}`)
        .then(response => response.json())
        .then(data => kérdésmegjelenités(data)
        );
}
function kérdésmegjelenités(kérdés) {
    console.log(kérdés)
    var kerdes = document.getElementById("kérdés_szöveg")
    var valasz1 = document.getElementById("válasz1")
    var valasz2 = document.getElementById("válasz2")
    var valasz3 = document.getElementById("válasz3")
    kerdes.innerText = kérdés.questionText
    valasz1.innerText = kérdés.answer1
    valasz2.innerText = kérdés.answer2
    valasz3.innerText = kérdés.answer3
    helyes = kérdés.correctAnswer
    var kep = document.getElementById("kép1")
    if (kérdés.image != "") {
        kep.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image
    }
}
function ellenörzés(id) {
    if (id[6] == helyes) {
        console.log("fasza")
        //var valaszok = document.getElementById("válaszok")
        //valaszok.style.backgroundColor = "Red"
        var valasz = document.getElementById(id)
        valasz.style.backgroundColor = "Green"
    }
}
function következő() {
    if (aktual < 2) {
        aktual++
        kérdésletöltés(aktual)
    }
    var valasz1 = document.getElementById("válasz1")
    valasz1.style.backgroundColor = "lightgray"
    var valasz2 = document.getElementById("válasz2")
    valasz2.style.backgroundColor = "lightgray"
    var valasz3 = document.getElementById("válasz3")
    valasz3.style.backgroundColor = "lightgray"
    //console.log(aktual)
}
function vissza() {
    if (aktual > 0) {
        aktual--
        kérdésletöltés(aktual)
    }
    var valasz1 = document.getElementById("válasz1")
    valasz1.style.backgroundColor = "lightgray"
    var valasz2 = document.getElementById("válasz2")
    valasz2.style.backgroundColor = "lightgray"
    var valasz3 = document.getElementById("válasz3")
    valasz3.style.backgroundColor = "lightgray"
    //console.log(aktual)
}
window.onload = kérdésletöltés();