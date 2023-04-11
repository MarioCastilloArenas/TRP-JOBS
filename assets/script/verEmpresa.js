function verTrabajador(){

    let url = "";

    section = document.getElementById("section");
    fetch(url)
    .then(res => res.json())
    .then(data => {       
        console.log(data)
       

        section.innerHTML+=
        '<div id="paquete">' 
            +'<div id="paqueteEmpresa">'
            +   '<div id="logoEmpresa">' + data.LOGO +'</div>'
            +   '<div id="tipoEmpresa">'+'<div> Tipo de Actividad: </div>'+ '<div>'+data.TIPODEACTIVIDAD+'</div>'
            +   '<div id="nombreEmpresa">'+'<div> Nombre: </div>'+ '<div>'+data.NOMBRE+'</div>'
            +   '<div id="direccionEmpresa">'+'<div> Dirección: </div>'+ '<div>'+data.DIRECCION+'</div>'
            +   '<div id="provinciaEmpresa">'+'<div> Provincia:   </div>'+ '<div>'+data.PROVINCIA+'</div>'
            +   '<div id="codigoPostal">'+'<div>  Codigo Postal:  </div>'+ '<div>'+data.CODGIO_POSTAL+'</div>'
            +   '<div id="webSite">'+'<div>  Sitio web:  </div>'+ '<div>'+data.WEBSITE+'</div>'
            +   '<div id="telefono">'+'<div>  tlf:  </div>'+ '<div>'+data.TELEFONO+'</div>'
            +   '<div id="listadoDeOfertas">'+'</div>'
            +'</div>'
        +'</div>'
        
    })
}