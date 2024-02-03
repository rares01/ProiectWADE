import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService: MatDialog,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.openDialogPreferences();
  }
  openDialogPreferences(): void {
    if(this.authService.isFirstLogin){
      const dialogRef = this.dialogService.open(PreferencesPopupComponent, { width: '60%', height: '55%', disableClose: true });

      dialogRef.afterClosed().subscribe(result =>  {
        console.log('The dialog was closed');
      });
    }

  }

  openDialogResource(): void {
    const dialogRef = this.dialogService.open(AddResourceComponent, { width: '60%', height: '73%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
