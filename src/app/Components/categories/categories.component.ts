import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[]

  constructor(
    private categoryService: CategoryService 
  ) { }

  ngOnInit(): void {
    this.GetCategories()
  }

  GetCategories(){
    this.categoryService.GetCategories()
      .subscribe(res => this.categories = res)
  }

}
