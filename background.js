

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.selectedText) {
        const selectedText = request.selectedText;

        const response = await fetch("http://localhost:3000/create-notes", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: selectedText })
        })

        const data = await response.json();

        chrome.runtime.sendMessage({ notes: data.notes });
    }
});