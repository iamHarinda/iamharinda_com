/* WebGL background — reactbits "ColorBends": slow diagonal bands of one colour
   flowing over near-black, faded toward the top. No library. Falls back to the
   CSS gradient on #bg when WebGL is unavailable, and renders one still frame
   when the viewer prefers reduced motion. ~2 KB gzipped.

   Params mirror the reactbits <ColorBends> props — edit here: */
const CB = {
  color: "#A855F7", // base colour
  speed: 0.1,
  frequency: 1.2,
  noise: 0.06,
  bandWidth: 0.4,
  rotation: 45, // degrees
  fadeTop: 0.95,
  iterations: 2,
  intensity: 1.1,
};

const canvas = document.getElementById("bg");
if (canvas) init(canvas);

function hexToVec3(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function init(cv) {
  const gl =
    cv.getContext("webgl", { antialias: false, alpha: false, depth: false }) ||
    cv.getContext("experimental-webgl");

  if (!gl) {
    document.documentElement.classList.add("no-webgl");
    return; // CSS gradient on #bg stays visible
  }

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = matchMedia("(max-width: 44rem)").matches;

  const vert = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

  const frag = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;

  float grain(vec2 p){
    float G = 2.71828182845904523536;
    vec2 r = G * sin(G * p);
    return fract(r.x * r.y * (1.0 + p.x));
  }
  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    vec2 p = uv;
    p.x *= aspect;

    float rnd = grain(gl_FragCoord.xy);
    vec2 tex = rot(0.38) * p * 2.3;
    float t = 0.26 * u_time;

    tex.y += 0.03 * sin(8.0 * tex.x - t);

    // silk fold pattern (reactbits Silk, adapted) — 0.2 .. 1.0
    float pattern = 0.6 + 0.4 * sin(
      5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * t)
      + sin(20.0 * (tex.x + tex.y - 0.1 * t))
    );

    // deep emerald in the shadows -> bright mint in the folds
    vec3 deep = vec3(0.040, 0.150, 0.105);
    vec3 lit  = vec3(0.200, 0.720, 0.460);
    vec3 col = mix(deep, lit, pattern);

    float vert = smoothstep(1.25, -0.20, uv.y);
    col = mix(deep * 0.7, col, 0.5 + 0.5 * vert);

    float vig = smoothstep(1.42, 0.28, length((uv - 0.5) * vec2(1.08, 1.0)));
    col *= 0.72 + 0.28 * vig;

    col -= rnd / 20.0;
    gl_FragColor = vec4(col, 1.0);
  }`;

  const prog = gl.createProgram();
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vert],
    [gl.FRAGMENT_SHADER, frag],
  ]) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      document.documentElement.classList.add("no-webgl");
      return;
    }
    gl.attachShader(prog, sh);
  }
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");

  const scale = mobile ? 0.6 : 0.9;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
    const w = Math.max(1, Math.floor(cv.clientWidth * dpr * scale));
    const h = Math.max(1, Math.floor(cv.clientHeight * dpr * scale));
    if (cv.width !== w || cv.height !== h) {
      cv.width = w;
      cv.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  const start = performance.now();
  let raf = 0;
  function frame(now) {
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }

  if (reduce) {
    gl.uniform1f(uTime, 8);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  } else {
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(frame);
      }
    });
  }
}
