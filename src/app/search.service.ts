import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  baseUrl = "https://www.booknomads.com/api/v0/isbn/";

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchISBN(term));
  }

  searchISBN(isbn) {
    return this.http.get(this.baseUrl+isbn);
  }
}
