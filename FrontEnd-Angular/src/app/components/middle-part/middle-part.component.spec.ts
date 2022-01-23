import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlePartComponent } from './middle-part.component';

describe('MiddlePartComponent', () => {
  let component: MiddlePartComponent;
  let fixture: ComponentFixture<MiddlePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddlePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
