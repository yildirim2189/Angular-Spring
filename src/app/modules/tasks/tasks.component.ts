import { Component, OnInit} from '@angular/core';
import { MatSnackBar, MatDialog, DateAdapter} from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';

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
  error = '';
  inputVal: string;
  pickedDate : Date = new Date();
  pickedTime: any = new Date().getHours() + ':' + new Date().getMinutes();
  checkDateTime: boolean = false;
  disabledDateTime: boolean = true;
  


  constructor(private snackBar : MatSnackBar, private dialog: MatDialog, private userService: UserService,
    private translate: TranslateService, private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale(this.translate.currentLang);
      this.translate.onLangChange.subscribe(
        change => {
          this.dateAdapter.setLocale(change.lang)
        }
      )
    }

  ngOnInit() {
      this.getTasks();
  }

  addTask(input: string){
    if(input === '' || input.trim() === ''){
      this.error = 'Please enter a task!';
    }else{
      let date = new Date();
      if(!this.disabledDateTime){
        date = this.pickedDate;
        date.setHours(this.pickedTime.split(":")[0], this.pickedTime.split(":")[1]);
      }
      this.userService.addTask(input, date).subscribe(
        success => {
          this.getTasks();
          this.openSnackbar(this.translate.instant('task.add.success'));
          this.clearInput();
          console.log(success);
        },
        err => {
          console.error(err);
          this.openSnackbar(this.translate.instant('task.add.error'));
        }
      );
    }      
  }

  deleteTask(id : number){
    this.userService.deleteTask(id).subscribe(
      success => {
        this.getTasks();
        this.openSnackbar(this.translate.instant('task.delete.success'));
      }, 
      err => {
        console.error(err);
        this.openSnackbar(this.translate.instant('task.delete.error'));
      }
    );
  }

  editTask(id: number){
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })

    
    let copyTask = { ...this.tasks[index] }
    console.log(copyTask)
    console.log("TEst:" + copyTask.date.split(/[. :]/)) 
    copyTask.date = this.stringToDate(copyTask.date, false);
    // var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    // console.log(new Date((d[2],d[1]-1,d[0],d[3],d[4],d[5])));
    console.log(new Date(copyTask.date), "!!!")
  
    // Show Dialog for edit
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '600px',
      data: {
        name : this.translate.instant('task.edit.title'),
        task : copyTask
      }
    });
    console.log(copyTask.date, "123");

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result, "qqq")
        this.userService.updateTask({
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
        console.log(result)
        this.openSnackbar(this.translate.instant('task.edit.cancel'));
      }
    });
  }

  getTasks(){
    this.userService.getUserTasks().subscribe(
      data => {
        console.log(data)
        data.map(
          task => {
            task.date = this.stringToDate(task.date, true).toLocaleString();
            /*
            console.log(ts)
            console.error(ts.date.toString());
            console.error(ts.date.toDateString());
            console.error(ts.date.toISOString());
            console.error(ts.date.toUTCString());
            console.error(ts.date.toGMTString());
            console.error(ts.date.getDate());
            console.error(ts.date.getDay());
            console.error(ts.date.getFullYear());
            console.error(ts.date.getHours());
            console.error(ts.date.getMilliseconds());
            console.error(ts.date.getMinutes());
            console.error(ts.date.getMonth());
            console.error(ts.date.getSeconds());
            console.error(ts.date.getTime());
            console.error(ts.date.getUTCDay());
            console.error(ts.date.getUTCDate());
            console.error(ts.date.getUTCFullYear());
            console.error(ts.date.getUTCHours());
            console.error(ts.date.getUTCMilliseconds());
            console.error(ts.date.getUTCMinutes());
            console.error(ts.date.getUTCMonth());
            console.error(ts.date.getUTCSeconds());
            console.error(ts.date.toJSON());
            console.error(ts.date.toLocaleString());
            console.error(ts.date.toLocaleTimeString());
*/
          }
        );
        this.tasks = data;
      },
      err => { console.log(err)}
    )
  }

  /*  let d = copyTask.date.split(/[. :]/);
    // var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    // console.log(new Date((d[2],d[1]-1,d[0],d[3],d[4],d[5])));*/

  openSnackbar(message:string){
    this.snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  clearInput() {
    //this.inputVal = "";
    
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

  stringToDate(str, utc:boolean){
    let q = str.split(/[. :]/);
    if(utc === true){
      return new Date(Date.UTC(q[2],q[1]-1,q[0],q[3],q[4],q[5]));
    }
    return new Date(q[2],q[1]-1,q[0],q[3],q[4],q[5]);
  }

  markDone(id){
    console.log("markDone")
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })
    this.tasks[index].done = true;
    this.tasks[index].date = null;
    console.log(this.tasks[index])
    this.userService.updateTask(this.tasks[index]).subscribe(
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
  markUndone(id){
    console.log("markUndone")
    let index = _.findIndex(this.tasks, function(task){
      return task.id === id;
    })
    this.tasks[index].done = false;
    this.tasks[index].date = null;
    console.log(this.tasks[index])
    this.userService.updateTask(this.tasks[index]).subscribe(
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
