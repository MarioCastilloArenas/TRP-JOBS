document.addEventListener("DOMContentLoaded", () => {
    var URLactual = window.location.pathname;
    if(URLactual == '/empresaFormulario.html'){
        provincias();
        tipoActividadEmpresarial();
    }

});
/* ------ METODOS FORMULARIO EMPRESAAAAA----------- */
function provincias (){
    const URL = "http://localhost:8080/provincias/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let provincias=document.getElementById('provincia');
        data.forEach(element => { 
            let opcion = document.createElement('option')
            opcion.value = element.idProvincia
            opcion.innerHTML = element.provincia
            provincias.appendChild(opcion);
        });
    })
}
function tipoActividadEmpresarial (){
    const URL = "http://localhost:8080/TipoActividadEmpresa/";
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        let TipoActividadEmpresas=document.getElementById('TipoActividadEmpresa');
        data.forEach(element => { 
            let opcion = document.createElement('option')
            opcion.value = element.idActividad
            opcion.innerHTML = element.actividad
            TipoActividadEmpresas.appendChild(opcion);
        });
    })
}

async function formEmpresa_log(){
    let fieldset = document.getElementById('paso1');
    let email = document.getElementById('email');
    let contraseña = document.getElementById('password');
    let contraseña2 = document.getElementById('password2');
    let emailValor = email.value.trim();
    let contraseñaValor = contraseña.value.trim();
    let contraseña2Valor = contraseña2.value.trim();
    let bolean = true; 

    if (emailValor === '') {
        enviarError(email,"Rellene este campo");
        bolean = false;   
    } else if (!correcionEmail(emailValor)) { 
        enviarError(email, 'Email invalido');
    } else {
        try {
            let empresabb = await buscarExistenciaEmpresa(emailValor.toLowerCase());
            if (empresabb == null) {
                funciona(email);
            }else {
                enviarError(email, 'Email Existente');
                document.getElementById('mensaje1').innerHTML = 'Esta empresa ya forma parte de nuestro equipo, prueba a iniciar sesion.'
                bolean = false;
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
    }
    
    if (contraseñaValor === '') {
        enviarError(contraseña,"Rellene este campo"); 
        bolean = false;  
    } else if (contraseñaValor.length > 8 ) { 
        bolean = false;  
        enviarError(contraseña, 'No debe tener más de 8 caracteres');
    } else {
        funciona(contraseña);
    }

    if (contraseña2Valor === '') {
        enviarError(contraseña2,"Rellene este campo"); 
        bolean = false;  
    } else if (contraseñaValor !== contraseña2Valor) { 
        bolean = false;  
        enviarError(contraseña2, 'Las contraseñas no coinciden');
    } else {
        funciona(contraseña2);
    }
    if (bolean==true) {
        let password = md5(contraseña2Valor);
        let empresa = {
            codigoPostal: 00000,
            contrasena: password,
            descripcionEmpresa: "",
            direccion: "",
            email: emailValor,
            logo: null,
            nombreComercial: "",
            nombreFiscal: "",   
            provincia: {
                idProvincia: 0,
                provincia: ""
            },
            sitioWeb: "",
            telefono: 000000000,
            tipoActividadEmpresarial: {
                idActividad: 0,
                actividad: ""
            },
            cif: ""
        }
        localStorage.setItem('empresa',JSON.stringify(empresa))
        fieldset.className = 'fieldset';
        let fieldset2 = document.getElementById('paso2');
        fieldset2.classList = 'fieldset activo';
        document.getElementById("pasoAColor1").style.color="#1a9e00";
        document.getElementById("pasoAColor2").style.color="#ffb11a";
    }
} 

async function formEmpresa_informacionProfesional(){
    let fieldset = document.getElementById('paso2');
    let cif = document.getElementById('cif');
    let nomFiscal = document.getElementById('nomFiscal');
    let direccion = document.getElementById('direccion');
    let codigoPostal = document.getElementById('codigoPostal');
    let TipoActividadEmpresa = document.getElementById('TipoActividadEmpresa').value;
    let provincia = document.getElementById('provincia').value;
    let cifValor = cif.value.trim();
    let nomFiscalValor = nomFiscal.value.trim();
    let direccionValor = direccion.value.trim();
    let codigoPostalValor = codigoPostal.value.trim();
    let bolean = true; 
    
    if (cifValor === '') {
        enviarError(cif,"Rellene este campo");
        bolean = false;   
    } else if (!validarCIF(cifValor)) { 
        enviarError(cif, 'Cif invalido');
    } else {
        try {
            let empresabb = await buscarEmpresa(cifValor);
            console.log(empresabb);
            if (empresabb == null ) {
                funciona(cif);
            }else {
                enviarError(cif, 'Cif existente');
                document.getElementById('mensaje2').innerHTML = 'Esta empresa ya forma parte de nuestro equipo, prueba a iniciar sesion.'
                bolean = false;
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
    }

    if (nomFiscalValor === '') {
        enviarError(nomFiscal,"Rellene este campo");
        bolean = false;   
    }else if (nomFiscalValor.length>=50) {
        enviarError(nomFiscal,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(nomFiscal);
    }
    
    if (direccionValor === '') {
        enviarError(direccion,"Rellene este campo");
        bolean = false;   
    }else if (direccionValor.length>=50) {
        enviarError(nomFiscal,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(direccion);
    }
    let provinciaL;
    try {provinciaL = await buscarProvincia(provincia);} catch (error) {throw new Error('Ha ocurrido un error');}

    if (codigoPostalValor === '') {
        enviarError(codigoPostal,"Rellene este campo");
        bolean = false;   
    } else if (!validarCodigoPostal(codigoPostalValor,provincia)) { 
        enviarError(codigoPostal, 'Codigo Postal invalido');
    } else {
        funciona(codigoPostal);
    }

    let TipoActividadEmpresaL;
    try {TipoActividadEmpresaL = await buscarTipoActividadEmpresa(TipoActividadEmpresa);} catch (error) {throw new Error('Ha ocurrido un error');}

    if (bolean==true) {
        let empresa = JSON.parse(localStorage.getItem('empresa'));
        empresa.cif = cifValor;
        empresa.codigoPostal = codigoPostalValor;
        empresa.direccion = direccionValor;
        empresa.nombreFiscal = nomFiscalValor;
        empresa.provincia = provinciaL;
        empresa.tipoActividadEmpresarial = TipoActividadEmpresaL;
        localStorage.setItem('empresa',JSON.stringify(empresa));
        fieldset.className = 'fieldset';
        let fieldset3 = document.getElementById('paso3');
        fieldset3.classList = 'fieldset activo'
        localStorage.removeItem('TipoActividadEmpresarial')
        localStorage.removeItem('provincia')
        document.getElementById("pasoAColor1").style.color="#1a9e00";
        document.getElementById("pasoAColor2").style.color="#1a9e00";
        document.getElementById("pasoAColor3").style.color="#ffb11a";
        
    } 
    

}

async function formEmpresa_webEmpresarial(){
    let nomComercial = document.getElementById('nomComercial');
    let nomComercialValor = nomComercial.value.trim();
    let descripcion = document.getElementById('descripcion');
    let descripcionValor = descripcion.value.trim();
    let sitioWeb = document.getElementById('sitioWeb');
    let sitioWebValor = sitioWeb.value.trim();
    let telefono = document.getElementById('telefono');
    let telefonoValor = telefono.value.trim();
    let bolean = true;

    if (nomComercialValor === '') {
        enviarError(nomComercial,"Rellene este campo");
        bolean = false;   
    }else if (nomComercialValor.length>=50 || nomComercialValor.length < 3) {
        enviarError(nomComercial,"El nombre comercial no es valido");
        bolean = false; 
    }else{
        funciona(nomComercial);
    }

    if (descripcionValor === '') {
        enviarError(descripcion,"Rellene este campo");
        bolean = false;   
    }else if (descripcionValor.length>=1500 || descripcionValor.length <= 10) {
        enviarError(descripcion,"Minimo 10 caracteres máximo 1500 caracteres.");
        bolean = false; 
    }else{
        funciona(descripcion);
    }

    if (sitioWebValor === '') {
        enviarError(sitioWeb,"Rellene este campo");
        bolean = false;   
    }else if (!esSitioWeb(sitioWebValor)) {
        enviarError(sitioWeb,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(sitioWeb);
    }

    if (telefonoValor === '') {
        enviarError(telefono,"Rellene este campo");
        bolean = false;   
    }else if (comprobarTelefono(telefonoValor)) {
        funciona(telefono);
    }else{
        enviarError(telefono,"No puede contener caracateres, solo números");
        bolean = false; 
    }

    if (bolean==true) {
        let empresa = JSON.parse(localStorage.getItem('empresa'));
        empresa.descripcionEmpresa=descripcionValor;
        empresa.nombreComercial = nomComercialValor;
        empresa.sitioWeb = sitioWebValor;
        empresa.telefono = telefonoValor;
        localStorage.setItem('empresa',JSON.stringify(empresa))
        adddbddEmpresa();
        let addEmpresa;
        try {
            addEmpresa = await adddbddEmpresa();
            console.log(addEmpresa,empresa);
            if(addEmpresa.cif == null){
                document.getElementById('mensaje3').innerHTML = '¡Ups, ya existe un usuario con su cuenta, pruebe iniciar sesion!'
            } else {
                let fieldset3 = document.getElementById('paso3');
                let fieldset4 = document.getElementById('paso4');
                fieldset3.className = 'fieldset';
                fieldset4.classList = 'fieldset activo'
                document.getElementById("pasoAColor1").style.color="#1a9e00";
                document.getElementById("pasoAColor2").style.color="#1a9e00";
                document.getElementById("pasoAColor3").style.color="#1a9e00";
                document.getElementById("pasoAColor4").style.color="#1a9e00";
                document.getElementById('mensaje4').innerHTML = '¡Estamos felices de que ya forma parte de nuestro equipo!'
                document.getElementById('NombreEmpresa').innerHTML = empresa.nomComercial;;
                document.getElementById('actividadEmpresa').innerHTML = empresa.actividadEmpresa.actividad;
                document.getElementById('infoEmpresa').innerHTML = empresa.descripcionEmpresa;
                document.getElementById('provinciaEmpresa').innerHTML = empresa.provincia.provincia;
                document.getElementById('sitioWebEmpresa').innerHTML = empresa.sitioWeb;
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
    } 

}

function adddbddEmpresa() {
    let empresa = JSON.parse(localStorage.getItem('empresa'));
    return new Promise((resolve, reject) => {
        const URL = "http://localhost:8080/empresa/registro/";
        fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(empresa)
        })
        .then((response) => response.json())
        .then((empresa) => {resolve(empresa);})
        .catch((error) => reject(error));;
    });
}

function addLogo(){
    let logo = document.getElementById('logo');
    /******************
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
    */
}


/* ------ METODOS FORMULARIO TRABAJADOR TRANSPORTISTA----------- */
async function formTrabajador_log(){
    let fieldset = document.getElementById('paso1');
    let email = document.getElementById('email');
    let contraseña = document.getElementById('password');
    let contraseña2 = document.getElementById('password2');
    let emailValor = email.value.trim();
    let contraseñaValor = contraseña.value.trim();
    let contraseña2Valor = contraseña2.value.trim();
    let bolean = true; 

    if (emailValor === '') {
        enviarError(email,"Rellene este campo");
        bolean = false;   
    } else if (!correcionEmail(emailValor)) { 
        enviarError(email, 'Email invalido');
    } else {
        try {
            let empresabb = await buscarExistenciaTrabajador(emailValor.toLowerCase());
            if (empresabb == null) {
                funciona(email);
            }else {
                enviarError(email, 'Email Existente');
                document.getElementById('mensaje1').innerHTML = 'Esta empresa ya forma parte de nuestro equipo, prueba a iniciar sesion.'
                bolean = false;
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
    }
    
    if (contraseñaValor === '') {
        enviarError(contraseña,"Rellene este campo"); 
        bolean = false;  
    } else if (contraseñaValor.length > 8 ) { 
        bolean = false;  
        enviarError(contraseña, 'No debe tener más de 8 caracteres');
    } else {
        funciona(contraseña);
    }

    if (contraseña2Valor === '') {
        enviarError(contraseña2,"Rellene este campo"); 
        bolean = false;  
    } else if (contraseñaValor !== contraseña2Valor) { 
        bolean = false;  
        enviarError(contraseña2, 'Las contraseñas no coinciden');
    } else {
        funciona(contraseña2);
    }
    if (bolean==true) {
        let password = md5(contraseña2Valor);
        let transportista = {
            dni: null,
            apellidos: null,
            codigoPostal: 0,
            contrasena: password,
            email: emailValor,
            fechaNacimiento: null,
            fotoTrabajador: null,
            nacionalidad: null,
            nombre: null,
            presentacion: null,
            telefono: 0,
            provincia: {
                idProvincia: 0,
                provincia: ""
            }
        }

        localStorage.setItem('transportista',JSON.stringify(transportista))
        fieldset.className = 'fieldset';
        let fieldset2 = document.getElementById('paso2');
        fieldset2.classList = 'fieldset activo';
        document.getElementById("pasoAColor1").style.color="#1a9e00";
        document.getElementById("pasoAColor2").style.color="#ffb11a";
    }
} 
async function formTrabajador_informacionProfesional(){
    let fieldset = document.getElementById('paso2');
    let dni = document.getElementById('dni');
    let dniValor = dni.value.trim();
    if (dniValor === '') {
        enviarError(dni,"Rellene este campo");
        bolean = false;   
    } else if (!validarDNI(dniValor)) { 
        enviarError(dni, 'DNI invalido');
    } else {
        try {
            let trabajadorbb = await buscarTrabajador(dniValor);
            console.log(trabajadorbb);
            if (trabajadorbb == null ) {
                funciona(dni);
            }else {
                enviarError(dni, 'DNI invalido');
                document.getElementById('mensaje2').innerHTML = 'Prueba a iniciar sesion.'
                bolean = false;
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
    }

    let nombre = document.getElementById('nombre');
    let nombreValor = nombre.value.trim();
    if (nombreValor === '') {
        enviarError(nombre,"Rellene este campo");
        bolean = false;   
    }else if (nombreValor.length>=50) {
        enviarError(nombre,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(nombre);
    }
    let apellidos = document.getElementById('apellidos');
    let apellidosValor = apellidos.value.trim();
    if (apellidosValor === '') {
        enviarError(apellidos,"Rellene este campo");
        bolean = false;   
    }else if (apellidosValor.length>=50) {
        enviarError(apellidos,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(apellidos);
    }
    let fechaNacimiento = document.getElementById('fechaNacimiento')
    let fechaNacimientoValor = apellidos.value.trim();
    if(calcularEdad(fechaNacimientoValor) >= 18){
        funciona(fechaNacimiento);
    }else{
        bolean = false;  
        enviarError(fechaNacimiento, 'Debes ser mayor de edad para registrarte');
    }

    let nacionalidad = document.getElementById('nacionalidad');
    let nacionalidadValor = nacionalidad.value.trim();
    if (nacionalidadValor === '') {
        enviarError(nacionalidad,"Rellene este campo");
        bolean = false;   
    }else if (nacionalidadValor.length>=50) {
        enviarError(nacionalidad,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(nacionalidad);
    }  
    let provincia = document.getElementById('provincia').value;
    let provinciaL;
    try {provinciaL = await buscarProvincia(provincia);} catch (error) {throw new Error('Ha ocurrido un error');}

    let codigoPostal = document.getElementById('codigoPostal');
    let codigoPostalValor = codigoPostal.value.trim();
    if (codigoPostalValor === '') {
        enviarError(codigoPostal,"Rellene este campo");
        bolean = false;   
    } else if (!validarCodigoPostal(codigoPostalValor,provincia)) { 
        enviarError(codigoPostal, 'Codigo Postal invalido');
    } else {
        funciona(codigoPostal);
    }

    let presentacion = document.getElementById('presentacion');
    let presentacionValor = presentacion.value.trim();
    if (presentacionValor === '') {
        enviarError(presentacion,"Rellene este campo");
        bolean = false;   
    }else if (presentacionValor.length>=500) {
        enviarError(presentacion,"No puede tener tantos caracateres");
        bolean = false; 
    }else{
        funciona(presentacion);
    }  

    if (bolean==true) {
        let trabajador = JSON.parse(localStorage.getItem('trabajador'));
        trabajador.dni = dniValor;
        trabajador.nombre = nombreValor;
        trabajador.fechaNacimiento = fechaNacimientoValor;
        trabajador.nacionalidad = nacionalidadValor;
        trabajador.provincia = provinciaL;
        trabajador.codigoPostal = codigoPostalValor;
        trabajador.presentacion = presentacionValor;
        localStorage.setItem('transportista',JSON.stringify(trabajador));
        addbbTransportista();
        let addbbTransportista;
        try {
            addbbTransportista = await addbbTransportista();
            console.log(addbbTransportista,transportista);
            if(addbbTransportista.dni == null){
                document.getElementById('mensaje3').innerHTML = '¡Ups, ya existe un usuario con su cuenta, pruebe iniciar sesion!'
            } else {
            fieldset.className = 'fieldset';
            let fieldset3 = document.getElementById('paso3');
            fieldset3.classList = 'fieldset activo'
            localStorage.removeItem('TipoActividadEmpresarial')
            localStorage.removeItem('provincia')
            document.getElementById("pasoAColor1").style.color="#1a9e00";
            document.getElementById("pasoAColor2").style.color="#1a9e00";
            document.getElementById("pasoAColor3").style.color="#ffb11a";
            }
        } catch (error) {
            throw new Error('Ha ocurrido un error');
        }
        
    } 
    

}


function addbbTransportista() {
    let transportista = JSON.parse(localStorage.getItem('transportista'));
    return new Promise((resolve, reject) => {
        const URL = "http://localhost:8080/transportista/registro/";
        fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(transportista)
        })
        .then((response) => response.json())
        .then((transportista) => {resolve(transportista);})
        .catch((error) => reject(error));;
    });
}
/* ------ METODOS DE COMPROBACIÓN ----------- */

function enviarError(input, mensaje) {
    //cogemos el input que sale el error
    let formControl = input.parentElement;
    // buscamos la i del error 
    let error = formControl.querySelector('#error');
    // cambiamos el estilo a visible para que se vea 
    
    error.style.color = 'red'
    error.style.visibility = 'visible';
    let inputF = formControl.querySelector('input');
    inputF.style.borderColor = 'red';
    let small = formControl.querySelector('small');
    small.style.color = 'red';
    small.style.visibility = 'visible';
    small.innerHTML = mensaje;
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
function correcionEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function validarCIF(cif) {
    cif = cif.toUpperCase();
    if (!/^[A-Z]\d{7}[A-J1-9]$/.test(cif)) {
    return false;
    }
    var letras = 'ABCDEFGHJKLMNPQRSUVW';
    var letra = cif.charAt(0);
    var suma = 0;
    var resto;
    if (letra.charCodeAt(0) < 65 || letra.charCodeAt(0) > 90) {
    return false;
    }
    var num = cif.substr(1, 7);
    for (var i = 0; i < num.length; i++) {
    var digito = parseInt(num.charAt(i));
    if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
            digito -= 9;
        }
    }
    suma += digito;
    }
    resto = (10 - (suma % 10)) % 10;
    if (letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 73) {
        return resto === parseInt(cif.charAt(8));
    } else if (letras.indexOf(letra) !== -1) {
        return letra === letras.charAt(resto);
    } else {
        return false;
    }
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

function comprobarTelefono(telefono) {
    const regex = /^[6-9]\d{8}$/; // Expresión regular para el formato de números españoles de 9 dígitos
    return regex.test(telefono); // Devuelve true si el teléfono cumple el formato y false si no lo cumple
}

function esSitioWeb(cadena) {
    const regex = /^www\..+\.[a-z]{2,}$/i;
    return regex.test(cadena);
}

function validarDNI(dni) {
    var numero;
    var letra;
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    
    dni = dni.toUpperCase();  // Convertir a mayúsculas
    
    if (/^\d{8}[a-zA-Z]$/.test(dni)) {  // Verificar formato correcto
      numero = dni.substr(0, dni.length-1);  // Obtener los dígitos del DNI
      letra = dni.substr(-1);  // Obtener la letra del DNI
      numero = numero % 23;  // Calcular letra correspondiente al número del DNI
        if (letras.charAt(numero) === letra) {  // Verificar si la letra es correcta
            return true;  // DNI válido
        } else {
            return false;  // DNI inválido
        }
    } else {
      return false;  // DNI inválido
    }
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
/*------- FUNCION BUSQUEDA EN LA BBDD ------ */
function buscarProvincia(id){   
    const URL = "http://localhost:8080/Provincia/"+ id;
    return new Promise((resolve, reject) => {
        fetch(URL)
        .then((response) => response.json())
        .then((provincia) => {resolve(provincia);})
        .catch((error) => reject(error));
    });

}

/* EMPRESA  */
function buscarTipoActividadEmpresa(id) {
    const URL = "http://localhost:8080/TipoActividadEmpresarial/"+ id;
    return new Promise((resolve, reject) => {
        fetch(URL)
        .then((response) => response.json())
        .then((TipoActividadEmpresarial) => {resolve(TipoActividadEmpresarial);})
        .catch((error) => reject(error));
    });
}
function buscarExistenciaEmpresa(emailv) {

    const URL = "http://localhost:8080/empresa/email=" + emailv;
    return new Promise((resolve, reject) => {
        fetch(URL)
        .then((response) => response.json())
        .then((empresa) => {
            if (empresa.email === emailv) {
            resolve(empresa.email);
            } else {
            resolve(null);
            }
        })
        .catch((error) => reject(error));
    });
}
function buscarEmpresa(cifv) {
    const URL = "http://localhost:8080/empresa/cif="+cifv;
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
function buscarExistenciaTrabajador(emailv) {

    const URL = "http://localhost:8080/transportista/email=" + emailv;
    return new Promise((resolve, reject) => {
        fetch(URL)
        .then((response) => response.json())
        .then((empresa) => {
            if (empresa.email === emailv) {
            resolve(empresa.email);
            } else {
            resolve(null);
            }
        })
        .catch((error) => reject(error));
    });
}
function buscarTrabajador(dniv) {
    
    const URL = "http://localhost:8080/transportista/dni="+dniv;
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

/* TRABAJADOR  */
/* ---------- SEGURIDAD ----------- */
!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);
//# sourceMappingURL=md5.min.js.map}