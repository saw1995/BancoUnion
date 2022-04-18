import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCuentasComponent } from './cliente-cuentas.component';

describe('ClienteCuentasComponent', () => {
  let component: ClienteCuentasComponent;
  let fixture: ComponentFixture<ClienteCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
