import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";



export class ShoppingListService{
    ingredientChanged = new EventEmitter<Ingredient[]>()
    private ingredients : Ingredient[] = [
        new Ingredient('Meat', 1) ,
        new Ingredient('French Fries', 20)
    ]
    
    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice())
    }
}