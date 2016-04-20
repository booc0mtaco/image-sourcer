var performImage = function() {
    // Try and find all image-looking resources on a page, and return a set
    return Array.prototype.slice.call(document.querySelectorAll('body *')).filter(function(element) {
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
    })).map(function(withUrl) {
        // and format all the results into link/image sets
        return '<a href="' + withUrl + '"><img title="'+ withUrl +'" src="' + withUrl + '"></a>';
    });
};
