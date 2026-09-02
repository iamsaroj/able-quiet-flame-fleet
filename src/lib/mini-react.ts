/** Tiny React-like runtime injected into the lesson iframe. Enough for function
 *  components, props, useState, and useEffect — which is all 6 React lessons use. */
export const MINI_REACT_SRC = `
window.MiniReact = (function () {
  const Fragment = Symbol.for("kiln.fragment");
  let hookCursor = 0;
  const hooks = [];
  const pendingEffects = [];
  let host = null;
  let tree = null;
  let scheduled = false;

  function flatten(list) {
    const out = [];
    for (const item of list) {
      if (item == null || item === false || item === true) continue;
      if (Array.isArray(item)) out.push.apply(out, flatten(item));
      else out.push(item);
    }
    return out;
  }

  function createElement(type, props) {
    const rest = [].slice.call(arguments, 2);
    const merged = Object.assign({}, props || {});
    const fromProps = merged.children != null ? [].concat(merged.children) : [];
    merged.children = flatten(fromProps.concat(rest));
    return { type: type, props: merged };
  }

  function useState(init) {
    const i = hookCursor++;
    if (hooks[i] === undefined) {
      hooks[i] = typeof init === "function" ? init() : init;
    }
    const set = function (v) {
      const cur = hooks[i];
      const next = typeof v === "function" ? v(cur) : v;
      if (Object.is(next, cur)) return;
      hooks[i] = next;
      schedule();
    };
    return [hooks[i], set];
  }

  function useEffect(fn, deps) {
    const i = hookCursor++;
    const prev = hooks[i];
    var changed = !prev;
    if (prev && deps && prev.deps) {
      changed = deps.length !== prev.deps.length;
      if (!changed) {
        for (var d = 0; d < deps.length; d++) {
          if (!Object.is(deps[d], prev.deps[d])) changed = true;
        }
      }
    } else if (prev && !deps) {
      changed = true;
    }
    hooks[i] = { deps: deps, fn: fn, cleanup: prev && prev.cleanup };
    if (changed) pendingEffects.push(i);
  }

  function eventName(key) {
    return key.slice(2).toLowerCase();
  }

  function applyProps(el, props) {
    for (const key in props) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
      if (key === "children") continue;
      const val = props[key];
      if (key === "className") {
        el.setAttribute("class", val == null ? "" : String(val));
        continue;
      }
      if (key === "htmlFor") {
        el.setAttribute("for", val == null ? "" : String(val));
        continue;
      }
      if (key === "style" && val && typeof val === "object") {
        for (const s in val) {
          if (Object.prototype.hasOwnProperty.call(val, s)) el.style[s] = val[s];
        }
        continue;
      }
      if (key.indexOf("on") === 0 && typeof val === "function") {
        el.addEventListener(eventName(key), val);
        continue;
      }
      if (key === "value" && "value" in el) {
        el.value = val == null ? "" : val;
        continue;
      }
      if (key === "checked") {
        el.checked = !!val;
        continue;
      }
      if (key === "disabled") {
        el.disabled = !!val;
        continue;
      }
      if (val === false || val == null) continue;
      if (val === true) {
        el.setAttribute(key, "");
        continue;
      }
      el.setAttribute(key, String(val));
    }
  }

  function createNode(vnode) {
    if (vnode == null || vnode === false) return document.createComment("");
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(String(vnode));
    }
    if (vnode.type === Fragment) {
      const frag = document.createDocumentFragment();
      const ch = vnode.props.children || [];
      for (var i = 0; i < ch.length; i++) frag.appendChild(createNode(ch[i]));
      return frag;
    }
    if (typeof vnode.type === "function") {
      const rendered = vnode.type(vnode.props);
      return createNode(rendered);
    }
    const el = document.createElement(vnode.type);
    applyProps(el, vnode.props);
    const ch = vnode.props.children || [];
    for (var c = 0; c < ch.length; c++) el.appendChild(createNode(ch[c]));
    return el;
  }

  function flushEffects() {
    for (var i = 0; i < pendingEffects.length; i++) {
      const idx = pendingEffects[i];
      const h = hooks[idx];
      if (!h) continue;
      if (typeof h.cleanup === "function") {
        try { h.cleanup(); } catch (e) {}
      }
      const cl = h.fn();
      if (typeof cl === "function") h.cleanup = cl;
    }
    pendingEffects.length = 0;
  }

  function commit() {
    if (!host || tree == null) return;
    hookCursor = 0;
    pendingEffects.length = 0;
    const node = createNode(tree);
    host.innerHTML = "";
    host.appendChild(node);
    queueMicrotask(flushEffects);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(function () {
      scheduled = false;
      commit();
    });
  }

  const MiniReactDOM = {
    createRoot: function (container) {
      host = container;
      window.__kilnRendered = true;
      return {
        render: function (vnode) {
          tree = vnode;
          commit();
        },
      };
    },
  };

  return {
    createElement: createElement,
    Fragment: Fragment,
    useState: useState,
    useEffect: useEffect,
    MiniReactDOM: MiniReactDOM,
  };
})();
window.React = window.MiniReact;
window.ReactDOM = window.MiniReact.MiniReactDOM;
window.useState = window.MiniReact.useState;
window.useEffect = window.MiniReact.useEffect;
window.MiniReactDOM = window.MiniReact.MiniReactDOM;
`;
