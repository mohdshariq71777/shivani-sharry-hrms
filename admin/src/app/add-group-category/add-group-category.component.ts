import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from '../_services/products.service';
import { ColDef } from 'ag-grid-community';
declare var $:any
@Component({
  selector: 'app-add-group-category',
  templateUrl: './add-group-category.component.html',
  styleUrls: ['./add-group-category.component.css']
})
export class AddGroupCategoryComponent implements OnInit {
  columnDefs: ColDef[] = [
		{ headerName: 'Sr No.', field: 'sr_no' , width: 200},
		{ headerName: 'Group Category', field: 'group_category_name' , width: 500 },
		{ headerName: 'Is Active', field: 'is_active', width: 300 , cellRenderer: function(params) {
      var status = params.value;
      var statusIcon = status == '1' ? 'Active' :'InActive';
      return statusIcon;
  },},
  { headerName: 'Action', field: '' , width: 200},
	];

	groupCategory :any[]=[]
  constructor(private prodServ: ProductService) { }
  @ViewChild('groupCatgFrm') groupCatgFrm: NgForm | undefined;
  ngOnInit(): void {
this.getGroupData()
  }
  addGroupCat() {
    this.prodServ.addGroupCat(this.groupCatgFrm.form.controls['catName'].value, this.groupCatgFrm.form.controls['isActive'].value)
    this.groupCatgFrm.form.reset();
    this.getGroupData()
$('#exampleModal').modal('hide')
  }
  getGroupData(){
    this.prodServ.getGroupCate().subscribe(res=>{
      console.log(res);
      let groupCategory = res.result
      for (let i = 0; i < groupCategory.length; i++) {
        groupCategory[i]['sr_no']=i+1 
        
      }
      this.groupCategory = groupCategory
      // for (let i = 0; i < groupCategory.length; i++) {
      //   this.columnDefs.push({headerName: "Group Category",field: groupCategory[i].group_category_name})
      // }
    
    })
  }
}
