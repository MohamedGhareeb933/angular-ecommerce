import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }

  // push Months into list 
  getCreditCardMonth(startMonth: number): Observable<number[]> {

    let date: number[] = [];
    const endMonth: number = 12;

    for (let month = startMonth; month <= endMonth; month++) {
      date.push(month);
    }

    // of means wrap the list to be of type observable
    return of(date);
  }

  getCreditCardYear(startYear: number): Observable<number[]> {

    let date: number[] = [];
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      date.push(year);
    }

    return of(date);
  }

  getCountriesList(): Observable<Country[]> {
    const country = `http://localhost:8080/api/countries?size=250`;
    console.log(country);

    return this.httpClient.get<getCountriesService>(country).pipe(
      map(indexedDB => indexedDB._embedded.countries)
    );
  }

  getStateList(code: String): Observable<State[]> {
    const stateSearch = `http://localhost:8080/api/states/search/findByCountriesSortName?code=${code}`;
    console.log(stateSearch);

    return this.httpClient.get<getStatesService>(stateSearch).pipe(
      map(indexedDB => indexedDB._embedded.states)
    );
  }

  
}

interface getCountriesService {
  _embedded: {
    countries: Country[]
  }
}

interface getStatesService {
  _embedded: {
    states: State[]
  }
}
