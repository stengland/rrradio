import type { Station } from './Station';

export type PlaybackProgress = {
  station: Station | undefined;
  playing: boolean;
  currentTime: number;
};
