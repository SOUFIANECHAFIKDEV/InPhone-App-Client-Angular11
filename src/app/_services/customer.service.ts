import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { CustomerForDisplayDto } from '../_dtos/CustomerForDisplayDto';
import { TypeButton } from '../_Dtos/TypeButton';
import { CustomerForSetupDto } from '../_dtos/CustomerForSetupDto';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = environment.apiUrl;
    public customer: CustomerForDisplayDto = null;
    
    constructor(private http: HttpClient) {}

    public getCustomers(): Observable<Array<CustomerForDisplayDto>> {
        return this.http.get<Array<CustomerForDisplayDto>>(this.baseUrl + 'Customer/SetupsCustomers');
    }

    public getButtonsTypes(): Observable<Array<TypeButton>> {
        return this.http.get<Array<TypeButton>>(this.baseUrl + 'Customer/ButtonsTypes');
    }

    public setupNewCustomer(body: CustomerForSetupDto): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'Customer/SetupNewCustomer', body);
    }

    public editSetupCustomer(body: CustomerForSetupDto): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'Customer/EditSetupCustomer', body);
    }

    public getSetupCustomerById(customerId: number): Observable<CustomerForDisplayDto> {
        return this.http.get<CustomerForDisplayDto>(`${this.baseUrl}Customer/SetupCustomer/${customerId}`);
    }

    public setupCustomerByUsername(username:string): Observable<CustomerForDisplayDto>{
        return this.http.get<CustomerForDisplayDto>(this.baseUrl + 'Customer/setupCustomerByUsername/' + username );
    }

    public deleteCustomer(idCustomer:number): Observable<boolean>{
        return this.http.get<boolean>(this.baseUrl + 'Customer/deleteCustomer/' + idCustomer ); 
    }
}
