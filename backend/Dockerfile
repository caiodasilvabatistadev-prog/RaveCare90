FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace

COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -q dependency:go-offline

COPY src src
RUN ./mvnw -B -q package -DskipTests

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S ravecare && adduser -S ravecare -G ravecare
WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar
USER ravecare
EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]

