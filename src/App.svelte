<script lang="ts">
  import Dashboard from 'onyx-ui/components/app/Dashboard.svelte';
  import OnyxApp from 'onyx-ui/components/app/OnyxApp.svelte';
  import { Priority } from 'onyx-ui/enums';
  import { KeyManager, Onyx } from 'onyx-ui/services';
  import Router, { location, pop, push } from 'svelte-spa-router';
  import AudioPlayer from './components/AudioPlayer.svelte';
  import Player from './routes/Player.svelte';
  import Stations from './routes/Stations.svelte';
  import Redirect from './routes/Redirect.svelte';
  import AppSettings from './routes/AppSettings.svelte';
  import { settings } from './stores/settings';
  import { player } from './stores/player';

  const routes = {
    '/home': Player,
    '/stations': Stations,
    '/settings/:cardId': AppSettings,
    '*': Redirect,
  };

  // TODO: Fix this in a better way
  document.addEventListener('keydown', (ev) => {
    if (
      ev.key === 'Backspace' &&
      $location !== '/home' &&
      (ev.target as any).contentEditable !== 'true'
    ) {
      ev.preventDefault();
    }
  });

  KeyManager.subscribe(
    {
      onBackspace: () => {
        // If on the main screen, let KaiOS minimize the app
        if ($location === '/home') {
          console.log('exit app');
          return false;
        }

        pop();
        return true;
      },
      onSoftLeft: () => { push('/stations') },
      onEnterLong: () => { push('/') },
      onBackspaceLong: () => { push('/') },
      onSoftRight: () => { push('/settings/display') },
    }
  );

  $: Onyx.settings.update($settings);

</script>

<OnyxApp>
  <Router {routes} />
    <Dashboard slot="dashboard">
      <div class="footer">
        <div>Stations</div>
        <div>{#if $player.playing}Stop{:else}Play{/if}</div>
        <div>Settings</div>
      </div>
    </Dashboard>
</OnyxApp>
<AudioPlayer />
<style>
  .footer {
    display: flex;
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
    flex-shrink: 0;
  }
  .footer > div {
    flex: 1;
  }
  .footer > div:first-child {
    text-align: left;
  }
  .footer > div:last-child {
    text-align: right;
  }
</style>
