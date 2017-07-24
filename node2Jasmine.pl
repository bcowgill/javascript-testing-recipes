#!/usr/bin/env perl
# replace node assert statements with equivalent jasmine ones

use strict;
use warnings;
use English qw(-no_match_vars);

my $DEBUG = 0;
my %replaceAssert = (
	strictEqual => 'toBe',
	notStrictEqual => 'not.toBe',
	deepEqual => 'toEqual',
	notDeepEqual => 'not.toEqual',
	equal => 'toBe',        # not strictly equivalent, but close
	notEqual => 'not.toBe', # not strictly equivalent, but close
);

if ($DEBUG)
{
	$replaceAssert{equal} = 'toNodeAssertEqual';
	$replaceAssert{notEqual} = 'not.toNodeAssertEqual';
}

main();

sub main
{
	local $INPUT_RECORD_SEPARATOR = undef;

	my $testCode = <>;
	$testCode =~ s{
		assert \s* \. \s* (\w+) \s* \( \s*
			([^,]+) \s* , \s* ([^\)]+)
			\s* \)
	}{
		"expect($2)." . replaceAssert($1) . "($3)"
	}xmsge;

	print $testCode;
}

sub replaceAssert
{
	my ($assert) = @ARG;
	if (exists($replaceAssert{$assert}))
	{
		$assert = $replaceAssert{$assert};
	}
	else
	{
		warn("no Jasmine replacement for $assert");
	}
	return $assert;
}

