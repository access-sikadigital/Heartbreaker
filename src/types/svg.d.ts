/**
 * SVG imports.
 *
 * `next.config.ts` routes *.svg through SVGR, so an SVG import is a React
 * component. Use this when you need the icon to inherit `currentColor`:
 *
 *   import Flash from "@/../public/brand/icons/flash.svg";
 *   <Flash className="size-10 text-chilli" />
 *
 * For a fixed colour, the <Icon> component and plain <Image> are cheaper.
 */
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
