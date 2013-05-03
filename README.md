SpeechAccuracyTest
==================

A simple test suite to test accuracy of the Web Speech API's SpeechRecognition.

Author: Francesco Novy - contact@fnovy.com - www.fnovy.com

Last Update: 03. May 2013

====================
BASIC INFORMATION
====================
This test suite can be used to test a collection of words, phrases and sentences for
the accuracy of speech recognition. You can enter as many texts as you want, and then
let various users go through the test. Each user will automatically generate a report at
the end of the test, that will be sent to you via email. You can then use this data
to optimise used speech commands.

This Suite is based on the Web Speech API, which is currently only included in Google Chrome, in a webkit-prefixed version. Therefore, the test will only work in Google Chrome!
For additional information on the topic, visit:

http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API


====================
INSTRUCTION
====================
1. Download the whole package.
2. Edit the config.js:
2a. Enter your name and email address.
2b. Add as many phrases as you want. 16 sample phrases are included. Each phrase must have a "type", which can be "word", "phrase" or "sentence".
3. Upload the whole folder to your website.
4. Send users to www.yourwebsite.com/folder_where_test_is/
5. Thats it! You will receive a report for each finished test. The report will be anonymised and contain all important data.

====================
CREDITS
====================
This test has been created by Francesco Novy. Included libraries are:
- PHP Swiftmailer
- jQuery for easy email-sending via AJAX

====================
LICENSE
====================
See "LICENSE.md" for licensing information. Basically, this test is Open Source and you can do whatever you want with it.