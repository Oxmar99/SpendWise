
/* ======================================
   SPENDWISE ASSISTANT
   Chatbot de ayuda - Programación Orientada a Objetos
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    class SupportChat {

        constructor() {

            // Elementos de la interfaz
            this.toggleButton =
                document.getElementById("chatToggleButton");

            this.panel =
                document.getElementById("chatPanel");

            this.closeButton =
                document.getElementById("chatCloseButton");

            this.resetButton =
                document.getElementById("chatResetButton");

            this.messages =
                document.getElementById("chatMessages");

            this.form =
                document.getElementById("chatForm");

            this.input =
                document.getElementById("chatInput");

            this.quickReplies =
                document.getElementById("chatQuickReplies");


            // Verificar los elementos necesarios
            if (
                !this.toggleButton ||
                !this.panel ||
                !this.closeButton ||
                !this.resetButton ||
                !this.messages ||
                !this.form ||
                !this.input ||
                !this.quickReplies
            ) {
                console.error(
                    "No se encontraron todos los elementos del chat."
                );
                return;
            }

            this.setupEvents();
            this.createQuickReplies();
        }


        // ======================================
        // EVENTOS
        // ======================================

        setupEvents() {

            // Abrir y cerrar desde el botón flotante
            this.toggleButton.addEventListener("click", () => {

                if (this.panel.hidden) {
                    this.open();
                } else {
                    this.close();
                }

            });


            // Cerrar desde el encabezado
            this.closeButton.addEventListener(
                "click",
                () => this.close()
            );

            // Reiniciar conversación
            this.resetButton.addEventListener("click", () => {
                this.resetChat();
            });


            // Cerrar con Escape
            document.addEventListener("keydown", (event) => {

                if (
                    event.key === "Escape" &&
                    !this.panel.hidden
                ) {
                    this.close();
                }

            });


            // Enviar mensaje
            this.form.addEventListener("submit", (event) => {

                event.preventDefault();

                this.sendQuestion(this.input.value);

            });

        }


        // ======================================
        // ABRIR Y CERRAR
        // ======================================

        open() {

            this.panel.hidden = false;

            this.toggleButton.setAttribute(
                "aria-expanded",
                "true"
            );

            this.toggleButton.setAttribute(
                "aria-label",
                "Cerrar asistente de SpendWise"
            );

            this.input.focus();
        }


        close() {

            this.panel.hidden = true;

            this.toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

            this.toggleButton.setAttribute(
                "aria-label",
                "Abrir asistente de SpendWise"
            );

            this.toggleButton.focus();
        }


        // ======================================
        // PREGUNTAS RÁPIDAS
        // ======================================

        createQuickReplies() {

            const questions = [
                "¿Cómo registro un gasto?",
                "¿Cómo establezco un presupuesto?",
                "¿Cómo edito un gasto?",
                "¿Dónde veo el historial?",
                "¿Dónde están las estadísticas?",
                "Tengo un problema",
                "No puedo guardar un gasto",
                "Mi presupuesto no se guarda",
                "No aparecen mis gastos"
            ];

            questions.forEach(question => {

                const button = document.createElement("button");

                button.type = "button";
                button.textContent = question;

                button.addEventListener("click", () => {
                    this.sendQuestion(question);
                });

                this.quickReplies.appendChild(button);

            });

        }


        // ======================================
        // ENVIAR UNA PREGUNTA
        // ======================================

        sendQuestion(text) {

            const question = text.trim();

            if (!question) {
                return;
            }

            // Mostrar pregunta
            this.addMessage(question, "user");

            // Limpiar campo
            this.input.value = "";

            // Obtener respuesta
            const answer = this.getAnswer(question);

            // Mostrar respuesta
            this.addMessage(answer, "bot");

            // Identificar una acción relacionada
            const action = this.getSuggestedAction(question);

            // Mostrar botón si existe una acción
            if (action) {
                this.addActionButton(action);
            }

            this.input.focus();
        }


        // ======================================
        // MOSTRAR MENSAJES
        // ======================================

        addMessage(text, sender) {

            const message = document.createElement("div");

            message.classList.add(
                "chat-message",
                sender === "user"
                    ? "user-message"
                    : "bot-message"
            );

            // Mostrar texto de forma segura
            message.textContent = text;

            this.messages.appendChild(message);

            // Desplazarse al mensaje más reciente
            this.messages.scrollTop =
                this.messages.scrollHeight;
        }


        // ======================================
        // REINICIAR CONVERSACIÓN
        // ======================================

        resetChat() {

            // Eliminar mensajes anteriores
            this.messages.replaceChildren();

            // Mostrar nuevamente la bienvenida
            this.addMessage(
                "¡Hola! 👋 Soy el asistente de SpendWise. " +
                "Estoy aquí para ayudarte a utilizar la aplicación.",
                "bot"
            );

            // Limpiar campo de escritura
            this.input.value = "";

            // Devolver el foco al campo
            this.input.focus();

        }


        /* ======================================
        ACCIONES SUGERIDAS
        ====================================== */

        getSuggestedAction(question) {

            const text = question
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");


            // Gastos que no aparecen en el historial
            if (
                /(no aparec|no veo|no encuentr|no carg)/.test(text) &&
                /(gasto|movimiento|historial)/.test(text)
            ) {
                return {
                    selector: '.nav-item[data-view="historyView"]',
                    label: "Revisar Historial"
                };
            }


            // Editar o eliminar gastos
            if (
                /(elimin|borr|edit|modific|correg)/.test(text) &&
                /(gasto|movimiento)/.test(text)
            ) {
                return {
                    selector: '.nav-item[data-view="historyView"]',
                    label: "Abrir Historial"
                };
            }


            // Presupuestos
            if (/(presupuest|limite)/.test(text)) {
                return {
                    selector: '.nav-item[data-view="homeView"]',
                    label: "Ir a Inicio"
                };
            }


            // Historial
            if (
                /(historial|movimiento|filtr|buscar)/.test(text)
            ) {
                return {
                    selector: '.nav-item[data-view="historyView"]',
                    label: "Abrir Historial"
                };
            }


            // Estadísticas
            if (
                /(estadistic|grafica|analisis|comparacion)/.test(text)
            ) {
                return {
                    selector: '.nav-item[data-view="statsView"]',
                    label: "Abrir Estadísticas"
                };
            }


            // Registrar gastos
            if (
                /(gasto|registr|agreg|anad)/.test(text)
            ) {
                return {
                    selector: "#addExpenseButton",
                    label: "Registrar un gasto"
                };
            }


            return null;
        }


        /* ======================================
        CREAR BOTÓN DE ACCIÓN
        ====================================== */

        addActionButton(action) {

            const originalButton = document.querySelector(
                action.selector
            );

            if (!originalButton) {
                return;
            }

            const button = document.createElement("button");

            button.type = "button";
            button.className = "chat-action-button";
            button.textContent = action.label;


            button.addEventListener("click", () => {

                // Cerrar asistente
                this.close();

                // Activar la función original de SpendWise
                originalButton.click();

            });


            this.messages.appendChild(button);

            // Mostrar botón al final de la conversación
            this.messages.scrollTop =
                this.messages.scrollHeight;
        }



        /* ======================================
        AYUDA ANTE PROBLEMAS
        ====================================== */

        getSupportAnswer(text) {

            // Detectar si el usuario reporta un problema
            const hasIssue =
                /(problema|error|fall|no puedo|no (se )?(guard|aparec|actualiz|cambi|carg)|no veo|ayuda)/.test(text);

            if (!hasIssue) {
                return null;
            }


            // Problemas al guardar gastos
            if (
                /(gasto|movimiento)/.test(text) &&
                /(guard|registr|agreg|anad)/.test(text)
            ) {
                return (
                    "Si no puedes guardar un gasto, revisa lo siguiente:\n\n" +
                    "1. La descripción no debe estar vacía.\n" +
                    "2. El monto debe ser mayor que cero.\n" +
                    "3. Debes seleccionar una categoría.\n" +
                    "4. Verifica que la fecha sea correcta.\n" +
                    "5. Comprueba tu conexión a Internet.\n\n" +
                    "Si ya presionaste Guardar, revisa primero tu Historial antes de intentarlo nuevamente para evitar registros duplicados."
                );
            }


            // Problemas con presupuestos
            if (
                /presupuest/.test(text) &&
                /(guard|cambi|actualiz|establec)/.test(text)
            ) {
                return (
                    "Si tienes problemas para guardar tu presupuesto:\n\n" +
                    "1. Abre el apartado Inicio.\n" +
                    "2. Introduce un monto mayor que cero.\n" +
                    "3. Presiona Guardar presupuesto.\n" +
                    "4. Comprueba si aparece un mensaje de confirmación o error.\n" +
                    "5. Revisa tu conexión a Internet.\n\n" +
                    "Si el problema continúa, anota el mensaje de error que aparece."
                );
            }


            // Gastos que no aparecen
            if (
                /(gasto|movimiento|historial)/.test(text) &&
                /(aparec|veo|encuentr|carg)/.test(text)
            ) {
                return (
                    "Si no aparecen tus movimientos:\n\n" +
                    "1. Entra al apartado Historial.\n" +
                    "2. Abre el botón Filtros.\n" +
                    "3. Selecciona Limpiar filtros.\n" +
                    "4. Comprueba que los gastos correspondan a las fechas que estás consultando.\n\n" +
                    "Si todavía no aparecen, verifica tu conexión y vuelve a cargar la aplicación."
                );
            }


            // Problemas con las estadísticas
            if (
                /(estadistic|grafic|analisis)/.test(text)
            ) {
                return (
                    "Si tus estadísticas no muestran los resultados esperados:\n\n" +
                    "1. Abre el apartado Estadísticas.\n" +
                    "2. Comprueba el periodo de análisis seleccionado.\n" +
                    "3. Revisa en Historial que existan gastos correspondientes a ese periodo.\n" +
                    "4. Verifica que los gastos tengan sus categorías correctas.\n" +
                    "5. Si es necesario, recarga la aplicación.\n\n" +
                    "Recuerda que las estadísticas dependen de los gastos registrados."
                );
            }


            // Ayuda general
            return (
                "¡Estoy aquí para ayudarte! 💚\n\n" +
                "Puedo orientarte con estos problemas:\n\n" +
                "• No puedo guardar un gasto.\n" +
                "• Mi presupuesto no se guarda.\n" +
                "• No aparecen mis gastos.\n" +
                "• Mis estadísticas no se actualizan.\n\n" +
                "Escribe cuál de estas situaciones estás experimentando."
            );

        }


        // ======================================
        // RESPUESTAS AUTOMÁTICAS
        // ======================================

        getAnswer(question) {

            // Normalizar texto para facilitar la búsqueda
            const text = question
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();

            // Revisar primero si se trata de un problema
            const supportAnswer = this.getSupportAnswer(text);

            if (supportAnswer !== null) {
                return supportAnswer;
            }


            // Eliminar gastos
            if (
                /(elimin|borr)/.test(text) &&
                /(gasto|movimiento)/.test(text)
            ) {
                return "Para eliminar un gasto, entra a Historial, localiza el movimiento y abre su menú de tres puntos (⋮). Después selecciona 'Eliminar gasto'.";
            }


            // Editar gastos
            if (
                /(edit|modific|correg)/.test(text) &&
                /(gasto|movimiento)/.test(text)
            ) {
                return "Para editar un gasto, entra a Historial, busca el movimiento y abre el menú de tres puntos (⋮). Selecciona 'Editar gasto', realiza los cambios y guárdalos.";
            }


            // Presupuestos
            if (
                /(presupuest|limite)/.test(text)
            ) {
                return "Para administrar tu presupuesto mensual, entra a Inicio. Encontrarás el apartado 'Presupuesto mensual', donde puedes establecer o actualizar el monto y consultar cuánto has gastado y cuánto tienes disponible.";
            }


            // Historial y filtros
            if (
                /(historial|movimiento|filtr|buscar)/.test(text)
            ) {
                return "Para consultar tus movimientos, entra a Historial desde la barra inferior. Puedes utilizar el botón 'Filtros' para buscar gastos por descripción, categoría o fechas.";
            }


            // Estadísticas
            if (
                /(estadistic|grafica|analisis|comparacion)/.test(text)
            ) {
                return "Para consultar tus estadísticas, abre el apartado 'Estadísticas'. Ahí puedes seleccionar el periodo de análisis y revisar tus gastos, promedios y distribución por categorías.";
            }


            // Categorías
            if (
                /(categor)/.test(text)
            ) {
                return "Las categorías te ayudan a organizar tus gastos. Cuando registres un movimiento, selecciona la categoría correspondiente para que SpendWise pueda clasificarlo en tus estadísticas.";
            }


            // Registrar gastos
            if (
                /(gasto|registr|agreg|anad)/.test(text)
            ) {
                return "Para registrar un gasto, presiona el botón + ubicado encima de la barra de navegación. Escribe la descripción, el monto, selecciona una categoría y la fecha. Finalmente, presiona 'Guardar gasto'.";
            }


            // Problemas o soporte
            if (
                /(soporte|problema|error|ayuda)/.test(text)
            ) {
                return "¡Estoy aquí para ayudarte! Puedo explicarte cómo utilizar las funciones de SpendWise. Si tienes un problema técnico, intenta recargar la aplicación. Si continúa, comunícalo al equipo de desarrollo.";
            }


            // Saludos
            if (
                /(hola|buenos dias|buenas tardes|buenas noches)/.test(text)
            ) {
                return "¡Hola! 👋 Soy SpendWise Assistant. Puedo ayudarte con gastos, presupuestos, historial, categorías y estadísticas. ¿Qué necesitas saber?";
            }


            // Agradecimientos
            if (
                /(graci)/.test(text)
            ) {
                return "¡Con mucho gusto! 💚 Recuerda que los pequeños gastos también cuentan. ¿Necesitas ayuda con algo más?";
            }


            // Respuesta predeterminada
            return "Lo siento, todavía no tengo una respuesta para esa pregunta. 😅 Puedo ayudarte con gastos, presupuestos, historial, categorías y estadísticas. Prueba alguna de las preguntas rápidas.";

        }

    }


    // Crear instancia del asistente
    new SupportChat();

});
