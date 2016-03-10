var session, subscriber,publisher;;
var connectionCount = 0;




function connect() {
	// Replace apiKey and sessionId with your own values:
	
	// Replace with the replacement element ID:
	publisher = OT.initPublisher(document.getElementById('tokboxpublishviewr'));
	
	publisher
	.on({
		streamCreated : function(event) {
			console.log("Publisher started streaming.");
		},
		streamDestroyed : function(event) {
			console.log("Publisher stopped streaming. Reason: "
					+ event.reason);
		}
	});
	
	

	
	
	session = OT
			.initSession("45506452",
					"1_MX40NTUwNjQ1Mn5-MTQ1NzA5NzU1OTYyNn55NmEzeER3MmhlcGIwYXE3TkRkenZpUDR-UH4");
	

	
	// Replace token with your own value:
	session
			.connect(
					"T1==cGFydG5lcl9pZD00NTUwNjQ1MiZzaWc9MjU0ZWI4NDhiMzI0MzAwNWFjMDBjNDBkNDBlMzkxYzBlNjAxY2YyYjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXdOalExTW41LU1UUTFOekE1TnpVMU9UWXlObjU1Tm1FemVFUjNNbWhsY0dJd1lYRTNUa1JrZW5acFVEUi1VSDQmY3JlYXRlX3RpbWU9MTQ1NzA5NzU2MiZub25jZT0wLjE0Nzg3MjcxNzYzNjM0MzgmZXhwaXJlX3RpbWU9MTQ1OTY4OTU1MSZjb25uZWN0aW9uX2RhdGE9",
					function(error) {
						if (error) {
							console.log('Unable to connect: ', error.message);
						} else {
							if (session.capabilities.publish == 1) {
								session.publish(publisher);
								console.log('publishing the session to the session.');
								connectionCount = 1;
								jQuery("#tokboxpublishviewr").append(jQuery(".OT_publisher"));
							} else {
								console
										.log("You cannot publish an audio-video stream.");
							}

						}
					});
	
	

	session.on({
		'streamCreated' : function(event) {
			console.log("Stream Created");
			subscriber = session.subscribe(event.stream, 'tokboxviewpublisher', {
				subscribeToAudio : true,
				subscribeToVideo : true,
				insertMode : 'append'
			});
			OT.updateViews();

		},
		'sessionConnected' : function(event) {
			console.log("Session Connected");
			console.log(event.stream);
		},
		'streamDestroyed' : function(event) { 
			console.log("Session Destroyed");
		},
		'sessionDisconnected' : function(event) {
			OT.updateViews();

		}
	});

	// Replace with your API key and token:
	session
			.connect(
					"T1==cGFydG5lcl9pZD00NTUwNjQ1MiZzaWc9MjU0ZWI4NDhiMzI0MzAwNWFjMDBjNDBkNDBlMzkxYzBlNjAxY2YyYjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXdOalExTW41LU1UUTFOekE1TnpVMU9UWXlObjU1Tm1FemVFUjNNbWhsY0dJd1lYRTNUa1JrZW5acFVEUi1VSDQmY3JlYXRlX3RpbWU9MTQ1NzA5NzU2MiZub25jZT0wLjE0Nzg3MjcxNzYzNjM0MzgmZXhwaXJlX3RpbWU9MTQ1OTY4OTU1MSZjb25uZWN0aW9uX2RhdGE9",
					function(error) {
						if (error) {
							console.log('Unable to connect: ', error.message);
						}
					});

}

function disconnect() {
	session.disconnect();
}

connect();