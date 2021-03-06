if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js').then(function(registration){
    console.log('service worker registration succeeded:',registration);
  },
function(error){
  console.log('service worker registration failed:',error);
});
}
else{
  console.log('service workers are not supported.');
}

navigator.serviceWorker.register('./sw.js').then(reg => {
	reg.update();
	reg.installing; // the installing worker, or undefined
	reg.waiting; // the waiting worker, or undefined
	reg.active; // the active worker, or undefined

	reg.addEventListener('updatefound', () => {
		// A wild service worker has appeared in reg.installing!
		const newWorker = reg.installing;

		newWorker.state;
		// "installing" - the install event has fired, but not yet complete
		// "installed"  - install complete
		// "activating" - the activate event has fired, but not yet complete
		// "activated"  - fully active
		// "redundant"  - discarded. Either failed install, or it's been
		//                replaced by a newer version

		newWorker.addEventListener('statechange', () => {
			// newWorker.state has changed
		});
	});
});
