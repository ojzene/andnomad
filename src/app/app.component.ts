import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {
  public loading = false;
  title = 'andnomad';
  result: Object;
  message: String;
  success: boolean;
  isbn: any;
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private searchService: SearchService) {}

  SearchBtn() {
    this.loading = true;
    if(localStorage[this.isbn] != undefined) {
      this.loading = false; this.success = true;
      this.result = JSON.parse(localStorage[this.isbn]);
    }
    else {
      this.searchService.searchISBN(this.isbn).subscribe(response => {
        this.loading = false; this.success = true;
        this.result = response;
        localStorage[this.isbn] = JSON.stringify(this.result);
      },
      error => {
        this.loading = false;
        this.success = false;
        this.message = error.error.error;
      });
    }
  }
}
