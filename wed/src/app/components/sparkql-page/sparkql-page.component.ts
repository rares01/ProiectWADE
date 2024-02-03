import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sparkql-page',
  templateUrl: './sparkql-page.component.html',
  styleUrls: ['./sparkql-page.component.scss']
})
export class SparkqlPageComponent {
  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
}
