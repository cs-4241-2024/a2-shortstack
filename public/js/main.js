/**
 * Formats a log message to include message source.
 * 
 * @param {string} src Message source.
 * @param {string} message Base log message.
 * @returns Formatted log message.
 */
const formatLog = function(src, message)
{
  return `[${src.toUpperCase()}] → ${message}`;
}

/**
 * Handler for user input submission.
 * 
 * @param {*} event Event object.
 */
const submit = async function(event)
{
  // Prevent browser from loading a new page
  event.preventDefault();
  
  const input = document.querySelector("#yourname");
  const json  = {yourname: input.value};
  const body  = JSON.stringify(json);

  const response = await fetch("/submit", {method:'POST', body});
  const text     = await response.text();

  console.log(formatLog("SUBMIT", `User input: ${text}`));
}

/**
 * Set button click action to submit function.
 */
window.onload = function()
{
  const button = document.querySelector("button");
  button.onclick = submit;
}