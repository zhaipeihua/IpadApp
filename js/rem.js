$(document).ready(function() {
        var calculateSize = function () {
        var baseFontSize = 100;
        var docEl = document.documentElement,
        clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = baseFontSize * (clientWidth / 750) + 'px';
};
    if (document.addEventListener) {
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(resizeEvt, calculateSize, false);
        document.addEventListener('DOMContentLoaded', calculateSize, false);
        calculateSize();
    }
});