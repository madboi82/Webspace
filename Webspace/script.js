// Scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Change the background color of the scene to a light color
renderer.setClearColor(0x333333, 1); // Couleur de fond gris foncé

// Add lighting
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
directionalLight.position.set(5, 5, 5).normalize(); // Position light
scene.add(directionalLight);

// Load GLB model
const loader = new THREE.GLTFLoader();
let asteroid = null;  // Initialisation de la variable pour stocker l'astéroïde

loader.load('assets/scène.3D/asteroid_with_resources.glb', function(gltf) {
    asteroid = gltf.scene; // Assignez l'astéroïde chargé à la variable 'asteroid'
    scene.add(asteroid);
    asteroid.scale.set(0.5, 0.5, 0.5); // Ajuster la taille
    asteroid.position.set(0, 0, 0);  // Positionner l'astéroïde au centre

    // Réajuster la caméra pour qu'elle regarde le modèle
    camera.lookAt(asteroid.position);
}, undefined, function(error) {
    console.error(error); // Affiche les erreurs dans la console si le modèle ne se charge pas
});

// Camera position
camera.position.z = 10;

// Variables pour gérer la rotation avec la souris
let isLeftClick = false;  // Booléen pour vérifier si le clic gauche est maintenu
let lastMouseX = 0;        // Dernière position X de la souris
let lastMouseY = 0;        // Dernière position Y de la souris
let rotationSpeed = 0.005; // Vitesse de rotation

// Fonction pour gérer le clic gauche
function onMouseDown(event) {
    if (event.button === 0) {  // Si c'est le clic gauche (button 0)
        isLeftClick = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

// Fonction pour gérer le relâchement du clic gauche
function onMouseUp(event) {
    if (event.button === 0) {  // Si c'est le clic gauche (button 0)
        isLeftClick = false;
    }
}

// Fonction pour gérer le mouvement de la souris
function onMouseMove(event) {
    if (isLeftClick && asteroid) {
        // Calculer les déplacements de la souris
        let deltaX = event.clientX - lastMouseX;
        let deltaY = event.clientY - lastMouseY;

        // Appliquer la rotation sur l'astéroïde
        asteroid.rotation.y += deltaX * rotationSpeed;  // Rotation autour de l'axe Y
        asteroid.rotation.x += deltaY * rotationSpeed;  // Rotation autour de l'axe X

        // Mettre à jour la dernière position de la souris
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

// Ajouter les événements de souris pour le clic gauche et le mouvement
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseMove, false);

// Prévenir le menu contextuel du clic droit (clic droit souris)
window.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
















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

  


  // Timeline pour les animations
  const timeline = gsap.timeline();


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




    





