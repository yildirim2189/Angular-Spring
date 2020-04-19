import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from 'src/app/modules/tasks/tasks.component';

export interface DialogData{
  name : string;
  task : Task;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  pickedTime;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    // this.data.task.date = new Date(this.data.task.date.getTime());
    console.log(this.data.task.date.getUTCHours(), "VVV")
    console.log(this.data.task.date.getMinutes(), "VVV")
    console.log(this.data.task.date.toLocaleString(), "VVV")
    
    let q = this.data.task.date.toLocaleString().split(/[: .]/)
    console.log(q) //3 4
    this.pickedTime = q[3] + ':' + q[4];
    
  }

  onClick(){
    this.data.task.date.setHours(this.pickedTime.split(":")[0], this.pickedTime.split(":")[1]);
    console.log("xxxxxxxxxxx")
    this.dialogRef.close(this.data.task);
  }

  onNoClick(){
    this.dialogRef.close();
  }


}
