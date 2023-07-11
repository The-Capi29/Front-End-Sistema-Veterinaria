import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaComponent } from './principa.component';

describe('PrincipaComponent', () => {
  let component: PrincipaComponent;
  let fixture: ComponentFixture<PrincipaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
