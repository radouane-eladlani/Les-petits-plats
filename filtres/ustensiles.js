
function updateUtensilList(recipes) {
    const utensilListContainer = document.querySelector('.utensil-list');
    utensilListContainer.innerHTML = "";

    const allUtensils = new Set();

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
            allUtensils.add(utensil.toLowerCase());
        });
    });

    allUtensils.forEach(utensil => {
        const utensilItem = document.createElement('div');
        utensilItem.textContent = utensil;
        utensilItem.addEventListener('click', function () {
            const searchInput = this.closest('.search-container').querySelector('.search-input');
            if (searchInput) {
                searchInput.value = utensil;
                resetRecipeList();
            }
        });

        utensilListContainer.appendChild(utensilItem);
    });
}

