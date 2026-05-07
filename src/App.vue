<script setup>
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { ref } from 'vue';

  const is_tauri = '__TAURI_INTERNALS__' in window;
  const window_title = ref('Web Manager')
  const quit_dialog = ref(null)
  
  let app_window = null;
  
  if(is_tauri)
  {
    app_window = getCurrentWindow(); 
  }

  const handle_close = async () => 
  {
    try 
    {
      await app_window.close();
    } 
    catch (error) 
    {
      alert(error);
      console.error(error);
    }
  }

  const handle_minimalize = async () => 
  {
    try 
    {
      await app_window.minimize();
    } 
    catch (error) 
    {
      alert(error);
      console.error(error);
    }
  }

  const handle_fullscreen = async () => 
  {
    try 
    {
      await app_window.toggleMaximize()
    } 
    catch (error) 
    {
      alert(error);
      console.error(error);
    }
  }

  const handle_resize = async (direction) => 
  {
    if (is_tauri) 
    {
      try 
      {
        await getCurrentWindow().startResizeDragging(direction);
      } 
      catch (e) 
      {
        console.error(e);
      }
    }
  }

  const handle_dblclick_drag_title = async (e) => 
  {
    if (is_tauri) 
    {
      if (e.target.tagName === 'ONYKS-WINDOW-BUTTON') return;

      if (e.detail === 2) 
      {
        await app_window.toggleMaximize(); 
      } 
      else if (e.detail === 1) 
      {
        await app_window.startDragging();
      }
    }
  }
</script>

<template>
  <div class="resize-edge top" @mousedown="handle_resize('North')"></div>
  <div class="resize-edge bottom" @mousedown="handle_resize('South')"></div>
  <div class="resize-edge left" @mousedown="handle_resize('West')"></div>
  <div class="resize-edge right" @mousedown="handle_resize('East')"></div>

  <div class="resize-corner top-left" @mousedown="handle_resize('NorthWest')"></div>
  <div class="resize-corner top-right" @mousedown="handle_resize('NorthEast')"></div>
  <div class="resize-corner bottom-left" @mousedown="handle_resize('SouthWest')"></div>
  <div class="resize-corner bottom-right" @mousedown="handle_resize('SouthEast')"></div>

  <main>
    <onyks-window-bar :text="window_title" @mousedown="handle_dblclick_drag_title">
      <onyks-window-button type="minimalize" size="l" @click="handle_minimalize"></onyks-window-button>
      <onyks-window-button type="fullscreen" size="l" @click="handle_fullscreen"></onyks-window-button>
      <onyks-window-button type="close" size="l" @click="quit_dialog.opened = true"></onyks-window-button>
    </onyks-window-bar>
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
  <onyks-dialog  id="quit_dialog" ref="quit_dialog" modal title="Quit">
    <p>Are you sure you want to quit?</p>
    <onyks-button slot="footer" background="green" @click="handle_close">Yes</onyks-button>
    <onyks-button slot="footer" background="red" onclick="quit_dialog.opened = false">No</onyks-button>
  </onyks-dialog>
</template>

<style>
  main
  {
    background-color: var(--surface-base);
    height: 100vh;
    width: 100vw;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
  }

  .content
  {
    height: 100%;
    width: 100%;
    /* overflow-y: auto; */
    overflow-y: hidden;
  }

  .resize-edge, .resize-corner 
  {
    position: absolute;
    z-index: 9999;
    /* background-color: rgba(255, 0, 0, 0.4);  */
  }

  .resize-edge.top 
  {
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    cursor: n-resize;
  }
  
  .resize-edge.bottom 
  {
    bottom: 0;
    left: 0;
    right: 0;
    height: 6px;
    cursor: s-resize;
  }
  
  .resize-edge.left 
  {
    top: 0;
    left: 0;
    bottom: 0;
    width: 6px;
    cursor: w-resize;
  }
  
  .resize-edge.right 
  {
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    cursor: e-resize;
  }

  .resize-corner 
  {
    width: 14px;
    height: 14px;
    z-index: 10000;
  }

  .resize-corner.top-left 
  {
    top: 0;
    left: 0;
    cursor: nw-resize;
  }

  .resize-corner.top-right 
  {
    top: 0;
    right: 0;
    cursor: ne-resize;
  }

  .resize-corner.bottom-left 
  {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
  }

  .resize-corner.bottom-right 
  {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }

  a
  {
    text-decoration: none;
  }

  .fade-enter-active, .fade-leave-active
  {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from, .fade-leave-to 
  {
    opacity: 0;
  }

  onyks-dialog > onyks-button
  {
    width: 125px;
  }
</style>