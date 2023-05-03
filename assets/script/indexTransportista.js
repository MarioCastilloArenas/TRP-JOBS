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
    const URL = "http://localhost:8080/trabajador/" + dniUsu;
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
    const URL = "http://localhost:8080/provincias/";
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
    const URL = "http://localhost:8080/oferta/inscripcionesUsuarioActivas/" + dni;
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
    const URL = "http://localhost:8080/oferta/inscripcionesUsuarioCaducadas/" + dni;
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
    const URL = "http://localhost:8080/trabajador/experiencias/" + dni;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            console.log(data);
            if(data == null){
                html += "<h3 id='mensaje3'></h3>";
                html += "<label><input type='checkbox' id='no_experiencia' value='no_experiencia' checked='true'/>No tengo experiencia</label>";
            } else {
                data.forEach((element, index) => {
                    let idSelect = "TipoCarnet" + index;
                    let idSelect2 = "TipoEspecialidad" + index;
                    html += "<div>";
                    html += "    <div class='form-item'>";
                    html += "        <label for='nomEmpresa'>Nombre Empresa:</label>";
                    html += "        <input type='text' id='nomEmpresa' value='"+ element.nombreEmpresa +"' required/>";
                    html += "        <i id='good' class='bx bx-check-circle'></i>";
                    html += "        <i id='error' class='bx bx-error-circle'></i>";
                    html += "        <small>Rellene este campo</small>";
                    html += "    </div>";
                    html += "    <div class='form-item'>";
                    html += "        <label for='duracion'>Duración:</label>";
                    html += "        <input type='text' name='duracion' id='duracion' value='"+ element.duracion +"' required >";
                    html += "        <i id='good' class='bx bx-check-circle'></i>";
                    html += "        <i id='error'  class='bx bx-error-circle'></i>";
                    html += "        <small>rellene este campo</small>";
                    html += "    </div>";
                    html += "    <div class='form-item'>";
                    html += "        <label for='TipoCarnet'>Carnet Tipo:</label>";
                    html += "        <select class='TipoCarnet' id='" + idSelect + "'></select>";
                    html += "    </div>";
                    html += "    <div class='form-item>";
                    html += "        <label for='TipoEspecialidad'>Tipo Especialidad:</label>";
                    html += "        <select class='TipoEspecialidad' id='"+ idSelect2 +"'></select>";
                    html += "    </div>";
                    html += "</div>";
                    html += "<br>";
                    html += "<button id='botonSiguiente2'>Actualizar</button>"
                    html += "<br>";
                    html += "<hr width='100%' style='border-color:#ffb31aa8'>";
                    html += "<br>";
                    tipoCarnetExperiencias(element.tipoCarnet.idCarnet, idSelect);
                    tipoEspecialidadExperiencias(element.tipoEspecialidad.idTipo, idSelect2)
                });
            }
            document.querySelector("#datosExperiencia").innerHTML = html;
        });
}



// function fCargarDatosExperiencia(){
//     dni = JSON.parse(localStorage.getItem("usuario"));
//     const URL = "http://localhost:8080/trabajador/experiencias/" + dni;
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             let html = "";
//             console.log(data);
//             // console.log(data[0].oferta);
//             if(data == null){
//                 html += "<h3 id='mensaje3'></h3>";
//                 html += "<label><input type='checkbox' id='no_experiencia' value='no_experiencia' checked='true'/>No tengo experiencia</label>";
//             } else {
//                 data.forEach(element => {
                    
