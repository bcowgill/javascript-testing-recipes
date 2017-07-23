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
	if [ -z $SKIP ]; then
		echo testing $SUITE
		$NODE $SUITE
		echo == $? ==
	else
		echo skipping $SUITE
	fi
fi

