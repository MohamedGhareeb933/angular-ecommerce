import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstname: "",
        lastName: "",
        email: "",
      })

      // TODO - CREATE FORMBUILDER 
    })
  }

  onsubmit(formGroup : FormGroup): void {

  }

}
