import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashBoradComponent } from './employeedash-borad.component';

describe('EmployeedashBoradComponent', () => {
  let component: EmployeedashBoradComponent;
  let fixture: ComponentFixture<EmployeedashBoradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeedashBoradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedashBoradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
