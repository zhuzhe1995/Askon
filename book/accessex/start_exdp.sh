#!/bin/bash

site_root=/home/oooxxx

if [[ $1 == "stop" ]]; then
  nginx -s stop
elif [[ $1 == "reload" ]]; then
  nginx -s reload
else
  nginx -c ${site_root}/conf/nginx.conf 
fi
