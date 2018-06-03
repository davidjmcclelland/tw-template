#MASHUP#

##Running Karma/Jasmine Tests##
There are Jasmine tests in the Tests directory, which test the 
combined javascript in the build/stage/Runtime/js/ directory.  We use Karma
to run these tests in the Chrome browser automatically.

###Installing Karma/Jasmine###
* Install [Node.js](http://nodejs.org/).
* From the root of the MASHUP directory, run
	<pre>
	npm install --save-dev
	npm install -g karma-cli</pre>
* Restart your shell to get the new cli.

###Running tests###
* You need to build the javascript before you can test it.  Minimally, you need to run "stage" from the MASHUP directory:
	<pre>
	gradle stage</pre>
* From the root of MASHUP, you can run, for example,
    <pre>
	karma start --single-run</pre>
    * There are lots of options for how to run Karma, you can learn more here:  https://karma-runner.github.io/

###Writing Tests###
* To write new Jasmine tests to be picked up and run by Karma, just place them 
  in the Tests/jasmine directory.  
* To learn more about Jasmine, check out the documentation here.  Learn particularly about "expect" and "spy":  https://jasmine.github.io/2.5/introduction