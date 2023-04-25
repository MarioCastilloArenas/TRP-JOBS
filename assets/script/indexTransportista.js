function fMostrarMisDatos() {
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'none';

}
function fMostrarMisInscripciones() {
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'none';

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

}
function provincias(idProv) {
    const URL = "http://localhost:8083/provincias/";
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

function fActualizarDatosBasicos() {

}

