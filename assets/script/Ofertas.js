document.addEventListener("DOMContentLoaded", () => {
    var URLactual = window.location.pathname;
    if(URLactual == '/verOfertas.html'){
        provincias();
        tipoDeCarnet();
        ambitosGeograficos();
        experiencia();
        tipoContrato();
    }

});
function provincias (){
    const URL = "http://localhost:8080/oferta/provinciasEnOfertas";
    // const URL = "http://localhost:8080/provincias/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let provincias=document.getElementById('provincias');
        var div1 = document.createElement("div");
        data.forEach(element => { 
            var div = document.createElement("div");
            div.id = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.value = element.idProvincia
            var y = document.createElement("p");
            y.innerHTML = element.provincia
            div.appendChild(x);
            div.appendChild(y);
            div1.appendChild(div)
        });
        provincias.appendChild(div1);
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
function experiencia(){ 
        data = ['No requiere experiencia', 'Al menos dos años de experiencia', 'Más de 5 años de experiencia']
        let experiencia=document.getElementById('experiencia');
        for (const key of data) {
            console.log(key);
            var div = document.createElement("div");
            div.id = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.value = key
            var y = document.createElement("p");
            y.innerHTML = key
            div.appendChild(x);
            div.appendChild(y);
            experiencia.appendChild(div)
        }
    
}

function tipoContrato(){ 
    data = ['Indefinido', 'Por obra y servicio', 'Autonomo']
    let tipoContrato=document.getElementById('tipoContrato');
    for (const key of data) {
        console.log(key);
        var div = document.createElement("div");
        div.id = 'unfiltro'; 
        var x = document.createElement("input");
        x.setAttribute("type", "checkbox");
        x.value = key
        var y = document.createElement("p");
        y.innerHTML = key
        div.appendChild(x);
        div.appendChild(y);
        tipoContrato.appendChild(div)
    }

}

function filtros(){
    let filtros = document.getElementById('filtros');
    filtros.style.display ='flex';
    filtros.onclick = ocultarFiltros;
}
function ocultarFiltros(){
    let filtros = document.getElementById('filtros');
    filtros.style.display ='none';
}





