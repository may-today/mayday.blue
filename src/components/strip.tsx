import { swatchBackground } from '../lib/swatches.ts'

/** The preset's 48-segment colour bar; colour names are never shown. */
export const Strip = ({ strip, className = '' }: { strip: string[]; className?: string }) => (
  <div aria-hidden="true" className={`flex overflow-hidden rounded-full ${className}`}>
    {strip.map((name, index) => (
      <span
        // A strip is a fixed sequence; position is its identity.
        // oxlint-disable-next-line no-array-index-key
        key={index}
        className="h-full flex-1"
        style={{ background: swatchBackground(name) }}
      />
    ))}
  </div>
)
