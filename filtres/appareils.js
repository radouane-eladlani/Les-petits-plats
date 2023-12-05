
    function updateApplianceList(recipes) {
        const applianceListContainer = document.querySelector('.appliance-list');
        applianceListContainer.innerHTML = "";
    
        const allAppliances = new Set();
    
        recipes.forEach(recipe => {
            allAppliances.add(recipe.appliance.toLowerCase());
        });
    
        allAppliances.forEach(appliance => {
            const applianceItem = document.createElement('div');
            applianceItem.textContent = appliance;
            applianceItem.addEventListener('click', function () {
                const searchInput = this.closest('.search-container').querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = appliance;
                    resetRecipeList();
                }
            });
    
            applianceListContainer.appendChild(applianceItem);
        });
    }



