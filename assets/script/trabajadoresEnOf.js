document.addEventListener("DOMContentLoaded",() => {
    verInscripcionEn(1);
});


function verInscripcionEn(oferta){
    const URL = "http://localhost:8083/oferta/inscripciones/"+oferta;
    fetch(URL)
    .then((response) => response.json())
    .then((inscripciones) => {
        pintar(inscripciones)
        console.log(inscripciones[0].oferta);
        let banner = document.getElementById('banner')
        let div = document.createElement('h1');
        div.innerHTML = inscripciones[0].oferta.tituloOferta;
        let div1 = document.createElement('h2');
        div1.innerHTML = inscripciones[0].oferta.descripcion;

        banner.appendChild(div)
        banner.appendChild(div1)
    });
} 

function pintar(inscripciones){
    let div = document.getElementById('boxOfertas')
    for (const key of inscripciones) {
        console.log(key.trabajador.dni);
    let oferta = document.createElement('div');
        oferta.className = 'oferta'
        oferta.onmouseover = function(){
            localStorage.setItem('inscripciones', JSON.stringify(key))
        }

        let divi = document.createElement('div');
            divi.className = 'datos_oferta'
            divi.onclick = function() {
                localStorage.setItem('dni', key.trabajador.dni)
                window.location = '/verTrabajador.html';
            }
            let html ='<img src="assets/img/trabajadores/'+key.trabajador.fotoTrabajador+'">'
            divi.innerHTML = html;
            oferta.appendChild(divi)
        let divi1= document.createElement('div');
            divi1.className = 'datos_oferta'
            let html1='<div class="puesto"><p>'+ key.trabajador.nombre+' '+key.trabajador.apellidos+'</p></div>'
            divi1.innerHTML = html1;
            oferta.appendChild(divi1)
        let divi2= document.createElement('div');
            divi2.className = 'datos_oferta'
            let html2 = "";
            if (key.estadoInscripcion != null){
                html2+='<div> Estado : '+key.estadoInscripcion 
            }else{
                html2+='<div> Estado : No definido'
            } 
            html2+='</div><div><select id="estado" onchange="myFunction(this.value)" >'
                data = ['Sigue en proceso', 'Descartado', 'Contratado']
            for (const i of data) {
                html2+= '<option value="'+i+'">'+ i+'</option>'
            }
            html2+='</select></div>'
            divi2.innerHTML = html2;
            oferta.appendChild(divi2)
        let divi3= document.createElement('div');
            divi3.className = 'datos_oferta'
            let html3 = "";
            if(key.observaciones == null){
                html3+='<textarea name="textarea" onchange="myFunctioni(this.value)" style="resize:none" placeholder="Observaciones solo es visible para ti"></textarea>'
            }else{
                html3+='<textarea name="textarea" onchange="myFunctioni(this.value)" style="resize:none" placeholder="Observaciones solo es visible para ti">'+ key.observaciones +'</textarea>'
            }
            divi3.innerHTML = html3;
            oferta.appendChild(divi3)
        div.appendChild(oferta) 
    }
    if(inscripciones.length%2!=0){
        let oferta = document.createElement('div');
        oferta.className = 'oferta'
        oferta.style.backgroundColor='transparent';
        oferta.style.boxShadow='none'
        div.appendChild(oferta) 

    }

}

function myFunction(val) {
    let inscripcion = JSON.parse(localStorage.getItem('inscripciones'));
    inscripcion.estadoInscripcion = val;
    localStorage.setItem('inscripciones', JSON.stringify(inscripcion))
    const URL = "http://localhost:8083/oferta/actualizarInscripcion/";
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(inscripcion)
    })
        .then((response) => response.json())
        .then((inscripcion) => { console.log(inscripcion); })
}

function myFunctioni(val) {
    let inscripcion = JSON.parse(localStorage.getItem('inscripciones'));
    inscripcion.observaciones = val;
    localStorage.setItem('inscripciones', JSON.stringify(inscripcion))
    const URL = "http://localhost:8083/oferta/actualizarInscripcion/";
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(inscripcion)
    })
        .then((response) => response.json())
        .then((inscripcion) => { console.log(inscripcion); })
}