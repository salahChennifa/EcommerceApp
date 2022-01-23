import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-area',
  templateUrl: './logo-area.component.html',
  styleUrls: ['./logo-area.component.css']
})
export class LogoAreaComponent implements OnInit {
  isToggleAllCategories : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleAllCategories(){
    this.isToggleAllCategories = !this.isToggleAllCategories; 
  }

}
