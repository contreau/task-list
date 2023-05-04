<script>
  import {
    taskList,
    completedTasks,
    completedTaskView,
    getDateTime,
  } from "./stores.js";

  const removeTask = function (task) {
    let removed = $taskList.splice($taskList.indexOf(task), 1);
    removed = removed[0];
    $completedTasks.push(removed);
    $taskList = $taskList;
  };

  const categoryIcons = {
    Work: "fa-briefcase",
    Home: "fa-house",
    Personal: "fa-hand-holding-hand",
  };
</script>

<div class="taskList">
  {#if !$completedTaskView}
    <p class="taskList--title">Your Tasks</p>
    <hr style="color: var(--orange);" />

    <div class="filterOptions">
      <button class="filter-btn">All</button>
      <button class="filter-btn">Work</button>
      <button class="filter-btn">Home</button>
      <button class="filter-btn">Personal</button>
    </div>
  {:else}
    <p class="taskList--title">Completed Tasks</p>
    <hr style="color: var(--green);" />
  {/if}

  <!-- Standard Task List -->
  {#if !$completedTaskView}
    <div>
      {#if $taskList.length === 0}
        <p style="color: #fff; margin-top: 2rem; font-size: 1.3rem">
          Let's get to work ✍️
        </p>
      {/if}
      <ul class="taskList--list liveList">
        {#each $taskList as task}
          <div class="task-item--wrap">
            <li
              on:click={() => {
                removeTask(task);
              }}
              on:keypress={() => {
                removeTask(task);
              }}
            >
              {task.taskText}
              <br /><span class="task-label due-stamp"
                >Due {task.day} at {task.hour}:{task.minute}</span
              >
              <span class="task-label category-stamp"
                ><i
                  style="margin-right: 0.2rem;"
                  class="fa-solid {categoryIcons[task.category]}"
                />
                {task.category}</span
              >
            </li>
            <hr class="taskitem--borderBottom" />
          </div>
        {/each}
      </ul>
    </div>
  {:else}
    <!-- Completed Task List -->
    {#if $completedTasks.length === 0}
      <div class="empty-list--container">
        <img class="empty-list-flame" src="/empty-list-flame.png" alt="flame" />
        <p>Nothing to see here... yet.</p>
      </div>
    {/if}

    <!-- TODO: fix completed timestamp, currently is modifying pre-existing completed stamps -->
    <ul class="taskList--list completedList">
      {#each $completedTasks as task}
        <div class="completed-item--wrap">
          <li>
            {task.taskText}<br /><span class="task-label completed-stamp"
              >Completed {new getDateTime().dateString}</span
            >
          </li>
          <hr class="taskitem--borderBottom" />
        </div>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .taskList {
    color: var(--orange);
    min-height: 40rem;
  }

  hr {
    border: solid 0.5px;
    border-radius: 5px;
  }

  .taskList--title {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0 0 1rem 0;
    color: #fff;
  }

  .taskList--list {
    color: #fff;
    font-size: 1.3rem;
    margin: 0;
    min-width: 500px;
    text-align: left;
    list-style: none;
    padding-left: 0;
    max-height: 36rem;
    overflow-y: auto;
  }

  .task-item--wrap,
  .completed-item--wrap {
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
  }

  .liveList li {
    cursor: pointer;
    transition: 0.4s all;

    /* border: solid 1px #ffffff51; */
  }

  .liveList li:hover {
    background-color: var(--orange);
    /* border: solid 1px transparent; */
  }

  /* .completedList li {
    background-color: var(--green);
  } */

  li {
    padding: 0.2em 0.4em;
    border-radius: 10px;
    margin-top: 0.8rem;
    position: relative;

    /* border: solid 1px #ffffff51; */
  }

  .task-label {
    font-size: 0.9rem;
    border-radius: 30px;
    padding: 0.3em 0.6em;
    transition: 0.4s all;
  }

  /* .time-stamp {
    background-color: var(--orange);
  } */

  .due-stamp {
    background-color: var(--darkorange);
  }

  .category-stamp {
    background-color: #0042d2;
  }

  .completed-stamp {
    background-color: var(--green);
  }

  .liveList li:hover .task-label {
    background-color: #242424;
  }

  .taskitem--borderBottom {
    margin-left: 0.5rem;
  }

  .filterOptions {
    margin-top: 1rem;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.7rem;
  }

  .filterOptions button {
    padding: 0.3em 0.5em;
  }

  .empty-list--container {
    opacity: 0;
    color: #fff;
    margin: 42% 0;
    font-size: 1.3rem;
    animation: fadeIn 0.5s ease-in forwards;
  }

  .empty-list--container p {
    margin: 0.8rem 0 0 0;
    border-top: solid 2px var(--orange);
    display: inline-block;
  }

  .empty-list-flame {
    margin: 0 auto;
    display: block;
    height: auto;
    max-width: 45px;
  }

  @keyframes fadeIn {
    100% {
      opacity: 1;
    }
  }
</style>
