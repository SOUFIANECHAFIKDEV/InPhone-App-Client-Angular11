import { ButtonForSetupDto } from "./ButtonForSetupDto";

export interface CustomerForSetupDto {
    idCustomer?: number;
    firstName: string;
    lastName: string;
    companyName: string;
    phone: string;
    email: string;
    logo1: string;
    logo2: string;
    logo3: string;
    buttons: Array<ButtonForSetupDto>;
  }