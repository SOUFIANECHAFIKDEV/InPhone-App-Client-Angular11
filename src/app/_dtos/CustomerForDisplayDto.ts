import { ButtonsForDisplayDto } from "./ButtonsForDisplayDto";

export interface CustomerForDisplayDto {
  idCustomer: number;
  userName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  logo1: string;
  logo2: string;
  logo3: string;
  buttons: Array<ButtonsForDisplayDto>;
}