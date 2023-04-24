<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };

  let msg = "howdy";
  const changeMsg = () => {
    if (msg != "partner") msg = "partner";
    else msg = "howdy";
  };

  $: doubled = count * 2;
</script>

<button on:click={increment}>
  count is {count}
</button>
<p>count 2 is {doubled}</p>
<h2 on:mouseover={changeMsg} on:focus={changeMsg}>{msg}</h2>
