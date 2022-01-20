import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any

    //This block is called before each test
    beforeEach(() => {

        //Set-Up phase where we prepare the components of the service we want to test   

        //This is a mock implementation of the dependancy
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService, 
                {provide: LoggerService, useValue: loggerSpy}
            ]
        }); 


        calculator = TestBed.get(CalculatorService);
    });

    //Describes the methods in the service that we want to test
    it('should add two numbers', () => {

        //Execution phase where we trigger the operation we want to test
        const result = calculator.add(2, 2);

        //Series of Test Assertions that will mark the test as a failure or success
        expect(result).toBe(4, "unexpected addition result");

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });

    //Describes the methods in the service that we want to test
    it('should subtract two numbers', () => {

        //Execution phase where we trigger the operation we want to test
        const result = calculator.subtract(2, 2);

        //Series of Test Assertions that will mark the test as a failure or success
        expect(result).toBe(0, "unexpected subtraction result");

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });




}); 