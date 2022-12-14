import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../data/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SprintGameService {
  private firstPage = 0;

  private lastPage = 29;

  public startFromBook = false;

  public page = 0;

  public group = 0;

  public pagesArray: number[] = [];

  constructor(private http: HttpClient) { }

  public getWords(group: number, page?: number): Observable<Word[]> {
    if (page === undefined) {
      const randomPage = this.getRandomPage();
      return this.http.get<Word[]>(`https://angular-learnwords.herokuapp.com/words?group=${group}&page=${randomPage}`);
    }
    return this.http.get<Word[]>(`https://angular-learnwords.herokuapp.com/words?group=${group}&page=${page}`);
  }

  public getRandomPage(): number {
    let randomPage = Math.floor(Math.random() * (this.lastPage - this.firstPage + 1))
      + this.firstPage;
    while (this.pagesArray.includes(randomPage) && this.pagesArray.length - 1 !== this.lastPage) {
      randomPage = Math.floor(Math.random() * (this.lastPage - this.firstPage + 1))
        + this.firstPage;
    }
    this.pagesArray.push(randomPage);
    return randomPage;
  }
}
