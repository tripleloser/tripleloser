import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/models/config.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: Config

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

}
