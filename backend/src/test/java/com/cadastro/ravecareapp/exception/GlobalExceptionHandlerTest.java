package com.cadastro.ravecareapp.exception;

import com.cadastro.ravecareapp.dto.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();
    private final HttpServletRequest request = mock(HttpServletRequest.class);

    @Test
    void shouldReturnNotFoundWithoutExposingDetails() {
        when(request.getRequestURI()).thenReturn("/api/v1/users/missing");

        assertResponse(
                handler.handleNotFound(request),
                HttpStatus.NOT_FOUND,
                "Recurso não encontrado.",
                "/api/v1/users/missing"
        );
    }

    @Test
    void shouldReturnBadRequestWithoutExposingDetails() {
        when(request.getRequestURI()).thenReturn("/api/v1/users");

        assertResponse(
                handler.handleInvalidRequest(request),
                HttpStatus.BAD_REQUEST,
                "Não foi possível concluir a solicitação.",
                "/api/v1/users"
        );
    }

    @Test
    void shouldReturnInternalErrorWithoutExposingDetails() {
        when(request.getRequestURI()).thenReturn("/api/v1/users");

        assertResponse(
                handler.handleUnexpected(request),
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocorreu um erro interno.",
                "/api/v1/users"
        );
    }

    private void assertResponse(
            ResponseEntity<ApiErrorResponse> response,
            HttpStatus status,
            String message,
            String path
    ) {
        assertEquals(status, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().timestamp());
        assertEquals(status.value(), response.getBody().status());
        assertEquals(message, response.getBody().error());
        assertEquals(path, response.getBody().path());
    }
}
