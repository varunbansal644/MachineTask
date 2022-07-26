import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
interface TableDetails {
  name: string;
  department: string;
  salary: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('form') form: NgForm | undefined;

  tableColumnHeadings: Array<string> = [
    'Employee Name',
    'Department',
    'Salary',
    'Actions',
  ];

  tableData: TableDetails[] = [
    { name: 'Varun', department: 'FrontEnd', salary: 500 },
    { name: 'Riya', department: 'Backend', salary: 100 },
    { name: 'Anshika', department: 'FrontEnd', salary: 300 },
  ];

  addModel: any = {};
  editDataIndex: any;
  isUpdate: boolean = false;
  department: string = '';
  filteredData = this.tableData;

  constructor() {}

  addEmployee() {
    if (!this.form?.valid) {
      return;
    }
    this.tableData.push(this.addModel);
    this.addModel = {};
    this.filteredData = this.tableData;
  }

  deleteEmployee(i: any) {
    this.tableData.splice(i, 1);
  }

  editEmployee(index: any) {
    this.isUpdate = true;
    this.addModel.name = this.tableData[index].name;
    this.addModel.department = this.tableData[index].department;
    this.addModel.salary = this.tableData[index].salary;
    this.editDataIndex = index;
  }

  updateEmployee() {
    this.tableData[this.editDataIndex] = this.addModel;
    this.addModel = {};
    this.isUpdate = false;
    this.filteredData = this.tableData;
  }

  salary(args: any) {
    this.filteredData = this.tableData;
    if (args == 'max') {
      const max = Math.max(...this.tableData.map((item) => item.salary));
      this.filteredData = this.tableData.filter((item) => item.salary == max);
    } else {
      const min = Math.min(...this.tableData.map((item) => item.salary));
      this.filteredData = this.tableData.filter((item) => item.salary == min);
    }
  }

  dept(args: any) {
    this.filteredData = this.tableData;
    this.filteredData = this.tableData.filter(
      (item) => item.department.toLowerCase() == args
    );
  }
}
