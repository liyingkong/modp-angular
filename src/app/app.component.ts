import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModule, MenuItem } from 'primeng/primeng';
import {TabMenuModule} from 'primeng/tabmenu';

import { environment } from '../environments/environment'
// import { t_peoplefeatureService } from './shared/t_peoplefeature.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  orgs: MenuItem[];

  constructor(
    private router: Router,
    // private tpfService: t_peoplefeatureService,
  ) {
  }

  ngOnInit() {
    this.makeDefaultItems();
  }

  makeDefaultItems() {
    this.items = [];
    this.items = [
      { label: '菜单1', icon: 'fa fa-fw fa fa-bars', styleClass: 'menu-item', routerLink: ['index'] },
      // { label: '菜单2', icon: 'fa fa-fw fa fa-bars', styleClass: 'menu-item', routerLink: ['people-type'] },
      { label: '菜单2', icon: 'fa fa-fw fa-bar-chart', styleClass: 'menu-item', routerLink: ['display'] },
      // { label: '菜单3', icon: 'fa fa-fw fa-calendar' },
      // { label: '菜单4', icon: 'fa fa-fw fa-book' },
      // { label: '菜单5', icon: 'fa fa-fw fa-support' },
      // { label: '菜单6', icon: 'fa fa-fw fa-twitter' },
    ];
  }

  // reloadData(){
  //   this.tpfService.reloadData().then( t=> {
  //     location.reload();
  //   });
  //   // this.makeDefaultItems();
  // }
  
}
