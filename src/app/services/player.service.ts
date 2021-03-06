import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Player } from './player';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PlayersService {

 
  private playersUrl = 'http://localhost:3000/players';
  

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
    .pipe(
      tap(_ => this.log('fetched players')),
      catchError(this.handleError<Player[]>('getPlayers', []))
    );
  }
  getPlayer(id: String): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched player id=${url}`)),
      catchError(this.handleError<Player>(`getplayer id=${id}`))
    );
    
  }
  updatePlayer(id:String, player: Player): Observable<Player> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log(player)
    return this.http.put<Player>(this.playersUrl + "/" + id, player, {headers: headers});
}
  addPlayer(player: Player): Observable<Player> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Player>(this.playersUrl, player, {headers: headers});
}



  deletePlayer(id: string): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
  
    return this.http.delete<Player>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deleteHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
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
