import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode = false;
  recipeForm!: UntypedFormGroup;
  updateRecipe: Recipe | any;
  recipeIngredients: any;
  selectedRecipe: Recipe | any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.selectedRecipe = this.recipeService.getRecipe(this.id);
      this.initForm();
    });
  }

  initForm() {
    this.recipeForm = this.formBuilder.group({
      name: [this.selectedRecipe?.name || '', Validators.required],
      description: [
        this.selectedRecipe?.description || '',
        Validators.required,
      ],
      imagePath: [this.selectedRecipe?.imagePath || '', Validators.required],
      ingredients: this.formBuilder.array([]),
    });
    if (this.selectedRecipe) {
      for (const ingredient of this.selectedRecipe.ingredients) {
        this.addIngredient(ingredient.name, ingredient.amount);
      }
    }
  }

  get controls(): any {
    return this.recipeForm.controls['ingredients'];
  }

  onSubmit() {
    if (this.editMode) {
      console.log(this.selectedRecipe);

      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngredient(name: string, amount: number) {
    const ingredientForm = this.formBuilder.group({
      name: [name, Validators.required],
      amount: [amount, [Validators.required, Validators.min(1)]],
    });
    this.controls.push(ingredientForm);
  }
  deleteIngredient(index: number) {
    this.controls.removeAt(index);
  }
}
