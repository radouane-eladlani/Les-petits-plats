const allIngredients = new Set();
const allUstensiles = new Set();
const allAppareils = new Set();
const selectedIngredientsContainer = document.querySelector('.selected-ingredients-container');
const selectedIngredients = new Set();
const selectedAppliances = new Set();
const selectedUstensils = new Set();
let originalIngredientList = [];
let originalApplianceList = [];
let originalUstensilList = [];


function updateIngredientList(recipes) {
    const ingredientListSelect = document.querySelector('.ingredient-list');
    const searchInput = document.querySelector('.search-input-ingredient');
    const searchKeyword = searchInput.value.toLowerCase();

    ingredientListSelect.innerHTML = "";
    allIngredients.clear();

    // Récupérer tous les ingrédients
    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.forEach(ingredient => {
            const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
            allIngredients.add(lowerCaseIngredient);
        });
    });

    for (const ingredient of allIngredients) {
        if (ingredient.includes(searchKeyword)) {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('ingredient-item');
            const ingredientText = document.createElement('p');
            ingredientText.textContent = ingredient;
            ingredientItem.appendChild(ingredientText);

            ToggleOnIngredient(ingredient, ingredientItem, ingredientListSelect);

            ingredientItem.classList.add('filter-option-style');
            ingredientListSelect.appendChild(ingredientItem);
        }
    }
    if (originalIngredientList.length === 0) {
        originalIngredientList = Array.from(ingredientListSelect.children);
    }

}

function ToggleOnIngredient(ingredient, ingredientItem, ingredientListSelect) {
    ingredientItem.addEventListener('click', () => {
        if (!selectedIngredients.has(ingredient)) {
            ingredientItem.classList.add('selected-yellow');
            selectedIngredients.add(ingredient);
            const index = originalIngredientList.findIndex(ing => ing.innerText === ingredient);

            if (index !== -1) {
                ingredientListSelect.removeChild(originalIngredientList[index]);
                ingredientListSelect.insertBefore(ingredientItem, ingredientListSelect.firstChild);
                ingredientListSelect.scrollTop = 0;
            }
        } else {
            selectedIngredients.delete(ingredient);
            const index = originalIngredientList.findIndex(ing => ing.innerText === ingredient);

            if (index !== -1) {
                ingredientListSelect.removeChild(originalIngredientList[index]);
                ingredientListSelect.insertBefore(ingredientItem, originalIngredientList[index + 1]);
            }

            ingredientItem.classList.remove('selected-yellow');

        }
        filterRecipesByfilters(recipes);
    })
}

function updateUstensilList(recipes) {
    const utensilListSelect = document.querySelector('.utensil-list');
    const searchInput = document.querySelector('.search-input-ustensile');
    const searchKeyword = searchInput.value.toLowerCase();

    utensilListSelect.innerHTML = "";
    allUstensiles.clear();

    recipes.forEach(recipe => {
        if (recipe.ustensils) {
            recipe.ustensils.forEach(ustensil => {
                const utensilName = ustensil.toLowerCase();
                allUstensiles.add(utensilName);
            });
        }
    });

    for (const ustensils of allUstensiles) {
        if (ustensils.includes(searchKeyword)) {
            const utensilItem = document.createElement('div');
            utensilItem.classList.add('utensil-item');
            const utensilText = document.createElement('p');
            utensilText.textContent = ustensils;
            utensilItem.appendChild(utensilText);

            ToggleOnUstensil(ustensils, utensilItem, utensilListSelect);

            utensilItem.classList.add('filter-option-style');
            utensilListSelect.appendChild(utensilItem);
        }
    }
    if (originalUstensilList.length === 0) {
        originalUstensilList = Array.from(utensilListSelect.children);
    }
}

