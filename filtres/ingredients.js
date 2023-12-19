function updateIngredientList(recipes) {
    const ingredientListSelect = document.querySelector('.ingredient-list');
    ingredientListSelect.innerHTML = "";
    let nombreIngredients = 0;
    document.getElementById("nombreRecettes").innerHTML = recipes.length;

    const allIngredients = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
            allIngredients.add(lowerCaseIngredient);
        });
        nombreIngredients++;
    });

    document.getElementById("nombreRecettes").innerHTML = nombreIngredients;

    const searchInput = document.querySelector('.search-input-ingredient');
    const searchKeyword = searchInput.value.toLowerCase();


    allIngredients.forEach(ingredient => {
        if (ingredient.includes(searchKeyword)) {
            const ingredientItem = document.createElement('p');
            ingredientItem.textContent = ingredient;
            ingredientItem.addEventListener('click', () => {
                filterRecipesByIngredient(ingredient,recipes);
            });

            ingredientItem.classList.add('filter-option-style');
            ingredientListSelect.appendChild(ingredientItem);
        }
    });

}



updateIngredientList(recipes);

document.querySelector('.search-input-ingredient').addEventListener('input', () => {
    updateIngredientList(recipes);
});

function filterRecipesByIngredient(selectedIngredient, recipes) {
    let nombreRecettes = 0;

    const filteredRecipes = recipes.filter(recipe => {
        if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient))) {
            nombreRecettes++;
            return true;
        }
        return false;
    });

    updateRecipes(filteredRecipes);
    document.getElementById("nombreRecettes").innerHTML = nombreRecettes;
}


function updateRecipes(filteredRecipes) {
    recipesSection.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        const elementRecette = createCartRecipe(recipe);
        recipesSection.appendChild(elementRecette);
    });
}

function addSelectedIngredient(ingredient) {
    const selectedIngredientItem = document.createElement('div');
    selectedIngredientItem.classList.add('selected-ingredient-item');

    const ingredientText = document.createElement('span');
    ingredientText.textContent = ingredient;
    selectedIngredientItem.appendChild(ingredientText);

    const removeIcon = document.createElement('span');
    removeIcon.textContent = '✖';
    removeIcon.classList.add('remove-icon');
    removeIcon.addEventListener('click', () => {
        selectedIngredientsSection.removeChild(selectedIngredientItem);
        updateRecipesAfterRemove(); 
        updateIngredientList(recipes);
    });
    selectedIngredientItem.appendChild(removeIcon);

    selectedIngredientsSection.appendChild(selectedIngredientItem);
}

function updateRecipesAfterRemove() {
    const selectedIngredients = Array.from(document.querySelectorAll('.selected-ingredient-item span')).map(span => span.textContent);

    const filteredRecipes = recipes.filter(recipe => {
        return selectedIngredients.every(selectedIngredient =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase()))
        );
    });

    updateRecipes(filteredRecipes);
}
