import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit{

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
    return  this.addResourceForm.controls['topic'].value === 'backend';
  }

  public verifyFrontend() {
    return  this.addResourceForm.controls['topic'].value === 'frontend'; 
  }

  public verifyMobile() {
    return  this.addResourceForm.controls['topic'].value === 'mobile'; 
  }

  private initForm(): void {
    this.addResourceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      source: ['tutorials', []],
      topic: ['', []],
      backend: ['', []],
      frontend: ['', []],
      mobile: ['', []],
      platform: ['', []],
      area: ['', []],
      framework: ['', []],
      hyperlink: ['', [Validators.required]]
    })
  }
}
