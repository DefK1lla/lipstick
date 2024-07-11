let _canvasVideo = null, _canvasAR = null;
let mode = null;
let selectedColor = null;

const sliderArrows = `
  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMJSURBVHgBvVatjlpBFD6sWRRUAAqSK1AgusWhliosFWBLH6Fv0L5BBQ7RlqBAdCUoqAEHbAIokiUBw48ADKCm882daWYvcy/skuyXnFwyM5zvnDPnZ3x0ARhjGf7JcbnnYnF5J7c2XAZcHrk8+Hy+Nl0DTlTk8sQuB85+9tLpcyGy+OcPlzu1djgcaLVaCTkej2Lt9vaWIpEIhUIh8vv9uoopl4/c4+lZQmnhD5JhWy6X1Ov1aD6fUyAQEAQgAkCMfewlEglKp9MUDAaVKoT7Cyd9cCXkZDnpmUC73abRaESpVEqIInJit9vRbDajbrdLyWRSEGsoctLfJ4QyjH14hvDV63VhbTabdSUyEcPI7XZL+XxehRmefjgJr54clUqFdTod9lrgv9Choa94biRZkex0F2GBZ46wvAjqLlutllq6e5a9yrvNZsPK5TLjIWHXgl8LK5VKbLFYqKUn4SGzi9pS3sE6ZKPbHTmB+zYB945EQ4ZLWOBCSJGZIsXH4zHFYjGjAmRrrVY7Wa9Wq2LPBBCiZDSjciB8j18o6Gg0avQOCuF9oVA42cMa9kyk8BL61uu1WroHoegmKGAUtReZyRiseZFCJ3RLWCAUHQUhddbbZDLxJLuEFDpVKwTXDXlAHeSXTeegzpxrEiDcGCwRUG0KXQfdww3Ywxmcjcfj5DRaM2IDwil+OWJ9MalOhrNOOHJjAMK/+BUOh0WdmepKJ3XCiwzGoCwwviQexTRXraDRaHj2UHQPJ7y60nA4FDo1ZAQtk62Nuy/a0X6/Z9fC0Cbt1iZd/a7CitA0m026FhhT0KWV07f/hHxW/SL7MUSZTEbcJWrqtcB/oUObOFM1hI0DGKmMvgnrYID2bPAEEg7RARkagSyHZwPY+cQo8s9P3VJ0DliKPutGDKJ+vy8mA8IIIzV80t81pkdUTpKKlqfCC2KQmh5ROIMpg+mAPJCAZ1/ldZEroSS1+Afj2lJrUI6JAgL9mQgC3QiJgfRsSi8Be6uHsIE4Q/agxuzEONOf+lOyu9VFT/1/GZ54JgT8JfIAAAAASUVORK5CYII=')
`;

