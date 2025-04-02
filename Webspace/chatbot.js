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
            { code: "+994", country: "Azerbaïdjan", flag: "images/azerbaidjan.png" },
            { code: "+1242", country: "Bahamas", flag: "images/bahamas.png" },
            { code: "+973", country: "Bahreïn", flag: "images/bahrein.png" },
            { code: "+880", country: "Bangladesh", flag: "images/bangladesh.png" },
            { code: "+1246", country: "Barbade", flag: "images/barbade.png" },
            { code: "+501", country: "Belize", flag: "images/belize.png" },
            { code: "+229", country: "Bénin", flag: "images/benin.png" },
            { code: "+1441", country: "Bermudes", flag: "images/bermuda.png" },
            { code: "+975", country: "Bhoutan", flag: "images/bhoutan.png" },
            { code: "+375", country: "Biélorussie", flag: "images/biélarussie.png" },
            { code: "+591", country: "Bolivie", flag: "images/bolivia.png" },
            { code: "+387", country: "Bosnie-Herzégovine", flag: "images/bosnie.png" },
            { code: "+267", country: "Botswana", flag: "images/botswana.png" },
            { code: "+55", country: "Brésil", flag: "images/brésil.png" },
            { code: "+673", country: "Brunei", flag: "images/brunei.png" },
            { code: "+359", country: "Bulgarie", flag: "images/bulgarie.png" },
            { code: "+226", country: "Burkina Faso", flag: "images/burkina-faso.png" },
            { code: "+257", country: "Burundi", flag: "images/burundi.png" },
            { code: "+855", country: "Cambodge", flag: "images/cambodge.png" },
            { code: "+237", country: "Cameroun", flag: "images/cameroon.png" },
            { code: "+1", country: "Canada", flag: "images/canada.png" },
            { code: "+238", country: "Cap-Vert", flag: "images/cap-vert.png" },
            { code: "+236", country: "République centrafricaine", flag: "images/RCA.png" },
            { code: "+56", country: "Chili", flag: "images/chili.png" },
            { code: "+86", country: "Chine", flag: "images/chine.png" },
            { code: "+357", country: "Chypre", flag: "images/chypre.png" },
            { code: "+57", country: "Colombie", flag: "images/colombie.png" },
            { code: "+269", country: "Comores", flag: "images/comores.png" },
            { code: "+242", country: "République du Congo", flag: "images/Congo.png" },
            { code: "+243", country: "République démocratique du Congo", flag: "images/RDC.png" },
            { code: "+82", country: "Corée du Sud", flag: "images/corée-sud.png" },
            { code: "+506", country: "Costa Rica", flag: "images/costa-rica.png" },
            { code: "+225", country: "Côte d'Ivoire", flag: "images/côte-d'ivoire.png" },
            { code: "+385", country: "Croatie", flag: "images/croatia.png" },
            { code: "+45", country: "Danemark", flag: "images/danemark.png" },
            { code: "+253", country: "Djibouti", flag: "images/djibouti.png" },
            { code: "+1767", country: "Dominique", flag: "images/dominique.png" },
            { code: "+20", country: "Égypte", flag: "images/egypte.png" },
            { code: "+971", country: "Émirats arabes unis", flag: "images/emirats-arabes-unis.png" },
            { code: "+593", country: "Équateur", flag: "images/équateur.png" },
            { code: "+291", country: "Érythrée", flag: "images/" },
            { code: "+34", country: "Espagne", flag: "images/" },
            { code: "+372", country: "Estonie", flag: "images/" },
            { code: "+268", country: "Eswatini", flag: "images/" },
            { code: "+1", country: "États-Unis", flag: "images/" },
            { code: "+251", country: "Éthiopie", flag: "images/" },
            { code: "+679", country: "Fidji", flag: "images/" },
            { code: "+358", country: "Finlande", flag: "images/" },
            { code: "+33", country: "France", flag: "images/" },
            { code: "+241", country: "Gabon", flag: "images/" },
            { code: "+220", country: "Gambie", flag: "images/" },
            { code: "+995", country: "Géorgie", flag: "images/" },
            { code: "+233", country: "Ghana", flag: "images/" },
            { code: "+350", country: "Gibraltar", flag: "images/" },
            { code: "+30", country: "Grèce", flag: "images/" },
            { code: "+1473", country: "Grenade", flag: "images/" },
            { code: "+502", country: "Guatemala", flag: "images/" },
            { code: "+224", country: "Guinée", flag: "images/" },
            { code: "+240", country: "Guinée équatoriale", flag: "images/" },
            { code: "+592", country: "Guyana", flag: "images/" },
            { code: "+509", country: "Haïti", flag: "images/" },
            { code: "+1", country: "Canada", flag: "images/" },
            { code: "+238", country: "Cap-Vert", flag: "images/" },
            { code: "+236", country: "République centrafricaine", flag: "images/" },
            { code: "+56", country: "Chili", flag: "images/" },
            { code: "+86", country: "Chine", flag: "images/" },
            { code: "+357", country: "Chypre", flag: "images/" },
            { code: "+57", country: "Colombie", flag: "images/" },
            { code: "+269", country: "Comores", flag: "images/" },
            { code: "+242", country: "République du Congo", flag: "images/" },
            { code: "+243", country: "République démocratique du Congo", flag: "images/" },
            { code: "+82", country: "Corée du Sud", flag: "images/" },
            { code: "+506", country: "Costa Rica", flag: "images/" },
            { code: "+225", country: "Côte d'Ivoire", flag: "images/" },
            { code: "+385", country: "Croatie", flag: "images/" },
            { code: "+45", country: "Danemark", flag: "images/" },
            { code: "+253", country: "Djibouti", flag: "images/" },
            { code: "+1767", country: "Dominique", flag: "images/" },
            { code: "+20", country: "Égypte", flag: "images/" },
            { code: "+971", country: "Émirats arabes unis", flag: "images/" },
            { code: "+593", country: "Équateur", flag: "images/" },
            { code: "+291", country: "Érythrée", flag: "images/" },
            { code: "+34", country: "Espagne", flag: "images/" },
            { code: "+372", country: "Estonie", flag: "images/" },
            { code: "+268", country: "Eswatini", flag: "images/" },
            { code: "+1", country: "États-Unis", flag: "images/" },
            { code: "+251", country: "Éthiopie", flag: "images/" },
            { code: "+679", country: "Fidji", flag: "images/" },
            { code: "+358", country: "Finlande", flag: "images/" },
            { code: "+33", country: "France", flag: "images/" },
            { code: "+241", country: "Gabon", flag: "images/" },
            { code: "+220", country: "Gambie", flag: "images/" },
            { code: "+995", country: "Géorgie", flag: "images/" },
            { code: "+233", country: "Ghana", flag: "images/" },
            { code: "+350", country: "Gibraltar", flag: "images/" },
            { code: "+30", country: "Grèce", flag: "images/" },
            { code: "+1473", country: "Grenade", flag: "images/" },
            { code: "+502", country: "Guatemala", flag: "images/" },
            { code: "+224", country: "Guinée", flag: "images/" },
            { code: "+240", country: "Guinée équatoriale", flag: "images/" },
            { code: "+592", country: "Guyana", flag: "images/" },
            { code: "+509", country: "Haïti", flag: "images/" },
            { code: "+504", country: "Honduras", flag: "images/" },
            { code: "+852", country: "Hong Kong", flag: "images/" },
            { code: "+36", country: "Hongrie", flag: "images/" },
            { code: "+91", country: "Inde", flag: "images/" },
            { code: "+62", country: "Indonésie", flag: "images/" },
            { code: "+98", country: "Iran", flag: "images/" },
            { code: "+964", country: "Irak", flag: "images/" },
            { code: "+353", country: "Irlande", flag: "images/" },
            { code: "+354", country: "Islande", flag: "images/" },
            { code: "+972", country: "Israël", flag: "images/" },
            { code: "+39", country: "Italie", flag: "images/" },
            { code: "+1876", country: "Jamaïque", flag: "images/" },
            { code: "+81", country: "Japon", flag: "images/" },
            { code: "+962", country: "Jordanie", flag: "images/" },
            { code: "+7", country: "Kazakhstan", flag: "images/" },
            { code: "+254", country: "Kenya", flag: "images/" },
            { code: "+996", country: "Kirghizistan", flag: "images/" },
            { code: "+383", country: "Kosovo", flag: "images/" },
            { code: "+965", country: "Koweït", flag: "images/" },
            { code: "+856", country: "Laos", flag: "images/" },
            { code: "+266", country: "Lesotho", flag: "images/" },
            { code: "+371", country: "Lettonie", flag: "images/" },
            { code: "+961", country: "Liban", flag: "images/" },
            { code: "+231", country: "Liberia", flag: "images/" },
            { code: "+218", country: "Libye", flag: "images/" },
            { code: "+423", country: "Liechtenstein", flag: "images/" },
            { code: "+370", country: "Lituanie", flag: "images/" },
            { code: "+352", country: "Luxembourg", flag: "images/" },
            { code: "+853", country: "Macao", flag: "images/" },
            { code: "+389", country: "Macédoine du Nord", flag: "images/" },
            { code: "+261", country: "Madagascar", flag: "images/" },
            { code: "+60", country: "Malaisie", flag: "images/" },
            { code: "+265", country: "Malawi", flag: "images/" },
            { code: "+960", country: "Maldives", flag: "images/" },
            { code: "+223", country: "Mali", flag: "images/" },
            { code: "+356", country: "Malte", flag: "images/" },
            { code: "+212", country: "Maroc", flag: "images/" },
            { code: "+230", country: "Maurice", flag: "images/" },
            { code: "+222", country: "Mauritanie", flag: "images/" },
            { code: "+52", country: "Mexique", flag: "images/" },
            { code: "+373", country: "Moldavie", flag: "images/" },
            { code: "+377", country: "Monaco", flag: "images/" },
            { code: "+976", country: "Mongolie", flag: "images/" },
            { code: "+382", country: "Monténégro", flag: "images/" },
            { code: "+258", country: "Mozambique", flag: "images/" },
            { code: "+264", country: "Namibie", flag: "images/" },
            { code: "+977", country: "Népal", flag: "images/" },
            { code: "+505", country: "Nicaragua", flag: "images/" },
            { code: "+227", country: "Niger", flag: "images/" },
            { code: "+234", country: "Nigeria", flag: "images/" },
            { code: "+47", country: "Norvège", flag: "images/" },
            { code: "+687", country: "Nouvelle-Calédonie", flag: "images/" },
            { code: "+64", country: "Nouvelle-Zélande", flag: "images/" },
            { code: "+968", country: "Oman", flag: "images/" },
            { code: "+256", country: "Ouganda", flag: "images/" },
            { code: "+998", country: "Ouzbékistan", flag: "images/" },
            { code: "+92", country: "Pakistan", flag: "images/" },
            { code: "+507", country: "Panama", flag: "images/" },
            { code: "+675", country: "Papouasie-Nouvelle-Guinée", flag: "images/" },
            { code: "+595", country: "Paraguay", flag: "images/" },
            { code: "+31", country: "Pays-Bas", flag: "images/" },
            { code: "+51", country: "Pérou", flag: "images/" },
            { code: "+63", country: "Philippines", flag: "images/" },
            { code: "+48", country: "Pologne", flag: "images/" },
            { code: "+351", country: "Portugal", flag: "images/" },
            { code: "+974", country: "Qatar", flag: "images/" },
            { code: "+40", country: "Roumanie", flag: "images/" },
            { code: "+44", country: "Royaume-Uni", flag: "images/" },
            { code: "+7", country: "Russie", flag: "images/" },
            { code: "+250", country: "Rwanda", flag: "images/" },
            { code: "+221", country: "Sénégal", flag: "images/" },
            { code: "+381", country: "Serbie", flag: "images/" },
            { code: "+248", country: "Seychelles", flag: "images/" },
            { code: "+232", country: "Sierra Leone", flag: "images/" },
            { code: "+65", country: "Singapour", flag: "images/" },
            { code: "+421", country: "Slovaquie", flag: "images/" },
            { code: "+386", country: "Slovénie", flag: "images/" },
            { code: "+252", country: "Somalie", flag: "images/" },
            { code: "+249", country: "Soudan", flag: "images/" },
            { code: "+94", country: "Sri Lanka", flag: "images/" },
            { code: "+46", country: "Suède", flag: "images/" },
            { code: "+41", country: "Suisse", flag: "images/" },
            { code: "+597", country: "Suriname", flag: "images/" },
            { code: "+963", country: "Syrie", flag: "images/" },
            { code: "+992", country: "Tadjikistan", flag: "images/" },
            { code: "+255", country: "Tanzanie", flag: "images/" },
            { code: "+235", country: "Tchad", flag: "images/" },
            { code: "+420", country: "Tchéquie", flag: "images/" },
            { code: "+66", country: "Thaïlande", flag: "images/" },
            { code: "+228", country: "Togo", flag: "images/" },
            { code: "+216", country: "Tunisie", flag: "images/" },
            { code: "+90", country: "Turquie", flag: "images/" },
            { code: "+380", country: "Ukraine", flag: "images/" },
            { code: "+598", country: "Uruguay", flag: "images/" },
            { code: "+678", country: "Vanuatu", flag: "images/" },
            { code: "+58", country: "Venezuela", flag: "images/" },
            { code: "+84", country: "Viêt Nam", flag: "images/" },
            { code: "+967", country: "Yémen", flag: "images/" },
            { code: "+260", country: "Zambie", flag: "images/" },
            { code: "+263", country: "Zimbabwe", flag: "images/" },
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
        fetch("https://wavora-fioqgaw8l-webspaces-projects-14d59837.vercel.app/api/send-message", {
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

