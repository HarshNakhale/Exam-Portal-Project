import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalUserSidebarComponent } from './normal-user-sidebar.component';

describe('NormalUserSidebarComponent', () => {
  let component: NormalUserSidebarComponent;
  let fixture: ComponentFixture<NormalUserSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormalUserSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormalUserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
