import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { doesNotReject } from "assert";
import { count } from "console";
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';


describe("Async Testing Examples", () => {


    it("Asynchronus test example-  with Jasmine done()", (done: DoneFn) => {

        let test = false;

        //After 1000 milliseconds the setTimeout code block will be executed
        setTimeout(() => {

            console.log("running assertions");
            test = true;
            expect(test).toBeTruthy();

            done();

        }, 1000);
    });

    it("Asynchronus test example - with setTimeout()", fakeAsync(() => {

        let test = false;

        setTimeout(() => {

            console.log("running assertions on SetTimeout");
            test = true;
            expect(test).toBeTruthy();

        }, 1000);

        tick(1000);
    }));


    //Broswer operations are considered macro tasks and promised are considered to be microtasks 
    //In runtime the are 2 different queues for either task type
    //Microtasks can make the program more responsive if the test suite relies heavily on asynchronous tasks 
    it("Asynchronus test example - with plain promise", fakeAsync(() => {

        let test = false;

        console.log("Creating Promise");

        Promise.resolve().then(() => {

            console.log("Promise first then() evaluated successfully");

            test = true;

            return Promise.resolve();
        }).then(() => {

            console.log("Promise second then() evaluated successfully");

        });

        flushMicrotasks();

        console.log("Running test assertions");

        expect(test).toBeTruthy();

    }));

    it("Asynchronous test example - Promised +setTimeout()", fakeAsync(() => {

        let counter = 0;

        Promise.resolve().then(() => {

            counter += 10;

            setTimeout(() => {

                counter += 1;

            }, 1000);
        })

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(1000);

        expect(counter).toBe(11);

    }));


    it('Asynchronous test example - Observables', fakeAsync(() => {

        let test = false;

        console.log('Creating Observable');

        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {

            test = true;

        });

        tick(1000);

        console.log('Running test assertions');

        expect(test).toBe(true);


    }));








})
