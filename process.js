var extract = [];

function sanitizeName(name){
	if (name) {
		name = name.replace(/<\!--.*?-->/g, "");
		if (name.charAt(0) == '<') {
			name = 'n/a';
		}
		//console.log(name);
	} else {
		name = 'n/a';
	}
	return name;
}

function getNumbersFromGroupInfo() {
	var counter = 0;
	$('.group-info-form .chat-title span').each(function (e) {
		var number = $(this).attr('title');
		if (number && number.charAt(0) == '+') {
			//console.log(candidate)
		} else {
			return true;
		}

		//figure out name (if any)
		var body = $(this).parents('.chat-body');
		var name = $(body).find('.chat-meta .screen-name-text').html();
		name     = sanitizeName(name);

		var row = [number, name];
		extract[number] = row;
		//extract.push(row);
		//csv += '"' + number + '","' + name + "\"\n";

		counter++;
	});

	console.log('Extracted '+counter+' entries from Group Info');
}

function getNumbersFromChatHistory() {
	var counter = 0;
	$('div.message-list span.author-body').each(function (e) {
		var number = $(this).find('.author-number').html();
		if(!number || number.charAt(0) != '+'){
			return true;
		}

		var name   = $(this).find('.author-screen-name').html();
		name       = sanitizeName(name);

		var row = [number, name];
		extract[number] = row;
		//csv += '"' + number + '","' + name + "\"\n";

		counter++;
	});

	console.log('Extracted '+counter+' entries from Chat History');
}

function packitForCSV() {
	var csv = '';

	for(var k in extract){
		csv += '"' + extract[k][0] + '"\t"' + extract[k][1] + "\"\n";
	}

	var input = document.createElement('textarea');
	document.body.appendChild(input);
	input.value = csv;
	input.focus();
	input.select();
	document.execCommand('copy');
	input.remove();
}

getNumbersFromGroupInfo();
getNumbersFromChatHistory();
packitForCSV();

console.table(extract);

alert('Extracted a total of '+extract.length+' numbers, paste them to any document or spreadsheet!');