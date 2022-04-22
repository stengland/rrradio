<script lang="ts">
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import ListItem from 'onyx-ui/components/list/ListItem.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import { DataStatus } from 'onyx-ui/enums';
  import { registerView, updateView, view } from 'onyx-ui/stores/view';
  import { getShortcutFromIndex } from 'onyx-ui/utils/getShortcutFromIndex';
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import { M3U } from "playlist-parser";
  import { load } from '../components/AudioPlayer.svelte';
  import { push } from 'svelte-spa-router';

  let items = [];

  onMount(async () => {
    const response = await fetch("/BBC-Radio-mp3.m3u");
    const data = await response.text();
    items = M3U.parse(data);
  });

  function playStation(item: object) {
    load(item);
    push('/')
  }
</script>

<View>
  <ViewContent>
      <Card>
        <CardHeader title="Stations"/>
        <CardContent>
          {#each items as item, i}
            <ListItem
              primaryText={item.artist + item.title}
              secondaryText={item.file}
              navi={{
                itemId: `${i + 1}`,
                onSelect: () => playStation(item),
              }}
            />
          {/each}
        </CardContent>
      </Card>
  </ViewContent>
</View>
