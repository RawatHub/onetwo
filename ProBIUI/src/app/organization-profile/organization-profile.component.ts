import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  mongoID: String = "";
  organizationID: String = "";
  organization: String = "";
  email: String = "";
  address: String = "";
  city: String = "";
  country: String = "";
  postalCode: Number;
  contact: Number;

  organizationObjectGenerator() {
    var org = {
      organizationID: this.organizationID,
      name: this.organization,
      email: this.email,
      addressDetails: {
        address: this.address,
        city: this.city,
        country: this.country,
        postalCode: this.postalCode
      },
      contact: this.contact
    }

    return org;
  }

  add() {
    this.http.post("http://localhost:3000/organization/add", this.organizationObjectGenerator()).subscribe((res) => {
      console.log("received", res);
    })
  }

  getAll() {
    this.http.get("http://localhost:3000/organization/get").subscribe((res) => {
      console.log(res);
    })
  }

  getByID() {
    this.http.get("http://localhost:3000/organization/get/" + this.mongoID).subscribe((res) => {
      console.log(res);
    })
  }

  delete() {
    this.http.delete("http://localhost:3000/organization/delete/" + this.mongoID).subscribe((res) => {
      console.log(res);
    })
  }

  update() {
    this.http.put("http://localhost:3000/organization/update/" + this.organizationID, this.organizationObjectGenerator()).subscribe((res) => {
      console.log(res);
    })
  }
}
