import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SparkqlService } from 'src/app/services/sparkql.service';
import * as Papa from 'papaparse';
import { Resource } from 'src/app/models/resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
  private preferences: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone,
    private sparkqlServce: SparkqlService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }


  public ngOnInit(): void {
    this.initForm();
    this.getResourcesInit();
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

  public getResourcesInit() {

    this.sparkqlServce.getResources("select ?subject ?predicate ?object where {?subject ?predicate ?object} limit 100"
    ).subscribe((result: any) => {
      this.dataCsv = result;
      this.parse();

    });

  }

  private initQueryDataPreferences() {
    this.userService.getPreferences().subscribe((result)=> {
      this.preferences = result;
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
          if (result.meta && result.meta.fields) {
            console.log('Headers: ', result.meta.fields);
            this.displayedColumns = [];

            this.displayedColumns = [...result.meta.fields];
          }
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

  public disableButton() {
    return this.sparkqlForm.valid;
  }

}
