var kérdések;
var aktual = 0;
var helyes;
var irany;
function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(aktual,"");
}
function kérdésMegjelenítés(kérdés) {
    console.log(kérdések[kérdés].questionText);
    var kerdes = document.getElementById("kérdés_szöveg")
    var valasz1 = document.getElementById("válasz1")
    var valasz2 = document.getElementById("válasz2")
    var valasz3 = document.getElementById("válasz3")
    kerdes.innerText = kérdések[kérdés].questionText
    valasz1.innerText = kérdések[kérdés].answer1
    valasz2.innerText = kérdések[kérdés].answer2
    valasz3.innerText = kérdések[kérdés].answer3
    helyes = kérdések[kérdés].correctAnswer
    var kep = document.getElementById("kép1")
    kep.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image
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
        kérdésMegjelenítés(aktual)
    }
    var valasz1 = document.getElementById("válasz1")
    valasz1.style.backgroundColor = "lightgray"
    var valasz2 = document.getElementById("válasz2")
    valasz2.style.backgroundColor = "lightgray"
    var valasz3 = document.getElementById("válasz3")
    valasz3.style.backgroundColor = "lightgray"
    console.log(aktual)
}
function vissza() {
    if (aktual > 0) {
        aktual--
        kérdésMegjelenítés(aktual)
    }
    var valasz1 = document.getElementById("válasz1")
    valasz1.style.backgroundColor = "lightgray"
    var valasz2 = document.getElementById("válasz2")
    valasz2.style.backgroundColor = "lightgray"
    var valasz3 = document.getElementById("válasz3")
    valasz3.style.backgroundColor = "lightgray"
    console.log(aktual)
}
window.onload = letöltés();