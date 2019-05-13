import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-integral',
  templateUrl: './integral.page.html',
  styleUrls: ['./integral.page.scss'],
})
export class IntegralPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
