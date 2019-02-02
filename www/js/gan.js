// example.js file
// Wait for device API libraries to load
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

// device APIs are available
//
function onDeviceReady() {
    document.addEventListener("backbutton", onPause, true);
		// Add similar listeners for other events
}

function onPause() {
    // navigator.geolocation.getCurrentPosition(onSuccess, onError);
		alert("back");
		return false;

// Add similar event handlers for other events