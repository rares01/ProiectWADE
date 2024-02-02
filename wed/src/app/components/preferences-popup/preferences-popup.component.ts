import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss']
})
export class PreferencesPopupComponent implements OnInit {

  public preferencesForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PreferencesPopupComponent>

  ) { }
  ngOnInit(): void {
    this.initForm();
  }
  public savePreferences() {
    this.dialogRef.close();
  }
  public verifyBackend() {
    return  this.preferencesForm.controls['backend'].value;
  }

  public verifyFrontend() {
    return  this.preferencesForm.controls['frontend'].value;
  }

  public verifyMobile() {
    return  this.preferencesForm.controls['mobile'].value;
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
      ruby: ['', []],
      node: ['', []],
      //FE
      angular: ['', []],
      react: ['', []],
      vue: ['', []],
      razor: ['', []],
      next: ['', []],
      //OS
      linux: ['', []],
      macox: ['', []],
      windows: ['', []],
      //GEO
      europe: ['', []],
      africa: ['', []],
      australia: ['', []],
      asia: ['', []],
      antarctica: ['', []],
      northAm: ['', []],
      southAm: ['', []],
      //FRAMEWORKS
      spring: ['', []],
      net: ['', []],
      rails: ['', []],
      django: ['', []],
      flask: ['', []],
      nest: ['', []],
      //MOBILE
      reactNat: ['', []],
      swift: ['', []],
      objective: ['', []],
      kotlin: ['', []],
      flutter: ['', []],
    })
  }
}
