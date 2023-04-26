// Div contenido
document.addEventListener("DOMContentLoaded", () => {
    fcargarDatosIndexEmpresa();
    provinciasTodas();
    carnetTodos();
    geograficoTodos()
});

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

function provinciasTodas() {
    const URL = "http://localhost:8080/provincias/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            data.forEach(element => {
                let select = document.getElementById("provincia2");
                // let opcion = new Option(element.provincia,element.provincia);
                let opcion = document.createElement('option');
                opcion.value = element.idProvincia
                opcion.innerHTML = element.provincia
                select.appendChild(opcion);
            });
            // document.getElementById("usuarioContenidoOpcionesTxt").innerHTML = html2 
        })
}

function carnetTodos() {
    const URL = "http://localhost:8080/tipoCarnets/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                let select = document.getElementById("carnet");
                // let opcion = new Option(element.provincia,element.provincia);
                let opcion = document.createElement('option');
                opcion.value = element.idCarnet
                opcion.innerHTML = element.carnet
                select.appendChild(opcion);
            });
            // document.getElementById("usuarioContenidoOpcionesTxt").innerHTML = html2 
        })
}

function geograficoTodos() {
    const URL = "http://localhost:8080/ambitosGeograficos/";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                let select = document.getElementById("geografico");
                // let opcion = new Option(element.provincia,element.provincia);
                let opcion = document.createElement('option');
                opcion.value = element.idAmbito
                opcion.innerHTML = element.ambito
                select.appendChild(opcion);
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
                html += "       <img src='assets/img/empresas/" + fotoEmp + "' alt='' width='180px' height='100px'>";
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
                html += "   <div onclick='verTrabajadoresIns("+ element.idOferta +")'>Ver todos los trabajadores inscritos a esta oferta</div>";
            });
            document.querySelector("#boxOfertas").innerHTML = html;
        });

}
function verTrabajadoresIns(oferta){
    localStorage.setItem("oferta",oferta);

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
                html += "       <img src='assets/img/empresas/" + fotoEmp + "' alt='' width='180px' height='100px'>";
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
                html += "       <img src='assets/img/empresas/" + fotoEmp + "' alt='' width='180px' height='100px'>";
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

// publicar Ofertaç
function buscarProvincia(id) {
    const URL = "http://localhost:8080/provincia/" + id;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.json())
            .then((provincia) => { resolve(provincia); })
            .catch((error) => reject(error));
    });

}
function buscarAmbito(id) {
    const URL = "http://localhost:8080/ambito/" + id;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.json())
            .then((ambito) => { resolve(ambito); })
            .catch((error) => reject(error));
    });
}
function buscarCarnet(id) {
    const URL = "http://localhost:8080/carnet/" + id;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.json())
            .then((carnet) => { resolve(carnet); })
            .catch((error) => reject(error));
    });
}
function buscarEmpresa(cifv) {
    const URL = "http://localhost:8080/empresa/" + cifv;
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) => response.text())
            .then((empresa) => {
                if (empresa == "") {
                    resolve(null);
                } else {
                    empresa = JSON.parse(empresa)
                    console.log(empresa);
                    resolve(empresa);
                }
            })
            .catch((error) => reject(error));
    });
}

async function fPublicarOfertaNueva() {
    fechaActual = new Date();
    fechaActualD = fechaActual.getDate();
    fechaActualDia = fechaActualD.toString();
    if (fechaActualDia.length == 1) {
        fechaActualD = "0" + fechaActualD;
    }
    fechaActualM = fechaActual.getMonth() - 1;
    fechaActualMes = fechaActualM.toString();
    if (fechaActualMes.length == 1) {
        fechaActualM = "0" + fechaActualM;
    }
    fechaActualY = fechaActual.getFullYear();
    fechaPublicacion = fechaActualY + "-" + fechaActualM + "-" + fechaActualD;
    let idEmpresa = JSON.parse(localStorage.getItem("empresa"));
    console.log(idEmpresa);
    
    let idEmpresaV;
    try { idEmpresaV = await buscarEmpresa(idEmpresa); } catch (error) { throw new Error('Ha ocurrido un error'); }
    console.log(idEmpresaV);
    tituloOf = document.getElementById("tituloOf").value;
    fechCaducidad = document.getElementById("fechCaducidad").value;
    //provincia2 = document.getElementById("provincia2").value;
    let provincia2 = document.getElementById('provincia2').value;
    let provinciaV;
    try { provinciaV = await buscarProvincia(provincia2); } catch (error) { throw new Error('Ha ocurrido un error'); }
    localidad = document.getElementById("localidad").value;
    descripcionOfert = document.getElementById("descripcionOfert").value;
    tCandidato = document.getElementById("tCandidato").value;
    tContrato = document.getElementById("tContrato").value;
    let tipoCarnet = document.getElementById('carnet').value;
    let tipoCarnetV;
    try { tipoCarnetV = await buscarCarnet(tipoCarnet); } catch (error) { throw new Error('Ha ocurrido un error'); }
    //carnet = document.getElementById("carnet").value;
    //geografico = document.getElementById("geografico").value;
    let geografico = document.getElementById('geografico').value;
    let geograficoV;
    try { geograficoV = await buscarAmbito(geografico); } catch (error) { throw new Error('Ha ocurrido un error'); }

    const crearOferta = {
        idOferta: 0,
        descripcion: "dsadasdsad",
        experiencia: "No se requiere experiencia previa",
        fechaCaducidad: fechCaducidad,
        fechaPublicacion: fechaPublicacion,
        localidad: localidad,
        tipoCandidato: tCandidato,
        tipoContrato: tCandidato,
        tituloOferta: tituloOf,
        valoracion: "s",
        ambitoGeografico: geograficoV,
        empresa: idEmpresaV,
        provincia: provinciaV,
        tipoCarnet:tipoCarnetV
    }
    console.log(crearOferta);
    const URL = "http://localhost:8080/oferta/registro";
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(crearOferta)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });


}


async function fActualizarDatosEmpresa() {
    let bolean = true;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    password2 = document.getElementById("password2").value;
    contrasena = document.getElementById("password");
    contrasena2 = document.getElementById("password2");
    let idEmpresa = JSON.parse(localStorage.getItem("empresa"));
    let idEmpresaV;
    try { idEmpresaV = await buscarEmpresa(idEmpresa); } catch (error) { throw new Error('Ha ocurrido un error'); }
    idEmpresaV.email = email;

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
    if (bolean == true) {
        let password = md5(password2);
        try { idEmpresaV = await buscarEmpresa(idEmpresa); } catch (error) { throw new Error('Ha ocurrido un error'); }
        idEmpresaV.contrasena = password;
        let actEmpresa;
        try {
            actEmpresa = await actulizarDatosEmpresa(idEmpresaV);
            console.log(actEmpresa, idEmpresaV);
        } catch (error) {
                    throw new Error('Ha ocurrido un error');
                }
        }


}

function actulizarDatosEmpresa(empresa){
        return new Promise((resolve, reject) => {
            const URL = "http://localhost:8080/empresa/actualizar/";
            fetch(URL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(empresa)
            })
                .then((response) => response.json())
                .then((empresa) => { resolve(empresa); })
                .catch((error) => reject(error));;
        });
}

function fActualizarDatos() {

}
function fActualizarInformacion() {

}