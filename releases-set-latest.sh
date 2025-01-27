#!/usr/bin/env bash

#
# Copyright contributors to the Galasa project
#
# SPDX-License-Identifier: EPL-2.0
#

# Objectives:
#   Every release has it's 

# Where is this script executing from ?
BASEDIR=$(dirname "$0");pushd $BASEDIR 2>&1 >> /dev/null ;BASEDIR=$(pwd);popd 2>&1 >> /dev/null
# echo "Running from directory ${BASEDIR}"
export ORIGINAL_DIR=$(pwd)
cd "${BASEDIR}"


#--------------------------------------------------------------------------
#
# Set Colors
#
#--------------------------------------------------------------------------
bold=$(tput bold)
underline=$(tput sgr 0 1)
reset=$(tput sgr0)

red=$(tput setaf 1)
green=$(tput setaf 76)
white=$(tput setaf 7)
tan=$(tput setaf 202)
blue=$(tput setaf 25)

#--------------------------------------------------------------------------
#
# Headers and Logging
#
#--------------------------------------------------------------------------
underline() { printf "${underline}${bold}%s${reset}\n" "$@" ;}
h1() { printf "\n${underline}${bold}${blue}%s${reset}\n" "$@" ;}
h2() { printf "\n${underline}${bold}${white}%s${reset}\n" "$@" ;}
debug() { printf "${white}%s${reset}\n" "$@" ;}
info() { printf "${white}➜ %s${reset}\n" "$@" ;}
success() { printf "${green}✔ %s${reset}\n" "$@" ;}
error() { printf "${red}✖ %s${reset}\n" "$@" ;}
warn() { printf "${tan}➜ %s${reset}\n" "$@" ;}
bold() { printf "${bold}%s${reset}\n" "$@" ;}
note() { printf "\n${underline}${bold}${blue}Note:${reset} ${blue}%s${reset}\n" "$@" ;}

#-----------------------------------------------------------------------------------------
# Functions
#-----------------------------------------------------------------------------------------
function usage {
    info "Syntax: releases-set-latest.sh --version {version}"
    cat << EOF
Options are:
-v | --version {version} : Mark this version as the latest. {version} is expected to match 
a release of the documentation. For example: v0.40.0
EOF
}

#--------------------------------------------------------------------------



#----------------------------------------------------------------------------
function check_exit_code () {
    # This function takes 3 parameters in the form:
    # $1 an integer value of the expected exit code
    # $2 an error message to display if $1 is not equal to 0
    if [[ "$1" != "0" ]]; then 
        error "$2" 
        exit 1  
    fi
}


#--------------------------------------------------------------------------
# 
# Main script logic
#
#--------------------------------------------------------------------------

#-----------------------------------------------------------------------------------------
# Process parameters
#-----------------------------------------------------------------------------------------
version=""

while [ "$1" != "" ]; do
    case $1 in
        -v | --version )        shift
                                version="$1"
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     error "Unexpected argument $1"
                                usage
                                exit 1
    esac
    shift
done

if [[ "${version}" == "" ]]; then
    error "Need to specify a release version which is to be set as the latest. Use --version {xxxx} option"
    usage
    exit 1
fi

#--------------------------------------------------------------------------
h1 "Setting the latest"
#--------------------------------------------------------------------------
# Collect what the current branch is.
original_branch=$(git branch --show-current)

# Move to the gh-pages branch to update it.
git fetch
git checkout gh-pages
check_exit_code $? "Failed to switch to gh-pages branch. Exiting now."
git pull
git checkout $original_branch

mike alias "${version}" latest --push --update-aliases


