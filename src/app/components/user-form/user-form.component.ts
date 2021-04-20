import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ButtonForSetupDto } from 'src/app/_Dtos/ButtonForSetupDto';
import { TypeButton } from 'src/app/_Dtos/TypeButton';
import { TypeButtonEnum } from 'src/app/_enums/TypeButtonEnum';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public buttonForm!: FormGroup;
  public title: string;
  public buttons: Array<ButtonForSetupDto> = [];
  public _buttonToEdit: ButtonForSetupDto = null;
  public indexToEdit:number = null;
  public set buttonToEdit(data){
    this._buttonToEdit = data;
  }
  public typeButtonEnum: typeof TypeButtonEnum = TypeButtonEnum;
  public buttonTypes:Array<TypeButton> =[];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private customerService:CustomerService) { }

  ngOnInit() {
    this.buttonForm = this.fb.group({
      label: [null, [Validators.required]],
      description: [null, [Validators.required]],
      content: ['', [Validators.required]],
      type: [null, [Validators.required]]
    });

    if(this.indexToEdit != null){
      this.buttonForm.patchValue(this._buttonToEdit);
    }
  }



  save(): void {
    if (this.buttonForm.invalid == true) {
      this.MarkFormGroupTouched(this.buttonForm);
      return;
    }

    let button:ButtonForSetupDto = this.buttonForm.value;
    button.type = parseInt(button.type as any);

    if(this.indexToEdit == null){
      this.buttons.push(this.buttonForm.value);
    }else{
      this.buttons[this.indexToEdit] = this.buttonForm.value
    }
    this.buttonForm.reset();
    this._buttonToEdit = null;
    this.indexToEdit = null;
    this.bsModalRef.hide();
  }

  close(): void {
    this.bsModalRef.hide();
  }

  MarkFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.MarkFormGroupTouched(control);
      }
    });
  }
}