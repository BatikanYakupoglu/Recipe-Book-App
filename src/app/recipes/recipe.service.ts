import { EventEmitter, INJECTOR, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      'Hünkar Beğendi',
      'Eggplant and meat couldnt be a better match',
      'https://cdn.yemek.com/mnresize/940/940/uploads/2021/03/hunkar-begendi-son-yemekcom.jpg',
      [
        new Ingredient('Eggplant', 4),
        new Ingredient('Onion', 2),
        new Ingredient('Tomato', 3),
        new Ingredient('Olive Oil', 2),
        new Ingredient('Meat', 1),
      ]
    ),
    new Recipe(
      'Mantı',
      'the best thing you have ever eaten',
      'https://cdn.yemek.com/mnresize/940/940/uploads/2020/08/manti-tarifi-guncelleme-son.jpg',
      [
        new Ingredient('Pastry', 1),
        new Ingredient('Mince', 1),
        new Ingredient('Onion', 2),
      ]
    ),
    new Recipe(
      'Mac N Cheese',
      'cheese and macaroni combo could be this good',
      'https://cdn.yemek.com/mnresize/940/940/uploads/2020/01/bby-macncheese-yemekcom.jpg',
      [new Ingredient('Pasta', 1), new Ingredient('Cheese', 1)]
    ),
  ];

  // private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  // setRecipes(recipes: Recipe[]) {
  //   this.recipes = recipes;
  //   this.recipesChanged.emit(this.recipes.slice());
  // }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.emit(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.emit(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.emit(this.recipes.slice());
  }
}
