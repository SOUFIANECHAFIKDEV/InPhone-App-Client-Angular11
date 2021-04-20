import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerForDisplayDto } from 'src/app/_dtos/CustomerForDisplayDto';
import { CustomerService } from './_services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/ {
  // public customer: CustomerForDisplayDto = null;

  // constructor(
  //   private customerService: CustomerService,
  //   private route: ActivatedRoute,
  // ) { }

  // ngOnInit(): void {
  //   debugger
  //   this.route.params.subscribe((params: Params) => {
  //     if (params.username != undefined && params.username != null) {
  //       this.getCustomerByUsername(params.username);
  //     }
  //   });
  // }

  // getCustomerByUsername(username: string) {
  //   debugger
  //   this.customerService.setupCustomerByUsername(username).subscribe((response: CustomerForDisplayDto) => {
  //     this.customer = response;
  //   }, error => {
  //     this.customer = null
  //   })
  // }
}