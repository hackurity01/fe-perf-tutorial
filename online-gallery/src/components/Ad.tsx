import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AdProps {
  className?: string;
}

interface AnimatedMesh extends THREE.Mesh {
  originalY: number;
  time: number;
}

const Ad: React.FC<AdProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x1a1a2e);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create floating geometric shapes for advertisement
    const shapes: AnimatedMesh[] = [];

    // Create multiple geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.5, 1, 32),
      new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x45b7d1,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x96ceb4,
        transparent: true,
        opacity: 0.8,
      }),
    ];

    geometries.forEach((geometry, index) => {
      const material = materials[index];
      const mesh = new THREE.Mesh(geometry, material);
      const animatedMesh = mesh as unknown as AnimatedMesh;

      // Position shapes in a circle
      const angle = (index / geometries.length) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * 2;
      mesh.position.y = Math.sin(angle) * 2;
      mesh.position.z = 0;

      // Store original position for animation
      animatedMesh.originalY = mesh.position.y;
      animatedMesh.time = index * 0.5;

      scene.add(mesh);
      shapes.push(animatedMesh);
    });

    // Add floating text-like elements
    const textGeometry = new THREE.PlaneGeometry(2, 0.5);
    const textMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd93d,
      transparent: true,
      opacity: 0.9,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 1;
    textMesh.rotation.x = -0.2;
    scene.add(textMesh);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate all shapes
      shapes.forEach((shape) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;

        // Floating animation
        shape.time += 0.02;
        shape.position.y = shape.originalY + Math.sin(shape.time) * 0.3;
      });

      // Rotate text
      textMesh.rotation.z += 0.005;

      // Camera movement
      camera.position.x = Math.sin(Date.now() * 0.001) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.001) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mountRef}
        className="w-full h-48 rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white">
          <h3 className="text-lg font-bold mb-1">특별 할인!</h3>
          <p className="text-sm opacity-90">첫 구매 시 20% 할인</p>
        </div>
      </div>
    </div>
  );
};

export default Ad;