const lipsIcon = `
  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR7SURBVHgBxVhbUuNGFL1X1vyFYHbgWUGcFWB+U5i0mQXA/KXAFGYFtldgqGGo/GFvINaMp/KLWAHOCsKsIJ58ZqS+ObctgR+yLKh53CphJLW7T9/HuafNzXrjHxIaUxFjquJvGddESCYsfP/4UsrEXH28pbDonD5Gjy8/BDurxrSMKUfWOxWRQxa5wKMQ48NV45u7poYPA0A/CUv/7ftgQDnW3G3c+PkDjIliPiWx3bcfgi4VsASgXnRUN4fw9M06MJkgdPex9dpiLV+Ohiu9tM6uRkEfH31spnNS3++9Gf1xljXOywKA3Q8B4B121aIvYJinI2Jv1SutmimvBaEAbEnO8uL+TCCBzhtt8HARyByIk739HiH5roKgWLU80dy8It14w2tngtAkErKfFDF9RVMPIzSsSb8EwiM+uHwfdOgbmMs15tM0LA6E8wLKiL6lISzRj9R6AKFeWEcqX9pcWLBuAoJrQPUXfQdjK4OEtp3lJuMcdRNVXK/xOPD/tRfnYTBxVM2sGZ/2jnFUkte/B8E95VuIq+3CkccJvxlT+RzzHVm79aIkP4NBOfKlgfuXnzf4TstamK81xni3pZclGZRivjnee3WQhyBZd+LldVD1gB/xkFkGmtHnQTDR57pD3GtDG1gRE5dkZ3YjStf6DD2nsw6I68bNurm5HC13UXWx7tABeGbpqhfVI8zcjzw7yApPZhfVcvWmWVtjB5Xb4Hx0UtIJbq2V/tWf2Yw6beOsJLSNhKtQPNUeCFUHYA6P6/thXLLdRTBLIDwheAATEPdflOxZGoIjY6qepW0k0fVxvVFmYqXgj1OcvMkkBvcAJ7eRT410IQ3pfzEZbAwtwVaywPNJvfH3m9HwJS240Y+9nv4fAcgicvc+oqq1NGU8jya+T2EKeM47e69QVbaF/HmdVQAIx50vU7k2Z8miDdUBGlMs6nLGt2jxwuOYbHddj5nRJLXYl52V5Qqe0BItJ5JsyVQHYAdOiGDnoFh5hyZ368qvblZqDZ1Py1pFkZ8DIF1Xc2IC3tSbcAUQt+PjXVNGvoy1/OCZ0I/pGo/P011HCA/iso28UAamVe5fMJOAkHHC4R16oiXJapB49x57v4LAlP67hQURxLCqclcdyuHqmqeqqUT8pOXapydY2rlxbDh0tI3MPk+4Pw/1NpLyVHWisigeVLP0YlGb7dwOhCstyDpVxFlf0JJEjFF+SFL0CPdJHMYbZOgZ1tzdb8/qlwdlpQmYyK5a5jeZJhqu9MLYT/QsACrr7NasfpljTISlo2r76BczmaVmP/IOkO5VDcXM8CoSehMhCbSdUwHTRCYcphbPMnNqW8Pil6Thlbg3K0QBoIUwNFwoHi+9r0Q/ULUIAPWwF3NP5198t3TuUCAJ0lpzb98lKxrZXCjwqJxqASpg7igBTlAAWdS+8iyq+iE9Sy6+E482qYCligvMeZFH87kH4vQs+QBGCGQkAVn6mLswmFOlIMI1WLX7WWP3+wQV/H2CHL1PTRUZP4YDjbDC02Y41RDF56z+D3Zfrq8bdpZuAAAAAElFTkSuQmCC
`

// tweak contours coefficients - 0 -> no tweak:
const mouthWiden = 0.01;
const upperLipOut = 0;//0.01;
const lowerLipOut = 0.005;//0.01;

