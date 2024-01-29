/* fonction pour ouvrir et fermer le menu de tri */
function toggleMenu(button) {
    const dropdownContent = button.nextElementSibling;
    dropdownContent.classList.toggle('active');
    button.querySelector('.chevron').classList.toggle('rotate');
}
/* fonction au clique on appel la fonction toggleMenu */
const chevrons = document.querySelectorAll('.chevron');
chevrons.forEach((chevron) => {
    chevron.addEventListener('click', function (event) {
        const button = event.target.closest('.btn-dropdown');
        if (button) {
            toggleMenu(button);
        }
    });
});

/* fonction pour vider l'input de recherche */
document.addEventListener('DOMContentLoaded', function () {
    const clearSearchButtons = document.querySelectorAll('.clearSearch');
/* on fait un forEach pour vider l'input de recherche */
    clearSearchButtons.forEach(function (clearSearchButton) {
        /* on ecoute l'evenement click sur le bouton de vider l'input de recherche */
        clearSearchButton.addEventListener('click', function () {
            const searchContainer = clearSearchButton.closest('.search-container, .search-container-filter');
            /*si on trouve le search-container on vide et on reset la liste des recettes
             ou search-container-filter on vide l'input de recherche */
            if (searchContainer) {
                const searchInput = searchContainer.querySelector('.searchHeader');

                if (searchInput) {
                    searchInput.value = "";
                    hideClearIcon(clearSearchButton);
                    showSearchIcon(searchContainer.querySelector('.fa-search'));
                }

                if (searchContainer.classList.contains('search-container')) {
                    resetRecipeList();
                }
            }
        });
    });
/* recuperation des input de recherche des filtres */
    const filterInputs = document.querySelectorAll('.search-input-ingredient, .search-input-appareil, .search-input-ustensile');
/* forEach pour chaque input de recherche */
    filterInputs.forEach(function (filterInput) {
        const searchContainer = filterInput.closest('.search-container-filter');
        const clearIcon = searchContainer.querySelector('.search-icons .fa-times');
        const searchIcon = searchContainer.querySelector('.search-icons .fa-search');
/* addEventListener sur l'input de recherche pour cacher et afficher le bouton x */
        filterInput.addEventListener('input', function () {
            const inputValue = this.value.trim().toLowerCase();

            if (inputValue.length > 0) {
                showClearIcon(clearIcon);
            } else {
                hideClearIcon(clearIcon);
            }
        });
/* addEventListener sur l'input de recherche et hideClearIcon 
pour cacher le bouton x et showSearchIcon pour afficher le bouton */
        clearIcon.addEventListener('click', function () {
            filterInput.value = "";
            hideClearIcon(clearIcon);
            showSearchIcon(searchIcon);
            /* on reset la liste des recettes */
            resetFilterList();
        });

        showSearchIcon(searchIcon);
        hideClearIcon(clearIcon);
    });
});

/* fonction pour afficher le bouton x */
function showClearIcon(clearIcon) {
    clearIcon.style.display = 'inline';
}
/* fonction pour cacher le bouton x */
function hideClearIcon(clearIcon) {
    const isFilterIcon = clearIcon.closest('.search-container-filter') !== null;

    if (isFilterIcon) {
        clearIcon.style.display = 'none';
    }
}
/* si searchIcon on affiche en display inline le bouton */
function showSearchIcon(searchIcon) {
    if (searchIcon) {
        searchIcon.style.display = 'inline';
    }
}
/* reset la liste des recettes */
function resetRecipeList() {
    filterRecipesByfilters();
}

/* reset la liste des filtres */
function resetFilterList() {
    updateUstensilList(recipes);
    updateIngredientList(recipes);
    updateApplianceList(recipes);
}