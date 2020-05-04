package com.yildirimbayrakci.app.exception;

import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.List;

public class ApiError {
  private HttpStatus status;
  private String message;
  private List<String> error;
  private int code;

  public ApiError(HttpStatus status, String message, List<String> error, int code) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.code = code;
  }

  public ApiError(HttpStatus status, String message, List<String> error) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.code = code;
  }

  public ApiError(HttpStatus status, String message, String error, int code) {
    this.status = status;
    this.message = message;
    this.error = Arrays.asList(error);
    this.code = code;
  }

  public ApiError(HttpStatus status, String message, String error) {
    this.status = status;
    this.message = message;
    this.error = Arrays.asList(error);
  }

  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public List<String> getError() {
    return error;
  }

  public void setError(List<String> error) {
    this.error = error;
  }

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }
}
