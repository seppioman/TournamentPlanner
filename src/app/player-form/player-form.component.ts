import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../services/player';
import { Club } from '../services/club';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { PlayersService } from '../services/player.service';
import { ClubsService } from '../services/club.service';



@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit{

  isAdd: boolean = false;
  isEdit: boolean = false;
  playerId: String = "";
  clubs: Club[] = [];

  player: Player = new Player();

  isSubmitted: boolean = false;
  errorMessage: string = "";

  player$: Subscription = new Subscription();
  postPlayer$: Subscription = new Subscription();
  putPlayer$: Subscription = new Subscription();

  constructor(private router: Router, private playerService: PlayersService, private clubservice: ClubsService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';


    if(this.router.getCurrentNavigation()?.extras.state?.id){

      this.playerId =  (this.router.getCurrentNavigation()?.extras.state?.id).toString();
    }
    else{
    this.playerId = "";

    }
    console.log(this.playerId)

    if (this.playerId != "") {
     
      this.player$ = this.playerService.getPlayer(this.playerId).subscribe(result => this.player = result);
    }

  }

  changeClubId(id: string){

    console.log(id)
  }

  getClubs(): void {
    this.clubservice.getClubs()
    .subscribe(clubs => this.clubs = clubs);
  }
  ngOnInit(): void {

    this.getClubs();
  }

  ngOnDestroy(): void {
    this.player$.unsubscribe();
    this.postPlayer$.unsubscribe();
    this.putPlayer$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postPlayer$ = this.playerService.addPlayer(this.player).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/players");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putPlayer$ = this.playerService.updatePlayer(this.playerId, this.player).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/players");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }



}
