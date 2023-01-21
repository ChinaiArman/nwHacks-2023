function getSelectedText() {
    var text = "";

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        // if they are using internet explorer
        text = document.selection.createRange().text;
    }

    return text;
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function onClickHandler() {
    const tab = await getCurrentTab();

    // executes the script in the context of the current tab
    const scriptRes = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getSelectedText
    });
    const selectedText = scriptRes[0].result;

    chrome.runtime.sendMessage({ selectedText: selectedText });
}

document.getElementById("generate").addEventListener("click", onClickHandler);