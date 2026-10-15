
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
            (item) => String(item.id) === String(expense.category_id)
        );

        const card = document.createElement("article");
        card.className = "expense-item";

        const description = document.createElement("h3");
        description.textContent = expense.description;

        const categoryText = document.createElement("p");
        categoryText.textContent =
            `Categoría: ${category?.name || "Sin categoría"}`;

        const dateText = document.createElement("p");
        dateText.textContent = `Fecha: ${expense.expense_date}`;

        const amountText = document.createElement("strong");
        amountText.textContent = formatCurrency(expense.amount);

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Editar";
        editButton.className = "edit-expense-button";

        editButton.addEventListener("click", () => {
            startEditingExpense(expense);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-expense-button";

        deleteButton.addEventListener("click", async () => {
            await deleteExpense(expense.id);
        });

        card.append(
            description,
            categoryText,
            dateText,
            amountText,
            editButton,
            deleteButton
        );

        expensesList.appendChild(card);
    });
}

function startEditingExpense(expense) {
    editingExpenseId.value = expense.id;

    document.getElementById("description").value =
        expense.description;

    document.getElementById("amount").value =
        expense.amount;

    categorySelect.value = String(expense.category_id);

    expenseDate.value = expense.expense_date;

    saveExpenseButton.textContent = "Guardar cambios";
    cancelEditButton.hidden = false;

    showMessage("Editando gasto. Modifica los campos necesarios.");

    expenseForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
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
    } catch (error) {
        console.error("Error al iniciar el panel:", error);
        showMessage(error.message, true);
        expensesList.textContent =
            "No se pudieron cargar los movimientos.";
    }
}

initializeDashboard();


searchExpense.addEventListener("input", renderExpenses);
filterCategory.addEventListener("change", renderExpenses);
startDate.addEventListener("change", renderExpenses);
endDate.addEventListener("change", renderExpenses);

clearFiltersButton.addEventListener("click", () => {
    searchExpense.value = "";
    filterCategory.value = "";
    startDate.value = "";
    endDate.value = "";

    renderExpenses();
});
