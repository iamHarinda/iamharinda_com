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
  intensity: 0.88, // a touch dimmer than the reactbits default (1.1)
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

  const c = hexToVec3(CB.color);
  const vert = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

  const frag = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;

  #define SPEED     ${CB.speed.toFixed(3)}
  #define FREQ      ${CB.frequency.toFixed(3)}
  #define NOISE     ${CB.noise.toFixed(3)}
  #define BANDW     ${CB.bandWidth.toFixed(3)}
  #define ROT       ${CB.rotation.toFixed(3)}
  #define FADE_TOP  ${CB.fadeTop.toFixed(3)}
  #define ITER      ${Math.max(1, Math.round(CB.iterations))}
  #define INTENSITY ${CB.intensity.toFixed(3)}
  const vec3 COLOR = vec3(${c[0].toFixed(4)}, ${c[1].toFixed(4)}, ${c[2].toFixed(4)});
  const vec3 FLOORC = vec3(0.014, 0.013, 0.024);

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    p = rot(radians(ROT)) * p;

    float t = u_time * SPEED;

    // domain warp — the "bends"
    vec2 q = p * FREQ * 2.0;
    float w = 0.0, amp = 0.62;
    for (int k = 0; k < 6; k++) {
      if (k >= ITER) break;
      w += amp * (vnoise(q + vec2(t * 0.9, -t * 0.5)) - 0.5);
      q = q * 2.03 + w;
      amp *= 0.6;
    }

    float wave = p.y * 3.0 + w * 3.6 + t * 2.0;
    float bands = 0.5 + 0.5 * sin(wave / max(BANDW, 0.05));

    float lum = pow(clamp(bands, 0.0, 1.0), 1.25) * INTENSITY;
    vec3 col = mix(FLOORC, COLOR, clamp(lum, 0.0, 1.0));
    col += COLOR * smoothstep(0.78, 1.0, bands) * 0.35 * INTENSITY;

    // fade toward the top of the viewport
    col *= mix(1.0 - FADE_TOP * 0.88, 1.0, smoothstep(1.0, 0.12, uv.y));

    col -= (hash(gl_FragCoord.xy) - 0.5) * NOISE;
    gl_FragColor = vec4(max(col, 0.0), 1.0);
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
