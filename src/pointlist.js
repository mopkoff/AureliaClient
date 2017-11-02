import { inject } from 'aurelia-framework'
import { MyClass } from './my-class';

@inject(MyClass)
export class MyViewModel {
    constructor(MyClass) {
        this.myClass = MyClass;
    }
    somethingSpecial() {
        this.myClass.foo = 'bar';
    }
}