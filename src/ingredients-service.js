export default class IngredientsService {  
  static addIngredients(ingredients) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const ingredientsUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredients}&number=1`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, ingredients]);
        } else {
          reject([this, response, ingredients]);
        }
      });
      request.open("GET", ingredientsUrl, true);
      request.send();
    });
  }
}