function ToggleOnUstensil(ustensils, utensilItem, utensilListSelect) {
    utensilItem.addEventListener('click', () => {
        if (!selectedUstensils.has(ustensils)) {
            utensilItem.classList.add('selected-yellow');
            selectedUstensils.add(ustensils);
            const index = originalUstensilList.findIndex(ust => ust.innerText === ustensils);

            if (index !== -1) {
                utensilListSelect.removeChild(originalUstensilList[index]);
                utensilListSelect.insertBefore(utensilItem, utensilListSelect.firstChild);
                utensilListSelect.scrollTop = 0;
            }
        } else {
            selectedUstensils.delete(ustensils);
            const index = originalUstensilList.findIndex(ust => ust.innerText === ustensils);

            if (index !== -1) {
                utensilListSelect.removeChild(originalUstensilList[index]);
                utensilListSelect.insertBefore(utensilItem, originalUstensilList[index + 1]);
            }
            
            utensilItem.classList.remove('selected-yellow');
        }
        filterRecipesByfilters(recipes);
    })
}
function updateApplianceList(recipes) {
    const applianceListSelect = document.querySelector('.appliance-list');
    const searchInput = document.querySelector('.search-input-appareil');
    const searchKeyword = searchInput.value.toLowerCase();

    applianceListSelect.innerHTML = "";
    allAppareils.clear();
    recipes.forEach(recipe => {
        const applianceName = recipe.appliance.toLowerCase();
        allAppareils.add(applianceName);
    });

    for (const appliance of allAppareils) {
        if (appliance.includes(searchKeyword)) {
            const applianceItem = document.createElement('div');
            applianceItem.classList.add('appliance-item');
            const applianceText = document.createElement('p');
            applianceText.textContent = appliance;
            applianceItem.appendChild(applianceText);

            ToggleOnAppliance(appliance, applianceItem, applianceListSelect);

            applianceItem.classList.add('filter-option-style');
            applianceListSelect.appendChild(applianceItem);
        }

    }
    if (originalApplianceList.length === 0) {
        originalApplianceList = Array.from(applianceListSelect.children);
    }
}

function ToggleOnAppliance(appliance, applianceItem, applianceListSelect) {
    applianceItem.addEventListener('click', () => {
        if (!selectedAppliances.has(appliance)) {
            applianceItem.classList.add('selected-yellow');
            selectedAppliances.add(appliance);
            const index = originalApplianceList.findIndex(app => app.innerText === appliance);

            if (index !== -1) {
                applianceListSelect.removeChild(originalApplianceList[index]);
                applianceListSelect.insertBefore(applianceItem, applianceListSelect.firstChild);
                applianceListSelect.scrollTop = 0;
            }
        } else {
            selectedAppliances.delete(appliance);
            const index = originalApplianceList.findIndex(app => app.innerText === appliance);

            if (index !== -1) {
                applianceListSelect.removeChild(originalApplianceList[index]);
                applianceListSelect.insertBefore(applianceItem, originalApplianceList[index + 1]);
            }

            applianceItem.classList.remove('selected-yellow');
        }
        filterRecipesByfilters(recipes);
    })
}
function createRemoveButton(clickHandler) {
    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-button-selected');

    removeButton.innerHTML = `
    <svg 
    xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
    </svg>
    `;

    removeButton.addEventListener('click', () => {
        removeButton.remove();
        clickHandler();
    });

    return removeButton;
}

document.querySelector('.search-input-ingredient').addEventListener('input', () => {
    updateIngredientList(recipes);
});

function filterRecipesByfilters(recipes) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipeContainesAllIngredients(recipe) && recipeContainsAllUstensils(recipe) && recipeContainsAllAppliances(recipe)
    });

    updateRecipes(filteredRecipes);
}
function recipeContainesAllIngredients(recipe) {
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
    let i = 0
    selectedAppliances.forEach(appliance => {
        if (recipe.appliance.toLowerCase() === appliance.toLowerCase()) {
            i++
        }
    })
    return i === selectedAppliances.size;
}
function updateRecipes(filteredRecipes) {
    document.getElementById("nombreRecettes").innerHTML = filteredRecipes.length;
    recipesSection.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        const elementRecette = createCartRecipe(recipe);
        recipesSection.appendChild(elementRecette);
    });
}

function updateRecipeCount(recipes) {
    document.getElementById("nombreRecettes").innerHTML = recipes.length;
}

