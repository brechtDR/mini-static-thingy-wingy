export function domLoaded(callback) {
    if (document.readyState !== "loading") {
        // Document is already ready, call the callback directly
        callback();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        // Old IE browsers
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    }
}

const Utils = {
    domLoaded
}

export default Utils;