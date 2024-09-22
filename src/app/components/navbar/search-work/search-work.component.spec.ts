import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkComponent } from './search-work.component';

describe('SearchWorkComponent', () => {
  let component: SearchWorkComponent;
  let fixture: ComponentFixture<SearchWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
