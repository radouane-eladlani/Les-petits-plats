document.addEventListener('DOMContentLoaded', function () {
    let recipes = [];

    fetch('data/recipes.json')
        .then(response => response.json())
        .then(jsonData => {
            recipes = jsonData;
            document.getElementById("nombreRecettes").innerHTML = recipes.length;

            // Parcourir chaque recette dans le fichier JSON
            jsonData.forEach(recipe => {
                const recipeElement = createCartRecipe(recipe);
                recipesSection.appendChild(recipeElement);
            });

            // Appeler les fonctions pour mettre à jour les listes
            updateIngredientList(recipes);
            updateApplianceList(recipes);
            updateUtensilList(recipes);
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
});