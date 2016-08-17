// This content script will listen for a request from the plugin. It will
// then be able to parse the document for all the links, like the bookmarket
// once did.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // When getting the proper message, run the plugin code
    if (request.action === 'parseImage') {
        // this is where we'll specifically handle getting the image URLs, etc.
        // if the array contains rows, then send them back, or send back an empty header
        var content = getImageUrlsFromDocument().map(function(withUrl) {
            // and format all the results into link/image sets
            return '<a href="' + withUrl + '"><img title="'+ withUrl +'" src="' + withUrl + '"></a>';
        });
        sendResponse(content.length ? content.join('') : '<h1>No Images Present</h1>');
    } else if (request.action === 'sprintf') {
        // with this action, we only want to print things to console, or elsewhere
        console.log(request.message);
    }
});
