#!/bin/bash
set -e
set -x

cd gradle

./gradlew --info --stacktrace libertyPackage