import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalUserWelcomeComponent } from './normal-user-welcome.component';

describe('NormalUserWelcomeComponent', () => {
  let component: NormalUserWelcomeComponent;
  let fixture: ComponentFixture<NormalUserWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormalUserWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormalUserWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
