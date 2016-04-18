var performImage = function() {
    var imgs = document.getElementsByTagName('img'), t=[];
    for (var i=0, n = imgs.length; i < n; i++) {
        t.push('<a href="' + imgs[i].src + '"><img title="'+ imgs[i].src +'" src="' + imgs[i].src + '" width="100%"></a>');
    }
    if (t.length) {
        return t.join('');
    } else {
        return '<h1>No Images Present</h1>';
    }
};
