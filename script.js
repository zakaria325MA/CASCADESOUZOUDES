// Ouzoud Website Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.fade-in-scroll');
    scrollElements.forEach(el => observer.observe(el));





    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            // Close menu if overlay is clicked
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Chokran a ${name}! Twaselna b message dyalek. Ghadi njawbouk f a9rab waqt.`);
            contactForm.reset();
        });
    }

    // Activity Details Modal Interface
    const modal = document.getElementById('activity-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTime = document.getElementById('modal-time');
    const modalPrice = document.getElementById('modal-price');

    // Data for activities
    const activityData = {
        'boat': {
            title: 'Tour b Lflouka',
            desc: 'Rkeb f flouka te9lidiya mzow9a b lwerd. L3ewama mahirine ghadi ydiwk htel 7da chalal fin ghadin t7essou b rdad d lma. Tjm3o m3a se7abkom o tmte3ou b manadir khayaliya mn west lma.',
            img: 'gallery2.png', // Reusing gallery image for demo
            time: '30-45 D9i9a',
            price: '20-30 DHs/Wa7ed'
        },
        'monkey': {
            title: 'Chouf L9rouda',
            desc: 'Had l9rouda (Barbary Macaques) home skan asliyin dyal had l mintaqa. Walfine b nass o kayjeiw yaklou l cacahuètes mn ydik. Tssawer m3ahom walakin 7diw 7wayjkom, rahom dkiyin!',
            img: 'gallery1.png',
            time: 'Ila bghiti',
            price: 'Fabor (khless ghir l cacahuètes)'
        },
        'hike': {
            title: 'Tsarya 3la Rjlik',
            desc: 'Hbet m3a triq l mdwra o stamt3 b manadir mokhtalifa dyal chalal mn zawayeya. Kayn droj, o kayn triq trabiya. Labas tkoune labes sbbat mzyan dyal l machi.',
            img: 'hero.png', // Reusing hero image for demo
            time: '1h - 2h',
            price: 'Fabor (Guide: ~100-150 DHs)'
        },
        'about-ouzoud': {
            title: 'Tarikh o Ma3loumat',
            desc: 'Chalalat Ouzoud hiya wa7d mn a3jab lmanadir f lmaghrib. Smyt "Ouzoud" jaya mn lmezighiya o kat3ni "Zzitoun", 7it l mintaqa 3amra b chjar d zzitoun.\n\n\nJoghrafia:\nLma kayti7 mn 3olw 110 mitrou 3la 3 dyal darjat.\n\n\nL7ayat lbariya:\nLmintaqa m3roufa b lqrouda d lmagot (Barbary Macaques) li homa naw3 mohaddad b inqirad, walakin hna 3aychin mzyan m3a nass.',
            img: 'hero.png',
            time: 'Nhar Kamel',
            price: 'Fabor'
        },
        'restaurants': {
            title: 'Qhawi o Restaurants',
            desc: 'Kayn bzaf d les cafes o restaurants 3la toul triq hbat lte7t. Kay9dmou Tajine, Couscous, o Machwiyat.\n\nAmakin M3roufa:\n- Café Restaurant Amal\n- Restaurant Ouzoud\n- Cafe des Cascades\n\nStamt3 b atay mch7er m3a manidar ra2i3.',
            img: 'restaurant_ouzoud.png',
            time: 'We9t Lghda',
            price: '50-100 DHs/Personne'
        },
        'hotels': {
            title: 'Hotels o Riads',
            desc: 'Kayn khayarat l jami3 l mizaniyat, mn hotels bsat l riads fakhra.\n\nAmakin M3roufa:\n- Riad Cascades d\'Ouzoud (Luxe)\n- Hotel Chellal Ouzoud\n- Dar Imazighen\n\nAghlabiya kayofrou ftour beldi.',
            img: 'gallery3.png', // Image generation limit reached, using placeholder
            time: 'Lila ola ktar',
            price: '200-800 DHs/Lila'
        },
        'camping': {
            title: 'Camping',
            desc: 'L 3ocha9 tabi3a, kayn makhayamat (Campings) mjezza b douche o toilette.\n\nAmakin M3roufa:\n- Zebra Camping (Mchhour bzaf)\n- Camping Ouzoud\n\nJib m3ak lkhima dyalek ola kricha tema.',
            img: 'camping_ouzoud.png',
            time: 'Lila',
            price: '50-100 DHs/Lila'
        }
    };

    // Open Modal
    document.querySelectorAll('[data-activity]').forEach(element => {
        element.addEventListener('click', () => {
            const activityId = element.getAttribute('data-activity');
            const data = activityData[activityId];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalImg.src = data.img;
                modalTime.textContent = data.time;
                modalPrice.textContent = data.price;
                
                modal.style.display = 'flex';
            }
        });
    });

    // Close Modal Logic
    const closeStart = () => {
        modal.style.display = 'none';
        modalImg.src = ''; // Clear image
    };

    if (closeModal) closeModal.addEventListener('click', closeStart);
    
    // Close when clicking "Réserver" (Navigate to contact)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeStart();
            // Allow smooth scroll to kick in via css scroll-behavior or other logic
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeStart();
        }
    });

    // Book Guide Logic
    document.querySelectorAll('.book-guide').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const guideName = btn.getAttribute('data-guide');
            const contactSection = document.querySelector('#contact');
            const messageInput = document.getElementById('message');
            const serviceSelect = document.getElementById('service-type');

            // Scroll to contact
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Pre-fill form
            setTimeout(() => {
                serviceSelect.value = 'guide';
                messageInput.value = `Salam, bghit nrézervi l'guide ${guideName} bach itlaqa biya Melli newsal Inchaallah.`;
                timelineContent.innerHTML = data.map((item, index) => `
                    <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                        <div class="time">${item.time}</div>
                        <div class="content">
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                `).join('');
                timelineContent.style.opacity = '1';
            }, 300);
        });
    });

    // Reserve from Modal (Universal Reserve)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
             const contactSection = document.querySelector('#contact');
             const serviceSelect = document.getElementById('service-type');
             const messageInput = document.getElementById('message');
             const modalTitle = document.getElementById('modal-title').textContent;

             closeStart();
             
             contactSection.scrollIntoView({ behavior: 'smooth' });

             setTimeout(() => {
                // Heuristic selection
                if (modalTitle.includes('Hotel') || modalTitle.includes('Riad')) {
                    serviceSelect.value = 'hotel';
                } else if (modalTitle.includes('Guide')) {
                    serviceSelect.value = 'guide';
                } else {
                    serviceSelect.value = 'activity';
                }

                messageInput.value = `Salam, bghit nrézervi: ${modalTitle}.`;
                messageInput.focus();
            }, 800);
        });
    }

    // FAQ Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Toggle active state
            header.classList.toggle('active');

            // specific animation for max-height
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // Hero Image Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    if (slides.length > 0) {
        setInterval(() => {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

});
