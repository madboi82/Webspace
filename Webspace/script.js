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

// Charger le modèle GLB (TV)
const loader = new THREE.GLTFLoader();
let asteroid = null;

loader.load(
    'assets/scène.3D/grandmas_tv.glb',
    function (gltf) {
        asteroid = gltf.scene;
        scene.add(asteroid);
        asteroid.scale.set(0.2, 0.2, 0.2);
        asteroid.position.set(0, 8, 0);

        const boundingBox = new THREE.Box3().setFromObject(asteroid);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        if (maxDimension > 1) {
            const scale = 1 / maxDimension;
            asteroid.scale.set(scale, scale, scale);
        }

        camera.position.z = Math.min(maxDimension * 1.5, 4.5);
        const center = boundingBox.getCenter(new THREE.Vector3());
        camera.lookAt(center);

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



// Fonction pour afficher/masquer les sections
let sectionsVisible = false;
const contentSections = document.getElementById('content-sections');
const footer = document.getElementById('footer');
const quiSommesNousSection = document.getElementById('qui-sommes-nous');
const seeMoreButton = document.getElementById('see-more-button'); // Assure que le bouton est déjà dans le DOM

function toggleSections() {
    sectionsVisible = !sectionsVisible;

    if (sectionsVisible) {
        footer.classList.remove('hidden');
        contentSections.classList.remove('hidden');
        container.classList.add('h-3/4');
        //seeMoreButton.textContent = 'Voir moins ↑';

        quiSommesNousSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        footer.classList.add('hidden');
        contentSections.classList.add('hidden');
        container.classList.remove('h-3/4');
        container.classList.add('h-screen');
        //seeMoreButton.textContent = 'Voir plus ↓';
    }
}

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Événements souris
container.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
});

container.addEventListener('mousemove', (event) => {
    if (isDragging && asteroid) { // Assurez-vous que l'objet est chargé
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        asteroid.rotation.y += deltaX * 0.005; // Ajustez la vitesse de rotation
        asteroid.rotation.x += deltaY * 0.005;

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});


// Gérer l'événement pour le bouton "Voir plus"
seeMoreButton.addEventListener('click', toggleSections);

function onMouseClick(event) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Mise à jour de la position du rayon avec la souris
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Configure le raycaster avec la caméra et les coordonnées de la souris
    raycaster.setFromCamera(mouse, camera);

    // Récupérer uniquement les objets interactifs
    const objectsToTest = [];
    scene.traverse((child) => {
        if (child.isMesh) objectsToTest.push(child);
    });

    // Vérifiez les intersections
    const intersects = raycaster.intersectObjects(objectsToTest, true); // Notez "intersectObjects"
    
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Si l'objet intersecté est la télécommande
        if (intersectedObject.userData.isRemoteControl) {
            onRemoteControlClick(); // Action associée
        }
    }
}


scene.children.forEach(obj => {
    console.log(obj.name, obj.type, obj.isMesh ? 'Testable' : 'Non-testable');
});


window.addEventListener('click', onMouseClick, false);

// Fonction de redimensionnement
function resizeRenderer() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Ajuster la taille de la texture vidéo pour couvrir toute la fenêtre
    videoTexture.image.width = width;
    videoTexture.image.height = height;
    videoTexture.needsUpdate = true; // Indiquer que la texture doit être mise à jour

    
}

window.addEventListener('resize', resizeRenderer);
resizeRenderer(); // Initial resize

resizeRenderer();

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();








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

    // Timeline pour les animations (peut être étendue si nécessaire)
    const timeline = gsap.timeline();

    // Gestion du menu hamburger
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNavbar = document.getElementById("mobile-navbar");

    menuToggle.addEventListener("click", () => {
        mobileNavbar.classList.toggle("hidden");
        if (!mobileNavbar.classList.contains("hidden") && !sectionsVisible) {
             // Affiche les sections sans scroll automatique
        footer.classList.remove("hidden");
        contentSections.classList.remove("hidden");
        container.classList.add("h-3/4");
        //seeMoreButton.textContent = 'Voir moins ↑';
        }
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
        const isScrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
        scrollToTopButton.classList.toggle("hidden", !isScrolled);
    });

    // Fonction pour faire défiler vers le haut
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Formulaire de contact : animation et confirmation
    const form = document.querySelector('#nous-contacter form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const paperPlane = document.getElementById('paper-plane');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche l'envoi réel du formulaire

        // Affiche le message de confirmation
        confirmationMessage.classList.remove('hidden');

        // Animation pour faire décoller le paper plane avec effet de battement d'ailes
        gsap.fromTo(
            paperPlane,
            { opacity: 1, x: 0, y: 0, rotation: 0 },
            {
                opacity: 0,
                x: 300,
                y: -400,
                duration: 5,
                ease: "power6.out",
                onUpdate: () => {
                    const rotationDirection = Math.sin(gsap.globalTimeline.time() * 10) * 5;
                    gsap.set(paperPlane, { rotation: rotationDirection });
                }
            }
        );

        // Cache le message après quelques secondes
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
        }, 5000);
    });
});






    




