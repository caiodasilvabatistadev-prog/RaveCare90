package com.cadastro.ravecareapp.exception;

import com.cadastro.ravecareapp.dto.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

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

    @ExceptionHandler(RegistrationClosedException.class)
    ResponseEntity<ApiErrorResponse> handleRegistrationClosed(HttpServletRequest request) {
        return response(
                HttpStatus.FORBIDDEN,
                "Cadastro indisponível no momento.",
                request
        );
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiErrorResponse> handleUnexpected(Exception exception, HttpServletRequest request) {
        String errorId = UUID.randomUUID().toString();
        Throwable rootCause = rootCauseOf(exception);
        String applicationFrame = firstApplicationFrame(exception);

        // Log only exception types and code location: provider responses and request data can contain secrets/PII.
        LOGGER.error(
                "Unhandled request failure errorId={} method={} path={} exceptionType={} rootCauseType={} applicationFrame={}",
                errorId,
                request.getMethod(),
                request.getRequestURI(),
                exception.getClass().getName(),
                rootCause.getClass().getName(),
                applicationFrame
        );
        ResponseEntity<ApiErrorResponse> errorResponse = response(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocorreu um erro interno.",
                request
        );
        return ResponseEntity.status(errorResponse.getStatusCode())
                .header("X-Error-Id", errorId)
                .body(errorResponse.getBody());
    }

    private Throwable rootCauseOf(Throwable exception) {
        Throwable current = exception;
        while (current.getCause() != null && current.getCause() != current) {
            current = current.getCause();
        }
        return current;
    }

    private String firstApplicationFrame(Throwable exception) {
        Throwable current = exception;
        while (current != null) {
            for (StackTraceElement frame : current.getStackTrace()) {
                if (frame.getClassName().startsWith("com.cadastro.ravecareapp.")) {
                    return frame.getClassName() + "." + frame.getMethodName() + ":" + frame.getLineNumber();
                }
            }
            current = current.getCause();
        }
        return "unavailable";
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
