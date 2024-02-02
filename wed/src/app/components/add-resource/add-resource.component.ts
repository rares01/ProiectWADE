import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  public addResourceForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddResourceComponent>

  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  public saveResource() {
    this.dialogRef.close();
  }

  public verifyBackend() {
    return this.addResourceForm.controls['backend'].value;
  }

  public verifyFrontend() {
    return this.addResourceForm.controls['frontend'].value;
  }

  public verifyMobile() {
    return this.addResourceForm.controls['mobile'].value;
  }

  private initForm(): void {
    this.addResourceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      source: ['tutorials', []],
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
      //MOBILE
      reactNat: ['', []],
      swift: ['', []],
      objective: ['', []],
      kotlin: ['', []],
      flutter: ['', []],
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
      framework: ['', []],
      hyperlink: ['', [Validators.required]]
    })
  }
}
