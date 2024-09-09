// TODO FIXME
function seamlessReload() {
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  window.location = window.location.href;
}
