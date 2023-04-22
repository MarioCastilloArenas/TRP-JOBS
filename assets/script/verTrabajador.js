document.addEventListener("DOMContentLoaded", () => {
    let dni = localStorage.getItem('dni');
    fverTrabajador(dni)
    //fverTrabajador("12345678A")
});

function fverTrabajador(dniv) {

    let url = "http://localhost:8080/trabajador/" + dniv;
    fetch(url)
        .then(res => res.json())
        .then(trabajador => {
            console.log(trabajador)
            let fotoCurr = document.getElementById("fotoCurr");
            let img = document.createElement("img");
            img.src="assets/img/trabajadores/"+trabajador.fotoTrabajador;
            fotoCurr.appendChild(img);
            let nombre2 = document.getElementById("nombre2");
            nombre2.innerHTML = trabajador.nombre
            let apellido2 = document.getElementById("apellido2");
            apellido2.innerHTML = trabajador.apellidos
            let nombre = document.getElementById("nombre");
            nombre.innerHTML = trabajador.nombre
            let apellido = document.getElementById("apellido");
            apellido.innerHTML = trabajador.apellidos
            let correo = document.getElementById("correo");
            correo.innerHTML = trabajador.email
            let numeroTLF = document.getElementById("numeroTLF");
            numeroTLF.innerHTML = trabajador.telefono
            let provincia = document.getElementById("provincia");
            provincia.innerHTML = trabajador.provincia.provincia
            let txtPresentacion = document.getElementById("txtPresentacion");
            txtPresentacion.innerHTML = trabajador.presentacion
             
    let url = "http://localhost:8080/trabajador/datosProfesionales/" + dniv;
    fetch(url)
        .then(res => res.json())
        .then(datosTrabajador => {
            console.log(datosTrabajador)

            let autonomoID = document.getElementById("autonomoID");
            let asalariadoID = document.getElementById("asalariadoID");

            if (datosTrabajador.tipoProfesion == "Asalariado")
                autonomoID.className="autonomo";
            else{
                asalariadoID.className="autonomo";
            }

            let siID = document.getElementById("siID");
            let noID = document.getElementById("noID");

            if (datosTrabajador.tarjetaTacografo == "disable")
                siID.className="enabled";
            else{
                noID.className="enabled";
            }

            
            let sicID = document.getElementById("sicID");
            let nocID = document.getElementById("nocID");

            if (datosTrabajador.certificadoCap == "disable")
            sicID.className="enabled";
            else{
            nocID.className="enabled";
            }

            let simID = document.getElementById("simID");
            let nomID = document.getElementById("nomID");

            if (datosTrabajador.certificadoCap == "disable")
            simID.className="enabled";
            else{
                nomID.className="enabled";
            }

        })
    })


    
}