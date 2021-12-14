import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../services/club.service';
import { Club } from '../services/club';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  private _searchTermClub : string = "";

  get searchTermClub():string{
    return this._searchTermClub;
  }

  set searchTermClub(value: string)
  {
    this._searchTermClub = value;

    this.filteredClubs = this.filterRankingsClub(value);

  }


  constructor(private clubservice: ClubsService) { }


  

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubservice.getClubs()
    .subscribe(clubs => this.clubs = clubs);

    this.clubservice.getClubs()
    .subscribe(clubs => this.filteredClubs = clubs);
  }



  filterRankingsClub(searchString: string){

    if(searchString != ""){

      return this.filteredClubs.filter(club => club.clubName.toLowerCase().indexOf(searchString.toLowerCase()) !==-1)
    }
    else{
      
        return this.clubs;
      
    }

    
  }

  clear(){
    this.searchTermClub = "";
  }



}
