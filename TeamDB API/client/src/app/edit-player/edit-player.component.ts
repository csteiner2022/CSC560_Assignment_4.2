import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { MatCardModule } from '@angular/material/card';
import { PlayerFormComponent } from '../player-form/player-form.component';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [PlayerFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Player</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-player-form
          (formSubmitted)="submitPlayer($event)"
        ></app-player-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
})
export class EditPlayerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit() {}

  submitPlayer(player: Player) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerService.updatePlayer(id, player).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          alert('Failed to update player');
          console.error(error);
        }
      });
    } else {
      this.playerService.createPlayer(player).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          alert('Failed to create player');
          console.error(error);
        }
      });
    }
  }
}
