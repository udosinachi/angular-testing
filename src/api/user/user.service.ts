import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map } from 'rxjs';
import { IUserModel } from 'src/model/IUserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getUsersUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(public http: HttpClient) {}

  //This is supposed to fetch an Observable array of the usermodel
  getAllUsers(): Observable<IUserModel[]> {
    return this.http.get<IUserModel[]>(this.getUsersUrl).pipe(
      // tap((data) => console.log('All: ', data)),
      catchError(this.handleError)
    );
  }

  public handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
