<?php
	if(isset($_GET["site"])&&isset($_GET["match"])&&isset($_GET["odds"])&&isset($_GET["count"])) {
		switch ($_GET["site"]) {
			case 'spb':
				$file="spb.txt";
				$match=explode(" v ", $_GET["match"]);
				$odds=explode(" ",$_GET["odds"]);
				if(intval($_GET["count"]==1)){
					file_put_contents($file, $match[0]."\n".$match[1]."\n".$odds[0]."\n".$odds[1]."\n".$odds[2]."\n".$odds[3]."\n".$odds[4]);
				}else{
					file_put_contents($file, "\n".$match[0]."\n".$match[1]."\n".$odds[0]."\n".$odds[1]."\n".$odds[2]."\n".$odds[3]."\n".$odds[4], FILE_APPEND | LOCK_EX);
				}

				break;
			
			default:
				# code...
				break;
		}
	}else echo "fuck off";
?>
