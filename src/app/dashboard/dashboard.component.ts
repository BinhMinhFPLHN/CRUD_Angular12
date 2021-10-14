import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Subject } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { DashboardModel } from './dashboard.mode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public formValue !: FormGroup;
  public dashBoardObj: DashboardModel = new DashboardModel();
  employeeData: any
  theLoai: any = [];
  constructor(private frombuilder: FormBuilder, private api: ApiService) { }
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.formValue = this.frombuilder.group({
      tenSach: [''],
      soLuong: [''],
      theLoai: [''],
      NXB: ['']
    })
    this.getAllDashboard();
    this.getAllCategory();
  }
  //them sach
  postDashboardDetails() {
    this.dashBoardObj.tenSach = this.formValue.value.tenSach;
    this.dashBoardObj.soLuong = this.formValue.value.soLuong;
    this.dashBoardObj.theLoai = this.formValue.value.theLoai;
    this.dashBoardObj.NXB = this.formValue.value.NXB;
    this.api.postDashboard(this.dashBoardObj)
      .subscribe(res => {
        console.log(res);
        alert("Book Add Successfully ");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDashboard();
      },
        err => {
          alert("Loi da xay ra");
          console.log(err);
        })
  }
  //Hien thi danh sach
  getAllDashboard() {
    this.api.getDashboard()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  // Lay danh sach the loai
  getAllCategory() {
    this.api.getLishbook()
      .subscribe(rs => {
        console.log(rs);
        this.theLoai = rs;
      })
  }
  //Xoa sach
  deleteDashboard(row: any) {
    this.api.deleteDashboard(row.id)
      .subscribe(res => {
        alert("Ban muon xoa sach")
        this.getAllDashboard();
      })
  }

  onAdd() {
    this.formValue.controls['tenSach'].setValue("");
    this.formValue.controls['soLuong'].setValue("");
    this.formValue.controls['NXB'].setValue("");

  }

  onEdit(row: any) {
    this.dashBoardObj.id = row.id;
    this.formValue.controls['tenSach'].setValue(row.tenSach);
    this.formValue.controls['soLuong'].setValue(row.soLuong);
    this.formValue.controls['theLoai'].setValue(row.theLoai);
    this.formValue.controls['NXB'].setValue(row.NXB);

  }
  //Edit sach
  updateDashboard() {
    this.dashBoardObj.tenSach = this.formValue.value.tenSach;
    this.dashBoardObj.soLuong = this.formValue.value.soLuong;
    this.dashBoardObj.theLoai = this.formValue.value.theLoai;
    this.dashBoardObj.NXB = this.formValue.value.NXB;

    this.api.updateDashboard(this.dashBoardObj, this.dashBoardObj.id)
      .subscribe(res => {
        alert("Cập nhật thành công")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDashboard();

      })
  }


}

