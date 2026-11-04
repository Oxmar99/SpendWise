const supabaseUrl = "https://yjxasolblerhegkvtubo.supabase.co";
const supabaseKey = "sb_publishable_fHDwlWNuerfj8H6ihMRTPg_sE4BEHYj";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

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
                "Ingresa tu correo electrónico."
            );
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            this.showFieldError(
                this.emailInput,
                this.emailError,
                "Ingresa un correo electrónico válido."
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
                "Ingresa tu contraseña."
            );
            return false;
        }

        if (password.length < 6) {
            this.showFieldError(
                this.passwordInput,
                this.passwordError,
                "La contraseña debe tener al menos 6 caracteres."
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

        this.togglePasswordButton.textContent =
            isPassword ? "Ocultar" : "Mostrar";

        this.togglePasswordButton.setAttribute(
            "aria-label",
            isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
        );
    }

    async handleSubmit() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            this.formMessage.textContent = "";
            return;
        }

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        this.formMessage.textContent = "Iniciando sesión...";
        this.formMessage.className = "form-message";

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
           password: password
        });

        if (error) {
            const errorMessages = {
                invalid_credentials:
                    "Correo electrónico o contraseña incorrectos.",

                email_not_confirmed:
                    "Debes confirmar tu correo electrónico antes de iniciar sesión."
            };

            this.formMessage.textContent =
                errorMessages[error.code] ||
                "No se pudo iniciar sesión. Inténtalo nuevamente.";

            this.formMessage.className = "form-message error";
            return;
        }

        this.formMessage.textContent = "¡Inicio de sesión exitoso!";
        this.formMessage.className = "form-message success";

        console.log("Logged in user:", data.user);

        window.location.href = "dashboard.html";
    }
}

const loginFormElement = document.getElementById("loginForm");

if (loginFormElement) {
    new LoginForm(loginFormElement);
}
