document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('assistanceForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        
        // Basic form validation
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const instagram = formData.get('instagram');
        const story = formData.get('story');
        const file = formData.get('documents');

        if (!name || !email || !phone || !instagram || !story || !file) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Instagram handle validation
        if (!instagram.startsWith('@')) {
            showNotification('Please enter a valid Instagram handle starting with @', 'error');
            return;
        }

        // Story length validation
        if (story.length < 10) {
            showNotification('Please provide a detailed story (minimum 10 characters)', 'error');
            return;
        }

        // File size validation (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size should not exceed 5MB', 'error');
            return;
        }

        // File type validation
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            showNotification('Please upload a JPG, PNG, or PDF file', 'error');
            return;
        }

        try {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            // Send data to the backend using fetch
            const response = await fetch('/submit-form', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                showNotification('Your request has been submitted successfully! We will review it and contact you through Instagram.', 'success');
                form.reset();
            } else {
                showNotification('An error occurred. Please try again later.', 'error');
            }
        } catch (error) {
            showNotification('An error occurred. Please try again later.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Request</span><i class="fas fa-arrow-right"></i>';
        }
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}