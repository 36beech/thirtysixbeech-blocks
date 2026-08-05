(function () {
	"use strict";

	/**
	 * Handle a single contact form element.
	 *
	 * @param {HTMLFormElement} form
	 */
	function initContactForm(form) {
		const button = form.querySelector(
			'button[type="submit"], button:not([type])',
		);
		const origLabel = button ? button.textContent : null;

		form.addEventListener("submit", async function (e) {
			e.preventDefault();

			// --- Collect & basic validate ---
			const name = form.querySelector('[name="name"]').value.trim();
			const email = form.querySelector('[name="email"]').value.trim();
			const message = form.querySelector('[name="message"]').value.trim();
			const formToken = form.querySelector('[name="form_token"]')?.value ?? "";

			clearStatus(form);

			if (!name || !email || !message) {
				showStatus(form, "error", "Please fill in all fields.");
				return;
			}

			// --- Loading state ---
			setLoading(button, true, "Sending…");

			try {
				const response = await fetch(form.action, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name, email, message, form_token: formToken }),
				});

				const data = await response.json();

				if (response.ok) {
					showStatus(form, "success", data.message || "Message sent!");
					form.reset();
				} else {
					// WP REST API errors land in data.message
					showStatus(
						form,
						"error",
						data.message || "Something went wrong. Please try again.",
					);
				}
			} catch (err) {
				showStatus(
					form,
					"error",
					"Could not connect to the server. Please try again.",
				);
			} finally {
				setLoading(button, false, origLabel);
			}
		});
	}

	/**
	 * Toggle the submit button's loading state.
	 *
	 * @param {HTMLButtonElement|null} button
	 * @param {boolean}               isLoading
	 * @param {string}                label
	 */
	function setLoading(button, isLoading, label) {
		if (!button) return;
		button.disabled = isLoading;
		button.textContent = label;
		button.style.opacity = isLoading ? "0.7" : "";
	}

	/**
	 * Inject a status message after the form.
	 *
	 * @param {HTMLFormElement} form
	 * @param {'success'|'error'} type
	 * @param {string}            message
	 */
	function showStatus(form, type, message) {
		const el = document.createElement("p");
		el.className = "contact-form-status contact-form-status--" + type;
		el.setAttribute("role", "alert");
		el.textContent = message;
		form.insertAdjacentElement("afterend", el);
	}

	/**
	 * Remove any existing status message.
	 *
	 * @param {HTMLFormElement} form
	 */
	function clearStatus(form) {
		const existing = form.parentElement.querySelector(".contact-form-status");
		if (existing) existing.remove();
	}

	// Initialise every contact form on the page.
	document.querySelectorAll(".contact-form").forEach(initContactForm);
})();