const SHAPELIPS = {
  name: 'LIPS',

  // list of the points involved in this shape.
  // each point is given as its label
  // the label depends on the used neural network
  // run WEBARROCKSFACE.get_LMLabels() to get all labels
  points: [
    "lipsExt0", // 0
    "lipsExtTop1", // 1
    "lipsExtTop2", // 2
    "lipsExtTop3", // 3
    "lipsExtTop4", // 4
    "lipsExtTop5", // 5
    
    "lipsExt6", // 6

    "lipsExtBot7", // 7
    "lipsExtBot8", // 8
    "lipsExtBot9", // 9
    "lipsExtBot10", // 10
    "lipsExtBot11", // 11
    
    "lipsInt12", // 12

    "lipsIntTop13", // 13
    "lipsIntTop14", // 14
    "lipsIntTop15", // 15
    
    "lipsInt16", // 16

    "lipsIntBot17", // 17
    "lipsIntBot18", // 18
    "lipsIntBot19" // 19
  ],

  // iVals are interpolated values
  // a value is given for each shape point
  // in the same order as points array
  // a value can have between 0 and 4 elements
  // the value will be retrieved in the fragment shader used to color the shape
  // as a float, vec2, vec3 or vec4 depending on its components count
  // it is useful to not color evenly the shape
  // we can apply gradients, smooth borders, ...
  iVals: [
    [1], // lipsExt0
    [1], // lipsExtTop1
    [1], // lipsExtTop2
    [1], // lipsExtTop3
    [1], // lipsExtTop4
    [1], // lipsExtTop5
    
    [1], // lipsExt6

    [1], // lipsExtBot7
    [1], // lipsExtBot8
    [1], // lipsExtBot9
    [1], // lipsExtBot10
    [1], // lipsExtBot11
    
    [-1], // lipsInt12

    [-1], // lipsIntTop13
    [-1], // lipsIntTop14
    [-1], // lipsIntTop15
    
    [-1], // lipsInt16

    [-1], // lipsIntBot17
    [-1], // lipsIntBot18
    [-1] // lipsIntBot1
  ],

  // how to group shape points to draw triangles
  // each value is an index in shape points array
  tesselation: [ 
    // upper lip:
    0,1,13, // each group of 3 indices is a triangular face
    0,12,13,
    1,13,2,
    2,13,14,
    2,3,14,
    3,4,14,
    14,15,4,
    4,5,15,
    15,5,6,
    15,6,16,

    // lower lip:
    0,12,19,
    0,19,11,
    11,10,19,
    10,18,19,
    10,9,18,
    8,9,18,
    8,17,18,
    7,8,17,
    6,7,17,
    6,17,16 //*/
  ],

  // interpolated points:
  // to make shape border smoother, we can add computed points
  // each value of this array will insert 2 new points
  // 
  // the first point will be between the first 2 points indices 
  // the second point will be between the last 2 points indices
  // 
  // the first value of ks controls the position of the first interpolated point
  // if -1, it will match the first point, if 0 it will match the middle point
  // the second value of ks controls the position of the second interpolated point
  // if 1, it will match the last point, if 0 it will match the middle point
  // 
  // computed using Cubic Hermite interpolation
  // the point is automatically inserted into the tesselation
  // points are given by their indices in shape points array
  interpolations: [
    { // upper lip sides:
      tangentInfluences: [2, 2, 2],
      points: [1, 2, 3],
      ks: [-0.25, 0.25] // between -1 and 1
    },
    {
      tangentInfluences: [2, 2, 2],
      points: [3, 4, 5],
      ks: [-0.25, 0.25] // between -1 and 1
    },
    { // upper lip middle
      tangentInfluences: [2, 2, 2],
      points: [2, 3, 4],
      ks: [-0.25, 0.25] // between -1 and 1
    },
    { // lower lip middle:
      tangentInfluences: [2, 2, 2],
      points: [10, 9, 8],
      ks: [-0.25, 0.25] // between -1 and 1
    }
  ],

  // we can move points along their normals using the outline feature.
  // an outline is specified by the list of point indices in shape points array
  // it will be used to compute the normals, the inside and the outside
  // 
  // displacement array are the displacement along normals to apply
  // for each point of the outline.
  outlines: [
    { // upper lip. Indices of points in points array:
      points: [
        0,
        1,2,3,4,5, // exterior
        6, 16,
        15, 14, 13, // interior
        12
      ],
      displacements: [ // displacements, relative to perimeter:
        mouthWiden,
        upperLipOut, upperLipOut, upperLipOut - 0.015, upperLipOut, upperLipOut, // exterior
        0.00, 0,
        0.01, 0.015, 0.01, // interior
        mouthWiden
      ]
    },
    { // lower lip:
      points: [
        12,
        19, 18, 17, // interior
        16, 6,
        7, 8, 9, 10, 11, // exterior
        0
      ],
      displacements: [
        0,
        0.015, 0.02, 0.015,
        0, 0.0,
        lowerLipOut, lowerLipOut, lowerLipOut, lowerLipOut, lowerLipOut,
        0.0
      ]
    }
  ],

  // RENDERING:
  // GLSLFragmentSource is the GLSL source code of the shader used
  // to fill the shape:
  
  // Debug interpolated vals:
  /*GLSLFragmentSource: "void main(void){\n\
    gl_FragColor = vec4(0.5 + 0.5*iVal, 0., 1.);\n\
  }" //*/

  // uniform color:
  /*GLSLFragmentSource: "void main(void){\n\
    gl_FragColor = vec4(0.1, 0.0, 0.2, 0.5);\n\
  }" //*/
  
  // debug samplerVideo and vUV:
  /*GLSLFragmentSource: "void main(void){\n\
    gl_FragColor = vec4(0., 1., 0., 1.) * texture2D(samplerVideo, vUV);\n\
  }" //*/

  // color with smooth border:
  GLSLFragmentSource: "\n\
    const vec2 ALPHARANGE = vec2(0.1, 0.6);\n\
    const vec3 LUMA = 1.3 * vec3(0.299, 0.587, 0.114);\n\
    \n\
    float linStep(float edge0, float edge1, float x){\n\
      float val = (x - edge0) / (edge1 - edge0);\n\
      return clamp(val, 0.0, 1.0);\n\
    }\n\
    \n\
    \n\
    void main(void){\n\
      // get grayscale video color:\n\
      vec3 videoColor = texture2D(samplerVideo, vUV).rgb;\n\
      vec3 videoColorGs = vec3(1., 1., 1.) * dot(videoColor, LUMA);\n\
      \n\
      // computer alpha:\n\
      float alpha = 1.0; // no border smoothing\n\
      alpha *= linStep(-1.0, -0.95, abs(iVal)); // interior\n\
      alpha *= 0.5 + 0.5 * linStep(1.0, 0.6, abs(iVal)); // exterior smoothing\n\
      float alphaClamped = ALPHARANGE.x + (ALPHARANGE.y - ALPHARANGE.x) * alpha;\n\
      \n\
      // mix colors:\n\
      vec3 color = videoColorGs * lipstickColor;\n\
      gl_FragColor = vec4(color*alphaClamped, alphaClamped);\n\
      \n\
      // DEBUG ZONE:\n\
      //gl_FragColor = vec4(0., alpha, 0., 1.0);\n\
      //gl_FragColor = vec4(alpha, alpha, alphaClamped, 1.0);\n\
      //gl_FragColor = vec4(0., 1., 0., 1.);\n\
    }",
    uniforms: [{
      name: 'lipstickColor',
      value:  [1.75, 1.21, 1.09]
    }]
}; //end SHAPELIPS

