import type { ComponentType } from 'react'
import type { PlayId } from '../../data'
import { AperturePlay } from './AperturePlay'
import { CuePlay } from './CuePlay'
import { GuildPlay } from './GuildPlay'
import { FoReachPlay } from './FoReachPlay'
import { BifrostPlay } from './BifrostPlay'
import { LatchGridPlay } from './LatchGridPlay'
import { SuPlay } from './SuPlay'
import { StudyDeckPlay } from './StudyDeckPlay'

export const plays: Record<PlayId, ComponentType> = {
  aperture: AperturePlay, cue: CuePlay, guild: GuildPlay, foreach: FoReachPlay,
  bifrost: BifrostPlay, latchgrid: LatchGridPlay, suapp: SuPlay, studydeck: StudyDeckPlay,
}
