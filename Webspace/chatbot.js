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
            { code: "+49", country: "Allemagne", flag: "images/icons8-germany-48.png" },
            { code: "+93", country: "Afghanistan", flag: "images/drapeau.png" },
            { code: "+27", country: "Afrique du Sud", flag: "images/afrique-du-sud.png" },
            { code: "+355", country: "Albanie", flag: "images/albanie.png" },
            { code: "+213", country: "Algérie", flag: "images/algerie.png" },
            { code: "+49", country: "Allemagne", flag: "images/icons8-germany-48.png" },
            { code: "+376", country: "Andorre", flag: "images/andorre.png" },
            { code: "+244", country: "Angola", flag: "images/angola.png" },
            { code: "+1264", country: "Anguilla", flag: "images/anguilla.png" },
            { code: "+1268", country: "Antigua et Barbuda", flag: "images/antigua-et-barbuda.png" },
            { code: "+966", country: "Arabie saoudite", flag: "images/arabie-saoudite.png" },
            { code: "+54", country: "Argentine", flag: "images/argentine.png" },
            { code: "+374", country: "Arménie", flag: "images/armenie.png" },
            { code: "+297", country: "Aruba", flag: "images/aruba.png" },
            { code: "+61", country: "Australie", flag: "images/australie.png" },
            { code: "+43", country: "Autriche", flag: "images/autriche.png" },
            { code: "+994", country: "Azerbaïdjan", flag: "🇦🇿" },
            { code: "+1242", country: "Bahamas", flag: "🇧🇸" },
            { code: "+973", country: "Bahreïn", flag: "🇧🇭" },
            { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
            { code: "+1246", country: "Barbade", flag: "🇧🇧" },
            { code: "+32", country: "Belgique", flag: "🇧🇪" },
            { code: "+501", country: "Belize", flag: "🇧🇿" },
            { code: "+229", country: "Bénin", flag: "🇧🇯" },
            { code: "+1441", country: "Bermudes", flag: "🇧🇲" },
            { code: "+975", country: "Bhoutan", flag: "🇧🇹" },
            { code: "+375", country: "Biélorussie", flag: "🇧🇾" },
            { code: "+591", country: "Bolivie", flag: "🇧🇴" },
            { code: "+387", country: "Bosnie-Herzégovine", flag: "🇧🇦" },
            { code: "+267", country: "Botswana", flag: "🇧🇼" },
            { code: "+55", country: "Brésil", flag: "🇧🇷" },
            { code: "+673", country: "Brunei", flag: "🇧🇳" },
            { code: "+359", country: "Bulgarie", flag: "🇧🇬" },
            { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
            { code: "+257", country: "Burundi", flag: "🇧🇮" },
            { code: "+855", country: "Cambodge", flag: "🇰🇭" },
            { code: "+237", country: "Cameroun", flag: "🇨🇲" },
            { code: "+1", country: "Canada", flag: "🇨🇦" },
            { code: "+238", country: "Cap-Vert", flag: "🇨🇻" },
            { code: "+236", country: "République centrafricaine", flag: "🇨🇫" },
            { code: "+56", country: "Chili", flag: "🇨🇱" },
            { code: "+86", country: "Chine", flag: "🇨🇳" },
            { code: "+357", country: "Chypre", flag: "🇨🇾" },
            { code: "+57", country: "Colombie", flag: "🇨🇴" },
            { code: "+269", country: "Comores", flag: "🇰🇲" },
            { code: "+242", country: "République du Congo", flag: "🇨🇬" },
            { code: "+243", country: "République démocratique du Congo", flag: "🇨🇩" },
            { code: "+82", country: "Corée du Sud", flag: "🇰🇷" },
            { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
            { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
            { code: "+385", country: "Croatie", flag: "🇭🇷" },
            { code: "+45", country: "Danemark", flag: "🇩🇰" },
            { code: "+253", country: "Djibouti", flag: "🇩🇯" },
            { code: "+1767", country: "Dominique", flag: "🇩🇲" },
            { code: "+20", country: "Égypte", flag: "🇪🇬" },
            { code: "+971", country: "Émirats arabes unis", flag: "🇦🇪" },
            { code: "+593", country: "Équateur", flag: "🇪🇨" },
            { code: "+291", country: "Érythrée", flag: "🇪🇷" },
            { code: "+34", country: "Espagne", flag: "🇪🇸" },
            { code: "+372", country: "Estonie", flag: "🇪🇪" },
            { code: "+268", country: "Eswatini", flag: "🇸🇿" },
            { code: "+1", country: "États-Unis", flag: "🇺🇸" },
            { code: "+251", country: "Éthiopie", flag: "🇪🇹" },
            { code: "+679", country: "Fidji", flag: "🇫🇯" },
            { code: "+358", country: "Finlande", flag: "🇫🇮" },
            { code: "+33", country: "France", flag: "🇫🇷" },
            { code: "+241", country: "Gabon", flag: "🇬🇦" },
            { code: "+220", country: "Gambie", flag: "🇬🇲" },
            { code: "+995", country: "Géorgie", flag: "🇬🇪" },
            { code: "+233", country: "Ghana", flag: "🇬🇭" },
            { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
            { code: "+30", country: "Grèce", flag: "🇬🇷" },
            { code: "+1473", country: "Grenade", flag: "🇬🇩" },
            { code: "+502", country: "Guatemala", flag: "🇬🇹" },
            { code: "+224", country: "Guinée", flag: "🇬🇳" },
            { code: "+240", country: "Guinée équatoriale", flag: "🇬🇶" },
            { code: "+592", country: "Guyana", flag: "🇬🇾" },
            { code: "+509", country: "Haïti", flag: "🇭🇹" },
            { code: "+504", country: "Honduras", flag: "🇭🇳" },
            { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
            { code: "+36", country: "Hongrie", flag: "🇭🇺" },
            { code: "+91", country: "Inde", flag: "🇮🇳" },
            { code: "+62", country: "Indonésie", flag: "🇮🇩" },
            { code: "+98", country: "Iran", flag: "🇮🇷" },
            { code: "+964", country: "Irak", flag: "🇮🇶" },
            { code: "+353", country: "Irlande", flag: "🇮🇪" },
            { code: "+354", country: "Islande", flag: "🇮🇸" },
            { code: "+972", country: "Israël", flag: "🇮🇱" },
            { code: "+39", country: "Italie", flag: "🇮🇹" },
            { code: "+1876", country: "Jamaïque", flag: "🇯🇲" },
            { code: "+81", country: "Japon", flag: "🇯🇵" },
            { code: "+962", country: "Jordanie", flag: "🇯🇴" },
            { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
            { code: "+254", country: "Kenya", flag: "🇰🇪" },
            { code: "+996", country: "Kirghizistan", flag: "🇰🇬" },
            { code: "+383", country: "Kosovo", flag: "🇽🇰" },
            { code: "+965", country: "Koweït", flag: "🇰🇼" },
            { code: "+856", country: "Laos", flag: "🇱🇦" },
            { code: "+266", country: "Lesotho", flag: "🇱🇸" },
            { code: "+371", country: "Lettonie", flag: "🇱🇻" },
            { code: "+961", country: "Liban", flag: "🇱🇧" },
            { code: "+231", country: "Liberia", flag: "🇱🇷" },
            { code: "+218", country: "Libye", flag: "🇱🇾" },
            { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
            { code: "+370", country: "Lituanie", flag: "🇱🇹" },
            { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
            { code: "+853", country: "Macao", flag: "🇲🇴" },
            { code: "+389", country: "Macédoine du Nord", flag: "🇲🇰" },
            { code: "+261", country: "Madagascar", flag: "🇲🇬" },
            { code: "+60", country: "Malaisie", flag: "🇲🇾" },
            { code: "+265", country: "Malawi", flag: "🇲🇼" },
            { code: "+960", country: "Maldives", flag: "🇲🇻" },
            { code: "+223", country: "Mali", flag: "🇲🇱" },
            { code: "+356", country: "Malte", flag: "🇲🇹" },
            { code: "+212", country: "Maroc", flag: "🇲🇦" },
            { code: "+230", country: "Maurice", flag: "🇲🇺" },
            { code: "+222", country: "Mauritanie", flag: "🇲🇷" },
            { code: "+52", country: "Mexique", flag: "🇲🇽" },
            { code: "+373", country: "Moldavie", flag: "🇲🇩" },
            { code: "+377", country: "Monaco", flag: "🇲🇨" },
            { code: "+976", country: "Mongolie", flag: "🇲🇳" },
            { code: "+382", country: "Monténégro", flag: "🇲🇪" },
            { code: "+258", country: "Mozambique", flag: "🇲🇿" },
            { code: "+264", country: "Namibie", flag: "🇳🇦" },
            { code: "+977", country: "Népal", flag: "🇳🇵" },
            { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
            { code: "+227", country: "Niger", flag: "🇳🇪" },
            { code: "+234", country: "Nigeria", flag: "🇳🇬" },
            { code: "+47", country: "Norvège", flag: "🇳🇴" },
            { code: "+687", country: "Nouvelle-Calédonie", flag: "🇳🇨" },
            { code: "+64", country: "Nouvelle-Zélande", flag: "🇳🇿" },
            { code: "+968", country: "Oman", flag: "🇴🇲" },
            { code: "+256", country: "Ouganda", flag: "🇺🇬" },
            { code: "+998", country: "Ouzbékistan", flag: "🇺🇿" },
            { code: "+92", country: "Pakistan", flag: "🇵🇰" },
            { code: "+507", country: "Panama", flag: "🇵🇦" },
            { code: "+675", country: "Papouasie-Nouvelle-Guinée", flag: "🇵🇬" },
            { code: "+595", country: "Paraguay", flag: "🇵🇾" },
            { code: "+31", country: "Pays-Bas", flag: "🇳🇱" },
            { code: "+51", country: "Pérou", flag: "🇵🇪" },
            { code: "+63", country: "Philippines", flag: "🇵🇭" },
            { code: "+48", country: "Pologne", flag: "🇵🇱" },
            { code: "+351", country: "Portugal", flag: "🇵🇹" },
            { code: "+974", country: "Qatar", flag: "🇶🇦" },
            { code: "+40", country: "Roumanie", flag: "🇷🇴" },
            { code: "+44", country: "Royaume-Uni", flag: "🇬🇧" },
            { code: "+7", country: "Russie", flag: "🇷🇺" },
            { code: "+250", country: "Rwanda", flag: "🇷🇼" },
            { code: "+221", country: "Sénégal", flag: "🇸🇳" },
            { code: "+381", country: "Serbie", flag: "🇷🇸" },
            { code: "+248", country: "Seychelles", flag: "🇸🇨" },
            { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
            { code: "+65", country: "Singapour", flag: "🇸🇬" },
            { code: "+421", country: "Slovaquie", flag: "🇸🇰" },
            { code: "+386", country: "Slovénie", flag: "🇸🇮" },
            { code: "+252", country: "Somalie", flag: "🇸🇴" },
            { code: "+249", country: "Soudan", flag: "🇸🇩" },
            { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
            { code: "+46", country: "Suède", flag: "🇸🇪" },
            { code: "+41", country: "Suisse", flag: "🇨🇭" },
            { code: "+597", country: "Suriname", flag: "🇸🇷" },
            { code: "+963", country: "Syrie", flag: "🇸🇾" },
            { code: "+992", country: "Tadjikistan", flag: "🇹🇯" },
            { code: "+255", country: "Tanzanie", flag: "🇹🇿" },
            { code: "+235", country: "Tchad", flag: "🇹🇩" },
            { code: "+420", country: "Tchéquie", flag: "🇨🇿" },
            { code: "+66", country: "Thaïlande", flag: "🇹🇭" },
            { code: "+228", country: "Togo", flag: "🇹🇬" },
            { code: "+216", country: "Tunisie", flag: "🇹🇳" },
            { code: "+90", country: "Turquie", flag: "🇹🇷" },
            { code: "+380", country: "Ukraine", flag: "🇺🇦" },
            { code: "+598", country: "Uruguay", flag: "🇺🇾" },
            { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
            { code: "+58", country: "Venezuela", flag: "🇻🇪" },
            { code: "+84", country: "Viêt Nam", flag: "🇻🇳" },
            { code: "+967", country: "Yémen", flag: "🇾🇪" },
            { code: "+260", country: "Zambie", flag: "🇿🇲" },
            { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
        ];
    
        const countryContainer = document.createElement("div");
    countryContainer.classList.add("flex", "flex-col", "w-full", "gap-2", "mt-2");

    const select = document.createElement("div");
    select.classList.add("w-full", "p-2", "rounded-lg", "bg-gray-100", "max-h-56", "overflow-auto");

    const countrySelect = document.createElement("div");
    countrySelect.classList.add("grid", "grid-cols-2", "gap-2", "w-full");

    // On affiche seulement les 6 premiers indicatifs
    const visibleCountries = countryCodes.slice(0, 6);
    visibleCountries.forEach(country => addCountryButton(country));

    // Bouton "Voir plus"
    const showMoreBtn = document.createElement("button");
    showMoreBtn.textContent = "Voir plus";
    showMoreBtn.classList.add("w-full", "mt-2", "text-blue-500", "underline", "cursor-pointer");
    showMoreBtn.addEventListener("click", function () {
        countryCodes.slice(6).forEach(country => addCountryButton(country));
        showMoreBtn.remove(); // Supprimer le bouton après affichage complet
    });

    select.appendChild(countrySelect);
    select.appendChild(showMoreBtn);
    countryContainer.appendChild(select);

    function addCountryButton(country) {
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

        countryBtn.addEventListener("click", function () {
            selectCountry(country.code, country.flag);
        });

        countrySelect.appendChild(countryBtn);
    }

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

        selectedCountryContainer.innerHTML = "";

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

    selectedCountryContainer.addEventListener("click", function () {
        select.classList.remove("hidden");
        select.scrollTop = 0;
    });

    validateBtn.addEventListener("click", function () {
        if (!selectedCode) {
            sendMessage("Veuillez sélectionner un pays ❌", false);
            return;
        }

        const phoneNumber = input.value.trim().replace(/\s/g, "");

        if (!/^\d{9}$/.test(phoneNumber)) {
            sendMessage("Numéro invalide ❌. Entrez 9 chiffres sans l'indicatif.", false);
            input.value = "";
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

