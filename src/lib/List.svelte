<script>
  import {
    taskList,
    completedTasks,
    completedTaskView,
    getDateTime,
  } from "./stores.js";
  import { fade } from "svelte/transition";

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

  let filterAll = true;
  let filterWork = false;
  let filterHome = false;
  let filterPersonal = false;

  let workList = [];
  let homeList = [];
  let personalList = [];

  const selectFilter = (filterType) => {
    [filterAll, filterWork, filterHome, filterPersonal] = [
      false,
      false,
      false,
      false,
    ];
    switch (filterType) {
      case "all":
        filterAll = true;
        break;
      case "work":
        filterAll = false;
        filterWork = true;
        workList = $taskList.filter((task) => task.category === "Work");
        break;
      case "home":
        filterAll = false;
        filterHome = true;
        homeList = $taskList.filter((task) => task.category === "Home");
        break;
      case "personal":
        filterAll = false;
        filterPersonal = true;
        personalList = $taskList.filter((task) => task.category === "Personal");
        break;
    }
    console.log(filterAll, filterWork, filterHome, filterPersonal);
  };
</script>

<div class="taskList">
  {#if !$completedTaskView}
    <p class="taskList--title">Your Tasks</p>
    <hr style="color: var(--orange);" />

    <div class="filterOptions">
      <button
        on:click={() => {
          selectFilter("all");
        }}
        class="filter-btn">All</button
      >
      <button
        on:click={() => {
          selectFilter("work");
        }}
        class="filter-btn">Work</button
      >
      <button
        on:click={() => {
          selectFilter("home");
        }}
        class="filter-btn">Home</button
      >
      <button
        on:click={() => {
          selectFilter("personal");
        }}
        class="filter-btn">Personal</button
      >
    </div>
  {:else}
    <p class="taskList--title">Completed Tasks</p>
    <hr style="color: var(--green);" />
  {/if}

  <!-- Standard Task List -->
  {#if !$completedTaskView}
    <div>
      <!-- DEFAULT TASK FILTER -->
      {#if filterAll}
        {#if $taskList.length === 0}
          <p in:fade style="color: #fff; margin-top: 2rem; font-size: 1.3rem">
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
      {/if}

      <!-- WORK TASK FILTER -->
      {#if filterWork}
        {#if workList.length === 0}
          <p in:fade style="color: #fff; margin-top: 2rem; font-size: 1.3rem">
            No work to do!<br />Maybe go use the bathroom.
          </p>
        {/if}
        <ul class="taskList--list liveList">
          {#each workList as task}
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
      {/if}

      <!-- HOME TASK FILTER -->
      {#if filterHome}
        {#if homeList.length === 0}
          <p in:fade style="color: #fff; margin-top: 2rem; font-size: 1.3rem">
            All good on the homestead.
          </p>
        {/if}
        <ul class="taskList--list liveList">
          {#each homeList as task}
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
      {/if}

      <!-- PERSONAL TASK FILTER -->
      {#if filterPersonal}
        {#if personalList.length === 0}
          <p in:fade style="color: #fff; margin-top: 2rem; font-size: 1.3rem">
            This time, it's personal.<br />(this joke only works if you have
            tasks)
          </p>
        {/if}
        <ul class="taskList--list liveList">
          {#each personalList as task}
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
      {/if}
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
              >Completed <i class="fa-solid fa-check" />
            </span>
            <span class="task-label category-stamp">
              <i
                style="margin-right: 0.2rem;"
                class="fa-solid {categoryIcons[task.category]}"
              />
              {task.category}
            </span>
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
