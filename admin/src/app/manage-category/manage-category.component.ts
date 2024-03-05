import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  columnDefs: ColDef[] = [
    { headerName: 'Sr No.', field: 'sr_no', width: 200 },
    { headerName: 'Group Category', field: 'group_category_name', width: 500 },
    { headerName: 'Type Category', field: 'type_category_name', width: 500 },
    { headerName: 'Category Name', field: 'category_name', width: 500 },
    {
      headerName: 'Is Active', field: 'is_active', width: 300, cellRenderer: function (params) {
        var status = params.value;
        var statusIcon = status == '1' ? 'Active' : 'InActive';
        return statusIcon;
      },
    },
    { headerName: 'Action', field: '', width: 200 },
  ];
  product_group_categories = [];
  product_type_categories = [];
  categories_list = [];
  @ViewChild('catgForm') catgForm: NgForm | undefined;
  ngOnInit(): void {
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
    this.getCatData()
  }
  addCategory() {
    this.prodServ.addCat(this.catgForm.form.controls['grp_cat_id'].value, this.catgForm.form.controls['type_cat_id'].value, this.catgForm.form.controls['isActive'].value, this.catgForm.form.controls['catName'].value)
    this.getCatData()
    this.catgForm.form.reset();
  }
  selectGrpCat() {
    this.prodServ.getActiveTypeCat(this.catgForm.form.controls['grp_cat_id'].value).subscribe(catgrs => this.product_type_categories = catgrs.result);

  }
  getCatData() {
    this.prodServ.getCat().subscribe(res => {
      let categories_list = res.result
      for (let i = 0; i < categories_list.length; i++) {
        categories_list[i]['sr_no'] = i + 1
      }
      this.categories_list = categories_list;
    })
  }
}
