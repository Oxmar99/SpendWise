
const supabaseUrl = "https://yjxasolblerhegkvtubo.supabase.co";
const supabaseKey = "sb_publishable_fHDwlWNuerfj8H6ihMRTPg_sE4BEHYj";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const expenseForm = document.getElementById("expenseForm");
const categorySelect = document.getElementById("category");
const expensesList = document.getElementById("expensesList");
const formMessage = document.getElementById("formMessage");
const totalExpenses = document.getElementById("totalExpenses");
const budgetForm = document.getElementById("budgetForm");
const budgetAmount = document.getElementById("budgetAmount");
const budgetLimit = document.getElementById("budgetLimit");
const budgetSpent = document.getElementById("budgetSpent");
const budgetRemaining = document.getElementById("budgetRemaining");
const budgetProgress = document.getElementById("budgetProgress");
const budgetProgressTrack = document.getElementById("budgetProgressTrack");
const budgetPercentage = document.getElementById("budgetPercentage");
const budgetMessage = document.getElementById("budgetMessage");
const saveBudgetButton = document.getElementById("saveBudgetButton");

let currentBudget = null;
const welcomeMessage = document.getElementById("welcomeMessage");
const saveExpenseButton = document.getElementById("saveExpenseButton");
const logoutButton = document.getElementById("logoutButton");
const expenseDate = document.getElementById("expenseDate");
const editingExpenseId = document.getElementById("editingExpenseId");
const cancelEditButton = document.getElementById("cancelEditButton");
const searchExpense = document.getElementById("searchExpense");
const filterCategory = document.getElementById("filterCategory");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const clearFiltersButton =
    document.getElementById("clearFiltersButton");

let currentUser = null;
let categories = [];
let allExpenses = [];
const monthlyTotal = document.getElementById("monthlyTotal");
const monthlyExpenseCount =
    document.getElementById("monthlyExpenseCount");
const monthlyAverage = document.getElementById("monthlyAverage");
const monthlyComparison =
    document.getElementById("monthlyComparison");
const monthlyComparisonMessage =
    document.getElementById("monthlyComparisonMessage");
const categoryChart = document.getElementById("categoryChart");
const historyMonth = document.getElementById("historyMonth");

const currentMonthButton =
    document.getElementById("currentMonthButton");

let selectedMonth = getLocalDate().slice(0, 7);

function showMessage(message, isError = false) {
    formMessage.textContent = message;
    formMessage.style.color = isError ? "#c62828" : "#238636";
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(amount);
}

function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCurrentMonth() {
    return getLocalDate().slice(0, 7) + "-01";
}

async function loadBudget() {
    const month = selectedMonth + "-01";

    const { data, error } = await supabaseClient
        .from("budgets")
        .select("id, month, amount_limit")
        .eq("user_id", currentUser.id)
        .eq("month", month)
        .maybeSingle();

    if (error) {
        console.error("Error al cargar el presupuesto:", error);
        throw new Error("No se pudo cargar el presupuesto mensual.");
    }

    currentBudget = data;

    budgetAmount.value = currentBudget
        ? currentBudget.amount_limit
        : "";

    renderBudget();
}

