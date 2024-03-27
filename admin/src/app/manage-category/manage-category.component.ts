import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category.model';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService, private toastr: ToastrService) { }
  product_group_categories = [];
  product_type_categories = [];
  categories_list = [];
  deleteId: number | null = null;
  deleteName: string | null = null;
  editMode: boolean = false;
  showFilterDiv: boolean = false;
  catId: number | null = null;
  grp_cat_id: number | null = null;
  type_cat_id: number | null = null;
  status: string | null = null;
  catName: string | null = null;
  isActive: boolean = true;
  toDate: string | null = null;
  fromDate: string | null = null;
  @ViewChild('catgForm') catgForm: NgForm | undefined;
  @ViewChild('filterForm') filterForm: NgForm | undefined;
  ngOnInit(): void {
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
    this.getCatData()
  }
  updateCategory() {
    console.log(this.catId);
    const category: Category = {
      grpCatId: this.catgForm.form.controls['grp_cat_id'].value,
      typeCatId: this.catgForm.form.controls['type_cat_id'].value,
      isActive: this.catgForm.form.controls['isActive'].value,
      catName: this.catgForm.form.controls['catName'].value
    };
    if (this.editMode) {
      this.prodServ.updateCategory(category, this.catId).subscribe(() => {
        this.toastr.success('Category updated!', 'Success');
        this.getCatData()
      });
    }
    else {
      this.prodServ.addCat(category).subscribe(() => {
        this.toastr.success('New category added!', 'Success');
        this.getCatData()
      })
    }
    this.catgForm.form.reset();
  }
  selectGrpCat() {
    this.prodServ.getTypeCatUpdateListener().subscribe(catgrs => this.product_type_categories = catgrs);
    this.prodServ.getActiveTypeCat(this.grp_cat_id);

  }
  getCatData() {
    this.prodServ.fetchCategoryUpdateListener().subscribe(catglist => {
      console.log(catglist);
      this.categories_list = catglist;
    })
    this.prodServ.getCat()
  }
  addOpenModal() {
    this.editMode = false;
    this.grp_cat_id = null;
    this.type_cat_id = null;
    this.catName = '';
    this.isActive = true;
    this.catId = null;
  }
  getCatById(catId: number) {
    this.editMode = true;
    console.log(this.catId);
    this.prodServ.getCategoryById(catId).subscribe(response => {
      console.log(response);
      this.grp_cat_id = response.result.group_category_id;
      this.selectGrpCat()
      this.type_cat_id = response.result.type_category_id;
      this.catName = response.result.category_name;
      this.isActive = response.result['is_active'] == 1 ? true : false;
      this.catId = response.result.category_id;
    })
  }
  deleteCategory() {
    console.log(this.deleteId);
    this.prodServ.deleteCategory(this.deleteId).subscribe(res => {
      this.getCatData();
      this.toastr.success('Category deleted!', 'Success');
    })
  }
  deleteIdMethod(catId: number, catName: string) {
    this.deleteId = catId;
    this.deleteName = catName;
  }
  showFilterDivMethod() {
    this.showFilterDiv = true
  }
  applyFilter() {
    const payload = {
      grp_cat_id: this.grp_cat_id == null ? 0 : this.grp_cat_id,
      type_cat_id: this.type_cat_id == null ? 0 : this.type_cat_id,
      from_date: this.fromDate == null ? 0 : this.fromDate,
      to_date: this.toDate == null ? 0 : this.toDate,
      is_active: this.status == null ? -1 : this.status
    }
    console.log(this.type_cat_id);
    this.prodServ.fetchCategoryUpdateListener().subscribe(categories => {
      console.log(categories);
      this.categories_list = categories;
    })
    this.prodServ.getFilteredCat(payload);
  }
  resetFilterForm() {
    this.filterForm.form.reset();
    this.getCatData()
  }
}
