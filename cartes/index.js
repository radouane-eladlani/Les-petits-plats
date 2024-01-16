let recipes = [];
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
            jsonData.forEach(recipe => {
                const recipeElement = createCartRecipe(recipe);
                recipesSection.appendChild(recipeElement);
            });

            // Appeler les fonctions pour mettre à jour les listes
            updateIngredientList(recipes);
            updateApplianceList(recipes);
            updateUstensilList(recipes);
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));

});

document.querySelector(".search__button").addEventListener("click", function () {
    const input = document.getElementById("recherche").value.trim().toLowerCase();

    if (input.length < 3) {
        return;
    }
 filterRecipesByfilters();
});

function createCartRecipe(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-container');

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
            <div class="ingredients-list">
                ${recipe.ingredients.map(ingredient => `
                    <div>
                        <span>${ingredient.ingredient}</span>
                        <div>
                            ${ingredient.quantity ? `<span>${ingredient.quantity}</span>` : ''}
                            ${ingredient.unit ? `<span>${ingredient.unit}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return recipeElement;
}