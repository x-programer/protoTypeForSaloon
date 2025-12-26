document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                if (sunIcon && moonIcon) {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
                localStorage.setItem('theme', 'dark');
            } else {
                if (sunIcon && moonIcon) {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                }
                localStorage.setItem('theme', 'light');
            }
        });
    }

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // styling for X animation if needed
        });

        // Close menu when clicking a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    // Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-background video'); // Target video for parallax
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollFunc = () => {
                let yOffset = window.pageYOffset;
                heroBg.style.transform = `translate3d(-50%, calc(-50% + ${yOffset * 0.5}px), 0)`; // Maintain center (-50%, -50%) and add offset
            };
            requestAnimationFrame(scrollFunc);
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Services Page Logic
    const servicesGrid = document.getElementById('services-grid-dynamic');
    if (servicesGrid) {
        initServicesPage(servicesGrid);
    }

    // MOBILE PERFORMANCE: Disable video autoplay on mobile to save bandwidth and GPU
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo && window.matchMedia("(max-width: 768px)").matches) {
        heroVideo.pause();
        heroVideo.removeAttribute('autoplay');
        heroVideo.style.display = 'none'; // Use poster background image instead
        console.log('Hero video disabled on mobile for performance');
    }

    console.log("Luxe Salon website loaded.");
});

