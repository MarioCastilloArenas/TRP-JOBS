let ubicacionPrincipal = window.pageYOffset;
window.onscroll = function(){
    let Desplazamiento_Actual = window.pageYOffset;

    if(ubicacionPrincipal >= Desplazamiento_Actual){
        this.document.getElementById('navHeader').style.top = '0';
    } else {
        this.document.getElementById('navHeader').style.top = '-100px';
    }
    ubicacionPrincipal = Desplazamiento_Actual;
    // console.log(ubicacionPrincipal);
    this.document.getElementById('container_menu').style.top = Desplazamiento_Actual;
}
// function disableScroll(){
//     var x = window.scrollX;
//     var y = window.scrollY;
//     window.onscroll = function(){
//         window.scrollTo(x,y)
//     };
// }
function enableScroll(){
    window.onscroll = null;
}