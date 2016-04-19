// This content script will listen for a request from the plugin. It will
// then be able to parse the document for all the links, like the bookmarket
// once did.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // When getting the proper message, run the plugin code
    // TODO: separate out the engine parts from the formatting parts
    if (request.action === 'parseImage') {
        // this is where we'll specifically handle getting the image URLs, etc.
        var content = performImage();
        sendResponse(content);
    } else if (request.action === 'sprintf') {
        // with this action, we only want to print things to console, or elsewhere
        console.log(request.message);
    }
});

var performImage = function() {
    var imgs = document.getElementsByTagName('img'), t=[];
    for (var i=0, n = imgs.length; i < n; i++) {
        t.push('<a href="' + imgs[i].src + '"><img src="' + imgs[i].src + '" width="100%"></a>');
    }
    if (t.length) {
        return t.join('');
    } else {
        return '<h2>No Images Present</h2>';
    }
};
