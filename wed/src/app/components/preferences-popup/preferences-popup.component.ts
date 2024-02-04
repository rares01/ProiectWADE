import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss']
})
export class PreferencesPopupComponent implements OnInit {
  public isButtonEnabled: boolean = false;

  public preferencesForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PreferencesPopupComponent>,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.watchFormChanges();

  }
  public savePreferences() {
    this.dialogRef.close();

    const preferencesKeys: string[] = ['tutorials', 'presentations', 'source', 'events', 'backend', 'frontend', 'mobile', 'java', 'cpp', 'cs', 'python',
      'node', 'javascript', 'html', 'css', 'angular', 'react', 'vue', 'linux', 'macos', 'windows', 'europe', 'africa', 'australia', 'asia', 'antarctica',
      'north_am', 'south_am', 'spring', 'net', 'django', 'flask', 'react_nat', 'swift', 'objective', 'kotlin', 'flutter'];

    const uppercaseKeys: string[] = [];
    preferencesKeys.forEach(key => {
      if (this.checkIfChecked(key)) {
        const formattedKey = key.replace(/-/g, '_').toUpperCase();
        uppercaseKeys.push(formattedKey);
      }
    });

    this.userService.savePreferences(uppercaseKeys).subscribe();
  }


  public verifyBackend() {
    return this.preferencesForm.controls['backend'].value;
  }

  public verifyFrontend() {
    return this.preferencesForm.controls['frontend'].value;
  }

  public verifyMobile() {
    return this.preferencesForm.controls['mobile'].value;
  }

  private checkIfChecked(a: string): boolean {
    return this.preferencesForm.controls[a].value
  }

  private initForm(): void {
    this.preferencesForm = this.formBuilder.group({
      //TOPICS
      tutorials: ['', []],
      presentations: ['', []],
      source: ['', []],
      events: ['', []],
      //TARGET
      backend: ['', []],
      frontend: ['', []],
      mobile: ['', []],
      //BE
      java: ['', []],
      cpp: ['', []],
      cs: ['', []],
      python: ['', []],
      node: ['', []],
      //FE
      angular: ['', []],
      react: ['', []],
      vue: ['', []],
      javascript: ['', []],
      html: ['', []],
      css: ['', []],
      //OS
      linux: ['', []],
      macos: ['', []],
      windows: ['', []],
      //GEO
      europe: ['', []],
      africa: ['', []],
      australia: ['', []],
      asia: ['', []],
      antarctica: ['', []],
      north_am: ['', []],
      south_am: ['', []],
      //FRAMEWORKS
      spring: ['', []],
      net: ['', []],
      django: ['', []],
      flask: ['', []],
      //MOBILE
      react_nat: ['', []],
      swift: ['', []],
      objective: ['', []],
      kotlin: ['', []],
      flutter: ['', []],
    })

    this.checkFormState();

  }

  private watchFormChanges(): void {
    this.preferencesForm.valueChanges.subscribe(() => {
      this.checkFormState();
    });
  }

  private checkFormState(): void {
    const formValues = this.preferencesForm.value;
    this.isButtonEnabled = Object.keys(formValues).some(key => formValues[key]);
  }

  public disableButton(): boolean {
    return this.preferencesForm.valid;

  }
}
