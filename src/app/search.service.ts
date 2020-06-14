import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchPhrase: Observable<string> = new Subject();

  setSearchPhrase(searchPhrase: string) {
    (this.searchPhrase as Subject<string>).next(searchPhrase);
  }

  constructor() { }
}
