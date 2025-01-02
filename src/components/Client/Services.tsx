import { HoverEffect } from "../ui/card-hover-effect";
import { projects } from "@/utils/Data";



export function CardHoverEffectDemo() {
  return (
    <div>
      <HoverEffect items={projects} />
    </div>
  );
}
