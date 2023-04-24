<script>
  import { taskList, completedTasks, completedTaskView } from "./stores.js";

  let textArea;
  const pushTask = function () {
    if (textArea.value != "") $taskList = [...$taskList, textArea.value];
    textArea.value = "";
  };

  const clearAll = function () {
    if ($taskList.length >= 1) {
      $taskList.map((task) => {
        $completedTasks.push(task);
      });
      $taskList = [];
    }
  };

  const showCompletedTasks = () => {
    if (!$completedTaskView) $completedTaskView = true;
    else $completedTaskView = false;
  };
</script>

<div class="input-container">
  <textarea
    bind:this={textArea}
    class="textArea"
    placeholder="Build something with Svelte."
  />
  <button on:click={pushTask}>
    <span class="showTasks--span"
      ><i
        class="fa-solid fa-circle-plus"
        style="font-size: 1.5rem; color: var(--orange);"
      />Add Task
    </span>
  </button>
  <button on:click={showCompletedTasks}>
    {#if !$completedTaskView}
      <span class="showTasks--span">
        <i
          class="fa-regular fa-eye"
          style="color: var(--orange); font-size: 1.34rem;"
        />Show Completed Tasks
      </span>
    {:else}
      <span class="showTasks--span"
        ><i
          class="fa-regular fa-eye"
          style="color: var(--green); font-size: 1.5rem;"
        />
        Show Current Tasks
      </span>
    {/if}
  </button>
  <button class="clearTasks" on:click={clearAll}
    ><span class="showTasks--span"
      ><img class="flame" src="../../public/flame.gif" alt="flame" />Clear Tasks</span
    ></button
  >
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  textarea {
    font-size: 1.2rem;
    text-align: left;
    resize: none;
    outline: transparent;
    padding: 0 0.5em;
  }

  .clearTasks {
    padding: 0.2em 1.2em;
  }

  .flame {
    display: inline;
    height: auto;
    max-width: 25px;
    transform: translateY(-0.3em);
  }

  .showTasks--span {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 0.6em;
  }
</style>
