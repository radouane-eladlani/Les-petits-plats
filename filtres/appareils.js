
    function updateApplianceList(recipes) {
        const applianceListContainer = document.querySelector('.appliance-list');
        applianceListContainer.innerHTML = "";
        let nombreAppliances = 0;
        document.getElementById("nombreRecettes").innerHTML = recipes.length;
    
        const allAppliances = new Set();
    
        recipes.forEach(recipe => {
            const applianceName = recipe.appliance.toLowerCase();
                allAppliances.add(applianceName);
            nombreAppliances++;
        });
        document.getElementById("nombreRecettes").innerHTML = nombreAppliances;

    const searchInput = document.querySelector('.search-input-appareil');
    const searchKeyword = searchInput.value.toLowerCase();

    
        allAppliances.forEach(appliance => {
            if(appliance.includes(searchKeyword)) {
            const applianceItem = document.createElement('p');
            applianceItem.textContent = appliance;
            applianceItem.addEventListener('click', function () {
                filterRecipesByAppliance(appliance, recipes);
            });
            applianceItem.classList.add('filter-option-style');
            applianceListContainer.appendChild(applianceItem);
        }
        });
    }

    updateApplianceList(recipes);

document.querySelector('.search-input-appareil').addEventListener('input', () => {
    updateApplianceList(recipes);
});

function filterRecipesByAppliance(selectedAppliance, recipes) {
    let nombreRecettes = 0;

    const filteredRecipes = recipes.filter(recipe => {
        if (recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()) {
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



