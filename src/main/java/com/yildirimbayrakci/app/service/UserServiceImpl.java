package com.yildirimbayrakci.app.service;

import com.yildirimbayrakci.app.model.Role;
import com.yildirimbayrakci.app.model.Task;
import com.yildirimbayrakci.app.model.User;
import com.yildirimbayrakci.app.payload.request.SignUpRequest;
import com.yildirimbayrakci.app.repository.RoleRepository;
import com.yildirimbayrakci.app.repository.TaskRepository;
import com.yildirimbayrakci.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override
  public User findUserByUsername(String username) {
    Optional<User> optionalUser = userRepository.findByUsername(username);
    User user;
    if(optionalUser.isPresent()){
      user = optionalUser.get();
    }else{
      throw new UsernameNotFoundException("Username not found:" + username);
    }
    return user;
  }

  @Override
  public Boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  @Override
  public Boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  @Override
  public void saveUser(SignUpRequest request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setFirstName("Test First name");
    user.setLastName("Test last name");
    user.setEmail(request.getEmail());
    user.setType("normal");
    user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER").get()));
    userRepository.save(user);
  }

  @Override
  public void saveUserTask(User user, Task task) {
    user.addTask(task);
    userRepository.save(user);
  }

  @Override
  public void deleteTask(String username, Long id) {
    User user = findUserByUsername(username);
    boolean result = user.removeTask(id);
    userRepository.save(user);
    taskRepository.deleteById(id);
  }

  @Override
  public void updateUserTask(User user, Task task) {
    Optional<Task> optionalTask = taskRepository.findById(task.getId());
    if(optionalTask.isPresent()){
      /*
      Task oldTask = optionalTask.get();
      oldTask.setContent(task.getContent());
      oldTask.setDate(task.getDate());*/
      taskRepository.save(task);
    }else{
      throw new RuntimeException("Task not found!");
    }
  }

  @Override
  public void UpdateUserTaskIsDone(User user, Long taskId, boolean done) {
    Optional<Task> optionalTask = taskRepository.findById(taskId);
    if(optionalTask.isPresent()){
      Task task = optionalTask.get();
      task.setDone(done);
      taskRepository.save(task);
    }else
      throw new RuntimeException("Task not found");
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionalUser = userRepository.findByUsername(username);
    if(!optionalUser.isPresent()){
      throw new UsernameNotFoundException("Invalid username or password: " + username);
    }

    User user = optionalUser.get();

    return new org.springframework.security.core.userdetails.User(
      user.getUsername(),
      user.getPassword(),
      mapRolesToAuthorities(user.getRoles())
    );
  }

  private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
  }
}

