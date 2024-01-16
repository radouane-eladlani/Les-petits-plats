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

    const filterInputs = document.querySelectorAll('.search-input-ingredient, .search-input-appareil, .search-input-ustensile');

    filterInputs.forEach(function (filterInput) {
        const searchContainer = filterInput.closest('.search-container-filter');
        const clearIcon = searchContainer.querySelector('.search-icons .fa-times');
        const searchIcon = searchContainer.querySelector('.search-icons .fa-search');

        filterInput.addEventListener('input', function () {
            const inputValue = this.value.trim().toLowerCase();

            if (inputValue.length > 0) {
                showClearIcon(clearIcon);
            } else {
                hideClearIcon(clearIcon);
            }
        });

        clearIcon.addEventListener('click', function () {
            filterInput.value = "";
            hideClearIcon(clearIcon);
            showSearchIcon(searchIcon);
            resetFilterList();
        });

        showSearchIcon(searchIcon);
        hideClearIcon(clearIcon);
    });
});

function showClearIcon(clearIcon) {
    clearIcon.style.display = 'inline';
}

function hideClearIcon(clearIcon) {
    const isFilterIcon = clearIcon.closest('.search-container-filter') !== null;

    if (isFilterIcon) {
        clearIcon.style.display = 'none';
    }
}

function showSearchIcon(searchIcon) {
    if (searchIcon) {
        searchIcon.style.display = 'inline';
    }
}

function resetRecipeList() {
    filterRecipesByfilters();
}
function resetFilterList() {
    updateUstensilList(recipes);
    updateIngredientList(recipes);
    updateApplianceList(recipes);
}