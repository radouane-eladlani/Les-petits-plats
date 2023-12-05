let recipes = [];
const recipesSection = document.querySelector('.bagrndcarte');

//fetch pour récupérer les données JSON du fichier
fetch('data/recipes.json')
    .then(response => response.json())
    .then(jsonData => {
        recipes = jsonData
        document.getElementById("nombreRecettes").innerHTML = recipes.length
        // Parcoure chaque recette dans le fichier JSON
        jsonData.forEach(recipe => {
            const recipeElement = createCartRecipe(recipe);
            recipesSection.appendChild(recipeElement);
        }); 
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));

    

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
                (recipe.ingredient && recipe.ingredient.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) ||
                descriptionEnMinuscules.includes(input)
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

