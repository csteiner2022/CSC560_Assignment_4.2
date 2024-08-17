import { Component, OnInit, effect, WritableSignal, signal } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Players List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="players$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-position">
            <th mat-header-cell *matHeaderCellDef>Position</th>
            <td mat-cell *matCellDef="let element">{{ element.position }}</td>
          </ng-container>
          <ng-container matColumnDef="col-points">
            <th mat-header-cell *matHeaderCellDef>Points Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.points_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-rebounds">
            <th mat-header-cell *matHeaderCellDef>Rebounds Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.rebounds_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-assists">
            <th mat-header-cell *matHeaderCellDef>Assists Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.assists_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-steals">
            <th mat-header-cell *matHeaderCellDef>Steals Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.steals_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deletePlayer(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Player
        </button>
      </mat-card-actions>
    </mat-card>
<br />

<mat-card>
      <mat-card-header>
        <mat-card-title>Queries</mat-card-title>
      </mat-card-header>
<br />
<ng-container>
<button mat-raised-button [routerLink]="['highest-scorer']">
                Highest Scorer
              </button>
</ng-container>
<ng-container>
<button mat-raised-button [routerLink]="['lowest-scorer']">
                Lowest Scorer
              </button>
</ng-container>
<ng-container>
<button mat-raised-button [routerLink]="['top-five-stealers']">
                Top Five Stealers
              </button>
</ng-container>
<ng-container>
<button mat-raised-button [routerLink]="['most-assists']">
                Most Assists
              </button>
</ng-container>
<ng-container>
<button mat-raised-button [routerLink]="['small-forwards']">
                All Small Forwards
              </button>
</ng-container>

  `,
})
export class PlayersListComponent implements OnInit {
  players$!: WritableSignal<Player[]>;

  displayedColumns: string[] = [
    'col-name',
    'col-position',
    'col-points',
    'col-rebounds',
    'col-assists',
    'col-steals',
    'col-action',
  ];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();
    effect(() => {
      this.players$();  // This triggers when players$ changes
    });
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayer(id).subscribe({
      next: () => {
        this.playerService.getPlayers();
      }
    });
  }
}
