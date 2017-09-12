<?php
	function upload(){

		$file = file_get_contents('../../functions/archives_connectionspeed/'.'10Mb.txt');
		$size = strlen($file);
		$source = 'https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py';
		//'http://example.com/settings/upload-img';
		//"http://www.website.com/index.php"
		//'http://1234.4321.67.11/upload.php'
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $source);
		curl_setopt($ch, CURLOPT_POST, 1); //upload
		//curl_setopt($ch, CURLOPT_READDATA, $file); //where to read form
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $file);
		curl_setopt($ch, CURLOPT_VERBOSE, 1); //enable verbose for easier tracing
		$data = curl_exec ($ch);
		$error = curl_error($ch);

		$info_upload = curl_getinfo($ch, CURLINFO_SPEED_UPLOAD); 
		curl_close($ch);

		return round($info_upload/100000, 2);
	}
?>
