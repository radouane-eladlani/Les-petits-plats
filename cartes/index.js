let recipes = [];
const recipesSection = document.querySelector('.bagrndcarte');

document.addEventListener('DOMContentLoaded', function () {
    fetch('data/recipes.json')
        .then(response => response.json())
        .then(jsonData => {
            recipes = jsonData;
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
    const input = document.getElementById("recherche").value.toLowerCase();
    recipesSection.innerHTML = "";
    let nombre = 0;
    const recettesCorrespondantes = [];

    recipes.forEach(recipe => {
        const nomEnMinuscules = recipe.name.toLowerCase();
        const descriptionEnMinuscules = recipe.description.toLowerCase();

        if (
            nomEnMinuscules.includes(input) ||
            (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) ||
            (recipe.ustensils && recipe.ustensils.some(utensil => utensil.toLowerCase().includes(input))) ||
            descriptionEnMinuscules.includes(input) ||
            recipe.appliance.toLowerCase().includes(input)
        ) {
            recettesCorrespondantes.push(recipe);
            nombre++;
        }
    });

    document.getElementById("nombreRecettes").innerHTML = nombre;

    recettesCorrespondantes.forEach(recipe => {
        const elementRecette = createCartRecipe(recipe);
        recipesSection.appendChild(elementRecette);
    });

    updateIngredientList(recettesCorrespondantes);
    updateApplianceList(recettesCorrespondantes);
    updateUstensilList(recettesCorrespondantes);
});

function createCartRecipe(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-container');

    recipeElement.innerHTML = `
            <div class="border">
                <img src="assets/photosRecettes/${recipe.image}" alt="${recipe.name}" class="recipe-image">
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
    return recipeElement
}

