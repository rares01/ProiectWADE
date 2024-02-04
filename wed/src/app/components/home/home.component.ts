import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Resource } from 'src/app/models/resource.model';
import { MatPaginator } from '@angular/material/paginator';
import * as Papa from 'papaparse';
import { SparkqlService } from 'src/app/services/sparkql.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public isFirstLogin: boolean;
  public displayedColumns: string[] = ['subject', 'predicate', 'object'];
  public dataSource = new MatTableDataSource<Resource>([]);
  public formFilters: FormGroup;
  public filters: any;
  private dataCsv: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialogService: MatDialog,
    private userService: UserService,
    private sparkqlServce: SparkqlService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.initUserInfoData();
    this.getResources();
    this.initFilters();
  }
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openDialogPreferences(): void {
    if(this.isFirstLogin) {
    
      const dialogRef = this.dialogService.open(PreferencesPopupComponent, { width: '60%', height: '55%', disableClose: true });

      dialogRef.afterClosed().subscribe(() =>  {
      console.log('The dialog was closed');
      });
    }

  }

  public openDialogResource(): void {
    const dialogRef = this.dialogService.open(AddResourceComponent, { width: '60%', height: '73%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getResources() {

    this.sparkqlServce.getResources("select ?subject ?predicate ?object where {?subject ?predicate ?object} limit 1000").subscribe((result: any) => {
      this.dataCsv = result;
      this.parse();
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
  
  private initUserInfoData() {
    this.userService.firstLogin().subscribe((result) => { 
      this.isFirstLogin = result;
      this.openDialogPreferences();

    });
  }

  private initFilters() {

    this.formFilters = this.formBuilder.group({
      checkboxes: new FormArray([]),
    });

    this.userService.getPreferences().subscribe((result) => {
      this.filters = result;
      console.log(this.filters);
      this.addCheckboxes();
    });
  }
  public submit() {
    const selectedOptions = this.formFilters.value.checkboxes
      .map((checked: any, i: string | number) => checked ? this.filters[i] : null)
      .filter((v: null) => v !== null);
    console.log(selectedOptions);
  }
  private addCheckboxes() {
    this.filters.forEach(() => this.checkboxes.push(new FormControl(false)));
  }

  get checkboxes() {
    return this.formFilters.controls['checkboxes'] as FormArray;
  }

  public goToSparqlPage() {
    this.router.navigate(['/sparql']);
  }
}
