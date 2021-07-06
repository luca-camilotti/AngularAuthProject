import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageService } from 'src/app/services/message.service';
import { LogService } from '../../services/log.service';

declare var $: any;  // to use jquery (put this in any component tha uses jquery)

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;  // Data-Driven Approach (Reactive Form)
  error = false;
  errorMessage = '';
  emailPattern = '^\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$';

    constructor(private messageService: MessageService, private fb: FormBuilder, private logger: LogService) {
    }

    /* Accessors (not callable as methods. just write this.Email without () for example..) */
    get Email() {
      return this.myForm.get('email');
    }
    get Password() {
      return this.myForm.get('password');
    }
    get confirmPassword() {
      return this.myForm.get('confirmPassword');
    } 

    onSignup() {
        // Error Message Testing:
        this.messageService.sendMessage('Testing message!!!');
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail.bind(this) //Validators.pattern(this.emailPattern)
            ])], 
            password: ['', Validators.required],
            confirmPassword:  ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])], 
        });

        // Boostrap Toast Testing:
        // $('.toast').toast('show');

        
        
    }

    isEmail(control: FormControl): {[s: string]: boolean} {  // {[s: string]: boolean is the return value
      
      if (!this.myForm) {
        return {noEmail: true};

      }      
      if (!control.value.match(/^[\w_\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          this.logger.log("Invalid email: "+this.Email.value+ ". Pristine (not modified): "+this.Email.pristine+"; Errors: "+(this.Email.errors != null)+"; Invalid: "+(this.Email.hasError('noEmail') ? this.Email.errors['noEmail'] : null));        
          //this.logger.log("Email Alert ngIf: "+(!this.Email.pristine && this.Email?.errors != null && this.Email?.errors['noEmail']));
          // this.logger.log("Email Alert ngIf2: "+(!this.email.pristine && this.email.errors != null && this.email.errors['noEmail']));
          return {noEmail: true};
      }
      //else
      //    return {noEmail: null};
    }

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};
        }
        if (control.value !== this.myForm.controls['password'].value) {
          this.logger.log("invalid password: "+this.Password.value+" does not match "+this.confirmPassword.value);    
          //this.logger.log("Invalid password confirm: "+this.confirmPassword.value+ ". Pristine (not modified): "+this.confirmPassword.pristine+"; Errors: "+(this.confirmPassword.errors != null)+"; Invalid: "+(this.confirmPassword.errors['passwordsNotMatch']!=null ? this.confirmPassword.errors['passwordsNotMatch'] : null));
          //this.logger.log("confirmPassword Alert: "+(!this.confirmPassword.pristine && this.confirmPassword.errors != null && this.confirmPassword.errors['passwordsNotMatch']));
          return {passwordsNotMatch: true};
        }
        //else
        //  return {passwordsNotMatch: null};
    }

}
