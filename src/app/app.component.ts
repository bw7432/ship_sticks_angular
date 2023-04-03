import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ship_sticks_angular';
  constructor (
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {}

  products: any = [];
  name: any = false;
  showName: any = false;

  checkoutForm = this.formBuilder.group({
    typeOf: ['', Validators.required],
    length: ['', Validators.required],
    width: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
  });

  ngOnInit(): void {
    // this.getProducts();
  }

  async getProducts() {
    console.log(this.checkoutForm.get('typeOf')?.value)
    var type_of = this.checkoutForm.get('typeOf')!.value;
    var length = this.checkoutForm.get('length')!.value;
    var width = this.checkoutForm.get('width')!.value;
    var height = this.checkoutForm.get('height')!.value;
    var weight = this.checkoutForm.get('weight')!.value;
    var data = await this.apiService.get(`/api/v1/products?type_of=${type_of}&length=${length}&width=${width}&height=${height}&weight=${weight}`).toPromise()
    this.products = data;
    this.name = this.products['data'][0]['name']
    // wait 5 seconds, close modal, set text on main page
    setTimeout(() => {
      console.log('sleep');
      this.showName = true;
      document.getElementById("close_modal")?.click();
    }, 5000);
  }
}
