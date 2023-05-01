document.addEventListener("DOMContentLoaded", () => {
    fcargarDatosIndexTrabajador();
    fCargarDatosExperiencia();
    fcargarDatosProfesionales();
});
function fMostrarMisDatos() {
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'none';
    // let fieldset3 = document.getElementById('usuarioContenido3');
    // fieldset3.style.display = 'none';

}
function fMostrarMisInscripciones() {
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'flex';
    // let fieldset3 = document.getElementById('usuarioContenido3');
    // fieldset3.style.display = 'none';

}
function fMostrarMisAlertas() {
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'flex';

}
function fCerrarSesion() {
    localStorage.removeItem("usuario");
    document.location = "index.html"

}


function fMostrarBasicos() {
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';

}
function fMostrarProfesionales() {
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';

}
function fMostrarExperiencia() {
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'flex';

}

function fcargarDatosIndexTrabajador() {
    dniUsu = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8083/trabajador/" + dniUsu;
    fetch(URL)
        .then((response) => response.json())
        .then((trabajador) => {
            var idProv = trabajador.provincia.idProvincia;
            let html = "";
            html += "<div id='logoIndexTransportista'><i class='bx bx-user-circle'></i></div>";
            html += "<h2> " + trabajador.nombre + " " + trabajador.apellidos + "</h2>";
            document.getElementById("UsuarioLogin").innerHTML = html;

            document.getElementById("cif").value = trabajador.dni;
            document.getElementById("nombre").value = trabajador.nombre;
            document.getElementById("apellidos").value = trabajador.apellidos;
            document.getElementById("password").value = trabajador.contrasena;
            document.getElementById("password2").value = trabajador.contrasena;
            document.getElementById("fechaNacimiento").value = trabajador.fechaNacimiento;
            document.getElementById("nacionalidad").value = trabajador.nacionalidad;
            provincias(idProv);
            // document.getElementById("provincia").selected = trabajador.idProvincia;
            document.getElementById("codigoPostal").value = trabajador.codigoPostal;
            document.getElementById("presentacion").value = trabajador.presentacion;




        });
        fInscripcionesActivas();

}
function provincias(idProv) {
    const URL = "http://localhost:8083/provincias/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idProvincia == idProv) {
                    let select = document.getElementById("provincia");
                    let opcion = document.createElement('option');
                    opcion.value = element.idProvincia
                    opcion.innerHTML = element.provincia
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById("provincia");
                    let opcion = document.createElement('option');
                    opcion.value = element.idProvincia
                    opcion.innerHTML = element.provincia
                    select.appendChild(opcion);
                }
            });
        })
}

function fActualizarDatosBasicos() {

}

