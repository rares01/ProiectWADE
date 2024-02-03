import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SparkqlService } from 'src/app/services/sparkql.service';

@Component({
  selector: 'app-sparkql-page',
  templateUrl: './sparkql-page.component.html',
  styleUrls: ['./sparkql-page.component.scss']
})
export class SparkqlPageComponent implements OnInit {
  public sparkqlForm: FormGroup;

  constructor(private _ngZone: NgZone,
    private sparkqlServce: SparkqlService,
    private formBuilder: FormBuilder,) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

  public ngOnInit(): void {
    this.initForm();
  }

  public getResources() {

    this.sparkqlServce.getResources(this.sparkqlForm.controls['query'].value).subscribe();

  }

  private initForm(): void {
    this.sparkqlForm = this.formBuilder.group({
      query: ['', [Validators.required]],
    })
  }
}
