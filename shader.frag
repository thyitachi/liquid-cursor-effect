
precision mediump float;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 st = vUv * 2.0 - 1.0;
  float d = distance(st, uMouse);
  float alpha = smoothstep(0.2, 0.0, d);
  vec3 color = mix(vec3(0.1, 0.5, 0.6), vec3(0.2, 0.7, 1.0), alpha);
  gl_FragColor = vec4(color, alpha * 0.5);
}
