/* DO NOT CHANGE */
var curPhrase = -1;
var time = 0;	  
setInterval(updateTime, 10);

/* INIT */
for(var i=0; i<phrases.length;i++) {
  phrases[i].time = 0;
  phrases[i].tries = 0;
  phrases[i].phraseInput = '';
  phrases[i].status = 0;
}

document.getElementById("conductorName").innerHTML = name;
document.getElementById("conductorEmail").innerHTML = mailto;
document.getElementById("conductorEmail").setAttribute("href", "mailto:"+mailto);

if (!('webkitSpeechRecognition' in window)) {
	// This browser does not support webkitSpeechRecognition!
	document.getElementById("test_transcript_output").innerHTML = "Sorry, but this browser has no support for webkitSpeechRecognition!";
	document.getElementById("startButton").setAttribute("disabled", "disabled");
	showError("no-support");
} else {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true; // We want to keep recording
	recognition.lang = "en_UK";
	var isRecording = false;

	recognition.onstart = function() { 
		startNow();
		isRecording = true;
	};
	recognition.onresult = checkResult;
	recognition.onerror = function(event) { 
	  console.log(event.error);
		document.getElementById("test_transcript_output").innerHTML = "<span class='red'>Sorry, but an error occured!</span>";
		showError(event.error);
	};
	recognition.onend = function() { 
		isRecording = false;
	};
}
/* INIT END */


function startRecognition() {
  recognition.start();
  document.getElementById("allow_hint_box").style.display = "block";
  document.getElementById("startButton").style.display = "none";
}

function startNow() {
  document.getElementById("allow_hint_box").style.display = "none";

  document.getElementById("isRecording").style.display = "block";
  document.getElementById("buttonGroup").style.display = "block";
  document.getElementById("phrase").style.display = "block";
  document.getElementById("phraseInfo").style.display = "block";

  nextPhrase();
}

function endRecognition() {
  recognition.stop();
  document.getElementById("isRecording").style.display = "none";
  document.getElementById("buttonGroup").style.display = "none";

  document.getElementById("phrase").style.display = "none";
  document.getElementById("phraseInfo").style.display = "none";
}

function correct() {
  var transcript = document.getElementById("test_transcript_output").innerHTML;
  if(transcript !== "") {
	console.log("test");
	phrases[curPhrase].status = 2;
	nextPhrase();
  }
}

function nearlyCorrect() {
  phrases[curPhrase].status = 1;
  nextPhrase();
}

function notCorrect() {
  phrases[curPhrase].status = 0;
  nextPhrase();
}

function nextPhrase() {
  if(curPhrase >= 0) {
	phrases[curPhrase].time = time;
	phrases[curPhrase].phraseInput = document.getElementById("test_transcript_output").innerHTML;
  }
  time = 0;


  curPhrase++;
  if(curPhrase > phrases.length-1) {
	finished();
	return;
  }

  document.getElementById("test_transcript_output").innerHTML = "";
  document.getElementById("phrase").innerHTML = phrases[curPhrase].phrase;
}


function checkResult(event) {
	var transcript = "";

	for(var i=event.resultIndex; i<event.results.length; i++) {
		transcript += event.results[i][0].transcript;
	}

	document.getElementById("test_transcript_output").innerHTML = transcript;

	phrases[curPhrase].tries++;
	if(transcript.trim().toLowerCase() === (phrases[curPhrase].phrase).toLowerCase()) {
	  correct();
	}


}

function finished() {
  endRecognition();

  var correct = 0;
  var nearlyCorrect = 0;
  var notCorrect = 0;

  var timeCorrect = 0;
  var timeAverage = 0;

  for(var i=0;i<phrases.length; i++) {
	if(phrases[i].status === 2) {
	  correct++;
	  timeCorrect += phrases[i].time;
	}
	if(phrases[i].status === 1) nearlyCorrect++;
	if(phrases[i].status === 0) notCorrect++;

	timeAverage += phrases[i].time;
  }

  if(correct > 0) timeCorrect = timeCorrect / correct;
  else timeCorrect = 0;
  timeAverage = timeAverage / (correct + nearlyCorrect + notCorrect);


  document.getElementById("test_transcript_output").style.display = "none";

  document.getElementById("transcript_result").style.display = "block";

  var detailTable = "<table class='detailTable'>";
  detailTable += "<tr><th>Phrase</th><th>Input</th><th>Status</th><th>Time</th><th>Tries</th><th>Type</th></tr>";
  for(var i=0;i<phrases.length; i++) {
	detailTable += "<tr>";
	detailTable += "<td>"+phrases[i].phrase+"</td>";
	detailTable += "<td>"+phrases[i].phraseInput+"</td>";
	var stat;
	if(phrases[i].status === 0) stat = "No";
	if(phrases[i].status === 1) stat = "Nearly";
	if(phrases[i].status === 2) stat = "Yes";
	detailTable += "<td>"+stat+"</td>";
	detailTable += "<td>"+(phrases[i].time/1000).toFixed(2)+" s</td>";
	detailTable += "<td>"+phrases[i].tries+"</td>";
	detailTable += "<td>"+phrases[i].type+"</td>";
	detailTable += "</tr>";
  }
  detailTable += "</table>";


  document.getElementById("transcript_result").innerHTML = "<h2>Results:</h2><ul>\n\
	<li><strong>"+correct+" correct</strong></li>\n\
	<li><strong>"+nearlyCorrect+" nearly correct</strong></li>\n\
	<li><strong>"+notCorrect+" not correct</strong></li>\n\
  </ul>\n\
  <p>Average time for phrases: "+(timeAverage/1000).toFixed(2)+" s<br/>Average time for correct phrases: "+(timeCorrect/1000).toFixed(2)+" s</p>\n\
\n\
\n\
"+detailTable;

sendEmail();

}

