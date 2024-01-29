/* allIngredients new set pour l'ensemble des ingredients */
const allIngredients = new Set();
/* allUstensiles new set pour l'ensemble des appareils */
const allUstensiles = new Set();
/* allAppareils new set pour l'ensemble des ustensiles */
const allAppareils = new Set();
/* selectedIngredients new set pour l'ensemble des ingredients selectionnés */
const selectedIngredients = new Set();
/* selectedAppliances new set pour l'ensemble des appareils selectionnés */
const selectedAppliances = new Set();
/* selectedUstensils new set pour l'ensemble des ustensiles selectionnés */
const selectedUstensils = new Set();
/* declare une variable tableau qui contient ingredient */
let originalIngredientList = [];
/* declare une variable tableau qui contient appareil */
let originalApplianceList = [];
/* declare une variable tableau qui contient ustensile */
let originalUstensilList = [];

/* J'ajoute un écouteur d'évenement 'input' sur chaque champ de recherches (ingredient, ustensil et appareil) qui appele
leur fonctions chacune pour mettre à jour les données 'originalXXXList */
 document.querySelector('.search-input-ingredient').addEventListener('input', () => {
    updateIngredientList(filterRecipes);
});
document.querySelector('.search-input-ustensile').addEventListener('input', () => {
    updateUstensilList(filterRecipes);
});
document.querySelector('.search-input-appareil').addEventListener('input', () => {
    updateApplianceList(filterRecipes);
});

/* fonction updateIngredientList pour mettre à jour la liste des ingredients et 
aussi les filtres après la recherche de l'utilisateur */
function updateIngredientList(recipes) {
    const ingredientListSelect = document.querySelector('.ingredient-list');
    const searchInput = document.querySelector('.search-input-ingredient');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionIngredientDiv = document.querySelector('.selection-ingredient');
    selectionIngredientDiv.innerHTML = "";
    ingredientListSelect.innerHTML = "";
    /* allIngredients.clear vider l'ensemble des ingredients pour préparer la nouvelle liste d'ingredients */
    allIngredients.clear();
    /* forEach sur les ingredients selectionnés */
    selectedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.classList.add('ingredient-item');
        const ingredientText = document.createElement('p');
        ingredientText.textContent = ingredient;
        ingredientItem.classList.add('selected-yellow');
        ingredientItem.classList.add('filter-option-style');
        ingredientItem.appendChild(ingredientText);

        // créer un bouton pour les désélectionnés
        const removeButton = createRemoveButton();
        ingredientItem.appendChild(removeButton);

        const selectedIngredientItem = createSelectedIngredientItem(ingredient);
        selectionIngredientDiv.appendChild(selectedIngredientItem);

        ingredientListSelect.appendChild(ingredientItem);

        toggleOnIngredient(ingredient, ingredientItem);
    })

    // Récupérer tous les ingrédients
    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.forEach(ingredient => {
            // Si l'ingrédient de la recette n'est pas dans la liste d'ingrédients séléctionnés on l'ajoute dans les éléments à afficher normalement (sans surlignement)
            if (!selectedIngredients.has(ingredient.ingredient.toLowerCase())) {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                allIngredients.add(lowerCaseIngredient);
            }
        });
    });

    /* on fait une boucle for pour afficher les ingrédients en fontion de la recherche de l'utilisateur */
    for (const ingredient of allIngredients) {
        /* si la recherche de l'utilisateur correspond à l'ingrédient, on l'affiche dans la liste déroulante des ingrédients */
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
}

/* fonction toggleOnIngredient pour ajouter ou supprimer l'ingrédient de la liste des ingredients selectionnés au click sur l'ingrédient */
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

/* fonction createSelectedIngredientItem pour afficher l'ingrédient selectionné */
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
    //ajout de de l'évenement suppression on click
    removeButton.addEventListener('click', () => {
        selectedIngredients.delete(ingredient);
        filterRecipesByfilters();
    });
    selectedIngredientItem.appendChild(removeButton);

    return selectedIngredientItem;
}

/* fonction updateUstensilList pour mettre à jour la liste des ingredients et 
aussi les filtres après la recherche de l'utilisateur */
function updateUstensilList(recipes) {
    const ustensilListSelect = document.querySelector('.utensil-list');
    const searchInput = document.querySelector('.search-input-ustensile');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionUstensilDiv = document.querySelector('.selection-ustensil');
    selectionUstensilDiv.innerHTML = "";

    ustensilListSelect.innerHTML = "";
    /* allUstensiles.clear sert a effacer l'ensemble des ustensils */
    allUstensiles.clear();

    /* forEach sur les ustensils selectionnés et deselectionnés */
    selectedUstensils.forEach(ustensil => {
        const ustensilItem = document.createElement('div');
        ustensilItem.classList.add('ustensil-item');
        const ustensilText = document.createElement('p');
        ustensilText.textContent = ustensil;
        ustensilItem.classList.add('selected-yellow');
        ustensilItem.classList.add('filter-option-style');
        ustensilItem.appendChild(ustensilText);
        const removeButton = createRemoveButton();
        ustensilItem.appendChild(removeButton);

        const selectedUstensilItem = createSelectedUstensilItem(ustensil);
        selectionUstensilDiv.appendChild(selectedUstensilItem);

        ustensilListSelect.appendChild(ustensilItem);

        toggleOnUstensil(ustensil, ustensilItem);
    });
    /*on fait un forEach pour afficher tous les ustensils de la liste d'origine ensuite 
    si la recherche est faite on affiche seulement les ustensils qui contiennent la recherche de l'utilisateur */
    recipes.forEach(recipe => {
        let ustensils = recipe.ustensils;
        ustensils.forEach(ustensil => {
            if (!selectedUstensils.has(ustensil.toLowerCase())) {
                const lowerCaseUstensil = ustensil.toLowerCase();
                allUstensiles.add(lowerCaseUstensil);
            }
        });
    });
    /* on fait une boucle for pour afficher les ustensils qui contiennent la recherche de l'utilisateur */
    for (const ustensil of allUstensiles) {
            /* si l'ustensil contient la recherche de l'utilisateur on l'affiche dans la liste des ingredients */
        if (ustensil.includes(searchKeyword)) {
            const ustensilItem = document.createElement('div');
            ustensilItem.classList.add('ustensil-item');
            const ustensilText = document.createElement('p');
            ustensilText.textContent = ustensil;
            ustensilItem.appendChild(ustensilText);

            toggleOnUstensil(ustensil, ustensilItem);

            ustensilItem.classList.add('filter-option-style');
            ustensilListSelect.appendChild(ustensilItem);
        }
    }
}

