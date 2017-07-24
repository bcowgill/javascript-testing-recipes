#!/usr/bin/env perl
# replace qunit tests with node assert statements

use strict;
use warnings;
use English qw(-no_match_vars);

my $DEBUG = $ENV{DEBUG} || 0;
my $PREFIX = $ENV{PREFIX} || 'assert.';
my %replaceAssert = (
	strictEqual => 'strictEqual',
	notStrictEqual => 'notStrictEqual',
	deepEqual => 'deepEqual',
	notDeepEqual => 'notDeepEqual',
	equal => 'equal',
	notEqual => 'notEqual',
);

main();

sub main
{
	local $INPUT_RECORD_SEPARATOR = undef;

	my $testCode = <>;
	$testCode =~ s{
		(\w+) ( \s* \( )
	}{
		replaceAssert($1) . $2
	}xmsge;
	$testCode =~ s{assert\.assert\.}{assert.}xmsg;

	print $testCode;
}

sub replaceAssert
{
	my ($assert) = @ARG;
	if (exists($replaceAssert{$assert}))
	{
		$assert = $PREFIX . $replaceAssert{$assert};
	}
	return $assert;
}

