document.addEventListener("DOMContentLoaded", () => {
  
});


function enviarInicioTrabajadores(){
    if(JSON.parse(localStorage.getItem("usuario")) == null){
        document.location = "loginUsuario.html";
    } else{
        document.location = "IndexTrabajador.html"; 
    }
}
function enviarInicioEmpresas(){
    document.location = "loginEmpresa.html";
}
function fEnviarSobreNosotros(){
    document.location = "sobreNosotros.html";   
}
function fverOferta(){
    window.location.href = "verOferta.html";
}

function GoIndex(){
    window.location.href = "index.html";
}

function goOferta(){
    window.location = "#boxOfertas";
}