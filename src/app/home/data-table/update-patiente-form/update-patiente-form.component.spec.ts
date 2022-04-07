import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatienteFormComponent } from './update-patiente-form.component';

describe('UpdatePatienteFormComponent', () => {
  let component: UpdatePatienteFormComponent;
  let fixture: ComponentFixture<UpdatePatienteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePatienteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
