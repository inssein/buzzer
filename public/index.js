const lock = document.querySelector(".lock");
const data = document.querySelector("#data");

// render the page
render();

// every 30 seconds, re-render
setInterval(() => {
  render();
}, 1000 * 30);

function render() {
  renderLockStatus();
  renderEntries();
}

function renderLockStatus() {
  fetch("/api/allowed")
    .then(res => {
      if (res.status === 200) {
        lock.classList.remove("locked");
      }
    })
    .catch(() => {
      // do nothing, by default we show a locked lock
    });
}

function renderEntries() {
  fetch("/api/entries")
    .then(res => res.json())
    .then(entries => {
      if (entries.length === 0) {
        data.innerHTML = `<strong>No entries found to display</strong>`;
        return;
      }

      const rows = entries.map(it => {
        const date = new Date(it.time);
        return `<tr><td>${
          it.action
        }</td><td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td></tr>`;
      });

      const base = `
<table class="pure-table">
  <tr>
    <th>Action</th>
    <th>Time</th>
  </tr>
  ${rows}
</table>
`;
      data.innerHTML = base;
    })
    .catch(() => console.log("Could not fetch entries"));
}

lock.onclick = () => {
  const locked = lock.classList.contains("locked");

  if (locked) {
    fetch("/api/allow", { method: "POST" })
      .then(() => {
        lock.classList.remove("locked");
      })
      .catch(() => {
        alert("Could not unlock.");
      });
  } else {
    fetch("/api/disallow", { method: "POST" })
      .then(() => {
        lock.classList.add("locked");
      })
      .catch(() => {
        alert("Could not lock.");
      });
  }
};
