document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    if (!chatBox || !userInput || !sendBtn) return;

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (text === "") return;

        addMessage(text, "user");
        userInput.value = "";

        setTimeout(() => {
            let response = "Nu am înțeles întrebarea. Poți încerca să întrebi despre facultăți, galerie sau cursuri.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes("salut") || lowerText.includes("buna") || lowerText.includes("hei")) {
                response = "Salut! Cu ce te pot ajuta astăzi?";
            } else if (lowerText.includes("facultate") || lowerText.includes("facultati")) {
                response = "Găsești detalii despre facultăți în secțiunea 'Facultăți' din meniu!";
            } else if (lowerText.includes("galerie") || lowerText.includes("poze")) {
                response = "Poți vedea proiectele noastre în secțiunea 'Galerie'.";
            } else if (lowerText.includes("ce faci")) {
                response = "Sunt un asistent virtual pregătit să te ajute cu informații despre Comunitatea TW!";
            }

            addMessage(response, "bot");
        }, 600);
    }

    sendBtn.addEventListener("click", handleSend);

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    });
});