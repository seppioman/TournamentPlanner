import { Component, OnInit } from '@angular/core';
import { RankingService } from '../services/ranking.service';
import { Ranking } from '../services/ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  rankings: Ranking[] = [];
  filter: Ranking[] = [];
  filteredRankings: Ranking[] = [];
  private _searchTermName : string = "";
  private _searchTermClub : string = "";
  private _searchTermDiscipline: string ="";

  get searchTermName():string{
    return this._searchTermName;
  }

  set searchTermName(value: string)
  {
    this._searchTermName = value;
    this.filteredRankings = this.filterRankingsName(value);

  }

  get searchTermClub():string{
    return this._searchTermClub;
  }

  set searchTermClub(value: string)
  {
    this._searchTermClub = value;

    this.filteredRankings = this.filterRankingsClub(value);

  }
  get searchTermDiscipline():string{
    return this._searchTermDiscipline;
  }

  set searchTermDiscipline(value: string)
  {
    this._searchTermDiscipline = value;
    this.filteredRankings = this.filterRankingsDiscipline(value);

  }


  filterRankingsName(searchString: string){

    if(searchString != ""){

      return this.filteredRankings.filter(ranking => ranking.family_Name.toLowerCase().indexOf(searchString.toLowerCase()) !==-1)
    }
    else{
      
        return this.rankings;
      
    }

    
  }
  filterRankingsClub(searchString: string){

    if(searchString != ""){

      return this.filteredRankings.filter(ranking => ranking.clubname.toLowerCase().indexOf(searchString.toLowerCase()) !==-1)
    }
    else{

  
      
        return this.rankings;
      
      
    }

    
  }
  filterRankingsDiscipline(searchString: string){

    if(searchString != ""){

      return this.filteredRankings.filter(ranking => ranking.Discipline.toLowerCase().indexOf(searchString.toLowerCase()) !==-1)
    }
    else{
      
        return this.rankings;
      
    }

    
  }

  clear(){
    this.searchTermClub = "";
    this.searchTermName = "";
    this.searchTermDiscipline = "";
  }



  constructor(private rankingservice: RankingService) { }

  ngOnInit(): void {
     this.getRankings();
  }

  getRankings(): void {
      this.rankingservice.getRankings()
    .subscribe(rankings => this.rankings = rankings);

    this.rankingservice.getRankings()
    .subscribe(rankings => this.filteredRankings = rankings)
    
  }

}
