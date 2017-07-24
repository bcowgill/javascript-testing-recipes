#!/usr/bin/env perl
# replace Jasmine expect chains with equivalent chai ones

use strict;
use warnings;
use English qw(-no_match_vars);

my $DEBUG = $ENV{DEBUG} || 0;
my $PREFIX = $ENV{PREFIX} || ''; # chai.
my %replaceAssert = (
	toBe => 'to.be.equal',
	'not.toBe' => 'to.not.equal',
	toEqual => 'to.deep.equal',
	'not.toEqual' => 'to.not.deep.equal',
);

main();

sub main
{
	local $INPUT_RECORD_SEPARATOR = undef;

	my $testCode = <>;
	$testCode =~ s{
		expect \s* \( ([^\)]+) \) \s*
			\. \s* ((?:not\.)?to\w+) \s*
			\(
	}{
		"${PREFIX}expect($1)." . replaceAssert($2) . "("
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

