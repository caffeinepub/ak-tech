# AK Tech

## Current State
The site uses a Dark Forest luxury theme with deep green OKLCH colors, floating orbs in greens/golds, a Leaf logo icon, and a forest texture background image.

## Requested Changes (Diff)

### Add
- Space-themed hero background image (already generated: `/assets/generated/space-hero.dim_1920x1080.jpg`)

### Modify
- `index.css` color palette: replace dark forest greens with deep space navy/black background, electric cyan primary, purple/violet accent
- `App.tsx`: replace all `forest-texture-bg.dim_1920x1080.jpg` references with `space-hero.dim_1920x1080.jpg`
- `App.tsx`: replace `Leaf` icon import and usage with `Rocket` icon for the nav logo
- Update orb colors in CSS to reflect nebula tones (cyan, violet, indigo)
- Update gradient and text-gradient to space cyan/purple palette
- Update cursor glow to match space theme colors

### Remove
- Nothing removed

## Implementation Plan
1. Update `index.css` OKLCH color tokens to deep space palette (background ~0.05 L hue 270, primary cyan hue 195, accent purple hue 295)
2. Update orb CSS classes to nebula colors
3. In App.tsx swap `Leaf` → `Rocket` in imports and JSX
4. Replace all `forest-texture-bg` src references with `space-hero.dim_1920x1080.jpg`
5. Validate build
