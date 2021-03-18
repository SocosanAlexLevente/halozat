var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}

window.onload = () => {
    let pascal = document.getElementById("pascal");
    for (let i = 0; i < 10; i++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        pascal.appendChild(sor);
        for (let j = 0; j <= i; j++) {
            let oszlop = document.createElement("div");
            oszlop.classList.add("cella");
            sor.appendChild(oszlop);
            if (j=== 0 || j === i) {
                oszlop.innerText = 1;
                oszlop.style.background = "rgb(150,100,120)";
            }
            else {
                oszlop.innerText = faktoriális(i) / (faktoriális(j) * faktoriális(i - j));
                oszlop.style.background = `rgb(150,100,${120 + faktoriális(i) / (faktoriális(j) * faktoriális(i - j))}`;

            }
        }
    }
}