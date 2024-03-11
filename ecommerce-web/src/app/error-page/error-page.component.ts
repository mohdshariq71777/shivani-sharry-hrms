import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }
}
