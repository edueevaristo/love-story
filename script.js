const initThreeJS = () => {
    try {
        if (typeof THREE === 'undefined') {
            console.error('Three.js não está carregado');
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-bg').appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1200;
        
        const posArray = new Float32Array(particlesCount * 5);
        
        for (let i = 0; i < particlesCount * 5; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xff69b4,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 1;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.0002;
            particlesMesh.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    } catch (error) {

        console.error('Erro no Three.js:', error);
        document.getElementById('three-bg').style.backgroundColor = '#ffd6e7';
    }
};

const initGSAP = () => {
    try {
        
        if (typeof gsap === 'undefined') {
            console.error('GSAP não está carregado');
            return;
        }

        gsap.from('header', {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: "power2.out"
        });

        gsap.from('.card', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.5
        });

        gsap.from('footer', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: 'footer',
                start: "top 80%"
            }
        });

    } catch (error) {
        console.error('Erro no GSAP:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('three-bg')) {
        initThreeJS();
    }
    
    initGSAP();
});