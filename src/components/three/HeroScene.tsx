"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { EcuModule } from "./EcuModule";
import { Starfield } from "./Starfield";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Coarse capability check — keeps the effect stack off weak GPUs. */
function useIsLowPower() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLow(cores <= 4 || narrow);
  }, []);
  return low;
}

/**
 * Frames the module by moving the camera, not the model: offset left so the
 * board sits in the empty right half beside the copy on desktop, and lifted
 * above it on narrow screens so it settles below the text instead of behind it.
 */
function CameraRig({ children }: { children: ReactNode }) {
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  const width = useThree((s) => s.size.width);

  const wide = width >= 1024;
  const mid = width >= 640;

  useEffect(() => {
    // The portrait now owns the right column; the module sits low behind it.
    if (wide) camera.position.set(-2.6, 2.1, 10.6);
    else if (mid) camera.position.set(-0.6, 2.4, 11.2);
    else camera.position.set(0, 3.2, 12.5);
    camera.lookAt(camera.position.x, camera.position.y, 0);
    camera.updateProjectionMatrix();
    // Needed for the reduced-motion "demand" frameloop, which won't redraw on its own.
    invalidate();
  }, [camera, invalidate, wide, mid]);

  return <group scale={wide ? 0.82 : mid ? 0.78 : 0.66}>{children}</group>;
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const low = useIsLowPower();

  return (
    <Canvas
      dpr={low ? [1, 1.4] : [1, 1.9]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ position: [0, 3.4, 8.2], fov: 42 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <color attach="background" args={["#04060a"]} />
      <fog attach="fog" args={["#04060a", 11, 26]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.35} color="#cfe9ff" />
      <directionalLight position={[-6, 3, -5]} intensity={1.1} color="#00e5ff" />
      <directionalLight position={[3, -2, 6]} intensity={0.8} color="#a3e635" />
      <pointLight position={[0, -3, 0]} intensity={14} color="#0891b2" distance={16} decay={2} />

      <Suspense fallback={null}>
        <CameraRig>
          <EcuModule />
        </CameraRig>

        <Starfield count={low ? 450 : 900} />

        {/* Reference plane — reads as a lab bench / HUD floor */}
        <Grid
          position={[0, -2.6, 0]}
          args={[40, 40]}
          cellSize={0.7}
          cellThickness={0.5}
          cellColor="#123543"
          sectionSize={3.5}
          sectionThickness={1}
          sectionColor="#00e5ff"
          fadeDistance={30}
          fadeStrength={1.4}
          followCamera={false}
          infiniteGrid
        />
      </Suspense>

      {/* Bloom is what makes the emissive traces read — keep it everywhere,
          just cheaper on weaker hardware. */}
      <EffectComposer multisampling={low ? 0 : 4}>
        <Bloom
          intensity={low ? 1.15 : 1.0}
          luminanceThreshold={0.42}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}
