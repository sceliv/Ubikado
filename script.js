// ==========================================
// UBIKADO - FUNCIONALIDADES INTERACTIVAS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar todas las funcionalidades
    initSmoothScrolling();
    initNavbarEffects();
    initFAQToggle();
    initPhoneMapAnimation();
    initFormValidation();
    initNotificationSystem();
    initBackToTop();
    initLoadingEffects();
    initMobileMenu();
    initPlanComparison();
}

// ==========================================
// 1. NAVEGACIÓN SUAVE Y EFECTOS DEL NAVBAR
// ==========================================
function initSmoothScrolling() {
    // Scroll suave para todos los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Cambiar apariencia del navbar al hacer scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(254, 254, 254, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(254, 254, 254, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Ocultar/mostrar navbar al scroll
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ==========================================
// 2. MENÚ MÓVIL HAMBURGUESA
// ==========================================
function initMobileMenu() {
    // Crear botón hamburguesa si no existe
    const navContent = document.querySelector('.nav-content');
    if (!document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navContent.appendChild(mobileToggle);

        // Agregar estilos CSS dinámicamente
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--negro-quemado);
                cursor: pointer;
            }
            @media (max-width: 768px) {
                .mobile-menu-toggle { display: block; }
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    background: white;
                    flex-direction: column;
                    padding: 2rem;
                    transition: left 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                .nav-links.active { left: 0; }
            }
        `;
        document.head.appendChild(style);

        // Funcionalidad del menú móvil
        const navLinks = document.querySelector('.nav-links');
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// ==========================================
// 3. FAQ INTERACTIVO
// ==========================================
function initFAQToggle() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Toggle de la respuesta
            if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
                answer.style.maxHeight = '0px';
                answer.style.padding = '0 1.5rem';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 1.5rem 1.5rem';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Inicializar estados
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';
        answer.style.padding = '0 1.5rem';
    });
}

// ==========================================
// 4. ANIMACIÓN DEL MAPA EN EL TELÉFONO
// ==========================================
function initPhoneMapAnimation() {
    const markers = document.querySelectorAll('.pollada-marker');
    let currentActive = 0;

    // Rotación automática de marcadores activos
    setInterval(() => {
        markers.forEach(marker => marker.classList.remove('active'));
        markers[currentActive]?.classList.add('active');
        currentActive = (currentActive + 1) % markers.length;
        
        // Actualizar info de la pollada destacada
        updateFeaturedPollada(currentActive);
    }, 3000);

    // Interactividad con hover
    markers.forEach((marker, index) => {
        marker.addEventListener('mouseenter', () => {
            markers.forEach(m => m.classList.remove('active'));
            marker.classList.add('active');
            updateFeaturedPollada(index);
        });
    });
}

function updateFeaturedPollada(index) {
    const polladas = [
        { name: 'Doña Carmen', distance: '2 cuadras', price: 'S/ 12', rating: '4.8⭐', icon: '🍗' },
        { name: 'El Rincón del Sabor', distance: '5 cuadras', price: 'S/ 15', rating: '4.5⭐', icon: '🍖' },
        { name: 'Pollada Familiar', distance: '3 cuadras', price: 'S/ 10', rating: '4.9⭐', icon: '🥘' }
    ];

    const featuredItem = document.querySelector('.pollada-item.featured');
    if (featuredItem && polladas[index]) {
        const pollada = polladas[index];
        featuredItem.innerHTML = `
            <div class="pollada-icon">${pollada.icon}</div>
            <div class="pollada-info">
                <h4>${pollada.name}</h4>
                <p>${pollada.distance} • ${pollada.price}</p>
            </div>
            <div class="pollada-rating">${pollada.rating}</div>
        `;
    }
}

// ==========================================
// 5. SISTEMA DE NOTIFICACIONES
// ==========================================
function initNotificationSystem() {
    // Crear contenedor de notificaciones
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1001;
            max-width: 350px;
        `;
        document.body.appendChild(container);
    }

    // Mostrar notificaciones de ejemplo
    setTimeout(() => showNotification('¡Bienvenido a Ubikado! 🐣', 'success'), 2000);
    setTimeout(() => showNotification('Nueva pollada disponible cerca de ti', 'info'), 8000);
}

