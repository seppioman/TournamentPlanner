import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../services/player';
import { PlayersService } from '../services/player.service';
import { MessageService } from '../services/message.service';
import { catchError, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

   player: Player = new Player();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private location: Location,
    private messageService: MessageService ) 
    { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id =  this.route.snapshot.paramMap.get('id')!;
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
      this.messageService.add((this.player).toString());
      this.messageService.add(this.player.playerId);
     
  }


    goBack(): void {
      this.location.back();
    }
    

    

}
