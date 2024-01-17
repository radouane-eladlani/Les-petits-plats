const allIngredients = new Set();
const allUstensiles = new Set();
const allAppareils = new Set();
const selectedIngredients = new Set();
const selectedAppliances = new Set();
const selectedUstensils = new Set();
let originalIngredientList = [];
let originalApplianceList = [];
let originalUstensilList = [];

document.querySelector('.search-input-ingredient').addEventListener('input', () => {
    updateIngredientList(filterRecipes);
});
document.querySelector('.search-input-ustensile').addEventListener('input', () => {
    updateUstensilList(filterRecipes);
});
document.querySelector('.search-input-appareil').addEventListener('input', () => {
    updateApplianceList(filterRecipes);
});

function updateIngredientList(recipes) {
    const ingredientListSelect = document.querySelector('.ingredient-list');
    const searchInput = document.querySelector('.search-input-ingredient');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionIngredientDiv = document.querySelector('.selection-ingredient');
    selectionIngredientDiv.innerHTML = "";
    ingredientListSelect.innerHTML = "";
    allIngredients.clear();

    for (let ingredient of selectedIngredients) {
        let ingredientItem = document.createElement('div');
        ingredientItem.classList.add('ingredient-item');
        let ingredientText = document.createElement('p');
        ingredientText.textContent = ingredient;
        ingredientItem.classList.add('selected-yellow');
        ingredientItem.classList.add('filter-option-style');
        ingredientItem.appendChild(ingredientText);
        let removeButton = createRemoveButton();
        ingredientItem.appendChild(removeButton);

        let selectedIngredientItem = createSelectedIngredientItem(ingredient);
        selectionIngredientDiv.appendChild(selectedIngredientItem);

        ingredientListSelect.appendChild(ingredientItem);

        toggleOnIngredient(ingredient, ingredientItem);
    }

    // Récupérer tous les ingrédients
    for (let i = 0; i < recipes.length; i++) {
        let ingredients = recipes[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            let ingredient = ingredients[j];
            if (!selectedIngredients.has(ingredient.ingredient.toLowerCase())) {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                allIngredients.add(lowerCaseIngredient);
            }
        }
    }

    for (const ingredient of allIngredients) {
        if (ingredient.includes(searchKeyword)) {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('ingredient-item');
            const ingredientText = document.createElement('p');
            ingredientText.textContent = ingredient;
            ingredientItem.appendChild(ingredientText);

            toggleOnIngredient(ingredient, ingredientItem);

            ingredientItem.classList.add('filter-option-style');
            ingredientListSelect.appendChild(ingredientItem);

        }
    }
    if (originalIngredientList.length === 0) {
        originalIngredientList = Array.from(ingredientListSelect.children);
    }

}

function toggleOnIngredient(ingredient, ingredientItem) {

    ingredientItem.addEventListener('click', () => {
        const isAlreadySelected = selectedIngredients.has(ingredient);

        if (isAlreadySelected) {
            selectedIngredients.delete(ingredient);
        } else {
            selectedIngredients.add(ingredient);
        }
        filterRecipesByfilters();
    });
}

function createSelectedIngredientItem(ingredient) {
    const selectedIngredientItem = document.createElement('div');
    selectedIngredientItem.classList.add('selected-item');

    const selectedIngredientText = document.createElement('p');
    selectedIngredientText.textContent = ingredient;
    selectedIngredientItem.appendChild(selectedIngredientText);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'x';
    removeButton.style.background = "none";
    removeButton.style.border = "none";
    removeButton.style.fontSize = "large";
    removeButton.addEventListener('click', () => {
        selectedIngredients.delete(ingredient);
        filterRecipesByfilters();
    });
    selectedIngredientItem.appendChild(removeButton);

    return selectedIngredientItem;
}

