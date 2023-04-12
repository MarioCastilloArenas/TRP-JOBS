document.addEventListener("DOMContentLoaded", () => {
    fverEmpresa("A28985992")
});

function fverEmpresa(cifv) {

    let url = "http://localhost:8080/empresa/cif=" + cifv;
    fetch(url)
        .then(res => res.json())
        .then(empresa => {
            console.log(empresa)
            let logoEmpresa = document.getElementById("logoEmpresa");
            let img = document.createElement("img");
            img.src="assets/img/empresas/"+empresa.logo
            logoEmpresa.appendChild(img);

            let tipoEmpresaM = document.getElementById("tipoEmpresaM");
            tipoEmpresaM.innerHTML = empresa.tipoActividadEmpresarial.actividad
            let nombreEmpresaN = document.getElementById("nombreEmpresaN");
            nombreEmpresaN.innerHTML = empresa.nombreComercial
            let direccionEmpresaD = document.getElementById("direccionEmpresaD");
            direccionEmpresaD.innerHTML = empresa.direccion
            let provinciaP = document.getElementById("provinciaP");
            provinciaP.innerHTML = empresa.provincia.provincia
            let cp = document.getElementById("cp");
            cp.innerHTML = empresa.codigoPostal
            let webSiteW = document.getElementById("webSiteW");
            webSiteW.innerHTML = empresa.sitioWeb
            let tlf = document.getElementById("tlf");
            tlf.innerHTML = empresa.telefono
            let descripcionD = document.getElementById("descripcionD");
            descripcionD.innerHTML = empresa.descripcionEmpresa
            

        })

    // const URL = "http://localhost:8080/oferta/noCaducadas";
    // fetch(URL)
    // .then((response) => response.json())
    // .then((oferta) => {
    //     let div = document.getElementById('boxOfertas')
    //     for (const key of oferta) {
    //     let oferta = document.createElement('div');
    //         oferta.className = 'oferta'
    //         key.id = key.idOferta;
    //         let html ='<div class="datos_oferta"><img src="assets/img/empresas/'+key.empresa.logo +'" alt="" width="180px" height="100px"></div>'
    //         html+='<div class="datos_oferta">'
    //         html+='<div class="puesto"><p>'+key.descripcion+'</p></div>'
    //         html+='<div class="nombreEmpresa"><p>'+ key.empresa.nombreComercial+'</p></div></div>'
    //         html+='<div class="datos_oferta">'
    //         html+='<div class="mapa"><i class="bx bx-location-plus"></i><br><p>('+key.provincia.provincia +')</p></div>' 
    //         html+='<div class="caducidad"><i class="bx bx-calendar"></i><br><p>'+key.fechaPublicacion+'</p></div></div>'
    //         oferta.innerHTML= html;
    //         div.appendChild(oferta)  
    //     }
    // });

}