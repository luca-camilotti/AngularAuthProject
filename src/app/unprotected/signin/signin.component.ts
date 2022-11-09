import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthService } from 'src/app/services/auth-service.service';
import { LogService } from 'src/app/services/log.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;  // Data-Driven Approach (Reactive Form)
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private logger:LogService,
    private UImessage: MessageService) {}

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignin(): void {
    this.logger.log("Singning in ");
    this.authService.login(this.myForm.get('email').value, this.myForm.get('password').value).subscribe(
      data => {
        this.logger.log("Login data: "+JSON.stringify(data));
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser({username: data.username, roles: data.roles});
        this.UImessage.sendMessage("Hello "+((data.username)?data.username:'')+"! Login sucessful!");
        this.logger.log("Login OK");

      },
      err => {
        this.errorMessage = err.message;
        // this.isLoginFailed = true;
        this.UImessage.sendMessage("Login failed: "+this.errorMessage);
        this.logger.log("Login failed: "+this.errorMessage);
      }
    );
  }

}
