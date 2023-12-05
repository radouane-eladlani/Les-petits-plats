
    function updateIngredientList() {
        
        const ingredientListSelect = document.querySelector('.ingredient-list');
        ingredientListSelect.innerHTML = ""; 
    
        const allIngredients = new Set();
    
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient.ingredient.toLowerCase());
            });
        });
    
        allIngredients.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient;
            option.textContent = ingredient;
    
            ingredientListSelect.appendChild(option);
        });
    }