function updateTime() {
  time += 10;
}

function sendEmail() {

  var correct = 0;
  var nearlyCorrect = 0;
  var notCorrect = 0;

  var timeCorrect = 0;
  var timeAverage = 0;

  for(var i=0;i<phrases.length; i++) {
	if(phrases[i].status === 2) {
	  correct++;
	  timeCorrect += phrases[i].time;
	}
	if(phrases[i].status === 1) nearlyCorrect++;
	if(phrases[i].status === 0) notCorrect++;

	timeAverage += phrases[i].time;
  }

  if(correct > 0) timeCorrect = timeCorrect / correct;
  else timeCorrect = 0;
  timeAverage = timeAverage / (correct + nearlyCorrect + notCorrect);

   var detailTable = "<table border='1' cellpadding='8' style='border-collapse:collapse;'>";
  detailTable += "<tr><th>Phrase</th><th>Input</th><th>Status</th><th>Time</th><th>Tries</th><th>Type</th></tr>";
  for(var i=0;i<phrases.length; i++) {
	detailTable += "<tr>";
	detailTable += "<td>"+phrases[i].phrase+"</td>";
	detailTable += "<td>"+phrases[i].phraseInput+"</td>";
	var stat;
	if(phrases[i].status === 0) stat = "No";
	if(phrases[i].status === 1) stat = "Nearly";
	if(phrases[i].status === 2) stat = "Yes";
	detailTable += "<td>"+stat+"</td>";
	detailTable += "<td>"+(phrases[i].time/1000).toFixed(2)+" s</td>";
	detailTable += "<td>"+phrases[i].tries+"</td>";
	detailTable += "<td>"+phrases[i].type+"</td>";
	detailTable += "</tr>";
  }
  detailTable += "</table>";

  var subject = 'Web Speech API Accuracy Test Results';
  var body = "<h1>Web Speech API Accuracy Test Results</h1><ul>\n\
	<li><strong>"+correct+" correct</strong></li>\n\
	<li><strong>"+nearlyCorrect+" nearly correct</strong></li>\n\
	<li><strong>"+notCorrect+" not correct</strong></li>\n\
  </ul>\n\
  <p>Average time for phrases: "+(timeAverage/1000).toFixed(2)+" s<br/>Average time for correct phrases: "+(timeCorrect/1000).toFixed(2)+" s</p>\n";
  body += detailTable;

  mailData = {
	'mailto': mailto,
	'subject': subject,
	'body': body
  };

  $.post("sendmail.php", mailData, mailSuccess);

}

function mailSuccess() {
  console.log("Mail has been sent");
}

function translateError(error) {
  if(error === "no-speech") 
	return "No speech has been detected. Please click the following button to try again: <br/><br/><button type='button' onclick='location.reload();'>Try again</button>";

  if(error === "audio-capture")
	return "No microphone was found. <br/><br/>\n\
Please ensure that a microphone is installed and that  microphone settings are configured correctly, then press the following button to try again: <br/><br/><button type='button' onclick='location.reload();'>Try again</button>";

  if(error === "not-allowed")
	return "Sorry, you need to grant permission to use the microphone. <br/><br/>Please click the following button to try again: <br/><br/><button type='button' onclick='location.reload();'>Try again</button>";
  
  if(error === "no-support")
	return "Sorry, but it seems like your browser has no support for WebkitSpeechRecognition. \n\
<br/><br/>Please try again with another browser, like <a href='http://www.google.com/chrome'>Google Chrome</a>!";

  return "Sorry, a problem has occured. Error-Code: "+error+"<br/><br/>Please press the following button to try again: <br/><br/><button type='button' onclick='location.reload();'>Try again</button>";

}

function showError(errorCode) {
  var error = translateError(errorCode);
  
  document.getElementById("error_popup").innerHTML = "<div class='error_content'>"+error+"</div>";
  document.getElementById("error_popup").style.display = "block";
  
}