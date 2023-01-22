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

function myFunction() {
    console.log("in");
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText("banana");

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function onClickHandler() {
    // show the popup
    document.querySelector(".bg-card").classList.toggle("hidden");
    // clear the results
    document.getElementById("result-container").innerHTML = "";

    // show the loading spinner
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove("hidden");

    const tab = await getCurrentTab();

    // executes the script in the context of the current tab
    const scriptRes = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getSelectedText,
    });
    const selectedText = scriptRes[0].result;

    // sends a message to the background script
    chrome.runtime.sendMessage({ selectedText: selectedText });
}

async function onMessageReceived(request, sender, sendResponse) {
    if (request.notes) {
        const resultDiv = document.getElementById("result-container");
        const notes = request.notes;

        console.log(notes);

        let formattedResults = "<ul>";

        notes
            .split("- ")
            .slice(1)
            .forEach((element) => {
                formattedResults += `<li class="note-bullet">${element}</li>`;
            });

        formattedResults += "</ul>";

        resultDiv.innerHTML = formattedResults;

        // hide the loading spinner
        const loadingSpinner = document.getElementById("loading-spinner");
        loadingSpinner.classList.add("hidden");
    }
}

async function CopyToClipboard() {
    var element = document.getElementById("result-container");
    console.log(element.textContent);

    navigator.clipboard.writeText(element.textContent);
}

// Listeners
document
    .getElementById("generate-btn")
    .addEventListener("click", onClickHandler);
document.getElementById("copy-btn").addEventListener("click", CopyToClipboard);
document.getElementById("result-container").style.display = "none";

document.getElementById("generate-btn").addEventListener("click", function () {
    document.getElementById("result-container").style.display = "block";
});

// Listeners
document
    .getElementById("generate-btn")
    .addEventListener("click", onClickHandler);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    onMessageReceived(request, sender, sendResponse);
});
