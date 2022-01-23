import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAreaComponent } from './logo-area.component';

describe('LogoAreaComponent', () => {
  let component: LogoAreaComponent;
  let fixture: ComponentFixture<LogoAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
