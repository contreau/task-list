<script>
  import List from "./lib/List.svelte";
  import TaskInput from "./lib/Input.svelte";
  import Header from "./lib/Header.svelte";
</script>

<main>
  <div class="col">
    <Header />
    <div class="container">
      <TaskInput />
    </div>
  </div>
  <div class="container">
    <List />
  </div>
</main>

<style>
</style>
