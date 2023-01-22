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

async function getGeneratedNotes(prompt) {
    const response = await fetch("http://localhost:3000/create-notes", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt })
    })

    const data = await response.json();
    return data.notes;
}

async function onClickHandler() {
    const resultDiv = document.getElementById("result-container");

    // show the popup
    document.querySelector(".bg-card").classList.toggle("hidden");
    // clear the results
    resultDiv.innerHTML = "";

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

    // send request
    const notes = await getGeneratedNotes(selectedText);

    // show the result div
    resultDiv.classList.remove("hidden");

    if (notes && notes.includes("-")) {
        let formattedResults = "<ul>";

        notes
            .split("-")
            .slice(1)
            .forEach((element) => {
                formattedResults += `<li class="note-bullet">${element.trim()}</li>`;
            });

        formattedResults += "</ul>";

        resultDiv.innerHTML = formattedResults;
    } else if (notes && notes.includes("•")) {
        let formattedResults = "<ul>";

        notes
            .split("•")
            .slice(1)
            .forEach((element) => {
                formattedResults += `<li class="note-bullet">${element.trim()}</li>`;
            });

        formattedResults += "</ul>";

        console.log(formattedResults);

        resultDiv.innerHTML = formattedResults;
    } else if (notes && !notes.includes("-") && !notes.includes("•")) {
        let formattedResults = "<ul>";

        notes
            .split("\n")
            .slice(1)
            .forEach((element) => {
                formattedResults += `<li class="note-bullet">${element.trim()}</li>`;
            });

        formattedResults += "</ul>";

        console.log(formattedResults);

        resultDiv.innerHTML = formattedResults;
    } else {
        resultDiv.innerHTML = '<p class="error-msg">Error: Could not generate notes, please try again.</p>';
    }

    // hide the loading spinner
    loadingSpinner.classList.add("hidden");
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
