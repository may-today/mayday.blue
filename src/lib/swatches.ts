// Preview colours of field-control colour names, copied from the mini
// program's src/lightstick/field-colors.ts. Move to a shared package later.
const swatches: Record<string, string> = {"red4":"#ef4444","red3":"#f87171","red2":"#fca5a5","red1":"#fecaca","ora4":"#f97316","ora3":"#fb923c","ora2":"#fdba74","ora1":"#fed7aa","yel4":"#eab308","yel3":"#facc15","yel2":"#fde047","yel1":"#fef08a","gre4":"#22c55e","gre3":"#15803d","gre2":"#14532d","gre1":"#052e16","sky4":"#06b6d4","sky3":"#22d3ee","sky2":"#67e8f9","sky1":"#a5f3fc","blu4":"#3b82f6","blu3":"#60a5fa","blu2":"#93c5fd","blu1":"#bfdbfe","pur4":"#a855f7","pur3":"#c084fc","pur2":"#d8b4fe","pur1":"#e9d5ff","redT":"#ef4444","oraT":"#f97316","yelT":"#eab308","skyT":"#06b6d4","bluT":"#3b82f6","purT":"#a855f7","off4":"#333333","pin4":"#ec4899","pin2":"#f472b6","whi4":"#ffffff","whiT":"#eeeeee","rai4":"rainbow"}

/** CSS background for one strip segment; unknown names draw as off. */
export const swatchBackground = (name: string): string => {
  const color = swatches[name] ?? swatches.off4
  return color === 'rainbow'
    ? 'linear-gradient(90deg, #ef4444, #eab308, #22c55e, #06b6d4, #a855f7)'
    : color
}
