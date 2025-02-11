

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
video.playsInline = true;








video.addEventListener('loadeddata', () => {
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    
    // Assigner la texture comme arrière-plan une fois qu'elle est prête
    scene.background = videoTexture;

    if (video.readyState >= 2) {
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.needsUpdate = true; // Indiquer que la texture doit être mise à jour
        scene.background = videoTexture;
    } else {
        console.error("La vidéo n'est pas prête.");
    }
});




// Lecture forcée après interaction utilisateur
function tryToPlayVideo() {
    video.play().catch(() => {
        console.log('Lecture automatique bloquée. En attente d’une interaction utilisateur.');
        // Attendre que l'utilisateur clique quelque part pour jouer la vidéo
        window.addEventListener('click', () => {
            video.play().catch((error) => console.error('Erreur lecture vidéo:', error));
        });
    });
}

// Appeler la fonction dès que la page est prête
tryToPlayVideo();

// Gérer l'interaction du bouton "see-more-button"
const seeMoreButton = document.getElementById('see-more-button');

let isPaused = false; // Variable pour suivre l'état (pause ou non)

// Ajouter un événement au bouton
seeMoreButton.addEventListener('click', () => {
    // Si la vidéo est en cours de lecture, on l'arrête (met en pause)
    if (!video.paused) {
        console.log("Vidéo stoppée");
        video.pause(); // Met la vidéo en pause si elle est en cours de lecture
    } else {
        // Relancer la vidéo si elle est en pause
        console.log("Vidéo relancée");
        video.play(); // Reprend la vidéo si elle est en pause
    }

    // Gérer l'animation 3D de la télévision
    if (mixer) {
        if (isPaused) {
            // Relancer toutes les animations si elles étaient arrêtées
            console.log("Relancer les animations 3D");
            mixer.timeScale = 1; // Reprendre la lecture des animations
            isPaused = false;
            
        } else {
            // Arrêter toutes les animations si elles étaient en cours
            console.log("Arrêter les animations 3D");
            mixer.timeScale = 0; // Mettre les animations en pause
            isPaused = true;
            
        }
    } else {
        console.log("Mixer non disponible");
    }
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

// Variables pour animation
let mixer = null;
let clock = new THREE.Clock();

// Charger le modèle GLB (TV)
const loader = new THREE.GLTFLoader(); // Utilisation correcte avec l'import ES6

let tv = null;

loader.load(
    'assets/scène.3D/old_tv.glb',
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

        // Configurer le mixer pour les animations
        if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(tv);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }

        // Fonction pour ajuster l'échelle de la télé en fonction de la taille de l'écran
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
        window.addEventListener('resize', updateAsteroidScale);

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

// Sélection de l'élément de l'indication de rotation
const rotateHint = document.getElementById('rotate-hint');

// Animation GSAP pour clignoter toutes les 0.5s
gsap.to(rotateHint, { opacity: 0.1, repeat: -1, yoyo: true, duration: 0.5 });

function toggleRotateHint(hide) {
    if (hide) {
        rotateHint.classList.add("hidden");
    } else {
        rotateHint.classList.remove("hidden");
    }
}

// Cacher l'icône lors d'un clic de souris
container.addEventListener("mousedown", () => toggleRotateHint(true));

// Réafficher lorsque l'utilisateur relâche la souris
container.addEventListener("mouseup", () => toggleRotateHint(false));



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

         // Déclencher les animations après que les sections sont visibles
         initSectionAnimations();
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




// Événements souris
container.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;

    
});



container.addEventListener('mousemove', (event) => {
    if (isDragging && tv) { // Assurez-vous que l'objet est chargé
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        tv.rotation.y += deltaX * 0.005; // Ajustez la vitesse de rotation
        tv.rotation.x += deltaY * 0.005;

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    
});

container.addEventListener('mouseup', () => {
    isDragging = false;
        
    
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

    // Mettre à jour le mixer pour les animations
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }

    renderer.render(scene, camera);

}
animate();








document.addEventListener('DOMContentLoaded', () => {
    // Configuration initiale du logo
    gsap.set("#logo", {
        scale: 1,
        transformOrigin: "center",
        opacity: 1
    });

    // Animation GSAP pour le logo
    gsap.fromTo("#logo", { rotationY: 1440 }, { rotationY: 0, opacity: 1, duration: 1.5, ease: "power2.out" });

    // Animation GSAP pour le logo : vague fluide de gauche à droite
    gsap.to("#logo", {
        x: 5,
        y: 2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            amount: 0.5,
            from: "start",
        }
    });

    // Variables pour la rotation des sections
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    const container = document.getElementById('horizontal-scroll-container');
    const sections = document.querySelectorAll('#qui-sommes-nous, #nos-services, #nous-contacter');

    sections.forEach((section) => {
        section.addEventListener('mouseenter', () => {
            gsap.to(section, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });
        });

        section.addEventListener('mouseleave', () => {
            gsap.to(section, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.pageX - container.offsetLeft;
        const deltaX = x - startX;
        container.scrollLeft = scrollLeft - deltaX;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distanceFromCenter = centerX - window.innerWidth / 2;
            const rotation = -distanceFromCenter * 0.05;
            section.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;
        });
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    function animateSections() {
        if (!isDragging) {
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const distanceFromCenter = centerX - window.innerWidth / 2;
                const rotation = -distanceFromCenter * 0.03;

                section.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;
            });
        }
        requestAnimationFrame(animateSections);
    }

    animateSections();



    // Gestion de la flèche de retour en haut
    const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    const isScrolled = document.documentElement.scrollTop > 100;
    scrollToTopButton.classList.toggle("hidden", !isScrolled);
});

scrollToTopButton.addEventListener("click", () => {
    let position = window.scrollY;

    function scrollStep() {
        if (position > 0) {
            window.scrollTo(0, 0);
            position -= 150; // Augmente la vitesse en augmentant cette valeur
            requestAnimationFrame(scrollStep);
        }
    }

    scrollStep();
});


    // Configuration EmailJS
    emailjs.init("r6XTs5NEZliGBWczM");

    // Formulaire de contact : animation et confirmation
    const form = document.querySelector('#contact');
    const confirmationMessage = document.getElementById('confirmation-message');
    const paperPlane = document.getElementById('paper-plane');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Préparation des données du formulaire
        const formData = {
            prenom: form.querySelector('[name="prenom"]').value,
            nom: form.querySelector('[name="nom"]').value,
            email: form.querySelector('[name="email"]').value,
            message: form.querySelector('[name="message"]').value
        };

        console.log('FormData envoyé :', formData); // Debugging

        // Envoi de l'email via EmailJS
        emailjs.send(
            'service_r3cl6dl', // Service ID
            'template_nhthnkc', // Template ID
            formData
        )
        .then((response) => {
            console.log('Email envoyé avec succès:', response);
            confirmationMessage.classList.remove('hidden');

            // Animation de l'avion en papier
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

            // Réinitialisation du formulaire
            form.reset();

            // Cacher le message de confirmation après 5 secondes
            setTimeout(() => {
                confirmationMessage.classList.add('hidden');
            }, 5000);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'envoi:', error);
            alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
        });
    });
});

        










    




