import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/player.service';
import { Player } from '../services/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerservice: PlayersService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerservice.getPlayers()
    .subscribe(players => this.players = players);
  }
  





  delete(player: Player): void {
    this.players = this.players.filter(h => h !== player);
    this.playerservice.deletePlayer(player.playerId).subscribe();
  }

}
