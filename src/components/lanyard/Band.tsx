"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { extend, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import {
  MeshLineGeometry,
  MeshLineMaterial,
  type MeshLineMaterialParameters,
} from "meshline";
import {
  loadCardBackImage,
  loadPortrait,
  makeTexture,
  paintCardAtlas,
  paintStrap,
} from "./textures";

extend({ MeshLineGeometry, MeshLineMaterial });

export const CARD_MODEL = "/assets/kartu.glb";
useGLTF.preload(CARD_MODEL);

type CardGLTF = {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
  };
};

/** Rope segments share these tuning values; damping keeps the swing tasteful. */
const segmentProps = {
  type: "dynamic" as const,
  canSleep: true,
  colliders: false as const,
  angularDamping: 4,
  linearDamping: 4,
};

export default function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const { nodes, materials } = useGLTF(CARD_MODEL) as unknown as CardGLTF;
  const { width, height } = useThree((state) => state.size);

  // Both textures are drawn on a 2D canvas at mount, then repainted once the
  // webfonts settle so the badge is never typeset in the fallback serif.
  const cardArt = useMemo(() => makeTexture(paintCardAtlas, false), []);
  const strapArt = useMemo(() => makeTexture(paintStrap, true), []);

  useEffect(() => {
    let cancelled = false;

    // Wait for the webfonts, the portrait, and the card-back art before the
    // final repaint, so the badge is never typeset in the fallback serif or
    // drawn without its images.
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(null),
      loadPortrait(),
      loadCardBackImage(),
    ]).then(([, photo, cardBack]) => {
      if (cancelled) return;
      paintCardAtlas(cardArt.canvas, photo, cardBack);
      paintStrap(strapArt.canvas);
      cardArt.texture.needsUpdate = true;
      strapArt.texture.needsUpdate = true;
    });

    return () => {
      cancelled = true;
    };
  }, [cardArt, strapArt]);

  useEffect(() => {
    const { texture } = strapArt;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }, [strapArt]);

  useEffect(() => {
    return () => {
      cardArt.texture.dispose();
      strapArt.texture.dispose();
    };
  }, [cardArt, strapArt]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ],
        false,
        "chordal",
      ),
  );
  // MeshLineMaterial requires a resolution at construction time. The tuple is
  // memoised so R3F never tears the material down and rebuilds it; live size
  // changes go through the `resolution` prop instead.
  const materialArgs = useMemo<[MeshLineMaterialParameters]>(
    () => [{ resolution: new THREE.Vector2(1, 1) }],
    [],
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      for (const ref of [card, j1, j2, j3, fixed]) ref.current?.wakeUp();
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !band.current) return;

    // Smooth the two middle joints so the strap reads as fabric, not a chain
    for (const ref of [j1, j2]) {
      const body = ref.current as RapierRigidBody & { lerped?: THREE.Vector3 };
      if (!body) continue;
      if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
      const clamped = Math.max(
        0.1,
        Math.min(1, body.lerped.distanceTo(body.translation())),
      );
      body.lerped.lerp(
        body.translation(),
        delta * (minSpeed + clamped * (maxSpeed - minSpeed)),
      );
    }

    const l1 = (j1.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped;
    const l2 = (j2.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped;
    if (!l1 || !l2) return;

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(l2);
    curve.points[2].copy(l1);
    curve.points[3].copy(fixed.current.translation());
    (band.current.geometry as MeshLineGeometry).setPoints(curve.getPoints(32));

    // Bleed off spin so the card settles facing the viewer
    ang.copy(card.current.angvel() as THREE.Vector3);
    rot.copy(card.current.rotation() as unknown as THREE.Vector3);
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
  });

  return (
    <>
      <group position={[0, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3.85}
            // y recalculated for the bigger scale: the card mesh's own top
            // edge sits at local y ~1.02, so this offset keeps the clip
            // aligned with the strap's actual joint anchor instead of
            // floating away from it as scale grows.
            position={[0, -2.83, -0.05]}
            data-cursor="grab"
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element)?.releasePointerCapture?.(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element)?.setPointerCapture?.(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardArt.texture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.18}
                roughness={0.38}
                metalness={0.42}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={materialArgs}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap={1}
          map={strapArt.texture}
          repeat={[-3, 1]}
          lineWidth={1.7}
        />
      </mesh>
    </>
  );
}
