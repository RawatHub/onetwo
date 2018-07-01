import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  mongoId: String = "";
  organizationId: String = "";
  companyId: String = "";
  companyName: String = "";
  email: String = "";
  address: String = "";
  city: String = "";
  country: String = "";
  postalCode: Number;
  contact: Number;

  companyObjectGenerator() {
    var company = {
        organizationId: this.organizationId,
        companyId: this.companyId,
        companyName: this.companyName,
        email: this.email,
        address: this.address,
        city: this.city,
        country: this.country,
        postalCode: this.postalCode,
        contact: this.contact
    }

    return company;
  }

  add() {
    this.http.post("http://localhost:3000/companies/add", this.companyObjectGenerator()).subscribe((res) => {
      console.log("added", res);
    })
  }

  getAll() {
    this.http.get("http://localhost:3000/companies/get").subscribe((res) => {
      console.log(res);
    })
  }

  getByID() {
    this.http.get("http://localhost:3000/companies/get/" + this.mongoId).subscribe((res) => {
      console.log(res);
    })
  }

  delete() {
    this.http.delete("http://localhost:3000/companies/delete/" + this.mongoId).subscribe((res) => {
      console.log(res);
    })
  }

  update() {
    this.http.put("http://localhost:3000/companies/update/" + this.companyId, this.companyObjectGenerator()).subscribe((res) => {
      console.log(res);
    })
  }
}
