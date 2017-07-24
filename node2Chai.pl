#!/usr/bin/env perl
# replace node assert statements with equivalent chai ones

use strict;
use warnings;
use English qw(-no_match_vars);

my $DEBUG = $ENV{DEBUG} || 0;
my $PREFIX = $ENV{PREFIX} || ''; # chai.
my %replaceAssert = (
	strictEqual => 'to.be.equal',
	notStrictEqual => 'to.not.equal',
	deepEqual => 'to.deep.equal',
	notDeepEqual => 'to.not.deep.equal',
	equal => 'to.be.equal',        # not strictly equivalent, but close
	notEqual => 'to.not.equal',    # not strictly equivalent, but close
);

if ($DEBUG)
{
	$replaceAssert{equal} = 'to.nodeAssertEqual';
	$replaceAssert{notEqual} = 'to.not.nodeAssertEqual';
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
		"${PREFIX}expect($2)." . replaceAssert($1) . "($3)"
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
		warn("no Chai replacement for $assert");
	}
	return $assert;
}

