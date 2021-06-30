import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  title: string = "Toast";
  subtitle: string = "Popup";
  message: string = "Sample Message!";
  delay = 5;
  constructor() { }

  ngOnInit(): void {
  }

}
