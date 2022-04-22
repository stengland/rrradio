<script lang="ts">
  import { settings } from '../stores/settings';
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import { KeyManager } from 'onyx-ui/services';
  import { KaiOS } from '../services/kaios';
  import { player } from '../stores/player';
  import { play, stop } from '../components/AudioPlayer.svelte';
  import { onDestroy } from 'svelte';

  let keyMan = KeyManager.subscribe(
    {
      onArrowUp: () => KaiOS.system.volumeUp(),
      onArrowDown: () => KaiOS.system.volumeDown(),
      onEnter: () => ($player.playing ? stop() : play()),
    }
  );

  onDestroy(() => keyMan.unsubscribe());

  function formatTime(rawSeconds) {
    let isNegative = false;
    if (rawSeconds < 0) {
        isNegative = true;
        rawSeconds = Math.abs(rawSeconds);
    }
    const hours = Math.floor(rawSeconds / 60 / 60);
    const minutes = Math.floor((rawSeconds / 60) % 60);
    const seconds = Math.floor(rawSeconds % 60);
    let time = '';
    time += hours > 0 ? hours.toString() + ':' : '';
    time +=
        hours > 0
            ? minutes.toString().padStart(2, '0') + ':'
            : minutes.toString() + ':';
    time += seconds.toString().padStart(2, '0');
    return isNegative ? `-${time}` : time;
  }
</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="RRRadio Player"/>
      <CardContent>
      {#if $player.station }
      <Typography type="title" padding="horizontal" align="center">{$player.station.artist} {$player.station.title}</Typography>
      <Typography type="caption" align="center">{$player.station.file}</Typography>
      <Typography type="bodyLarge" align="center">{formatTime($player.currentTime)}</Typography>
      {:else}
      <Typography type="title" padding="horizontal" align="center">Radio Radio Radio</Typography>
      <Typography type="title" padding="horizontal" align="center">Radio Radio Radio</Typography>
      <Typography type="bodyLarge" align="center">When I got the music</Typography>
      <Typography type="bodyLarge" align="center">I got a place to go</Typography>
      <Typography type="caption" align="center">Choose a station</Typography>
      {/if}
      </CardContent>
    </Card>
  </ViewContent>
</View>
