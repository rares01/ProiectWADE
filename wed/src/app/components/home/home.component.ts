import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { AddResourceComponent } from '../add-resource/add-resource.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService: MatDialog,
  ) { }
  ngOnInit(): void {
    this.openDialogPreferences();
  }
  openDialogPreferences(): void {
    const dialogRef = this.dialogService.open(PreferencesPopupComponent, { width: '60%', height: '50%', disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogResource(): void {
    const dialogRef = this.dialogService.open(AddResourceComponent, { width: '60%', height: '65%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
