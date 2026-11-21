// Shapes returned by the `preset` cloud function (mini program
// src/presets/contract.ts).

export interface PresetSummary {
  id: string
  song: string | null
  name: string
  subName: string | null
  durationMs: number
  colorCount: number
  strip: string[]
  public: boolean
  mine: boolean
  author: { name: string | null }
  updatedAt: string
}

export interface PresetDetail extends PresetSummary {
  favorite: boolean
  description: string | null
  content: string
  createdAt: string
}

export interface Viewer {
  name: string | null
}

export type LoginPoll =
  | { status: 'pending' | 'expired' | 'cancelled' | 'used' }
  | { status: 'confirmed' }
