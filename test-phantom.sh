#!/bin/bash
# use phantom to run a test html file
# FORMAT=spec ./test-node.sh -- uses the spec output format
# TEST=only ./test-node.sh   -- only runs describe/it tests with the word only in them

SUITE=$1

if [ -z $SUITE ]; then
	TESTS=`find browser/ -name test.html | sort`
	for test in $TESTS;
	do
		FORMAT=$FORMAT ./test-phantom.sh $test
	done
else
	DIR=`dirname $SUITE`
	PLAN=`basename $SUITE .failed`
	PLAN=`basename $PLAN .skipped`
	SUITE="$DIR/$PLAN"
	if [ $SUITE == browser/jasmine_assertions/test.html ]; then
		SKIP=1
	fi
	if [ $SUITE == browser/qunit_assertions/test.html ]; then
		SKIP=1
	fi
	if [ $SUITE == browser/jasmine_before_each/test.html ]; then
		SKIP=1
	fi
	touch $SUITE.failed
	if [ -z $SKIP ]; then
		echo testing $SUITE
		if phantomjs phantom.js $SUITE; then
			echo == $? ==
			rm $SUITE.failed
		else
			echo == $? ==
		fi
	else
		echo testing $SUITE with help
		phantomjs phantom.js $SUITE > test-phantom.json &
		sleep 1
		killall phantomjs
		if grep '"passed":true' test-phantom.json; then
			echo == $? ==
			rm $SUITE.failed
		else
			X=$?
			cat test-phantom.json
			echo == $X ==
		fi
		rm test-phantom.json
	fi
fi