const COLORS = [
  {
      "background": "rgb(190, 136, 126)",
      "value": [1.9, 1.36, 1.26],
      "hex": "#be887e"
  },
  {
      "background": "rgb(196, 106, 114)",
      "value": [1.96, 1.06, 1.14],
      "hex": "#c46a72"
  },
  {
      "background": "rgb(155, 90, 83)",
      "value": [1.55, 0.9, 0.83],
      "hex": "#9b5a53"
  },
  {
      "background": "rgb(207, 92, 94)",
      "value": [2.07, 0.92, 0.94],
      "hex": "#cf5c5e"
  },
  {
      "background": "rgb(196, 106, 95)",
      "value": [1.96, 1.06, 0.95],
      "hex": "#c46a5f"
  },
  {
      "background": "rgb(182, 109, 109)",
      "value": [1.82, 1.09, 1.09],
      "hex": "#b66d6d"
  },
  {
      "background": "rgb(175, 99, 99)",
      "value": [1.75, 0.99, 0.99],
      "hex": "#af6363"
  },
  {
      "background": "rgb(207, 101, 123)",
      "value": [2.07, 1.01, 1.23],
      "hex": "#cf657b"
  },
  {
      "background": "rgb(174, 85, 92)",
      "value": [1.74, 0.85, 0.92],
      "hex": "#ae555c"
  },
  {
      "background": "rgb(207, 63, 67)",
      "value": [2.07, 0.63, 0.67],
      "hex": "#cf3f43"
  },
  {
      "background": "rgb(121, 13, 13)",
      "value": [1.21, 0.13, 0.13],
      "hex": "#790d0d"
  },
  {
      "background": "rgb(131, 17, 44)",
      "value": [1.31, 0.17, 0.44],
      "hex": "#83112c"
  }
];


const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hslToRgb(h, s, l){
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  let s;
  let l = (max + min) / 2;

  if (max == min) {
    h = 0;
    s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = h / 6;
  }

  return [h * 360, s * 100, l * 100];
}

