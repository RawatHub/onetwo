import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../models/company.interface';
import { CompanyService } from './company-profile.service';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private http: HttpClient, private _companyService: CompanyService, private http_req: HttpRequestsService) { }

  ngOnInit() {
  }

  company: ICompany = {
    id: "",
    organizationID: "",
    companyID: "",
    name: "",
    email: "",
    contactNumber: 0,
    address: "",
    city: "",
    country: "",
    postalCode: 0
  };

   url_type: string = 'companies';

  add() {
    this._companyService.add(this.company)
      .subscribe(function (response) {
        console.log(response);
      },
        function (error) {
          console.log(error);
        });
  }

  getAll() {
    this.http_req.getAll(this.url_type).subscribe((res) => {
      console.log(res);
    })
  }

  getByID() {
    this.http_req.getById(this.url_type, this.company.id).subscribe((res) => {
      console.log(res);
    })
  }

  delete() {
    this.http_req.delete(this.url_type, this.company.id).subscribe((res) => {
      console.log(res);
    })
  }

  update() {
    this.http_req.update(this.url_type, this.company.id, this.company).subscribe((res) => {
      console.log(res);
    })
  }
}
