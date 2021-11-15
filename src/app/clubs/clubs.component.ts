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

  constructor(private clubservice: ClubsService) { }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubservice.getClubs()
    .subscribe(clubs => this.clubs = clubs);
  }




}