function updateUstensilList(recipes) {
    const ustensilListSelect = document.querySelector('.utensil-list');
    const searchInput = document.querySelector('.search-input-ustensile');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionUstensilDiv = document.querySelector('.selection-ustensil');
    selectionUstensilDiv.innerHTML = "";

    ustensilListSelect.innerHTML = "";
    allUstensiles.clear();

    for (let ustensil of selectedUstensils) {
        let ustensilItem = document.createElement('div');
        ustensilItem.classList.add('ustensil-item');
        let ustensilText = document.createElement('p');
        ustensilText.textContent = ustensil;
        ustensilItem.classList.add('selected-yellow');
        ustensilItem.classList.add('filter-option-style');
        ustensilItem.appendChild(ustensilText);
        let removeButton = createRemoveButton();
        ustensilItem.appendChild(removeButton);

        let selectedUstensilItem = createSelectedUstensilItem(ustensil);
        selectionUstensilDiv.appendChild(selectedUstensilItem);

        ustensilListSelect.appendChild(ustensilItem);

        toggleOnUstensil(ustensil, ustensilItem);
    }


    for (let i = 0; i < recipes.length; i++) {
        let ustensils = recipes[i].ustensils;
        for (let j = 0; j < ustensils.length; j++) {
            let ustensil = ustensils[j];
            if (!selectedUstensils.has(ustensil.toLowerCase())) {
                const lowerCaseUstensil = ustensil.toLowerCase();
                allUstensiles.add(lowerCaseUstensil);
            }
        }
    }
    for (let ustensil of allUstensiles) {
        if (ustensil.includes(searchKeyword)) {
            let ustensilItem = document.createElement('div');
            ustensilItem.classList.add('ustensil-item');
            let ustensilText = document.createElement('p');
            ustensilText.textContent = ustensil;
            ustensilItem.appendChild(ustensilText);

            toggleOnUstensil(ustensil, ustensilItem);

            ustensilItem.classList.add('filter-option-style');
            ustensilListSelect.appendChild(ustensilItem);
        }
    }
    if (originalUstensilList.length === 0) {
        originalUstensilList = Array.from(ustensilListSelect.children);
    }
}

function toggleOnUstensil(ustensil, utensilItem) {
    utensilItem.addEventListener('click', () => {
        const isAlreadySelected = selectedUstensils.has(ustensil);

        if (isAlreadySelected) {
            selectedUstensils.delete(ustensil);
        } else {
            selectedUstensils.add(ustensil);
        }

        filterRecipesByfilters();
    });
}

function createSelectedUstensilItem(ustensil) {
    const selectedUstensilItem = document.createElement('div');
    selectedUstensilItem.classList.add('selected-item');

    const selectedUstensilText = document.createElement('p');
    selectedUstensilText.textContent = ustensil;
    selectedUstensilItem.appendChild(selectedUstensilText);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'x';
    removeButton.style.background = "none";
    removeButton.style.border = "none";
    removeButton.style.fontSize = "large";
    removeButton.addEventListener('click', () => {
        selectedUstensils.delete(ustensil);
        filterRecipesByfilters();
    });
    selectedUstensilItem.appendChild(removeButton);

    return selectedUstensilItem;
}
function updateApplianceList(recipes) {
    const applianceListSelect = document.querySelector('.appliance-list');
    const searchInput = document.querySelector('.search-input-appareil');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionApplianceDiv = document.querySelector('.selection-appliance');
    selectionApplianceDiv.innerHTML = "";
    applianceListSelect.innerHTML = "";
    allAppareils.clear();

    for (let appliance of selectedAppliances) {
        let applianceItem = document.createElement('div');
        applianceItem.classList.add('appliance-item');
        let applianceText = document.createElement('p');
        applianceText.textContent = appliance;
        applianceItem.classList.add('selected-yellow');
        applianceItem.classList.add('filter-option-style');
        applianceItem.appendChild(applianceText);
        let removeButton = createRemoveButton();
        applianceItem.appendChild(removeButton);

        let selectedApplianceItem = createSelectedApplianceItem(appliance);
        selectionApplianceDiv.appendChild(selectedApplianceItem);

        applianceListSelect.appendChild(applianceItem);

        toggleOnAppliance(appliance, applianceItem);
    }

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let recipeAppliance = recipe.appliance.toLowerCase();
        if (!selectedAppliances.has(recipeAppliance)) {
            allAppareils.add(recipeAppliance);
        }
    }

    for (const appliance of allAppareils) {
        if (appliance.includes(searchKeyword)) {
            const applianceItem = document.createElement('div');
            applianceItem.classList.add('appliance-item');
            const applianceText = document.createElement('p');
            applianceText.textContent = appliance;
            applianceItem.appendChild(applianceText);

            toggleOnAppliance(appliance, applianceItem);

            applianceItem.classList.add('filter-option-style');
            applianceListSelect.appendChild(applianceItem);
        }
    }
    if (originalApplianceList.length === 0) {
        originalApplianceList = Array.from(applianceListSelect.children);
    }
}


