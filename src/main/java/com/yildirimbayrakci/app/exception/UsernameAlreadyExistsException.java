package com.yildirimbayrakci.app.exception;

public class UsernameAlreadyExistsException extends Exception{
  public UsernameAlreadyExistsException(){
    super("Username already exists in the database!");
  }
}
