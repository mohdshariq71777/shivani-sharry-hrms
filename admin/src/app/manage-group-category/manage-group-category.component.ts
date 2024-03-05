import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from '../_services/products.service';
import { ColDef } from 'ag-grid-community';
import { GroupCategory } from '../models/group-category';
@Component({
  selector: 'app-manage-group-category',
  templateUrl: './manage-group-category.component.html',
  styleUrls: ['./manage-group-category.component.css']
})
export class ManageGroupCategoryComponent implements OnInit {
  columnDefs: ColDef[] = [
    { headerName: 'Sr No.', field: 'sr_no', width: 200 },
    { headerName: 'Group Category', field: 'group_category_name', width: 500 },
    {
      headerName: 'Is Active', field: 'is_active', width: 300, cellRenderer: function (params) {
        var status = params.value;
        var statusIcon = status == '1' ? 'Active' : 'InActive';
        return statusIcon;
      },
    },
    { headerName: 'Action', field: '', width: 200 },
  ];

  groupCategories = []
  grpCat: GroupCategory = null;
  constructor(private prodServ: ProductService) { }
  @ViewChild('groupCatgFrm') groupCatgFrm: NgForm | undefined;
  ngOnInit(): void {
    this.getGroupData()
  }
  addGroupCat() {
    this.grpCat = {
      grpCatName: this.groupCatgFrm.form.controls['catName'].value,
      isActive: this.groupCatgFrm.form.controls['isActive'].value
    }
    this.prodServ.addGroupCat(this.grpCat)
    this.groupCatgFrm.form.reset();
    this.getGroupData()
  }
  getGroupData() {
    this.prodServ.getGroupCate().subscribe(res => {
      let groupCategories = res.result
      for (let i = 0; i < groupCategories.length; i++) {
        groupCategories[i]['sr_no'] = i + 1
      }
      this.groupCategories = groupCategories;
    })
  }
}
