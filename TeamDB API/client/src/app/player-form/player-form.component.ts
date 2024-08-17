import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Player } from '../player';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  styles: `
    .player-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="player-form"
      autocomplete="off"
      [formGroup]="playerForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        <mat-error *ngIf="name.invalid && name.touched">
          Name must be at least 3 characters long.
        </mat-error>
      </mat-form-field>
<br />

      <mat-radio-group formControlName="position" aria-label="Select an option">
        <mat-radio-button name="position" value="PG" required>
          Point Guard
        </mat-radio-button>
        <mat-radio-button name="position" value="SG" required>
          Shooting Guard
        </mat-radio-button>
        <mat-radio-button name="position" value="SF" required>
          Small Forward
        </mat-radio-button>
        <mat-radio-button name="position" value="PF" required>
          Power Forward
        </mat-radio-button>
        <mat-radio-button name="position" value="C" required>
          Center
        </mat-radio-button>
      </mat-radio-group>
<br />

      <mat-form-field>
        <mat-label>Points Per Game</mat-label>
        <input matInput type="number" formControlName="points_per_game" required />
        <mat-error *ngIf="points_per_game.invalid && points_per_game.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Rebounds Per Game</mat-label>
        <input matInput type="number" formControlName="rebounds_per_game" required />
        <mat-error *ngIf="rebounds_per_game.invalid && rebounds_per_game.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Assists Per Game</mat-label>
        <input matInput type="number" formControlName="assists_per_game" required />
        <mat-error *ngIf="assists_per_game.invalid && assists_per_game.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Steals Per Game</mat-label>
        <input matInput type="number" formControlName="steals_per_game" required />
        <mat-error *ngIf="steals_per_game.invalid && steals_per_game.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="playerForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class PlayerFormComponent implements OnInit {
  @Input() initialState?: Player;

  @Output() formValuesChanged = new EventEmitter<Player>();
  @Output() formSubmitted = new EventEmitter<Player>();

  playerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', Validators.required],
      points_per_game: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      rebounds_per_game: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      assists_per_game: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      steals_per_game: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    });

    if (this.initialState) {
      this.playerForm.setValue({
        name: this.initialState.name || '',
        position: this.initialState.position || '',
        points_per_game: this.initialState.points_per_game || '',
        rebounds_per_game: this.initialState.rebounds_per_game || '',
        assists_per_game: this.initialState.assists_per_game || '',
        steals_per_game: this.initialState.steals_per_game || '',
      });
    }
  }

  get name() {
    return this.playerForm.get('name')!;
  }
  get position() {
    return this.playerForm.get('position')!;
  }
  get points_per_game() {
    return this.playerForm.get('points_per_game')!;
  }
  get rebounds_per_game() {
    return this.playerForm.get('rebounds_per_game')!;
  }
  get assists_per_game() {
    return this.playerForm.get('assists_per_game')!;
  }
  get steals_per_game() {
    return this.playerForm.get('steals_per_game')!;
  }

  submitForm() {
   {
      this.formSubmitted.emit(this.playerForm.value as Player);
    }
  }
}
