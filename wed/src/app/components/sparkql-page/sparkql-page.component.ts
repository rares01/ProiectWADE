import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SparkqlService } from 'src/app/services/sparkql.service';
import * as Papa from 'papaparse';
import { Resource } from 'src/app/models/resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sparkql-page',
  templateUrl: './sparkql-page.component.html',
  styleUrls: ['./sparkql-page.component.scss']
})
export class SparkqlPageComponent implements OnInit, AfterViewInit {
  public sparkqlForm: FormGroup;
  public displayedColumns: string[] = ['subject', 'predicate', 'object'];
  public dataSource = new MatTableDataSource<Resource>([]);
  private dataCsv: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone,
    private sparkqlServce: SparkqlService,
    private formBuilder: FormBuilder,) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getResources() {

    this.sparkqlServce.getResources(this.sparkqlForm.controls['query'].value).subscribe((result: any) => {
      this.dataCsv = result;
      this.parse();
    });

  }

  private initForm(): void {
    this.sparkqlForm = this.formBuilder.group({
      query: ['', [Validators.required]],
    })
  }

  private parseCsv(csvContent: string): any {
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        complete: (result) => {
          console.log('Parsed: ', result);
          resolve(result.data as Resource[]);
        },
        error: (error: any) => {
          console.error('Parse error: ', error);
          reject(error);
        },
        header: true
      });
    });
  }

  public parse() {
    const csvContent = this.dataCsv;
    this.parseCsv(csvContent).then((parsedData: any) => {
      this.dataSource.data = parsedData;

      console.log('Parsed Data:', this.dataSource.data);
    }).catch((error: any) => {
      console.error('Error parsing CSV:', error);
    });
  }

}
