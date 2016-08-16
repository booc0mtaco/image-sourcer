var performImage = function() {
    // simple has filter check on strings
    function _uniq(arr) {
	var hasBeenSeen = {};
	return arr.filter(function(item) {
	    return hasBeenSeen.hasOwnProperty(item) ? false : (hasBeenSeen[item] = true);
	});
    }

    // Try and find all image-looking resources on a page, and return a set
    return _uniq(Array.prototype.slice.call(document.querySelectorAll('body *')).filter(function(element) {
        // check for cases where no image is defined
        return window.getComputedStyle(element).backgroundImage !== 'none';
    }).filter(function(element) {
        // find elements that are inline images
        return /^url\(\"/.test(window.getComputedStyle(element).backgroundImage);
    }).map(function(element) {
        // trim CSS wrapping for URLs
        return window.getComputedStyle(element).backgroundImage.split('url("')[1].slice(0, -2);
    }).concat(Array.prototype.slice.call(document.getElementsByTagName('img')).map(function(imgTag) {
        // and merge in source values from raw image tags
        return imgTag.src;
    })));
};
