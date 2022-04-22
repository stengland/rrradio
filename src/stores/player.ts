import { writable } from 'svelte/store';
import type { PlaybackProgress } from '../models/PlaybackProgress';

export const player = writable<PlaybackProgress>({
  station: undefined,
  playing: false,
  currentTime: 0,
});
