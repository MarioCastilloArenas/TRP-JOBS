function fMostrarMisDatos(){
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'none';

}
function fMostrarMisInscripciones(){
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'none';
    
}
function fMostrarMisAlertas(){
    let fieldset = document.getElementById('usuarioContenido1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('usuarioContenido2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('usuarioContenido3');
    fieldset3.style.display = 'flex';
    
}
function fCerrarSesion(){
    
}


function fMostrarBasicos(){
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'flex';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    // let fieldset3 = document.getElementById('paso3');
    // fieldset3.style.display = 'flex';

}
function fMostrarProfesionales(){
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'flex';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'none';
    
}
function fMostrarExperiencia(){
    let fieldset = document.getElementById('paso1');
    fieldset.style.display = 'none';
    let fieldset2 = document.getElementById('paso2');
    fieldset2.style.display = 'none';
    let fieldset3 = document.getElementById('paso3');
    fieldset3.style.display = 'flex';
    
}

