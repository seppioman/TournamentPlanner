import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../services/player';
import { PlayersService } from '../services/player.service';


@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {



    player : Player | undefined
 

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private location: Location) 
    { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id =  this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }


    goBack(): void {
      this.location.back();
    }
    

    

}
