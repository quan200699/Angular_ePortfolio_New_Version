import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesInfoComponent } from './classes-info.component';

describe('ClassesInfoComponent', () => {
  let component: ClassesInfoComponent;
  let fixture: ComponentFixture<ClassesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