function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: 'var(--amarillo-dorado)',
        info: 'var(--naranja-pollero)',
        warning: '#ff9800',
        error: '#f44336'
    };

    notification.style.cssText = `
        background: ${colors[type]};
        color: white;
        padding: 1rem;
        margin-bottom: 10px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        cursor: pointer;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Remove on click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// ==========================================
// 6. VALIDACIÓN DE FORMULARIOS
// ==========================================
function initFormValidation() {
    // Crear formulario de contacto modal si no existe
    if (!document.querySelector('.contact-modal')) {
        const modalHTML = `
            <div class="contact-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1002; align-items: center; justify-content: center;">
                <div class="modal-content" style="background: white; padding: 2rem; border-radius: 20px; max-width: 500px; width: 90%;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h3>¡Únete a la beta de Ubikado!</h3>
                        <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    </div>
                    <form class="contact-form">
                        <div style="margin-bottom: 1rem;">
                            <input type="text" name="name" placeholder="Tu nombre" required style="width: 100%; padding: 1rem; border: 2px solid #eee; border-radius: 10px;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <input type="email" name="email" placeholder="Tu email" required style="width: 100%; padding: 1rem; border: 2px solid #eee; border-radius: 10px;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <input type="tel" name="phone" placeholder="Tu WhatsApp" style="width: 100%; padding: 1rem; border: 2px solid #eee; border-radius: 10px;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <select name="zone" required style="width: 100%; padding: 1rem; border: 2px solid #eee; border-radius: 10px;">
                                <option value="">Selecciona tu zona</option>
                                <option value="centro">Trujillo Centro</option>
                                <option value="la-esperanza">La Esperanza</option>
                                <option value="el-porvenir">El Porvenir</option>
                                <option value="florencia">Florencia de Mora</option>
                                <option value="victor-larco">Víctor Larco</option>
                            </select>
                        </div>
                        <button type="submit" style="width: 100%; padding: 1rem; background: var(--naranja-pollero); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">
                            ¡Quiero ser beta tester!
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners para el modal
        const modal = document.querySelector('.contact-modal');
        const closeBtn = document.querySelector('.close-modal');
        
        // Abrir modal desde los botones CTA
        document.querySelectorAll('.cta-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });

        // Cerrar modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Validación del formulario
        const form = document.querySelector('.contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.name || !data.email || !data.zone) {
                showNotification('Por favor completa todos los campos requeridos', 'warning');
                return;
            }

            // Simulación de envío
            showNotification('¡Gracias! Te contactaremos pronto 🎉', 'success');
            modal.style.display = 'none';
            form.reset();
        });
    }
}

// ==========================================
// 7. BOTÓN VOLVER ARRIBA
// ==========================================
function initBackToTop() {
    // Crear botón si no existe
    if (!document.querySelector('.back-to-top')) {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--naranja-pollero);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(206, 128, 52, 0.3);
        `;
        document.body.appendChild(backToTop);

        // Mostrar/ocultar botón
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        // Scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// 8. EFECTOS DE CARGA
// ==========================================
function initLoadingEffects() {
    // Animación de elementos al entrar en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar a elementos específicos
    const elementsToAnimate = [
        '.step-card',
        '.benefit-card',
        '.feature-card',
        '.plan-card',
        '.faq-item'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    });
}

// ==========================================
// 9. COMPARACIÓN DE PLANES
// ==========================================
function initPlanComparison() {
    // Agregar funcionalidad a los botones de planes
    document.querySelectorAll('.plan-card .cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const planCard = button.closest('.plan-card');
            const planName = planCard.querySelector('h3').textContent;
            
            if (planName.includes('RompeOllas')) {
                showNotification(`¡Excelente elección! Plan ${planName} seleccionado 🏆`, 'success');
            } else {
                showNotification(`Plan ${planName} seleccionado. ¡Comienza gratis! 🎉`, 'success');
            }
        });
    });
}

// ==========================================
// 10. FUNCIONES UTILITARIAS
// ==========================================

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Throttle function para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function para optimizar resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Log de inicialización
console.log('🐣 Ubikado App initialized successfully!');
console.log('Funcionalidades activas:', [
    '✅ Navegación suave',
    '✅ Efectos del navbar', 
    '✅ FAQ interactivo',
    '✅ Animación del mapa',
    '✅ Sistema de notificaciones',
    '✅ Validación de formularios',
    '✅ Botón volver arriba',
    '✅ Efectos de carga',
    '✅ Menú móvil',
]);