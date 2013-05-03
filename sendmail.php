<?php
  require_once("res/swiftmailer/swift_required.php");
  
  $to = strip_tags($_REQUEST["mailto"]);
  $subject = strip_tags($_REQUEST["subject"]);
  $body = $_REQUEST["body"];
  
  // Create the message
  $message = Swift_Message::newInstance();

  // Give the message a subject
  $message->setSubject($subject);

  // Set the From address with an associative array
  $message->setFrom(array('noreply@webspeechaccuracytest.com' => 'Web Speech API Test'));

  // Set the To addresses with an associative array
  $message->setTo(array($to));

  // Give it a body
  $message->setBody($body, "text/html");

  $transport = Swift_MailTransport::newInstance();
  $mailer = Swift_Mailer::newInstance($transport);
  $mailer->send($message);
?>