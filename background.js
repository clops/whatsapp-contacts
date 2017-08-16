chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON

	if (tab.url.indexOf("https://web.whatsapp.com/") != -1) { // Inspect whether the place where user clicked matches with our list of URL
		chrome.tabs.executeScript(tab.id, {
			"file": "process.js"
		}, function () { // Execute your code
			console.log("Script Executed .. "); // Notification on Completion
		});
	} else {
		alert('Nah, page not supported, I work with web.whatsapp.com only!');
	}

});