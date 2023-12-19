function toggleMenu(button) {
    const dropdownContent = button.nextElementSibling;
    dropdownContent.classList.toggle('active');
    button.querySelector('.chevron').classList.toggle('rotate');
}

const chevrons = document.querySelectorAll('.chevron');
chevrons.forEach((chevron) => {
    chevron.addEventListener('click', function (event) {
        const button = event.target.closest('.btn-dropdown');
        if (button) {
            toggleMenu(button);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const clearSearchButtons = document.querySelectorAll('.clearSearch');

    clearSearchButtons.forEach(function (clearSearchButton) {
        clearSearchButton.addEventListener('click', function () {
            const searchContainer = clearSearchButton.closest('.search-container, .search-container-filter');
            if (searchContainer) {
                const searchInputs = searchContainer.querySelectorAll('.search-input-ingredient, .search-input-appareil, .search-input-ustensile, .searchHeader');
                searchInputs.forEach(function (searchInput) {
                    searchInput.value = "";
                });
                resetRecipeList();
            }
        });
    });

    const searchInputs = document.querySelectorAll('.search-input-ingredient, .search-input-appareil, .search-input-ustensile, .searchHeader');

    searchInputs.forEach(function (searchInput) {
        searchInput.addEventListener('input', function () {
            const inputValue = this.value.trim().toLowerCase();

            if (inputValue.length === 0) {
                resetRecipeList();
            }
        });
    });
});

function resetRecipeList() {
    recipesSection.innerHTML = "";
    document.getElementById("nombreRecettes").innerHTML = recipes.length;

    recipes.forEach(recipe => {
        const recipeElement = createCartRecipe(recipe);
        recipesSection.appendChild(recipeElement);
    });

    updateUstensilList(recipes);
    updateIngredientList(recipes);
    updateApplianceList(recipes);
}