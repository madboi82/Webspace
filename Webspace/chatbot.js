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
        sendMessage("Merci ! Sélectionnez votre pays et entrez votre numéro de téléphone 📞", false);
    
        const countryCodes = [
            { code: "+33", country: "France", flag: "images/icons8-france-48.png" },
            { code: "+32", country: "Belgique", flag: "images/icons8-belgium-48.png" },
            { code: "+41", country: "Suisse", flag: "images/icons8-switzerland-48.png" },
            { code: "+1", country: "USA", flag: "images/icons8-usa-48.png" },
            { code: "+44", country: "UK", flag: "images/icons8-united-kingdom-48.png" },
            { code: "+49", country: "Allemagne", flag: "images/icons8-germany-48.png" }
        ];
    
        const countryContainer = document.createElement("div");
        countryContainer.classList.add("flex", "flex-col", "w-full", "gap-2", "mt-2");
    
        const select = document.createElement("div");
        select.classList.add("w-full", "p-2", "rounded-lg", "bg-gray-100");
    
        const countrySelect = document.createElement("div");
        countrySelect.classList.add("grid", "grid-cols-2", "gap-2", "w-full");
    
        countryCodes.forEach(country => {
            const countryBtn = document.createElement("button");
            countryBtn.classList.add(
                "flex",
                "items-center",
                "justify-start",
                "space-x-2",
                "border",
                "rounded-lg",
                "p-2",
                "cursor-pointer",
                "hover:bg-gray-200",
                "w-full",
                "transition-colors"
            );
            
            const flagImg = document.createElement("img");
            flagImg.src = country.flag;
            flagImg.alt = country.country;
            flagImg.style.width = "17px";
            flagImg.style.height = "15px";
            
            const codeSpan = document.createElement("span");
            codeSpan.textContent = country.code;
            
            countryBtn.appendChild(flagImg);
            countryBtn.appendChild(codeSpan);
    
            countryBtn.addEventListener("click", function() {
                selectCountry(country.code, country.flag);
            });
    
            countrySelect.appendChild(countryBtn);
        });
    
        select.appendChild(countrySelect);
        countryContainer.appendChild(select);
    
        const phoneContainer = document.createElement("div");
        phoneContainer.classList.add("flex", "items-center", "w-full", "mt-2");
    
        const selectedCountryContainer = document.createElement("div");
        selectedCountryContainer.classList.add(
            "flex",
            "items-center",
            "space-x-2",
            "border",
            "rounded-l-lg",
            "px-3",
            "py-2",
            "bg-gray-50",
            "cursor-pointer",
            "hover:bg-gray-100",
            "transition-colors"
        );

        // Ajout d'un tooltip
        selectedCountryContainer.title = "Cliquer pour changer de pays";
        
        const input = document.createElement("input");
        input.type = "tel";
        input.placeholder = "Ex: 612345678";
        input.classList.add(
            "flex-1",
            "p-2",
            "border",
            "rounded-r-lg",
            "text-sm",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-blue-500"
        );
    
        phoneContainer.appendChild(selectedCountryContainer);
        phoneContainer.appendChild(input);
        countryContainer.appendChild(phoneContainer);
        
        const validateBtn = document.createElement("button");
        validateBtn.textContent = "Valider";
        validateBtn.classList.add(
            "w-full",
            "bg-green-500",
            "text-white",
            "py-2",
            "px-4",
            "rounded-lg",
            "mt-2",
            "hover:bg-green-600",
            "transition-colors"
        );
    
        let selectedCode = "";
        let selectedFlag = "";
    
        function selectCountry(code, flag) {
            selectedCode = code;
            selectedFlag = flag;
    
            selectedCountryContainer.innerHTML = '';
            
            const flagImg = document.createElement("img");
            flagImg.src = flag;
            flagImg.alt = "Drapeau sélectionné";
            flagImg.style.width = "20px";
            flagImg.style.height = "15px";
            
            const codeSpan = document.createElement("span");
            codeSpan.textContent = code;
            
            selectedCountryContainer.appendChild(flagImg);
            selectedCountryContainer.appendChild(codeSpan);
            
            select.classList.add("hidden");
            input.focus();
        }

        // Permettre de changer de pays en cliquant sur l'indicatif sélectionné
        selectedCountryContainer.addEventListener("click", function() {
            select.classList.remove("hidden");
        });
    
        validateBtn.addEventListener("click", function() {
            if (!selectedCode) {
                sendMessage("Veuillez sélectionner un pays ❌", false);
                return;
            }
    
            const phoneNumber = input.value.trim().replace(/\s/g, '');
    
            if (!/^\d{9}$/.test(phoneNumber)) {
                sendMessage("Numéro invalide ❌. Entrez 9 chiffres sans l'indicatif.", false);
                input.value = '';
                input.focus();
                return;
            }
    
            userData.phone = `${selectedCode} ${phoneNumber}`;
            finalizeChat();
        });
    
        countryContainer.appendChild(validateBtn);
        messagesDiv.appendChild(countryContainer);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
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

