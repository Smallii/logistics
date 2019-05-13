import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.page.html',
  styleUrls: ['./orderinfo.page.scss'],
})
export class OrderinfoPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
