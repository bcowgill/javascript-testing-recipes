#!/usr/bin/env perl
# replace css colors with other ones taken from __DATA__ below
# and create jstest-dark.js by injecting the base64 encoded css into jstest.js
# as well as browser/commonjs/test-dark.js
#
# ./color-fix.pl jstest.css > jstest-dark.css 2> jstest-dark.base64

use strict;
use warnings;
use English qw(-no_match_vars);

use autodie qw(open);
use File::Slurp qw(:std);
use MIME::Base64 qw( encode_base64 );

my $DEBUG = 0;
my $JSTEST = 'jstest.js';
my $JSTEST_DARK = 'jstest-dark.js';
my $COMMONJS = 'browser/commonjs/test.js';
my $COMMONJS_DARK = 'browser/commonjs/test-dark.js';
my %colorMap = ();

main();

sub main
{
	read_data();
	my $css = replace_colors();
	output_base64($css);
}


sub read_data
{
	while (my $data = <DATA>)
	{
		chomp($data);
		my ($color, $newColor) = split(/\s+/, $data);
		print STDERR "data: $color -> $newColor\n" if $DEBUG;
		$colorMap{lc($color)} = lc($newColor);
	}
}

sub replace_colors
{
	my $css = '';
	while (my $line = <>)
	{
		$line =~ s{
			(\#[\da-f]+)
		}{
			replace($1);
		}xmsgei;
		$css .= $line;
		print $line;
	}
	return $css;
}

sub output_base64
{
	my ($css) = @ARG;

	my $base64 = encode($css);
	print STDERR $base64;
	inject_base64($JSTEST, $JSTEST_DARK, $base64);
	inject_base64($COMMONJS, $COMMONJS_DARK, $base64);
}

sub inject_base64
{
	my ($in, $out, $base64) = @ARG;
	my $rContent = read_file($in, scalar_ref => 1);

	$$rContent =~ s{
		url\(data:text/css;base64,
		([^\)]+)
		\)
	}{
		"$base64"
	}xmsge;

	my $fh;

	open($fh, ">", $out);
	print $fh $$rContent;
	close($fh);
}

sub replace
{
	my ($color) = @ARG;
	if (exists($colorMap{lc($color)}))
	{
		$color = $colorMap{lc($color)};
	}
	else
	{
		warn("no color replacement for $color");
	}
	return $color;
}

sub encode
{
	my ($css) = @ARG;
	$css = encode_base64($css);
	$css =~ s{\n}{}xmsg;
	$css = "url(data:text/css;base64,$css)";
	return $css;
}

__DATA__
#444 #BBB
#666 #999
#6c3 #6c3
#999 #666
#ccc #333
#ddd #222
#e40 #1BF
#eee #111
#fc6 #039
#fff #000
