#!/bin/bash
# use node to run a test.js file
SUITE=$1

NODE=`which node`
if [ -z $NODE ]; then
	NODE=`which nodejs`
fi

if [ -z $SUITE ]; then
	echo node: $NODE
	TESTS=`find node/ -name test.js | sort`
	for test in $TESTS;
	do
		./test-node.sh $test
	done
else
	if grep testium $SUITE; then
		SKIP=1
	fi
	touch $SUITE.skipped
	touch $SUITE.failed
	if [ -z $SKIP ]; then
		rm $SUITE.skipped
		echo testing $SUITE
		if $NODE $SUITE; then
			echo == $? ==
			rm $SUITE.failed
		else
			echo == $? ==
		fi
	else
		echo skipping $SUITE
		rm $SUITE.failed
	fi
fi