function changeHue(rgb, newHue) {
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  hsl[0] = newHue;
  return hslToRgb(hsl[0], hsl[1], hsl[2]);
}

function hexToHue(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0;
  let delta = max - min;

  switch (max) {
    case min: hue = 0; break; // achromatic
    case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
    case g: hue = (b - r) / delta + 2; break;
    case b: hue = (r - g) / delta + 4; break;
  }

  hue /= 6;
  return hue * 360; // return hue value in range [0, 360]
}

const controlButtonStyles = `
  margin: 0 5px;
  min-height: 43px;
  min-width: 43px;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 500ms;
  user-select: none;
  position: relative;
`;

const controlButtonOverlay = `
   width: 200%;
  height: 200%;
  border-radius: 50%;
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: -1;
  background: rgba(249, 211, 231, 1);
`;

const btnStyles = `
  height: 50px;
  color: rgba(108, 77, 81, 1);
  background: rgba(249, 211, 231, 1);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  padding: 12px 21px;
`;

const photoBtnStyles = `
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  min-width: 320px;
`;

const innerStyles = `
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const controlsStyles = `
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 607px;
  min-height: 55px;
  border-radius: 142px;
  position: relative;
  bottom: 50px;
  z-index: 2;
  padding: 7px 21px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgba(249, 211, 231, 1)
`;

const canvasStyles = `
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
`;

const videoWidget = `
   <div class="image">
      <canvas width="600" height="600" id="WebARRocksFaceCanvasAR" style="z-index: 1; ${canvasStyles}"></canvas>
      <canvas width="600" height="600" id="WebARRocksFaceCanvasVideo" style="z-index: 0; ${canvasStyles}"></canvas>
    </div>
    <div class="inner" style="${innerStyles}">
      <button class="photoBtn" style="${photoBtnStyles + btnStyles}" onclick="screenshot()">
        Сделать фото
      </button>
    </div>
