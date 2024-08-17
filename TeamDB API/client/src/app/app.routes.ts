import { Routes } from '@angular/router';
import { PlayersListComponent } from './players-list/players-list.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { QueryComponent } from './query/query.component';

export const routes: Routes = [
  { path: '', component: PlayersListComponent, title: 'Players List' },
  { path: 'new', component: AddPlayerComponent },
  { path: 'edit/:id', component: EditPlayerComponent },
  { path: 'highest-scorer', component: QueryComponent, data: { title: 'Highest Scorer', endpoint: 'highest-scorer' } },
  { path: 'most-assists', component: QueryComponent, data: { title: 'Most Assists', endpoint: 'most-assists' } },
  { path: 'lowest-scorer', component: QueryComponent, data: { title: 'Lowest Scorer', endpoint: 'lowest-scorer' } },
  { path: 'small-forwards', component: QueryComponent, data: { title: 'Small Forwards', endpoint: 'small-forwards' } },
  { path: 'top-five-stealers', component: QueryComponent, data: { title: 'Top Five Stealers', endpoint: 'top-five-stealers' } }
];
