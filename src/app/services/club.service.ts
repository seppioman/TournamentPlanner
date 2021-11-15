import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Club } from './club';
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  private clubsUrl = 'http://localhost:3000/clubs';
  constructor(private http: HttpClient,private messageService: MessageService) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl)
    .pipe(
      tap(_ => this.log('fetched clubs')),
      catchError(this.handleError<Club[]>('getClubs', []))
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };




  private log(message: string) {
    this.messageService.add(`ClubsService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}
}

