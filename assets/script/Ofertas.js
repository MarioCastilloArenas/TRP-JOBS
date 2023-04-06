document.addEventListener("DOMContentLoaded", () => {
    var URLactual = window.location.pathname;
    if(URLactual == '/verOfertas.html'){
        provincias();
        tipoDeCarnet();
        ambitosGeograficos();
    }
    console.log('jola');

});
function provincias (){
    const URL = "http://localhost:8080/provincias/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let provincias=document.getElementById('provincia');
        data.forEach(element => { 
            document.createElement("div");
            div.id = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.value = element.idProvincia
            var y = document.createElement("p");
            y.innerHTML = element.provincia
            div.appendChild(x);
            div.appendChild(y);
            TipoCarnet.appendChild(div)
        });
    })
}

function tipoDeCarnet (){ 
    
    const URL = "http://localhost:8080/tipoCarnets/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let TipoCarnet=document.getElementById('tipoCarnet');
        data.forEach(element => { 
            var div = document.createElement("div");
            div.id = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.value = element.idCarnet
            var y = document.createElement("p");
            y.innerHTML = element.carnet
            div.appendChild(x);
            div.appendChild(y);
            TipoCarnet.appendChild(div)
        });
    })
}
function ambitosGeograficos(){ 
    const URL = "http://localhost:8080/ambitosGeograficos/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let ambitosGeograficos=document.getElementById('ambitosGeograficos');
        data.forEach(element => { 
            var div = document.createElement("div");
            div.id = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.value = element.idAmbito
            var y = document.createElement("p");
            y.innerHTML = element.ambito
            div.appendChild(x);
            div.appendChild(y);
            ambitosGeograficos.appendChild(div)
        });
    })
}