import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/register-user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public registerForm!: FormGroup;
  public registerUser: RegisterUser;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public register() {
    this.mapUser();
    this.authService.register(this.registerUser).subscribe(() => {
      this.router.navigate(['login']);

    });
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  private mapUser(): void {
    const registerFormValue = this.registerForm.value;

    this.registerUser = {
      email: registerFormValue.email,
      password: registerFormValue.password,
    };
  }
}
