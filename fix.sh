#!/bin/bash
# Fix a test file to use with(JS.Test) and convert 2 spaces to tabs
FILE=$1
if [ ! -z $FILE ]; then
	perl -i.bak -pne '
		#s{\A}{\t}xmsg;
		s{(function|with)\(}{$1 (}xmsg;
		#s{JS \s+ = \s+ require}{JS = JS || require}xmsg;
		#s{\tJS\.Test\.describe}{with (JS.Test) \{\n\tdescribe}xmsg;
		#s{JS\.Test\.autorun\(\)}{autorun()\n\}}xmsg;
		#s{describe ( .+ with \s* \(this\) \s* \{ )}{describe$1 addSkip(this)}xmsg;
		#s[(\t}}\))][$1\n}]xmsg;
	' $FILE

	INDENT=2 fix-spaces.sh $FILE
fi

