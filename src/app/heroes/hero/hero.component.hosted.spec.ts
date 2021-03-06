import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { Hero } from 'app/shared/hero';

@Component({
  selector: 'app-test',
  template: `<app-hero [hero]="hero" (delete)="onDeleteClick($event)"></app-hero>`
})
class TestHostComponent {
  hero: Hero;
  onDeleteClick = jasmine.createSpy('onDelete');
}

describe('HeroComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeroComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
  }));

  it('should display the hero passed in as the hero input', () => {
    fixture.componentInstance.hero = { id: 121, name: 'Mr Hero', strength: 4, age: 24 };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('121');
    expect(fixture.nativeElement.textContent).toContain('Mr Hero');
  });

  it('should trigger the delete output when the X button is clicked', () => {
    fixture.componentInstance.hero = { id: 121, name: 'Mr Hero', strength: 4, age: 24 };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    const stopPropagationSpy = jasmine.createSpy('stopPropagation');
    button.triggerEventHandler('click', { stopPropagation: stopPropagationSpy });
    fixture.detectChanges();

    const deleteClickSpy = fixture.componentInstance.onDeleteClick;
    expect(deleteClickSpy).toHaveBeenCalled();

    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
