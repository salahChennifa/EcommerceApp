import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFromGroup?: FormGroup;

  totalPrice?: number = 0;
  totalQuantity?: number = 0;


  creditCardYears : number [] = [];
  creditCardMonths : number [] = [];

  countries: Country[] = [];
  
  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  storage: Storage = sessionStorage;


  
  constructor(private formBuilder: FormBuilder,
    private shopFormService :ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
    ) { }
// TODO Contunue the work on 31
  ngOnInit(): void {
    const theEmail = JSON.parse(this.storage.getItem("userEmail")!);
    this.checkoutFromGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
          firstName: new FormControl('', [Validators.required,
                                          Validators.minLength(2),
                                          ShopValidators.notOnlyWhitespace]),
          lastName:new FormControl('', [Validators.required, Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
          email:new FormControl(theEmail, 
                        [Validators.required, 
                        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        }),
        shippingAddress: this.formBuilder.group({
          street: new FormControl('', [Validators.required,
                                        Validators.minLength(2),
                                        ShopValidators.notOnlyWhitespace]),
          city: new FormControl('', [Validators.required,
                                    Validators.minLength(2),
                                    ShopValidators.notOnlyWhitespace]),
          state: new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
          zip: new FormControl('', [Validators.required,
                                    Validators.minLength(2),
                                    ShopValidators.notOnlyWhitespace]),

        }),
        billingAddress: this.formBuilder.group({
          street: new FormControl('', [Validators.required,
                                        Validators.minLength(2),
                                        ShopValidators.notOnlyWhitespace]),
          city: new FormControl('', [Validators.required,
                                    Validators.minLength(2),
                                    ShopValidators.notOnlyWhitespace]),
          state: new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
          zip: new FormControl('', [Validators.required,
                                    Validators.minLength(2),
                                    ShopValidators.notOnlyWhitespace]),


        }),

        creditCart: this.formBuilder.group({
          cartType: new FormControl('', [Validators.required]),
          nameOnCard: new FormControl('', [Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace]),
          cardNumber: new FormControl('', 
          [Validators.required, 
          Validators.pattern("[0-9]{16}")]),
          securityCode: new FormControl('', 
                    [Validators.required, 
                    Validators.pattern("[0-9]{3}")]),
          expirationMonth: [''], 
          expirationYear: [''],
        }),
    }); 

    // populate credit card months
    const startMonth : number = new Date().getMonth() + 1;
    console.log("startMonth : " + startMonth);
    this.shopFormService.getCreditCardMonths(startMonth)
    .subscribe( data => {
      console.log("data months" + JSON.stringify(data));
      this.creditCardMonths = data
    });
    // populate credit cart years
    this.shopFormService.getCreditCardYears()
    .subscribe(data =>  {
      console.log("data years" + JSON.stringify(data));
      this.creditCardYears = data
    });

    // populate countries
    this.shopFormService.getCountries().subscribe(
      data =>{
        console.log("Retrievd countries : " + JSON.stringify(data));
        this.countries = data;
      }
    )


    this.reviewCartDetails();

    // read the user's email address from borwser storage
   

  }

  reviewCartDetails() {
      // subscribe to cartService.totalQuantity
      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      )

      // subscribe to cartService.totalPrice

      this.cartService.totalPrice.subscribe(
        data => this.totalPrice = data
      )
  }

  onSubmit(){
    // console.log("handling the submit button", this.checkoutFromGroup?.invalid);
    //  console.log(this.checkoutFromGroup?.get('customer')?.value);
    // console.log(this.checkoutFromGroup?.get('shippingAddress')?.value);
    // console.log("Adress email" + this.checkoutFromGroup?.get('customer')?.value.email);
    // console.log("the shipping Adress country is" + this.checkoutFromGroup?.get('shippingAddress')?.value.country.name);
    // console.log("the shipping Adress state is" + this.checkoutFromGroup?.get('shippingAddress')?.value.state.name);
  

    if(this.findInvalidControls()){
      this.checkoutFromGroup!.markAllAsTouched();
      return;
    }
   
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;
    // create orderItems from carItems
    //- long way: 
    // let orderItems : OrderItem[] = [];
    // for(let i = 0; i < cartItems?.length!; i++){
    //   orderItems[i] = new OrderItem(cartItems![i]);
    // }

    // --the short way of doing the same thing
    let orderItems : OrderItem[] = cartItems?.map(tempCartItem => new OrderItem(tempCartItem))!;
    // set up purchase

    let purchase = new Purchase();

    //populate purcharse - customer
    purchase.customer  = this.checkoutFromGroup?.controls['customer'].value;

    //populate purcharse - shipping address 
    
    purchase.shippingAddress = this.checkoutFromGroup?.controls['shippingAddress'].value;
    const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    purchase.shippingAddress!.state = shippingState.name;
    purchase.shippingAddress!.country = shippingCountry.name;

    //populate purcharse - billing address

    purchase.billingAddress = this.checkoutFromGroup?.controls['billingAddress'].value;
    const billingState : State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
    const  billingCountry : Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));
    purchase.billingAddress!.state = billingState.name;
    purchase.billingAddress!.country = billingCountry.name;

    //populate purcharse - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call Rest via the checkoutService

    this.checkoutService.placeOrder(purchase).subscribe({
        next: response =>{
          alert(`Your order has been recieved.\n tracking number : ${response.orderTrackingNumber}`);
          // reset cart
          this.resetCart();
        },
        error: err =>{
          alert(`There was an error : ${err.message}`);
        }
      }
    );

   


  }

   findInvalidControls() {
    const controls = this.checkoutFromGroup?.controls;
    for (const name in controls) {
        const contorls_Sub:any = this.checkoutFromGroup?.get(name);
        for (const subName in contorls_Sub.controls){
          let tmp = name +"."+ subName;
          let obj : any = this.checkoutFromGroup?.get(tmp)?.errors;
          let exists = false;
          if (obj != null){
            exists =  Object.values(obj).includes(true);
          } 
          if(exists){
            console.log("invalid");
            return true;
          }
        }
       
    }
    return false;
    //console.log("Errors : " + invalid);
}

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    // reset the form
    this.checkoutFromGroup?.reset();
    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  copyShippingAdressToBillingAddress(e:any){
    if (e.target.checked){
      this.checkoutFromGroup?.controls['billingAddress']
      .setValue(this.checkoutFromGroup.controls['shippingAddress'].value);

      // fixe code bug :
      this.billingAddressStates = this.shippingAddressStates;
    }else{
      this.checkoutFromGroup?.controls['billingAddress'].reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFromGroup?.get('creditCart');

    const currentYear : number = new Date().getFullYear();

    const selectedYear : number = Number(creditCardFormGroup?.value);

    // if the current year equals the selected year, then start with the current month;
    let startMonth: number;
    if (currentYear == selectedYear){
      startMonth = new Date().getMonth() + 1;

    }else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months : " + JSON.stringify(data));
        this.creditCardMonths = data
      }
    )
  }

  getStates(formGroupName: string){
    // 'shippingAddress'
    const formGroup = this.checkoutFromGroup?.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`);
    console.log(`${formGroupName} country name : ${countryName}`);

    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }

  get firstName(){
    return this.checkoutFromGroup?.get("customer.firstName");
  }

  get lastName(){
    return this.checkoutFromGroup?.get("customer.lastName");
  }
  get email(){
    return this.checkoutFromGroup?.get("customer.email");
  }
  get shippingAddressStreet(){
    return this.checkoutFromGroup?.get("shippingAddress.street");
  }
  get shippingAddressCity(){
    return this.checkoutFromGroup?.get("shippingAddress.city");
  }
  get shippingAddressState(){
    return this.checkoutFromGroup?.get("shippingAddress.state");
  }
  get shippingAddressZipCode(){
    return this.checkoutFromGroup?.get("shippingAddress.zip");
  }
  get shippingAddressCountry(){
    return this.checkoutFromGroup?.get("shippingAddress.country");
  }
  // 

  get billingAddressStreet(){
    return this.checkoutFromGroup?.get("billingAddress.street");
  }
  get billingAddressCity(){
    return this.checkoutFromGroup?.get("billingAddress.city");
  }
  get billingAddressState(){
    return this.checkoutFromGroup?.get("billingAddress.state");
  }
  get billingAddressZipCode(){
    return this.checkoutFromGroup?.get("billingAddress.zip");
  }
  get billingAddressCountry(){
    return this.checkoutFromGroup?.get("billingAddress.country");
  }
  // 
  get creditCartType(){
    return this.checkoutFromGroup?.get("creditCart.cartType");
  }
  get creditNameOnCard(){
    return this.checkoutFromGroup?.get("creditCart.nameOnCard");
  }
  get creditCardNumber(){
    return this.checkoutFromGroup?.get("creditCart.cardNumber");
  }
  get creditSecurityCode(){
    return this.checkoutFromGroup?.get("creditCart.securityCode");
  }
 

  
  
}
