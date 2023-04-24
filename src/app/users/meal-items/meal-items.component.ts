import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.css']
})
export class MealItemsComponent implements OnInit {

  images: any = [
    "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg", "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg",
    "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg", "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
