import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private readonly appLogin: string = environment.appLogin;
  constructor() { }

  ngOnInit(): void {
  }

}
