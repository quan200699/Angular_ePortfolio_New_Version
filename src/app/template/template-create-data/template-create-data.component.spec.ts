import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCreateDataComponent } from './template-create-data.component';

describe('TemplateCreateDataComponent', () => {
  let component: TemplateCreateDataComponent;
  let fixture: ComponentFixture<TemplateCreateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCreateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCreateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