/* fonction toggleOnUstensil pour ajouter ou supprimer ustensil de la liste des ustensiles selectionnés */
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

/* fonction createSelectedUstensilItem pour afficher l'ingrédient selectionné */
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

/* fonction updateApplianceList pour mettre à jour la liste des ingredients et 
aussi les filtres après la recherche de l'utilisateur */
function updateApplianceList(recipes) {
    const applianceListSelect = document.querySelector('.appliance-list');
    const searchInput = document.querySelector('.search-input-appareil');
    const searchKeyword = searchInput.value.toLowerCase();
    const selectionApplianceDiv = document.querySelector('.selection-appliance');
    selectionApplianceDiv.innerHTML = "";
    applianceListSelect.innerHTML = "";
    /* allAppareils.clear sert a effacer l'ensemble des appareils */
    allAppareils.clear();

        /* forEach sur les appareils selectionnés et deselectionnés */
    selectedAppliances.forEach(appliance => {
        const applianceItem = document.createElement('div');
        applianceItem.classList.add('appliance-item');
        const applianceText = document.createElement('p');
        applianceText.textContent = appliance;
        applianceItem.classList.add('selected-yellow');
        applianceItem.classList.add('filter-option-style');
        applianceItem.appendChild(applianceText);
        const removeButton = createRemoveButton();
        applianceItem.appendChild(removeButton);

        const selectedApplianceItem = createSelectedApplianceItem(appliance);
        selectionApplianceDiv.appendChild(selectedApplianceItem);

        applianceListSelect.appendChild(applianceItem);

        toggleOnAppliance(appliance, applianceItem);
    });
/* on fait une boucle forEach pour afficher les appareils */
    recipes.forEach(recipe => {
        const recipeAppliance = recipe.appliance.toLowerCase();
        if (!selectedAppliances.has(recipeAppliance)) {
            allAppareils.add(recipeAppliance);
        }
    });
    /* on fait une boucle for pour afficher les appareils qui contiennent la recherche de l'utilisateur */
    for (const appliance of allAppareils) {
        /* si appareil contient la recherche de l'utilisateur on l'affiche dans la liste des ingredients */
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
}

/* fonction toggleOnAppliance pour ajouter ou supprimer ustensil de la liste des ustensiles selectionnés */
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

/* fonction createSelectedapplianceItem pour afficher l'ingrédient selectionné */
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

/* fonction pour creer le bouton supprimer*/
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

/* fonction filterRecipesByfilters pour filtrer les recettes en fonction de la recherche de l'utilisateur */
function filterRecipesByfilters() {
    const input = document.getElementById("recherche").value.trim().toLowerCase();
    let recettesCorrespondantes = [];

    /* on fait une boucle sur les recettes et on regarde si la recette contient la recherche de l'utilisateur */
    recipes.forEach(recipe => {
        const nomEnMinuscules = recipe.name.toLowerCase();
        const descriptionEnMinuscules = recipe.description.toLowerCase();

        // si la recipe correspondant avec la recherche de l'utilisateur on l'ajoute a la liste des recettes pour etre 
        // filtrer plus tard avec les filtres de (ustensil, ingredient, appareil)
        if (nomEnMinuscules.includes(input) ||
            (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) ||
            descriptionEnMinuscules.includes(input)
        ) {
            recettesCorrespondantes.push(recipe);
        }
    });

    /* on filtre les recettes en fonction de la liste des ingredients, des ustensiles et des appareils */
    const filteredRecipes = recettesCorrespondantes.filter(recipe => {
        return (
            recipeContainsAllIngredients(recipe) &&
            recipeContainsAllUstensils(recipe) &&
            recipeContainsAllAppliances(recipe)
        );
    });
    filterRecipes = filteredRecipes;
    
    /* on met a jour la liste des recettes affichées */
    updateRecipes(filteredRecipes);
}

/* fonction sert a verifier si la recette contient tous les ingredients */
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

/* fonction sert a verifier si la recette contient tous les ingredients */
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

/* fonction sert a verifier si la recette contient tous les ingredients */
function recipeContainsAllAppliances(recipe) {
    let i = 0;
    selectedAppliances.forEach(appliance => {
        if (recipe.appliance.toLowerCase() === appliance.toLowerCase()) {
            i++
        }
    });
    return i === selectedAppliances.size;
}

/* fonction updateRecipes pour mettre à jour la liste des recettes affichées on utilise filterRecipes */
function updateRecipes(filteredRecipes) {
    document.getElementById("nombreRecettes").innerHTML = filteredRecipes.length;
    recipesSection.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        const elementRecette = createCartRecipe(recipe);
        recipesSection.appendChild(elementRecette);
    });

    updateIngredientList(filteredRecipes);
    updateApplianceList(filteredRecipes);
    updateUstensilList(filteredRecipes);
}

