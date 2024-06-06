import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseerComponent } from './useer.component';

describe('UseerComponent', () => {
  let component: UseerComponent;
  let fixture: ComponentFixture<UseerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UseerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
