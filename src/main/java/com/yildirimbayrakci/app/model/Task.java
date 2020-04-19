package com.yildirimbayrakci.app.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import sun.util.resources.TimeZoneNames;
import sun.util.resources.cldr.tr.TimeZoneNames_tr;

import javax.persistence.*;
import java.util.Date;
import java.util.TimeZone;

@Entity
@Table(name = "tasks")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "task_id")
  private Long id;

  @Column(name = "content")
  private String content;

  @Column(name ="is_done")
  private boolean isDone;

  @Column(name = "date")
  @JsonFormat(pattern="dd.MM.yyyy HH:mm:ss") //, timezone = "Europe/Istanbul"
  @Temporal(TemporalType.TIMESTAMP)
  private Date date;

  public Task(){}

  public Task(String content, Date date){
    this.content = content;
    this.date = date;
    //this.user = user;
  }

  public Task(Long id, String content, Date date, boolean isDone) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.isDone = isDone;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public boolean isDone() {
    return isDone;
  }

  public void setDone(boolean done) {
    isDone = done;
  }

  /*
  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }*/
}