//                     html += "<h3 id='mensaje3'></h3>";
//                     //html += "<label><input type='checkbox' id='no_experiencia' value='no_experiencia'/>No tengo experiencia</label>";
//                     html += "<div>";
//                     html +="    <div class='form-item'>";
//                     html +="        <label for='nomEmpresa'>Nombre Empresa:</label>";
//                     html +="        <input type='text' id='nomEmpresa' value='"+ element.nombreEmpresa +"' required/>";
//                     html +="        <i id='good' class='bx bx-check-circle'></i>";
//                     html +="        <i id='error' class='bx bx-error-circle'></i>";
//                     html +="        <small>Rellene este campo</small>";
//                     html +="    </div>";
//                     html +="    <div class='form-item'>";
//                     html +="        <label for='duracion'>Duración:</label>";
//                     html +="        <input type='text' name='duracion' id='duracion' value='"+ element.duracion +"' required >";
//                     html +="        <i id='good' class='bx bx-check-circle'></i>";
//                     html +="        <i id='error'  class='bx bx-error-circle'></i>";
//                     html +="        <small>rellene este campo</small>";
//                     html +="    </div>";
//                     html +="    <div class='form-item'>";
//                     html +="        <label for='TipoCarnet'>Carnet Tipo:</label>";
//                     html +="        <select class='TipoCarnet' value='"+ element.tipoCarnet.idCarnet +"'></select>";
//                     html +="    </div>";
//                     html +="    <div class='form-item>";
//                     html +="        <label for='TipoEspecialidad'>Tipo Especialidad:</label>";
//                     html +="        <select class='TipoEspecialidad'></select>";
//                     html +="    </div>";
//                     html += "</div>";
//                     html += "<br>";
//                     html += "<button id='botonSiguiente2'>Actualizar</button>"
//                     html += "<br>";
//                     html += "<hr width='100%' style='border-color:#ffb31aa8'>";
//                     html += "<br>";
//                     tipoCarnetExperiencias(element.tipoCarnet.idCarnet);
//                     tipoEspecialidadExperiencias(element.tipoEspecialidad.idTipo)
//                 });
                
//             }
            
//             document.querySelector("#datosExperiencia").innerHTML = html;
//         });

// }

