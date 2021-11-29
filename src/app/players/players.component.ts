import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/player.service';
import { Player } from '../services/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];


  constructor(private playerservice: PlayersService, private router: Router) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerservice.getPlayers()
    .subscribe(players => this.players = players);
  }
  add() {
    //Navigate to form in add mode
    this.router.navigate(['players/form'], {state: {mode: 'add'}});
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['players/form'], {state: {id: id, mode: 'edit'}});
  }
  





  delete(player: Player): void {
    this.players = this.players.filter(h => h !== player);
    this.playerservice.deletePlayer(player.playerId).subscribe();
  }

}
