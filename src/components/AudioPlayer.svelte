<script context="module" lang="ts">
  import type { PlaybackProgress } from '../models/PlaybackProgress';
  import { player } from '../stores/player';
  import { get } from 'svelte/store';

  let audio = new Audio();
  (audio as any).mozAudioChannelType = 'content';
  audio.preload = 'none';

  audio.ontimeupdate = () => {
    updateStatus({ currentTime: audio.currentTime });
  };

  export async function load(item: object) {
    audio.src = item.file;

    player.set({
      station: item,
      currentTime: 0,
      playing: true,
    });

    audio.play();
  }

  export function play() {
    if (audio.src) {
      audio.play();
      updateStatus({ playing: true });
    }
  }

  export function stop() {
    const p = get(player);
    audio.pause();
    audio.src = p.station.file;
    audio.currentTime = 0;
    updateStatus({
      playing: false,
      currentTime: 0,
    });
  }

 function updateStatus(changes: Partial<PlaybackProgress>) {
   player.update((a) => ({
     ...a,
     ...changes,
   }));
 }
</script>