function tipoCarnetExperiencias(idCarnet) {
    const URL = "http://localhost:8080/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            var selects = document.querySelectorAll(".TipoCarnet"); // seleccionar todos los select con la clase "TipoCarnet"
            selects.forEach((select) => { // recorrer todos los select
                data.forEach((element) => { // recorrer todos los carnets
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet;
                    opcion.innerHTML = element.carnet;
                    if (element.idCarnet == idCarnet) { // si el id del carnet coincide con el id pasado como parámetro, seleccionar esa opción
                        opcion.selected = true;
                    }
                    select.appendChild(opcion); // agregar la opción al select correspondiente
                });
            });
        });
}
function tipoEspecialidadExperiencias(idEspecialidad) {
    const URL = "http://localhost:8080/tipoEspecialidades/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            var selects = document.querySelectorAll(".TipoEspecialidad"); // seleccionar todos los select con la clase "TipoEspecialidad"
            selects.forEach((select) => { // recorrer todos los select
                data.forEach((element) => { // recorrer todos los tipos
                    let opcion = document.createElement('option');
                    opcion.value = element.idTipo;
                    opcion.innerHTML = element.especialidad;
                    if (element.idTipo == idEspecialidad) { // si el id del carnet coincide con el id pasado como parámetro, seleccionar esa opción
                        opcion.selected = true;
                    }
                    select.appendChild(opcion); // agregar la opción al select correspondiente
                });
            });
        });
}
// function tipoEspecialidadExperiencias(idEspecialidad) {
//     const URL = "http://localhost:8080/tipoEspecialidades/";
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             data.forEach(element => {
//                 if (element.idEspecialidad == idEspecialidad) {
//                     let select = document.querySelector(".TipoEspecialidad");
//                     let opcion = document.createElement('option');
//                     opcion.value = element.idTipo
//                     opcion.innerHTML = element.especialidad
//                     opcion.selected = "true";
//                     select.appendChild(opcion);
//                 } else {
//                     let select = document.querySelector(".TipoEspecialidad");
//                     let opcion = document.createElement('option');
//                     opcion.value = element.idTipo
//                     opcion.innerHTML = element.especialidad
//                     select.appendChild(opcion);
//                 }
//             });
           
//         })
// }


// function tipoCarnetExperiencias(idCarnet) {
//     const URL = "http://localhost:8080/tipoCarnets/";
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             var elementos = document.querySelectorAll(".TipoCarnet");
//             console.log(elementos);
//             data.forEach(element => {
//                 for(i = 0; i < elementos.length; i++){
//                     if (element.idCarnet == idCarnet) {
//                         let select = elementos[i];
//                         let opcion = document.createElement('option');
//                         opcion.value = element.idCarnet
//                         opcion.innerHTML = element.carnet
//                         opcion.selected = "true";
//                         select.appendChild(opcion);
//                     } else {
//                         let select = elementos[i];
//                         let opcion = document.createElement('option');
//                         opcion.value = element.idCarnet
//                         opcion.innerHTML = element.carnet
//                         select.appendChild(opcion);
//                     }
//                 }
//             });
//         })
// }


// function tipoCarnetExperiencias(idCarnet) {
//     const URL = "http://localhost:8080/tipoCarnets/";
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(document.querySelector(".TipoCarnet:nth-of-type(1)"));
//             var elementos = document.querySelectorAll(".TipoCarnet"); // seleccionar el primer elemento
//             console.log(elementos);
//             data.forEach(element => {
//                 for(i=0; i <elementos.length; i++){
//                     var idC = ".tipoCarnet"+i;
//                     console.log(idC);
//                     if (element.idCarnet == idCarnet) {
//                         let select = document.querySelector(".TipoCarnet");
//                         let opcion = document.createElement('option');
//                         opcion.value = element.idCarnet
//                         opcion.innerHTML = element.carnet
//                         opcion.selected = "true";
//                         select.appendChild(opcion);
//                     } else {
//                         let select = document.querySelector(".TipoCarnet");
//                         let opcion = document.createElement('option');
//                         opcion.value = element.idCarnet
//                         opcion.innerHTML = element.carnet
//                         select.appendChild(opcion);
//                     }
//                 }
//             });
           
//         })
// }
// function tipoEspecialidadExperiencias(idEspecialidad) {
//     const URL = "http://localhost:8080/tipoEspecialidades/";
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             data.forEach(element => {
//                 if (element.idEspecialidad == idEspecialidad) {
//                     let select = document.querySelector(".TipoEspecialidad");
//                     let opcion = document.createElement('option');
//                     opcion.value = element.idTipo
//                     opcion.innerHTML = element.especialidad
//                     opcion.selected = "true";
//                     select.appendChild(opcion);
//                 } else {
//                     let select = document.querySelector(".TipoEspecialidad");
//                     let opcion = document.createElement('option');
//                     opcion.value = element.idTipo
//                     opcion.innerHTML = element.especialidad
//                     select.appendChild(opcion);
//                 }
//             });
           
//         })
// }
function fcargarDatosProfesionales() {
    dniUsu = JSON.parse(localStorage.getItem("usuario"));
    const URL = "http://localhost:8080/trabajador/datosProfesionales/" + dniUsu;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            if(data.tipoProfesion == document.getElementById("tipoProfesionAs").value){
                document.getElementById("tipoProfesionAs").checked = true;
            } else {
                document.getElementById("tipoProfesionAu").checked = true;
            }
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
    const URL = "http://localhost:8080/ambitosGeograficos/";
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
    const URL = "http://localhost:8080/tipoCarnets/";
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
async function fActualizarDatosBasicos(){
    let bolean = true;
    let dniUsu = JSON.parse(localStorage.getItem("usuario"));
    let dniUsuV;
    try { dniUsuV = await buscarTrabajador(dniUsu); } catch (error) { throw new Error('Ha ocurrido un error'); }
    //dniUsuV.email = email;
    let nombre = document.getElementById('nombre');
    let nombreValor = nombre.value.trim();
    if (nombreValor === '') {
        enviarError(nombre, "Rellene este campo");
        bolean = false;
    } else if (nombreValor.length >= 50) {
        enviarError(nombre, "No puede tener tantos caracateres");
        bolean = false;
    } else {
        funciona(nombre);
    }
    console.log(nombreValor);
    let apellidos = document.getElementById('apellidos');
    let apellidosValor = apellidos.value.trim();
    if (apellidosValor === '') {
        enviarError(apellidos, "Rellene este campo");
        bolean = false;
    } else if (apellidosValor.length >= 50) {
        enviarError(apellidos, "No puede tener tantos caracateres");
        bolean = false;
    } else {
        funciona(apellidos);
    }
    let fechaNacimiento = document.getElementById('fechaNacimiento')
    let fechaNacimientoValor = fechaNacimiento.value.trim();
    if (calcularEdad(fechaNacimientoValor) >= 18) {
        funciona(fechaNacimiento);
    } else {
        bolean = false;
        enviarError(fechaNacimiento, 'Debes ser mayor de edad para registrarte');
    }

    let nacionalidad = document.getElementById('nacionalidad');
    let nacionalidadValor = nacionalidad.value.trim();
    if (nacionalidadValor === '') {
        enviarError(nacionalidad, "Rellene este campo");
        bolean = false;
    } else if (nacionalidadValor.length >= 50) {
        enviarError(nacionalidad, "No puede tener tantos caracateres");
        bolean = false;
    } else {
        funciona(nacionalidad);
    }
    let provincia = document.getElementById('provincia').value;
    let provinciaL;
    try { provinciaL = await buscarProvincia(provincia); } catch (error) { throw new Error('Ha ocurrido un error'); }

    let codigoPostal = document.getElementById('codigoPostal');
    let codigoPostalValor = codigoPostal.value.trim();
    if (codigoPostalValor === '') {
        enviarError(codigoPostal, "Rellene este campo");
        bolean = false;
    } else if (!validarCodigoPostal(codigoPostalValor, provincia)) {
        enviarError(codigoPostal, 'Codigo Postal invalido');
    } else {
        funciona(codigoPostal);
    }

    let presentacion = document.getElementById('presentacion');
    let presentacionValor = presentacion.value.trim();
    if (presentacionValor === '') {
        enviarError(presentacion, "Rellene este campo");
        bolean = false;
    } else if (presentacionValor.length >= 500) {
        enviarError(presentacion, "No puede tener tantos caracateres");
        bolean = false;
    } else {
        funciona(presentacion);
    }

    let arc = document.getElementById('fotoTrabajador');
    const arcv = arc.value.trim();
    const arcvi = arcv.split('\\').pop();
    
    if (bolean == true) {
        dniUsuV = JSON.parse(dniUsuV)
        dniUsuV.nombre = nombreValor;
        console.log(dniUsuV);
        let actUsuario;
        try {
            actUsuario = await actulizarDatosUsuarioBasicos(dniUsuV);
            console.log("hey", actUsuario, dniUsuV);
        } catch (error) {
                    throw new Error('Ha ocurrido un error');
                }
        }
        

}
function buscarTrabajador(dniv) {

    const URL = "http://localhost:8080/trabajador/" + dniv;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.text())
            .then((trabajador) => {
                if (trabajador == "") {
                    resolve(null);
                } else {
                    empresa = JSON.parse(trabajador)
                    console.log(trabajador);
                    resolve(trabajador);
                }
            })
            .catch((error) => reject(error));
    });
}
function funciona(input) {

    let formControl = input.parentElement;
    let error = formControl.querySelector('#error');
    error.style.visibility = 'hidden';
    let small = formControl.querySelector('small');
    small.style.visibility = 'hidden';
    let good = formControl.querySelector('#good');
    good.style.color = 'green'
    good.style.visibility = 'visible'
    let inputF = formControl.querySelector('input');
    inputF.style.borderColor = 'green';
}
function calcularEdad(fecha_nacimiento) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;

}
function buscarProvincia(id) {
    const URL = "http://localhost:8080/provincia/" + id;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.json())
            .then((provincia) => { resolve(provincia); })
            .catch((error) => reject(error));
    });

}
function validarCodigoPostal(cp, provincia) {
    // Comprobar que el código postal tiene 5 dígitos
    if (!/^\d{5}$/.test(cp)) {
        return false;
    }

    // Obtener los dos primeros dígitos del código postal
    var provinciaCP = cp.substr(0, 2);
    let cdprov = provincia.toString().padStart(2, '0');
    // Comprobar si los dos primeros dígitos corresponden a la provincia indicada
    if (provinciaCP !== cdprov) {
        return false;
    }

    // Si se han superado todas las comprobaciones, el código postal es válido
    return true;
}
function actulizarDatosUsuarioBasicos(dni){
    return new Promise((resolve, reject) => {
        const URL = "http://localhost:8080/trabajador/actualizar/";
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dni)
        })
            .then((response) => response.json())
            .then((dni) => { resolve(dni); })
            .catch((error) => reject(error));;
    });
}