function initServicesPage(gridElement) {
    const servicesData = [
        {
            "id": "color-single",
            "title": "Single Process",
            "category": "Color",
            "duration": 90,
            "price": 100,
            "displayPrice": "$100+",
            "image": "assets/images/services/color-single.jpg",
            "short": "All-over color application.",
            "long": "A complete single-process color application from roots to ends for a rich, uniform look.",
            "popular": true
        },
        {
            "id": "color-partial-balayage",
            "title": "Partial Balayage/Ombre",
            "category": "Color",
            "duration": 120,
            "price": 125,
            "displayPrice": "$125+",
            "image": "assets/images/services/balayage.jpg",
            "short": "Hand-painted highlights for a natural look.",
            "long": "Custom hand-painted highlights focusing on the surface and face-framing areas for a sun-kissed effect."
        },
        {
            "id": "color-single-cut",
            "title": "Single Process & Haircut",
            "category": "Color",
            "duration": 150,
            "price": 250,
            "displayPrice": "$250+",
            "image": "assets/images/services/color-cut.jpg",
            "short": "Full color plus precision cut.",
            "long": "Our signature single process color combined with a tailored haircut and style."
        },
        {
            "id": "color-root",
            "title": "Root Retouch",
            "category": "Color",
            "duration": 90,
            "price": 95,
            "displayPrice": "$95+",
            "image": "assets/images/services/root-touchup.jpg",
            "short": "Cover regrowth and grey.",
            "long": "Touch up your roots to match your existing color and cover greys seamlessly."
        },
        {
            "id": "color-partial-balayage-cut",
            "title": "Partial Balayage & Haircut",
            "category": "Color",
            "duration": 150,
            "price": 265,
            "displayPrice": "$265+",
            "image": "assets/images/services/balayage-cut.jpg",
            "short": "Partial balayage with a fresh cut.",
            "long": "Refresh your look with partial hand-painted highlights and a precision haircut."
        },
        {
            "id": "color-highlight-blowdry",
            "title": "Highlight & Blow Dry",
            "category": "Color",
            "duration": 120,
            "price": 150,
            "displayPrice": "$150+",
            "image": "assets/images/services/highlights.jpg",
            "short": "Classic highlights with a blowout.",
            "long": "Traditional foil highlights followed by a professional blow dry style."
        },
        {
            "id": "color-root-cut",
            "title": "Root Retouch & Haircut",
            "category": "Color",
            "duration": 120,
            "price": 195,
            "displayPrice": "$195+",
            "image": "assets/images/services/root-cut.jpg",
            "short": "Root maintenance and haircut.",
            "long": "Maintain your color and style with a root retouch and haircut service."
        },
        {
            "id": "color-partial-highlight",
            "title": "Partial Highlights",
            "category": "Color",
            "duration": 105,
            "price": 95,
            "displayPrice": "$95+",
            "image": "assets/images/services/partial-highlight.jpg",
            "short": "Dimension for the crown and face.",
            "long": "Foil highlights applied to the crown and sides to add dimension and brightness."
        },
        {
            "id": "color-partial-highlight-cut",
            "title": "Partial Highlights & Haircut",
            "category": "Color",
            "duration": 135,
            "price": 245,
            "displayPrice": "$245+",
            "image": "assets/images/services/partial-highlight-cut.jpg",
            "short": "Partial highlights with a haircut.",
            "long": "Add dimension with partial highlights and refresh your style with a haircut."
        },
        {
            "id": "color-full-highlight",
            "title": "Full Highlights",
            "category": "Color",
            "duration": 150,
            "price": 150,
            "displayPrice": "$150+",
            "image": "assets/images/services/full-highlight.jpg",
            "short": "All-over brightness and dimension.",
            "long": "Full head of foil highlights for maximum brightness and dimension throughout your hair."
        },
        {
            "id": "color-full-highlight-cut",
            "title": "Full Highlights & Haircut",
            "category": "Color",
            "duration": 180,
            "price": 265,
            "displayPrice": "$265+",
            "image": "assets/images/services/full-highlight-cut.jpg",
            "short": "Full highlights with a cut.",
            "long": "Transform your look with full highlights and a precision haircut."
        },
        {
            "id": "color-full-balayage",
            "title": "Full Balayage/Ombre",
            "category": "Color",
            "duration": 180,
            "price": 165,
            "displayPrice": "$165+",
            "image": "assets/images/services/full-balayage.jpg",
            "short": "Complete hand-painted transformation.",
            "long": "Full head balayage or ombre technique for a completely customized, lived-in color."
        },
        {
            "id": "color-full-balayage-cut",
            "title": "Full Balayage & Haircut",
            "category": "Color",
            "duration": 210,
            "price": 295,
            "displayPrice": "$295+",
            "image": "assets/images/services/full-balayage-cut.jpg",
            "short": "Full balayage with a fresh cut.",
            "long": "The ultimate service. Full hand-painted color and a fresh haircut."
        },
        {
            "id": "color-toner",
            "title": "Toner",
            "category": "Color",
            "duration": 30,
            "price": 45,
            "displayPrice": "$45+",
            "image": "assets/images/services/toner.jpg",
            "short": "Refresh tone and add shine.",
            "long": "Correct or refresh the tone of your highlights or color and add incredible shine."
        },
        {
            "id": "color-toner-cut",
            "title": "Toner & Haircut",
            "category": "Color",
            "duration": 75,
            "price": 145,
            "displayPrice": "$145+",
            "image": "assets/images/services/toner-cut.jpg",
            "short": "Toner refresh with a cut.",
            "long": "Refresh your tone and get a fresh cut in one visit."
        },
        {
            "id": "color-partial-highlight-blowdry-2",
            "title": "Partial Highlight & Blowdry",
            "category": "Color",
            "duration": 120,
            "price": 190,
            "displayPrice": "$190+",
            "image": "assets/images/services/partial-highlight-blowdry.jpg",
            "short": "Partial foils and blowout.",
            "long": "Add brightness where it counts and finish with a professional blowout."
        },
        {
            "id": "color-full-highlight-blowdry",
            "title": "Full Highlights & Blowdry",
            "category": "Color",
            "duration": 160,
            "price": 210,
            "displayPrice": "$210+",
            "image": "assets/images/services/full-highlight-blowdry.jpg",
            "short": "Full brightness and style.",
            "long": "Full head of highlights finished with a voluminous blow dry."
        },
        {
            "id": "color-cut",
            "title": "Color & Cut",
            "category": "Color",
            "duration": 120,
            "price": 170,
            "displayPrice": "$170+",
            "image": "assets/images/services/color-cut-basic.jpg",
            "short": "Standard color and cut service.",
            "long": "A classic color service paired with a haircut."
        },
        {
            "id": "color-bleach-toner",
            "title": "Bleach and Toner",
            "category": "Color",
            "duration": 150,
            "price": 125,
            "displayPrice": "$125+",
            "image": "assets/images/services/bleach.jpg",
            "short": "Double process blonding.",
            "long": "All-over lightening service followed by a toner for the perfect shade of blonde."
        },
        {
            "id": "color-bleach-toner-cut",
            "title": "Bleach, Toner & Haircut",
            "category": "Color",
            "duration": 180,
            "price": 225,
            "displayPrice": "$225+",
            "image": "assets/images/services/bleach-cut.jpg",
            "short": "Complete blonding transformation.",
            "long": "Double process blonding with a precision haircut."
        },
        {
            "id": "color-blowdry",
            "title": "Color & Blow Dry",
            "category": "Color",
            "duration": 105,
            "price": 120,
            "displayPrice": "$120+",
            "image": "assets/images/services/color-blowdry.jpg",
            "short": "Color service with a blowout.",
            "long": "Single process color finished with a professional blow dry."
        },
        {
            "id": "color-full",
            "title": "Full Color",
            "category": "Color",
            "duration": 90,
            "price": 110,
            "displayPrice": "$110+",
            "image": "assets/images/services/full-color.jpg",
            "short": "Rich, all-over color.",
            "long": "Complete color change or refresh from roots to ends."
        },
        {
            "id": "color-mens",
            "title": "Men's Color & Cut",
            "category": "Color",
            "duration": 60,
            "price": 100,
            "displayPrice": "$100+",
            "image": "assets/images/services/mens-color.jpg",
            "short": "Subtle color and cut for men.",
            "long": "Natural-looking color blending and a precision haircut for men."
        },
        {
            "id": "color-glaze",
            "title": "Glaze",
            "category": "Color",
            "duration": 30,
            "price": 45,
            "displayPrice": "$45+",
            "image": "assets/images/services/glaze.jpg",
            "short": "Shine and tone enhancement.",
            "long": "Demi-permanent color to add immense shine and refresh tone."
        },
        {
            "id": "style-blowdry",
            "title": "Blow Dry",
            "category": "Styling",
            "duration": 45,
            "price": 50,
            "displayPrice": "$50+",
            "image": "assets/images/services/blowdry.jpg",
            "short": "Wash and professional blowout.",
            "long": "Invigorating wash followed by a smooth, voluminous blow dry style.",
            "popular": true
        },
        {
            "id": "style-blowdry-curl",
            "title": "Blow Dry & Curling / Iron",
            "category": "Styling",
            "duration": 60,
            "price": 65,
            "displayPrice": "$65+",
            "image": "assets/images/services/styling.jpg",
            "short": "Blowout with heat styling.",
            "long": "Signature blow dry finished with curling iron or flat iron for a polished look."
        },
        {
            "id": "style-updo",
            "title": "Up-do",
            "category": "Styling",
            "duration": 60,
            "price": 65,
            "displayPrice": "$65+",
            "image": "assets/images/services/updo.jpg",
            "short": "Formal hair styling.",
            "long": "Elegant up-style for weddings, proms, or special events."
        },
        {
            "id": "cut-long",
            "title": "Long Hair Cut",
            "category": "Cut",
            "duration": 60,
            "price": 150,
            "displayPrice": "$150+",
            "image": "assets/images/services/cut-long.jpg",
            "short": "Precision cut for long hair.",
            "long": "Expert tailored cut for hair below shoulder length, including wash and style."
        },
        {
            "id": "cut-medium",
            "title": "Medium Hair Cut",
            "category": "Cut",
            "duration": 60,
            "price": 120,
            "displayPrice": "$120+",
            "image": "assets/images/services/cut-medium.jpg",
            "short": "Cut for shoulder-length hair.",
            "long": "Tailored haircut for medium length hair, including wash and style."
        },
        {
            "id": "cut-short",
            "title": "Short Hair Cut",
            "category": "Cut",
            "duration": 45,
            "price": 80,
            "displayPrice": "$80+",
            "image": "assets/images/services/cut-short.jpg",
            "short": "Precision short cut.",
            "long": "Expert cut for short styles, pixie cuts, and bobs."
        },
        {
            "id": "cut-bangs",
            "title": "Bang Trim",
            "category": "Cut",
            "duration": 15,
            "price": 15,
            "displayPrice": "$15+",
            "image": "assets/images/services/bangs.jpg",
            "short": "Quick fringe refresh.",
            "long": "Dry cut to trim and shape your bangs in between full appointments."
        },
        {
            "id": "cut-kids",
            "title": "Children's Cut",
            "category": "Cut",
            "duration": 30,
            "price": 45,
            "displayPrice": "$45+",
            "image": "assets/images/services/kids-cut.jpg",
            "short": "Haircut for children.",
            "long": "Gentle and patient haircut service for children under 12."
        },
        {
            "id": "cut-kids-long",
            "title": "Children's Long Hair Cut",
            "category": "Cut",
            "duration": 45,
            "price": 65,
            "displayPrice": "$65+",
            "image": "assets/images/services/kids-long.jpg",
            "short": "Cut for kids with long hair.",
            "long": "Detailed haircut for children with long or thick hair."
        },
        {
            "id": "barber-clipper",
            "title": "Clipper Cut",
            "category": "Barber",
            "duration": 30,
            "price": 80,
            "displayPrice": "$80+",
            "image": "assets/images/services/clipper.jpg",
            "short": "Short clipper cut.",
            "long": "Efficient and clean machine cut for short styles."
        },
        {
            "id": "barber-beard",
            "title": "Beard Trim",
            "category": "Barber",
            "duration": 30,
            "price": 35,
            "displayPrice": "$35+",
            "image": "assets/images/services/beard.jpg",
            "short": "Beard shaping and trim.",
            "long": "Sculpting and trimming of facial hair for a sharp look."
        },
        {
            "id": "treat-scalp",
            "title": "Scalp Treatment",
            "category": "Treatment",
            "duration": 30,
            "price": 25,
            "displayPrice": "$25+",
            "image": "assets/images/services/scalp.jpg",
            "short": "Revitalizing scalp care.",
            "long": "Exfoliate and nourish your scalp to promote healthy hair growth."
        },
        {
            "id": "treat-cond",
            "title": "Conditioning Treatment",
            "category": "Treatment",
            "duration": 30,
            "price": 35,
            "displayPrice": "$35+",
            "image": "assets/images/services/condition.jpg",
            "short": "Deep hydration for hair.",
            "long": "Intensive conditioning treatment to restore moisture and shine. Includes Kérastase, Oribe, Olaplex & Davines options."
        },
        {
            "id": "treat-brazilian",
            "title": "Brazilian Blowout",
            "category": "Treatment",
            "duration": 180,
            "price": 200,
            "displayPrice": "$200+",
            "image": "assets/images/services/brazilian.jpg",
            "short": "Smoothing keratin treatment.",
            "long": "Original smoothing treatment to eliminate frizz and improve hair health for up to 12 weeks."
        },
        {
            "id": "treat-relaxer",
            "title": "Relaxer",
            "category": "Treatment",
            "duration": 120,
            "price": 85,
            "displayPrice": "$85+",
            "image": "assets/images/services/relaxer.jpg",
            "short": "Permanent hair straightening.",
            "long": "Chemical service to permanently straighten curly or textured hair."
        },
        {
            "id": "treat-keratin",
            "title": "Global Keratin Treatment",
            "category": "Treatment",
            "duration": 180,
            "price": 200,
            "displayPrice": "$200+",
            "image": "assets/images/services/keratin.jpg",
            "short": "Frizz reduction treatment.",
            "long": "Tame unmanageable hair and reduce styling time with Global Keratin."
        },
        {
            "id": "treat-yuko",
            "title": "Yuko Treatment",
            "category": "Treatment",
            "duration": 240,
            "price": 350,
            "displayPrice": "$350+",
            "image": "assets/images/services/yuko.jpg",
            "short": "Japanese hair straightening.",
            "long": "Thermal reconditioning system for permanent, pin-straight results."
        },
        {
            "id": "treat-cezanne",
            "title": "Cezanne Treatment",
            "category": "Treatment",
            "duration": 180,
            "price": 275,
            "displayPrice": "$275+",
            "image": "assets/images/services/cezanne.jpg",
            "short": "Formaldehyde-free smoothing.",
            "long": "Long-lasting smoothing treatment without harsh chemicals."
        },
        {
            "id": "ext-hair",
            "title": "Hair Extensions",
            "category": "Extensions",
            "duration": 60,
            "price": 250,
            "displayPrice": "$250+ /hour",
            "image": "assets/images/services/extensions.jpg",
            "short": "Length and volume enhancement.",
            "long": "Custom hair extension application. Pricing is per hour of installation."
        },
        {
            "id": "other-botox",
            "title": "Botox Treatment",
            "category": "Other",
            "duration": 30,
            "price": 12,
            "displayPrice": "$12 /unit",
            "image": "assets/images/services/botox.jpg",
            "short": "Cosmetic injectable.",
            "long": "Reduce facial wrinkles and fine lines. Priced per unit."
        }
    ];

    const filterChips = document.querySelectorAll('.filter-chip');
    const sortSelect = document.getElementById('sort-select');
    let activeFilter = 'all';
    let currentSort = 'default';

    // Initial Render
    renderServices(servicesData);

    // Filter Logic
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update UI
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Filter Data
            activeFilter = chip.dataset.filter;
            applyFiltersAndSort();
        });
    });

    // Sort Logic
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndSort();
    });

    function applyFiltersAndSort() {
        let filtered = servicesData;

        // Filter
        if (activeFilter !== 'all') {
            filtered = servicesData.filter(service => service.category === activeFilter);
        }

        // Sort
        if (currentSort !== 'default') {
            filtered = [...filtered].sort((a, b) => {
                switch (currentSort) {
                    case 'price-asc': return a.price - b.price;
                    case 'price-desc': return b.price - a.price;
                    case 'duration-asc': return a.duration - b.duration;
                    case 'duration-desc': return b.duration - a.duration;
                    default: return 0;
                }
            });
        }

        renderServices(filtered);
    }

    function renderServices(items) {
        if (items.length === 0) {
            gridElement.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px;">No services found for this category.</p>';
            return;
        }

        gridElement.innerHTML = items.map((service, index) => `
            <div class="service-card-luxe animate-on-scroll fade-up" style="animation-delay: ${index * 0.1}s">
                <div class="card-image">
                    <img src="${service.image || 'assets/images/placeholder.jpg'}" alt="${service.title}" loading="lazy">
                    ${service.popular ? '<div class="popular-badge">Popular</div>' : ''}
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${service.title}</h3>
                        <span class="card-price">${service.displayPrice ? service.displayPrice : '$' + service.price}</span>
                    </div>
                    <p class="card-desc">${service.short}</p>
                    <div class="card-footer">
                        <div class="duration">
                            <span>⏱</span> ${service.duration} min
                        </div>
                        <button class="btn-details" data-id="${service.id}">View Details</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach Modal event listeners to new buttons
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', () => openModal(btn.dataset.id));
        });

        // Add click listener to whole card for better UX (optional, but requested in goals implicitly)
        document.querySelectorAll('.service-card-luxe').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const btn = card.querySelector('.btn-details');
                    if (btn) openModal(btn.dataset.id);
                }
            });
            card.style.cursor = 'pointer';
        });

        // Re-trigger scroll observer since elements are new
        const newElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        newElements.forEach(el => observer.observe(el));
    }

    // Modal Logic
    const modal = document.getElementById('service-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDuration = document.querySelector('#modal-duration .val');
    const modalPrice = document.querySelector('#modal-price .val');
    const modalDesc = document.getElementById('modal-desc');
    const modalCta = document.getElementById('modal-cta');

    function openModal(serviceId) {
        const service = servicesData.find(s => s.id === serviceId);
        if (!service) return;

        modalImg.src = service.image;
        modalCategory.textContent = service.category;
        modalTitle.textContent = service.title;
        modalDuration.textContent = `${service.duration} min`;
        modalPrice.textContent = service.displayPrice ? service.displayPrice : `$${service.price}`;
        modalDesc.textContent = service.long || service.short;

        if (service.bookingUrl) {
            modalCta.href = service.bookingUrl;
            modalCta.target = "_blank";
            modalCta.textContent = "Book Now (External)";
        } else {
            modalCta.href = "/#contact";
            modalCta.target = "_self";
            modalCta.textContent = "Book This Service";
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

// macOS Dock Magnification Effect
function initDockMagnification() {
    // MOBILE PERFORMANCE PATCH: Skip on touch devices to prevent layout thrashing
    if (window.matchMedia("(hover: none)").matches) {
        console.log('Dock magnification disabled on touch device for performance');
        return;
    }

    const grid = document.querySelector('.services-grid');
    const cards = document.querySelectorAll('.service-card');

    if (!grid || cards.length === 0) return;

    const maxScale = 1.15;      // Maximum scale for hovered card
    const minScale = 0.9;       // Minimum scale for far cards
    const effectRadius = 300;   // Pixel radius of effect

    grid.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            // Calculate distance from mouse to card center
            const distanceX = e.clientX - cardCenterX;
            const distanceY = e.clientY - cardCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Calculate scale based on distance
            let scale;
            if (distance < effectRadius) {
                // Closer = bigger (exponential falloff for smooth effect)
                const proximity = 1 - (distance / effectRadius);
                scale = minScale + (maxScale - minScale) * Math.pow(proximity, 2);
            } else {
                scale = minScale;
            }

            // Apply transform
            card.style.transform = `scale(${scale})`;

            // Add magnified class for additional styling
            if (scale > 1.05) {
                card.classList.add('magnified');
            } else {
                card.classList.remove('magnified');
            }
        });
    });

    // Reset on mouse leave
    grid.addEventListener('mouseleave', () => {
        cards.forEach(card => {
            card.style.transform = 'scale(1)';
            card.classList.remove('magnified');
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initDockMagnification);

// Gallery Magnification Effect (macOS Dock Style)
function initGalleryMagnification() {
    // MOBILE PERFORMANCE PATCH: Skip on touch devices to prevent layout thrashing
    if (window.matchMedia("(hover: none)").matches) {
        console.log('Gallery magnification disabled on touch device for performance');
        return;
    }

    const grid = document.querySelector('.gallery-grid');
    const items = document.querySelectorAll('.gallery-item');

    if (!grid || items.length === 0) return;

    const config = {
        maxScale: 1.12,
        minScale: 0.88,
        baseScale: 1,
        effectRadius: 400
    };

    let rafId = null;

    grid.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenterX = rect.left + rect.width / 2;
                const itemCenterY = rect.top + rect.height / 2;

                const distanceX = mouseX - itemCenterX;
                const distanceY = mouseY - itemCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                let scale;
                if (distance < config.effectRadius) {
                    const proximity = 1 - (distance / config.effectRadius);
                    scale = config.minScale + (config.maxScale - config.minScale) * Math.pow(proximity, 1.5);
                } else {
                    scale = config.minScale;
                }

                item.style.transform = `scale(${scale})`;

                // Add/remove magnified class for styling
                if (scale > 1.05) {
                    item.classList.add('magnified');
                } else {
                    item.classList.remove('magnified');
                }
            });
        });
    });

    grid.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);

        items.forEach(item => {
            item.style.transform = `scale(${config.baseScale})`;
            item.classList.remove('magnified');
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initGalleryMagnification();
});