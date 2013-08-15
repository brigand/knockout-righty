#!/bin/bash

if [ -f index.md ]
    then
    cd tools
fi

tail -n+5 ../index.md > ../README.md

