<script>
  import { taskList, completedTasks, completedTaskView } from "./stores.js";

  let allFieldsFull = false;
  let dayInput;
  let hourInput;
  let minuteInput;
  let fieldWarning;

  let textArea;
  const pushTask = function () {
    if (!allFieldsFull) {
      // warning message appears if input fields are not all full
      fieldWarning.style.opacity = 1;
      textArea.focus();
    }
    if (
      textArea.value != "" &&
      hourInput.value != "" &&
      minuteInput.value != ""
    ) {
      allFieldsFull = true;
      fieldWarning.style.opacity = 0;
      $taskList = [
        ...$taskList,
        {
          taskText: textArea.value,
          day: dayInput.value,
          hour: hourInput.value,
          minute: minuteInput.value,
        },
      ];
      textArea.value = "";
      hourInput.value = "";
      minuteInput.value = "";
      textArea.focus();
      allFieldsFull = false;
    }
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

  const restrictChars = function () {
    this.value = this.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
  };
</script>

<div class="input-container">
  <textarea
    bind:this={textArea}
    class="textArea"
    placeholder="Build something with Svelte."
  />
  <div class="setDateTime buttons">
    <select bind:this={dayInput} name="days" id="daySelect">
      <option value="Today">Today</option>
      <option value="Sunday">Sunday</option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
    </select>
    <input
      on:input={restrictChars}
      bind:this={hourInput}
      class="hourInput"
      placeholder="0 - 23"
      maxlength="2"
      type="text"
      pattern="/^([0-1]?[0-9]|2[0-3])$/"
      style="text-align: center"
    />:
    <input
      on:input={restrictChars}
      bind:this={minuteInput}
      class="minuteInput"
      type="text"
      maxlength="2"
      placeholder="00 - 59"
    />
    <!-- <select name="am-pm" id="am-pm-select">
      <option value="am">a.m.</option>
      <option value="pm">p.m.</option>
    </select> -->
    <p bind:this={fieldWarning} class="missing-attribute-msg">
      Fill all fields.
    </p>
  </div>
  <div class="buttons">
    <button on:click={pushTask}>
      <span class="buttonOption--span"
        ><i
          class="fa-solid fa-circle-plus"
          style="font-size: 1.5rem; color: var(--orange);"
        />Add Task
      </span>
    </button>
    <button class="showCompletedTasks--button" on:click={showCompletedTasks}>
      {#if !$completedTaskView}
        <span class="buttonOption--span">
          <i
            class="fa-regular fa-eye"
            style="color: var(--orange); font-size: 1.34rem;"
          />Show Completed Tasks
        </span>
      {:else}
        <span class="buttonOption--span"
          ><i
            class="fa-regular fa-eye"
            style="color: var(--green); font-size: 1.34rem;"
          />
          Show Current Tasks
        </span>
      {/if}
    </button>
    <button class="clearTasks" on:click={clearAll}
      ><span class="buttonOption--span"
        ><img class="flame" src="/flame.gif" alt="flame" />Clear Tasks</span
      ></button
    >
  </div>
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .showCompletedTasks--button {
    min-width: 15.875rem;
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

  .buttonOption--span {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 0.6em;
  }

  .buttons {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .setDateTime {
    font-size: 1rem;
  }

  .missing-attribute-msg {
    font-size: 1rem;
    max-width: 250px;
    width: 100%;
    background-color: red;
    color: #fff;
    border-radius: 30px;
    padding: 0.2em 0.5em;
    transition: opacity 0.4s;
    opacity: 0;
  }
</style>
