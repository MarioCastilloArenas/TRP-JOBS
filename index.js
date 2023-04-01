function enviarInicioTrabajadores(){
    document.location = "loginUsuario.html";
}
function enviarInicioEmpresas(){
    document.location = "loginEmpresa.html";
    let html = "";
        html += "<div>Error vuelve a intentarlo</div>";
    document.getElementById("loginUsuario").innerHTML = html;
    
    // var x = document.getElementById("login");
    // var y = document.getElementById("registrar");
    // var z = document.getElementById("opcion");
    // x.style.left = "-400px";
    // y.style.left = "50px";
    // z.style.left = "120px";
    // function registrar_btn(){
    //     x.style.left = "-400px";
    //     y.style.left = "50px";
    //     z.style.left = "120px";
    // }
    // document.getElementById("registrar").style.left = "50";
    // #login{
    //     left: 50px;
    //     top: 150px;
    // }
    // #registrar{
    //     top: 150px;
    //     left: 450px;
    // }
}