/* ============================================
   AURUM LOGISTICS - Contact Form JS
   ============================================ */

const initContact = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const showError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    if (input) input.style.borderColor = '#e05555';
    if (error) { error.textContent = message; error.style.display = 'block'; }
  };

  const clearError = (inputId) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    if (input) input.style.borderColor = '';
    if (error) error.style.display = 'none';
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ['name', 'email', 'company', 'subject', 'message'];
    fields.forEach(f => clearError(f));

    let valid = true;

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const company = document.getElementById('company')?.value.trim();
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value.trim();

    if (!name || name.length < 2) {
      showError('name', 'Please enter your full name.');
      valid = false;
    }

    if (!email || !isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!company) {
      showError('company', 'Company name is required.');
      valid = false;
    }

    if (!subject) {
      showError('subject', 'Please select a subject.');
      valid = false;
    }

    if (!message || message.length < 20) {
      showError('message', 'Please provide more detail (at least 20 characters).');
      valid = false;
    }

    if (valid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'Send Enquiry';
        submitBtn.disabled = false;

        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';

        setTimeout(() => {
          if (success) success.style.display = 'none';
        }, 6000);
      }, 2000);
    }
  });

  // Real-time validation
  ['name', 'email', 'company', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });
};

document.addEventListener('DOMContentLoaded', initContact);
