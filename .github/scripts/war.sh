#!/bin/bash
set -e
set -x

WAR_FILENAME="galasa.dev-site.war"

rm -f "$WAR_FILENAME"

for n in "public" "war"
do
    cd $n
    zip --recurse-paths "../$WAR_FILENAME" .
    cd -
done
