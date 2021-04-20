import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { ButtonForSetupDto } from 'src/app/_Dtos/ButtonForSetupDto';
import { CustomerForSetupDto } from 'src/app/_dtos/CustomerForSetupDto';
import { TypeButton } from 'src/app/_Dtos/TypeButton';
import { CustomerService } from 'src/app/_services/customer.service';

enum LogoEnum {
  Logo1 = 1,
  Logo2 = 2,
  Logo3 = 3,
}

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  public setupForm!: FormGroup;
  public buttons: Array<ButtonForSetupDto> = [];
  public logoEnum: typeof LogoEnum = LogoEnum;
  public modalRef: BsModalRef;
  public customerId: number = null;
  public buttonTypes:Array<TypeButton> =[];

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.customerId = params.customerId;
      if (params.customerId != undefined && params.customerId != null) {
        this.getSetupCustomerById(params.customerId);
      }
    });

    this.setupForm = this.fb.group({
      idCustomer: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      logo1: [null, [Validators.required]],
      logo2: [null, [Validators.required]],
      logo3: [null, [Validators.required]]
    });
    this.getButtonsTypes();
  }

  getSetupCustomerById(customerId:number){
    this.customerService.getSetupCustomerById(customerId).subscribe(res=>{
      debugger
      this.setupForm.patchValue(res);
      this.buttons = res.buttons.map(x => {
        const btn:ButtonForSetupDto = {
          label: x.label,
          description: x.description,
          content: x.content,
          type: x.type,
        }
        return btn
      });
    });
  }

  handleFileInput(file: FileList, logo: LogoEnum) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      console.log(event.target.result);
      switch (logo) {
        case LogoEnum.Logo1:
          this.setupForm.get("logo1").setValue(event.target.result);
          break;
        case LogoEnum.Logo2:
          this.setupForm.get("logo2").setValue(event.target.result);
          break;
        case LogoEnum.Logo3:
          this.setupForm.get("logo3").setValue(event.target.result);
          break;
      }
    };
    reader.readAsDataURL(file.item(0));
  }

  removeLogo(logo: LogoEnum) {
    switch (logo) {
      case LogoEnum.Logo1:
        this.setupForm.get("logo1").setValue(null);
        break;
      case LogoEnum.Logo2:
        this.setupForm.get("logo2").setValue(null);
        break;
      case LogoEnum.Logo3:
        this.setupForm.get("logo3").setValue(null);
        break;
    }
  }

  public openButtonsModal() {
    const initialState = {
      title: 'Add new button',
      buttons: this.buttons,
      buttonTypes : this.buttonTypes
    };

    this.modalRef = this.modalService.show(UserFormComponent, { initialState });
    this.modalRef.setClass('modal-lg');
    // this.modalRef.content.closeBtnName = 'Close';
  }

  delete(index: number): void {
    debugger
    this.buttons.splice(index, 1 )
  }

  edit(index: number): void {
    const buttonToEdit: ButtonForSetupDto = this.buttons[index];

    const initialState = {
      title: 'Edit button',
      buttons: this.buttons,
      buttonToEdit: buttonToEdit,
      indexToEdit: index,
      buttonTypes : this.buttonTypes
    };

    this.modalRef = this.modalService.show(UserFormComponent, { initialState });
    this.modalRef.setClass('modal-lg');
  }

  save() {
    debugger
    if (this.setupForm.invalid == true) {
      this.MarkFormGroupTouched(this.setupForm);
      return;
    }
    let body: CustomerForSetupDto = this.setupForm.value;
    body.buttons = this.buttons;
    if(this.customerId == null){
      this.customerService.setupNewCustomer(body).subscribe(res => {
        if (res == true) {
          alert('saved succefly');
          this.back();
        } else {
          alert('error server');
        }
      });
    }else{
      this.customerService.editSetupCustomer(body).subscribe(res => {
        if (res == true) {
          alert('edited succefly');
          this.back();
        } else {
          alert('error server');
        }
      });
    }
  }

  back() {
    this.router.navigate([`/users/list`]);
  }

  MarkFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.MarkFormGroupTouched(control);
      }
    });
  }
  getButtonsTypes(){
    this.customerService.getButtonsTypes().subscribe(res=>{
        this.buttonTypes = res;
    });
  }


  GetTypelable(type:Number):string {
    return this.buttonTypes.find(x => x.idTypeButton == type).label;
  }
}