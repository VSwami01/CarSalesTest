import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ICar } from '../model/car';
import { CarService } from '../service/car.service';
import { GenericValidator } from '../service/generic-validator';


@Component({
  selector: 'app-car-component',
  templateUrl: './car.component.html'
})

export class CarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Car Edit';
  errorMessage: string;
  carForm: FormGroup;

  car: ICar;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.carForm.get('tags');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      make: {
        required: 'Car make is required.',
        minlength: 'Car make must be at least three characters.',
        maxlength: 'Car make cannot exceed 50 characters.'
      }, model: {
        required: 'Car model is required.',
        minlength: 'Car model must be at least three characters.',
        maxlength: 'Car model cannot exceed 50 characters.'
      }, engine: {
        required: 'Car engine is required.',
        minlength: 'Car engine must be at least three characters.',
        maxlength: 'Car engine cannot exceed 50 characters.'
      }, door: {
        required: 'Car door is required.',
        maxlength: 'Car door cannot exceed 50 characters.'
      }, wheel: {
        required: 'Car wheel is required.',
        minlength: 'Car wheel must be at least three characters.',
        maxlength: 'Car wheel cannot exceed 50 characters.'
      },
      //productCode: {
      //  required: 'Product code is required.'
      //},
      //starRating: {
      //  range: 'Rate the product between 1 (lowest) and 5 (highest).'
      //}
    };

    // Define an instance of the validator for use with this form, 
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      //productName: ['', [Validators.required,
      //Validators.minLength(3),
      //Validators.maxLength(50)]],
      //productCode: ['', Validators.required],
      //starRating: ['', NumberValidators.range(1, 5)],
      //tags: this.fb.array([]),
      //description: ''

      make: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      model: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      engine: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      door: ['', [Validators.required, Validators.maxLength(50)]],
      wheel: ['', [Validators.required, Validators.maxLength(50)]]

    });

    // Read the product Id from the route parameter
    
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id > 0) {
          this.getCar(id);
        }
      }
    );
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.carForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.carForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  getCar(id: number): void {
    this.carService.getCar(id)
      .subscribe(
        (car: ICar) => this.onCarRetrieved(car),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onCarRetrieved(car: ICar): void {
    if (this.carForm) {
      this.carForm.reset();
    }
    this.car = car;

    if (this.car.id === 0) {
      this.pageTitle = 'Add Car';
    } else {
      this.pageTitle = `Edit Car:`;
    }

    // Update the data on the form
    this.carForm.patchValue({
      make: this.car.make,
      model: this.car.model,
      engine: this.car.engine,
      door: this.car.door,
      wheel: this.car.wheel
    });
  }

  deleteProduct(): void {
    if (this.car.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the Car?`)) {
        this.carService.deleteCar(this.car.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }
  /*
  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }
  */
  saveCar(): void {
    if (this.carForm.dirty && this.carForm.valid) {
      //Copy the form values over the car object values
      let p = Object.assign({}, this.car, this.carForm.value);

      this.carService.saveCar(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
      );
    } else if (!this.carForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.carForm.reset();
    this.router.navigate(['/cars']);
  }
}
