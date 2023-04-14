document.addEventListener("DOMContentLoaded", () => {
    var URLactual = window.location.pathname;
    if(URLactual == '/verOfertas.html'){
        provincias();
        tipoDeCarnet();
        ambitosGeograficos();
        experiencia();
        tipoContrato();
        verOfertas();
    }
});
function provincias (){
    const URL = "http://localhost:8080/oferta/provinciasEnOfertas";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let provincias=document.getElementById('provincias');
        var div1 = document.createElement("div");
        data.forEach(element => { 
            var div = document.createElement("div");
            div.className = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.name = 'provincia';
            x.value = JSON.stringify(element)
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
            div.className = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.name = 'tipoCarnet';
            x.value = JSON.stringify(element)
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
            div.className = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.name = 'ambitosGeograficos';
            x.value = JSON.stringify(element)
            var y = document.createElement("p");
            y.innerHTML = element.ambito
            div.appendChild(x);
            div.appendChild(y);
            ambitosGeograficos.appendChild(div)
        });
    })
}
function experiencia(){ 
        data = ['No se requiere experiencia previa', 'Se requiere minimo 2 años de experiencia', 'Más de 5 años de experiencia']
        let experiencia=document.getElementById('experiencia');
        for (const key of data) {
            var div = document.createElement("div");
            div.className = 'unfiltro'; 
            var x = document.createElement("input");
            x.setAttribute("type", "checkbox");
            x.name = 'experiencia';
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
        div.className = 'unfiltro'; 
        var x = document.createElement("input");
        x.setAttribute("type", "checkbox");
        x.name = 'tipoContrato';
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
    if (filtros.style.display=='none'){
        filtros.style.display ='flex';
    }else{
        filtros.style.display ='none';
    }
}
function verOfertas(){
    const URL = "http://localhost:8080/oferta/noCaducadas";
    fetch(URL)
    .then((response) => response.json())
    .then((oferta) => {
        pintar(oferta)
    });

}  

async function aplicarFiltros(){
    var provincia = document.querySelectorAll('input[name="provincia"]:checked');
    var valoresSeleccionados = [];
    for (var i = 0; i < provincia.length; i++) {
        valor = JSON.parse(provincia[i].value);
    valoresSeleccionados.push(valor);
    }
    var tipoCarnet = document.querySelectorAll('input[name="tipoCarnet"]:checked');
    for (var i = 0; i < tipoCarnet.length; i++) {
        valor = JSON.parse(tipoCarnet[i].value);
        valoresSeleccionados.push(valor);
    }
    var ambitosGeograficos = document.querySelectorAll('input[name="ambitosGeograficos"]:checked');
    for (var i = 0; i < ambitosGeograficos.length; i++) {
        valor = JSON.parse(ambitosGeograficos[i].value);
        valoresSeleccionados.push(valor);
    }
    var tipoContrato = document.querySelectorAll('input[name="tipoContrato"]:checked');
    for (var i = 0; i < tipoContrato.length; i++) {
        valor = {
            tipoContrato: tipoContrato[i].value
        }
    valoresSeleccionados.push(valor);
    }
    var experiencia = document.querySelectorAll('input[name="experiencia"]:checked');
    for (var i = 0; i < experiencia.length; i++) {
        valor = {
            experiencia: experiencia[i].value
        }
        valoresSeleccionados.push(valor)
    }
    console.log(valoresSeleccionados);
    let ofertas;
    try {
        ofertas = await fetchOfertas();
            ofertasFiltradas=[]
            ofertas.filter(oferta => {
            // Verificamos si la provincia de la oferta está en valoresSeleccionados
            if (valoresSeleccionados.find(val => val.idProvincia === oferta.provincia.idProvincia)) {
                ofertasFiltradas.push(oferta)
            }
            if (valoresSeleccionados.find(val => val.idCarnet === oferta.tipoCarnet.idCarnet)) {
                ofertasFiltradas.push(oferta)
            }
            if (valoresSeleccionados.find(val => val.idAmbito === oferta.ambitoGeografico.idAmbito)) {
                ofertasFiltradas.push(oferta)
            }
            if (valoresSeleccionados.find(val => val.tipoContrato === oferta.tipoContrato)) {
                ofertasFiltradas.push(oferta)
            }
            if (valoresSeleccionados.find(val => val.experiencia === oferta.experiencia)) {
                ofertasFiltradas.push(oferta)
            }   
        });
        if(ofertasFiltradas.length == 0){
            pintar(ofertas);
        }else {
        pintar(ofertasFiltradas);
        }

    } catch (error) {
        throw new Error('Ha ocurrido un error');
    }
}

async function fetchOfertas() {
        const URL = "http://localhost:8080/oferta/noCaducadas";
        try {
            const response = await fetch(URL);
            const ofertas = await response.json();
            return ofertas;
        } catch (error) {
            throw new Error('Error al obtener las ofertas');
        }
}

function fBuscar(texto){
    console.log(texto);
    if (texto.length == 0){
        verOfertas();
    }else{
    fetch(URL = " http://localhost:8080/oferta/buscar/"+texto )
    .then((response) => response.json())
    .then((data) => {
        pintar(data);
    });
    }
}
function pintar(ofertasFiltradas){
    let div = document.getElementById('boxOfertas')
    let cont = document.getElementById('cont');
    cont.removeChild(div)
    let div1 = document.createElement('div')
    div1.id = 'boxOfertas'
    for (const key of ofertasFiltradas) {
    let oferta = document.createElement('div');
        oferta.className = 'oferta'
        key.id = key.idOferta;
        let html ='<div class="datos_oferta"><img src="assets/img/empresas/'+key.empresa.logo +'" alt="" width="180px" height="100px"></div>'
        html+='<div class="datos_oferta">'
        html+='<div class="puesto"><p>'+key.descripcion+'</p></div>'
        html+='<div class="nombreEmpresa"><p>'+ key.empresa.nombreComercial+'</p></div></div>'
        html+='<div class="datos_oferta">'
        html+='<div class="mapa"><i class="bx bx-location-plus"></i><br><p>('+key.provincia.provincia +')</p></div>' 
        html+='<div class="caducidad"><i class="bx bx-calendar"></i><br><p>'+key.fechaPublicacion+'</p></div></div>'
        oferta.innerHTML= html;
        div1.appendChild(oferta)
    }
    cont.appendChild(div1);
}