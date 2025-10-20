import { projects } from '@/types/static.type';
import { HoverEffect } from './HoverEffect';

export function CardHoverEffectDemo() {
  return (
    <div className="font-garamond mx-auto px-8 ">
      <HoverEffect items={projects} />
    </div>
  );
}
