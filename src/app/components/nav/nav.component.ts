import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerForDisplayDto } from 'src/app/_dtos/CustomerForDisplayDto';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 _customerService;

  constructor(
     private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this._customerService = this.customerService;
  }

}
