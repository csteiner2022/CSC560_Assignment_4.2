import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [PlayerFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Player</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-player-form
          (formSubmitted)="addPlayer($event)"
        ></app-player-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddPlayerComponent {
  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  addPlayer(player: Player) {
    this.playerService.createPlayer(player).subscribe({
      next: () => {
        this.playerService.getPlayers();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        alert('Failed to create player');
        console.error(error);
      },
    });
  }
}
