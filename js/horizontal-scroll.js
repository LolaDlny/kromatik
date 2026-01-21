// Gestion du scroll horizontal avec drag & molette
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.horizontal');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Scroll avec la molette
        slider.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > 0) return;
            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                slider.scrollLeft += e.deltaY * 3;
            }
        }, { passive: false });
    });
});