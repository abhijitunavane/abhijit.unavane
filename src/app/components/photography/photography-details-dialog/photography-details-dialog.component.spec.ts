import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyDetailsDialogComponent } from './photography-details-dialog.component';

describe('PhotographyDetailsDialogComponent', () => {
  let component: PhotographyDetailsDialogComponent;
  let fixture: ComponentFixture<PhotographyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotographyDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
