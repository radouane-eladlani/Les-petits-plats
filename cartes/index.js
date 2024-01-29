/*déclare la variable recipes et filterRecipes*/
let recipes = [];
let filterRecipes = [];
/*je recupere l'element du dom pour l'afficher*/
const recipesSection = document.querySelector('.bagrndcarte');
/* On fait une requête au fichier recipes.json ensuite on affiche les recettes */
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
/* je fais un addEventListener sur le bouton de recherche  avec une condition si il y a 
plus de 3 caracteres pour ensuite  filtrer les recettes */
document.querySelector(".search__button").addEventListener("click", function () {
    /* On recupere la valeur de l'input et on la met en minuscule */
    const input = document.getElementById("recherche").value.trim().toLowerCase();

    if (input.length < 3) {
        return;
    }
 filterRecipesByfilters();
});
/*Fonction pour creer les cartes des recettes */
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
            /* afficher les ingredients */
                ${recipe.ingredients.map(ingredient => `
                    <div>
                        <span>${ingredient.ingredient}</span>
                        <div>
                            ${ingredient.quantity ? `<span>${ingredient.quantity}</span>` : ''}
                            ${ingredient.unit ? `<span>${ingredient.unit}</span>` : ''}
                        </div>
                    </div>
                    /*ajouter un espace entre les ingredients */
                `).join('')}
            </div>
        </div>
    `;
    return recipeElement;
}