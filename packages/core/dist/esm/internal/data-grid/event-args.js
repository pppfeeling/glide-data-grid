export const headerKind = "header";
export const groupHeaderKind = "group-header";
export const outOfBoundsKind = "out-of-bounds";
export var OutOfBoundsRegionAxis;
(function (OutOfBoundsRegionAxis) {
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Start"] = -2] = "Start";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["StartPadding"] = -1] = "StartPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Center"] = 0] = "Center";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["EndPadding"] = 1] = "EndPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["End"] = 2] = "End";
})(OutOfBoundsRegionAxis || (OutOfBoundsRegionAxis = {}));
export function mouseEventArgsAreEqual(args, other) {
  if (args === other) return true;
  if ((args === null || args === void 0 ? void 0 : args.kind) === "out-of-bounds") {
    return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]) && (args === null || args === void 0 ? void 0 : args.region[0]) === (other === null || other === void 0 ? void 0 : other.region[0]) && (args === null || args === void 0 ? void 0 : args.region[1]) === (other === null || other === void 0 ? void 0 : other.region[1]);
  }
  return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]);
}
//# sourceMappingURL=event-args.js.map