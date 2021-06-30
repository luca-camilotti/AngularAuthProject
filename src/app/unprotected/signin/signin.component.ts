import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;  // Data-Driven Approach (Reactive Form)
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  onSignin() {
      
  }

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
