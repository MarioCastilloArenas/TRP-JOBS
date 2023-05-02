document.addEventListener("DOMContentLoaded", () => {
    fLoginOrNot();
    
});
function fLoginOrNot(){
    if(!(JSON.parse(localStorage.getItem("usuario")) == null) && JSON.parse(localStorage.getItem("empresa")) == null){
        let html = "";
            html+= "<div id='sobreNosotros' onclick='fEnviarSobreNosotros();'> Sobre nosotros</div>";
            html+= "<div id='trabajadores' onclick='fEnviarIndexUsu()'> Trabajadores </div>";
            //html+= "<div id='trabajadores' onclick='enviarInicioTrabajadores();'> Trabajadores </div>";
            //html+= "<div id='empresas' onclick='enviarInicioEmpresas();'> Empresas </div>";
            html+= "<div id='navMenu'>";
            html+= "    <div class='btn-menu'>";
            html+= "    <label for='btn-menu'>";
            html+= "        <span class='material-symbols-outlined'>";
            html+= "            menu";
            html+= "        </span>";
            html+= "    </label>";
            html+= "    </div>";
            html+= "</div>";
        document.getElementById("boxInfo").innerHTML = html;
    }
    if(JSON.parse(localStorage.getItem("usuario")) == null && !(JSON.parse(localStorage.getItem("empresa")) == null)){
        let html = "";
            html+= "<div id='sobreNosotros' onclick='fEnviarSobreNosotros();'> Sobre nosotros</div>";
            html+= "<div id='trabajadores' onclick='fEnviarIndexEmp()'> Empresa </div>";
            //html+= "<div id='trabajadores' onclick='enviarInicioTrabajadores();'> Trabajadores </div>";
            //html+= "<div id='empresas' onclick='enviarInicioEmpresas();'> Empresas </div>";
            html+= "<div id='navMenu'>";
            html+= "    <div class='btn-menu'>";
            html+= "    <label for='btn-menu'>";
            html+= "        <span class='material-symbols-outlined'>";
            html+= "            menu";
            html+= "        </span>";
            html+= "    </label>";
            html+= "    </div>";
            html+= "</div>";
        document.getElementById("boxInfo").innerHTML = html;

    }
    if(JSON.parse(localStorage.getItem("usuario")) == null && JSON.parse(localStorage.getItem("empresa")) == null){
        let html = "";
            html+= "<div id='sobreNosotros' onclick='fEnviarSobreNosotros();'> Sobre nosotros</div>";
            //html+= "<div id='trabajadores' onclick='fEnviarIndexEmp()'> Empresa </div>";
            html+= "<div id='trabajadores' onclick='enviarInicioTrabajadores();'> Trabajadores </div>";
            html+= "<div id='empresas' onclick='enviarInicioEmpresas();'> Empresas </div>";
            html+= "<div id='navMenu'>";
            html+= "    <div class='btn-menu'>";
            html+= "    <label for='btn-menu'>";
            html+= "        <span class='material-symbols-outlined'>";
            html+= "            menu";
            html+= "        </span>";
            html+= "    </label>";
            html+= "    </div>";
            html+= "</div>";
        document.getElementById("boxInfo").innerHTML = html;

    }
}
function fEnviarIndexUsu(){
    document.location = "IndexTrabajador.html";
}
function fEnviarIndexEmp(){
    document.location = "IndexEmpresa.html";
}
function fVolverIndex(){
    document.location = "index.html";
}
