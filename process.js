var extract = [];

/**
 * Utility/Helper function
 *
 * @param name
 * @returns {*}
 */
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


/**
 * Method analyzes group information and reads the numbers from it
 */
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

	console.log('Extracted '+counter+' non-unique entries from Group Info');
}


/**
 * Method analyzes chat history and reads the numbers from it
 */
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

	console.log('Extracted '+counter+' non-unique entries from Chat History');
}


/**
 * Method to pack data into a CSV/TSV file
 * I had to do it this way, as I cannot otherwise access the clipboard from code:
 * 1. create a dummy field
 * 2. put data into it
 * 3. copy the data from it
 * 4. remove the field
 */
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

//RUN!
try {
	//so, call them all one by one
	getNumbersFromGroupInfo();
	getNumbersFromChatHistory();
	packitForCSV();

	//also output data to the console for convenience
	console.table(extract);

	//and render an alert to infor the user the operation has completed
	alert('Extracted a total of ' + Object.keys(extract).length + ' unique numbers, paste them to any document or spreadsheet!');
} catch(err) {
	alert('Something went wrong and nothing worked. Error message: '+err.message);
}