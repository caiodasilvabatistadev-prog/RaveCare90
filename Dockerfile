FROM node:22-alpine AS frontend-build
WORKDIR /workspace/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_API_BASE_URL=/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM eclipse-temurin:17-jdk-alpine AS backend-build
WORKDIR /workspace/backend

COPY backend/.mvn .mvn
COPY backend/mvnw backend/pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -q dependency:go-offline
COPY backend/src src
COPY --from=frontend-build /workspace/frontend/dist src/main/resources/static
RUN ./mvnw -B -q package -DskipTests

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S ravecare && adduser -S ravecare -G ravecare
WORKDIR /app

COPY --from=backend-build /workspace/backend/target/*.jar app.jar
USER ravecare
EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]

