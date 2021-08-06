class Debugger {
  static isDebugOn = true;
}

export default function debugLog(title, value) {
  if (Debugger.isDebugOn) {
    if (!value) {
      const variableName = Object.keys({ title })[0];
      console.log(variableName, title);
    } else {
      console.log(title, value);
    }
  }
}
