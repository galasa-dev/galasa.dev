#!/bin/bash
set -e
set -x

ibmcloud target -r ${DEPLOY_REGION} -o galasa-org -s production
ibmcloud cf push --vars-file ${DEPLOY_VARS_FILE}