function toggleOnAppliance(appliance, applianceItem) {
    applianceItem.addEventListener('click', () => {
        const isAlreadySelected = selectedAppliances.has(appliance);

        if (isAlreadySelected) {
            selectedAppliances.delete(appliance);
        } else {
            selectedAppliances.add(appliance);
        }

        filterRecipesByfilters();

    });
}

function createSelectedApplianceItem(appliance) {
    const selectedApplianceItem = document.createElement('div');
    selectedApplianceItem.classList.add('selected-item');

    const selectedApplianceText = document.createElement('p');
    selectedApplianceText.textContent = appliance;
    selectedApplianceItem.appendChild(selectedApplianceText);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'x';
    removeButton.style.background = "none";
    removeButton.style.border = "none";
    removeButton.style.fontSize = "large";
    removeButton.addEventListener('click', () => {
        selectedAppliances.delete(appliance);
        filterRecipesByfilters();
    });
    selectedApplianceItem.appendChild(removeButton);

    return selectedApplianceItem;
}

function createRemoveButton() {
    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-button-selected');

    removeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
            </svg>
        `;
    return removeButton;
}

function filterRecipesByfilters() {
    const input = document.getElementById("recherche").value.trim().toLowerCase();
    let recettesCorrespondantes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const nomEnMinuscules = recipe.name.toLowerCase();
        const descriptionEnMinuscules = recipe.description.toLowerCase();

        if (
            nomEnMinuscules.includes(input) ||
            (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) ||
            descriptionEnMinuscules.includes(input)
        ) {
            recettesCorrespondantes.push(recipe);
        }
    }
    const filteredRecipes = recettesCorrespondantes.filter(recipe => {
        return (
            recipeContainsAllIngredients(recipe) &&
            recipeContainsAllUstensils(recipe) &&
            recipeContainsAllAppliances(recipe)
        );
    });
    filterRecipes = filteredRecipes;
    updateRecipes(filteredRecipes);
}
function recipeContainsAllIngredients(recipe) {
    let i = 0;
    selectedIngredients.forEach(ingredient => {
        recipe.ingredients.forEach(ingredientrecipe => {
            if (ingredientrecipe.ingredient.toLowerCase() === ingredient.toLowerCase()) {
                i++
            }
        });
    })
    return i === selectedIngredients.size;
}
function recipeContainsAllUstensils(recipe) {
    let i = 0;
    selectedUstensils.forEach(ustensil => {
        recipe.ustensils.forEach(ustensilrecipe => {
            if (ustensilrecipe.toLowerCase() === ustensil.toLowerCase()) {
                i++
            }
        });
    });
    return i === selectedUstensils.size;
}
function recipeContainsAllAppliances(recipe) {
    let i = 0;
    selectedAppliances.forEach(appliance => {
        if (recipe.appliance.toLowerCase() === appliance.toLowerCase()) {
            i++
        }
    });
    return i === selectedAppliances.size;
}

function updateRecipes(filteredRecipes) {
    document.getElementById("nombreRecettes").innerHTML = filteredRecipes.length;
    recipesSection.innerHTML = "";

    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const elementRecette = createCartRecipe(recipe);
        recipesSection.appendChild(elementRecette);
    }
    updateIngredientList(filteredRecipes);
    updateApplianceList(filteredRecipes);
    updateUstensilList(filteredRecipes);
}

