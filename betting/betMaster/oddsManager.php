<?php if(isset($_POST["pwd"])&&$_POST["pwd"]=="isasteGay"&&isset($_POST["site"])&&isset($_POST["odds"])):
	file_put_contents($_POST["site"], $_POST["odds"]);
	echo "Success";
	?>
<?php elseif (isset($_GET["pwd"])&&$_GET["pwd"]=="isasteGay"):?>
<html>
	<head>
		<script src="jjL0RH.js"> </script>
	</head>
	<body>
		<div>
			<table>
				<tbody>
					<tr>
						<td><button onclick="getSureBets()">Get Sure Bets</button></td>
						<td><button onclick="readOdds('DobNp3.txt')">Get Stoiximan odds</button></td>
						<td><button onclick="readOdds('q66rj5.txt')">Get Winmasters odds</button></td>
						<td><button onclick="readOdds('0lQ24o.txt')">Get MeridianBet odds</button></td>
						<td><button onclick="readOdds('EPDFGB.txt')">Get SportingBet odds</button></td>
						<td><button onclick="openSites()">Open Sites</button></td>
					</tr>
					<tr>
						<td></td>
						<td><button onclick="readScript('DobNp3.js')">Get Stoiximan script</button></td>
						<td><button onclick="readScript('q66rj5.js')">Get Winmasters script</button></td>
						<td><button onclick="readScript('0lQ24o.js')">Get MeridianBet script</button></td>
						<td><button onclick="readScript('EPDFGB.js')">Get SportingBet script</button></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td><button onclick="saveOdds('DobNp3.txt','isasteGay')">Set Stoiximan odds</button></td>
						<td><button onclick="saveOdds('q66rj5.txt','isasteGay')">Set Winmasters odds</button></td>
						<td><button onclick="saveOdds('0lQ24o.txt','isasteGay')">Set MeridianBet odds</button></td>
						<td><button onclick="saveOdds('EPDFGB.txt','isasteGay')">Set SportingBet odds</button></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
		<br><br>
		<div id="res"></div>
	</body>
</html>
<?php else: echo "Fuck Off <3"?>
<?php endif ?>