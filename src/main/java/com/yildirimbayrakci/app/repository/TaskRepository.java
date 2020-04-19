package com.yildirimbayrakci.app.repository;

import com.yildirimbayrakci.app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
