import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoComponent } from './archivo.component';

describe('ArchivoComponent', () => {
  let component: ArchivoComponent;
  let fixture: ComponentFixture<ArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
