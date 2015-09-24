const React = require("react-native");
const GL = require("gl-react-native");

const shaders = GL.Shaders.create({
  layer: {
    frag: `
precision highp float;

varying vec2 uv;
uniform sampler2D t1;
uniform sampler2D t2;

void main () {
  vec4 c1 = texture2D(t1, uv);
  vec4 c2 = texture2D(t2, uv);
  gl_FragColor = vec4(mix(c1.rgb, c2.rgb, c2.a), 1.0);
}
`
  }
});

class Layer extends GL.Component {
  render () {
    const { width, height, children, ...rest } = this.props;
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Layer");
    const [t1, t2] = children;
    return <GL.View
      {...rest}
      shader={shaders.layer}
      width={width}
      height={height}
      uniforms={{ t1, t2 }}
    />;
  }
}

module.exports = Layer;
