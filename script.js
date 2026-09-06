function toggleMenu() {
    const navMenu = document.getElementById("navMenu");

    navMenu.classList.toggle("active");
}


/* Menutup menu setelah memilih halaman */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        document
            .getElementById("navMenu")
            .classList.remove("active");

    });

});


/* ================= TAMBAHAN: Efek Gulir / Loncat Mulus ================= */
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.section, .skill-card, .project-card, .experience-card, .achievement-card');
    hiddenElements.forEach((el) => observer.observe(el));
});


/* ================= TAMBAHAN: Animasi Angka Persen & Progress Bar Keahlian ================= */
document.addEventListener("DOMContentLoaded", function() {
    const skillSection = document.querySelector(".skills-grid");
    
    if (!skillSection) return;

    let skillAnimated = false;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillAnimated) {
                skillAnimated = true;
                
                // 1. Animasi angka berjalan (counter) dari 0 ke target persen
                const counters = document.querySelectorAll('.skill-card small, .counter');
                counters.forEach(counter => {
                    const text = counter.innerText.trim();
                    // Jika teks mengandung tanda '%', ubah jadi target animasi
                    if (text.includes('%')) {
                        const target = parseInt(text);
                        if (!isNaN(target)) {
                            let count = 0;
                            const speed = 20; // Kecepatan hitung angka
                            
                            const updateCount = () => {
                                if (count < target) {
                                    count++;
                                    counter.innerText = count + '%';
                                    setTimeout(updateCount, speed);
                                } else {
                                    counter.innerText = target + '%';
                                }
                            };
                            updateCount();
                        }
                    }
                });

                // 2. Animasi garis progress bar agar berjalan terisi
                const progressSpans = document.querySelectorAll('.progress span');
                progressSpans.forEach(span => {
                    // Ambil lebar asli yang ada di inline style atau set ke 100% jika tidak ada
                    const currentWidth = span.style.width;
                    if (currentWidth && currentWidth !== '0%') {
                        span.style.width = '0%';
                        setTimeout(() => {
                            span.style.width = currentWidth;
                        }, 100);
                    }
                });
            }
        });
    }, { threshold: 0.2 });

    skillObserver.observe(skillSection);
});