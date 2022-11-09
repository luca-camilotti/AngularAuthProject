import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { LogService } from 'src/app/services/log.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  data: {}
  constructor(private api: ApiService, private UImessage: MessageService, private logger: LogService) { }

  ngOnInit(): void {
    this.api.get('data/employee/10')    // try 'data/what' and 'data/list'
    .pipe(
      catchError(err => of(err.error.message)) // return a Observable with a error message to display
    ) 
    .subscribe(data => {
      this.data = data
      this.logger.log('data: '+JSON.stringify(data))
    });
  }

}
