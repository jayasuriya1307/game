import { Component } from '@angular/core';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  boot!: any;
  constructor(private scoreservice: ScoreService) {
    this.scoreservice.getAll().subscribe((res) => {
      this.boot = res;
      console.log(this.boot);

   })
  }

}
