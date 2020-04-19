package com.yildirimbayrakci.app.repository;

import com.yildirimbayrakci.app.model.Task;
import com.yildirimbayrakci.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  Optional<User> findByEmailAndType(String email, String type);
  Boolean existsByEmail(String email);
  Boolean existsByUsername(String username);
}
