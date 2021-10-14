import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { ListbookModel } from './lishbook.mode';
@Component({
  selector: 'app-listbook',
  templateUrl: './listbook.component.html',
  styleUrls: ['./listbook.component.scss']
})
export class ListbookComponent implements OnInit {
  formValue1 !: FormGroup;
  listBookObj: ListbookModel = new ListbookModel();
  listBookData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue1 = this.formbuilder.group({
      theLoai: [''],
    })
    this.getAllListbook();
  }
  //Thêm thể loại
  postListbookDetail() {
    this.listBookObj.theLoai = this.formValue1.value.theLoai;

    this.api.postLishbook(this.listBookObj)
      .subscribe(res => {
        console.log(res);
        alert("Thêm thành công")
        this.getAllListbook();
        let ref = document.getElementById('cancel')
        ref?.click(),
          this.formValue1.reset();
      },
        err => {
          alert("Lỗi thêm thể loại")
        })
  }
  // Hiển thì danh sách
  getAllListbook() {
    this.api.getLishbook()
      .subscribe(res => {
        this.listBookData = res;
      })
  }
  //Xoá thể loại
  deleteListbook(row: any) {
    this.api.deleteLishbook(row.id)
      .subscribe(res => {
        alert("Ban muon xoa sach")
        this.getAllListbook();
      })
  }

  onEdit(row: any) {
    this.listBookObj.id = row.id;
    this.formValue1.controls['theLoai'].setValue(row.theLoai);
  }

  //Edit thể loại
  updateListbook() {
    this.listBookObj.theLoai = this.formValue1.value.theLoai;
    
    this.api.updateLishbook(this.listBookObj, this.listBookObj.id)
      .subscribe(res => {
        alert("Cập nhật thành công")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue1.reset();
        this.getAllListbook();
      })
  }
}
