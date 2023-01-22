

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
        console.log(response);
    }
});