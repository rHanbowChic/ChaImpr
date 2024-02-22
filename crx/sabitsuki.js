// Its not even a thing.
// Sometimes a file or a project ... etc. needs an interesting name. Though this one is a bit strange, it's interesting enough and reminds me of some good old things.

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let text = request.text;
    sendResponse({ status: "done" });
    content = document.getElementsByClassName("content")[0].innerHTML;
    content = content + text;
    document.getElementsByClassName("content")[0].innerHTML = content;

});