`;

const wrapperStyles = `
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  overflow: hidden;
`;

const mainScreenStyles = `
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(https://cdn.jsdelivr.net/gh/defk1lla/lipstick/assets/main-bg.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const mainScreenTitleStyles = `
  max-width: 154px;
  margin-bottom: 10px;
  font-size: 22px;
  text-align: center;
`;

const mainScreenTextStyles = `
  max-width: 241px;
  margin-bottom: 35px;
  text-align: center;
`;

const mainScreenWidget = `
  <div style="${mainScreenStyles}">
    <img src="${lipsIcon}" style="margin-bottom: 11px; margin-top: 36px;" />
    <div style="${mainScreenTitleStyles}">
      Попробуй прямо сейчас!
    </div>
    <div style="${mainScreenTextStyles}">
      Сделай или загрузи фото, чтобы примерить помаду
    </div>
    <button style="${btnStyles} margin-bottom: 19px" onclick="renderVideoPage()">
      Использовать камеру
    </button>
    <label style="cursor: pointer">
      <input type="file" style="display: none" onchange="onFileChange(event)" />
      Выбрать фото
    </label>
  </div>
`;

let cache;

function colorsAreSimilar(color1, color2, tolerance) {
  return Math.abs(color1[0] - color2[0]) <= tolerance &&
         Math.abs(color1[1] - color2[1]) <= tolerance &&
         Math.abs(color1[2] - color2[2]) <= tolerance;
}

function onFileChange(e) {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  renderLoader();
  reader.onload = () => 
    fetchLipsPoints(reader.result)
  .then(({ lipData }) => {
    renderColorWidget();
    cache = [reader.result, lipData];
  });
} 

const loaderStyles = `
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const loaderWidget = `
  <div style="${loaderStyles}">
    <h1>Загрузка...</h1>
  </div>
`;

const colorWidgetStyles = `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: cetner;
  gap: 15px;
`;

const colorWidget = `
  <div style="${colorWidgetStyles}">
    Выбери цвет
    <button style="${btnStyles}" onclick="fillImage()">
      Посмотреть
    </button>
  </div>
`

function renderColorWidget() {
  document.getElementById('lipstickWrapper').innerHTML = '';
  renderControls(COLORS);
  document.querySelector('.inner').innerHTML += colorWidget;
}

function renderLoader() {
  const wrapper = document.getElementById('lipstickWrapper');
  wrapper.innerHTML = loaderWidget;
}

function renderMainScreen() {
  document.getElementById('lipstickWrapper').innerHTML = mainScreenWidget;
}

function renderVideoWidget() {
  document.getElementById('lipstickWrapper').innerHTML = videoWidget;
  renderControls(COLORS);
}

function start(){
  mode = 'video';
  WebARRocksFaceShape2DHelper.init({
    NNCPath: 'https://cdn.jsdelivr.net/gh/defk1lla/lipstick/neuralNets/NN_LIPS_8.json',
    canvasVideo: _canvasVideo,
    canvasAR: _canvasAR,
    shapes: [ SHAPELIPS ]
  }).then(function(){

  }).catch(function(err){
    throw new Error(err);
  });
}

function createBeforeAfterSlider(before, after) {
  if(mode === 'video') {
    WebARRocksFaceShape2DHelper.destroy();
  }

  const wrapper = document.getElementById('lipstickWrapper')
  wrapper.innerHTML = '';
  const sliderWrapper = document.createElement('div');
  sliderWrapper.style.display = 'flex';
  sliderWrapper.id = 'afterBeforeSlider';
  wrapper.append(sliderWrapper);

  new SliderBar({
    el: '#afterBeforeSlider',            
    beforeImg: before, 
    afterImg: after,    
    width: "100vw",               
    height: "100vh",            
    line: true, 
    lineWidth: 1,               
    lineColor: "rgba(255,255,255,0.5)" 
  });

  const goBack = document.createElement('button');
  goBack.innerHTML = 'Назад';
  goBack.style.position = 'fixed';
  goBack.style.top = 0;
  goBack.style.left = 0;
  goBack.addEventListener('click', () => {
    if (mode === 'video') {
      renderVideoPage();
    } else if (mode === 'image') {
      renderColorWidget();
    }
  });
  wrapper.append(goBack);
}

function createSlider(element) {
  let clientX = 0;
  let grabbing = false;
  let prevDistanceScrolled = 0;
  let distanceToScroll = 0;

  function onMouseDown(e) {
    clientX = e.clientX;
    grabbing = true;
  }

  function onTouchStart(e) {
    clientX = e.touches[0].clientX;
    grabbing = true;
  }

  function onMouseUp(e) {
    grabbing = false;
    prevDistanceScrolled += distanceToScroll;
  }

  function onMouseMove(e) {
    if (grabbing) {
      let newClientX = e.clientX;
      distanceToScroll = newClientX - clientX;
      element.style.transform = `translateX(${distanceToScroll + prevDistanceScrolled}px)`;
    }
  }

  function onTouchMove(e) {
    if (grabbing) {
      let newClientX = e.touches[0].clientX;
      distanceToScroll = newClientX - clientX;
      element.style.transform = `translateX(${distanceToScroll + prevDistanceScrolled}px)`;
    }
  }

  function addListeners() {
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchend', onMouseUp);
    element.addEventListener('touchmove', onTouchMove);
  }

  function removeListners() {
    element.style.transform = 'translateX(0px)';
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('mouseup', onMouseUp);
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('touchstart', onMouseDown);
    element.removeEventListener('touchend', onMouseUp);
    element.removeEventListener('touchmove', onTouchMove);
  }

  const mQuery = window.matchMedia('(max-width: 440px)');

  if (mQuery.matches) addListeners();

  mQuery.addEventListener('change', () => mQuery.matches ? addListeners() : removeListners()); 
}

function renderControls(colors, currentColor = COLORS[0].value) {
  function createItem(i) {
    return `
      <a
        class="controlButton ${currentColor.toString() === i.value.toString() ? 'controlButtonSelected' : ''}"
        style="background: ${i.background}; ${controlButtonStyles}"
        onclick="change_lipstickColor([${i.value}], event)"
      ></a>
    `
  }

  const controls = document.querySelector('.controls');
  const conrolBtns = colors.map(createItem);

  if(controls) {
    controls.innerHTML = conrolBtns.join('');
    createSlider(controls);
  } else {
    const inner = document.querySelector('.inner');

    if(inner) {
      inner.innerHTML += `
        <controls class="controls" style="${controlsStyles}">
          ${conrolBtns.join('')}
        </controls>
      `;
    } else {
      document.getElementById('lipstickWrapper').innerHTML += `
        <div class="inner" style="${innerStyles}">
          <controls class="controls" style="${controlsStyles}">
            ${conrolBtns.join('')}
          </controls>
        </div>
      `
    }

    createSlider(document.querySelector('.controls'));
  }
}

function screenshot() {
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');

  cv.width = _canvasVideo.width;
  cv.height = _canvasVideo.height;
  ctx.drawImage(_canvasVideo, 0, 0);
  ctx.drawImage(_canvasAR, 0, 0);

  const base64ResultImage = cv.toDataURL('image/png');
  const base64OriginalImage = _canvasVideo.toDataURL('image/png');

  createBeforeAfterSlider(base64OriginalImage, base64ResultImage);
}

async function fetchLipsPoints(imgBase64) {
  return fetch('https://lipstick-bcknd.vercel.app/api', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      imgBase64
    })
  }).then(res => res.json());
}

