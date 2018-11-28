import { execute } from './Randomizer/index.js';

addEventListener("message", e => {
  const d = e.data;
  if (d.type === "execute") {
    const hooks = d.content.hooks || {};
    if (hooks.message === undefined) hooks.message = text => {
      postMessage({ type: "info", content: text });
      console.log(text);
    };
    if (hooks.error === undefined) hooks.error = text => {
      postMessage({ type: "error", content: `ERROR: ${text}` });
      console.error(text);
    };

    const result = execute(d.content.romfile, d.content.specs, hooks);
    postMessage({ type: "complete", content: result });
  }
});