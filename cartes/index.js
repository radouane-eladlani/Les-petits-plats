let recipes = [];
// eslint-disable-next-line no-unused-vars
let filterRecipes = [];
const recipesSection = document.querySelector('.bagrndcarte');

document.addEventListener('DOMContentLoaded', function () {
    fetch('data/recipes.json')
        .then(response => response.json())
        .then(jsonData => {
            recipes = jsonData;
            filterRecipes = recipes;
            document.getElementById("nombreRecettes").innerHTML = recipes.length

            // Parcourir chaque recette dans le fichier JSON
            for (let i = 0; i < jsonData.length; i++) {
                const recipe = jsonData[i];
                const recipeElement = createCartRecipe(recipe);
                recipesSection.appendChild(recipeElement);
            }

            // Appeler les fonctions pour mettre à jour les listes
            // eslint-disable-next-line no-undef
            updateIngredientList(recipes);
            // eslint-disable-next-line no-undef
            updateApplianceList(recipes);
            // eslint-disable-next-line no-undef
            updateUstensilList(recipes);
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));

});

document.querySelector(".search__button").addEventListener("click", function () {
    const input = document.getElementById("recherche").value.trim().toLowerCase();

    if (input.length < 3) {
        console.log("Veuillez saisir au moins 3 caractères pour la recherche.");
        return;
    }
    // eslint-disable-next-line no-undef
    filterRecipesByfilters();
});

function createCartRecipe(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-container');

    const ingredientsList = document.createElement('div');
    ingredientsList.classList.add('ingredients-list');

    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        const ingredientElement = document.createElement('div');

        const ingredientName = document.createElement('span');
        ingredientName.textContent = ingredient.ingredient;
        ingredientElement.appendChild(ingredientName);

        const quantityAndUnit = document.createElement('div');
        if (ingredient.quantity) {
            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = ingredient.quantity;
            quantityAndUnit.appendChild(quantitySpan);
        }
        if (ingredient.unit) {
            const unitSpan = document.createElement('span');
            unitSpan.textContent = ingredient.unit;
            quantityAndUnit.appendChild(unitSpan);
        }
        ingredientElement.appendChild(quantityAndUnit);

        ingredientsList.appendChild(ingredientElement);
    }

    recipeElement.innerHTML = `
        <div class="border">
            <img src="assets/photosRecettes/${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <span class="recipe-time">${recipe.time} min</span>
        </div>
        <div class="recipe-content">
            <h2>${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p>${recipe.description}</p>

            <h3>INGRÉDIENTS</h3>
            ${ingredientsList.outerHTML}
        </div>
    `;

    return recipeElement;
}