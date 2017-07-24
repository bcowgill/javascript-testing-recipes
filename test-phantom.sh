#!/bin/bash
# use phantom to run a test html file
SUITE=$1

if [ -z $SUITE ]; then
	TESTS=`find browser/ -name test.html | sort`
	for test in $TESTS;
	do
		./test-phantom.sh $test
	done
else
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
