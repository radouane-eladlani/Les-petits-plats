
function updateUstensilList(recipes) {
    const utensilListContainer = document.querySelector('.utensil-list');
    utensilListContainer.innerHTML = "";
    let nombreUstensils = 0;
    document.getElementById("nombreRecettes").innerHTML = recipes.length;


    const allUtensils = new Set();

    recipes.forEach(recipe => {
        if (recipe.ustensils) {
            recipe.ustensils.forEach(ustensil => {
                const utensilName = ustensil.toLowerCase();
                    allUtensils.add(utensilName);
            });
            nombreUstensils++;
        }
    });
    document.getElementById("nombreRecettes").innerHTML = nombreUstensils;

    const searchInput = document.querySelector('.search-input-ustensile');
    const searchKeyword = searchInput.value.toLowerCase();

    allUtensils.forEach(ustensil => {
        if(ustensil.includes(searchKeyword)) {
        const utensilItem = document.createElement('p');
        utensilItem.textContent = ustensil;
        utensilItem.addEventListener('click', () => {
            filterRecipesByUstensil(ustensil, recipes);
        });
        utensilItem.classList.add('filter-option-style');
        utensilListContainer.appendChild(utensilItem);
        }
    });
}

updateUstensilList(recipes);

document.querySelector('.search-input-ustensile').addEventListener('input', () => {
    updateUstensilList(recipes);
});

function filterRecipesByUstensil(selectedUstensil, recipes) {
    let nombreRecettes = 0;

    const filteredRecipes = recipes.filter(recipe => {
        if (recipe.ustensils.some(ustensil => ustensil.toLowerCase() === selectedUstensil)) {
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
