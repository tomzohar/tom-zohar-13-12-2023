import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastSummaryComponent } from './forecast-summary.component';

describe('ForecastSummaryComponent', () => {
  let component: ForecastSummaryComponent;
  let fixture: ComponentFixture<ForecastSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ForecastSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
