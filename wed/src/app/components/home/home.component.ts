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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public isFirstLogin = false;
  public displayedColumns: string[] = ['subject', 'predicate', 'object'];
  public dataSource = new MatTableDataSource<Resource>([]);
  public formFilters: FormGroup;
  public filters: any;
  private dataCsv: any;
  private preferences: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialogService: MatDialog,
    private userService: UserService,
    private sparkqlServce: SparkqlService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.initUserInfoData();
    if (!this.isFirstLogin) {
      this.initFilters();
    }
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openDialogPreferences(): void {
    if (this.isFirstLogin) {

      const dialogRef = this.dialogService.open(PreferencesPopupComponent, { width: '60%', height: '55%', disableClose: true });

      dialogRef.afterClosed().subscribe(() => {
        window.location.reload(); console.log('The dialog was closed');
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

    this.sparkqlServce.getResourcesByFilter(this.preferences).subscribe((result: any) => {
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


  public submit() {
    const selectedOptions = this.formFilters.value.checkboxes
      .map((checked: any, i: string | number) => checked ? this.filters[i] : null)
      .filter((v: null) => v !== null);

      let requestList = this.mapRequestFilters(selectedOptions);
      if(requestList.length === 0) {
        requestList = this.preferences;
      }
      this.sparkqlServce.getResourcesByFilter(requestList).subscribe((result: any) => {
        this.dataCsv = result;
        this.parse();
      });
  }

  get checkboxes() {
    return this.formFilters.controls['checkboxes'] as FormArray;
  }

  public goToSparqlPage() {
    this.router.navigate(['/sparql']);
  }

  public logout() {
    this.authService.logout();
    const currentUrl = this.router.url;
    this.router.navigateByUrl('login', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
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

  private addCheckboxes() {
    this.filters.forEach(() => this.checkboxes.push(new FormControl(false)));
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
      this.preferences = result;
      this.filters = this.mapResultFilters(result);
      this.addCheckboxes();
      this.getResources();
    });


  }

  private mapResultFilters(result: any) {
    const finalResult: string[] = [];
    const arrayOfNotIncluding: string[] = ['CPP', 'NODE', 'NET', 'CS', 'MACOS', 'OBJECTIVE', 'REACT_NATIVE', 'NORTH_AM', 'SOUTH_AM', 'JAVASCRIPT']
    if (result.includes('CPP')) {
      finalResult.push("C++");
    }
    if (result.includes('NODE')) {
      finalResult.push("Node.js");

    }
    if (result.includes('NET')) {
      finalResult.push(".NET");

    }
    if (result.includes('CS')) {
      finalResult.push("C#");

    }
    if (result.includes('MACOS')) {
      finalResult.push("MacOs");

    }
    if (result.includes('OBJECTIVE')) {
      finalResult.push("Objective-C");

    }
    if (result.includes('REACT_NATIVE')) {
      finalResult.push("React Native");

    }
    if (result.includes('NORTH_AM')) {
      finalResult.push("North America");

    }
    if (result.includes('SOUTH_AM')) {
      finalResult.push("South America");

    }
    if (result.includes('JAVASCRIPT')) {
      finalResult.push("JavaScript");
    }

    result.forEach((item: string) => {
      if (!arrayOfNotIncluding.includes(item.toUpperCase())) {
        const transformedItem = item.charAt(0).toUpperCase() + item.toLowerCase().slice(1);
        finalResult.push(transformedItem);
      };
    });
    return finalResult;
  }

  private mapRequestFilters(params: any) {
    const finalRequest: string[] = [];
    const arrayOfNotIncluding: string[] = ['CPP', 'NODE', 'NET', 'CS', 'MACOS', 'OBJECTIVE', 'REACT_NATIVE', 'NORTH_AM', 'SOUTH_AM', 'JAVASCRIPT']
    if (params.includes('C++')) {
      finalRequest.push("CPP");
    }
    if (params.includes('Node.js')) {
      finalRequest.push("NODE");

    }
    if (params.includes('.NET')) {
      finalRequest.push("NET");

    }
    if (params.includes('C#')) {
      finalRequest.push("CS");

    }
    if (params.includes('MacOs')) {
      finalRequest.push("MACOS");

    }
    if (params.includes('Objective-C')) {
      finalRequest.push("OBJECTIVE");

    }
    if (params.includes('React Native')) {
      finalRequest.push('REACT_NATIVE');

    }
    if (params.includes('North America')) {
      finalRequest.push("NORTH_AM");

    }
    if (params.includes('South America')) {
      finalRequest.push("SOUTH_AM");

    }
    if (params.includes('JavaScript')) {
      finalRequest.push("JAVASCRIPT");
    }

    params.forEach((item: string) => {
      if (!arrayOfNotIncluding.includes(item.toUpperCase())) {
        const transformedItem = item.toUpperCase();
        finalRequest.push(transformedItem);
      };
    });
    return finalRequest;
  }
}
