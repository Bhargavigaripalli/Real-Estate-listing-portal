// Authentication Validations & Routing Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Password Eye Toggle Logic ---
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  passwordToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        `;
      } else {
        input.type = 'password';
        btn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.01-.17c0-1.66-1.34-3-3-3l-.16.02z"/></svg>
        `;
      }
    });
  });

  // --- Create Account Page Validations ---
  const registerForm = document.getElementById('register-form');
  const txtName = document.getElementById('reg-name');
  const txtEmail = document.getElementById('reg-email');
  const txtMobile = document.getElementById('reg-mobile');
  const txtPassword = document.getElementById('reg-password');
  const txtConfirm = document.getElementById('reg-confirm');
  const chkTerms = document.getElementById('reg-terms');

  const strengthBar = document.getElementById('strength-bar');

  // Input Event Helper for real-time validation feedback
  const setValidity = (input, isValid, feedbackText = '') => {
    const feedbackEl = input.nextElementSibling.classList.contains('invalid-feedback')
      ? input.nextElementSibling
      : input.parentElement.querySelector('.invalid-feedback');
    
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedbackEl) feedbackEl.style.display = 'none';
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (feedbackEl && feedbackText) {
        feedbackEl.innerText = feedbackText;
        feedbackEl.style.display = 'block';
      }
    }
  };

  // Real-time Name checking (Alphabets and spaces only, max 16 chars)
  if (txtName) {
    txtName.addEventListener('input', () => {
      const val = txtName.value;
      const alphaRegex = /^[A-Za-z\s]+$/;
      if (val.length === 0) {
        setValidity(txtName, false, "Name is required");
      } else if (!alphaRegex.test(val)) {
        setValidity(txtName, false, "Alphabets only");
      } else if (val.length > 16) {
        setValidity(txtName, false, "Maximum 16 characters");
      } else {
        setValidity(txtName, true);
      }
    });
  }

  // Real-time Email check
  if (txtEmail) {
    txtEmail.addEventListener('input', () => {
      const val = txtEmail.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val.length === 0) {
        setValidity(txtEmail, false, "Email is required");
      } else if (!emailRegex.test(val)) {
        setValidity(txtEmail, false, "Enter a valid email address");
      } else {
        setValidity(txtEmail, true);
      }
    });
  }

  // Real-time Mobile check (Exactly 10 digits)
  if (txtMobile) {
    txtMobile.addEventListener('input', () => {
      const val = txtMobile.value;
      const digitRegex = /^\d+$/;
      if (val.length === 0) {
        setValidity(txtMobile, false, "Mobile number is required");
      } else if (!digitRegex.test(val)) {
        setValidity(txtMobile, false, "Digits only");
      } else if (val.length !== 10) {
        setValidity(txtMobile, false, "Exactly 10 digits required");
      } else {
        setValidity(txtMobile, true);
      }
    });
  }

  // Real-time Password Strength Check
  if (txtPassword) {
    txtPassword.addEventListener('input', () => {
      const val = txtPassword.value;
      
      const hasUpper = /[A-Z]/.test(val);
      const hasLower = /[a-z]/.test(val);
      const hasDigit = /\d/.test(val);
      const hasSpecial = /[!@#$%^&*()_\-+={[}\]|:;"'<,>.?\/]/.test(val);
      const isLongEnough = val.length >= 8;

      let score = 0;
      if (isLongEnough) score++;
      if (hasUpper && hasLower) score++;
      if (hasDigit && hasSpecial) score++;

      // Update strength bar class
      if (strengthBar) {
        strengthBar.className = "strength-meter-bar";
        if (val.length === 0) {
          // Empty
        } else if (score <= 1) {
          strengthBar.classList.add('weak');
        } else if (score === 2) {
          strengthBar.classList.add('medium');
        } else if (score === 3) {
          strengthBar.classList.add('strong');
        }
      }

      // Standard constraints verification
      if (!isLongEnough) {
        setValidity(txtPassword, false, "Minimum 8 characters required");
      } else if (!hasUpper) {
        setValidity(txtPassword, false, "Must contain at least 1 uppercase letter");
      } else if (!hasLower) {
        setValidity(txtPassword, false, "Must contain at least 1 lowercase letter");
      } else if (!hasDigit) {
        setValidity(txtPassword, false, "Must contain at least 1 number");
      } else if (!hasSpecial) {
        setValidity(txtPassword, false, "Must contain at least 1 special character");
      } else {
        setValidity(txtPassword, true);
      }

      // Trigger confirm password re-checking if populated
      if (txtConfirm && txtConfirm.value.length > 0) {
        txtConfirm.dispatchEvent(new Event('input'));
      }
    });
  }

  // Real-time password confirmation check
  if (txtConfirm && txtPassword) {
    txtConfirm.addEventListener('input', () => {
      if (txtConfirm.value !== txtPassword.value) {
        setValidity(txtConfirm, false, "Passwords do not match");
      } else if (txtConfirm.value.length === 0) {
        setValidity(txtConfirm, false, "Confirm password is required");
      } else {
        setValidity(txtConfirm, true);
      }
    });
  }

  // Registration Submit Handler
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Force input events to validate all fields
      txtName.dispatchEvent(new Event('input'));
      txtEmail.dispatchEvent(new Event('input'));
      txtMobile.dispatchEvent(new Event('input'));
      txtPassword.dispatchEvent(new Event('input'));
      txtConfirm.dispatchEvent(new Event('input'));

      // Check if anything is invalid
      const hasErrors = registerForm.querySelectorAll('.is-invalid').length > 0;
      if (hasErrors) {
        alert("Please resolve the validation errors before creating an account.");
        return;
      }

      if (chkTerms && !chkTerms.checked) {
        alert("You must agree to the Terms of Service and Privacy Policy.");
        return;
      }

      alert("Registration Successful! Redirecting to login page...");
      window.location.href = 'login.html';
    });
  }

  // --- Login Page Logic & Routing ---
  const loginForm = document.getElementById('login-form');
  const txtLoginEmail = document.getElementById('login-email');
  const txtLoginPassword = document.getElementById('login-password');
  const selRole = document.getElementById('login-role');

  if (txtLoginEmail) {
    txtLoginEmail.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(txtLoginEmail.value)) {
        setValidity(txtLoginEmail, false, "Enter a valid email address");
      } else {
        setValidity(txtLoginEmail, true);
      }
    });
  }

  if (txtLoginPassword) {
    txtLoginPassword.addEventListener('input', () => {
      if (txtLoginPassword.value.length < 8) {
        setValidity(txtLoginPassword, false, "Password must be at least 8 characters");
      } else {
        setValidity(txtLoginPassword, true);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      txtLoginEmail.dispatchEvent(new Event('input'));
      txtLoginPassword.dispatchEvent(new Event('input'));

      const hasErrors = loginForm.querySelectorAll('.is-invalid').length > 0;
      if (hasErrors) {
        alert("Please check your email and password.");
        return;
      }

      const role = selRole ? selRole.value : 'user';
      alert(`Login successful! Redirecting as ${role.toUpperCase()}...`);
      
      // Role redirection router
      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    });
  }
});
