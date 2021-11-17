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

  constructor(private rankingservice: RankingService) { }

  ngOnInit(): void {
    this.getRankings();
  }

  getRankings(): void {
    this.rankingservice.getRankings()
    .subscribe(rankings => this.rankings = rankings);
  }

}
