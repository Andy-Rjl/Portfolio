import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesCompetences } from './mes-competences';

describe('MesCompetences', () => {
  let component: MesCompetences;
  let fixture: ComponentFixture<MesCompetences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesCompetences],
    }).compileComponents();

    fixture = TestBed.createComponent(MesCompetences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
