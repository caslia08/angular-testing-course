import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';


describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let element: DebugElement;
    let coursesService: any;

    const beginnerCourses = setupCourses()
        .filter(course => course.category == 'BEGINNER');

    const advancedCourses = setupCourses()
        .filter(course => course.category == 'ADVANCED');

    beforeEach(waitForAsync(() => {

        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

        TestBed.configureTestingModule({
            imports: [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: CoursesService, useValue: coursesServiceSpy }
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                element = fixture.debugElement;
                coursesService = TestBed.get(CoursesService);
            });

    }));

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should display only beginner courses", () => {

        coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

        fixture.detectChanges();

        const tabs = element.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found");

    });


    it("should display both tabs", () => {

        coursesService.findAllCourses.and.returnValue(of(advancedCourses));

        fixture.detectChanges();

        const tabs = element.queryAll(By.css(".mat-tab-label"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found");

    });

    it("should display advanced courses when the tab is clicked - fakeAsync", fakeAsync(() => {
        
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = element.queryAll(By.css(".mat-tab-label"));

        click(tabs[1]);

        fixture.detectChanges();

        flush(); 

        const cardTitles = element.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

        expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    
    }));

    //wait for async is not as convienitent as the fake async testing zone
    //Async does support actual HTTP calls whereas fakeasync does not 
    it("should display advanced courses when the tab is clicked - async", waitForAsync(() => {
        
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = element.queryAll(By.css(".mat-tab-label"));

        click(tabs[1]);

        fixture.detectChanges();

        fixture.whenStable().then(()=>{

            console.log("called whenStable"); 

            const cardTitles = element.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

            expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
    
            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

        }); 

    }));
});