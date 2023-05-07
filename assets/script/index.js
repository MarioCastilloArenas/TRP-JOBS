document.addEventListener("DOMContentLoaded", () => {
    contenidoSlider();
    verOfertas();
});
function enviarInicioTrabajadores() {
    if (JSON.parse(localStorage.getItem("usuario")) == null) {
        document.location = "loginUsuario.html";
    } else {
        document.location = "IndexTrabajador.html";
    }
}
function enviarInicioEmpresas() {
    document.location = "loginEmpresa.html";
}
function fEnviarSobreNosotros() {
    document.location = "sobreNosotros.html";
}
function fverOferta() {
    window.location.href = "verOferta.html";
}

function verOfertas() {
    const URL = "http://localhost:8083/oferta/noCaducadas";
    fetch(URL)
        .then((response) => response.json())
        .then((oferta) => {
            pintar(oferta)
        });
}
function pintar(ofertasFiltradas) {
    let div = document.getElementById('boxOfertas')
    let i = 0;
    for (const key of ofertasFiltradas) {
        if (i < 10) {
            let oferta = document.createElement('div');
            oferta.onclick = function () {
                localStorage.setItem('idOferta', key.idOferta)
                window.location = '/verOferta.html';
            }
            let html = '<div class="image">'
            if (key.valoracion == 's') {
                oferta.className = 'ofertaDestacada'
                html += ' <div class="circleDestacada">Destacada</div>'
            } else {
                oferta.className = 'oferta'
            }
            html += '<img src="assets/img/empresas/' + key.empresa.logo + '" alt="" width="180px" height="100px">'
            html += '</div>'
            html += '<div class="informacionEmpresa">'
            html += '<div class="puesto">' + key.descripcion + '</div>'
            html += '<div class="nombrEmpresa">' + key.empresa.nombreComercial + '</div>'
            html += '</div>'
            html += '<div class="localidad">'
            html += '<div class="mapa">'
            html += '<i class="bx bx-location-plus"></i> <br>'
            html += '<p>(' + key.provincia.provincia + ')</p>'
            html += '</div>'
            html += '<div class="caducidad">'
            html += ' <i class="bx bx-calendar"></i><br>'
            html += '<p>' + key.fechaPublicacion + '</p>'
            html += '</div>'
            html += '</div>'
            oferta.innerHTML = html;
            div.appendChild(oferta)
        }
        i++;
    }

    let boton = document.createElement('button');
    boton.id = 'botonvermas'
    boton.style.width = '16660px;'
    boton.innerHTML = ' VER MÁS OFERTAS '
    boton.onclick = function () {
        window.location = '/verOfertas.html';
    }
    div.appendChild(boton)
}

function vermas(ciudad) {
    console.log(ciudad);
    switch (ciudad) {
        case 'barcelona':
            localStorage.setItem('ciudad', 'Barcelona')
            break;
        case 'madrid':
            localStorage.setItem('ciudad', 'Madrid')
            break;
        case 'bilbao':
            localStorage.setItem('ciudad', 'Bilbao')
            break;
    }
    window.location.href = "verOfertas.html";
}

function contenidoSlider() {
    const URL = "http://localhost:8083/empresa/todas";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            for (let i = 0; i < 3; i++) {
                data.forEach(element => {
                    if(element.logo != "empresa.png"){
                        html += "<div class='sliderBox' onclick='fverEmpresa(\"" + element.cif + "\")'>";
                        html += "<img src='assets/img/empresas/" + element.logo + "' alt=''>";
                        html += "</div>";
                    }
                });
                document.querySelector(".sliderAnimate").innerHTML += html;
            }
        });
}

function fverEmpresa(cifv) {
    var cifEmpresa = cifv;
    console.log(cifEmpresa);
    localStorage.setItem('cif', cifEmpresa)
    document.location = "verEmpresa.html";
}