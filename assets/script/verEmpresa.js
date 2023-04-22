document.addEventListener("DOMContentLoaded", () => {
    let cif = localStorage.getItem('cif');
    fverEmpresa(cif)
    verOfertas(cif)
    //fverEmpresa("A28985992")
});

function fverEmpresa(cif) {

    let url = "http://localhost:8080/empresa/" + cif;
    fetch(url)
        .then(res => res.json())
        .then(empresa => {
            console.log(empresa)
            let logoEmpresa = document.getElementById("logoEmpresa");
            let img = document.createElement("img");
            img.src = "assets/img/empresas/" + empresa.logo
            logoEmpresa.appendChild(img);

            let tipoEmpresaM = document.getElementById("tipoEmpresaM");
            tipoEmpresaM.innerHTML = empresa.tipoActividadEmpresarial.actividad
            let nombreEmpresaN = document.getElementById("nombreEmpresaN");
            nombreEmpresaN.innerHTML = empresa.nombreComercial
            let direccionEmpresaD = document.getElementById("direccionEmpresaD");
            direccionEmpresaD.innerHTML = empresa.direccion
            let provinciaP = document.getElementById("provinciaP");
            provinciaP.innerHTML = empresa.provincia.provincia
            let cp = document.getElementById("cp");
            cp.innerHTML = empresa.codigoPostal
            let webSiteW = document.getElementById("webSiteW");
            webSiteW.innerHTML = empresa.sitioWeb
            let tlf = document.getElementById("tlf");
            tlf.innerHTML = empresa.telefono
            let descripcionD = document.getElementById("descripcionD");
            descripcionD.innerHTML = empresa.descripcionEmpresa

            

        })

}

function verOfertas(cif) {
    const URL = "http://localhost:8080/oferta/todasOfertas/"+cif;
    fetch(URL)
        .then((response) => response.json())
        .then((oferta) => {
            pintar(oferta)
        });
}
function pintar(ofertasFiltradas) {
    let div = document.getElementById('listadoDeOfertas')
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
            html += '<div class="nombrEmpresa">' + '</div>'
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
    
}
