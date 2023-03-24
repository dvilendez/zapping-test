# Set the base image to the official PostgreSQL v13 image
FROM postgres:13

# Set the environment variables for the PostgreSQL database
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=zapping