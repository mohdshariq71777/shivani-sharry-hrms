import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { TypeCategory } from '../models/type-category.model';
import { ColDef } from 'ag-grid-community'
@Component({
  selector: 'app-manage-type-category',
  templateUrl: './manage-type-category.component.html',
  styleUrls: ['./manage-type-category.component.css']
})
export class ManageTypeCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  columnDefs: ColDef[] = [
    { headerName: 'Sr No.', field: 'sr_no', width: 160 },
    { headerName: 'Group Category', field: 'group_category_name', width: 415 },
    { headerName: 'Type Category', field: 'type_category_name', width: 415 },
    {
      headerName: 'Is Active', field: 'is_active', width: 150, cellRenderer: function (params) {
        var status = params.value;
        var statusIcon = status == '1' ? 'Active' : 'InActive';
        return statusIcon;
      },
    },
    { headerName: 'Action', field: '', width: 200 },
  ];
  product_group_categories = [];
  typeCategories = [];
  tpCat: TypeCategory = null;
  @ViewChild('typeCatgForm') typeCatgForm: NgForm | undefined;
  ngOnInit(): void {
    this.getTypeCatData()
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
  }
  addTypeCategory() {
    this.tpCat = {
      grpCatId: this.typeCatgForm.form.controls['grp_cat_id'].value,
      typeCatName: this.typeCatgForm.form.controls['catName'].value,
      isActive: this.typeCatgForm.form.controls['isActive'].value
    }
    this.prodServ.addTypeCat(this.tpCat);
    this.getTypeCatData()
    this.typeCatgForm.form.reset();
  }
  getTypeCatData() {
    this.prodServ.getTypeCat().subscribe(res => {
      console.log(res);
      let typeCategories = res.result
      for (let i = 0; i < typeCategories.length; i++) {
        typeCategories[i]['sr_no'] = i + 1
      }
      this.typeCategories = typeCategories;
      console.log(typeCategories)
    })
  }
}
