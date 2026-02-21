import "./sprites.js";
function getColors(variant, theme) {
  if (variant === "normal") {
    return [theme.bgIconHeader, theme.fgIconHeader];
  } else if (variant === "selected") {
    return ["white", theme.accentColor];
  } else {
    return [theme.accentColor, theme.bgHeader];
  }
}
export class SpriteManager {
  constructor(headerIcons, onSettled) {
    this.onSettled = void 0;
    this.spriteMap = new Map();
    this.headerIcons = void 0;
    this.inFlight = 0;
    this.onSettled = onSettled;
    this.headerIcons = headerIcons !== null && headerIcons !== void 0 ? headerIcons : {};
  }
  drawSprite(sprite, variant, ctx, x, y, size, theme) {
    let alpha = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    const [bgColor, fgColor] = getColors(variant, theme);
    const rSize = size * Math.ceil(window.devicePixelRatio);
    const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;
    let spriteCanvas = this.spriteMap.get(key);
    if (spriteCanvas === undefined) {
      const spriteCb = this.headerIcons[sprite];
      if (spriteCb === undefined) return;
      spriteCanvas = document.createElement("canvas");
      const spriteCtx = spriteCanvas.getContext("2d");
      if (spriteCtx === null) return;
      const imgSource = new Image();
      imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(spriteCb({
        fgColor,
        bgColor
      }))}`;
      this.spriteMap.set(key, spriteCanvas);
      const promise = imgSource.decode();
      if (promise === undefined) return;
      this.inFlight++;
      promise.then(() => {
        spriteCtx.drawImage(imgSource, 0, 0, rSize, rSize);
      }).finally(() => {
        this.inFlight--;
        if (this.inFlight === 0) {
          this.onSettled();
        }
      });
    } else {
      if (alpha < 1) {
        ctx.globalAlpha = alpha;
      }
      ctx.drawImage(spriteCanvas, 0, 0, rSize, rSize, x, y, size, size);
      if (alpha < 1) {
        ctx.globalAlpha = 1;
      }
    }
  }
}
//# sourceMappingURL=data-grid-sprites.js.map