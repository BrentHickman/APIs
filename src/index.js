import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeService from './recipe-service.js'


// Business Logic

function getRecipes(ingredients) {
  let promise = RecipeService.getRecipes(ingredients);
  promise.then(function(recipeDataArray) {
    printElements(recipeDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printElements(data) {
  document.querySelector('#showResponse').innerText = `Try ${data[1]}.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ingredients = document.querySelector('#ingredients').value;
  document.querySelector('#ingredients').value = null;
  getRecipes(ingredients);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
