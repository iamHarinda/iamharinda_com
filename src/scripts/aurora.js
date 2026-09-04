/* WebGL aurora background — a slow colour grade in motion (teal / violet /
   amber over near-black). No library. Falls back to the CSS gradient on #bg
   when WebGL is unavailable, and renders a single still frame when the viewer
   prefers reduced motion. ~2 KB minified + gzipped. */

const canvas = document.getElementById("bg");
if (canvas) init(canvas);

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

  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p);
    vec2 u=f*f*(3.-2.*f);
    return mix(mix(h(i),h(i+vec2(1,0)),u.x),
               mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.,a=.5;
    mat2 m=mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<4;i++){v+=a*noise(p);p=m*p;a*=.5;}
    return v;
  }
  void main(){
    vec2 uv=gl_FragCoord.xy/u_res;
    vec2 p=uv; p.x*=u_res.x/u_res.y;
    float t=u_time*0.028;

    float f1=fbm(p*1.5+vec2(t,t*0.55));
    float f2=fbm(p*2.3-vec2(t*0.8,t*0.3)+f1);
    float f3=fbm(p*3.1+vec2(-t*0.5,t*0.85)+f2*0.6);

    vec3 bg=vec3(0.035,0.035,0.043);
    vec3 teal=vec3(0.149,0.831,0.753);
    vec3 violet=vec3(0.635,0.455,1.0);
    vec3 amber=vec3(1.0,0.616,0.302);

    vec3 col=bg;
    col=mix(col,teal,smoothstep(0.35,0.92,f1)*0.5);
    col=mix(col,violet,smoothstep(0.42,0.96,f2)*0.5);
    col=mix(col,amber,smoothstep(0.55,1.0,f3)*0.32);

    float vert=smoothstep(1.15,-0.15,uv.y);
    col=mix(bg,col,0.26+0.5*vert);

    float vig=smoothstep(1.3,0.32,length((uv-0.5)*vec2(1.1,1.0)));
    col*=0.55+0.45*vig;

    col+=(h(gl_FragCoord.xy)-0.5)*0.02;
    gl_FragColor=vec4(col,1.0);
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
