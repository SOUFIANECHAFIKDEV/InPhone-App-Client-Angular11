import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserFormComponent } from './../../components/user-form/user-form.component';
import { CustomerForDisplayDto } from './../../_dtos/CustomerForDisplayDto';
import { CustomerService } from './../../_services/customer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public usersList: Array<CustomerForDisplayDto> = [];
  public indexCopied = null;
  constructor(private userService: CustomerService) { }

  ngOnInit(){
    this.getUsers();
  }

  public getUsers() {
    this.userService.getCustomers().subscribe((response: Array<CustomerForDisplayDto>) => {
      this.usersList = response;
      console.log(this.usersList);
    }, error => {
      console.log(error);
    })
  }

  deleteUser(userId,index){
    this.userService.deleteCustomer(userId).subscribe((response: boolean) => {
        if(response){
          this.usersList.splice(index,1);
          alert('Deleted Successfully');
        }else{
          alert('Error server, please try later!');
        }
    }, error => {
      console.log(error);
    })
  }
}
