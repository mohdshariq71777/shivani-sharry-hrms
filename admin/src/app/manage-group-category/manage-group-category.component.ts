import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from '../_services/products.service';
import { ColDef } from 'ag-grid-community';
import { GroupCategory } from '../models/group-category.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-group-category',
  templateUrl: './manage-group-category.component.html',
  styleUrls: ['./manage-group-category.component.css']
})
export class ManageGroupCategoryComponent implements OnInit {
  groupCategories = [];
  grpCat: GroupCategory = null;
  editMode: boolean = false;
  isActive: boolean = true;
  catName: string = '';
  groupCatId: number;
  deleteId: number;
  showFilterDiv: boolean = false;
  status: string | null = null;
  constructor(private prodServ: ProductService, private toastr: ToastrService) { }
  @ViewChild('groupCatgFrm') groupCatgFrm: NgForm | undefined;
  @ViewChild('filterForm') filterForm: NgForm | undefined;
  ngOnInit(): void {
    this.getGroupData()
  }
  applyFilter() {
    const payload = {
      from_date: this.filterForm.form.controls['fromDate'].value ? this.filterForm.form.controls['fromDate'].value : 0,
      to_date: this.filterForm.form.controls['toDate'].value ? this.filterForm.form.controls['toDate'].value : 0,
      is_active: this.status ? this.status : -1
    }
    this.prodServ.fetchGroupCategoryUpdateListener().subscribe(categories => {
      this.groupCategories = categories;
    })
    this.prodServ.getFilteredGroupCat(payload);

  }
  updateGroupCat() {
    this.grpCat = {
      grpCatName: this.groupCatgFrm.form.controls['catName'].value,
      isActive: this.groupCatgFrm.form.controls['isActive'].value
    }
    if (this.editMode === false) {
      this.prodServ.addGroupCat(this.grpCat).subscribe(() => {
        this.toastr.success('New group category added!', 'Success');
        this.getGroupData();
      })
    }
    else {
      this.prodServ.updateGroupCategory(this.grpCat, this.groupCatId).subscribe(response => {
        this.toastr.success('Group category updated!', 'Success');
        this.getGroupData();
      })
    }
    this.groupCatgFrm.form.reset();
  }
  openAddModal() {
    this.catName = '';
    this.isActive = true;
    this.editMode = false;
  }
  getGroupData() {
    this.prodServ.fetchGroupCategoryUpdateListener().subscribe(categories => {
      this.groupCategories = categories;
    })
    this.prodServ.getGroupCate();
  }
  getGroupCatById(grpCatId: number) {
    this.editMode = true;
    this.prodServ.getGroupCatById(grpCatId).subscribe(response => {
      this.isActive = response.result['is_active'] == 1 ? true : false;
      this.catName = response.result['group_category_name'];
      this.groupCatId = response.result['group_category_id']
    });
  }
  deleteGroupCategory(grpId: number) {
    this.prodServ.deleteGroupCategory(grpId).subscribe(res => {
      this.getGroupData();
      this.toastr.success('Group category deleted!', 'Success');
    })
  }
  deleteIdMethod(grpId: number) {
    this.deleteId = grpId;
  }
  toggleFilterDiv() {
    this.showFilterDiv = true
  }
  resetFilterForm() {
    this.filterForm.reset();
    this.getGroupData()
  }
}
