import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import IngredientsService from './ingredients-service.js';
import RecipeService from './recipe-service.js';


// Business Logic

function addIngredients(ingredients) {
  let ingredientsPromise = IngredientsService.addIngredients(ingredients);
  ingredientsPromise.then(function(ingredientDataArray) {
    let recipeId = ingredientDataArray[0][0].id;
    getRecipe(recipeId);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getRecipe(recipeId) {
  let recipePromise = RecipeService.getRecipe(recipeId);
  recipePromise.then(function(recipeDataArray) {
    let recipeTitle = recipeDataArray[0].title;
    let recipeURL = recipeDataArray[0].sourceUrl;
    printElements(recipeTitle, recipeURL);
  });

}

// UI Logic

function printElements(recipeTitle, recipeURL) {
  let recipeLink = document.createElement('a');
  recipeLink.innerText = `Try ${recipeTitle}.`;
  document.querySelector('#showResponse').append(recipeLink);
  recipeLink.setAttribute('href', recipeURL);
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the recipe data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ingredients = document.querySelector('#ingredients').value;
  document.querySelector('#ingredients').value = null;
  addIngredients(ingredients);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});