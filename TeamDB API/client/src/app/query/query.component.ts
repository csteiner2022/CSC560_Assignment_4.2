import { Component, OnInit, WritableSignal, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="data$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-position">
            <th mat-header-cell *matHeaderCellDef>Position</th>
            <td mat-cell *matCellDef="let element">{{ element.position }}</td>
          </ng-container>
          <ng-container matColumnDef="col-points" *ngIf="displayPoints">
            <th mat-header-cell *matHeaderCellDef>Points Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.points_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-assists" *ngIf="displayAssists">
            <th mat-header-cell *matHeaderCellDef>Assists Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.assists_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-steals" *ngIf="displaySteals">
            <th mat-header-cell *matHeaderCellDef>Steals Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.steals_per_game }}</td>
          </ng-container>
          <ng-container matColumnDef="col-rebounds" *ngIf="displayRebounds">
            <th mat-header-cell *matHeaderCellDef>Rebounds Per Game</th>
            <td mat-cell *matCellDef="let element">{{ element.rebounds_per_game }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `],
})
export class QueryComponent implements OnInit {
  title: string = '';
  data$!: WritableSignal<any[]>;
  displayedColumns: string[] = ['col-name', 'col-position'];
  displayPoints = false;
  displayAssists = false;
  displaySteals = false;
  displayRebounds = false;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      const endpoint = data['endpoint'];

      switch (endpoint) {
        case 'highest-scorer':
          this.displayPoints = true;
          this.displayedColumns.push('col-points');
          this.data$ = this.playerService.queryHighestScorer();
          break;
        case 'most-assists':
          this.displayAssists = true;
          this.displayedColumns.push('col-assists');
          this.data$ = this.playerService.queryMostAssists();
          break;
        case 'lowest-scorer':
          this.displayPoints = true;
          this.displayedColumns.push('col-points');
          this.data$ = this.playerService.queryLowestScorer();
          break;
        case 'small-forwards':
          this.data$ = this.playerService.querySmallForwards();
          break;
        case 'top-five-stealers':
          this.displaySteals = true;
          this.displayedColumns.push('col-steals');
          this.data$ = this.playerService.queryTopFiveStealers();
          break;
        default:
          break;
      }

      effect(() => {
        this.data$();
      });
    });
  }
}
