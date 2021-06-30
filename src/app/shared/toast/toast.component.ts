import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { LogService } from 'src/app/services/log.service';

declare var $: any;  // to use jquery (put this in any component tha uses jquery)

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  title: string = "Toast";
  subtitle: string = "Popup";
  message: string = "Sample Message!";
  subscription: Subscription;
  // delay = 5000;

  constructor(private errorMessage: ErrorService, private logger: LogService) {}

  ngOnInit(): void {
    this.subscription = this.errorMessage.getMessage().subscribe(
      message => { this.logger.log(message);  // log to console
        this.message = message;  // set toast message
        // Boostrap Toast:
        $('.toast').toast('show');  // show toast
      }
    ) 
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
