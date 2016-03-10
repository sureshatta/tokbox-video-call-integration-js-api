var session;
var connectionCount = 0;
var publisher;

function connect() {

	// Replace with the replacement element ID:
	publisher = OT.initPublisher(document.getElementById('tokboxpublisher'));
	
	// Replace apiKey and sessionId with your own values:
	session = OT
			.initSession("45506452",
					"1_MX40NTUwNjQ1Mn5-MTQ1NzA5NzU1OTYyNn55NmEzeER3MmhlcGIwYXE3TkRkenZpUDR-UH4");
	
	session.on({
		'streamCreated' : function(event) {
			console.log("Stream Created");
			subscriber = session.subscribe(event.stream, 'joinerbox', {
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

	
	session.on({
		connectionCreated : function(event) {
			connectionCount++;
			console.log(connectionCount + ' connections.');
		},
		connectionDestroyed : function(event) {
			connectionCount--;
			console.log(connectionCount + ' connections.');
		},
		sessionDisconnected : function sessionDisconnectHandler(event) {
			// The event is defined by the SessionDisconnectEvent class
			console.log('Disconnected from the session.');
			document.getElementById('disconnectBtn').style.display = 'none';
			if (event.reason == 'networkDisconnected') {
				alert('Your network connection terminated.')
			}
		}
	});
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
								console.log('Connected to the session.');
								connectionCount = 1;
								jQuery("#tokboxpublisher").append(jQuery(".OT_publisher"));
//								jQuery("#joinerbox").append(jQuery(".OT_subscriber"));
							} else {
								console
										.log("You cannot publish an audio-video stream.");
							}

						}
					});
	
	

}

function disconnect() {
	session.disconnect();
}

connect();