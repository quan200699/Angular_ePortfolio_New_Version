import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAddStudentComponent } from './classes-add-student.component';

describe('ClassesAddStudentComponent', () => {
  let component: ClassesAddStudentComponent;
  let fixture: ComponentFixture<ClassesAddStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesAddStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
