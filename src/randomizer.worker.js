import { execute } from './Randomizer/index.js';

const selfRef = self; // eslint-disable-line

selfRef.addEventListener("message", e => {
  const d = e.data;
  if (d.type === "execute") {
    const hooks = d.content.hooks || {};
    if (hooks.message === undefined) hooks.message = text => {
      selfRef.postMessage({ type: "info", content: text });
      console.log(text);
    };
    if (hooks.error === undefined) hooks.error = text => {
      selfRef.postMessage({ type: "error", content: `ERROR: ${text}` });
      console.error(text);
    };
    if (hooks.download === undefined) hooks.download = content => {
      selfRef.postMessage({ type: "download", content: content });
    };

    execute(d.content.romfile, d.content.specs, hooks).then(result => {
      selfRef.postMessage({ type: "complete", content: result });
    });
  }
});