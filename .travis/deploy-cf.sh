#!/bin/bash
set -x

curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
ibmcloud api https://api.w3ibm.bluemix.net
ibmcloud login --apikey ${DEPLOY_API_KEY} --no-account
ibmcloud target -o bdc -s galasa
ibmcloud cf push