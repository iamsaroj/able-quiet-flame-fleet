import{a as e,c as t,o as n,t as r}from"./button-CbhpYngW.js";import{t as i}from"./sandbox-editor-CyNPlnSR.js";var a=t(n()),o=e(),s={html:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Playground</title>
  </head>
  <body>
    <h1>Blank clay.</h1>
    <p>Build anything. This bench is not graded.</p>
  </body>
</html>`,css:`*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  padding: 2rem;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}`,js:`// document.querySelector("h1").textContent = "Open";`},c={html:`function App() {
  const [n, setN] = useState(0);
  return (
    <main>
      <h1>Studio</h1>
      <p>{n} shots</p>
      <button onClick={() => setN(n + 1)}>Take one</button>
    </main>
  );
}`,css:`body { margin: 0; font-family: Georgia, serif; background: #111210; color: #e9e6de; }
main { padding: 2rem; }
button { font: inherit; padding: 8px 12px; }`,js:``};function l(){let[e,t]=(0,a.useState)(`web`),[n,l]=(0,a.useState)(s),[u,d]=(0,a.useState)(c),f=e===`web`?n:u,p=e===`web`?l:d;return(0,o.jsxs)(`main`,{className:`mx-auto flex max-w-[1400px] flex-col lg:h-[calc(100dvh-4rem)]`,children:[(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6`,children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h1`,{className:`font-serif text-3xl tracking-tight`,children:`Playground`}),(0,o.jsx)(`p`,{className:`text-sm text-muted`,children:`No brief. No checks. Same bench as the lessons.`})]}),(0,o.jsx)(`div`,{className:`ml-auto flex gap-2`,children:[`web`,`react`].map(n=>(0,o.jsx)(r,{size:`sm`,variant:e===n?`default`:`outline`,onClick:()=>t(n),children:n===`web`?`HTML / CSS / JS`:`React`},n))})]}),(0,o.jsx)(i,{files:f,onChange:p,mode:e,className:`min-h-[32rem] flex-1 rounded-none lg:rounded-lg lg:mx-6 lg:mb-6`})]})}export{l as component};