function fInscripcionesActivas(){
    dni = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8083/oferta/inscripcionesUsuarioActivas/" + dni;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            
            // console.log(data[0].oferta);
            data.forEach(element => {
                
                html += "<div class='ofertaDestacada'>";
                html += "   <div class='circleDestacada'>Activas</div>";
                html += "   <div class='image'>";
                html += "       <img src='assets/img/empresas/" + element.oferta.empresa.logo + "' alt='' width='180px' height='100px'>";
                html += "   </div>";
                html += "   <div class='informacionEmpresa'>";
                html += "       <div class='puesto'>";
                html += "           " + element.oferta.descripcion + "";
                html += "       </div>";
                html += "       <div class='nombrEmpresa'>";
                html += "           " +  element.oferta.empresa.nombreComercial + "";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='localidad'>";
                html += "       <div class='mapa'>";
                html += "           <i class='bx bx-location-plus' ></i> <br>";
                html += "           <p>" + element.oferta.localidad + "</p>";
                html += "       </div>";
                html += "       <div class='caducidad'>";
                html += "           <i class='bx bx-calendar'></i><br>";
                html += "           <p>" + element.oferta.fechaCaducidad + "</p>";
                html += "       </div>";
                html += "   </div>";
                html += "</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });

}

function fInscripcionesFinalizadas(){
    dni = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8083/oferta/inscripcionesUsuarioCaducadas/" + dni;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            
            // console.log(data[0].oferta);
            data.forEach(element => {
               
                html += "<div class='ofertaDestacada'>";
                html += "   <div class='circleDestacada'>Finalizadas</div>";
                html += "   <div class='image'>";
                html += "       <img src='assets/img/empresas/" + element.oferta.empresa.logo + "' alt='' width='180px' height='100px'>";
                html += "   </div>";
                html += "   <div class='informacionEmpresa'>";
                html += "       <div class='puesto'>";
                html += "           " + element.oferta.descripcion + "";
                html += "       </div>";
                html += "       <div class='nombrEmpresa'>";
                html += "           " +  element.oferta.empresa.nombreComercial + "";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='localidad'>";
                html += "       <div class='mapa'>";
                html += "           <i class='bx bx-location-plus' ></i> <br>";
                html += "           <p>" + element.oferta.localidad + "</p>";
                html += "       </div>";
                html += "       <div class='caducidad'>";
                html += "           <i class='bx bx-calendar'></i><br>";
                html += "           <p>" + element.oferta.fechaCaducidad + "</p>";
                html += "       </div>";
                html += "   </div>";
                html += "</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });

}

function fCargarDatosExperiencia(){
    dni = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8083/trabajador/experiencias/" + dni;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            
            // console.log(data[0].oferta);
            if(data == null){
                html += "<h3 id='mensaje3'></h3>";
                html += "<label><input type='checkbox' id='no_experiencia' value='no_experiencia' checked='true'/>No tengo experiencia</label>";
            } else {
                data.forEach(element => {
                    
                    html += "<h3 id='mensaje3'></h3>";
                    //html += "<label><input type='checkbox' id='no_experiencia' value='no_experiencia'/>No tengo experiencia</label>";
                    html += "<div>";
                    html +="    <div class='form-item'>";
                    html +="        <label for='nomEmpresa'>Nombre Empresa:</label>";
                    html +="        <input type='text' id='nomEmpresa' value='"+ element.nombreEmpresa +"' required/>";
                    html +="        <i id='good' class='bx bx-check-circle'></i>";
                    html +="        <i id='error' class='bx bx-error-circle'></i>";
                    html +="        <small>Rellene este campo</small>";
                    html +="    </div>";
                    html +="    <div class='form-item'>";
                    html +="        <label for='duracion'>Duración:</label>";
                    html +="        <input type='text' name='duracion' id='duracion' value='"+ element.duracion +"' required >";
                    html +="        <i id='good' class='bx bx-check-circle'></i>";
                    html +="        <i id='error'  class='bx bx-error-circle'></i>";
                    html +="        <small>rellene este campo</small>";
                    html +="    </div>";
                    html +="    <div class='form-item'>";
                    html +="        <label for='TipoCarnet'>Carnet Tipo:</label>";
                    html +="        <select class='TipoCarnet' value='"+ element.tipoEspecialidad.especialidad +"'></select>";
                    html +="    </div>";
                    html +="    <div class='form-item>";
                    html +="        <label for='TipoEspecialidad'>Tipo Especialidad:</label>";
                    html +="        <select class='TipoEspecialidad'></select>";
                    html +="    </div>";
                    html += "</div>";
                    html += "<br>";
                    html += "<button id='botonSiguiente2'>Actualizar</button>"
                    html += "<br>";
                    html += "<hr width='100%' style='border-color:#ffb31aa8'>";
                    html += "<br>";
                    tipoCarnetExperiencias(element.tipoCarnet.idCarnet);
                    tipoEspecialidadExperiencias(element.tipoEspecialidad.idTipo)
                });
                
            }
            
            document.querySelector("#datosExperiencia").innerHTML = html;
        });

}

function tipoCarnetExperiencias(idCarnet) {
    const URL = "http://localhost:8083/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idCarnet == idCarnet) {
                    let select = document.querySelector(".TipoCarnet");
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.querySelector(".TipoCarnet");
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    select.appendChild(opcion);
                }
            });
           
        })
}
function tipoEspecialidadExperiencias(idEspecialidad) {
    const URL = "http://localhost:8083/tipoEspecialidades/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idEspecialidad == idEspecialidad) {
                    let select = document.querySelector(".TipoEspecialidad");
                    let opcion = document.createElement('option');
                    opcion.value = element.idTipo
                    opcion.innerHTML = element.especialidad
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.querySelector(".TipoEspecialidad");
                    let opcion = document.createElement('option');
                    opcion.value = element.idTipo
                    opcion.innerHTML = element.especialidad
                    select.appendChild(opcion);
                }
            });
           
        })
}
function fcargarDatosProfesionales() {
    dniUsu = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8083/trabajador/datosProfesionales/" + dniUsu;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            
            // document.getElementById("cif").value = trabajador.dni;
            // document.getElementById("nombre").value = trabajador.nombre;
            // document.getElementById("apellidos").value = trabajador.apellidos;
            // document.getElementById("password").value = trabajador.contrasena;
            tipoCarnetProfesionales(data.tipoCarnet.idCarnet);
            tipoAmbitoProfesionales(data.ambitoGeografico.idAmbito);
            if(data.tarjetaTacografo == document.getElementById("tarjetaTacografoT").value){
                document.getElementById("tarjetaTacografoT").checked = true;
            } else {
                document.getElementById("tarjetaTacografoF").checked = true;
            }

            if(data.certificadoCap == document.getElementById("certificadoCapT").value){
                document.getElementById("certificadoCapT").checked = true;
            } else {
                document.getElementById("certificadoCapF").checked = true;
            }

            if(data.mercanciasPeligrosas == document.getElementById("mercanciasPeligrosasT").value){
                document.getElementById("mercanciasPeligrosasT").checked = true;
            } else {
                document.getElementById("mercanciasPeligrosasF").checked = true;
            }
            // document.getElementById("fechaNacimiento").value = trabajador.fechaNacimiento;
            document.getElementById("paisCarnet").value = data.paisCarnet;
        });

}
function tipoAmbitoProfesionales(idAmbito) {
    const URL = "http://localhost:8083/ambitosGeograficos/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idAmbito == idAmbito) {
                    let select = document.querySelector("#ambitosGeograficos");
                    let opcion = document.createElement('option');
                    opcion.value = element.idAmbito;
                    opcion.innerHTML = element.ambito
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.querySelector("#ambitosGeograficos");
                    let opcion = document.createElement('option');
                    opcion.value = element.idAmbito;
                    opcion.innerHTML = element.ambito
                    select.appendChild(opcion);
                }
            });
           
        })
}
function tipoCarnetProfesionales(idCarnet) {
    const URL = "http://localhost:8083/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idCarnet == idCarnet) {
                    let select = document.querySelector("#tipoCarnet");
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.querySelector("#tipoCarnet");
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    select.appendChild(opcion);
                }
            });
           
        })
}

