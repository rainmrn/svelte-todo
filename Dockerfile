FROM postgres:latest
COPY seed.sql /docker-entrypoint-initdb.d/