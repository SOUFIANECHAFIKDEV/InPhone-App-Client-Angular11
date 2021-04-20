import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VCard, VCardEncoding, VCardFormatter } from 'ngx-vcard';
import { ButtonsForDisplayDto } from 'src/app/_Dtos/ButtonsForDisplayDto';
import { CustomerForDisplayDto } from 'src/app/_dtos/CustomerForDisplayDto';
import { TypeButtonEnum } from 'src/app/_enums/TypeButtonEnum';
import { CustomerService } from 'src/app/_services/customer.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public customer: CustomerForDisplayDto = null;
  public qrCodeString: string = "";
  public vCard: VCard = {};
  public vCardString = VCardFormatter.getVCardAsString(this.vCard);
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public typeButtonEnum: typeof TypeButtonEnum = TypeButtonEnum;
  public modalRef: BsModalRef;
  public buttons: Array<Array<ButtonsForDisplayDto>> = [[]];
  public isUrlCopied = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.username != undefined && params.username != null) {
        this.getCustomerByUsername(params.username);
      } else {
        this.goToNotFoundPage();
      }
    });
  }

  getCustomerByUsername(username: string) {
    this.customerService.setupCustomerByUsername(username).subscribe((response: CustomerForDisplayDto) => {
      debugger
      if (response == null) this.goToNotFoundPage();
      this.customerService.customer = response;
      this.customer = response;
      this.qrCodeString = environment.clientUrl + this.customer.userName;
      this.vCard = {
        name: {
          firstNames: this.customer.firstName,
          lastNames: this.customer.lastName,
        },
        // email: (this.customer.email as any),
        // // telephone: (this.customer.phone as any),
        // organization: (this.customer.companyName as any),

      };

      let index = 0;
      this.customer.buttons.forEach(btn => {
        if (this.buttons[index].length == 3) {
          index += 1;
          this.buttons[index] = [];
        };
        this.buttons[index].push(btn);
      });

    }, error => {
      this.goToNotFoundPage();
    })
  }

  goToNotFoundPage() {
    this.router.navigate([`/notFound`]);
  }

  openQrCodeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
