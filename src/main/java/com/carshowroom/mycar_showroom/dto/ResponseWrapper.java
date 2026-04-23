package com.carshowroom.mycar_showroom.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseWrapper<T> {
    private boolean success;
    private String message;
    private T data;
    private java.util.Map<String, String> errors;
    private String timestamp;

    public ResponseWrapper() {
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    public ResponseWrapper(boolean success, String message, T data) {
        this();
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ResponseWrapper(boolean success, String message, java.util.Map<String, String> errors) {
        this();
        this.success = success;
        this.message = message;
        this.errors = errors;
    }

    // Success factory
    public static <T> ResponseWrapper<T> success(String message, T data) {
        return new ResponseWrapper<>(true, message, data);
    }

    public static <T> ResponseWrapper<T> success(String message) {
        return new ResponseWrapper<>(true, message, null);
    }

    // Error factory
    public static <T> ResponseWrapper<T> error(String message) {
        return new ResponseWrapper<>(false, message, (T) null);
    }

    public static <T> ResponseWrapper<T> validationError(String message, java.util.Map<String, String> errors) {
        return new ResponseWrapper<>(false, message, errors);
    }

    // Getters/Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public java.util.Map<String, String> getErrors() { return errors; }
    public void setErrors(java.util.Map<String, String> errors) { this.errors = errors; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

