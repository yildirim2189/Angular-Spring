package com.yildirimbayrakci.app.exception;

public class EmailAlreadyExistsException extends Exception{
  public EmailAlreadyExistsException(){
      super("Email already exists in the database!");
  }
}
