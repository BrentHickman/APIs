export default class RecipeService {  
  static getRecipes(ingredients) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredients}&number=2`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, ingredients]);
        } else {
          reject([this, response, ingredients]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
