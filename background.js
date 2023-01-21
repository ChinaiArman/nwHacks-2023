

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.selectedText) {
        console.log("In background.js: ", request.selectedText);

        // send a message back to the popup script
        chrome.runtime.sendMessage({ status: "received" });
    }
});