document.addEventListener('DOMContentLoaded', function() {
    const btnNext = document.getElementById('nextSlide');
    const btnPrevious = document.getElementById('previousSlide');
    const slider = document.querySelector('.slider');
    const content = document.querySelector('.content');

    if (!btnNext || !btnPrevious || !slider || !content) {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
        return;
    }

    const slideWidth = slider.offsetWidth;
    const contentWidth = content.offsetWidth;

    let currentSlide = 0;

    const slideProps = {
        width: slideWidth,
        scroll: 0,
    };

    function setCurrentDot() {
        const dots = document.querySelectorAll('.dot');
        for (let dot of dots) {
            dot.classList.remove('current');
        }
        dots[currentSlide].classList.add('current');
    }
    
    function controlSlide({ target: { id } }) {
        const contentLength = content.children.length;
        switch (id) {
            case 'nextSlide': {
                if (slideProps.scroll + slideProps.width < contentWidth) {
                    slideProps.scroll += slideProps.width;
                }
                if (currentSlide < contentLength - 1) {
                    currentSlide += 1;
                    setCurrentDot()
                }
                return slider.scrollLeft = slideProps.scroll;
            }

            case 'previousSlide': {
                if (currentSlide > 0) {
                    currentSlide -= 1;
                    setCurrentDot()
                }
                slideProps.scroll = slideProps.scroll - slideProps.width < 0 ? 0 : slideProps.scroll - slideProps.width;
                return slider.scrollLeft = slideProps.scroll;
            }

            default:
                break;
        }
    }

    btnNext.addEventListener('click', controlSlide);
    btnPrevious.addEventListener('click', controlSlide);

    window.onload = () => {
        const contentLength = content.children.length;
        for (let index = 0; index < contentLength - 1; index += 1) {
            const newDot = slider.parentElement.querySelector('.dot').cloneNode();
            slider.parentElement.querySelector('.lenght-dots').appendChild(newDot);
        }
        setCurrentDot();
    }

    setInterval(() => {
        controlSlide({ target: { id: 'nextSlide' } });
    }, 4000);
});
