#!/usr/bin/env perl
# replace node assert statements with equivalent jstest ones

use strict;
use warnings;
use English qw(-no_match_vars);

my $DEBUG = $ENV{DEBUG} || 0;
my $PREFIX = $ENV{PREFIX} || '';
my %replaceAssert = (
	strictEqual => 'assertSame',
	notStrictEqual => 'assertNotSame',
	deepEqual => '|assertEqual',
	notDeepEqual => '|assertNotEqual',
	equal => 'assertSame',        # not strictly equivalent, but close
	notEqual => 'assertNotSame',  # not strictly equivalent, but close
);

if ($DEBUG)
{
	$replaceAssert{equal} = 'nodeAssertEqual';
	$replaceAssert{notEqual} = 'nodeAssertNotEqual';
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
		replaceAssert($1, $2, $3)
	}xmsge;

	print $testCode;
}

sub replaceAssert
{
	my ($assert, $actual, $expect) = @ARG;
	my $params = "($actual, $expect)";
	if (exists($replaceAssert{$assert}))
	{
		$assert = $replaceAssert{$assert};
		if ($assert =~ s{\A \|}{}xms)
		{
			$params = "($expect, $actual)";
		}
	}
	else
	{
		warn("no jstest replacement for $assert");
	}
	return "$PREFIX$assert$params";
}

