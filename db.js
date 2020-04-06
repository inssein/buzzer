let openDoor = false;
let entries = [];
let lockTimer;

exports.shouldOpenDoor = () => {
  return new Promise(accept => accept(openDoor));
};

exports.allowDoor = () => {
  clearLockTimer();

  return new Promise(accept => {
    openDoor = true;

    // start timer to disallow door in 5 minutes
    lockTimer = setTimeout(() => {
      this.disallowDoor();
    }, 1000 * 60 * 5);

    accept();
  });
};

exports.disallowDoor = () => {
  clearLockTimer();

  return new Promise(accept => {
    openDoor = false;

    accept();
  });
};

exports.recordAllowedEntry = () => {
  entries.push({ action: "ALLOWED", time: Date.now() });
};

exports.recordDisallowedEntry = () => {
  entries.push({ action: "DISALLOWED", time: Date.now() });
};

exports.getEntries = () => {
  return new Promise(accept => accept(entries));
};

function clearLockTimer() {
  if (lockTimer) {
    clearTimeout(lockTimer);
    lockTimer = null;
  }
}
