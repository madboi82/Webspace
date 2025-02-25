const nodemailer = require('nodemailer');



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { service, name, phone } = req.body;

        if (!service || !name || !phone) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        try {
            // Configuration de Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,  // Ton email d’envoi
                    pass: process.env.EMAIL_PASS   // Ton mot de passe d'application
                }
            });

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
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
