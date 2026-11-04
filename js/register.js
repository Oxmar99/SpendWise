const supabaseUrl = "https://yjxasolblerhegkvtubo.supabase.co";
const supabaseKey = "sb_publishable_fHDwlWNuerfj8H6ihMRTPg_sE4BEHYj";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase:", supabase);

class RegisterForm {
    constructor(form) {
        this.form = form;

        this.nameInput = document.getElementById("fullName");
        this.emailInput = document.getElementById("registerEmail");
        this.passwordInput = document.getElementById("registerPassword");
        this.confirmPasswordInput = document.getElementById("confirmPassword");

        this.nameError = document.getElementById("nameError");
        this.emailError = document.getElementById("registerEmailError");
        this.passwordError = document.getElementById("registerPasswordError");
        this.confirmPasswordError = document.getElementById("confirmPasswordError");

        this.formMessage = document.getElementById("registerFormMessage");
        this.togglePasswordButton = document.getElementById("toggleRegisterPassword");

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

        this.nameInput.addEventListener("input", () => {
            this.clearFieldError(this.nameInput, this.nameError);
        });

        this.emailInput.addEventListener("input", () => {
            this.clearFieldError(this.emailInput, this.emailError);
        });

        this.passwordInput.addEventListener("input", () => {
            this.clearFieldError(this.passwordInput, this.passwordError);
        });

        this.confirmPasswordInput.addEventListener("input", () => {
            this.clearFieldError(
                this.confirmPasswordInput,
                this.confirmPasswordError
            );
        });
    }

    validateName() {
        const name = this.nameInput.value.trim();

        if (name === "") {
            this.showFieldError(
                this.nameInput,
                this.nameError,
                "Ingresa tu nombre completo."
            );
            return false;
        }

        if (name.length < 3) {
            this.showFieldError(
                this.nameInput,
                this.nameError,
                "El nombre debe tener al menos 3 caracteres."
            );
            return false;
        }

        return true;
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
                "Crea una contraseña."
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

    validateConfirmPassword() {
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;

        if (confirmPassword === "") {
            this.showFieldError(
                this.confirmPasswordInput,
                this.confirmPasswordError,
                "Confirma tu contraseña."
            );
            return false;
        }

        if (password !== confirmPassword) {
            this.showFieldError(
                this.confirmPasswordInput,
                this.confirmPasswordError,
                "Las contraseñas no coinciden."
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
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isConfirmPasswordValid = this.validateConfirmPassword();

        if (
            !isNameValid ||
            !isEmailValid ||
            !isPasswordValid ||
            !isConfirmPasswordValid
     ) {
         this.formMessage.textContent = "";
           return;
        }

        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        this.formMessage.textContent = "Creando tu cuenta...";
        this.formMessage.className = "form-message";

        const { data, error } = await supabaseClient.auth.signUp({
          email: email,
         password: password,
         options: {
             data: {
                 full_name: name
            }
         }
    });

        if (error) {
            const errorMessages = {
                user_already_exists:
                    "Ya existe una cuenta con estos datos.",

                email_exists:
                    "Este correo electrónico ya está registrado.",

                weak_password:
                    "La contraseña no cumple los requisitos de seguridad."
            };

            this.formMessage.textContent =
                errorMessages[error.code] ||
                "No se pudo crear la cuenta. Inténtalo nuevamente.";

            this.formMessage.className = "form-message error";
            return;
        }

        console.log("Registered user:", data.user);

        this.formMessage.textContent = data.session
        ? "¡Cuenta creada correctamente! Ya puedes iniciar sesión."
        : "¡Cuenta creada! Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.";;
        this.formMessage.className = "form-message success";

        this.form.reset();
    }
}

const registerFormElement = document.getElementById("registerForm");

if (registerFormElement) {
    new RegisterForm(registerFormElement);
}
