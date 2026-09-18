class LoginForm {
    constructor(form) {
        this.form = form;

        this.emailInput = document.getElementById("email");
        this.passwordInput = document.getElementById("password");

        this.emailError = document.getElementById("emailError");
        this.passwordError = document.getElementById("passwordError");

        this.formMessage = document.getElementById("formMessage");
        this.togglePasswordButton = document.getElementById("togglePassword");

        this.initializeEvents();
    }

    initializeEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleSubmit();
        });

        this.togglePasswordButton.addEventListener("click", () => {
            this.togglePasswordVisibility();
        });

        this.emailInput.addEventListener("input", () => {
            this.clearFieldError(this.emailInput, this.emailError);
        });

        this.passwordInput.addEventListener("input", () => {
            this.clearFieldError(this.passwordInput, this.passwordError);
        });
    }

    validateEmail() {
        const email = this.emailInput.value.trim();

        if (email === "") {
            this.showFieldError(
                this.emailInput,
                this.emailError,
                "Please enter your email address."
            );
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            this.showFieldError(
                this.emailInput,
                this.emailError,
                "Please enter a valid email address."
            );
            return false;
        }

        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;

        if (password === "") {
            this.showFieldError(
                this.passwordInput,
                this.passwordError,
                "Please enter your password."
            );
            return false;
        }

        if (password.length < 6) {
            this.showFieldError(
                this.passwordInput,
                this.passwordError,
                "Password must contain at least 6 characters."
            );
            return false;
        }

        return true;
    }

    showFieldError(input, errorElement, message) {
        input.classList.add("input-error");
        errorElement.textContent = message;
    }

    clearFieldError(input, errorElement) {
        input.classList.remove("input-error");
        errorElement.textContent = "";
        this.formMessage.textContent = "";
        this.formMessage.className = "form-message";
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === "password";

        this.passwordInput.type = isPassword ? "text" : "password";
        this.togglePasswordButton.textContent = isPassword ? "Hide" : "Show";
        this.togglePasswordButton.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );
    }

    handleSubmit() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            this.formMessage.textContent = "";
            return;
        }

        this.formMessage.textContent =
            "Form validated successfully. Authentication will be connected later.";

        this.formMessage.className = "form-message success";
    }
}

const loginFormElement = document.getElementById("loginForm");

if (loginFormElement) {
    new LoginForm(loginFormElement);
}
