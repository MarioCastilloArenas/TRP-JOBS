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
    const URL = "http://localhost:8083/oferta/provinciasEnOfertas";
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
    const URL = "http://localhost:8083/tipoCarnets/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let TipoCarnet=document.getElementById('tipoCarnet');
        data.forEach(element => { 
            var div = document.createElement("div");
            div.className = 'unfiltro'; 
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
    const URL = "http://localhost:8083/ambitosGeograficos/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let ambitosGeograficos=document.getElementById('ambitosGeograficos');
        data.forEach(element => { 
            var div = document.createElement("div");
            div.className = 'unfiltro'; 
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
            var div = document.createElement("div");
            div.className = 'unfiltro'; 
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
        div.className = 'unfiltro'; 
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
    if (filtros.style.display=='none'){
        filtros.style.display ='flex';
    }else{
        filtros.style.display ='none';
    }
}
function verOfertas(){
    
    const URL = "http://localhost:8083/oferta/noCaducadas";
    fetch(URL)
    .then((response) => response.json())
    .then((oferta) => {
        let div = document.getElementById('boxOfertas')
        for (const key of oferta) {
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
            div.appendChild(oferta)  
        }
    });

}





