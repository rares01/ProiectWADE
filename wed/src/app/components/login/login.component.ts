import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public login(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.performLogin();
  }

  public performLogin(): void {

    this.authService
      .login(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value
      )
      .subscribe(
        () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        }
      );
  }

  public disableButton(): boolean {
    return this.loginForm.valid;

  }
  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
}
