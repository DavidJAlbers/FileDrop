#!/bin/bash

docker build -t registry.davidjalbers.de/davidjalbers/filedrop:0.1 .
docker push registry.davidjalbers.de/davidjalbers/filedrop:0.1

#TODO GET VERSION NUMBER FROM ELSEWHERE?