class ObjectUtils {
  static isExist(string: string | object) {
    return string !== null && string !== undefined && string !== '';
  }

  static isEmptyObject(object: object) {
    for (var prop in object) {
      if (Object.prototype.hasOwnProperty.call(object, prop)) return false;
    }

    return JSON.stringify(object) === JSON.stringify({});
  }

  static deepCopy(object: string | object) {
    return JSON.parse(JSON.stringify(object));
  }
}

export default ObjectUtils;
