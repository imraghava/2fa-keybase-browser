var data = ""; //Message data
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; //Generator data
//This function is called when the first "Proceed" button is pressed
function kbusub(){
	document.getElementById("kbUname").style.display = "none"; //Hide username input
	document.getElementById("kbUsub").style.display = "none"; //Hide proceed button
	//Get request
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "https://keybase.io/" + document.getElementById("kbUname").value + "/pgp_keys.asc", false );
	xmlHttp.send( null );
	var pubkey = xmlHttp.responseText; //Get public key from response
	var pureData = "";
	for (var i = 0; i < 64; i++){ //Random string generator
		pureData += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	var options = {
		data: pureData,
		publicKeys: openpgp.key.readArmored(pubkey).keys
	}; //Message Data
	data = sha1(pureData); //Store SHA-1 hash of message
	pureData = ""; //Nuke pure data variable
	openpgp.encrypt(options).then(function(ciphertext){ //Encrypt message
			document.getElementById("messageResult").innerHTML = ciphertext.data.replace(/(?:\r\n|\r|\n)/g, '<br />'); //Display encrypted message
			document.getElementById("messageResult").style.display = "inherit";
			document.getElementById("kbRes").style.display = "inherit";
			document.getElementById("kbRsub").style.display = "inherit";
	});
}
function kbrsub(){
	if (data == sha1(document.getElementById("kbRes").value)){
		document.getElementById("result").innerHTML = "Success!";
	} else {
		document.getElementById("result").innerHTML = "That is incorrect!";
	}
	document.getElementById("result").style.display = "inherit";
}