const slider = document.querySelector(".sliderAnimate");

let maxSliderLeft = slider.scrollWidth - slider.clientWidth;
let intervalo = null;
let step = 1;

const start = () => {
    intervalo = setInterval( function() {
        slider.scrollLeft =  slider.scrollLeft + step;
        if(slider.scrollLeft === maxSliderLeft){
            step = step * -1;
        } else if(slider.scrollLeft === 0){
            step = step * -1;
        }

    }, 10);
};

const stop = () => {
    clearInterval(intervalo);  
};

slider.addEventListener("mouseover", () => {
    stop();
});
slider.addEventListener("mouseout", () => {
    start();
});

start();