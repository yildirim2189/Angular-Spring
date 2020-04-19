package com.yildirimbayrakci.app.service;

import com.yildirimbayrakci.app.model.Task;
import com.yildirimbayrakci.app.model.User;
import com.yildirimbayrakci.app.payload.request.SignUpRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
  public User findUserByUsername(String username);
  public Boolean existsByEmail(String email);
  public Boolean existsByUsername(String username);
  public void saveUser(SignUpRequest request);
  public void saveUserTask(User user, Task task);
  public void deleteTask(String username, Long id);
  public void updateUserTask(User user, Task task);
  void UpdateUserTaskIsDone(User user, Long taskId, boolean done);
}
