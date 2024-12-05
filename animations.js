document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate features on scroll
    document.querySelectorAll('.feature').forEach(feature => {
        observer.observe(feature);
    });

    // Animate process steps on scroll
    document.querySelectorAll('.step').forEach(step => {
        observer.observe(step);
    });

    // File upload animation
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.querySelector('#documents');

    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
        fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
    });

    // Form field animations
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });
});