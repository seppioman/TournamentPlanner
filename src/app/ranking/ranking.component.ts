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
  filteredRankings: Ranking[] = [];
  private _searchTerm : string = "";

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value: string){
    this._searchTerm = value;
    this.filteredRankings = this.filterRankings(value);
  }

  filterRankings(searchString: string){

    return this.rankings.filter(ranking => ranking.family_Name.toLowerCase().indexOf(searchString.toLowerCase()) !==-1)
  }


  constructor(private rankingservice: RankingService) { }

  ngOnInit(): void {
     this.getRankings();
  }

  getRankings(): void {
      this.rankingservice.getRankings()
    .subscribe(rankings => this.rankings = rankings);
    
  }

}
