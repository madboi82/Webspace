require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS
const corsOptions = {
    origin: 'https://mywebspace.fr',  // Remplace par l'URL de ton frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Appliquer CORS avec les options
app.use(cors(corsOptions));

// Middleware pour parser les données JSON
app.use(express.json());

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Ton adresse email d’envoi
        pass: process.env.EMAIL_PASS   // Ton mot de passe d'application
    }
});

// Route pour recevoir les données du chatbot
app.post('/send-message', async (req, res) => {
    const { service, name, phone } = req.body;

    if (!service || !name || !phone) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        // Email à envoyer
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Email de l'expéditeur
            to: 'contacts.webspace@gmail.com', // Ton email de réception
            subject: 'Nouveau lead depuis le chatbot',
            text: `Service(s) demandé(s) : ${service.join(", ")}\nNom : ${name}\nTéléphone : ${phone}`
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email envoyé avec succès !" });

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