function renderBudget() {
    const limit = currentBudget
        ? Number(currentBudget.amount_limit)
        : 0;

    const currentMonth = selectedMonth;

    const spent = allExpenses.reduce((total, expense) => {
        if (expense.expense_date.slice(0, 7) === currentMonth) {
            return total + Number(expense.amount);
        }

        return total;
    }, 0);

    const remaining = limit - spent;

    const percentage = limit > 0
        ? (spent / limit) * 100
        : 0;

    const displayedPercentage = Math.round(percentage);

    budgetLimit.textContent = formatCurrency(limit);
    budgetSpent.textContent = formatCurrency(spent);

    budgetRemaining.textContent = formatCurrency(remaining);

    budgetProgress.style.width =
        `${Math.min(percentage, 100)}%`;

    budgetProgressTrack.setAttribute(
        "aria-valuenow",
        String(Math.min(displayedPercentage, 100))
    );

    budgetPercentage.textContent =
        `${displayedPercentage}% utilizado`;

    if (!currentBudget) {
        budgetMessage.textContent =
            "Establece un presupuesto para comenzar a controlar tus gastos.";

        budgetMessage.style.color = "";
        return;
    }

    if (spent > limit) {
        budgetMessage.textContent =
            "Has superado tu presupuesto mensual.";

        budgetMessage.style.color = "#c62828";
        budgetProgress.style.background = "#c62828";
    } else if (percentage >= 80) {
        budgetMessage.textContent =
            "Atención: estás cerca de alcanzar tu presupuesto.";

        budgetMessage.style.color = "#b26a00";
        budgetProgress.style.background = "#e5a000";
    } else {
        budgetMessage.textContent =
            "Vas dentro de tu presupuesto mensual.";

        budgetMessage.style.color = "#238636";
        budgetProgress.style.background = "#238636";
    }

    if (limit > 0 && percentage >= 100) {
        budgetProgress.style.background = "#c62828";
    }

    const isCurrentMonth =
        selectedMonth === getLocalDate().slice(0, 7);

    budgetAmount.disabled = !isCurrentMonth;
    saveBudgetButton.disabled = !isCurrentMonth;

    if (!isCurrentMonth) {
        budgetMessage.textContent =
            "Estás consultando un mes anterior. Su presupuesto no se puede modificar.";

        budgetMessage.style.color = "#666";
    } else {
        budgetMessage.textContent = "";
    }
}

function renderDashboardStats() {
    const now = getLocalDate();
    const currentMonth = selectedMonth;

    const [year, month] = currentMonth.split("-").map(Number);

    const previousDate = new Date(year, month - 2, 1);
    const previousMonth =
        `${previousDate.getFullYear()}-${String(
            previousDate.getMonth() + 1
        ).padStart(2, "0")}`;

    const currentExpenses = allExpenses.filter(
        (expense) => expense.expense_date.slice(0, 7) === currentMonth
    );

    const previousExpenses = allExpenses.filter(
        (expense) => expense.expense_date.slice(0, 7) === previousMonth
    );

    const currentTotal = currentExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const previousTotal = previousExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    monthlyTotal.textContent = formatCurrency(currentTotal);
    monthlyExpenseCount.textContent = currentExpenses.length;

    const average = currentExpenses.length > 0
        ? currentTotal / currentExpenses.length
        : 0;

    monthlyAverage.textContent = formatCurrency(average);

    if (previousTotal === 0 && currentTotal === 0) {
        monthlyComparison.textContent = "0 %";
        monthlyComparisonMessage.textContent =
            "No hay gastos en ninguno de los dos meses.";
    } else if (previousTotal === 0) {
        monthlyComparison.textContent = "Nuevo gasto";
        monthlyComparisonMessage.textContent =
            "El mes anterior no tuvo gastos registrados.";
    } else {
        const difference =
            ((currentTotal - previousTotal) / previousTotal) * 100;

        const absoluteDifference = Math.abs(difference).toFixed(1);

        monthlyComparison.textContent =
            `${difference > 0 ? "+" : ""}${difference.toFixed(1)} %`;

        if (difference > 0) {
            monthlyComparisonMessage.textContent =
                `Gastaste ${absoluteDifference} % más que el mes anterior.`;
        } else if (difference < 0) {
            monthlyComparisonMessage.textContent =
                `Gastaste ${absoluteDifference} % menos que el mes anterior.`;
        } else {
            monthlyComparisonMessage.textContent =
                "Gastaste lo mismo que el mes anterior.";
        }
    }

    renderCategoryChart(currentExpenses, currentTotal);
}

function renderCategoryChart(currentExpenses, currentTotal) {
    categoryChart.replaceChildren();

    if (currentExpenses.length === 0) {
        categoryChart.textContent =
            "Todavía no hay gastos registrados este mes.";
        return;
    }

    const totalsByCategory = new Map();

    currentExpenses.forEach((expense) => {
        const category = categories.find(
            (item) => String(item.id) === String(expense.category_id)
        );

        const name = category?.name || "Sin categoría";

        totalsByCategory.set(
            name,
            (totalsByCategory.get(name) || 0) + Number(expense.amount)
        );
    });

    const sortedCategories = [...totalsByCategory.entries()]
        .sort((a, b) => b[1] - a[1]);

    sortedCategories.forEach(([name, amount]) => {
        const percentage = currentTotal > 0
            ? (amount / currentTotal) * 100
            : 0;

        const item = document.createElement("div");
        item.className = "category-chart-item";

        const heading = document.createElement("div");
        heading.className = "category-chart-heading";

        const nameElement = document.createElement("span");
        nameElement.textContent = name;

        const amountElement = document.createElement("strong");
        amountElement.textContent =
            `${formatCurrency(amount)} (${percentage.toFixed(1)} %)`;

        heading.append(nameElement, amountElement);

        const track = document.createElement("div");
        track.className = "category-chart-track";
        track.setAttribute("aria-hidden", "true");

        const bar = document.createElement("div");
        bar.className = "category-chart-bar";
        bar.style.width = `${percentage}%`;

        track.appendChild(bar);
        item.append(heading, track);
        categoryChart.appendChild(item);
    });
}

budgetForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentUser) {
        budgetMessage.textContent =
            "Tu sesión no está disponible.";

        return;
    }

    if (selectedMonth !== getLocalDate().slice(0, 7)) {
        budgetMessage.textContent =
            "No puedes modificar presupuestos de meses anteriores.";

        return;
    }

    const amount = Number(budgetAmount.value);

    if (
        !Number.isFinite(amount) ||
        amount < 0.01 ||
        amount > 999999999
    ) {
        budgetMessage.textContent =
            "Introduce un presupuesto válido.";

        return;
    }

    saveBudgetButton.disabled = true;
    budgetMessage.textContent = "Guardando presupuesto...";

    try {
        const month = getCurrentMonth();

        let result;

        if (currentBudget) {
            result = await supabaseClient
                .from("budgets")
                .update({
                    amount_limit: amount
                })
                .eq("id", currentBudget.id)
                .eq("user_id", currentUser.id)
                .eq("month", month)
                .select("id, month, amount_limit")
                .maybeSingle();
        } else {
            result = await supabaseClient
                .from("budgets")
                .insert({
                    user_id: currentUser.id,
                    month: month,
                    amount_limit: amount
                })
                .select("id, month, amount_limit")
                .single();
        }

        if (result.error) {
            throw result.error;
        }

        if (!result.data) {
            throw new Error(
                "No se pudo guardar el presupuesto. Revisa los permisos RLS."
            );
        }

        currentBudget = result.data;

        renderBudget();

        budgetMessage.textContent =
            "¡Presupuesto mensual guardado correctamente!";

        budgetMessage.style.color = "#238636";

    } catch (error) {
        console.error("Error al guardar el presupuesto:", error);

        budgetMessage.textContent =
            "No se pudo guardar el presupuesto. Revisa la consola.";

        budgetMessage.style.color = "#c62828";
    } finally {
        saveBudgetButton.disabled = false;
    }
});

async function checkSession() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user) {
        window.location.replace("index.html");
        return false;
    }

    currentUser = data.user;

    welcomeMessage.textContent =
        `Bienvenido, ${currentUser.user_metadata?.full_name
        || currentUser.email}`;

        renderProfile();

    return true;
}

async function loadCategories() {
    const { data, error } = await supabaseClient
        .from("categories")
        .select("id, name")
        .order("name");

    if (error) {
        throw new Error("No se pudieron cargar las categorías.");
    }

    categories = data || [];

    filterCategory.replaceChildren();

    const allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = "";
    allCategoriesOption.textContent = "Todas las categorías";
    filterCategory.appendChild(allCategoriesOption);

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = String(category.id);
        option.textContent = category.name;
        filterCategory.appendChild(option);
    });

    categorySelect.replaceChildren();

    const initialOption = document.createElement("option");
    initialOption.value = "";
    initialOption.textContent = "Selecciona una categoría";
    categorySelect.appendChild(initialOption);

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}


async function deleteExpense(expenseId) {
    const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este gasto?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("expenses")
            .delete()
            .eq("id", expenseId)
            .eq("user_id", currentUser.id)
            .select("id");

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            showMessage(
                "No se eliminó el gasto. Revisa las políticas RLS.",
                true
            );
            return;
        }

        showMessage("Gasto eliminado correctamente.");

        await loadExpenses();
    } catch (error) {
        console.error("Error al eliminar el gasto:", error);

        showMessage(
            "No se pudo eliminar el gasto. Revisa la consola.",
            true
        );
    }
}


