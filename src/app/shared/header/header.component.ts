import { Component, OnInit } from '@angular/core';
import { EventData } from 'src/app/models/event-data.model';
import { EventBusService } from 'src/app/services/event-bus.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private readonly appLogin: string = environment.appLogin;
  constructor(public eventBusService: EventBusService, public tokenService: TokenStorageService,
    public UImessage: MessageService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.eventBusService.emit(new EventData('logout', null));  // send logout signal
    this.tokenService.signOut();    // sign out
    console.log("Logout!");
    this.UImessage.sendMessage("Logout successful");
  }

}
