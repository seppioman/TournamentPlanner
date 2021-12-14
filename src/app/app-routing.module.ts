import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import {RankingComponent} from './ranking/ranking.component';
import {ClubsComponent} from './clubs/clubs.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component'
import {PlayerFormComponent} from './player-form/player-form.component'

const routes: Routes = [
  { path: '', redirectTo:'/home',pathMatch:'full' },
  { path:'home' , component: HomeComponent},
  { path: 'article', component: ArticleComponent },
  { path: 'detail/:id', component: PlayerDetailComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'players/form', component: PlayerFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
