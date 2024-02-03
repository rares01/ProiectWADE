import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkqlPageComponent } from './sparkql-page.component';

describe('SparkqlPageComponent', () => {
  let component: SparkqlPageComponent;
  let fixture: ComponentFixture<SparkqlPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SparkqlPageComponent]
    });
    fixture = TestBed.createComponent(SparkqlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
