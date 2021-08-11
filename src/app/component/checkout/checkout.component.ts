import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Address } from 'src/app/common/address';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private static readonly EmailRegex = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}');
  private static readonly PasswordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

  // min size or length for form Valdations 
  readonly minLength: number = 4;
  readonly cityStreetMinLength: number = 2;
  readonly zipCodeMinLength: number = 5;
  readonly cardNumberLength: number = 16;
  readonly securityCodeLength: number = 3;

  // Countries and States lists
  countries: Country[] = [];
  billingStateList: State[] = [];
  shippingStateList: State[] = [];

  // Form Contol Group or Container  
  formGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];

  // FormBuilder Shortens Creating insance of Various Forms
  constructor(private formBuilder: FormBuilder,
    private shopService: ShopService,
    private cartService: CartService,
    private checkOutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.cartService.cartItems.length > 0) {
      this.formBuilderGroup();
      this.crediCardExpiration();
      this.handleCountryList();
      this.quantityPriceSub();
    }else {
      this.router.navigateByUrl("/products")
    }
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      console.log(JSON.stringify(this.defineOrder()));
      this.placeOrder();
    }

    console.log(`price:${this.totalPrice} quantity: ${this.totalQuantity}`);
  }

  // Retreive a Controle or Group Value 
  getFormValue(control: string): FormGroup {
    return this.formGroup.get(control)?.value;
  }

  fillBillingAdress(): void {

    // Check for Shipping Adress validity before copying to billing adress 
    if (this.formGroup.get("ShippingAddress")?.invalid) {
      console.log(`failed  to copy`);
    } else {
      // of the BillingAdress Status which is the Check Box is false or unchecked 
      if (!this.getFormValue("billingAdressCheckBox")) {
        // Reset all values of the Billing Adress 
        this.formGroup.get("billingAddress")?.reset();
        this.billingStateList = []
      } else {
        // if the Check Box is checked or ture - copy the Values of shipping adress to billing adress
        this.formGroup.get("billingAddress")?.setValue(this.getFormValue("ShippingAddress"));
        this.billingStateList = this.shippingStateList
      }
      console.log(this.getFormValue("billingAddress"));
    }

  }


  // form Builder Contain Groups and Controls like billingAdressCheckBox Control and Customer Group
  private formBuilderGroup() {

    this.formGroup = this.formBuilder.group({

      billingAdressCheckBox: [false],

      customer: this.formBuilder.group({
        // second param of form control for Validator Example - required and min length
        firstName: [(""), [Validators.required, CustomValidator.minLength(this.minLength), CustomValidator.notOnlyWhiteSpaces]],
        lastName: [(""), [Validators.required, CustomValidator.minLength(this.minLength), CustomValidator.notOnlyWhiteSpaces]],
        email: [(""), [Validators.required, CustomValidator.pattern(CheckoutComponent.EmailRegex)]]
      }),

      ShippingAddress: this.formBuilder.group({
        street: [(""), [Validators.required, CustomValidator.minLength(this.cityStreetMinLength), CustomValidator.notOnlyWhiteSpaces]],
        city: [(""), [Validators.required, CustomValidator.minLength(this.cityStreetMinLength), CustomValidator.notOnlyWhiteSpaces]],
        country: [(""), [Validators.required]],
        state: [(""), [Validators.required]],
        zipCode: [(""), [Validators.required, CustomValidator.minLength(this.zipCodeMinLength), CustomValidator.notOnlyWhiteSpaces]]
      }),

      billingAddress: this.formBuilder.group({
        street: [(""), [Validators.required, CustomValidator.minLength(this.cityStreetMinLength), CustomValidator.notOnlyWhiteSpaces]],
        city: [(""), [Validators.required, CustomValidator.minLength(this.cityStreetMinLength), CustomValidator.notOnlyWhiteSpaces]],
        country: [(""), [Validators.required]],
        state: [(""), [Validators.required]],
        zipCode: [(""), [Validators.required, CustomValidator.minLength(this.zipCodeMinLength), CustomValidator.notOnlyWhiteSpaces]]
      }),

      creditCard: this.formBuilder.group({
        cardType: [(""), [Validators.required]],
        nameOnCard: [(""), [Validators.required, CustomValidator.minLength(this.minLength), CustomValidator.notOnlyWhiteSpaces]],
        cardNumber: [(""), [Validators.required, CustomValidator.onlyDigits(this.cardNumberLength), CustomValidator.notOnlyWhiteSpaces]],
        securityCode: [(""), [Validators.required, CustomValidator.onlyDigits(this.securityCodeLength), CustomValidator.notOnlyWhiteSpaces]],
        expirationMonth: [(""), [Validators.required, CustomValidator.notEqualTo("Select")]],
        expirationYear: [(""), [Validators.required, , CustomValidator.notEqualTo("Select")]]

      }),

    });

  }

  crediCardExpiration() {
    const date = new Date();
    const selectedDate: number = Number(this.getFormValue("creditCard.expirationYear"));

    if (selectedDate > date.getFullYear()) {
      date.setMonth(1);
    } else {
      // increment current Month by 1 Becouse Date.Month is 0 Based
      date.setMonth(date.getMonth() + 1);
    }

    // sub to shop Service Observables which take start Month/Year as Argument 
    this.shopService.getCreditCardMonth(date.getMonth()).subscribe(
      index => {
        console.log(index)
        this.creditCardMonth = index
        //this.formGroup.get("creditCard.expirationMonth")?.setValue(`select`)
      }
    )

    this.shopService.getCreditCardYear(date.getFullYear()).subscribe(
      index => {
        console.log(index)
        this.creditCardYear = index
        //this.formGroup.get("creditCard.expirationYear")?.setValue(`select`)
      }
    )
  }

  // subscribe and call to getCountriesList observable
  handleCountryList() {
    this.shopService.getCountriesList().subscribe(
      indexedDB => {
        this.countries = indexedDB
      }
    )
  }

  /* 
  * on country select/change call handleStateList that have groupname as paramter then get the value of counrty code 
  * and pass it as observable param to get the state list by mapping search by country code from json into 
  * interface and pass the list into shipping list or billing list 
  */
  handleStateList(groupName: string) {
    console.log(groupName)

    const group = this.formGroup.get(groupName)
    const countryCode = group?.value.country.sortName

    console.log(countryCode)

    this.shopService.getStateList(countryCode).subscribe(
      indexedDB => {
        if (groupName == "ShippingAddress") {
          this.shippingStateList = indexedDB
        } else {
          this.billingStateList = indexedDB
        }

        // select first state as default
        group?.get("state")?.setValue(indexedDB[0]);
      }
    );

  }

  // getters for Html validator Errors checks 
  get firstName() { return this.formGroup.get("customer.firstName") }
  get lastName() { return this.formGroup.get("customer.lastName") }
  get email() { return this.formGroup.get("customer.email") }

  get shippingCity() { return this.formGroup.get("ShippingAddress.city") }
  get shippingStreet() { return this.formGroup.get("ShippingAddress.street") }
  get shippingZipCode() { return this.formGroup.get("ShippingAddress.zipCode") }
  get shippingCountry() { return this.formGroup.get("ShippingAddress.country") }
  get shippingState() { return this.formGroup.get("ShippingAddress.state") }

  get billingCity() { return this.formGroup.get("billingAddress.city") }
  get billingStreet() { return this.formGroup.get("billingAddress.street") }
  get billingZipCode() { return this.formGroup.get("billingAddress.zipCode") }
  get billingCountry() { return this.formGroup.get("billingAddress.country") }
  get billingState() { return this.formGroup.get("billingAddress.state") }

  get creditCardNumber() { return this.formGroup.get("creditCard.cardNumber") }
  get creditCardSecurityCode() { return this.formGroup.get("creditCard.securityCode") }
  get creditCardNameOnCard() { return this.formGroup.get("creditCard.nameOnCard") }
  get creditCardType() { return this.formGroup.get("creditCard.cardType") }
  get creditCardExpirationMonth() { return this.formGroup.get("creditCard.expirationMonth") }
  get creditCardExpirationYear() { return this.formGroup.get("creditCard.expirationYear") }


  quantityPriceSub() {


    this.cartService.totalPrice.subscribe(
      data => {
        console.log(`CheckOutComponent${data}`)
        this.totalPrice = data
      }
    )

    this.cartService.totalQuantity.subscribe(
      data => {
        console.log(`CheckOutComponent${data}`)
        this.totalQuantity = data
      }
    )
  }

  defineOrder(): Order {
    let customer = new Customer(this.firstName?.value, this.lastName?.value, this.email?.value);
    let billing = new Address(this.billingCity?.value, this.billingCountry?.value.name, this.billingState?.value.name, this.billingStreet?.value, this.billingZipCode?.value)
    let shipping = new Address(this.shippingCity?.value, this.shippingCountry?.value.name, this.shippingState?.value.name, this.shippingStreet?.value, this.shippingZipCode?.value)

    let orderItems: OrderItem[] = [];
    this.cartService.cartItems.forEach(item => orderItems.push(new OrderItem(item)))

    return new Order(customer, billing, shipping, orderItems);
  }

  placeOrder() {
    let order: Order = this.defineOrder();

    this.checkOutService.sendOrder(order).subscribe({
      next: response => {
        alert(`you'r order has been recieved .\n order tracking number ${response.message}`)
        this.resetOrder(order)
      },
      error: err => {
        alert("something is worng , please try another time")
        console.log(err.message)
      }
    });

  }

  resetOrder(order: Order) {
    order = new Order()
    this.cartService.cartItems = []
    this.cartService.computeCartTotal()
    this.router.navigateByUrl("/products")
  }

}
