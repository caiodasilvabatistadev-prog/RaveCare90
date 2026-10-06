package com.cadastro.ravecareapp.exception;

import com.cadastro.ravecareapp.dto.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            ResourceNotFoundException.class,
            NoResourceFoundException.class
    })
    ResponseEntity<ApiErrorResponse> handleNotFound(HttpServletRequest request) {
        return response(HttpStatus.NOT_FOUND, "Recurso não encontrado.", request);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    ResponseEntity<ApiErrorResponse> handleMethodNotAllowed(HttpServletRequest request) {
        return response(HttpStatus.METHOD_NOT_ALLOWED, "Método HTTP não permitido.", request);
    }

    @ExceptionHandler({
            BusinessException.class,
            MethodArgumentNotValidException.class,
            MethodArgumentTypeMismatchException.class
    })
    ResponseEntity<ApiErrorResponse> handleInvalidRequest(HttpServletRequest request) {
        return response(HttpStatus.BAD_REQUEST, "Não foi possível concluir a solicitação.", request);
    }

    @ExceptionHandler(RateLimitExceededException.class)
    ResponseEntity<ApiErrorResponse> handleRateLimit(HttpServletRequest request) {
        return response(
                HttpStatus.TOO_MANY_REQUESTS,
                "Tente novamente mais tarde.",
                request
        );
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiErrorResponse> handleUnexpected(HttpServletRequest request) {
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro interno.", request);
    }

    private ResponseEntity<ApiErrorResponse> response(
            HttpStatus status,
            String message,
            HttpServletRequest request
    ) {
        ApiErrorResponse body = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                message,
                request.getRequestURI()
        );

        return ResponseEntity.status(status).body(body);
    }
}
