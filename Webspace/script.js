// Scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

// Ajout au conteneur "scene-container" du DOM
const container = document.getElementById('scene-container');
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Charger la vidéo comme texture
const video = document.createElement('video');
video.src = 'videos/purpleDice.mp4'; // Chemin vers la vidéo
video.loop = true;
video.muted = true;
video.autoplay = true;

// Lecture forcée après interaction utilisateur
video.play().catch(() => {
    console.log('Lecture automatique bloquée. En attente d’une interaction utilisateur.');
    window.addEventListener('click', () => {
        video.play().catch((error) => console.error('Erreur lecture vidéo:', error));
    });
});

// Création texture vidéo
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// Vidéo comme arrière-plan
scene.background = videoTexture;

// Lumières
const light = new THREE.AmbientLight(0x404040, 2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemiLight);

// Charger le modèle GLB
const loader = new THREE.GLTFLoader();
let asteroid = null;

loader.load(
    'assets/scène.3D/grandmas_tv.glb',
    function (gltf) {
        asteroid = gltf.scene;
        scene.add(asteroid);
        asteroid.scale.set(0.2, 0.2, 0.2);
        asteroid.position.set(0, 8, 0);

        // Bounding box pour ajustement
        const boundingBox = new THREE.Box3().setFromObject(asteroid);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        if (maxDimension > 1) {
            const scale = 1 / maxDimension;
            asteroid.scale.set(scale, scale, scale);
        }

        // Ajustement caméra
        camera.position.z = Math.min(maxDimension * 1.5, 4.5);

        // Centrer la caméra
        const center = boundingBox.getCenter(new THREE.Vector3());
        camera.lookAt(center);

        // Masquer l'écran de chargement
        document.getElementById('loading-screen').style.display = 'none';
    },
    function (xhr) {
        const progress = (xhr.loaded / xhr.total) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    },
    function (error) {
        console.error('Erreur chargement modèle:', error);
    }
);

// Variables pour rotation via souris
let isLeftClick = false;
let lastMouseX = 0;
let lastMouseY = 0;
let rotationSpeed = 0.005;

function onMouseDown(event) {
    if (event.button === 0) {
        isLeftClick = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

function onMouseUp(event) {
    if (event.button === 0) {
        isLeftClick = false;
    }
}

function onMouseMove(event) {
    if (isLeftClick && asteroid) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        asteroid.rotation.y += deltaX * rotationSpeed;
        asteroid.rotation.x += deltaY * rotationSpeed;

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseMove, false);

// Empêcher le clic droit
window.addEventListener('contextmenu', (event) => event.preventDefault());

// Redimensionnement pour correspondre au conteneur
function resizeRenderer() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeRenderer);
resizeRenderer(); // Initial resize

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();







// Script pour le menu hamburger
 const menuToggle = document.getElementById("menu-toggle");
 const mobileNavbar = document.getElementById("mobile-navbar");



 menuToggle.addEventListener("click", () => {
     // Bascule entre afficher et cacher le menu mobile
    mobileNavbar.classList.toggle("hidden");
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




    





