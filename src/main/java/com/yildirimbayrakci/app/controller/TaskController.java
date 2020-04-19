package com.yildirimbayrakci.app.controller;

import com.yildirimbayrakci.app.model.Task;
import com.yildirimbayrakci.app.model.User;
import com.yildirimbayrakci.app.payload.request.TaskRequest;
import com.yildirimbayrakci.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

  @Autowired
  UserService userService;

  @GetMapping("/")
  public ResponseEntity<?> getAllUserTasks(Principal principal, WebRequest request, Session session){
      List<Task> tasks = (List<Task>) userService.findUserByUsername(principal.getName()).getTasks();
      return ResponseEntity.ok(tasks);
  }

  @PostMapping("/")
  public void  addTask(@RequestBody TaskRequest taskRequest, Principal principal, WebRequest request){
    if(userService.existsByUsername(principal.getName())){
      User user = userService.findUserByUsername(principal.getName());
      userService.saveUserTask(user, new Task(taskRequest.getContent(), taskRequest.getDate()));
    }
  }

  @DeleteMapping("/{id}")
  public void deleteTask(@PathVariable(name = "id") Long taskId, Principal principal){
    userService.deleteTask(principal.getName(), taskId);
  }

  @PutMapping("/")
  public void updateTask(@RequestBody TaskRequest taskRequest, Principal principal){
    if(userService.existsByUsername(principal.getName())){
      if(taskRequest.getDate() != null){
        User user = userService.findUserByUsername(principal.getName());
        userService.updateUserTask(user, new Task(taskRequest.getId(), taskRequest.getContent(), taskRequest.getDate(), taskRequest.isDone()));
      }else{
        User user = userService.findUserByUsername(principal.getName());
        userService.UpdateUserTaskIsDone(user, taskRequest.getId(), taskRequest.isDone());
      }

    }
  }
}
