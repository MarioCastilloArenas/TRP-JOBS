// Div contenido

function fMostrarCuenta() {
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';
}
function fMostrarDatos() {
    // let html = "";
    // html += "<div> Hola </div>";
    // document.querySelector(".empresaContenidoOpcionesTxt").innerHTML = html;
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';
}
function fMostrarInformacion() {
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'flex';
}

// Navegador

function fMostrarMisDatos() {
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'none';

}
function fMostrarMisOfertas() {
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'none';



}
function fPublicarOferta() {
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'flex';

}

function fcargarDatosIndexEmpresa() {
    cifEmp = JSON.parse(localStorage.getItem("empresa"));
    const URL = "http://localhost:8080/empresa/" + cifEmp;
    fetch(URL)
        .then((response) => response.json())
        .then((empresa) => {
            var idProv = empresa.provincia.idProvincia;
            var idActiv = empresa.tipoActividadEmpresarial.idActividad;
            let html = "";
            html += "<div id='logoIndexEmpresa'><i class='bx bx-user-circle'></i></div>";
            html += "<h2> " + empresa.nombreFiscal + "</h2>";
            document.getElementById("UsuarioEmpresa").innerHTML = html;

            document.getElementById("email").value = empresa.email;
            document.getElementById("password").value = empresa.dni;
            document.getElementById("password2").value = empresa.dni;



            document.getElementById("cif").value = empresa.cif;
            document.getElementById("nomFiscal").value = empresa.nombreFiscal;
            tipoActividadEmpresarial(idActiv);
            document.getElementById("direccion").value = empresa.direccion;
            provincias(idProv);
            document.getElementById("codigoPostal").value = empresa.codigoPostal;



            document.getElementById("nomComercial").value = empresa.nombreComercial;
            document.getElementById("descripcion").value = empresa.descripcionEmpresa;
            document.getElementById("sitioWeb").value = empresa.sitioWeb;
            document.getElementById("telefono").value = empresa.telefono;
            document.getElementById("logo").value = empresa.logo;
        });
    fMostrarTodas();
}

function tipoActividadEmpresarial(idActiv) {
    const URL = "http://localhost:8080/tipoActividadEmpresa/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            // let TipoActividadEmpresas=document.getElementById('TipoActividadEmpresa');
            data.forEach(element => {
                if (element.idActividad == idActiv) {
                    let select = document.getElementById("TipoActividadEmpresa");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idActividad
                    opcion.innerHTML = element.actividad
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById("TipoActividadEmpresa");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idActividad
                    opcion.innerHTML = element.actividad
                    select.appendChild(opcion);

                }
            });
        })
}

function tipoActividadEmpresarial(idActiv) {
    const URL = "http://localhost:8080/tipoActividadEmpresa/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            // let TipoActividadEmpresas=document.getElementById('TipoActividadEmpresa');
            data.forEach(element => {
                if (element.idActividad == idActiv) {
                    let select = document.getElementById("TipoActividadEmpresa");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idActividad
                    opcion.innerHTML = element.actividad
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById("TipoActividadEmpresa");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idActividad
                    opcion.innerHTML = element.actividad
                    select.appendChild(opcion);
                }
            });
        })
}

function provincias(idProv) {
    const URL = "http://localhost:8080/provincias/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idProvincia == idProv) {
                    let select = document.getElementById("provincia");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idProvincia
                    opcion.innerHTML = element.provincia
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById("provincia");
                    // let opcion = new Option(element.provincia,element.provincia);
                    let opcion = document.createElement('option');
                    opcion.value = element.idProvincia
                    opcion.innerHTML = element.provincia
                    select.appendChild(opcion);
                }
            });
            // document.getElementById("usuarioContenidoOpcionesTxt").innerHTML = html2 
        })
}


function fCerrarSesion() {
    localStorage.removeItem("empresa");
    document.location = "index.html";
}

// div class:empresaContenidoOpcionesBtn;
function fMostrarTodas() {
    cifEmp = JSON.parse(localStorage.getItem("empresa"));
    fotoEmp = JSON.parse(localStorage.getItem("empresaFoto"));
    const URL = "http://localhost:8080/oferta/todasOfertas/" + cifEmp;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.forEach(element => {
                html += "<div class='ofertaDestacada'>";
                html += "   <div class='circleDestacada'>Todas</div>";
                html += "   <div class='image'>";
                html += "       <img src='assets/img/empresas/seur.png' alt='' width='180px' height='100px'>";
                html += "   </div>";
                html += "   <div class='informacionEmpresa'>";
                html += "       <div class='puesto'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "       <div class='nombrEmpresa'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='localidad'>";
                html += "       <div class='mapa'>";
                html += "           <i class='bx bx-location-plus' ></i> <br>";
                html += "           <p>" + element.localidad + "</p>";
                html += "       </div>";
                html += "       <div class='caducidad'>";
                html += "           <i class='bx bx-calendar'></i><br>";
                html += "           <p>" + element.fechaCaducidad + "</p>";
                html += "       </div>";
                html += "   </div>";
                html += "</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });

}
function fMostrarActivas() {
    cifEmp = JSON.parse(localStorage.getItem("empresa"));
    fotoEmp = JSON.parse(localStorage.getItem("empresaFoto"));
    const URL = "http://localhost:8080/oferta/todasOfertasNoCaducadas/" + cifEmp;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.forEach(element => {
                html += "<div class='ofertaDestacada'>";
                html += "   <div class='circleDestacada'>Activas</div>";
                html += "   <div class='image'>";
                html += "       <img src='assets/img/empresas/seur.png' alt='' width='180px' height='100px'>";
                html += "   </div>";
                html += "   <div class='informacionEmpresa'>";
                html += "       <div class='puesto'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "       <div class='nombrEmpresa'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='localidad'>";
                html += "       <div class='mapa'>";
                html += "           <i class='bx bx-location-plus' ></i> <br>";
                html += "           <p>" + element.localidad + "</p>";
                html += "       </div>";
                html += "       <div class='caducidad'>";
                html += "           <i class='bx bx-calendar'></i><br>";
                html += "           <p>" + element.fechaCaducidad + "</p>";
                html += "       </div>";
                html += "   </div>";
                html += "</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });

}
function fMostrarFinalizadas() {
    cifEmp = JSON.parse(localStorage.getItem("empresa"));
    fotoEmp = JSON.parse(localStorage.getItem("empresaFoto"));
    const URL = "http://localhost:8080/oferta/todasOfertasCaducadas/" + cifEmp;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.forEach(element => {
                html += "<div class='ofertaDestacada'>";
                html += "   <div class='circleDestacada'>Finalizadas</div>";
                html += "   <div class='image'>";
                html += "       <img src='assets/img/empresas/seur.png' alt='' width='180px' height='100px'>";
                html += "   </div>";
                html += "   <div class='informacionEmpresa'>";
                html += "       <div class='puesto'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "       <div class='nombrEmpresa'>";
                html += "           " + element.tituloOferta + "";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='localidad'>";
                html += "       <div class='mapa'>";
                html += "           <i class='bx bx-location-plus' ></i> <br>";
                html += "           <p>" + element.localidad + "</p>";
                html += "       </div>";
                html += "       <div class='caducidad'>";
                html += "           <i class='bx bx-calendar'></i><br>";
                html += "           <p>" + element.fechaCaducidad + "</p>";
                html += "       </div>";
                html += "   </div>";
                html += "</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });
}