document.addEventListener("DOMContentLoaded", function () {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatBtn = document.getElementById("close-chat");
    const messagesDiv = document.getElementById("messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    let userData = { service: [], name: "", phone: "" };
    let step = 0;

    chatbotIcon.addEventListener("click", function () {
        chatbotContainer.classList.remove("hidden", "close");
        chatbotContainer.classList.add("open");
        if (step === 0) startChat();
    });

    closeChatBtn.addEventListener("click", function () {
        chatbotContainer.classList.remove("open");
        chatbotContainer.classList.add("close");
        setTimeout(() => {
            chatbotContainer.classList.add("hidden");
            resetChat();
        }, 300);
    });

    function sendMessage(msg, fromUser = false) {
        const msgContainer = document.createElement("div");
        msgContainer.classList.add("message", fromUser ? "flex-row-reverse" : "flex-row");

        const avatar = document.createElement("img");
        avatar.src = fromUser ? "images/user-avatar.png" : "images/chatbot-avatar.png";
        avatar.alt = fromUser ? "User" : "Chatbot";
        avatar.classList.add("message-avatar");

        const msgElement = document.createElement("div");
        msgElement.classList.add(fromUser ? "user-message" : "bot-message");
        msgElement.textContent = msg;

        msgContainer.appendChild(avatar);
        msgContainer.appendChild(msgElement);
        messagesDiv.appendChild(msgContainer);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function startChat() {
        step = 1;
        setTimeout(() => sendMessage("Bienvenue sur le chatbot de WebSpace 🚀. Comment puis-je vous aider ?", false), 1000);
        setTimeout(() => askService(), 2000);
    }

    function askService() {
        sendMessage("Par quels types de prestations êtes-vous intéressé ?", false);
        const serviceOptions = document.createElement("div");
        serviceOptions.classList.add("flex", "flex-wrap", "gap-2", "mt-2");

        ["Création de site web", "Référencement web", "Cartes NFC"].forEach(service => {
            const btn = document.createElement("button");
            btn.textContent = service;
            btn.classList.add("bg-gray-300", "text-black", "px-3", "py-1", "rounded-md", "text-sm", "cursor-pointer");

            btn.addEventListener("click", function () {
                if (userData.service.includes(service)) {
                    userData.service = userData.service.filter(item => item !== service);
                    btn.classList.remove("bg-blue-500", "text-white");
                    btn.classList.add("bg-gray-300", "text-black");
                } else {
                    userData.service.push(service);
                    btn.classList.add("bg-blue-500", "text-white");
                    btn.classList.remove("bg-gray-300", "text-black");
                }
            });

            serviceOptions.appendChild(btn);
        });

        const validateBtn = document.createElement("button");
        validateBtn.textContent = "Valider";
        validateBtn.classList.add("bg-green-500", "text-white", "px-3", "py-1", "rounded-md", "text-sm", "cursor-pointer", "mt-2");
        validateBtn.addEventListener("click", askName);
        serviceOptions.appendChild(validateBtn);

        messagesDiv.appendChild(serviceOptions);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function askName() {
        if (userData.service.length === 0) {
            sendMessage("Veuillez sélectionner au moins un service avant de continuer.", false);
            return;
        }
        step = 2;
        sendMessage("Excellent choix ! Pour mieux vous accompagner, pouvez-vous me donner votre nom et prénom ?", false);
        userInput.disabled = false;
        userInput.placeholder = "Ex: Jean Dupont";
        userInput.focus();
    }

    function askPhone() {
        step = 3;
        sendMessage("Merci ! Quel est votre numéro de téléphone ?", false);
        userInput.value = "";
        userInput.placeholder = "Ex: 0612345678";
    }

    function finalizeChat() {
        sendMessage("Merci pour ces informations ! Un conseiller va vous recontacter très prochainement. Excellente journée ! 😊", false);
        userInput.disabled = true;
        sendBtn.disabled = true;

        // Envoyer les données à l'API
        fetch("https://webspace-webspaces-projects-14d59837.vercel.app/api/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Message envoyé avec succès:", data);
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi:", error);
            sendMessage("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.", false);
        });

        setTimeout(resetChat, 5000);
    }

    sendBtn.addEventListener("click", function () {
        const userResponse = userInput.value.trim();
        if (!userResponse) return;

        sendMessage(userResponse, true);
        userInput.value = "";

        switch (step) {
            case 2: // Nom
                userData.name = userResponse;
                askPhone();
                break;
            case 3: // Téléphone
                if (/^[0-9]{10}$/.test(userResponse.replace(/\s/g, ''))) {
                    userData.phone = userResponse;
                    finalizeChat();
                } else {
                    sendMessage("Le format du numéro n'est pas valide. Veuillez entrer un numéro à 10 chiffres.", false);
                }
                break;
        }
    });

    userInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });

    function resetChat() {
        messagesDiv.innerHTML = "";
        userData = { service: [], name: "", phone: "" };
        userInput.disabled = true;
        sendBtn.disabled = false;
        step = 0;
        userInput.placeholder = "Écrivez ici...";
    }
});

