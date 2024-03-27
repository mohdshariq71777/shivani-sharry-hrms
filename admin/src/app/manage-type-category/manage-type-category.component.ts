import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { TypeCategory } from '../models/type-category.model';
import { ColDef } from 'ag-grid-community'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-type-category',
  templateUrl: './manage-type-category.component.html',
  styleUrls: ['./manage-type-category.component.css']
})
export class ManageTypeCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService, private toastr: ToastrService) { }
  editMode: boolean = false;
  product_group_categories = [];
  typeCategories = [];
  tpCat: TypeCategory = null;
  grp_cat_id: number | null = null;
  typeCatName: string | null = null;
  isActive: boolean = true;
  showFilterDiv: boolean = false;
  typ_cat_id: number | null = null;
  deleteId: number | null = null;
  status: string | null = null;
  fromDate: string | null = null;
  toDate: string | null = null;
  @ViewChild('typeCatgForm') typeCatgForm: NgForm | undefined;
  @ViewChild('filterForm') filterForm: NgForm | undefined;
  ngOnInit(): void {
    this.getTypeCatData()
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
  }
  updateTypeCategory() {
    this.tpCat = {
      grpCatId: this.typeCatgForm.form.controls['grp_cat_id'].value,
      typeCatName: this.typeCatgForm.form.controls['typeCatName'].value,
      isActive: this.typeCatgForm.form.controls['isActive'].value
    }
    if (this.editMode) {
      this.prodServ.updateTypeCategory(this.tpCat, this.typ_cat_id).subscribe(res => {
        this.toastr.success('Type category updated!', 'Success');
        this.getTypeCatData()
      })
    }
    else {
      this.prodServ.addTypeCat(this.tpCat).subscribe(() => {
        this.toastr.success('New type category added!', 'Success');
        this.getTypeCatData()
      });
    }
    this.getTypeCatData()
    this.typeCatgForm.form.reset();
  }
  getTypeCatData() {
    this.prodServ.getTypeCatUpdateListener().subscribe(fetchedtypeCategories => {
      this.typeCategories = fetchedtypeCategories;
    })
    this.prodServ.getTypeCat()
  }
  getTypeCatById(typeCatId: number) {
    this.editMode = true;
    this.prodServ.getTypeCatById(typeCatId).subscribe(res => {
      this.grp_cat_id = res.result.group_category_id;
      this.typeCatName = res.result.type_category_name;
      this.isActive = res.result['is_active'] == 1 ? true : false;
      this.typ_cat_id = res.result.type_category_id;
    });
  }
  addOpenModal() {
    this.editMode = false;
    this.grp_cat_id = null;
    this.typ_cat_id = null;
    this.typeCatName = '';
    this.isActive = true;
  }
  deleteTypeCategory(typeCatId: number) {
    this.prodServ.deleteTypeCategory(typeCatId).subscribe(res => {
      this.getTypeCatData();
      this.toastr.success('Type category deleted!', 'Success');
    })
  }
  deleteIdMethod(grpId: number) {
    this.deleteId = grpId;
  }
  showFilterDivMethod() {
    this.showFilterDiv = true
  }
  applyFilter() {
    const payload = {
      grp_cat_id: this.grp_cat_id ? this.grp_cat_id : 0,
      from_date: this.fromDate ? this.fromDate : 0,
      to_date: this.toDate ? this.toDate : 0,
      is_active: this.status ? this.status : -1
    }
    if (this.filterForm.valid === true) {
      this.prodServ.getTypeCatUpdateListener().subscribe(categories => {
        console.log(categories);
        this.typeCategories = categories;
      })
      this.prodServ.getFilteredTypeCat(payload);
    }
  }
  resetFilterForm() {
    this.filterForm.form.reset();
    this.getTypeCatData()
  }
}
