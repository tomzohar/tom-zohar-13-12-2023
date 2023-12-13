import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SidenavComponent} from "./sidenav.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-host',
  template: `
    <app-sidenav>
    <ng-container side>
      <div class="side"></div>
    </ng-container>

      <ng-container content>
        <div class="content"></div>
      </ng-container>
  </app-sidenav>`,
})
class HostComponent {

}
describe('SidenavComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [SidenavComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render side content', () => {
    const sideContent = fixture.debugElement.query(By.css('.side'));
    expect(sideContent).toBeTruthy();
  });

  it('should render main content', () => {
    const mainContent = fixture.debugElement.query(By.css('.content'));
    expect(mainContent).toBeTruthy();
  });
});