async function loadExpenses() {
    const { data, error } = await supabaseClient
        .from("expenses")
        .select("id, description, amount, expense_date, category_id")
        .eq("user_id", currentUser.id)
        .order("expense_date", { ascending: false });

    if (error) {
        console.error("Error al cargar gastos:", error);
        throw new Error("No se pudieron cargar tus gastos.");
    }

    allExpenses = data || [];

    renderExpenses();
    renderHomeSummary();
    renderRecentExpenses();

    if (currentUser) {
        renderBudget();
        renderDashboardStats();
    }
    await loadBudgetHistory();
}

function renderHomeSummary() {
    const homeMonthlyTotal = document.getElementById("homeMonthlyTotal");

    const monthlyExpenses = allExpenses.filter(expense =>
        expense.expense_date.slice(0, 7) === selectedMonth
    );

    const total = monthlyExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    homeMonthlyTotal.textContent = formatCurrency(total);
}

function renderRecentExpenses() {
    const recentExpenses = document.getElementById("recentExpenses");

    recentExpenses.replaceChildren();

    const latestExpenses = allExpenses.slice(0, 3);

    if (latestExpenses.length === 0) {
        recentExpenses.textContent =
            "Todavía no tienes gastos registrados.";

        return;
    }

    latestExpenses.forEach(expense => {
        const category = categories.find(
            item => String(item.id) === String(expense.category_id)
        );

        const card = document.createElement("article");
        card.className = "expense-item";

        const description = document.createElement("h3");
        description.textContent = expense.description;

        const categoryText = document.createElement("p");
        categoryText.textContent =
            category?.name || "Sin categoría";

        const dateText = document.createElement("p");
        dateText.textContent = expense.expense_date;

        const amount = document.createElement("strong");
        amount.textContent = formatCurrency(expense.amount);

        card.append(
            description,
            categoryText,
            dateText,
            amount
        );

        recentExpenses.appendChild(card);
    });
}


