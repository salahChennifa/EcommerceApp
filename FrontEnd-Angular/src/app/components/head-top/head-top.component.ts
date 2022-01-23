import { Component, OnInit, Renderer2 } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-head-top',
  templateUrl: './head-top.component.html',
  styleUrls: ['./head-top.component.css']
})
export class HeadTopComponent implements OnInit {

  isToggleLanguages : boolean = false;
  isTogglePrices : boolean = false;
  isToggleMyAccount : boolean = false;

  isAuthenticated: boolean = false;
  userFullName?: string;
  
  storage:Storage = sessionStorage;


  constructor(
    private oktaAuthService: OktaAuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) => {

          this.userFullName = res.name;
          // the user's email from authentication response
          const theEmail = res.email;
          // store on the browser
          this.storage.setItem("userEmail", JSON.stringify(theEmail));

        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    console.log("log out")
    this.oktaAuthService.signOut();
  }

  toggleLanguages(event :any){
    this.isToggleLanguages = !this.isToggleLanguages; 
  }

  togglePrices(event :any){
    this.isTogglePrices = !this.isTogglePrices; 
  }

  toggleMyAccount(event :any){
    this.isToggleMyAccount = !this.isToggleMyAccount; 
  }

}
