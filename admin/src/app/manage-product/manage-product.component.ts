import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { FetchedProduct } from '../models/fetched-product.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  constructor(private prodServ: ProductService, private toastr: ToastrService) { }
  product_group_categories = [];
  product_type_categories = [];
  product_categories = [];
  products: FetchedProduct[] = [];
  uploadedFile: File | null = null;
  uploadedFileName: string | null = null;
  formData: FormData | null = new FormData();
  imagesArray = [];
  isActive: boolean = true;
  editMode: boolean = false;
  brand_name: string = '';
  grp_cat_id;
  type_cat_id;
  cat_id;
  images = [];
  uploadFiles: File[] | null = null;
  grpCatName: string = '';
  typeCatName: string = '';
  catName: string = '';
  prod_name: string = '';
  prod_price: string = '';
  deleteprodId: number | null = null;
  deleteprodName: string = '';
  @ViewChild('productForm') productForm: NgForm | undefined;
  @ViewChild('prod_image') prod_image: ElementRef;
  ngOnInit(): void {
    this.fetchProductsNGroup()
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
  }
  fetchProductsNGroup() {
    this.prodServ.fetchActiveProductsUpdateListener().subscribe(products => {
      this.products = products;
      console.log(this.products);
    })
    this.prodServ.fetchActiveProducts()
  }
  getProductById(prodId: number) {
    this.prodServ.getProductById(prodId).subscribe(res => {
      console.log(res);
      this.grp_cat_id = res.result.group_category_id;
      this.selectGrpCat()
      this.type_cat_id = res.result.type_category_id;
      this.selectTypeCat()
      this.cat_id = res.result.category_id;
      this.prod_name = res.result.product_name;
      this.prod_price = '' + Math.floor(+res.result.price);
      this.isActive = res.result.is_active === 1 ? true : false;
      this.brand_name = res.result.brand_name;
      this.imagesArray = res.result.images;
      console.log(this.imagesArray);
    });
    this.editMode = true;
  }
  openAddModal() {
    this.editMode = false;
    this.productForm.reset()
    this.isActive = true;
  }
  updateProduct() {
    this.editMode = false;
    this.formData.append('grpCatId', this.productForm.form.controls['grp_cat_id'].value)
    this.formData.append('typeCatId', this.productForm.form.controls['type_cat_id'].value)
    this.formData.append('catId', this.productForm.form.controls['cat_id'].value)
    this.formData.append('isActive', this.productForm.form.controls['isActive'].value)
    this.formData.append('productName', this.productForm.form.controls['prod_name'].value)
    this.formData.append('brandName', this.productForm.form.controls['brand_name'].value)
    this.formData.append('price', this.productForm.form.controls['prod_price'].value)
    console.log(this.formData);
    this.prodServ.addProduct(this.formData).subscribe(() => {
      this.toastr.success('New product added!', 'Success');
      this.fetchProductsNGroup();
    });
    this.formData = null;
  }
  onImage(e: any) {
    if (this.uploadFiles === null) {
      this.uploadFiles = e.target.files;
      console.log('uploadFiles is null');
    }
    else {
      let arrUplFiles = Array.from(this.uploadFiles)
      for (let i = 0; i < e.target.files.length; i++) {
        arrUplFiles.push(e.target.files[i])
      }
      this.uploadFiles = this.arrayToBlob(arrUplFiles) as File[];
      // e.target.files.forEach(file => {
      //   this.uploadFiles.push(file)
      // })
      console.log('uploadFiles is not null');
      console.log(this.uploadFiles);
      // for (let i = 0; i < this.uploadFiles.length; i++) {
      //   for (let j = 0; j < e.target.files; j++) {
      //     if (!this.uploadFiles.includes(e.target.files[j])) {

      //     }
      //   }
      // }
    }
    for (let i = 0; i < this.uploadFiles.length; i++) {
      this.formData.append(`files`, this.uploadFiles[i])
      let reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result)
      }
      reader.readAsDataURL(this.uploadFiles[i]);
    }
    console.log(e.target.files);
    console.log(this.images);
    console.log(this.formData);
  }
  spliceImg(images, index: number) {
    images.splice(index, 1);
    console.log(images);
    if (this.uploadFiles && this.uploadFiles.length > index) {
      const filesArray = Array.from(this.uploadFiles);
      filesArray.splice(index, 1);
      // console.log(filesArray);
      // console.log(this.arrayToBlob(filesArray));
      this.uploadFiles = this.arrayToBlob(filesArray) as File[]
      // this.uploadFiles.forEach(file => {
      //   this.formData.append('files', file)
      // })
      for (let i = 0; i < this.uploadFiles.length; i++) {
        this.formData.append(`files`, this.uploadFiles[i])
      }
      this.prod_image.nativeElement.value = '';
      console.log(this.prod_image.nativeElement.value);
    }
    console.log(this.uploadFiles);
    // const deletedOne = this.uploadFiles[index];
    // const element = this.uploadFiles[deletedOne];
    // delete this.uploadFiles[index];
    // console.log();
    // console.log(this.uploadFiles[index]);
    // let {'0' ,...newObj}=this.uploadFiles;
  }
  arrayToBlob = function (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
      obj[i] = array[i];
    }
    obj['length'] = array.length;
    return obj;
  }
  selectGrpCat() {
    this.prodServ.getTypeCatUpdateListener().subscribe(catgrs => this.product_type_categories = catgrs);
    this.prodServ.getActiveTypeCat(this.grp_cat_id)
  }
  selectTypeCat() {
    this.prodServ.getActiveCat(this.grp_cat_id, this.type_cat_id).subscribe(catgrs => {
      this.product_categories = catgrs.result;
    });
  }
  deleteProductMethod(prodId: number, prodName: string) {
    this.deleteprodId = prodId;
    this.deleteprodName = prodName;
  }
  deleteProduct() {
    this.prodServ.deleteProduct(this.deleteprodId).subscribe(() => {
      this.fetchProductsNGroup();
      this.toastr.success('Product deleted successfully!', 'Success');
    });
  }
}
