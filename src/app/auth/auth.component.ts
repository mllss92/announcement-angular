import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('tabsNav') tabsNav!: MatTabGroup;

  constructor() { }

  ngOnInit(): void {
  }

  selectLoginTab(): void {
    this.tabsNav.selectedIndex = 0;
  }
}
