FROM postgres:latest
ENV POSTGRES_DB=app
COPY seed.sql /docker-entrypoint-initdb.d/