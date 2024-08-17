import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private url = 'http://localhost:5200/players';
  players$ = signal<Player[]>([]);
  player$ = signal<Player | null>(null); 

  constructor(private httpClient: HttpClient) {}

  refreshPlayers() {
    this.httpClient.get<Player[]>(`${this.url}`).subscribe(players => {
      this.players$.set(players); 
    });
  }

  refreshPlayer(id: string) {
    this.httpClient.get<Player>(`${this.url}/${id}`).subscribe(player => {
      this.player$.set(player);  
    });
  }

  getPlayers() {
    this.refreshPlayers();
    return this.players$;  
  }

  getPlayer(id: string) {
    this.refreshPlayer(id);
    return this.player$; 
  }

  createPlayer(player: Player) {
    return this.httpClient.post(`${this.url}`, player, { responseType: 'text' });
  }

  updatePlayer(id: string, player: Player) {
    return this.httpClient.put(`${this.url}/${id}`, player, { responseType: 'text' });
  }

  deletePlayer(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  // Query: Highest Scorer
  queryHighestScorer() {
    const highestScorer$ = signal<Player[]>([]);
    this.httpClient.get<Player[]>(`${this.url}/highest-scorer`).subscribe(data => {
      highestScorer$.set(data);
    });
    return highestScorer$;
  }

  // Query: Most Assists
  queryMostAssists() {
    const mostAssists$ = signal<Player[]>([]);
    this.httpClient.get<Player[]>(`${this.url}/most-assists`).subscribe(data => {
      mostAssists$.set(data);
    });
    return mostAssists$;
  }

  // Query: Lowest Scorer
  queryLowestScorer() {
    const lowestScorer$ = signal<Player[]>([]);
    this.httpClient.get<Player[]>(`${this.url}/lowest-scorer`).subscribe(data => {
      lowestScorer$.set(data);
    });
    return lowestScorer$;
  }

  // Query: Small Forwards
  querySmallForwards() {
    const smallForwards$ = signal<Player[]>([]);
    this.httpClient.get<Player[]>(`${this.url}/small-forwards`).subscribe(data => {
      smallForwards$.set(data);
    });
    return smallForwards$;
  }

  // Query: Top Five Stealers
  queryTopFiveStealers() {
    const topFiveStealers$ = signal<Player[]>([]);
    this.httpClient.get<Player[]>(`${this.url}/top-five-stealers`).subscribe(data => {
      topFiveStealers$.set(data);
    });
    return topFiveStealers$;
  }
}
