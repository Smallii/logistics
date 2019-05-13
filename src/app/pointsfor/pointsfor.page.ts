import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pointsfor',
  templateUrl: './pointsfor.page.html',
  styleUrls: ['./pointsfor.page.scss'],
})
export class PointsforPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
