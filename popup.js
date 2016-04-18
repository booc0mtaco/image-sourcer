// This event runs in the context of the popup, so it gets run on every open
// The popup script will request the links from the page, and then once that
// runs, it will get back an array of the image URLs (with any additional
// configuration information that might be embedded)
window.addEventListener('DOMContentLoaded', function(event) {
    // retrieve the current tab url, and dispatch an event with that result
    function getCurrentTabUrl(callback) {
        // This is some boilerplate information to pass into the chrome query method
        // active        =< should this be the active tab?
        // currentWindow =< should this be the current window?
        var queryInformation = {
            active: true,
            currentWindow: true
        };

        // Ask chrome about the tab situation: if there's a tab, then we at least
        // have a result to work against!
        chrome.tabs.query(queryInformation, function(tabs) {
            // grab the first tab from the result (current window)
            var tab = tabs[0];

            // send a message to the tab to work on the images in the page
            // this will dispatch the work to the shared "library" for any page
            chrome.tabs.sendMessage(tab.id, {
                action: 'parseImage',
                message: 'test' // will be ignored for now, but available
            }, function(response) {
                // what to do after you get the contents back from the tab
                callback(tab, response);
            });
        });
    }

    // Above sets up the behavior. Once content is loaded, trigger the work
    getCurrentTabUrl(function(tab, response) {
        // use the response (an array of image URLs) to populate the plugin
        document.getElementById('container').innerHTML = response || '';
    });
});
