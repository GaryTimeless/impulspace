/**
 * Contact form: client-side validation + feedback UI
 *
 * Currently sends to a mock endpoint. To enable real submissions:
 * 1. Create a free Formspree account at https://formspree.io
 * 2. Replace FORMSPREE_ENDPOINT with your form URL
 * Or: remove the fetch call and rely on mailto links in the footer.
 */
const FORMSPREE_ENDPOINT = ''; // Set to 'https://formspree.io/f/your-form-id' when ready

export function initContact() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous status
    status.className = 'hidden text-sm p-4 rounded';

    // Validate
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      showStatus(status, 'Bitte füllen Sie alle Pflichtfelder aus.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus(status, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;

    if (submitBtn) {
      submitBtn.textContent = 'Wird gesendet…';
      submitBtn.disabled = true;
    }

    // If no Formspree endpoint, simulate success (user can use mailto fallback)
    if (!FORMSPREE_ENDPOINT) {
      // Simulate brief delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      showStatus(
        status,
        'Vielen Dank für Ihre Nachricht! Bitte senden Sie Ihre Anfrage direkt an <a href="mailto:andrea.hornung@impulspace.de" class="underline text-gold hover:text-gold-hover">andrea.hornung@impulspace.de</a>.',
        'success'
      );
      form.reset();
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        showStatus(status, 'Vielen Dank! Ihre Nachricht wurde gesendet.', 'success');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showStatus(
        status,
        'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es per E-Mail an <a href="mailto:andrea.hornung@impulspace.de" class="underline text-gold hover:text-gold-hover">andrea.hornung@impulspace.de</a>.',
        'error'
      );
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}

function showStatus(element, message, type) {
  element.className = 'text-sm p-4 rounded mb-6';
  if (type === 'success') {
    element.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-200');
  } else {
    element.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
  }
  element.innerHTML = message;
}
