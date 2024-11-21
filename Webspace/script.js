// Comportement contrôlé lors du chargement des polices
WebFont.load({
    google: {
        families: ['Honk']
    },
    active: function() {
        document.getElementById('text-to-scroll').style.visibility = 'visible';
    },
    inactive: function() {
        console.warn('Police non chargée, fallback utilisée.');
    }
});




// Script pour le menu hamburger
 const menuToggle = document.getElementById("menu-toggle");
 const navbar = document.getElementById("navbar");

 menuToggle.addEventListener("click", () => {
     navbar.classList.toggle("hidden");
     navbar.classList.toggle("flex");
 });


 document.addEventListener('DOMContentLoaded', () => {
 
 // Animation GSAP pour le logo
 gsap.fromTo("#logo", { rotationY: 1440 }, { rotationY: 0, duration: 1.5 });

 // Animation de rebond pour le logo
gsap.to("#logo", {
    y: -20,
    duration: 0.8,
    ease: "bounce.out",
    repeat: -1,
    yoyo: true
  });

  // Cible le conteneur
  const screenContainer = document.getElementById('screen-container');
    
  // Animation GSAP
  gsap.fromTo(screenContainer, 
      {
          opacity: 0,        // Départ invisible
          y: 100,            // Position initiale (hors de l'écran vers le bas)
      }, 
      {
          opacity: 1,        // Apparition
          y: 0,              // Position finale (dans le cadre)
          duration: 1,       // Durée de l'animation en secondes
          ease: "power3.out" // Courbe d'accélération pour un effet fluide
      }
  );

  // Animation du conteneur principal
  const screen = document.getElementById('screen-container');
  const welcomeTitle = document.getElementById('welcome-title');
  const welcomeText = document.getElementById('welcome-text');
  const welcomeQuote = document.getElementById('welcome-quote');

  // Timeline pour les animations
  const timeline = gsap.timeline();

  // Animation du conteneur
  timeline.fromTo(
      screenContainer, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
  );

  // Animation des textes (en séquence)
  timeline.fromTo(
      welcomeTitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4" // Début légèrement avant la fin de l'animation précédente
  )
  .fromTo(
      welcomeText,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
  )
  .fromTo(
      welcomeQuote,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
 )

 });


 // Animation pour les sous-services
 const services = document.querySelectorAll('.service');

 services.forEach(service => {
     service.addEventListener('mouseover', () => {
         const subServices = service.querySelector('.sub-service');
         if (subServices) {
             gsap.to(subServices, { duration: 0.3, opacity: 1, display: 'flex' });
         }
     });

     service.addEventListener('mouseout', () => {
         const subServices = service.querySelector('.sub-service');
         if (subServices) {
             gsap.to(subServices, { duration: 0.3, opacity: 0, display: 'none' });
         }
     });
 });

 // Gestion de la flèche de retour en haut
const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.classList.remove("hidden");
    } else {
        scrollToTopButton.classList.add("hidden");
    }
});

// Fonction pour faire défiler vers le haut
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sélectionne le formulaire, le message de confirmation, et l'icône de l'avion en papier
const form = document.querySelector('#nous-contacter form');
const confirmationMessage = document.getElementById('confirmation-message');
const paperPlane = document.getElementById('paper-plane');

// Intercepte la soumission du formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire et le rechargement de la page
    
    // Affiche le message de confirmation
    confirmationMessage.classList.remove('hidden');

    // Animation pour faire décoller le paper plane avec effet de battement d'ailes
gsap.fromTo(
    "#paper-plane",
    { opacity: 1, x: 0, y: 0, rotation: 0 }, // Position et orientation de départ
    {
        opacity: 0,                       // Disparition progressive
        x: 300,                            // Déplacement vers la droite
        y: -400,                          // Décollage vers le haut
        rotation: 20,                     // Angle initial pour simuler le battement d’ailes
        duration: 5,                    // Durée totale de l'animation
        ease: "power6.out",               // Courbe d’animation pour l'effet de décollage naturel
        onUpdate: function () {           // Fonction pour créer le battement d’ailes
            const rotationDirection = Math.sin(gsap.globalTimeline.time() * 10) * 5; // Ajuste la fréquence et amplitude
            gsap.set("#paper-plane", { rotation: rotationDirection });
        }
    }
);



    // Cache le message après quelques secondes
    setTimeout(() => {
        confirmationMessage.classList.add('hidden');
    }, 5000);
});


document.addEventListener('DOMContentLoaded', () => {
    const textToScroll = document.querySelector('#text-to-scroll');
    const container = document.querySelector('#text-container');
    const containerHeight = container.offsetHeight;

    // Animation de défilement avec démarrage et arrêt à l'intérieur de l'écran
    gsap.fromTo(
        textToScroll,
        { y: containerHeight }, // Commence en bas du conteneur
        {
            y: -textToScroll.offsetHeight, // Finit en haut du conteneur
            ease: "linear", // Défilement fluide
            duration: 10, // Durée d'une boucle complète
            repeat: -1 // Animation infinie
        }
    );
});






