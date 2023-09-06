#!/bin/bash

#
# Copyright contributors to the Galasa project
#
# SPDX-License-Identifier: EPL-2.0
#

output=$(npm run format:check:ci 2>/dev/null);
rc=$?
if [ $rc != 0 ]; then
	cat <<-EOF

		**************************************************************
		*                                                            *
		*    Prettier failed. Run 'npm run format' to format your    *
		*    code or 'npm run format:check' to see the problems.     *
		*                                                            *
		*    The diff can be seen below.                             *
		*                                                            *
		**************************************************************
		
	EOF
	echo -e "$output"
fi

exit $rc;