function getCategoryIcon(categoryName) {
    const name = (categoryName || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (name.includes("comida") || name.includes("alimento")) {
        return "🍽️";
    }

    if (name.includes("transporte")) {
        return "🚌";
    }

    if (name.includes("entretenimiento") || name.includes("ocio")) {
        return "🎮";
    }

    if (name.includes("educacion")) {
        return "📚";
    }

    if (name.includes("salud")) {
        return "💊";
    }

    if (name.includes("compras")) {
        return "🛍️";
    }

    if (name.includes("servicio")) {
        return "💡";
    }

    return "💳";
}

function renderExpenses() {
    const searchText = searchExpense.value.trim().toLowerCase();
    const selectedCategory = filterCategory.value;
    const fromDate = startDate.value;
    const toDate = endDate.value;

    expensesList.replaceChildren();

    if (fromDate && toDate && fromDate > toDate) {
        totalExpenses.textContent = formatCurrency(0);
        expensesList.textContent =
            "La fecha inicial no puede ser posterior a la fecha final.";
        return;
    }

    const filteredExpenses = allExpenses.filter((expense) => {
        const category = categories.find(
            (item) => String(item.id) === String(expense.category_id)
        );

        const descriptionMatches =
            expense.description.toLowerCase().includes(searchText) ||
            (category?.name || "").toLowerCase().includes(searchText);

        const categoryMatches =
            !selectedCategory ||
            String(expense.category_id) === selectedCategory;

        const startDateMatches =
            !fromDate || expense.expense_date >= fromDate;

        const endDateMatches =
            !toDate || expense.expense_date <= toDate;

        return (
            descriptionMatches &&
            categoryMatches &&
            startDateMatches &&
            endDateMatches
        );
    });

    const total = filteredExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    totalExpenses.textContent = formatCurrency(total);

    if (filteredExpenses.length === 0) {
        expensesList.textContent =
            allExpenses.length === 0
                ? "Todavía no tienes gastos registrados."
                : "No se encontraron gastos con esos filtros.";
        return;
    }

    
    
    filteredExpenses.forEach((expense) => {
        const category = categories.find(
            item => String(item.id) === String(expense.category_id)
        );

        const categoryName = category?.name || "Sin categoría";

        // Tarjeta principal
        const card = document.createElement("article");
        card.className = "expense-item";

        // Fila principal
        const mainRow = document.createElement("div");
        mainRow.className = "expense-main-row";

        // Icono de categoría
        const icon = document.createElement("div");
        icon.className = "expense-category-icon";
        icon.textContent = getCategoryIcon(categoryName);
        icon.setAttribute("aria-hidden", "true");

        // Información del gasto
        const information = document.createElement("div");
        information.className = "expense-information";

        const description = document.createElement("h3");
        description.textContent = expense.description;

        const details = document.createElement("p");
        details.textContent =
            `${categoryName} · ${expense.expense_date}`;

        information.append(description, details);

        // Cantidad
        const amount = document.createElement("strong");
        amount.className = "expense-amount";
        amount.textContent = formatCurrency(expense.amount);

        // Menú de tres puntos
        const menu = document.createElement("details");
        menu.className = "expense-menu";

        const menuButton = document.createElement("summary");
        menuButton.className = "expense-menu-button";
        menuButton.textContent = "⋮";
        menuButton.setAttribute(
            "aria-label",
            `Opciones de ${expense.description}`
        );

        const menuOptions = document.createElement("div");
        menuOptions.className = "expense-menu-options";

        // Opción Editar
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-expense-button";
        editButton.textContent = "Editar gasto";

        editButton.addEventListener("click", () => {
            menu.open = false;
            startEditingExpense(expense);
        });

        // Opción Eliminar
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-expense-button";
        deleteButton.textContent = "Eliminar gasto";

        deleteButton.addEventListener("click", async () => {
            menu.open = false;
            await deleteExpense(expense.id);
        });

        menuOptions.append(editButton, deleteButton);
        menu.append(menuButton, menuOptions);

        // Construcción final
        mainRow.append(icon, information, amount, menu);
        card.appendChild(mainRow);
        expensesList.appendChild(card);
    });
}


function startEditingExpense(expense) {
    // Identificar el gasto que se editará
    editingExpenseId.value = expense.id;

    // Cargar los datos actuales
    document.getElementById("description").value =
        expense.description;

    document.getElementById("amount").value =
        expense.amount;

    categorySelect.value = String(expense.category_id);

    expenseDate.value = expense.expense_date;

    // Cambiar el formulario a modo edición
    saveExpenseButton.textContent = "Guardar cambios";
    cancelEditButton.hidden = false;

    showMessage(
        "Editando gasto. Modifica los campos necesarios."
    );

    // Abrir la ventana emergente
    openExpenseModal();
}


function cancelEditingExpense() {
    editingExpenseId.value = "";
    expenseForm.reset();

    expenseDate.value = getLocalDate();

    saveExpenseButton.textContent = "Guardar gasto";
    cancelEditButton.hidden = true;

    showMessage("");
}

cancelEditButton.addEventListener("click", cancelEditingExpense);

expenseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentUser) {
        showMessage("Tu sesión no está disponible.", true);
        return;
    }

    const description = document
        .getElementById("description")
        .value.trim();

    const amount = Number(
        document.getElementById("amount").value
    );

    const categoryId = categorySelect.value;
    const date = expenseDate.value;

    
const validation = {
    description,
    descriptionValid: Boolean(description) && description.length <= 100,
    amount,
    amountValid:
        Number.isFinite(amount) &&
        amount > 0 &&
        amount <= 999999999,
    categoryId,
    categoryFound: categories.some(
        (category) => String(category.id) === String(categoryId)
    ),
    date,
    dateValid: Boolean(date)
};

console.log("Diagnóstico del gasto:", validation);

if (
    !validation.descriptionValid ||
    !validation.amountValid ||
    !categoryId ||
    !validation.categoryFound ||
    !validation.dateValid
) {
    showMessage("Revisa los datos del gasto.", true);
    return;
}


    if (date > getLocalDate()) {
        showMessage("La fecha no puede ser futura.", true);
        return;
    }

    saveExpenseButton.disabled = true;
    showMessage("Guardando gasto...");

    try {
        
        const expenseData = {
            user_id: currentUser.id,
            category_id: categoryId,
            description: description,
            amount: amount,
            expense_date: date
        };
  
        const expenseId = editingExpenseId.value;

        let query;

        if (expenseId) {
            query = supabaseClient
                .from("expenses")
                .update({
                    category_id: categoryId,
                    description: description,
                    amount: amount,
                    expense_date: date
                })
                .eq("id", expenseId)
                .eq("user_id", currentUser.id);
        } else {
            query = supabaseClient
                .from("expenses")
                .insert(expenseData);
        }

        const { data, error } = await query.select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            throw new Error(
                "No se modificó ningún gasto. Revisa los permisos RLS."
            );
        }

        if (expenseId) {
            showMessage("¡Gasto actualizado correctamente!");
        } else {
            showMessage("¡Gasto registrado correctamente!");
        }

        cancelEditingExpense();

        await loadExpenses();

    } catch (error) {
        console.error("Error al guardar el gasto:", error);
        showMessage(
            "No se pudo guardar el gasto. Revisa la consola.",
            true
        );
    } finally {
        saveExpenseButton.disabled = false;
    }
});

logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error);
        logoutButton.disabled = false;
        return;
    }

    window.location.replace("index.html");
});

async function initializeDashboard() {
    expenseDate.value = getLocalDate();

    try {
        const authenticated = await checkSession();

        if (!authenticated) {
            return;
        }

        await loadCategories();
        await loadExpenses();
        await loadBudget();
    } catch (error) {
        console.error("Error al iniciar el panel:", error);
        showMessage(error.message, true);
        expensesList.textContent =
            "No se pudieron cargar los movimientos.";
    }
}

initializeDashboard();


clearFiltersButton.addEventListener("click", () => {
    searchExpense.value = "";
    filterCategory.value = "";
    startDate.value = "";
    endDate.value = "";

    renderExpenses();
});

historyMonth.value = selectedMonth;

historyMonth.addEventListener("change", async () => {
    if (!historyMonth.value) {
        return;
    }

    selectedMonth = historyMonth.value;

    try {
        await loadBudget();
        renderDashboardStats();
    } catch (error) {
        console.error(
            "Error al consultar el historial:",
            error
        );
    }
});

currentMonthButton.addEventListener("click", async () => {
    selectedMonth = getLocalDate().slice(0, 7);

    historyMonth.value = selectedMonth;

    try {
        await loadBudget();
        renderDashboardStats();
    } catch (error) {
        console.error(
            "Error al regresar al mes actual:",
            error
        );
    }
});

async function loadBudgetHistory() {
    const budgetHistory = document.getElementById("budgetHistory");

    if (!budgetHistory) return;

    budgetHistory.innerHTML = "<p>Cargando historial...</p>";

    try {
        const { data: budgets, error } = await supabaseClient
            .from("budgets")
            .select("id, month, amount_limit")
            .eq("user_id", currentUser.id)
            .order("month", { ascending: false });

        if (error) throw error;

        if (!budgets || budgets.length === 0) {
            budgetHistory.innerHTML =
                "<p>Aún no tienes presupuestos registrados.</p>";
            return;
        }

        budgetHistory.innerHTML = "";

        budgets.forEach(budget => {
            const month = budget.month.slice(0, 7);

            const monthlyExpenses = allExpenses.filter(expense =>
                expense.expense_date.slice(0, 7) === month
            );

            const totalSpent = monthlyExpenses.reduce(
                (total, expense) => total + Number(expense.amount),
                0
            );

            const budgetLimit = Number(budget.amount_limit);
            const remaining = budgetLimit - totalSpent;

            const percentage = budgetLimit > 0
                ? (totalSpent / budgetLimit) * 100
                : 0;

            const monthName = new Date(
                Number(month.slice(0, 4)),
                Number(month.slice(5, 7)) - 1,
                1
            ).toLocaleDateString("es-MX", {
                month: "long",
                year: "numeric"
            });

            const card = document.createElement("div");
            card.className = "budget-history-card";

            const statusText = remaining >= 0
                ? `Restante: $${remaining.toFixed(2)}`
                : `Excedido: $${Math.abs(remaining).toFixed(2)}`;

            card.innerHTML = `
                <h3>${monthName}</h3>
                <p>Presupuesto: $${budgetLimit.toFixed(2)}</p>
                <p>Total gastado: $${totalSpent.toFixed(2)}</p>
                <p>${statusText}</p>
                <p>Utilizado: ${percentage.toFixed(1)}%</p>
                <div class="budget-history-track">
                    <div class="budget-history-bar"
                         style="width: ${Math.min(percentage, 100)}%">
                    </div>
                </div>
            `;

            budgetHistory.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar el historial:", error);
        budgetHistory.innerHTML =
            "<p>No fue posible cargar el historial de presupuestos.</p>";
    }
}


// ======================================
// NAVEGACIÓN PRINCIPAL DE SPENDWISE
// ======================================

const navigationItems = document.querySelectorAll(".nav-item");
const appViews = document.querySelectorAll(".app-view");

function showView(viewId) {
    appViews.forEach(view => {
        const isActive = view.id === viewId;

        view.hidden = !isActive;
        view.classList.toggle("active-view", isActive);
    });

    navigationItems.forEach(item => {
        const isActive = item.dataset.view === viewId;

        item.classList.toggle("active", isActive);
    });

    // Mostrar el botón + excepto en Perfil
    const expenseButton = document.getElementById("addExpenseButton");

    if (expenseButton) {
        expenseButton.classList.toggle(
            "hide-add-button",
            viewId === "profileView"
        );
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navigationItems.forEach(item => {
    item.addEventListener("click", () => {
        showView(item.dataset.view);
    });
});

// Botones que llevan a otras secciones
document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        showView(button.dataset.go);
    });
});


