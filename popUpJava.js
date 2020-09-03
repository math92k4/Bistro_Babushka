let filter = "alle";
let retter;
const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
const popup = document.querySelector("#popup");






document.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
    const respons = await fetch(link);
    retter = await respons.json();
    listenersToButtons();
    vis();
}

function vis() {
    const container = document.querySelector("#container");
    const temp = document.querySelector("template");
    container.innerHTML = "";
    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            klon.querySelector(".billede").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;
            klon.querySelector(".pris").textContent += ret.gsx$pris.$t;
            klon.querySelector(".besk").textContent = ret.gsx$kort.$t;

            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

            container.appendChild(klon);
        }
    })
}




//popup-funktionen

function visDetaljer(ret) {
    popup.style.display = "block";
    popup.querySelector(".popNavn").textContent = ret.gsx$navn.$t;
    popup.querySelector(".popLang").textContent = ret.gsx$lang.$t;
    popup.querySelector(".popOprindelse").textContent = ret.gsx$oprindelse.$t;
    popup.querySelector(".popPris").textContent = ret.gsx$pris.$t;
    popup.querySelector(".popBillede").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;

}
document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");









//katergori-funktionen

function listenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })

}

function filterBTNs() {
    filter = this.dataset.type;
    document.querySelector("#kategoriOverskrift").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    hentData();
}
