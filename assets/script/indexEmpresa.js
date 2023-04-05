// Div contenido

function fMostrarCuenta(){
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';
}
function fMostrarDatos(){
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
function fMostrarInformacion(){
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'flex';
}

// Navegador

function fMostrarMisDatos(){
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'none';

}
function fMostrarMisOfertas(){
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'none';
    
}
function fPublicarOferta(){
    let fieldset = document.getElementById('empresaContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('empresaContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('empresaContenido3');
    fieldset3.style.display = 'flex';
    
}
function fCerrarSesion(){
    
}

// div class:empresaContenidoOpcionesBtn;
function fMostrarTodas(){

}
function fMostrarPendientes(){

}
function fMostrarFinalizadas(){

}