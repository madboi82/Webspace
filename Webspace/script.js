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
let tv = null;

loader.load(
    'assets/scène.3D/tv_old_asset.glb',
    function (gltf) {
        tv = gltf.scene;
        scene.add(tv);
        tv.scale.set(0, 0, 0);
        tv.position.set(0, 0.3, 0);
        tv.rotation.set(-Math.PI / -2, 0, 0); // Corrige l'orientation en inclinant de 90° sur X

        
        

        const boundingBox = new THREE.Box3().setFromObject(tv);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        if (maxDimension > 1) {
            const scale = 1 / maxDimension;
            tv.scale.set(scale, scale, scale);
        }

        function updateAsteroidScale() {
            if (tv) {
                if (window.innerWidth < 768) {
                    tv.scale.set(0.15, 0.15, 0.15);
                } else {
                    tv.scale.set(0.25, 0.25, 0.25);
                }
                renderer.render(scene, camera); // Forcer le rendu si nécessaire
            }
        }

        // Appeler immédiatement après le chargement pour ajuster la télé
        updateAsteroidScale();


        // Détecter les changements de taille d'écran
        window.addEventListener('resize', updateAsteroidScale,);
        

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


function toggleSections() {
    sectionsVisible = !sectionsVisible;

    if (sectionsVisible) {
        footer.classList.remove('hidden');
        contentSections.classList.remove('hidden');
        container.classList.add('h-3/4');
        

        quiSommesNousSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        footer.classList.add('hidden');
        contentSections.classList.add('hidden');
        container.classList.remove('h-3/4');
        container.classList.add('h-screen');
        
    }
}

// Gestion du menu hamburger
const menuToggle = document.getElementById("menu-toggle");
const mobileNavbar = document.getElementById("mobile-navbar");
const body = document.body

// Bloquer/débloquer le scroll
function toggleScroll() {
    body.classList.toggle('no-scroll');
    if (body.classList.contains('no-scroll')) {
        window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
        window.removeEventListener('touchmove', preventScroll, { passive: false });
    }
}

const textScroll = document.getElementById("welcome");
const welcomeTitle = document.getElementById("welcome-title")
const welcomeText = document.getElementById("welcome-text")
const wlecomeQuote = document.getElementById("welcome-quote")
const seeMoreButton = document.getElementById('see-more-button'); 





   // Ajout de l'événement au clic sur le bouton
   seeMoreButton.addEventListener("click", () => {
    
    if(tvInInitialPosition){
    textScroll.classList.toggle("hidden");

    

    if(!textScroll.classList.contains("hidden") ){
        // Animation d'apparition
        setTimeout(() => {
            welcomeTitle.classList.remove("opacity-0", "translate-y-10");
            welcomeText.classList.remove("opacity-0", "translate-y-10");
            wlecomeQuote.classList.remove("opacity-0", "translate-y-10");

            
        }, 100); // Le délai permet d'attendre un peu avant de lancer l'animation
      }
    }else{
        console.log("La télé n'est pas dans sa position initiale.");
    }

    });






// Empêcher les gestes tactiles
function preventScroll(event) {
    event.preventDefault();
}


menuToggle.addEventListener("click", () => {
    mobileNavbar.classList.toggle("hidden");

        
        if (!mobileNavbar.classList.contains("hidden") && !sectionsVisible) {
         // Affiche les sections sans scroll automatique
    
    footer.classList.remove("hidden");
    contentSections.classList.remove("hidden");
    container.classList.add("h-3/4");
    //seeMoreButton.textContent = 'Voir moins ↑';
    }else{
        footer.classList.add("hidden");
        contentSections.classList.add("hidden");
    }


});

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Position initiale et rotation définie
const initialRotation = { x: -Math.PI / -2, y: 0, z: 0 };
const initialPosition = { x: 0, y: 0.3, z: 0 };

const epsilon = 0.1; // Tolérance pour comparer les rotations
const epsilonPosition = 0.1; // Tolérance pour comparer la position

// Fonction pour forcer la télé à la position initiale si elle est proche
function snapToInitialPosition(tv) {
    if (tv) {
        const isCloseToInitialPosition =
            Math.abs(tv.position.x - initialPosition.x) < epsilonPosition &&
            Math.abs(tv.position.y - initialPosition.y) < epsilonPosition &&
            Math.abs(tv.position.z - initialPosition.z) < epsilonPosition;
        
        const isCloseToInitialRotation =
            Math.abs(tv.rotation.x - initialRotation.x) < epsilon &&
            Math.abs(tv.rotation.y - initialRotation.y) < epsilon &&
            Math.abs(tv.rotation.z - initialRotation.z) < epsilon;

        if (isCloseToInitialPosition && isCloseToInitialRotation) {
            // Forcer la position et la rotation initiale
            tv.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
            tv.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
        }
    }
}

// Fonction pour vérifier si la télé est en position initiale
function isInInitialPosition(tv) {
    
    return (
        Math.abs(tv.position.x - initialPosition.x) < epsilonPosition &&
        Math.abs(tv.position.y - initialPosition.y) < epsilonPosition &&
        Math.abs(tv.position.z - initialPosition.z) < epsilonPosition &&
        Math.abs(tv.rotation.x - initialRotation.x) < epsilon &&
        Math.abs(tv.rotation.y - initialRotation.y) < epsilon &&
        Math.abs(tv.rotation.z - initialRotation.z) < epsilon
    );
}



// Événements souris
container.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;

    // Ne masquer le texte que si la souris commence à déplacer la télé
    if (tv && !isInInitialPosition(tv) && !textScroll.classList.contains("hidden")) {
        textScroll.classList.add("hidden");
   
    }
});

let tvInInitialPosition = true;

function updateTvPositionState() {
    tvInInitialPosition = tv && isInInitialPosition(tv);
    if (tvInInitialPosition) {
        snapToInitialPosition(tv); // Force la télé à revenir à la position initiale si elle est proche
    }
}

container.addEventListener('mousemove', (event) => {
    if (isDragging && tv) { // Assurez-vous que l'objet est chargé
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        tv.rotation.y += deltaX * 0.005; // Ajustez la vitesse de rotation
        tv.rotation.x += deltaY * 0.005;

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

        updateTvPositionState();

        if (tvInInitialPosition) {
            // Réaffiche le texte seulement si la télé est à la position initiale
            textScroll.classList.remove("hidden");
        } else {
            textScroll.classList.add("hidden");
        }
    }
    
});

container.addEventListener('mouseup', () => {
    isDragging = false;

    // Vérifie si la télé est proche de sa position initiale après un drag
    if (tv) {
        snapToInitialPosition(tv);
    }
        
    
});




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


//scene.children.forEach(obj => {
    //console.log(obj.name, obj.type, obj.isMesh ? 'Testable' : 'Non-testable');
//});


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






    




