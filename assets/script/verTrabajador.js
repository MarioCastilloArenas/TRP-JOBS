document.addEventListener("DOMContentLoaded", () => {
    let dni = localStorage.getItem('dni');
    fverTrabajador(dni)
    //fverTrabajador("12345678A")
});

function fverTrabajador(dniv) {

    let url = "http://localhost:8083/trabajador/" + dniv;
    fetch(url)
        .then(res => res.json())
        .then(trabajador => {
            console.log(trabajador)
            let fotoCurr = document.getElementById("fotoCurr");
            let img = document.createElement("img");
            img.src = "assets/img/trabajadores/" + trabajador.fotoTrabajador;
            fotoCurr.appendChild(img);
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

            //         let url = "http://localhost:8083/trabajador/datosProfesionales/" + dniv;
            // fetch(url)
            //     .then(res => res.json())
            //     .then(datosTrabajador => {
            //         console.log(datosTrabajador)

            let url = "http://localhost:8083/trabajador/datosProfesionales/" + dniv;
            fetch(url)
                .then(res => res.json())
                .then(datosTrabajador => {
                    console.log(datosTrabajador)

                    let autonomoID = document.getElementById("autonomoID");
                    let asalariadoID = document.getElementById("asalariadoID");

                    if (datosTrabajador.tipoProfesion == "Asalariado")
                        autonomoID.className = "autonomo";
                    else {
                        asalariadoID.className = "autonomo";
                    }

                    let siID = document.getElementById("siID");
                    let noID = document.getElementById("noID");

                    if (datosTrabajador.tarjetaTacografo == "disable")
                        siID.className = "enabled";
                    else {
                        noID.className = "enabled";
                    }


                    let sicID = document.getElementById("sicID");
                    let nocID = document.getElementById("nocID");

                    if (datosTrabajador.certificadoCap == "disable")
                        sicID.className = "enabled";
                    else {
                        nocID.className = "enabled";
                    }

                    let simID = document.getElementById("simID");
                    let nomID = document.getElementById("nomID");

                    if (datosTrabajador.certificadoCap == "disable")
                        simID.className = "enabled";
                    else {
                        nomID.className = "enabled";
                    }

                    switch (datosTrabajador.tipoCarnet.idCarnet) {
                        case 1:
                            document.getElementById("numero1").className = "enabled";
                            break;
                        case 2:
                            document.getElementById("numero2").className = "enabled";
                            break;
                        case 3:
                            document.getElementById("numero3").className = "enabled";
                            break;
                        case 4:
                            document.getElementById("numero4").className = "enabled";
                            break;
                        case 5:
                            document.getElementById("numero5").className = "enabled";
                            break;
                        case 6:
                            document.getElementById("numero6").className = "enabled";
                            break;
                        case 7:
                            document.getElementById("numero7").className = "enabled";
                            break;
                        case 8:
                            document.getElementById("numero8").className = "enabled";
                            break;

                    }

                    let pais = document.getElementById("paisCarnet");
                    pais.innerHTML = datosTrabajador.paisCarnet

                })
        })

    let url2 = "http://localhost:8083/trabajador/experiencias/" + dniv;
    fetch(url2)
        .then(res => res.json())
        .then(experiencia => {
            cajaExp = document.getElementById("caja")

            for (const exp of experiencia) {
                let div = document.createElement("div")
                let html = '<div class="exp">' + '<h2>' + exp.nombreEmpresa + '</h2>' + '</div>';
                // html += '<div class="exp">' + '<h2>' + exp.nombreEmpresa + '</h2>' + '</div>'
                html += '<div class="ejemplo">';
                html += '<div class="tiempoTr">';
                html += '<h3>Tiempo Trabajado</h3>';
                html += '<p>' + exp.duracion + '</p>';
                html += '</div>';
                html += '<div class="miCarnet">';
                html += '<h3>Mi carnet más usado</h3>';
                html += '<p>' + exp.tipoCarnet.carnet + '</p>';
                html += '</div>';
                html += '<div class="tipoEspecialidad">';
                html += '<h3>Tipo de especialidad</h3>';
                html += '<p>' + exp.tipoEspecialidad.especialidad + '</p>';
                html += '</div>';
                html += '</div>';
                console.log(exp)
                div.innerHTML = html;
                cajaExp.appendChild(div);
            }
        })
}

