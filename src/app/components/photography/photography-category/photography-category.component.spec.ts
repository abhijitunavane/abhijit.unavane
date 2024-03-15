import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyCategoryComponent } from './photography-category.component';

describe('PhotographyCategoryComponent', () => {
  let component: PhotographyCategoryComponent;
  let fixture: ComponentFixture<PhotographyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotographyCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
