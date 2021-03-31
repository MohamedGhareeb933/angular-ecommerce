import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

    // take the input from HTMLInputElement and pass the value as a paramter
    doSearch(value: string) : void {

    console.log(`value = ${value}`);
 
    // call the router and append the :value to the router path  
    this.router.navigateByUrl(`/search/${value}`);
  }

}
