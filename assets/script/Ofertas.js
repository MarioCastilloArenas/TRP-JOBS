document.addEventListener("DOMContentLoaded", () => {
    var URLactual = window.location.pathname;
    if (URLactual == '/verOfertas.html') {
        provincias();
        tipoDeCarnet();
        ambitosGeograficos();
        experiencia();
        tipoContrato();
        let ciudad = localStorage.getItem('ciudad')
        if (ciudad) {
            buscar();
        } else {
            verOfertas();
        }
    }
    if (URLactual == '/verOferta.html') {
        let idOferta = localStorage.getItem('idOferta');
        verOferta(idOferta)
    }
});

async function buscar() {
    let ciudad = localStorage.getItem('ciudad')
    let ofertas;
    try {
        ofertas = await fetchOfertas();
        ofertasFiltradas = []
        for (const oferta of ofertas) {
            console.log(oferta.provincia.provincia + " -----------" + ciudad);
            if (oferta.provincia.provincia === ciudad) {
                console.log(oferta.provincia.provincia);
                ofertasFiltradas.push(oferta)
            }
        }
        console.log(ofertasFiltradas);
        pintar(ofertasFiltradas)
        var checkboxes = document.getElementsByName("provincia");
        // Recorrer los checkboxes
        for (var i = 0; i < checkboxes.length; i++) {
            // Obtener el valor del checkbox actual
            var valor = checkboxes[i].value;

            // Verificar si el valor contiene la ciudad
            if (valor.indexOf(ciudad) !== -1) {
                checkboxes[i].checked = true;
            }
        }
        localStorage.removeItem('ciudad')
    } catch (error) {
        throw new Error('Ha ocurrido un error');
    }
}
function provincias (){
    const URL = "http://localhost:8080/oferta/provinciasEnOfertas";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let provincias = document.getElementById('provincias');
            var div1 = document.createElement("div");
            let i = 0;
            for (const element of data) {
                if (i < 3) {
                    console.log(i);
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
                } else {
                    var divm = document.createElement("div");
                    divm.id = 'enlace';
                    divm.innerHTML = 'Mostrar más.'
                    divm.onclick = function () {
                        divm.innerHTML = ''
                        divm.style.padding = 0;
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
                    }
                    div1.appendChild(divm)
                }
                i++;
            }
            provincias.appendChild(div1);
        })
}
function tipoDeCarnet (){ 
    const URL = "http://localhost:8080/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let TipoCarnet = document.getElementById('tipoCarnet');
            var div1 = document.createElement("div");
            for (const element of data) {
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
                div1.appendChild(div)
            }
            TipoCarnet.appendChild(div1)
        })
}
function ambitosGeograficos(){ 
    const URL = "http://localhost:8080/ambitosGeograficos/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let ambitosGeograficos = document.getElementById('ambitosGeograficos');
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
function experiencia() {
    data = ['No se requiere experiencia previa', 'Se requiere minimo 2 años de experiencia', 'Más de 5 años de experiencia']
    let experiencia = document.getElementById('experiencia');
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
function tipoContrato() {
    data = ['Indefinido', 'Por obra y servicio', 'Autónomo']
    let tipoContrato = document.getElementById('tipoContrato');
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

function filtros() {
    let filtros = document.getElementById('filtros');
    if (filtros.style.display == 'none') {
        filtros.style.display = 'flex';
    } else {
        filtros.style.display = 'none';
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

async function aplicarFiltros() {
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

    let ofertas;
    try {
        ofertas = await fetchOfertas();
        ofertasFiltradas = []
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
        if (ofertasFiltradas.length == 0) {
            pintar(ofertas);
        } else {
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

function fBuscar(texto) {
    console.log(texto);
    if (texto.length == 0) {
        verOfertas();
    } else {
        fetch(URL = " http://localhost:8080/oferta/buscar/" + texto)
            .then((response) => response.json())
            .then((data) => {
                pintar(data);
            });
    }
}
function pintar(ofertasFiltradas) {
    let div = document.getElementById('boxOfertas')
    let cont = document.getElementById('cont');
    cont.removeChild(div)
    let div1 = document.createElement('div')
    div1.id = 'boxOfertas'
    for (const key of ofertasFiltradas) {
        let oferta = document.createElement('div');
        oferta.className = 'oferta'
        oferta.onclick = function () {
            localStorage.setItem('idOferta', key.idOferta)
            window.location = '/verOferta.html';
        }
        let html = '<div class="datos_oferta"><img src="assets/img/empresas/' + key.empresa.logo + '" alt="" width="180px" height="100px"></div>'
        html += '<div class="datos_oferta">'
        html += '<div class="puesto"><p>' + key.descripcion + '</p></div>'
        html += '<div class="nombreEmpresa"><p>' + key.empresa.nombreComercial + '</p></div></div>'
        html += '<div class="datos_oferta">'
        html += '<div class="mapa"><i class="bx bx-location-plus"></i><br><p>(' + key.provincia.provincia + ')</p></div>'
        html += '<div class="caducidad"><i class="bx bx-calendar"></i><br><p>' + key.fechaPublicacion + '</p></div></div>'
        oferta.innerHTML = html;
        div1.appendChild(oferta)
    }
    cont.appendChild(div1);
}

function contadorFecha(fecha) {
    let fe = new Date(fecha)
    const DATE_TARGET = fe;
    // DOM for render
    const SPAN_DAYS = document.querySelector('span#days');
    const SPAN_HOURS = document.querySelector('span#hours');
    const SPAN_MINUTES = document.querySelector('span#minutes');
    const SPAN_SECONDS = document.querySelector('span#seconds');
    // Milliseconds for the calculations
    const MILLISECONDS_OF_A_SECOND = 1000;
    const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
    const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

    //===
    // FUNCTIONS
    //===

    /**
    * Method that updates the countdown and the sample
    */
    function updateCountdown() {
        // Calcs
        const NOW = new Date()
        const DURATION = DATE_TARGET - NOW;
        const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
        const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
        const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
        const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);


        // Render
        SPAN_DAYS.textContent = REMAINING_DAYS;
        SPAN_HOURS.textContent = REMAINING_HOURS;
        SPAN_MINUTES.textContent = REMAINING_MINUTES;
        SPAN_SECONDS.textContent = REMAINING_SECONDS;
    }

    //===
    // INIT
    //===
    updateCountdown();
    // Refresh every second
    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);

}

function verOferta(id){
    fetch(URL = " http://localhost:8080/oferta/"+id )
    .then((response) => response.json())
    .then((oferta) => {
        let tituloof= document.getElementById('tituloof');
            tituloof.innerHTML=oferta.tituloOferta;
            contadorFecha(oferta.fechaCaducidad);
        localStorage.setItem ('empresaFoto',JSON.stringify(oferta.empresa.logo))
        let logo= document.getElementById('logoEmpresa');
            logo.innerHTML='<img src="assets/img/empresas/'+oferta.empresa.logo +'" alt="" width="180px" height="100px">'

            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const formatDate = (date) => {
                let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
                return formatted_date;
            }

            let fechaPublicacion = document.querySelector('#fechaPublicacion > p');
            let fecha = new Date(oferta.fechaPublicacion);
            fechaPublicacion.innerHTML = formatDate(fecha);

            let fechaCaducidad = document.querySelector('#fechaCaducidad > p');
            let fechai = new Date(oferta.fechaCaducidad);
            fechaCaducidad.innerHTML = formatDate(fechai)

            let localidad = document.querySelector('#localidad > p');
            localidad.innerHTML = oferta.localidad
            let tipoCandidato = document.querySelector('#tipoCandidato > p');
            tipoCandidato.innerHTML = oferta.tipoCandidato
            let ambitosGeograficos = document.querySelector('#ambitosGeograficos > p');
            ambitosGeograficos.innerHTML = oferta.ambitoGeografico.ambito
            let tipoCarnet = document.querySelector('#tipoCarnet > p');
            tipoCarnet.innerHTML = oferta.tipoCarnet.carnet
            let descripcion = document.querySelector('#descripcion > p');
            descripcion.innerHTML = oferta.descripcion
            let tipoContrato = document.querySelector('#tipoContrato > p');
            tipoContrato.innerHTML = oferta.tipoContrato
            let empresa = document.querySelector('#empresa > p');
            empresa.innerHTML = oferta.empresa.nombreFiscal
            let botonEmpresa = document.querySelector('#botonEmpresa');
            botonEmpresa.onclick = function () {
                localStorage.setItem('cif', oferta.empresa.cif)
                window.location = '/verEmpresa.html';
            }
        });

}
