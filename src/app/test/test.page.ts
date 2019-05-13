import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
    console.log('跳转页面');
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
