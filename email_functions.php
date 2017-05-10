<?php
/**
 * HTML Email Script
 *
 * Author: Chris Cagle
 * Link: http://online-code-generator.com/html-email-starter-script.php
 *
 */
 
 
// Change these values to match your website
define('FROM_EMAIL', 'noreply@example.com'); 
define('SITE_NAME', 'Sample Website'); 
define('SITE_URL', 'http://www.example.com'); 




/* ******************************************************************* */
// Dont change anything below this line


/**
 * Send Mail
 *
 * 64-bit safe
 *
 * @uses FROM_EMAIL
 * @param string $to
 * @param string $subject
 * @param string $message
 * @return bool
 */
sendmail('zulfikrizulkiflee@gmail.com','test','','');
function sendmail($to,$subject,$message,$from = FROM_EMAIL) {
	
	$message = email_template($message);
    echo $message;
	
	$headers  = "From: ".$from."\r\n";
  $headers .= "Reply-To: ".$from."\r\n";
  $headers .= "Return-Path: ".$from."\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  
  if( mail($to,'=?UTF-8?B?'.base64_encode($subject).'?=',"$message",$headers) ) {
     return true;
  } else {
     return false;
  }
}


/**
 * Email HTML Template
 *
 * @uses SITE_URL
 * @uses SITE_NAME
 * @return string
 */
function email_template($message) {
	$data = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
	<style>
	 table td p {margin-bottom:15px;}
	</style>
	</head>
	<body style="padding:0;margin:0;background: #f3f3f3;font-family:arial, \'helvetica neue\', helvetica, serif" >
	<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="padding: 0 0 35px 0; background: #f3f3f3;">
  	<tr>
	    <td align="center" style="margin: 0; padding: 0;">
	      <center>
	        <table border="0" cellpadding="0" cellspacing="0" width="480">
						<tr>
							<th style="padding:10px 0 10px 5px;text-align:left;vertical-align:top;" >
								<a href="'.SITE_URL.'" target="_blank" >'.SITE_NAME.'</a>
							</th>
						</tr>
						<tr>
							<td style="border-radius:5px;background:#fff;border:1px solid #e1e1e1;font-size:12px;font-family:arial, helvetica, sans-serif;padding:20px;font-size:13px;line-height:22px;" >
	'.$message.'
							</td>
						</tr>
						<tr>
							<td style="padding-top:10px;font-size:10px;color:#aaa;line-height:14px;font-family:arial, \'helvetica neue\', helvetica, serif" >
								<p class="meta">This email is being sent to you from '.SITE_NAME.'.
								<br />
								&copy; '.date('Y').' '.SITE_NAME.'</p>
							</td>
						</tr>
					</table>
				</center>
			</td>
		</tr>
	</table>
	</body>
	</html>
	';
	return $data;
}