function fillImage() {
  mode = 'image';
  const img = new Image();
  img.src = cache[0];

  img.addEventListener('load', () => {
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    cv.height = img.height;
    cv.width = img.width;
    
    ctx.drawImage(img, 0, 0, img.width, img.height);
    
    const imgData = ctx.getImageData(0, 0, cv.width, cv.height);
    const newHue = hexToHue(rgbToHex.apply(null, selectedColor.map(i => Math.round((i * 100)))));

    for (let index of cache[1]) {
      const newColor = changeHue(
        [
          imgData.data[index * 4],
          imgData.data[index * 4 + 1],
          imgData.data[index * 4 + 2]
        ],
        newHue
      );
      imgData.data[index * 4 + 0] = newColor[0];
      imgData.data[index * 4 + 1] = newColor[1];
      imgData.data[index * 4 + 2] = newColor[2];
    }

    ctx.putImageData(imgData, 0, 0);
    createBeforeAfterSlider(cache[0], cv.toDataURL());
  })
}

// entry point:
function main(){
  renderMainScreen();

  document.querySelector('style').innerHTML += `
    .slider-btn {
      width: 3px !important;
      background: rgba(255, 255, 255, 0.5) !important;
      z-index: 99999999;
    }
    
    .slider-btn::after {
      width: 28px !important;
      height: 28px !important;
      background: transparent !important;
      box-shadow: none !important;
      content: ${sliderArrows} !important;
    }

    #lipstickWrapper {
      font-szie: 14px;
      color: #6C4D51;
      ${wrapperStyles}
    }

    .controlButtonSelected::after {
      content: "";
      ${controlButtonOverlay}
    }
  `
}

function renderVideoPage() {
  mode = 'video';

  renderVideoWidget();

  _canvasAR = document.getElementById('WebARRocksFaceCanvasAR');
  _canvasVideo = document.getElementById('WebARRocksFaceCanvasVideo');

   WebARRocksResizer.size_canvas({
    canvas: _canvasVideo,
    overlayCanvas: [_canvasAR],
    callback: start,
    isFullScreen: true
  });
}

function change_lipstickColor(color, event){
  const selected = document.querySelector('.controlButtonSelected');
  selectedColor = color;
  
  if(selected) {
    selected.innerHTML = '';
    selected.classList.toggle('controlButtonSelected');
  }

  const domLink = event.target;
  domLink.classList.toggle('controlButtonSelected');

  if(mode === 'video') {
    WebARRocksFaceShape2DHelper.set_uniformValue('LIPS', 'lipstickColor', color);
  }
}


window.addEventListener('DOMContentLoaded', main);