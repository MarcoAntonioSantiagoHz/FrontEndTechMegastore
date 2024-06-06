import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySaleComponent } from './history-sale.component';

describe('HistorySaleComponent', () => {
  let component: HistorySaleComponent;
  let fixture: ComponentFixture<HistorySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorySaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