// ======================================
// FORMULARIO FLOTANTE DE GASTOS
// ======================================

const expenseModal = document.getElementById("expenseModal");
const addExpenseButton = document.getElementById("addExpenseButton");
const closeExpenseModal = document.getElementById("closeExpenseModal");

function openExpenseModal() {
    expenseModal.hidden = false;
}

function closeExpenseModalWindow() {
    expenseModal.hidden = true;
    cancelEditingExpense();
}

addExpenseButton.addEventListener("click", () => {
    cancelEditingExpense();
    openExpenseModal();
});

closeExpenseModal.addEventListener("click", () => {
    closeExpenseModalWindow();
});

// Cerrar al pulsar fuera del formulario
expenseModal.addEventListener("click", event => {
    if (event.target === expenseModal) {
        closeExpenseModalWindow();
    }
});

// ======================================
// INFORMACIÓN DEL PERFIL
// ======================================

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileLogoutButton = document.getElementById("profileLogoutButton");

function renderProfile() {
    if (!currentUser) return;

    profileName.textContent =
        currentUser.user_metadata?.full_name || "Usuario SpendWise";

    profileEmail.textContent =
        currentUser.email || "";
}

profileLogoutButton.addEventListener("click", () => {
    logoutButton.click();
});


// ======================================
// PANEL DE FILTROS DEL HISTORIAL
// ======================================

const filterPanel = document.getElementById("filterPanel");

const openFiltersButton =
    document.getElementById("openFiltersButton");

const closeFiltersButton =
    document.getElementById("closeFiltersButton");

const applyFiltersButton =
    document.getElementById("applyFiltersButton");

// Abrir los filtros
function openFilterPanel() {
    filterPanel.hidden = false;

    openFiltersButton.setAttribute(
        "aria-expanded",
        "true"
    );

    closeFiltersButton.focus();
}

// Cerrar los filtros
function closeFilterPanel() {
    filterPanel.hidden = true;

    openFiltersButton.setAttribute(
        "aria-expanded",
        "false"
    );

    openFiltersButton.focus();
}

// Abrir al pulsar el botón
openFiltersButton.addEventListener(
    "click",
    openFilterPanel
);

// Cerrar al pulsar la X
closeFiltersButton.addEventListener(
    "click",
    closeFilterPanel
);

// Aplicar filtros y cerrar
applyFiltersButton.addEventListener("click", () => {
    renderExpenses();
    closeFilterPanel();
});

// Cerrar al pulsar fuera de la ventana
filterPanel.addEventListener("click", (event) => {
    if (event.target === filterPanel) {
        closeFilterPanel();
    }
});

// Cerrar con Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !filterPanel.hidden) {
        closeFilterPanel();
    }
});

// Cerrar menús de gastos al pulsar fuera
document.addEventListener("click", (event) => {
    document.querySelectorAll(
        "#expensesList .expense-menu[open]"
    ).forEach(menu => {
        if (!menu.contains(event.target)) {
            menu.open = false;
        }
    });
});

// Cerrar menús con Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(
            "#expensesList .expense-menu[open]"
        ).forEach(menu => {
            menu.open = false;
        });
    }
});

