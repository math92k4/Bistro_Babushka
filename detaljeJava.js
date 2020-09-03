const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let retter;

const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
const popup = document.querySelector("#popup");




document.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
    const respons = await fetch(link);
    retter = await respons.json();
    vis();
}

function vis() {
    retter.feed.entry.forEach(ret => {
        if (id == ret.gsx$id.$t) {
            visDetaljer(ret)
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
document.querySelector("#luk").addEventListener("click", () => history.back());
