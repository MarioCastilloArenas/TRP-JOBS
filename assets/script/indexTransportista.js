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
//     const URL = "http://localhost:8083/trabajador/experiencias/" + dni;
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

function tipoCarnetExperiencias(idCarnetP,id) {
    const URL = "http://localhost:8083/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idCarnet == idCarnetP) {
                    let select = document.getElementById(id);
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById(id);
                    let opcion = document.createElement('option');
                    opcion.value = element.idCarnet
                    opcion.innerHTML = element.carnet
                    select.appendChild(opcion);
                }
            });
           
        })
}
function tipoEspecialidadExperiencias(idEspecialidad2,id) {
    const URL = "http://localhost:8083/tipoEspecialidades/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element.idTipo == idEspecialidad2) {
                    let select = document.getElementById(id);
                    let opcion = document.createElement('option');
                    opcion.value = element.idTipo
                    opcion.innerHTML = element.especialidad
                    opcion.selected = "true";
                    select.appendChild(opcion);
                } else {
                    let select = document.getElementById(id);
                    let opcion = document.createElement('option');
                    opcion.value = element.idTipo
                    opcion.innerHTML = element.especialidad
                    select.appendChild(opcion);
                }
            });
           
        })
}
// function tipoEspecialidadExperiencias(idEspecialidad) {
//     const URL = "http://localhost:8083/tipoEspecialidades/";
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
//     const URL = "http://localhost:8083/tipoCarnets/";
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
//     const URL = "http://localhost:8083/tipoCarnets/";
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
//     const URL = "http://localhost:8083/tipoEspecialidades/";
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
    const URL = "http://localhost:8083/trabajador/datosProfesionales/" + dniUsu;
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
async function fActualizarDatosBasicos(){
    let bolean = true;
    password = document.getElementById("password").value;
    password2 = document.getElementById("password2").value;
    contrasena = document.getElementById("password");
    contrasena2 = document.getElementById("password2");
    if (password === '') {
        enviarError(contrasena, "Rellene este campo");
        bolean = false;
    } else if (password.length > 8) {
        bolean = false;
        enviarError(contrasena, 'No debe tener más de 8 caracteres');
    } else {
        funciona(contrasena);
    }

    if (password2 === '') {
        enviarError(contrasena2, "Rellene este campo");
        bolean = false;
    } else if (password !== password2) {
        bolean = false;
        enviarError(contrasena2, 'Las contraseñas no coinciden');
    } else {
        funciona(contrasena2);
    }

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
        dniUsuV.apellidos = apellidosValor;
        dniUsuV.fechaNacimiento = fechaNacimientoValor;
        dniUsuV.nacionalidad = nacionalidadValor;
        /*No se por que la contraseña no me hace update*/
        let password = md5(password2);
        dniUsu.contrasena = password;
        dniUsuV.codigoPostal = codigoPostalValor;
        dniUsuV.presentacion = presentacionValor;
        dniUsuV.presentacion = presentacionValor;
        dniUsuV.foto = arc;
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

    const URL = "http://localhost:8083/trabajador/" + dniv;
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
function buscarTrabajadorDatosProfe(dniv) {

    const URL = "http://localhost:8083/trabajador/datosProfesionales/" + dniv;
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
    const URL = "http://localhost:8083/provincia/" + id;
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
        const URL = "http://localhost:8083/trabajador/actualizar/";
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
function actulizarDatosUsuarioProfesionales(dni){
    return new Promise((resolve, reject) => {
        const URL = "http://localhost:8083/trabajador/actualizarDatosProfesionales/";
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

async function actualizarDatosProfesionalesUsu(){
    let dniUsu = JSON.parse(localStorage.getItem("usuario"));
    let dniUsuV;
    try { dniUsuV = await buscarTrabajadorDatosProfe(dniUsu); } catch (error) { throw new Error('Ha ocurrido un error'); }
    //dniUsuV.email = email;

    if(document.getElementById("tipoProfesionAs").checked == true){
        tipoProfesionValor = document.getElementById("tipoProfesionAs").value;
    } else if(document.getElementById("tipoProfesionAu").checked == true){
        tipoProfesionValor = document.getElementById("tipoProfesionAu").value;
    }
    dniUsuV = JSON.parse(dniUsuV)
    dniUsu.tipoProfesion = tipoProfesionValor;


    let actUsuario;
        try {
            actUsuario = await actulizarDatosUsuarioProfesionales(dniUsuV);
            console.log("hey", actUsuario, dniUsuV);
        } catch (error) {
                    throw new Error('Ha ocurrido un error');
                }
        
}

/* ---------- SEGURIDAD ----------- */
!function (n) { "use strict"; function d(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function f(n, t, r, e, o, u) { return d((u = d(d(t, n), d(e, u))) << o | u >>> 32 - o, r) } function l(n, t, r, e, o, u, c) { return f(t & r | ~t & e, n, t, o, u, c) } function g(n, t, r, e, o, u, c) { return f(t & e | r & ~e, n, t, o, u, c) } function v(n, t, r, e, o, u, c) { return f(t ^ r ^ e, n, t, o, u, c) } function m(n, t, r, e, o, u, c) { return f(r ^ (t | ~e), n, t, o, u, c) } function c(n, t) { var r, e, o, u; n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t; for (var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0; h < n.length; h += 16)c = l(r = c, e = f, o = i, u = a, n[h], 7, -680876936), a = l(a, c, f, i, n[h + 1], 12, -389564586), i = l(i, a, c, f, n[h + 2], 17, 606105819), f = l(f, i, a, c, n[h + 3], 22, -1044525330), c = l(c, f, i, a, n[h + 4], 7, -176418897), a = l(a, c, f, i, n[h + 5], 12, 1200080426), i = l(i, a, c, f, n[h + 6], 17, -1473231341), f = l(f, i, a, c, n[h + 7], 22, -45705983), c = l(c, f, i, a, n[h + 8], 7, 1770035416), a = l(a, c, f, i, n[h + 9], 12, -1958414417), i = l(i, a, c, f, n[h + 10], 17, -42063), f = l(f, i, a, c, n[h + 11], 22, -1990404162), c = l(c, f, i, a, n[h + 12], 7, 1804603682), a = l(a, c, f, i, n[h + 13], 12, -40341101), i = l(i, a, c, f, n[h + 14], 17, -1502002290), c = g(c, f = l(f, i, a, c, n[h + 15], 22, 1236535329), i, a, n[h + 1], 5, -165796510), a = g(a, c, f, i, n[h + 6], 9, -1069501632), i = g(i, a, c, f, n[h + 11], 14, 643717713), f = g(f, i, a, c, n[h], 20, -373897302), c = g(c, f, i, a, n[h + 5], 5, -701558691), a = g(a, c, f, i, n[h + 10], 9, 38016083), i = g(i, a, c, f, n[h + 15], 14, -660478335), f = g(f, i, a, c, n[h + 4], 20, -405537848), c = g(c, f, i, a, n[h + 9], 5, 568446438), a = g(a, c, f, i, n[h + 14], 9, -1019803690), i = g(i, a, c, f, n[h + 3], 14, -187363961), f = g(f, i, a, c, n[h + 8], 20, 1163531501), c = g(c, f, i, a, n[h + 13], 5, -1444681467), a = g(a, c, f, i, n[h + 2], 9, -51403784), i = g(i, a, c, f, n[h + 7], 14, 1735328473), c = v(c, f = g(f, i, a, c, n[h + 12], 20, -1926607734), i, a, n[h + 5], 4, -378558), a = v(a, c, f, i, n[h + 8], 11, -2022574463), i = v(i, a, c, f, n[h + 11], 16, 1839030562), f = v(f, i, a, c, n[h + 14], 23, -35309556), c = v(c, f, i, a, n[h + 1], 4, -1530992060), a = v(a, c, f, i, n[h + 4], 11, 1272893353), i = v(i, a, c, f, n[h + 7], 16, -155497632), f = v(f, i, a, c, n[h + 10], 23, -1094730640), c = v(c, f, i, a, n[h + 13], 4, 681279174), a = v(a, c, f, i, n[h], 11, -358537222), i = v(i, a, c, f, n[h + 3], 16, -722521979), f = v(f, i, a, c, n[h + 6], 23, 76029189), c = v(c, f, i, a, n[h + 9], 4, -640364487), a = v(a, c, f, i, n[h + 12], 11, -421815835), i = v(i, a, c, f, n[h + 15], 16, 530742520), c = m(c, f = v(f, i, a, c, n[h + 2], 23, -995338651), i, a, n[h], 6, -198630844), a = m(a, c, f, i, n[h + 7], 10, 1126891415), i = m(i, a, c, f, n[h + 14], 15, -1416354905), f = m(f, i, a, c, n[h + 5], 21, -57434055), c = m(c, f, i, a, n[h + 12], 6, 1700485571), a = m(a, c, f, i, n[h + 3], 10, -1894986606), i = m(i, a, c, f, n[h + 10], 15, -1051523), f = m(f, i, a, c, n[h + 1], 21, -2054922799), c = m(c, f, i, a, n[h + 8], 6, 1873313359), a = m(a, c, f, i, n[h + 15], 10, -30611744), i = m(i, a, c, f, n[h + 6], 15, -1560198380), f = m(f, i, a, c, n[h + 13], 21, 1309151649), c = m(c, f, i, a, n[h + 4], 6, -145523070), a = m(a, c, f, i, n[h + 11], 10, -1120210379), i = m(i, a, c, f, n[h + 2], 15, 718787259), f = m(f, i, a, c, n[h + 9], 21, -343485551), c = d(c, r), f = d(f, e), i = d(i, o), a = d(a, u); return [c, f, i, a] } function i(n) { for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8)t += String.fromCharCode(n[e >> 5] >>> e % 32 & 255); return t } function a(n) { var t = []; for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)t[e] = 0; for (var r = 8 * n.length, e = 0; e < r; e += 8)t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32; return t } function e(n) { for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1)t = n.charCodeAt(o), e += r.charAt(t >>> 4 & 15) + r.charAt(15 & t); return e } function r(n) { return unescape(encodeURIComponent(n)) } function o(n) { return i(c(a(n = r(n)), 8 * n.length)) } function u(n, t) { return function (n, t) { var r, e = a(n), o = [], u = []; for (o[15] = u[15] = void 0, 16 < e.length && (e = c(e, 8 * n.length)), r = 0; r < 16; r += 1)o[r] = 909522486 ^ e[r], u[r] = 1549556828 ^ e[r]; return t = c(o.concat(a(t)), 512 + 8 * t.length), i(c(u.concat(t), 640)) }(r(n), r(t)) } function t(n, t, r) { return t ? r ? u(t, n) : e(u(t, n)) : r ? o(n) : e(o(n)) } "function" == typeof define && define.amd ? define(function () { return t }) : "object" == typeof module && module.exports ? module.exports = t : n.md5 = t }(this);
//# sourceMappingURL=md5.min.js.map}