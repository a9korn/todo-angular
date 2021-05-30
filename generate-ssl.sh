#!/bin/bash

openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout ssl/server_new.key \
    -new \
    -out ssl/server_new.crt \
    -config ./openssl-custom.cnf \
    -sha256 \
    -days 365
