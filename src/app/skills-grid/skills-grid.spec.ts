import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsGrid } from './skills-grid';

describe('SkillsGrid', () => {
  let component: SkillsGrid;
  let fixture: ComponentFixture<SkillsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
