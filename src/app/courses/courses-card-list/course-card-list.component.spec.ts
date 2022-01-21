import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule} from '../courses.module';
import { Course} from '../model/course';
import { CoursesCardListComponent } from "./courses-card-list.component";
import { By} from '@angular/platform-browser';


describe('CourseCardListComponent', () =>{

    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>; 
    let element: DebugElement; 

    //async is s an Angular testing untility function which will pass the body of the beforeEach block
    //Waits for any asynchronus methods launched by the test block to complete 
    //Therefore will wait for any promises/timeouts or any other browser anysynchronus operations
    //Default wait time is 5 seconds 
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[CoursesModule]
        }).compileComponents().then(()=>{
            fixture = TestBed.createComponent(CoursesCardListComponent); 
            component = fixture.componentInstance; 
            //This will let us query the DOM s
            element = fixture.debugElement; 
        }); 
    }); 


    it("should create the component", () =>{

        expect(component).toBeTruthy(); 

    }); 

    it("should display the course list", () =>{

        component.courses =setupCourses(); 

        //We need to trigger change detection to update the DOM
        fixture.detectChanges();        
        
        const cards = element.queryAll(By.css(".course-card")); 
       
        expect(cards).toBeTruthy(); 
        expect(cards.length).toBe(12, "Unexpected Number of Courses")
    }); 

    it("should display the first course", () =>{

        component.courses = setupCourses(); 

        fixture.detectChanges(); 

        const course = component.courses[0]; 

        const   card = element.query(By.css(".course-card:first-child")), 
                title = card.query(By.css("mat-card-title")), 
                image =card.query(By.css("img"));
         

        expect(card).toBeTruthy("Could not find course card"); 
        expect(title.nativeElement.textContent).toBe(course.titles.description); 
        expect(image.nativeElement.src).toBe(course.iconUrl);

    }); 


}); 