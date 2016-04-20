var performImage = function() {
    var t=[];
    function prepareString(withUrl) {
        return '<a href="' + withUrl + '"><img title="'+ withUrl +'" src="' + withUrl + '"></a>';
    }

    // Image tags are the easiest to do. Loop thru the set, and pull up the images out
    Array.prototype.slice.call(document.getElementsByTagName('img')).forEach(function(imgTag) {
        t.push(prepareString(imgTag));
    });

    // now inspect elements that are applied to background elements
    var reImg = /^url\(\"/;
    Array.prototype.slice.call(document.querySelectorAll('body *')).filter(function(element) {
        // check for cases where no image is defined
        return window.getComputedStyle(element).backgroundImage !== 'none';
    }).filter(function(element) {
        // find elements that are inline images
        return reImg.test(window.getComputedStyle(element).backgroundImage);
    }).map(function(element) {
        // trim CSS wrapping for URLs
        return window.getComputedStyle(element).backgroundImage.split('url("')[1].slice(0, -2);
    }).forEach(function(url) {
        // push to result array
        t.push(prepareString(url));
    });

    return t.length ? t.join('') : '<h1>No Images Present</h1>';
};
