document.addEventListener('DOMContentLoaded', () => {
    // بيانات المستخدم الشخصية
    const userData = {
        name: 'محمد أحمد',
        email: 'mohamed.ahmed@gmail.com',
        location: 'القاهرة، مصر',
        phone: '01012345678'
    };
    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
    }

    // Navbar scroll effect with background and shadow
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(31, 41, 55, 0.95)'; // bg-gray-800 with opacity
                navbar.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.15)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'transparent';
                navbar.style.boxShadow = 'none';
            }
        });
        // دعم الوضع الداكن للبار
        const updateNavbarDark = () => {
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)'; // أغمق في الوضع الداكن
                navbar.querySelectorAll('a, .text-white').forEach(el => {
                    el.classList.add('text-gray-200');
                    el.classList.remove('text-white');
                });
            } else {
                navbar.style.background = window.scrollY > 50 ? 'rgba(31, 41, 55, 0.95)' : 'transparent';
                navbar.querySelectorAll('a, .text-gray-200').forEach(el => {
                    el.classList.add('text-white');
                    el.classList.remove('text-gray-200');
                });
            }
        };
        // عند تغيير الثيم
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                setTimeout(updateNavbarDark, 10);
            }
        });
        // عند تحميل الصفحة
        updateNavbarDark();
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.innerHTML = document.body.classList.contains('dark-mode')
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    // Form validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');
            const messageInput = form.querySelector('textarea');
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let valid = true;
            // Reset error classes
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('error'));

            if (!name) {
                nameInput.classList.add('error');
                valid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailInput.classList.add('error');
                valid = false;
            }
            if (!message) {
                messageInput.classList.add('error');
                valid = false;
            }

            if (valid) {
                alert(`تم إرسال الرسالة بنجاح إلى ${userData.name} (${userData.email})! (هذا نموذج تجريبي فقط)`);
                form.reset();
            } else {
                alert('يرجى ملء جميع الحقول بشكل صحيح.');
            }
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId.startsWith('#') && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});