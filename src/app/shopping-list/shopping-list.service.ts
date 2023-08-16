import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";



export class ShoppingListService{
    ingredientChanged = new EventEmitter<Ingredient[]>()
    startedEditing = new EventEmitter<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Meat', 1) ,
        new Ingredient('French Fries', 20)
    ]

    getIngredient(index: number){
        return this.ingredients[index];
    }
    
    getIngredients(){
        return this.ingredients.slice();
    }

    updateIngredient( index: number,  newIngredient: Ingredient){
        this.ingredients[index] =newIngredient;
        this.ingredientChanged.emit(this.ingredients.slice())
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice())
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index , 1);
        this.ingredientChanged.emit(this.ingredients.slice())
    }
    
 

    addIngredients(ingredients: Ingredient[]){
        for(let ingredient of ingredients){
            this.addIngredient(ingredient)
        }
    }
}