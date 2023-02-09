export default class RecipeService {  
  static getRecipe(recipeId) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, recipeId]);
        } else {
          reject([this, response, recipeId]);
        }
      });
      request.open("GET", recipeUrl, true);
      request.send();
    });
  }
}