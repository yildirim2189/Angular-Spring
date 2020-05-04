import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';

export interface Task{
  id: number;
  content: string;
  date: any;
  done: boolean
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  obs: Observable<any>;
  tasks: Task[] = [];
  taskInput: string;
  pickedDate : Date = new Date();
  pickedTime: any = new Date().getHours() + ':' + new Date().getMinutes();
  checkDateTime: boolean = false;
  disabledDateTime: boolean = true;

  @ViewChild('taskPaginator', {static: true}) taskPaginator : MatPaginator;
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>(this.tasks);


  constructor(private snackBar : MatSnackBar, private dialog: MatDialog, private taskService: TaskService,
    private translate: TranslateService, private dateAdapter: DateAdapter<Date>, private themeService: ThemeService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.dateAdapter.setLocale(this.translate.currentLang);
    this.translate.onLangChange.subscribe(
      change => {
        this.dateAdapter.setLocale(change.lang)
      }
    );
  }

  ngOnInit() {
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.taskPaginator;
      this.obs = this.dataSource.connect();//
      this.getTasks();
      this.themeService.setTheme(this.themeService.getTheme())
  }

  addTask(input: string, form: NgForm){
    if(input === '' || input.trim() === ''){
      //
    }else{
      let date = new Date();
      if(!this.disabledDateTime){
        date = this.pickedDate;
        date.setHours(this.pickedTime.split(":")[0], this.pickedTime.split(":")[1]);
      }
      this.taskService.addTask(input, date).subscribe(
        success => {
          this.getTasks();
          this.openSnackbar(this.translate.instant('task.add.success'));
          form.resetForm();
        },
        err => {
          console.error(err);
          this.openSnackbar(this.translate.instant('task.add.error'));
        }
      );
    }
  }

  deleteTask(id : number){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minHeight: '200px',
      minWidth: '350px',
      data: {
        title : this.translate.instant('task.delete.title'),
        confirmYesTitle: this.translate.instant("delete"),
        confirmText: this.translate.instant("task.delete.confirmText")
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data === true){
        this.taskService.deleteTask(id).subscribe(
          success => {
            this.getTasks();
            this.openSnackbar(this.translate.instant('task.delete.success'));
          },
          err => {
            console.error(err);
            this.openSnackbar(this.translate.instant('task.delete.error'));
          }
        );
      }else{
        this.openSnackbar(this.translate.instant('task.delete.cancel'));
      }
    })

  }

  editTask(id: number){
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })

    let copyTask = { ...this.tasks[index] }
    copyTask.date = this.stringToDate(copyTask.date, false);

    // Show Dialog for edit
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '600px',
      data: {
        name : this.translate.instant('task.edit.title'),
        task : copyTask
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.taskService.updateTask({
          id: id,
          content: result.content,
          date: result.date,
          done: result.done
        }).subscribe(
          resp => {
            this.getTasks();
            this.openSnackbar(this.translate.instant('task.edit.success'));
          },
          err => { this.openSnackbar(this.translate.instant('task.edit.error')); }
        )
      }else{
        this.openSnackbar(this.translate.instant('task.edit.cancel'));
      }
    });
  }

  getTasks(){
    this.taskService.getUserTasks().subscribe(
      data => {
        data.map(
          (task: Task) => {
            task.date = this.stringToDate(task.date, true).toLocaleString();
          }
        );
        this.tasks = data;
        this.dataSource.data = data;
      },
      err => { console.error(err)}
    )
  }

  openSnackbar(message:string){
    this.snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  toggleDateTime(){
    if(this.checkDateTime){
      this.disabledDateTime = false;
      this.pickedDate = new Date();
      this.pickedTime = new Date().getHours() + ':' + new Date().getUTCMinutes();
    }else{
      this.disabledDateTime = true;
    }
  }

  stringToDate(str: any, utc:boolean){
    let q = str.split(/[. :]/);
    if(utc === true){
      return new Date(Date.UTC(q[2],q[1]-1,q[0],q[3],q[4],q[5]));
    }
    return new Date(q[2],q[1]-1,q[0],q[3],q[4],q[5]);
  }

  markDone(id: number){
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })
    this.tasks[index].done = true;
    this.tasks[index].date = null;
    this.taskService.updateTask(this.tasks[index]).subscribe(
      success => {
        this.getTasks();
        this.openSnackbar(this.translate.instant('task.done.success'))
      },
      error => {
        this.getTasks();
        this.openSnackbar(this.translate.instant('task.done.error'))
      }
    );
  }
  markUndone(id: number){
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })
    this.tasks[index].done = false;
    this.tasks[index].date = null;
    this.taskService.updateTask(this.tasks[index]).subscribe(
      success => {
        this.getTasks();
        this.openSnackbar(this.translate.instant('task.undone.success'))
      },
      error => {
        this.getTasks();
        this.openSnackbar(this.translate.instant('task.undone.error'))
      }
    )
  }
}
