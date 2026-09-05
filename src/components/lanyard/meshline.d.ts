import type { ThreeElement } from "@react-three/fiber";
import type { MeshLineGeometry, MeshLineMaterial } from "meshline";

/**
 * meshline ships plain three.js classes. Registering them with extend() makes
 * them usable as JSX, but React Three Fiber still needs the element names
 * declared so TypeScript accepts <meshLineGeometry /> and <meshLineMaterial />.
 */
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

export {};
