import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-versioninfo',
  templateUrl: './versioninfo.page.html',
  styleUrls: ['./versioninfo.page.scss'],
})
export class VersioninfoPage implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
