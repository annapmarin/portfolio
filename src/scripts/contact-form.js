export default function setupContactForm() {
    const form = document.querySelector('[data-contact-form]');
    const statusDiv = document.querySelector('[data-form-status]');
    if (!form || !statusDiv) return;
  
    const formSiteKey = form.getAttribute('data-sitekey');
    if (!formSiteKey) return;
  
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${formSiteKey}`;
    script.async = true;
    document.head.appendChild(script);
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusDiv.textContent = 'Sending...';
  
      const waitForGrecaptcha = () =>
        new Promise((resolve) => {
          if (window.grecaptcha) return resolve();
          const interval = setInterval(() => {
            if (window.grecaptcha) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
  
      await waitForGrecaptcha();
  
      window.grecaptcha.ready(async () => {
        const token = await window.grecaptcha.execute(formSiteKey, { action: 'contact' });
  
        const formData = {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          recaptcha: token
        };
  
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (res.ok) {
          statusDiv.textContent = 'Message sent successfully!';
          form.reset();
        } else {
          statusDiv.textContent = 'Error sending message. Please try again later.';
        }
      });
    });
  }