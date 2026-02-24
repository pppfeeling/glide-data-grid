import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { forwardRef, createElement, useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import { marked } from "marked";
import { createPortal } from "react-dom";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var _baseHas;
var hasRequired_baseHas;
function require_baseHas() {
  if (hasRequired_baseHas) return _baseHas;
  hasRequired_baseHas = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
  }
  _baseHas = baseHas;
  return _baseHas;
}
var isArray_1;
var hasRequiredIsArray;
function requireIsArray() {
  if (hasRequiredIsArray) return isArray_1;
  hasRequiredIsArray = 1;
  var isArray = Array.isArray;
  isArray_1 = isArray;
  return isArray_1;
}
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal) return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal;
  return _freeGlobal;
}
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root) return _root;
  hasRequired_root = 1;
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  _root = root;
  return _root;
}
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol) return _Symbol;
  hasRequired_Symbol = 1;
  var root = require_root();
  var Symbol2 = root.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag) return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  _getRawTag = getRawTag;
  return _getRawTag;
}
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString) return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  _objectToString = objectToString;
  return _objectToString;
}
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag) return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  _baseGetTag = baseGetTag;
  return _baseGetTag;
}
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike) return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike;
  return isObjectLike_1;
}
var isSymbol_1;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol_1;
  hasRequiredIsSymbol = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  isSymbol_1 = isSymbol;
  return isSymbol_1;
}
var _isKey;
var hasRequired_isKey;
function require_isKey() {
  if (hasRequired_isKey) return _isKey;
  hasRequired_isKey = 1;
  var isArray = requireIsArray(), isSymbol = requireIsSymbol();
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  _isKey = isKey;
  return _isKey;
}
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject_1;
  hasRequiredIsObject = 1;
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject;
  return isObject_1;
}
var isFunction_1;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction_1;
  hasRequiredIsFunction = 1;
  var baseGetTag = require_baseGetTag(), isObject = requireIsObject();
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  isFunction_1 = isFunction;
  return isFunction_1;
}
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData) return _coreJsData;
  hasRequired_coreJsData = 1;
  var root = require_root();
  var coreJsData = root["__core-js_shared__"];
  _coreJsData = coreJsData;
  return _coreJsData;
}
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked) return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData = require_coreJsData();
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  _isMasked = isMasked;
  return _isMasked;
}
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource) return _toSource;
  hasRequired_toSource = 1;
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  _toSource = toSource;
  return _toSource;
}
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative) return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction = requireIsFunction(), isMasked = require_isMasked(), isObject = requireIsObject(), toSource = require_toSource();
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  _baseIsNative = baseIsNative;
  return _baseIsNative;
}
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue) return _getValue;
  hasRequired_getValue = 1;
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  _getValue = getValue;
  return _getValue;
}
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative) return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  _getNative = getNative;
  return _getNative;
}
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate) return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative = require_getNative();
  var nativeCreate = getNative(Object, "create");
  _nativeCreate = nativeCreate;
  return _nativeCreate;
}
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear) return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  _hashClear = hashClear;
  return _hashClear;
}
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete) return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  _hashDelete = hashDelete;
  return _hashDelete;
}
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet) return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  _hashGet = hashGet;
  return _hashGet;
}
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas) return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate = require_nativeCreate();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  _hashHas = hashHas;
  return _hashHas;
}
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet) return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  _hashSet = hashSet;
  return _hashSet;
}
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash) return _Hash;
  hasRequired_Hash = 1;
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  _Hash = Hash;
  return _Hash;
}
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear) return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  _listCacheClear = listCacheClear;
  return _listCacheClear;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq;
  return eq_1;
}
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf) return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq = requireEq();
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  _assocIndexOf = assocIndexOf;
  return _assocIndexOf;
}
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete) return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf = require_assocIndexOf();
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  _listCacheDelete = listCacheDelete;
  return _listCacheDelete;
}
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet) return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  _listCacheGet = listCacheGet;
  return _listCacheGet;
}
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas) return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  _listCacheHas = listCacheHas;
  return _listCacheHas;
}
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet) return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  _listCacheSet = listCacheSet;
  return _listCacheSet;
}
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache) return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  _ListCache = ListCache;
  return _ListCache;
}
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map) return _Map;
  hasRequired_Map = 1;
  var getNative = require_getNative(), root = require_root();
  var Map2 = getNative(root, "Map");
  _Map = Map2;
  return _Map;
}
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear) return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  _mapCacheClear = mapCacheClear;
  return _mapCacheClear;
}
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable) return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  _isKeyable = isKeyable;
  return _isKeyable;
}
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData) return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable = require_isKeyable();
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  _getMapData = getMapData;
  return _getMapData;
}
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete) return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  _mapCacheDelete = mapCacheDelete;
  return _mapCacheDelete;
}
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet) return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  _mapCacheGet = mapCacheGet;
  return _mapCacheGet;
}
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas) return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  _mapCacheHas = mapCacheHas;
  return _mapCacheHas;
}
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet) return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  _mapCacheSet = mapCacheSet;
  return _mapCacheSet;
}
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache) return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  _MapCache = MapCache;
  return _MapCache;
}
var memoize_1;
var hasRequiredMemoize;
function requireMemoize() {
  if (hasRequiredMemoize) return memoize_1;
  hasRequiredMemoize = 1;
  var MapCache = require_MapCache();
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize2(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
      if (cache2.has(key)) {
        return cache2.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache2.set(key, result) || cache2;
      return result;
    };
    memoized.cache = new (memoize2.Cache || MapCache)();
    return memoized;
  }
  memoize2.Cache = MapCache;
  memoize_1 = memoize2;
  return memoize_1;
}
var _memoizeCapped;
var hasRequired_memoizeCapped;
function require_memoizeCapped() {
  if (hasRequired_memoizeCapped) return _memoizeCapped;
  hasRequired_memoizeCapped = 1;
  var memoize2 = requireMemoize();
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize2(func, function(key) {
      if (cache2.size === MAX_MEMOIZE_SIZE) {
        cache2.clear();
      }
      return key;
    });
    var cache2 = result.cache;
    return result;
  }
  _memoizeCapped = memoizeCapped;
  return _memoizeCapped;
}
var _stringToPath;
var hasRequired_stringToPath;
function require_stringToPath() {
  if (hasRequired_stringToPath) return _stringToPath;
  hasRequired_stringToPath = 1;
  var memoizeCapped = require_memoizeCapped();
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  _stringToPath = stringToPath;
  return _stringToPath;
}
var _arrayMap;
var hasRequired_arrayMap;
function require_arrayMap() {
  if (hasRequired_arrayMap) return _arrayMap;
  hasRequired_arrayMap = 1;
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  _arrayMap = arrayMap;
  return _arrayMap;
}
var _baseToString;
var hasRequired_baseToString;
function require_baseToString() {
  if (hasRequired_baseToString) return _baseToString;
  hasRequired_baseToString = 1;
  var Symbol2 = require_Symbol(), arrayMap = require_arrayMap(), isArray = requireIsArray(), isSymbol = requireIsSymbol();
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  _baseToString = baseToString;
  return _baseToString;
}
var toString_1;
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString) return toString_1;
  hasRequiredToString = 1;
  var baseToString = require_baseToString();
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  toString_1 = toString;
  return toString_1;
}
var _castPath;
var hasRequired_castPath;
function require_castPath() {
  if (hasRequired_castPath) return _castPath;
  hasRequired_castPath = 1;
  var isArray = requireIsArray(), isKey = require_isKey(), stringToPath = require_stringToPath(), toString = requireToString();
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }
  _castPath = castPath;
  return _castPath;
}
var _baseIsArguments;
var hasRequired_baseIsArguments;
function require_baseIsArguments() {
  if (hasRequired_baseIsArguments) return _baseIsArguments;
  hasRequired_baseIsArguments = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  _baseIsArguments = baseIsArguments;
  return _baseIsArguments;
}
var isArguments_1;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments_1;
  hasRequiredIsArguments = 1;
  var baseIsArguments = require_baseIsArguments(), isObjectLike = requireIsObjectLike();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  isArguments_1 = isArguments;
  return isArguments_1;
}
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex) return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  _isIndex = isIndex;
  return _isIndex;
}
var isLength_1;
var hasRequiredIsLength;
function requireIsLength() {
  if (hasRequiredIsLength) return isLength_1;
  hasRequiredIsLength = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  isLength_1 = isLength;
  return isLength_1;
}
var _toKey;
var hasRequired_toKey;
function require_toKey() {
  if (hasRequired_toKey) return _toKey;
  hasRequired_toKey = 1;
  var isSymbol = requireIsSymbol();
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  _toKey = toKey;
  return _toKey;
}
var _hasPath;
var hasRequired_hasPath;
function require_hasPath() {
  if (hasRequired_hasPath) return _hasPath;
  hasRequired_hasPath = 1;
  var castPath = require_castPath(), isArguments = requireIsArguments(), isArray = requireIsArray(), isIndex = require_isIndex(), isLength = requireIsLength(), toKey = require_toKey();
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }
  _hasPath = hasPath;
  return _hasPath;
}
var has_1;
var hasRequiredHas;
function requireHas() {
  if (hasRequiredHas) return has_1;
  hasRequiredHas = 1;
  var baseHas = require_baseHas(), hasPath = require_hasPath();
  function has2(object, path) {
    return object != null && hasPath(object, path, baseHas);
  }
  has_1 = has2;
  return has_1;
}
var hasExports = requireHas();
const has$1 = /* @__PURE__ */ getDefaultExportFromCjs(hasExports);
function panic() {
  let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "This should not happen";
  throw new Error(message);
}
function assert(fact) {
  let message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Assertion failed";
  if (fact) return;
  return panic(message);
}
function assertNever(_never, msg) {
  return panic(msg !== null && msg !== void 0 ? msg : "Hell froze over");
}
function maybe(fn, defaultValue) {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
const has = Object.prototype.hasOwnProperty;
function deepEqual(foo, bar) {
  let ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && deepEqual(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}
var _CompactSelection;
const BooleanEmpty = null;
const BooleanIndeterminate = void 0;
var GridCellKind = /* @__PURE__ */ ((GridCellKind2) => {
  GridCellKind2["Uri"] = "uri";
  GridCellKind2["Text"] = "text";
  GridCellKind2["Image"] = "image";
  GridCellKind2["RowID"] = "row-id";
  GridCellKind2["Number"] = "number";
  GridCellKind2["Bubble"] = "bubble";
  GridCellKind2["Boolean"] = "boolean";
  GridCellKind2["Loading"] = "loading";
  GridCellKind2["Markdown"] = "markdown";
  GridCellKind2["Drilldown"] = "drilldown";
  GridCellKind2["Protected"] = "protected";
  GridCellKind2["Custom"] = "custom";
  return GridCellKind2;
})(GridCellKind || {});
var GridColumnIcon = /* @__PURE__ */ ((GridColumnIcon2) => {
  GridColumnIcon2["HeaderRowID"] = "headerRowID";
  GridColumnIcon2["HeaderCode"] = "headerCode";
  GridColumnIcon2["HeaderNumber"] = "headerNumber";
  GridColumnIcon2["HeaderString"] = "headerString";
  GridColumnIcon2["HeaderBoolean"] = "headerBoolean";
  GridColumnIcon2["HeaderAudioUri"] = "headerAudioUri";
  GridColumnIcon2["HeaderVideoUri"] = "headerVideoUri";
  GridColumnIcon2["HeaderEmoji"] = "headerEmoji";
  GridColumnIcon2["HeaderImage"] = "headerImage";
  GridColumnIcon2["HeaderUri"] = "headerUri";
  GridColumnIcon2["HeaderPhone"] = "headerPhone";
  GridColumnIcon2["HeaderMarkdown"] = "headerMarkdown";
  GridColumnIcon2["HeaderDate"] = "headerDate";
  GridColumnIcon2["HeaderTime"] = "headerTime";
  GridColumnIcon2["HeaderEmail"] = "headerEmail";
  GridColumnIcon2["HeaderReference"] = "headerReference";
  GridColumnIcon2["HeaderIfThenElse"] = "headerIfThenElse";
  GridColumnIcon2["HeaderSingleValue"] = "headerSingleValue";
  GridColumnIcon2["HeaderLookup"] = "headerLookup";
  GridColumnIcon2["HeaderTextTemplate"] = "headerTextTemplate";
  GridColumnIcon2["HeaderMath"] = "headerMath";
  GridColumnIcon2["HeaderRollup"] = "headerRollup";
  GridColumnIcon2["HeaderJoinStrings"] = "headerJoinStrings";
  GridColumnIcon2["HeaderSplitString"] = "headerSplitString";
  GridColumnIcon2["HeaderGeoDistance"] = "headerGeoDistance";
  GridColumnIcon2["HeaderArray"] = "headerArray";
  GridColumnIcon2["RowOwnerOverlay"] = "rowOwnerOverlay";
  GridColumnIcon2["ProtectedColumnOverlay"] = "protectedColumnOverlay";
  GridColumnIcon2["HeaderArrowDown"] = "headerArrowDown";
  GridColumnIcon2["HeaderArrowUp"] = "headerArrowUp";
  return GridColumnIcon2;
})(GridColumnIcon || {});
var GridColumnMenuIcon = /* @__PURE__ */ ((GridColumnMenuIcon2) => {
  GridColumnMenuIcon2["Triangle"] = "triangle";
  GridColumnMenuIcon2["Dots"] = "dots";
  return GridColumnMenuIcon2;
})(GridColumnMenuIcon || {});
function isSizedGridColumn(c) {
  return "width" in c && typeof c.width === "number";
}
async function resolveCellsThunk(thunk) {
  if (typeof thunk === "object") return thunk;
  return await thunk();
}
function isEditableGridCell(cell) {
  if (cell.kind === "loading" || cell.kind === "bubble" || cell.kind === "row-id" || cell.kind === "protected" || cell.kind === "drilldown") {
    return false;
  }
  return true;
}
function isTextEditableGridCell(cell) {
  if (cell.kind === "loading" || cell.kind === "bubble" || cell.kind === "row-id" || cell.kind === "protected" || cell.kind === "drilldown" || cell.kind === "boolean" || cell.kind === "image" || cell.kind === "custom") {
    return false;
  }
  return true;
}
function isInnerOnlyCell(cell) {
  return cell.kind === "marker" || cell.kind === "new-row" || cell.kind === "row-status";
}
function isReadWriteCell(cell) {
  if (!isEditableGridCell(cell) || cell.kind === "image") return false;
  switch (cell.kind) {
    case "text":
    case "number":
    case "markdown":
    case "uri":
    case "custom":
    case "boolean":
      return cell.readonly !== true;
    default:
      assertNever(cell, "A cell was passed with an invalid kind");
  }
}
function isRectangleEqual(a, b2) {
  if (a === b2) return true;
  if (a === void 0 || b2 === void 0) return false;
  return a.x === b2.x && a.y === b2.y && a.width === b2.width && a.height === b2.height;
}
function isObjectEditorCallbackResult(obj) {
  return has$1(obj, "editor");
}
function booleanCellIsEditable(cell) {
  var _cell$readonly;
  return !((_cell$readonly = cell.readonly) !== null && _cell$readonly !== void 0 ? _cell$readonly : false);
}
var InnerGridCellKind = /* @__PURE__ */ ((InnerGridCellKind2) => {
  InnerGridCellKind2["NewRow"] = "new-row";
  InnerGridCellKind2["Marker"] = "marker";
  InnerGridCellKind2["RowStatus"] = "row-status";
  InnerGridCellKind2["RowId"] = "row-id";
  return InnerGridCellKind2;
})(InnerGridCellKind || {});
const DEFAULT_FILL_HANDLE = {
  shape: "square",
  size: 4,
  offsetX: -2,
  offsetY: -2,
  outline: 0
};
function mergeRanges(input) {
  if (input.length === 0) {
    return [];
  }
  const ranges = [...input];
  const stack = [];
  ranges.sort(function(a, b2) {
    return a[0] - b2[0];
  });
  stack.push([...ranges[0]]);
  for (const range2 of ranges.slice(1)) {
    const top = stack[stack.length - 1];
    if (top[1] < range2[0]) {
      stack.push([...range2]);
    } else if (top[1] < range2[1]) {
      top[1] = range2[1];
    }
  }
  return stack;
}
let emptyCompactSelection;
class CompactSelection {
  constructor(items) {
    this.items = items;
  }
  offset(amount) {
    if (amount === 0) return this;
    const newItems = this.items.map((x) => [x[0] + amount, x[1] + amount]);
    return new CompactSelection(newItems);
  }
  add(selection) {
    const slice = typeof selection === "number" ? [selection, selection + 1] : selection;
    const newItems = mergeRanges([...this.items, slice]);
    return new CompactSelection(newItems);
  }
  remove(selection) {
    const items = [...this.items];
    const selMin = typeof selection === "number" ? selection : selection[0];
    const selMax = typeof selection === "number" ? selection + 1 : selection[1];
    for (const [i, slice] of items.entries()) {
      const [start, end] = slice;
      if (start <= selMax && selMin <= end) {
        const toAdd = [];
        if (start < selMin) {
          toAdd.push([start, selMin]);
        }
        if (selMax < end) {
          toAdd.push([selMax, end]);
        }
        items.splice(i, 1, ...toAdd);
      }
    }
    return new CompactSelection(items);
  }
  first() {
    if (this.items.length === 0) return void 0;
    return this.items[0][0];
  }
  last() {
    if (this.items.length === 0) return void 0;
    return this.items.slice(-1)[0][1] - 1;
  }
  hasIndex(index) {
    for (let i = 0; i < this.items.length; i++) {
      const [start, end] = this.items[i];
      if (index >= start && index < end) return true;
    }
    return false;
  }
  hasAll(index) {
    for (let x = index[0]; x < index[1]; x++) {
      if (!this.hasIndex(x)) return false;
    }
    return true;
  }
  some(predicate) {
    for (const i of this) {
      if (predicate(i)) return true;
    }
    return false;
  }
  equals(other) {
    if (other === this) return true;
    if (other.items.length !== this.items.length) return false;
    for (let i = 0; i < this.items.length; i++) {
      const left = other.items[i];
      const right = this.items[i];
      if (left[0] !== right[0] || left[1] !== right[1]) return false;
    }
    return true;
  }
  toArray() {
    const result = [];
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        result.push(x);
      }
    }
    return result;
  }
  get length() {
    let len = 0;
    for (const [start, end] of this.items) {
      len += end - start;
    }
    return len;
  }
  *[Symbol.iterator]() {
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        yield x;
      }
    }
  }
}
_CompactSelection = CompactSelection;
CompactSelection.create = (items) => {
  return new _CompactSelection(mergeRanges(items));
};
CompactSelection.empty = () => {
  return emptyCompactSelection !== null && emptyCompactSelection !== void 0 ? emptyCompactSelection : emptyCompactSelection = new _CompactSelection([]);
};
CompactSelection.fromSingleSelection = (selection) => {
  return _CompactSelection.empty().add(selection);
};
CompactSelection.fromArray = (items) => {
  if (items.length === 0) return _CompactSelection.empty();
  const slices = items.map((s) => [s, s + 1]);
  const newItems = mergeRanges(slices);
  return new _CompactSelection(newItems);
};
var compilerRuntime = { exports: {} };
var reactCompilerRuntime_production = {};
var hasRequiredReactCompilerRuntime_production;
function requireReactCompilerRuntime_production() {
  if (hasRequiredReactCompilerRuntime_production) return reactCompilerRuntime_production;
  hasRequiredReactCompilerRuntime_production = 1;
  var ReactSharedInternals = React__default.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  reactCompilerRuntime_production.c = function(size) {
    return ReactSharedInternals.H.useMemoCache(size);
  };
  return reactCompilerRuntime_production;
}
var reactCompilerRuntime_development = {};
var hasRequiredReactCompilerRuntime_development;
function requireReactCompilerRuntime_development() {
  if (hasRequiredReactCompilerRuntime_development) return reactCompilerRuntime_development;
  hasRequiredReactCompilerRuntime_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    var ReactSharedInternals = React__default.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    reactCompilerRuntime_development.c = function(size) {
      var dispatcher = ReactSharedInternals.H;
      null === dispatcher && console.error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
      return dispatcher.useMemoCache(size);
    };
  })();
  return reactCompilerRuntime_development;
}
var hasRequiredCompilerRuntime;
function requireCompilerRuntime() {
  if (hasRequiredCompilerRuntime) return compilerRuntime.exports;
  hasRequiredCompilerRuntime = 1;
  if (process.env.NODE_ENV === "production") {
    compilerRuntime.exports = requireReactCompilerRuntime_production();
  } else {
    compilerRuntime.exports = requireReactCompilerRuntime_development();
  }
  return compilerRuntime.exports;
}
var compilerRuntimeExports = requireCompilerRuntime();
function memoize(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0) cache2[arg] = fn(arg);
    return cache2[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var cx = function cx2() {
  const presentClassNames = Array.prototype.slice.call(arguments).filter(Boolean);
  const atomicClasses = {};
  const nonAtomicClasses = [];
  presentClassNames.forEach((arg) => {
    const individualClassNames = arg ? arg.split(" ") : [];
    individualClassNames.forEach((className) => {
      if (className.startsWith("atm_")) {
        const [, keyHash] = className.split("_");
        atomicClasses[keyHash] = className;
      } else {
        nonAtomicClasses.push(className);
      }
    });
  });
  const result = [];
  for (const keyHash in atomicClasses) {
    if (Object.prototype.hasOwnProperty.call(atomicClasses, keyHash)) {
      result.push(atomicClasses[keyHash]);
    }
  }
  result.push(...nonAtomicClasses);
  return result.join(" ");
};
var cx_default = cx;
var isCapital = (ch) => ch.toUpperCase() === ch;
var filterKey = (keys) => (key) => keys.indexOf(key) === -1;
var omit = (obj, keys) => {
  const res = {};
  Object.keys(obj).filter(filterKey(keys)).forEach((key) => {
    res[key] = obj[key];
  });
  return res;
};
function filterProps(asIs, props, omitKeys) {
  const filteredProps = omit(props, omitKeys);
  if (!asIs) {
    const interopValidAttr = typeof isPropValid === "function" ? { default: isPropValid } : isPropValid;
    Object.keys(filteredProps).forEach((key) => {
      if (!interopValidAttr.default(key)) {
        delete filteredProps[key];
      }
    });
  }
  return filteredProps;
}
var warnIfInvalid = (value, componentName) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof value === "string" || // eslint-disable-next-line no-self-compare,no-restricted-globals
    typeof value === "number" && isFinite(value)) {
      return;
    }
    const stringified = typeof value === "object" ? JSON.stringify(value) : String(value);
    console.warn(
      `An interpolation evaluated to '${stringified}' in the component '${componentName}', which is probably a mistake. You should explicitly cast or transform the value to a string.`
    );
  }
};
var idx = 0;
function styled(tag) {
  let mockedClass = "";
  if (process.env.NODE_ENV === "test") {
    mockedClass += `mocked-styled-${idx++}`;
    if (tag && tag.__wyw_meta && tag.__wyw_meta.className) {
      mockedClass += ` ${tag.__wyw_meta.className}`;
    }
  }
  return (options) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
      if (Array.isArray(options)) {
        throw new Error(
          'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup'
        );
      }
    }
    const render = (props, ref) => {
      const { as: component = tag, class: className = mockedClass } = props;
      const shouldKeepProps = options.propsAsIs === void 0 ? !(typeof component === "string" && component.indexOf("-") === -1 && !isCapital(component[0])) : options.propsAsIs;
      const filteredProps = filterProps(shouldKeepProps, props, [
        "as",
        "class"
      ]);
      filteredProps.ref = ref;
      filteredProps.className = options.atomic ? cx_default(options.class, filteredProps.className || className) : cx_default(filteredProps.className || className, options.class);
      const { vars } = options;
      if (vars) {
        const style = {};
        for (const name in vars) {
          const variable = vars[name];
          const result = variable[0];
          const unit = variable[1] || "";
          const value = typeof result === "function" ? result(props) : result;
          warnIfInvalid(value, options.name);
          style[`--${name}`] = `${value}${unit}`;
        }
        const ownStyle = filteredProps.style || {};
        const keys = Object.keys(ownStyle);
        if (keys.length > 0) {
          keys.forEach((key) => {
            style[key] = ownStyle[key];
          });
        }
        filteredProps.style = style;
      }
      if (tag.__wyw_meta && tag !== component) {
        filteredProps.as = component;
        return createElement(tag, filteredProps);
      }
      return createElement(component, filteredProps);
    };
    const Result = forwardRef ? forwardRef(render) : (
      // React.forwardRef won't available on older React versions and in Preact
      // Fallback to a innerRef prop in that case
      ((props) => {
        const rest = omit(props, ["innerRef"]);
        return render(rest, props.innerRef);
      })
    );
    Result.displayName = options.name;
    Result.__wyw_meta = {
      className: options.class || mockedClass,
      extends: tag
    };
    return Result;
  };
}
var styled_default = process.env.NODE_ENV !== "production" ? new Proxy(styled, {
  get(o, prop) {
    return o(prop);
  }
}) : styled;
const ImageOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "ImageOverlayEditorStyle",
  class: "gdg-i19r494s",
  propsAsIs: false
});
var now_1;
var hasRequiredNow;
function requireNow() {
  if (hasRequiredNow) return now_1;
  hasRequiredNow = 1;
  var root = require_root();
  var now = function() {
    return root.Date.now();
  };
  now_1 = now;
  return now_1;
}
var _trimmedEndIndex;
var hasRequired_trimmedEndIndex;
function require_trimmedEndIndex() {
  if (hasRequired_trimmedEndIndex) return _trimmedEndIndex;
  hasRequired_trimmedEndIndex = 1;
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  _trimmedEndIndex = trimmedEndIndex;
  return _trimmedEndIndex;
}
var _baseTrim;
var hasRequired_baseTrim;
function require_baseTrim() {
  if (hasRequired_baseTrim) return _baseTrim;
  hasRequired_baseTrim = 1;
  var trimmedEndIndex = require_trimmedEndIndex();
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  _baseTrim = baseTrim;
  return _baseTrim;
}
var toNumber_1;
var hasRequiredToNumber;
function requireToNumber() {
  if (hasRequiredToNumber) return toNumber_1;
  hasRequiredToNumber = 1;
  var baseTrim = require_baseTrim(), isObject = requireIsObject(), isSymbol = requireIsSymbol();
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  toNumber_1 = toNumber;
  return toNumber_1;
}
var debounce_1;
var hasRequiredDebounce;
function requireDebounce() {
  if (hasRequiredDebounce) return debounce_1;
  hasRequiredDebounce = 1;
  var isObject = requireIsObject(), now = requireNow(), toNumber = requireToNumber();
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce2(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  debounce_1 = debounce2;
  return debounce_1;
}
var debounceExports = requireDebounce();
const debounce = /* @__PURE__ */ getDefaultExportFromCjs(debounceExports);
function useEventListener(eventName, handler, element, passive) {
  let capture = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  const savedHandler = React.useRef();
  savedHandler.current = handler;
  React.useEffect(() => {
    if (element === null || element.addEventListener === void 0) return;
    const el = element;
    const eventListener = (event) => {
      var _savedHandler$current;
      (_savedHandler$current = savedHandler.current) === null || _savedHandler$current === void 0 || _savedHandler$current.call(el, event);
    };
    el.addEventListener(eventName, eventListener, {
      passive,
      capture
    });
    return () => {
      el.removeEventListener(eventName, eventListener, {
        capture
      });
    };
  }, [eventName, element, passive, capture]);
}
function whenDefined(obj, result) {
  return obj === void 0 ? void 0 : result;
}
const PI = Math.PI;
function degreesToRadians(degrees) {
  return degrees * PI / 180;
}
const getSquareBB = (posX, posY, squareSideLength) => ({
  x1: posX - squareSideLength / 2,
  y1: posY - squareSideLength / 2,
  x2: posX + squareSideLength / 2,
  y2: posY + squareSideLength / 2
});
const getSquareXPosFromAlign = (alignment, containerX, containerWidth, horizontalPadding, squareWidth) => {
  switch (alignment) {
    case "left":
      return Math.floor(containerX) + horizontalPadding + squareWidth / 2;
    case "center":
      return Math.floor(containerX + containerWidth / 2);
    case "right":
      return Math.floor(containerX + containerWidth) - horizontalPadding - squareWidth / 2;
  }
};
const getSquareWidth = (maxSize, containerHeight, verticalPadding) => Math.min(maxSize, containerHeight - verticalPadding * 2);
const pointIsWithinBB = (x, y, bb) => bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;
const EditPencil = (props) => {
  var _props$fgColor;
  const $ = compilerRuntimeExports.c(2);
  const fg = (_props$fgColor = props.fgColor) !== null && _props$fgColor !== void 0 ? _props$fgColor : "currentColor";
  let t0;
  if ($[0] !== fg) {
    t0 = /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ jsx("path", { d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" }),
      /* @__PURE__ */ jsx("path", { d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" })
    ] });
    $[0] = fg;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const Checkmark = (props) => {
  var _props$fgColor2;
  const $ = compilerRuntimeExports.c(2);
  const fg = (_props$fgColor2 = props.fgColor) !== null && _props$fgColor2 !== void 0 ? _props$fgColor2 : "currentColor";
  let t0;
  if ($[0] !== fg) {
    t0 = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M19 6L10.3802 17L5.34071 11.8758", vectorEffect: "non-scaling-stroke", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
    $[0] = fg;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
function useDebouncedMemo(factory, deps, time) {
  const [state, setState] = React.useState(factory);
  const mountedRef = React.useRef(true);
  React.useEffect(() => () => {
    mountedRef.current = false;
  }, []);
  const debouncedSetState = React.useRef(debounce((x) => {
    if (mountedRef.current) {
      setState(x);
    }
  }, time));
  React.useLayoutEffect(() => {
    if (mountedRef.current) {
      debouncedSetState.current(() => factory());
    }
  }, deps);
  return state;
}
const rtlRange = "֑-߿יִ-﷽ﹰ-ﻼ";
const ltrRange = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿";
const rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
function direction(value) {
  return rtl.test(value) ? "rtl" : "not-rtl";
}
let scrollbarWidthCache = void 0;
function getScrollBarWidth() {
  if (typeof document === "undefined") return 0;
  if (scrollbarWidthCache !== void 0) return scrollbarWidthCache;
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  const outer = document.createElement("div");
  outer.id = "testScrollbar";
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.append(inner);
  document.body.append(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  scrollbarWidthCache = w1 - w2;
  return scrollbarWidthCache;
}
const empty = /* @__PURE__ */ Symbol();
function useStateWithReactiveInput(inputState) {
  const inputStateRef = React.useRef([empty, inputState]);
  if (inputStateRef.current[1] !== inputState) {
    inputStateRef.current[0] = inputState;
  }
  inputStateRef.current[1] = inputState;
  const [state, setState] = React.useState(inputState);
  const [, forceRender] = React.useState();
  const setStateOuter = React.useCallback((nv) => {
    const s = inputStateRef.current[0];
    if (s !== empty) {
      nv = typeof nv === "function" ? nv(s) : nv;
      if (nv === s) return;
    }
    if (s !== empty) forceRender({});
    setState((pv) => {
      if (typeof nv === "function") {
        return nv(s === empty ? pv : s);
      }
      return nv;
    });
    inputStateRef.current[0] = empty;
  }, []);
  const onEmpty = React.useCallback(() => {
    inputStateRef.current[0] = empty;
    forceRender({});
  }, []);
  return [inputStateRef.current[0] === empty ? state : inputStateRef.current[0], setStateOuter, onEmpty];
}
function makeAccessibilityStringForArray(arr) {
  if (arr.length === 0) {
    return "";
  }
  let index = 0;
  let count = 0;
  for (const str of arr) {
    count += str.length;
    if (count > 1e4) break;
    index++;
  }
  return arr.slice(0, index).join(", ");
}
function useDeepMemo(value) {
  const ref = React.useRef(value);
  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
const ImageOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(30);
  const {
    urls,
    canWrite,
    onEditClick,
    renderImage
  } = p2;
  let T0;
  let T1;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let t5;
  let t6;
  let t7;
  if ($[0] !== renderImage || $[1] !== urls) {
    t7 = /* @__PURE__ */ Symbol.for("react.early_return_sentinel");
    bb0: {
      const filtered = urls.filter(_temp$4);
      if (filtered.length === 0) {
        t7 = null;
        break bb0;
      }
      const allowMove = filtered.length > 1;
      T1 = ImageOverlayEditorStyle;
      t6 = "GDG-default-image-overlay-editor";
      T0 = Carousel;
      t0 = allowMove;
      t1 = false;
      t2 = allowMove;
      t3 = allowMove;
      t4 = allowMove;
      let t82;
      if ($[12] !== renderImage) {
        t82 = (url) => {
          var _renderImage;
          const innerContent = (_renderImage = renderImage === null || renderImage === void 0 ? void 0 : renderImage(url)) !== null && _renderImage !== void 0 ? _renderImage : /* @__PURE__ */ jsx("img", { draggable: false, src: url });
          return /* @__PURE__ */ jsx("div", { className: "gdg-centering-container", children: innerContent }, url);
        };
        $[12] = renderImage;
        $[13] = t82;
      } else {
        t82 = $[13];
      }
      t5 = filtered.map(t82);
    }
    $[0] = renderImage;
    $[1] = urls;
    $[2] = T0;
    $[3] = T1;
    $[4] = t0;
    $[5] = t1;
    $[6] = t2;
    $[7] = t3;
    $[8] = t4;
    $[9] = t5;
    $[10] = t6;
    $[11] = t7;
  } else {
    T0 = $[2];
    T1 = $[3];
    t0 = $[4];
    t1 = $[5];
    t2 = $[6];
    t3 = $[7];
    t4 = $[8];
    t5 = $[9];
    t6 = $[10];
    t7 = $[11];
  }
  if (t7 !== /* @__PURE__ */ Symbol.for("react.early_return_sentinel")) {
    return t7;
  }
  let t8;
  if ($[14] !== T0 || $[15] !== t0 || $[16] !== t1 || $[17] !== t2 || $[18] !== t3 || $[19] !== t4 || $[20] !== t5) {
    t8 = /* @__PURE__ */ jsx(T0, { showArrows: t0, showThumbs: t1, swipeable: t2, emulateTouch: t3, infiniteLoop: t4, children: t5 });
    $[14] = T0;
    $[15] = t0;
    $[16] = t1;
    $[17] = t2;
    $[18] = t3;
    $[19] = t4;
    $[20] = t5;
    $[21] = t8;
  } else {
    t8 = $[21];
  }
  let t9;
  if ($[22] !== canWrite || $[23] !== onEditClick) {
    t9 = canWrite && onEditClick && /* @__PURE__ */ jsx("button", { className: "gdg-edit-icon", onClick: onEditClick, children: /* @__PURE__ */ jsx(EditPencil, {}) });
    $[22] = canWrite;
    $[23] = onEditClick;
    $[24] = t9;
  } else {
    t9 = $[24];
  }
  let t10;
  if ($[25] !== T1 || $[26] !== t6 || $[27] !== t8 || $[28] !== t9) {
    t10 = /* @__PURE__ */ jsxs(T1, { "data-testid": t6, children: [
      t8,
      t9
    ] });
    $[25] = T1;
    $[26] = t6;
    $[27] = t8;
    $[28] = t9;
    $[29] = t10;
  } else {
    t10 = $[29];
  }
  return t10;
};
function _temp$4(u) {
  return u !== "";
}
const MarkdownContainer = /* @__PURE__ */ styled_default("div")({
  name: "MarkdownContainer",
  class: "gdg-mtzwuwq",
  propsAsIs: false
});
class MarkdownDiv extends React__default.PureComponent {
  constructor() {
    super(...arguments);
    this.targetElement = null;
    this.containerRefHook = (element) => {
      this.targetElement = element;
      this.renderMarkdownIntoDiv();
    };
  }
  renderMarkdownIntoDiv() {
    const {
      targetElement,
      props
    } = this;
    if (targetElement === null) return;
    const {
      contents,
      createNode
    } = props;
    const innerHTML = marked(contents);
    const childRange = document.createRange();
    childRange.selectNodeContents(targetElement);
    childRange.deleteContents();
    let newChild = createNode === null || createNode === void 0 ? void 0 : createNode(innerHTML);
    if (newChild === void 0) {
      const childDoc = document.createElement("template");
      childDoc.innerHTML = innerHTML;
      newChild = childDoc.content;
    }
    targetElement.append(newChild);
    const tags = targetElement.getElementsByTagName("a");
    for (const tag of tags) {
      tag.target = "_blank";
      tag.rel = "noreferrer noopener";
    }
  }
  render() {
    this.renderMarkdownIntoDiv();
    return /* @__PURE__ */ jsx(MarkdownContainer, { ref: this.containerRefHook });
  }
}
const InputBox = /* @__PURE__ */ styled_default("textarea")({
  name: "InputBox",
  class: "gdg-i148s8c4",
  propsAsIs: false
});
const ShadowBox = /* @__PURE__ */ styled_default("div")({
  name: "ShadowBox",
  class: "gdg-s10d020h",
  propsAsIs: false
});
const GrowingEntryStyle = /* @__PURE__ */ styled_default("div")({
  name: "GrowingEntryStyle",
  class: "gdg-gkc0k7i",
  propsAsIs: false
});
class ClickOutsideContainer extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.wrapperRef = React.createRef();
    this.clickOutside = (event) => {
      if (this.props.isOutsideClick && !this.props.isOutsideClick(event)) {
        return;
      }
      if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target)) {
        let node = event.target;
        while (node !== null) {
          if (node.classList.contains("click-outside-ignore")) {
            return;
          }
          node = node.parentElement;
        }
        this.props.onClickOutside();
      }
    };
  }
  componentDidMount() {
    var _this$props$customEve;
    const eventTarget = (_this$props$customEve = this.props.customEventTarget) !== null && _this$props$customEve !== void 0 ? _this$props$customEve : document;
    eventTarget.addEventListener("pointerdown", this.clickOutside, true);
    eventTarget.addEventListener("contextmenu", this.clickOutside, true);
  }
  componentWillUnmount() {
    var _this$props$customEve2;
    const eventTarget = (_this$props$customEve2 = this.props.customEventTarget) !== null && _this$props$customEve2 !== void 0 ? _this$props$customEve2 : document;
    eventTarget.removeEventListener("pointerdown", this.clickOutside, true);
    eventTarget.removeEventListener("contextmenu", this.clickOutside, true);
  }
  render() {
    const {
      onClickOutside,
      isOutsideClick,
      customEventTarget,
      ...rest
    } = this.props;
    return /* @__PURE__ */ jsx("div", { ...rest, ref: this.wrapperRef, children: this.props.children });
  }
}
const cache = {};
let div = null;
function createDiv() {
  const d2 = document.createElement("div");
  d2.style.opacity = "0";
  d2.style.pointerEvents = "none";
  d2.style.position = "fixed";
  document.body.append(d2);
  return d2;
}
function parseToRgba(color) {
  const normalizedColor = color.toLowerCase().trim();
  if (cache[normalizedColor] !== void 0) return cache[normalizedColor];
  div = div || createDiv();
  div.style.color = "#000";
  div.style.color = normalizedColor;
  const control = getComputedStyle(div).color;
  div.style.color = "#fff";
  div.style.color = normalizedColor;
  const computedColor = getComputedStyle(div).color;
  if (computedColor !== control) return [0, 0, 0, 1];
  let result = computedColor.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  if (result.length < 4) {
    result.push(1);
  }
  result = result.map((x) => {
    const isNaN2 = Number.isNaN(x);
    if (process.env.NODE_ENV !== "production" && isNaN2) {
      console.warn("Could not parse color", color);
    }
    return isNaN2 ? 0 : x;
  });
  cache[normalizedColor] = result;
  return result;
}
function withAlpha(color, alpha) {
  const [r, g, b2] = parseToRgba(color);
  return `rgba(${r}, ${g}, ${b2}, ${alpha})`;
}
const blendResultCache = /* @__PURE__ */ new Map();
function blendCache(color, background) {
  const cacheKey = `${color}-${background}`;
  const maybe2 = blendResultCache.get(cacheKey);
  if (maybe2 !== void 0) return maybe2;
  const result = blend(color, background);
  blendResultCache.set(cacheKey, result);
  return result;
}
function blend(color, background) {
  if (background === void 0) return color;
  const [r, g, b2, a] = parseToRgba(color);
  if (a === 1) return color;
  const [br, bg, bb, ba] = parseToRgba(background);
  const ao = a + ba * (1 - a);
  const ro = (a * r + ba * br * (1 - a)) / ao;
  const go = (a * g + ba * bg * (1 - a)) / ao;
  const bo = (a * b2 + ba * bb * (1 - a)) / ao;
  return `rgba(${ro}, ${go}, ${bo}, ${ao})`;
}
function interpolateColors(leftColor, rightColor, val) {
  if (val <= 0) return leftColor;
  if (val >= 1) return rightColor;
  const [lr, lg, lb, la] = parseToRgba(leftColor);
  const [rr, rg, rb, ra] = parseToRgba(rightColor);
  const leftR = lr * la;
  const leftG = lg * la;
  const leftB = lb * la;
  const rightR = rr * ra;
  const rightG = rg * ra;
  const rightB = rb * ra;
  const hScaler = val;
  const nScaler = 1 - val;
  const a = la * nScaler + ra * hScaler;
  if (a === 0) return "rgba(0, 0, 0, 0)";
  const r = Math.floor((leftR * nScaler + rightR * hScaler) / a);
  const g = Math.floor((leftG * nScaler + rightG * hScaler) / a);
  const b2 = Math.floor((leftB * nScaler + rightB * hScaler) / a);
  return `rgba(${r}, ${g}, ${b2}, ${a})`;
}
function getLuminance(color) {
  if (color === "transparent") return 0;
  function f(x) {
    const channel = x / 255;
    return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }
  const [r, g, b2] = parseToRgba(color);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b2);
}
function makeCSSStyle(theme) {
  var _theme$textGroupHeade, _theme$bgGroupHeader, _theme$bgGroupHeaderH, _theme$horizontalBord;
  return {
    "--gdg-accent-color": theme.accentColor,
    "--gdg-accent-fg": theme.accentFg,
    "--gdg-accent-light": theme.accentLight,
    "--gdg-text-dark": theme.textDark,
    "--gdg-text-medium": theme.textMedium,
    "--gdg-text-light": theme.textLight,
    "--gdg-text-bubble": theme.textBubble,
    "--gdg-bg-icon-header": theme.bgIconHeader,
    "--gdg-fg-icon-header": theme.fgIconHeader,
    "--gdg-text-header": theme.textHeader,
    "--gdg-text-group-header": (_theme$textGroupHeade = theme.textGroupHeader) !== null && _theme$textGroupHeade !== void 0 ? _theme$textGroupHeade : theme.textHeader,
    "--gdg-bg-group-header": (_theme$bgGroupHeader = theme.bgGroupHeader) !== null && _theme$bgGroupHeader !== void 0 ? _theme$bgGroupHeader : theme.bgHeader,
    "--gdg-bg-group-header-hovered": (_theme$bgGroupHeaderH = theme.bgGroupHeaderHovered) !== null && _theme$bgGroupHeaderH !== void 0 ? _theme$bgGroupHeaderH : theme.bgHeaderHovered,
    "--gdg-text-header-selected": theme.textHeaderSelected,
    "--gdg-bg-cell": theme.bgCell,
    "--gdg-bg-cell-medium": theme.bgCellMedium,
    "--gdg-bg-header": theme.bgHeader,
    "--gdg-bg-header-has-focus": theme.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": theme.bgHeaderHovered,
    "--gdg-bg-bubble": theme.bgBubble,
    "--gdg-bg-bubble-selected": theme.bgBubbleSelected,
    "--gdg-bubble-height": `${theme.bubbleHeight}px`,
    "--gdg-bubble-padding": `${theme.bubblePadding}px`,
    "--gdg-bubble-margin": `${theme.bubbleMargin}px`,
    "--gdg-bg-search-result": theme.bgSearchResult,
    "--gdg-border-color": theme.borderColor,
    "--gdg-horizontal-border-color": (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor,
    "--gdg-drilldown-border": theme.drilldownBorder,
    "--gdg-link-color": theme.linkColor,
    "--gdg-cell-horizontal-padding": `${theme.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${theme.cellVerticalPadding}px`,
    "--gdg-header-font-style": theme.headerFontStyle,
    "--gdg-base-font-style": theme.baseFontStyle,
    "--gdg-marker-font-style": theme.markerFontStyle,
    "--gdg-font-family": theme.fontFamily,
    "--gdg-editor-font-size": theme.editorFontSize,
    "--gdg-checkbox-max-size": `${theme.checkboxMaxSize}px`,
    ...theme.resizeIndicatorColor === void 0 ? {} : {
      "--gdg-resize-indicator-color": theme.resizeIndicatorColor
    },
    ...theme.headerBottomBorderColor === void 0 ? {} : {
      "--gdg-header-bottom-border-color": theme.headerBottomBorderColor
    },
    ...theme.roundingRadius === void 0 ? {} : {
      "--gdg-rounding-radius": `${theme.roundingRadius}px`
    }
  };
}
const dataEditorBaseTheme = {
  accentColor: "#4F5DFF",
  accentFg: "#FFFFFF",
  accentLight: "rgba(62, 116, 253, 0.1)",
  textDark: "#313139",
  textMedium: "#737383",
  textLight: "#B2B2C0",
  textBubble: "#313139",
  bgIconHeader: "#737383",
  fgIconHeader: "#FFFFFF",
  textHeader: "#313139",
  textGroupHeader: "#313139BB",
  textHeaderSelected: "#FFFFFF",
  bgCell: "#FFFFFF",
  bgCellMedium: "#FAFAFB",
  bgHeader: "#F7F7F8",
  bgHeaderHasFocus: "#E9E9EB",
  bgHeaderHovered: "#EFEFF1",
  bgBubble: "#EDEDF3",
  bgBubbleSelected: "#FFFFFF",
  bubbleHeight: 20,
  bubblePadding: 6,
  bubbleMargin: 4,
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#353fb5",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerIconSize: 18,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  markerFontStyle: "9px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  editorFontSize: "13px",
  lineHeight: 1.4,
  checkboxMaxSize: 18
};
function getDataEditorTheme() {
  return dataEditorBaseTheme;
}
const ThemeContext = React__default.createContext(dataEditorBaseTheme);
function useTheme() {
  return React__default.useContext(ThemeContext);
}
function mergeAndRealizeTheme(theme) {
  const merged = {
    ...theme
  };
  for (var _len = arguments.length, overlays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    overlays[_key - 1] = arguments[_key];
  }
  for (const overlay of overlays) {
    if (overlay !== void 0) {
      for (const key in overlay) {
        if (overlay.hasOwnProperty(key)) {
          if (key === "bgCell") {
            merged[key] = blend(overlay[key], merged[key]);
          } else {
            merged[key] = overlay[key];
          }
        }
      }
    }
  }
  if (merged.headerFontFull === void 0 || theme.fontFamily !== merged.fontFamily || theme.headerFontStyle !== merged.headerFontStyle) {
    merged.headerFontFull = `${merged.headerFontStyle} ${merged.fontFamily}`;
  }
  if (merged.baseFontFull === void 0 || theme.fontFamily !== merged.fontFamily || theme.baseFontStyle !== merged.baseFontStyle) {
    merged.baseFontFull = `${merged.baseFontStyle} ${merged.fontFamily}`;
  }
  if (merged.markerFontFull === void 0 || theme.fontFamily !== merged.fontFamily || theme.markerFontStyle !== merged.markerFontStyle) {
    merged.markerFontFull = `${merged.markerFontStyle} ${merged.fontFamily}`;
  }
  return merged;
}
const _exp2$1 = () => (p2) => p2.targetX;
const _exp3 = () => (p2) => p2.targetY;
const _exp4 = () => (p2) => p2.targetWidth;
const _exp5 = () => (p2) => p2.targetHeight;
const _exp6 = () => (p2) => p2.targetY + 10;
const _exp7 = () => (p2) => Math.max(0, (p2.targetHeight - 28) / 2);
const DataGridOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "DataGridOverlayEditorStyle",
  class: "gdg-dx5lyk9",
  propsAsIs: false,
  vars: {
    "dx5lyk9-0": [_exp3(), "px"],
    "dx5lyk9-1": [_exp2$1(), "px"],
    "dx5lyk9-2": [_exp4(), "px"],
    "dx5lyk9-3": [_exp5(), "px"],
    "dx5lyk9-4": [_exp6(), "px"],
    "dx5lyk9-5": [_exp7(), "px"]
  }
});
function useRefState() {
  const $ = compilerRuntimeExports.c(2);
  const [refState, setRefState] = React.useState();
  const t0 = refState !== null && refState !== void 0 ? refState : void 0;
  let t1;
  if ($[0] !== t0) {
    t1 = [t0, setRefState];
    $[0] = t0;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
}
function useStayOnScreen() {
  const $ = compilerRuntimeExports.c(12);
  const [ref, setRef] = useRefState();
  const [xOffset, setXOffset] = React.useState(0);
  const [isIntersecting, setIsIntersecting] = React.useState(true);
  let t0;
  let t1;
  if ($[0] !== ref) {
    t0 = () => {
      if (ref === void 0) {
        return;
      }
      if (!("IntersectionObserver" in window)) {
        return;
      }
      const observer = new IntersectionObserver((ents) => {
        if (ents.length === 0) {
          return;
        }
        setIsIntersecting(ents[0].isIntersecting);
      }, {
        threshold: 1
      });
      observer.observe(ref);
      return () => observer.disconnect();
    };
    t1 = [ref];
    $[0] = ref;
    $[1] = t0;
    $[2] = t1;
  } else {
    t0 = $[1];
    t1 = $[2];
  }
  React.useLayoutEffect(t0, t1);
  let t2;
  let t3;
  if ($[3] !== isIntersecting || $[4] !== ref) {
    t2 = () => {
      if (isIntersecting || ref === void 0) {
        return;
      }
      let rafHandle;
      const fn = () => {
        const {
          right: refRight
        } = ref.getBoundingClientRect();
        setXOffset((cv) => Math.min(cv + window.innerWidth - refRight - 10, 0));
        rafHandle = requestAnimationFrame(fn);
      };
      rafHandle = requestAnimationFrame(fn);
      return () => {
        if (rafHandle !== void 0) {
          cancelAnimationFrame(rafHandle);
        }
      };
    };
    t3 = [ref, isIntersecting];
    $[3] = isIntersecting;
    $[4] = ref;
    $[5] = t2;
    $[6] = t3;
  } else {
    t2 = $[5];
    t3 = $[6];
  }
  React.useEffect(t2, t3);
  const t4 = `translateX(${xOffset}px)`;
  let t5;
  if ($[7] !== t4) {
    t5 = {
      transform: t4
    };
    $[7] = t4;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  const style = t5;
  let t6;
  if ($[9] !== setRef || $[10] !== style) {
    t6 = {
      ref: setRef,
      style
    };
    $[9] = setRef;
    $[10] = style;
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  return t6;
}
const GhostModeContext = React.createContext({
  isGhostMode: false,
  ghostValue: ""
});
const DataGridOverlayEditor$1 = (p2) => {
  var _portalElementRef$cur, _bloom$, _bloom$2;
  const {
    target,
    content,
    onFinishEditing: onFinishEditingIn,
    forceEditMode,
    initialValue,
    imageEditorOverride,
    markdownDivCreateNode,
    highlight,
    className,
    theme,
    id,
    cell,
    bloom,
    portalElementRef,
    validateCell,
    getCellRenderer,
    provideEditor,
    isOutsideClick,
    customEventTarget,
    activation,
    ghostValue,
    isGhostMode
  } = p2;
  const [tempValue, setTempValueRaw] = React.useState(forceEditMode ? content : void 0);
  const lastValueRef = React.useRef(tempValue !== null && tempValue !== void 0 ? tempValue : content);
  lastValueRef.current = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [isValid, setIsValid] = React.useState(() => {
    if (validateCell === void 0) return true;
    return !(isEditableGridCell(content) && (validateCell === null || validateCell === void 0 ? void 0 : validateCell(cell, content, lastValueRef.current)) === false);
  });
  const onFinishEditing = React.useCallback((newCell, movement) => {
    onFinishEditingIn(isValid ? newCell : void 0, movement);
  }, [isValid, onFinishEditingIn]);
  const setTempValue = React.useCallback((newVal) => {
    if (validateCell !== void 0 && newVal !== void 0 && isEditableGridCell(newVal)) {
      const validResult = validateCell(cell, newVal, lastValueRef.current);
      if (validResult === false) {
        setIsValid(false);
      } else if (typeof validResult === "object") {
        newVal = validResult;
        setIsValid(true);
      } else {
        setIsValid(true);
      }
    }
    setTempValueRaw(newVal);
  }, [cell, validateCell]);
  const finished = React.useRef(false);
  const customMotion = React.useRef(void 0);
  const onClickOutside = React.useCallback(() => {
    onFinishEditing(tempValue, [0, 0]);
    finished.current = true;
  }, [tempValue, onFinishEditing]);
  const onEditorFinished = React.useCallback((newValue, movement_0) => {
    var _ref;
    console.log("[onEditorFinished] newValue:", newValue);
    console.log("[onEditorFinished] movement:", movement_0);
    console.log("[onEditorFinished] calling onFinishEditing");
    onFinishEditing(newValue, (_ref = movement_0 !== null && movement_0 !== void 0 ? movement_0 : customMotion.current) !== null && _ref !== void 0 ? _ref : [0, 0]);
    console.log("[onEditorFinished] onFinishEditing called");
    finished.current = true;
  }, [onFinishEditing]);
  const onKeyDown = React.useCallback(async (event) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    let save = false;
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 0];
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 1];
      save = true;
    } else if (event.key === "Tab") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [event.shiftKey ? -1 : 1, 0];
      save = true;
    }
    window.setTimeout(() => {
      if (!finished.current && customMotion.current !== void 0) {
        onFinishEditing(save ? tempValue : void 0, customMotion.current);
        finished.current = true;
      }
    }, 0);
  }, [onFinishEditing, tempValue]);
  const targetValue = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [editorProvider, useLabel] = React.useMemo(() => {
    var _getCellRenderer, _getCellRenderer$prov;
    if (isInnerOnlyCell(content)) return [];
    const cellWithLocation = {
      ...content,
      location: cell,
      activation
    };
    const external = provideEditor === null || provideEditor === void 0 ? void 0 : provideEditor(cellWithLocation);
    if (external !== void 0) return [external, false];
    return [(_getCellRenderer = getCellRenderer(content)) === null || _getCellRenderer === void 0 || (_getCellRenderer$prov = _getCellRenderer.provideEditor) === null || _getCellRenderer$prov === void 0 ? void 0 : _getCellRenderer$prov.call(_getCellRenderer, cellWithLocation), false];
  }, [cell, content, getCellRenderer, provideEditor, activation]);
  const {
    ref,
    style: stayOnScreenStyle
  } = useStayOnScreen();
  let pad = true;
  let editor;
  let style = true;
  let styleOverride;
  if (editorProvider !== void 0) {
    pad = editorProvider.disablePadding !== true;
    style = editorProvider.disableStyling !== true;
    const isObjectEditor = isObjectEditorCallbackResult(editorProvider);
    if (isObjectEditor) {
      styleOverride = editorProvider.styleOverride;
    }
    const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
    editor = /* @__PURE__ */ jsx(CustomEditor, { portalElementRef, isHighlighted: highlight, activation, onChange: setTempValue, value: targetValue, initialValue, onFinishedEditing: onEditorFinished, validatedSelection: isEditableGridCell(targetValue) ? targetValue.selectionRange : void 0, forceEditMode, target, imageEditorOverride, markdownDivCreateNode, isValid, theme });
  }
  styleOverride = {
    ...styleOverride,
    ...stayOnScreenStyle
  };
  const ghostModeContextValue = React.useMemo(() => ({
    isGhostMode: isGhostMode !== null && isGhostMode !== void 0 ? isGhostMode : false,
    ghostValue: ghostValue !== null && ghostValue !== void 0 ? ghostValue : ""
  }), [isGhostMode, ghostValue]);
  const portalElement = (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal");
  if (portalElement === null) {
    console.error('Cannot open Data Grid overlay editor, because portal not found. Please, either provide a portalElementRef or add `<div id="portal" />` as the last child of your `<body>`.');
    return null;
  }
  let classWrap = style ? "gdg-style" : "gdg-unstyle";
  if (!isValid) {
    classWrap += " gdg-invalid";
  }
  if (pad) {
    classWrap += " gdg-pad";
  }
  const bloomX = (_bloom$ = bloom === null || bloom === void 0 ? void 0 : bloom[0]) !== null && _bloom$ !== void 0 ? _bloom$ : 1;
  const bloomY = (_bloom$2 = bloom === null || bloom === void 0 ? void 0 : bloom[1]) !== null && _bloom$2 !== void 0 ? _bloom$2 : 1;
  return createPortal(/* @__PURE__ */ jsx(ThemeContext.Provider, { value: theme, children: /* @__PURE__ */ jsx(GhostModeContext.Provider, { value: ghostModeContextValue, children: /* @__PURE__ */ jsx(ClickOutsideContainer, { style: makeCSSStyle(theme), className, onClickOutside, isOutsideClick, customEventTarget, children: /* @__PURE__ */ jsx(DataGridOverlayEditorStyle, { ref, id, className: classWrap, style: isGhostMode ? {
    ...styleOverride,
    visibility: "hidden"
  } : styleOverride, as: useLabel === true ? "label" : void 0, targetX: target.x - bloomX, targetY: target.y - bloomY, targetWidth: target.width + bloomX * 2, targetHeight: target.height + bloomY * 2, children: /* @__PURE__ */ jsx("div", { className: "gdg-clip-region", onKeyDown, children: editor }) }) }) }) }), portalElement);
};
const dataGridOverlayEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GhostModeContext,
  default: DataGridOverlayEditor$1
}, Symbol.toStringTag, { value: "Module" }));
let globalInputID = 0;
const GrowingEntry = (props) => {
  const {
    placeholder,
    value,
    onKeyDown,
    highlight,
    altNewline,
    validatedSelection,
    autoFocus: _autoFocus,
    ...rest
  } = props;
  const {
    onChange,
    className
  } = rest;
  const inputRef = React.useRef(null);
  const {
    isGhostMode,
    ghostValue
  } = React.useContext(GhostModeContext);
  const useText = isGhostMode && ghostValue ? ghostValue : value !== null && value !== void 0 ? value : "";
  assert(onChange !== void 0, "GrowingEntry must be a controlled input area");
  const [inputID] = React.useState(() => "input-box-" + (globalInputID = (globalInputID + 1) % 1e7));
  React.useEffect(() => {
    if (isGhostMode) return;
    const ta = inputRef.current;
    if (ta === null) return;
    if (ta.disabled) return;
    const length = useText.toString().length;
    ta.focus();
    ta.setSelectionRange(highlight ? 0 : length, length);
  }, [isGhostMode]);
  React.useLayoutEffect(() => {
    if (validatedSelection !== void 0) {
      var _inputRef$current;
      const range2 = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range2[0], range2[1]);
    }
  }, [validatedSelection]);
  const onKeyDownInner = React.useCallback((e) => {
    if (e.key === "Enter" && e.shiftKey && altNewline === true) {
      return;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  }, [altNewline, onKeyDown]);
  const inputStyle = isGhostMode ? {
    visibility: "hidden"
  } : void 0;
  return /* @__PURE__ */ jsxs(GrowingEntryStyle, { className: "gdg-growing-entry", children: [
    /* @__PURE__ */ jsx(ShadowBox, { className, children: useText + "\n" }),
    /* @__PURE__ */ jsx(InputBox, { ...rest, className: (className !== null && className !== void 0 ? className : "") + " gdg-input", id: inputID, ref: inputRef, onKeyDown: onKeyDownInner, value: useText, placeholder, dir: "auto", style: inputStyle })
  ] });
};
var d = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
function v() {
  d.clear(), z.clear(), b.clear();
}
function w(l, s, e, c, t) {
  var n, r, o;
  let f = 0, a = {};
  for (let i of l) f += (n = e.get(i)) != null ? n : t, a[i] = ((r = a[i]) != null ? r : 0) + 1;
  let g = s - f;
  for (let i of Object.keys(a)) {
    let m = a[i], u = (o = e.get(i)) != null ? o : t, h = u * m / f, M = g * h * c / m, C = u + M;
    e.set(i, C);
  }
}
function R(l, s) {
  var n;
  let e = /* @__PURE__ */ new Map(), c = 0;
  for (let r of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-+=?") {
    let o = l.measureText(r).width;
    e.set(r, o), c += o;
  }
  let t = c / e.size, f = 3, a = (s / t + f) / (f + 1), g = e.keys();
  for (let r of g) e.set(r, ((n = e.get(r)) != null ? n : t) * a);
  return e;
}
function p(l, s, e, c) {
  var g, n;
  let t = b.get(e);
  if (c && t !== void 0 && t.count > 2e4) {
    let r = z.get(e);
    if (r === void 0 && (r = R(l, t.size), z.set(e, r)), t.count > 5e5) {
      let i = 0;
      for (let m of s) i += (g = r.get(m)) != null ? g : t.size;
      return i * 1.01;
    }
    let o = l.measureText(s);
    return w(s, o.width, r, Math.max(0.05, 1 - t.count / 2e5), t.size), b.set(e, { count: t.count + s.length, size: t.size }), o.width;
  }
  let f = l.measureText(s), a = f.width / s.length;
  if (((n = t == null ? void 0 : t.count) != null ? n : 0) > 2e4) return f.width;
  if (t === void 0) b.set(e, { count: s.length, size: a });
  else {
    let r = a - t.size, o = s.length / (t.count + s.length), i = t.size + r * o;
    b.set(e, { count: t.count + s.length, size: i });
  }
  return f.width;
}
function T(l, s, e, c, t, f, a, g) {
  if (s.length <= 1) return s.length;
  if (t < e) return -1;
  let n = Math.floor(e / t * f), r = p(l, s.slice(0, Math.max(0, n)), c, a);
  if (r !== e) if (r < e) {
    for (; r < e; ) n++, r = p(l, s.slice(0, Math.max(0, n)), c, a);
    n--;
  } else for (; r > e; ) {
    let i = s.lastIndexOf(" ", n - 1);
    i > 0 ? n = i : n--, r = p(l, s.slice(0, Math.max(0, n)), c, a);
  }
  if (s[n] !== " ") {
    let i = 0;
    i = s.lastIndexOf(" ", n);
    i > 0 && (n = i);
  }
  return n;
}
function _(l, s, e, c, t, f) {
  let a = `${s}_${e}_${c}px`, g = d.get(a);
  if (g !== void 0) return g;
  if (c <= 0) return [];
  let n = [], r = s.split(`
`), o = b.get(e), i = o === void 0 ? s.length : c / o.size * 1.5, m = t && o !== void 0 && o.count > 2e4;
  for (let u of r) {
    let h = p(l, u.slice(0, Math.max(0, i)), e, m), M = Math.min(u.length, i);
    if (h <= c) n.push(u);
    else {
      for (; h > c; ) {
        let C = T(l, u, c, e, h, M, m), k = u.slice(0, Math.max(0, C));
        u = u.slice(k.length), n.push(k), h = p(l, u.slice(0, Math.max(0, i)), e, m), M = Math.min(u.length, i);
      }
      h > 0 && n.push(u);
    }
  }
  return n = n.map((u, h) => h === 0 ? u.trimEnd() : u.trim()), d.set(a, n), d.size > 500 && d.delete(d.keys().next().value), n;
}
function useMappedColumns(columns, freezeColumns) {
  const $ = compilerRuntimeExports.c(5);
  let t0;
  if ($[0] !== columns || $[1] !== freezeColumns) {
    let t1;
    if ($[3] !== freezeColumns) {
      t1 = (c, i) => ({
        group: c.group,
        grow: c.grow,
        hasMenu: c.hasMenu,
        icon: c.icon,
        id: c.id,
        menuIcon: c.menuIcon,
        overlayIcon: c.overlayIcon,
        sourceIndex: i,
        sticky: i < freezeColumns,
        indicatorIcon: c.indicatorIcon,
        style: c.style,
        themeOverride: c.themeOverride,
        title: c.title,
        trailingRowOptions: c.trailingRowOptions,
        width: c.width,
        growOffset: c.growOffset,
        rowMarker: c.rowMarker,
        rowMarkerChecked: c.rowMarkerChecked,
        headerRowMarkerTheme: c.headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible: c.headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled: c.headerRowMarkerDisabled,
        rowGroupBorder: c.rowGroupBorder,
        required: c.required
      });
      $[3] = freezeColumns;
      $[4] = t1;
    } else {
      t1 = $[4];
    }
    t0 = columns.map(t1);
    $[0] = columns;
    $[1] = freezeColumns;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  return t0;
}
function gridSelectionHasItem(sel, item) {
  const [col, row] = item;
  if (sel.columns.hasIndex(col) || sel.rows.hasIndex(row)) return true;
  if (sel.current !== void 0) {
    if (itemsAreEqual(sel.current.cell, item)) return true;
    const toCheck = [sel.current.range, ...sel.current.rangeStack];
    for (const r of toCheck) {
      if (col >= r.x && col < r.x + r.width && row >= r.y && row < r.y + r.height) return true;
    }
  }
  return false;
}
function getGroupName(group, level) {
  if (group === void 0) return "";
  if (typeof group === "string") return group;
  if (level !== void 0 && level >= 0 && level < group.length) {
    return group[level];
  }
  return group.length > 0 ? group[group.length - 1] : "";
}
function getGroupAtLevel(group, level, totalLevels) {
  if (group === void 0) return void 0;
  if (typeof group === "string") {
    return level === totalLevels - 1 ? group : void 0;
  }
  return level < group.length ? group[level] : void 0;
}
function isGroupEqual(left, right) {
  const leftStr = getGroupName(left);
  const rightStr = getGroupName(right);
  return leftStr === rightStr;
}
function isGroupEqualAtLevel(left, right, level, totalLevels) {
  for (let l = 0; l <= level; l++) {
    var _getGroupAtLevel, _getGroupAtLevel2;
    const leftStr = (_getGroupAtLevel = getGroupAtLevel(left, l, totalLevels)) !== null && _getGroupAtLevel !== void 0 ? _getGroupAtLevel : "";
    const rightStr = (_getGroupAtLevel2 = getGroupAtLevel(right, l, totalLevels)) !== null && _getGroupAtLevel2 !== void 0 ? _getGroupAtLevel2 : "";
    if (leftStr !== rightStr) {
      return false;
    }
  }
  return true;
}
function cellIsSelected(location, cell, selection) {
  if (selection.current === void 0) return false;
  if (location[1] !== selection.current.cell[1]) return false;
  if (cell.span === void 0) {
    return selection.current.cell[0] === location[0];
  }
  return selection.current.cell[0] >= cell.span[0] && selection.current.cell[0] <= cell.span[1];
}
function itemIsInRect(location, rect) {
  const [x, y] = location;
  return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}
function itemsAreEqual(a, b2) {
  return (a === null || a === void 0 ? void 0 : a[0]) === (b2 === null || b2 === void 0 ? void 0 : b2[0]) && (a === null || a === void 0 ? void 0 : a[1]) === (b2 === null || b2 === void 0 ? void 0 : b2[1]);
}
function rectBottomRight(rect) {
  return [rect.x + rect.width - 1, rect.y + rect.height - 1];
}
function cellIsInRect(location, cell, rect) {
  const startX = rect.x;
  const endX = rect.x + rect.width - 1;
  const startY = rect.y;
  const endY = rect.y + rect.height - 1;
  const [cellCol, cellRow] = location;
  if (cellRow < startY || cellRow > endY) return false;
  if (cell.span === void 0) {
    return cellCol >= startX && cellCol <= endX;
  }
  const [spanStart, spanEnd] = cell.span;
  return spanStart >= startX && spanStart <= endX || spanEnd >= startX && spanStart <= endX || spanStart < startX && spanEnd > endX;
}
function cellIsInRange(location, cell, selection, includeSingleSelection) {
  let result = 0;
  if (selection.current === void 0) return result;
  const range2 = selection.current.range;
  if ((includeSingleSelection || range2.height * range2.width > 1) && cellIsInRect(location, cell, range2)) {
    result++;
  }
  for (const r of selection.current.rangeStack) {
    if (cellIsInRect(location, cell, r)) {
      result++;
    }
  }
  return result;
}
function remapForDnDState(columns, dndState) {
  let mappedCols = columns;
  if (dndState !== void 0) {
    let writable = [...columns];
    const temp = mappedCols[dndState.src];
    if (dndState.src > dndState.dest) {
      writable.splice(dndState.src, 1);
      writable.splice(dndState.dest, 0, temp);
    } else {
      writable.splice(dndState.dest + 1, 0, temp);
      writable.splice(dndState.src, 1);
    }
    writable = writable.map((c, i) => ({
      ...c,
      sticky: columns[i].sticky
    }));
    mappedCols = writable;
  }
  return mappedCols;
}
function getStickyWidth(columns, dndState) {
  let result = 0;
  const remapped = remapForDnDState(columns, dndState);
  for (let i = 0; i < remapped.length; i++) {
    const c = remapped[i];
    if (c.sticky) result += c.width;
    else break;
  }
  return result;
}
function getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) {
  if (typeof getRowHeight === "number") {
    return freezeTrailingRows * getRowHeight;
  } else {
    let result = 0;
    for (let i = rows - freezeTrailingRows; i < rows; i++) {
      result += getRowHeight(i);
    }
    return result;
  }
}
function getEffectiveColumns(columns, cellXOffset, width, dndState, tx) {
  const mappedCols = remapForDnDState(columns, dndState);
  const sticky = [];
  for (const c of mappedCols) {
    if (c.sticky) {
      sticky.push(c);
    } else {
      break;
    }
  }
  if (sticky.length > 0) {
    for (const c of sticky) {
      width -= c.width;
    }
  }
  let endIndex = cellXOffset;
  let curX = tx !== null && tx !== void 0 ? tx : 0;
  while (curX <= width && endIndex < mappedCols.length) {
    curX += mappedCols[endIndex].width;
    endIndex++;
  }
  for (let i = cellXOffset; i < endIndex; i++) {
    const c = mappedCols[i];
    if (!c.sticky) {
      sticky.push(c);
    }
  }
  return sticky;
}
function getColumnIndexForX(targetX, effectiveColumns, translateX) {
  let x = 0;
  for (const c of effectiveColumns) {
    const cx3 = c.sticky ? x : x + (translateX !== null && translateX !== void 0 ? translateX : 0);
    if (targetX <= cx3 + c.width) {
      return c.sourceIndex;
    }
    x += c.width;
  }
  return -1;
}
function getRowIndexForY(targetY, height, hasGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, groupLevels, groupHeaderHeights) {
  const effectiveGroupLevels = groupLevels !== null && groupLevels !== void 0 ? groupLevels : hasGroups ? 1 : 0;
  const effectiveGroupHeaderHeights = groupHeaderHeights !== null && groupHeaderHeights !== void 0 ? groupHeaderHeights : hasGroups ? [groupHeaderHeight] : [];
  const totalGroupHeaderHeight = effectiveGroupHeaderHeights.reduce((a, b2) => a + b2, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  if (hasGroups && effectiveGroupLevels > 0) {
    let accumulatedHeight = 0;
    for (let level = 0; level < effectiveGroupLevels; level++) {
      var _effectiveGroupHeader;
      accumulatedHeight += (_effectiveGroupHeader = effectiveGroupHeaderHeights[level]) !== null && _effectiveGroupHeader !== void 0 ? _effectiveGroupHeader : 0;
      if (targetY <= accumulatedHeight) {
        return -(level + 2);
      }
    }
  }
  if (targetY <= totalHeaderHeight) return -1;
  let y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    const row = rows - 1 - fr;
    const rh = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
    y -= rh;
    if (targetY >= y) {
      return row;
    }
  }
  const effectiveRows = rows - freezeTrailingRows;
  const ty = targetY - (translateY !== null && translateY !== void 0 ? translateY : 0);
  if (typeof rowHeight === "number") {
    const target = Math.floor((ty - totalHeaderHeight) / rowHeight) + cellYOffset;
    if (target >= effectiveRows) return void 0;
    return target;
  } else {
    let curY = totalHeaderHeight;
    for (let i = cellYOffset; i < effectiveRows; i++) {
      const rh = rowHeight(i);
      if (ty <= curY + rh) return i;
      curY += rh;
    }
    return void 0;
  }
}
let metricsSize = 0;
let metricsCache = {};
const isSSR = typeof window === "undefined";
async function clearCacheOnLoad() {
  var _document;
  if (isSSR || ((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === void 0) return;
  await document.fonts.ready;
  metricsSize = 0;
  metricsCache = {};
  v();
}
void clearCacheOnLoad();
function makeCacheKey(s, ctx, baseline, font) {
  return `${s}_${font !== null && font !== void 0 ? font : ctx === null || ctx === void 0 ? void 0 : ctx.font}_${baseline}`;
}
function measureTextCached(s, ctx, font) {
  let baseline = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "middle";
  const key = makeCacheKey(s, ctx, baseline, font);
  let metrics = metricsCache[key];
  if (metrics === void 0) {
    metrics = ctx.measureText(s);
    metricsCache[key] = metrics;
    metricsSize++;
  }
  if (metricsSize > 1e4) {
    metricsCache = {};
    metricsSize = 0;
  }
  return metrics;
}
function getMeasuredTextCache(s, font) {
  const key = makeCacheKey(s, void 0, "middle", font);
  return metricsCache[key];
}
function getMiddleCenterBias(ctx, font) {
  if (typeof font !== "string") {
    font = font.baseFontFull;
  }
  return getMiddleCenterBiasInner(ctx, font);
}
function loadMetric(ctx, baseline) {
  const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ctx.save();
  ctx.textBaseline = baseline;
  const result = ctx.measureText(sample);
  ctx.restore();
  return result;
}
const biasCache = [];
function getMiddleCenterBiasInner(ctx, font) {
  for (const x of biasCache) {
    if (x.key === font) return x.val;
  }
  const alphabeticMetrics = loadMetric(ctx, "alphabetic");
  const middleMetrics = loadMetric(ctx, "middle");
  const bias = -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) + alphabeticMetrics.actualBoundingBoxAscent / 2;
  biasCache.push({
    key: font,
    val: bias
  });
  return bias;
}
function drawLastUpdateUnderlay(args, lastUpdate, frameTime, lastPrep, isLastCol, isLastRow) {
  const {
    ctx,
    rect,
    theme
  } = args;
  let progress = Number.MAX_SAFE_INTEGER;
  const animTime = 500;
  if (lastUpdate !== void 0) {
    progress = frameTime - lastUpdate;
    if (progress < animTime) {
      const fade = 1 - progress / animTime;
      ctx.globalAlpha = fade;
      ctx.fillStyle = theme.bgSearchResult;
      ctx.fillRect(rect.x + 1, rect.y + 1, rect.width - (isLastCol ? 2 : 1), rect.height - (isLastRow ? 2 : 1));
      ctx.globalAlpha = 1;
      if (lastPrep !== void 0) {
        lastPrep.fillStyle = theme.bgSearchResult;
      }
    }
  }
  return progress < animTime;
}
function prepTextCell(args, lastPrep, overrideColor) {
  const {
    ctx,
    theme
  } = args;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  const newFill = overrideColor !== null && overrideColor !== void 0 ? overrideColor : theme.textDark;
  if (newFill !== result.fillStyle) {
    ctx.fillStyle = newFill;
    result.fillStyle = newFill;
  }
  return result;
}
function drawTextCellExternal(args, data, contentAlign, allowWrapping, hyperWrapping) {
  const {
    rect,
    ctx,
    theme
  } = args;
  ctx.fillStyle = theme.textDark;
  drawTextCell({
    ctx,
    rect,
    theme
  }, data, contentAlign, allowWrapping, hyperWrapping);
}
function drawSingleTextLine(ctx, data, x, y, w2, h, bias, theme, contentAlign) {
  if (contentAlign === "right") {
    ctx.fillText(data, x + w2 - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
  } else if (contentAlign === "center") {
    ctx.fillText(data, x + w2 / 2, y + h / 2 + bias);
  } else {
    ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
  }
}
function getEmHeight(ctx, fontStyle) {
  const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle);
  return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}
function truncateString(data, w2) {
  data = String(data);
  if (data.includes("\n")) {
    data = data.split(/\r?\n/, 1)[0];
  }
  const max = w2 / 4;
  if (data.length > max) {
    data = data.slice(0, max);
  }
  return data;
}
function drawMultiLineText(ctx, data, x, y, w2, h, bias, theme, contentAlign, hyperWrapping) {
  const fontStyle = theme.baseFontFull;
  const split = _(ctx, data, fontStyle, w2 - theme.cellHorizontalPadding * 2, hyperWrapping !== null && hyperWrapping !== void 0 ? hyperWrapping : false);
  const emHeight = getEmHeight(ctx, fontStyle);
  const lineHeight = theme.lineHeight * emHeight;
  const actualHeight = emHeight + lineHeight * (split.length - 1);
  const mustClip = actualHeight + theme.cellVerticalPadding > h;
  if (mustClip) {
    ctx.save();
    ctx.rect(x, y, w2, h);
    ctx.clip();
  }
  const optimalY = y + h / 2 - actualHeight / 2;
  let drawY = Math.max(y + theme.cellVerticalPadding, optimalY);
  for (const line of split) {
    drawSingleTextLine(ctx, line, x, drawY, w2, emHeight, bias, theme, contentAlign);
    drawY += lineHeight;
    if (drawY > y + h) break;
  }
  if (mustClip) {
    ctx.restore();
  }
}
function drawTextCell(args, data, contentAlign, allowWrapping, hyperWrapping) {
  const {
    ctx,
    rect,
    theme
  } = args;
  const {
    x,
    y,
    width: w2,
    height: h
  } = rect;
  allowWrapping = allowWrapping !== null && allowWrapping !== void 0 ? allowWrapping : false;
  if (!allowWrapping) {
    data = truncateString(data, w2);
  }
  const bias = getMiddleCenterBias(ctx, theme);
  const isRtl = direction(data) === "rtl";
  if (contentAlign === void 0 && isRtl) {
    contentAlign = "right";
  }
  if (isRtl) {
    ctx.direction = "rtl";
  }
  if (data.length > 0) {
    let changed = false;
    if (contentAlign === "right") {
      ctx.textAlign = "right";
      changed = true;
    } else if (contentAlign !== void 0 && contentAlign !== "left") {
      ctx.textAlign = contentAlign;
      changed = true;
    }
    if (!allowWrapping) {
      drawSingleTextLine(ctx, data, x, y, w2, h, bias, theme, contentAlign);
    } else {
      drawMultiLineText(ctx, data, x, y, w2, h, bias, theme, contentAlign, hyperWrapping);
    }
    if (changed) {
      ctx.textAlign = "start";
    }
    if (isRtl) {
      ctx.direction = "inherit";
    }
  }
}
function roundedRect(ctx, x, y, width, height, radius) {
  if (typeof radius === "number") {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  }
  radius = {
    tl: Math.max(0, Math.min(radius.tl, height / 2, width / 2)),
    tr: Math.max(0, Math.min(radius.tr, height / 2, width / 2)),
    bl: Math.max(0, Math.min(radius.bl, height / 2, width / 2)),
    br: Math.max(0, Math.min(radius.br, height / 2, width / 2))
  };
  ctx.moveTo(x + radius.tl, y);
  ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
  ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
  ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
  ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
function drawMenuDots(ctx, dotsX, dotsY) {
  const radius = 1.25;
  ctx.arc(dotsX, dotsY - radius * 3.5, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY + radius * 3.5, radius, 0, 2 * Math.PI, false);
}
function roundedPoly(ctx, points, radiusAll) {
  const asVec = function(p2, pp) {
    const vx = pp.x - p2.x;
    const vy = pp.y - p2.y;
    const vlen = Math.sqrt(vx * vx + vy * vy);
    const vnx = vx / vlen;
    const vny = vy / vlen;
    return {
      x: vx,
      y: pp.y - p2.y,
      len: vlen,
      nx: vnx,
      ny: vny,
      ang: Math.atan2(vny, vnx)
    };
  };
  let radius;
  const len = points.length;
  let p1 = points[len - 1];
  for (let i = 0; i < len; i++) {
    let p2 = points[i % len];
    const p3 = points[(i + 1) % len];
    const v1 = asVec(p2, p1);
    const v2 = asVec(p2, p3);
    const sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    const sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    let angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
    let radDirection = 1;
    let drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    radius = p2.radius !== void 0 ? p2.radius : radiusAll;
    const halfAngle = angle / 2;
    let lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
    let cRadius;
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    let x = p2.x + v2.nx * lenOut;
    let y = p2.y + v2.ny * lenOut;
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}
function computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights) {
  const result = {
    x: 0,
    y: totalHeaderHeight + translateY,
    width: 0,
    height: 0
  };
  const effectiveGroupLevels = groupLevels !== null && groupLevels !== void 0 ? groupLevels : groupHeaderHeight > 0 ? 1 : 0;
  const minValidRow = -(effectiveGroupLevels + 1);
  if (col >= mappedColumns.length || row >= rows || row < minValidRow || col < 0) {
    return result;
  }
  const effectiveGroupHeaderHeights = groupHeaderHeights !== null && groupHeaderHeights !== void 0 ? groupHeaderHeights : groupHeaderHeight > 0 ? [groupHeaderHeight] : [];
  const totalGroupHeaderHeight = effectiveGroupHeaderHeights.reduce((a, b2) => a + b2, 0);
  const headerHeight = totalHeaderHeight - totalGroupHeaderHeight;
  if (col >= freezeColumns) {
    const dir = cellXOffset > col ? -1 : 1;
    const freezeWidth = getStickyWidth(mappedColumns);
    result.x += freezeWidth + translateX;
    for (let i = cellXOffset; i !== col; i += dir) {
      result.x += mappedColumns[dir === 1 ? i : i - 1].width * dir;
    }
  } else {
    for (let i = 0; i < col; i++) {
      result.x += mappedColumns[i].width;
    }
  }
  result.width = mappedColumns[col].width + 1;
  if (row === -1) {
    result.y = totalGroupHeaderHeight;
    result.height = headerHeight;
  } else if (row <= -2) {
    var _effectiveGroupHeader3;
    const level = -(row + 2);
    let levelY = 0;
    for (let i = 0; i < level; i++) {
      var _effectiveGroupHeader2;
      levelY += (_effectiveGroupHeader2 = effectiveGroupHeaderHeights[i]) !== null && _effectiveGroupHeader2 !== void 0 ? _effectiveGroupHeader2 : 0;
    }
    result.y = levelY;
    result.height = (_effectiveGroupHeader3 = effectiveGroupHeaderHeights[level]) !== null && _effectiveGroupHeader3 !== void 0 ? _effectiveGroupHeader3 : groupHeaderHeight;
    let start = col;
    const group = mappedColumns[col].group;
    const sticky = mappedColumns[col].sticky;
    while (start > 0 && isGroupEqualAtLevel(mappedColumns[start - 1].group, group, level, effectiveGroupLevels) && mappedColumns[start - 1].sticky === sticky) {
      const c = mappedColumns[start - 1];
      result.x -= c.width;
      result.width += c.width;
      start--;
    }
    let end = col;
    while (end + 1 < mappedColumns.length && isGroupEqualAtLevel(mappedColumns[end + 1].group, group, level, effectiveGroupLevels) && mappedColumns[end + 1].sticky === sticky) {
      const c = mappedColumns[end + 1];
      result.width += c.width;
      end++;
    }
    if (!sticky) {
      const freezeWidth = getStickyWidth(mappedColumns);
      const clip = result.x - freezeWidth;
      if (clip < 0) {
        result.x -= clip;
        result.width += clip;
      }
      if (result.x + result.width > width) {
        result.width = width - result.x;
      }
    }
  } else if (row >= rows - freezeTrailingRows) {
    let dy = rows - row;
    result.y = height;
    while (dy > 0) {
      const r = row + dy - 1;
      result.height = typeof rowHeight === "number" ? rowHeight : rowHeight(r);
      result.y -= result.height;
      dy--;
    }
    result.height += 1;
  } else {
    const dir = cellYOffset > row ? -1 : 1;
    if (typeof rowHeight === "number") {
      const delta = row - cellYOffset;
      result.y += delta * rowHeight;
    } else {
      for (let r = cellYOffset; r !== row; r += dir) {
        result.y += rowHeight(r) * dir;
      }
    }
    result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
  }
  return result;
}
const rowShift = 1 << 21;
function packColRowToNumber(col, row) {
  return (row + 2) * rowShift + col;
}
function unpackCol(packed) {
  return packed % rowShift;
}
function unpackRow(packed) {
  return Math.floor(packed / rowShift) - 2;
}
function unpackNumberToColRow(packed) {
  const col = unpackCol(packed);
  const row = unpackRow(packed);
  return [col, row];
}
class WindowingTrackerBase {
  constructor() {
    this.visibleWindow = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.freezeCols = 0;
    this.freezeRows = [];
    this.isInWindow = (packed) => {
      const col = unpackCol(packed);
      const row = unpackRow(packed);
      const w2 = this.visibleWindow;
      const colInWindow = col >= w2.x && col <= w2.x + w2.width || col < this.freezeCols;
      const rowInWindow = row >= w2.y && row <= w2.y + w2.height || this.freezeRows.includes(row);
      return colInWindow && rowInWindow;
    };
    this.clearOutOfWindow = void 0;
  }
  setWindow(newWindow, freezeCols, freezeRows) {
    if (this.visibleWindow.x === newWindow.x && this.visibleWindow.y === newWindow.y && this.visibleWindow.width === newWindow.width && this.visibleWindow.height === newWindow.height && this.freezeCols === freezeCols && deepEqual(this.freezeRows, freezeRows)) return;
    this.visibleWindow = newWindow;
    this.freezeCols = freezeCols;
    this.freezeRows = freezeRows;
    this.clearOutOfWindow();
  }
}
class RenderStateProvider extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.cache = /* @__PURE__ */ new Map();
    this.setValue = (location, state) => {
      this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };
    this.getValue = (location) => {
      return this.cache.get(packColRowToNumber(location[0], location[1]));
    };
    this.clearOutOfWindow = () => {
      for (const [key] of this.cache.entries()) {
        if (!this.isInWindow(key)) {
          this.cache.delete(key);
        }
      }
    };
  }
}
class CellSet {
  constructor() {
    let items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    this.cells = void 0;
    this.cells = new Set(items.map((x) => packColRowToNumber(x[0], x[1])));
  }
  add(cell) {
    this.cells.add(packColRowToNumber(cell[0], cell[1]));
  }
  has(cell) {
    if (cell === void 0) return false;
    return this.cells.has(packColRowToNumber(cell[0], cell[1]));
  }
  remove(cell) {
    this.cells.delete(packColRowToNumber(cell[0], cell[1]));
  }
  clear() {
    this.cells.clear();
  }
  get size() {
    return this.cells.size;
  }
  hasHeader() {
    for (const cellNumber of this.cells) {
      const row = unpackRow(cellNumber);
      if (row < 0) return true;
    }
    return false;
  }
  hasItemInRectangle(rect) {
    for (let row = rect.y; row < rect.y + rect.height; row++) {
      for (let col = rect.x; col < rect.x + rect.width; col++) {
        if (this.cells.has(packColRowToNumber(col, row))) {
          return true;
        }
      }
    }
    return false;
  }
  hasItemInRegion(rect) {
    for (const r of rect) {
      if (this.hasItemInRectangle(r)) {
        return true;
      }
    }
    return false;
  }
  *values() {
    for (const cellNumber of this.cells) {
      yield unpackNumberToColRow(cellNumber);
    }
  }
}
const defaultSize = 150;
function measureCell(ctx, cell, theme, getCellRenderer) {
  var _r$measure, _r$measure2;
  const r = getCellRenderer(cell);
  return (_r$measure = r === null || r === void 0 || (_r$measure2 = r.measure) === null || _r$measure2 === void 0 ? void 0 : _r$measure2.call(r, ctx, cell, theme)) !== null && _r$measure !== void 0 ? _r$measure : defaultSize;
}
function measureColumn(ctx, theme, c, colIndex, selectedData, minColumnWidth, maxColumnWidth, removeOutliers, getCellRenderer) {
  let max = 0;
  const sizes = selectedData === void 0 ? [] : selectedData.map((row) => {
    const r = measureCell(ctx, row[colIndex], theme, getCellRenderer);
    max = Math.max(max, r);
    return r;
  });
  if (sizes.length > 5 && removeOutliers) {
    max = 0;
    let sum = 0;
    for (const size of sizes) {
      sum += size;
    }
    const average = sum / sizes.length;
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] >= average * 2) {
        sizes[i] = 0;
      } else {
        max = Math.max(max, sizes[i]);
      }
    }
  }
  const currentFont = ctx.font;
  ctx.font = theme.headerFontFull;
  max = Math.max(max, ctx.measureText(c.title).width + theme.cellHorizontalPadding * 2 + (c.icon === void 0 ? 0 : 28));
  ctx.font = currentFont;
  const final = Math.max(Math.ceil(minColumnWidth), Math.min(Math.floor(maxColumnWidth), Math.ceil(max)));
  return {
    ...c,
    width: final
  };
}
function useColumnSizer(columns, rows, getCellsForSelection, clientWidth, minColumnWidth, maxColumnWidth, theme, getCellRenderer, abortController) {
  const rowsRef = React.useRef(rows);
  const getCellsForSelectionRef = React.useRef(getCellsForSelection);
  const themeRef = React.useRef(theme);
  rowsRef.current = rows;
  getCellsForSelectionRef.current = getCellsForSelection;
  themeRef.current = theme;
  const [canvas, ctx] = (() => {
    if (typeof window === "undefined") return [null, null];
    const offscreen = document.createElement("canvas");
    offscreen.style["display"] = "none";
    offscreen.style["opacity"] = "0";
    offscreen.style["position"] = "fixed";
    return [offscreen, offscreen.getContext("2d", {
      alpha: false
    })];
  })();
  React.useLayoutEffect(() => {
    if (canvas) document.documentElement.append(canvas);
    return () => {
      canvas === null || canvas === void 0 || canvas.remove();
    };
  }, [canvas]);
  const memoMap = React.useRef({});
  const lastColumns = React.useRef();
  const [selectedData, setSelectionData] = React.useState();
  React.useLayoutEffect(() => {
    const getCells = getCellsForSelectionRef.current;
    if (getCells === void 0 || columns.every(isSizedGridColumn)) return;
    let computeRows = Math.max(1, 10 - Math.floor(columns.length / 1e4));
    let tailRows = 0;
    if (computeRows < rowsRef.current && computeRows > 1) {
      computeRows--;
      tailRows = 1;
    }
    const computeArea = {
      x: 0,
      y: 0,
      width: columns.length,
      height: Math.min(rowsRef.current, computeRows)
    };
    const tailComputeArea = {
      x: 0,
      y: rowsRef.current - 1,
      width: columns.length,
      height: 1
    };
    const fn = async () => {
      const getResult = getCells(computeArea, abortController.signal);
      const tailGetResult = tailRows > 0 ? getCells(tailComputeArea, abortController.signal) : void 0;
      let toSet;
      if (typeof getResult === "object") {
        toSet = getResult;
      } else {
        toSet = await resolveCellsThunk(getResult);
      }
      if (tailGetResult !== void 0) {
        if (typeof tailGetResult === "object") {
          toSet = [...toSet, ...tailGetResult];
        } else {
          toSet = [...toSet, ...await resolveCellsThunk(tailGetResult)];
        }
      }
      lastColumns.current = columns;
      setSelectionData(toSet);
    };
    void fn();
  }, [abortController.signal, columns]);
  const getRaw = () => {
    if (columns.every(isSizedGridColumn)) {
      return columns;
    }
    if (ctx === null) {
      return columns.map((c) => {
        if (isSizedGridColumn(c)) return c;
        return {
          ...c,
          width: defaultSize
        };
      });
    }
    ctx.font = themeRef.current.baseFontFull;
    return columns.map((c_0, colIndex) => {
      if (isSizedGridColumn(c_0)) return c_0;
      if (memoMap.current[c_0.id] !== void 0) {
        return {
          ...c_0,
          width: memoMap.current[c_0.id]
        };
      }
      if (selectedData === void 0 || lastColumns.current !== columns || c_0.id === void 0) {
        return {
          ...c_0,
          width: defaultSize
        };
      }
      const r = measureColumn(ctx, theme, c_0, colIndex, selectedData, minColumnWidth, maxColumnWidth, true, getCellRenderer);
      memoMap.current[c_0.id] = r.width;
      return r;
    });
  };
  let result = getRaw();
  let totalWidth = 0;
  let totalGrow = 0;
  const distribute = [];
  for (const [i, c_1] of result.entries()) {
    totalWidth += c_1.width;
    if (c_1.grow !== void 0 && c_1.grow > 0) {
      totalGrow += c_1.grow;
      distribute.push(i);
    }
  }
  if (totalWidth < clientWidth && distribute.length > 0) {
    const writeable = [...result];
    const extra = clientWidth - totalWidth;
    let remaining = extra;
    for (let di = 0; di < distribute.length; di++) {
      var _result$i_0$grow;
      const i_0 = distribute[di];
      const weighted = ((_result$i_0$grow = result[i_0].grow) !== null && _result$i_0$grow !== void 0 ? _result$i_0$grow : 0) / totalGrow;
      const toAdd = di === distribute.length - 1 ? remaining : Math.min(remaining, Math.floor(extra * weighted));
      writeable[i_0] = {
        ...result[i_0],
        growOffset: toAdd,
        width: result[i_0].width + toAdd
      };
      remaining -= toAdd;
    }
    result = writeable;
  }
  return {
    sizedColumns: result,
    nonGrowWidth: totalWidth
  };
}
var _baseClamp;
var hasRequired_baseClamp;
function require_baseClamp() {
  if (hasRequired_baseClamp) return _baseClamp;
  hasRequired_baseClamp = 1;
  function baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== void 0) {
        number = number <= upper ? number : upper;
      }
      if (lower !== void 0) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }
  _baseClamp = baseClamp;
  return _baseClamp;
}
var clamp_1;
var hasRequiredClamp;
function requireClamp() {
  if (hasRequiredClamp) return clamp_1;
  hasRequiredClamp = 1;
  var baseClamp = require_baseClamp(), toNumber = requireToNumber();
  function clamp2(number, lower, upper) {
    if (upper === void 0) {
      upper = lower;
      lower = void 0;
    }
    if (upper !== void 0) {
      upper = toNumber(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== void 0) {
      lower = toNumber(lower);
      lower = lower === lower ? lower : 0;
    }
    return baseClamp(toNumber(number), lower, upper);
  }
  clamp_1 = clamp2;
  return clamp_1;
}
var clampExports = requireClamp();
const clamp$1 = /* @__PURE__ */ getDefaultExportFromCjs(clampExports);
var _setCacheAdd;
var hasRequired_setCacheAdd;
function require_setCacheAdd() {
  if (hasRequired_setCacheAdd) return _setCacheAdd;
  hasRequired_setCacheAdd = 1;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  _setCacheAdd = setCacheAdd;
  return _setCacheAdd;
}
var _setCacheHas;
var hasRequired_setCacheHas;
function require_setCacheHas() {
  if (hasRequired_setCacheHas) return _setCacheHas;
  hasRequired_setCacheHas = 1;
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  _setCacheHas = setCacheHas;
  return _setCacheHas;
}
var _SetCache;
var hasRequired_SetCache;
function require_SetCache() {
  if (hasRequired_SetCache) return _SetCache;
  hasRequired_SetCache = 1;
  var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  _SetCache = SetCache;
  return _SetCache;
}
var _baseFindIndex;
var hasRequired_baseFindIndex;
function require_baseFindIndex() {
  if (hasRequired_baseFindIndex) return _baseFindIndex;
  hasRequired_baseFindIndex = 1;
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  _baseFindIndex = baseFindIndex;
  return _baseFindIndex;
}
var _baseIsNaN;
var hasRequired_baseIsNaN;
function require_baseIsNaN() {
  if (hasRequired_baseIsNaN) return _baseIsNaN;
  hasRequired_baseIsNaN = 1;
  function baseIsNaN(value) {
    return value !== value;
  }
  _baseIsNaN = baseIsNaN;
  return _baseIsNaN;
}
var _strictIndexOf;
var hasRequired_strictIndexOf;
function require_strictIndexOf() {
  if (hasRequired_strictIndexOf) return _strictIndexOf;
  hasRequired_strictIndexOf = 1;
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  _strictIndexOf = strictIndexOf;
  return _strictIndexOf;
}
var _baseIndexOf;
var hasRequired_baseIndexOf;
function require_baseIndexOf() {
  if (hasRequired_baseIndexOf) return _baseIndexOf;
  hasRequired_baseIndexOf = 1;
  var baseFindIndex = require_baseFindIndex(), baseIsNaN = require_baseIsNaN(), strictIndexOf = require_strictIndexOf();
  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }
  _baseIndexOf = baseIndexOf;
  return _baseIndexOf;
}
var _arrayIncludes;
var hasRequired_arrayIncludes;
function require_arrayIncludes() {
  if (hasRequired_arrayIncludes) return _arrayIncludes;
  hasRequired_arrayIncludes = 1;
  var baseIndexOf = require_baseIndexOf();
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }
  _arrayIncludes = arrayIncludes;
  return _arrayIncludes;
}
var _arrayIncludesWith;
var hasRequired_arrayIncludesWith;
function require_arrayIncludesWith() {
  if (hasRequired_arrayIncludesWith) return _arrayIncludesWith;
  hasRequired_arrayIncludesWith = 1;
  function arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }
  _arrayIncludesWith = arrayIncludesWith;
  return _arrayIncludesWith;
}
var _cacheHas;
var hasRequired_cacheHas;
function require_cacheHas() {
  if (hasRequired_cacheHas) return _cacheHas;
  hasRequired_cacheHas = 1;
  function cacheHas(cache2, key) {
    return cache2.has(key);
  }
  _cacheHas = cacheHas;
  return _cacheHas;
}
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set) return _Set;
  hasRequired_Set = 1;
  var getNative = require_getNative(), root = require_root();
  var Set2 = getNative(root, "Set");
  _Set = Set2;
  return _Set;
}
var noop_1;
var hasRequiredNoop;
function requireNoop() {
  if (hasRequiredNoop) return noop_1;
  hasRequiredNoop = 1;
  function noop2() {
  }
  noop_1 = noop2;
  return noop_1;
}
var _setToArray;
var hasRequired_setToArray;
function require_setToArray() {
  if (hasRequired_setToArray) return _setToArray;
  hasRequired_setToArray = 1;
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  _setToArray = setToArray;
  return _setToArray;
}
var _createSet;
var hasRequired_createSet;
function require_createSet() {
  if (hasRequired_createSet) return _createSet;
  hasRequired_createSet = 1;
  var Set2 = require_Set(), noop2 = requireNoop(), setToArray = require_setToArray();
  var INFINITY = 1 / 0;
  var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values) {
    return new Set2(values);
  };
  _createSet = createSet;
  return _createSet;
}
var _baseUniq;
var hasRequired_baseUniq;
function require_baseUniq() {
  if (hasRequired_baseUniq) return _baseUniq;
  hasRequired_baseUniq = 1;
  var SetCache = require_SetCache(), arrayIncludes = require_arrayIncludes(), arrayIncludesWith = require_arrayIncludesWith(), cacheHas = require_cacheHas(), createSet = require_createSet(), setToArray = require_setToArray();
  var LARGE_ARRAY_SIZE = 200;
  function baseUniq(array, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }
    outer:
      while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
    return result;
  }
  _baseUniq = baseUniq;
  return _baseUniq;
}
var uniq_1;
var hasRequiredUniq;
function requireUniq() {
  if (hasRequiredUniq) return uniq_1;
  hasRequiredUniq = 1;
  var baseUniq = require_baseUniq();
  function uniq2(array) {
    return array && array.length ? baseUniq(array) : [];
  }
  uniq_1 = uniq2;
  return uniq_1;
}
var uniqExports = requireUniq();
const uniq = /* @__PURE__ */ getDefaultExportFromCjs(uniqExports);
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush) return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  _arrayPush = arrayPush;
  return _arrayPush;
}
var _isFlattenable;
var hasRequired_isFlattenable;
function require_isFlattenable() {
  if (hasRequired_isFlattenable) return _isFlattenable;
  hasRequired_isFlattenable = 1;
  var Symbol2 = require_Symbol(), isArguments = requireIsArguments(), isArray = requireIsArray();
  var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  _isFlattenable = isFlattenable;
  return _isFlattenable;
}
var _baseFlatten;
var hasRequired_baseFlatten;
function require_baseFlatten() {
  if (hasRequired_baseFlatten) return _baseFlatten;
  hasRequired_baseFlatten = 1;
  var arrayPush = require_arrayPush(), isFlattenable = require_isFlattenable();
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }
  _baseFlatten = baseFlatten;
  return _baseFlatten;
}
var flatten_1;
var hasRequiredFlatten;
function requireFlatten() {
  if (hasRequiredFlatten) return flatten_1;
  hasRequiredFlatten = 1;
  var baseFlatten = require_baseFlatten();
  function flatten2(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : [];
  }
  flatten_1 = flatten2;
  return flatten_1;
}
var flattenExports = requireFlatten();
const flatten = /* @__PURE__ */ getDefaultExportFromCjs(flattenExports);
var _baseRange;
var hasRequired_baseRange;
function require_baseRange() {
  if (hasRequired_baseRange) return _baseRange;
  hasRequired_baseRange = 1;
  var nativeCeil = Math.ceil, nativeMax = Math.max;
  function baseRange(start, end, step, fromRight) {
    var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
    while (length--) {
      result[fromRight ? length : ++index] = start;
      start += step;
    }
    return result;
  }
  _baseRange = baseRange;
  return _baseRange;
}
var isArrayLike_1;
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike_1;
  hasRequiredIsArrayLike = 1;
  var isFunction = requireIsFunction(), isLength = requireIsLength();
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  isArrayLike_1 = isArrayLike;
  return isArrayLike_1;
}
var _isIterateeCall;
var hasRequired_isIterateeCall;
function require_isIterateeCall() {
  if (hasRequired_isIterateeCall) return _isIterateeCall;
  hasRequired_isIterateeCall = 1;
  var eq = requireEq(), isArrayLike = requireIsArrayLike(), isIndex = require_isIndex(), isObject = requireIsObject();
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  _isIterateeCall = isIterateeCall;
  return _isIterateeCall;
}
var toFinite_1;
var hasRequiredToFinite;
function requireToFinite() {
  if (hasRequiredToFinite) return toFinite_1;
  hasRequiredToFinite = 1;
  var toNumber = requireToNumber();
  var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  toFinite_1 = toFinite;
  return toFinite_1;
}
var _createRange;
var hasRequired_createRange;
function require_createRange() {
  if (hasRequired_createRange) return _createRange;
  hasRequired_createRange = 1;
  var baseRange = require_baseRange(), isIterateeCall = require_isIterateeCall(), toFinite = requireToFinite();
  function createRange(fromRight) {
    return function(start, end, step) {
      if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
        end = step = void 0;
      }
      start = toFinite(start);
      if (end === void 0) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
      return baseRange(start, end, step, fromRight);
    };
  }
  _createRange = createRange;
  return _createRange;
}
var range_1;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range_1;
  hasRequiredRange = 1;
  var createRange = require_createRange();
  var range2 = createRange();
  range_1 = range2;
  return range_1;
}
var rangeExports = requireRange();
const range = /* @__PURE__ */ getDefaultExportFromCjs(rangeExports);
const iconHead = `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">`;
const headerRowID = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}<rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${fg}"/></svg>`;
};
const headerCode = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}<rect x="2" y="2" width="16" height="16" rx="4" fill="${bg}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${fg}"/></svg>`;
};
const headerNumber = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${fg}"/>
  </svg>`;
};
const headerString = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${fg}"/>
</svg>`;
};
const headerBoolean = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
    <path
        d="M16.2222 2H3.77778C2.8 2 2 2.8 2 3.77778V16.2222C2 17.2 2.8 18 3.77778 18H16.2222C17.2 18 17.9911 17.2 17.9911 16.2222L18 3.77778C18 2.8 17.2 2 16.2222 2Z"
        fill="${bg}"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.66667 6.66669C5.73368 6.66669 4.16667 8.15907 4.16667 10C4.16667 11.841 5.73368 13.3334 7.66667 13.3334H12.3333C14.2663 13.3334 15.8333 11.841 15.8333 10C15.8333 8.15907 14.2663 6.66669 12.3333 6.66669H7.66667ZM12.5 12.5C13.8807 12.5 15 11.3807 15 10C15 8.61931 13.8807 7.50002 12.5 7.50002C11.1193 7.50002 10 8.61931 10 10C10 11.3807 11.1193 12.5 12.5 12.5Z"
        fill="${fg}"
    />
</svg>`;
};
const headerUri = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${fg}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${fg}"/>
</svg>
  `;
};
const renameIcon = (props) => {
  const bg = props.bgColor;
  return `${iconHead}
    <path stroke="${bg}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${bg}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${bg}"/>
  </svg>
`;
};
const headerAudioUri = headerUri;
const headerVideoUri = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${fg}"/>
</svg>`;
};
const headerEmoji = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 9.17A4.17 4.17 0 0 1 5.83 10 4.17 4.17 0 0 1 10 5.83 4.17 4.17 0 0 1 14.17 10 4.17 4.17 0 0 1 10 14.17z" fill="${fg}"/>
    <path d="M8.33 8.21a.83.83 0 1 0-.03 1.67.83.83 0 0 0 .03-1.67zm3.34 0a.83.83 0 1 0-.04 1.67.83.83 0 0 0 .04-1.67z" fill="${fg}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 13.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${fg}"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 11a5 5 0 1 1 .01-10.01A5 5 0 0 1 10 15z" fill="${fg}"/>
    <path d="M8 7.86a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2zm4 0a1 1 0 1 0-.04 2 1 1 0 0 0 .04-2z" fill="${fg}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.53 11.9a2.82 2.82 0 0 1-5.06 0l.77-.38a1.97 1.97 0 0 0 3.52 0l.77.39z" fill="${fg}"/>
  </svg>`;
};
const headerImage = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${fg}"/>
</svg>`;
};
const headerPhone = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path fill="${fg}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${bg}"/>
  </svg>`;
};
const headerMarkdown = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${fg}"/>
  </svg>`;
};
const headerDate = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${fg}"/>
</svg>`;
};
const headerTime = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${fg}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${fg}"/>
  </svg>`;
};
const headerEmail = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${fg}"/>
</svg>`;
};
const headerReference = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${bg}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${bg}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${fg}"/>
  </svg>`;
};
const headerIfThenElse = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path fill="${fg}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${bg}"/>
</svg>`;
};
const headerSingleValue = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${fg}"/>
  </svg>`;
};
const headerLookup = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${fg}"/>
  </svg>`;
};
const headerTextTemplate = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${fg}"/>
</svg>`;
};
const headerMath = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${fg}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${fg}"/>
</svg>`;
};
const headerRollup = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${bg}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${fg}"/>
  </svg>`;
};
const headerJoinStrings = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${fg}"/>
</svg>`;
};
const headerSplitString = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    ${iconHead}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${fg}"/>
  </svg>`;
};
const headerGeoDistance = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${fg}"/>
</svg>`;
};
const headerArray = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `${iconHead}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${fg}"/>
</svg>`;
};
const rowOwnerOverlay = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15v1h14v-2.5c0-.87-.44-1.55-.98-2.04a6.19 6.19 0 0 0-1.9-1.14 12.1 12.1 0 0 0-2.48-.67A4 4 0 1 0 5 6a4 4 0 0 0 2.36 3.65c-.82.13-1.7.36-2.48.67-.69.28-1.37.65-1.9 1.13A2.8 2.8 0 0 0 2 13.5V15z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
  </svg>`;
};
const protectedColumnOverlay = (props) => {
  const fg = props.fgColor;
  const bg = props.bgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.43 6.04v-.18a3.86 3.86 0 0 0-7.72 0v.18A2.15 2.15 0 0 0 3 8.14v5.72C3 15.04 3.96 16 5.14 16H12c1.18 0 2.14-.96 2.14-2.14V8.14c0-1.03-.73-1.9-1.71-2.1zM7.86 6v-.14a.71.71 0 1 1 1.43 0V6H7.86z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
  </svg>
`;
};
const headerArrowDown = (props) => {
  props.fgColor;
  const bg = props.bgColor;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${bg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
 <g transform="scale(0.833) translate(2, 2)">
    <path d="M8 18L12 22L16 18"/>
    <path d="M12 2V22"/>
  </g>
</svg>
  `;
};
const headerArrowUp = (props) => {
  props.fgColor;
  const bg = props.bgColor;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${bg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
  <g transform="scale(0.833) translate(-4, 2)">
    <path d="M8 6L12 2L16 6"/>
    <path d="M12 2V22"/>
  </g>
</svg>
`;
};
const sprites = {
  headerRowID,
  headerNumber,
  headerCode,
  headerString,
  headerBoolean,
  headerAudioUri,
  headerVideoUri,
  headerEmoji,
  headerImage,
  headerUri,
  headerPhone,
  headerMarkdown,
  headerDate,
  headerTime,
  headerEmail,
  headerReference,
  headerIfThenElse,
  headerSingleValue,
  headerLookup,
  headerTextTemplate,
  headerMath,
  headerRollup,
  headerJoinStrings,
  headerSplitString,
  headerGeoDistance,
  headerArray,
  rowOwnerOverlay,
  protectedColumnOverlay,
  renameIcon,
  headerArrowDown,
  headerArrowUp
};
function getColors(variant, theme) {
  if (variant === "normal") {
    return [theme.bgIconHeader, theme.fgIconHeader];
  } else if (variant === "selected") {
    return ["white", theme.accentColor];
  } else {
    return [theme.accentColor, theme.bgHeader];
  }
}
class SpriteManager {
  constructor(headerIcons, onSettled) {
    this.onSettled = onSettled;
    this.spriteMap = /* @__PURE__ */ new Map();
    this.headerIcons = void 0;
    this.inFlight = 0;
    this.headerIcons = headerIcons !== null && headerIcons !== void 0 ? headerIcons : {};
  }
  drawSprite(sprite, variant, ctx, x, y, size, theme) {
    let alpha = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1;
    const [bgColor, fgColor] = getColors(variant, theme);
    const rSize = size * Math.ceil(window.devicePixelRatio);
    const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;
    let spriteCanvas = this.spriteMap.get(key);
    if (spriteCanvas === void 0) {
      const spriteCb = this.headerIcons[sprite];
      if (spriteCb === void 0) return;
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
      if (promise === void 0) return;
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
function getSkipPoint(drawRegions) {
  if (drawRegions.length === 0) return void 0;
  let drawRegionsLowestY;
  for (const dr of drawRegions) {
    drawRegionsLowestY = Math.min(drawRegionsLowestY !== null && drawRegionsLowestY !== void 0 ? drawRegionsLowestY : dr.y, dr.y);
  }
  return drawRegionsLowestY;
}
function walkRowsInCol(startRow, drawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipToY, cb) {
  skipToY = skipToY !== null && skipToY !== void 0 ? skipToY : drawY;
  let y = drawY;
  let row = startRow;
  const rowEnd = rows - freezeTrailingRows;
  let didBreak = false;
  while (y < height && row < rowEnd) {
    const rh = getRowHeight(row);
    if (y + rh > skipToY && cb(y, row, rh, false, hasAppendRow && row === rows - 1) === true) {
      didBreak = true;
      break;
    }
    y += rh;
    row++;
  }
  if (didBreak) return;
  y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    row = rows - 1 - fr;
    const rh = getRowHeight(row);
    y -= rh;
    cb(y, row, rh, true, hasAppendRow && row === rows - 1);
  }
}
function walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  const drawY = totalHeaderHeight + translateY;
  for (const c of effectiveCols) {
    const drawX = c.sticky ? clipX : x + translateX;
    if (cb(c, drawX, drawY, c.sticky ? 0 : clipX, cellYOffset) === true) {
      break;
    }
    x += c.width;
    clipX += c.sticky ? c.width : 0;
  }
}
function walkGroups(effectiveCols, width, translateX, groupHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  for (let index = 0; index < effectiveCols.length; index++) {
    const startCol = effectiveCols[index];
    let end = index + 1;
    let boxWidth = startCol.width;
    if (startCol.sticky) {
      clipX += boxWidth;
    }
    while (end < effectiveCols.length && isGroupEqual(effectiveCols[end].group, startCol.group) && effectiveCols[end].sticky === effectiveCols[index].sticky) {
      const endCol = effectiveCols[end];
      boxWidth += endCol.width;
      end++;
      index++;
      if (endCol.sticky) {
        clipX += endCol.width;
      }
    }
    const t = startCol.sticky ? 0 : translateX;
    const localX = x + t;
    const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
    const w2 = Math.min(boxWidth - delta, width - (localX + delta));
    cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], getGroupName(startCol.group), localX + delta, 0, w2, groupHeaderHeight);
    x += boxWidth;
  }
}
function walkMultiLevelGroups(effectiveCols, width, translateX, groupHeaderHeights, groupLevels, cb) {
  if (groupLevels === 0) return;
  const levelYOffsets = [];
  let yOffset = 0;
  for (let level = 0; level < groupLevels; level++) {
    var _groupHeaderHeights$l;
    levelYOffsets.push(yOffset);
    yOffset += (_groupHeaderHeights$l = groupHeaderHeights[level]) !== null && _groupHeaderHeights$l !== void 0 ? _groupHeaderHeights$l : 0;
  }
  const colXPositions = [];
  let accX = 0;
  for (const col of effectiveCols) {
    colXPositions.push(accX);
    accX += col.width;
  }
  for (let level = 0; level < groupLevels; level++) {
    var _groupHeaderHeights$l2;
    const levelY = levelYOffsets[level];
    const levelHeight = (_groupHeaderHeights$l2 = groupHeaderHeights[level]) !== null && _groupHeaderHeights$l2 !== void 0 ? _groupHeaderHeights$l2 : 0;
    let clipX = 0;
    let index = 0;
    while (index < effectiveCols.length) {
      const startCol = effectiveCols[index];
      const startGroupName = getGroupAtLevel(startCol.group, level, groupLevels);
      if (startGroupName === void 0) {
        if (startCol.sticky) {
          clipX += startCol.width;
        }
        index++;
        continue;
      }
      const startX = colXPositions[index];
      let end = index + 1;
      let boxWidth = startCol.width;
      if (startCol.sticky) {
        clipX += startCol.width;
      }
      while (end < effectiveCols.length) {
        const endCol = effectiveCols[end];
        const isEqual = isGroupEqualAtLevel(endCol.group, startCol.group, level, groupLevels);
        const sameSticky = endCol.sticky === startCol.sticky;
        if (!isEqual || !sameSticky) {
          break;
        }
        boxWidth += endCol.width;
        if (endCol.sticky) {
          clipX += endCol.width;
        }
        end++;
      }
      const t = startCol.sticky ? 0 : translateX;
      const localX = startX + t;
      const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
      const w2 = Math.min(boxWidth - delta, width - (localX + delta));
      if (w2 > 0) {
        cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], startGroupName, localX + delta, levelY, w2, levelHeight, level);
      }
      index = end;
    }
  }
}
function getSpanBounds(span, cellX, cellY, cellW, cellH, column, allColumns) {
  var _allColumns$find$sour, _allColumns$find;
  const [startCol, endCol] = span;
  let frozenRect;
  let contentRect;
  const firstNonSticky = (_allColumns$find$sour = (_allColumns$find = allColumns.find((x) => !x.sticky)) === null || _allColumns$find === void 0 ? void 0 : _allColumns$find.sourceIndex) !== null && _allColumns$find$sour !== void 0 ? _allColumns$find$sour : 0;
  if (endCol > firstNonSticky) {
    const renderFromCol = Math.max(startCol, firstNonSticky);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= endCol; x++) {
      tempW += allColumns[x].width;
    }
    contentRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  if (firstNonSticky > startCol) {
    const renderToCol = Math.min(endCol, firstNonSticky - 1);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= startCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
      tempW += allColumns[x].width;
    }
    frozenRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  return [frozenRect, contentRect];
}
function getClosestRect(rect, px, py, allowedDirections) {
  if (allowedDirections === "any") return combineRects(rect, {
    x: px,
    y: py,
    width: 1,
    height: 1
  });
  if (allowedDirections === "vertical") px = rect.x;
  if (allowedDirections === "horizontal") py = rect.y;
  if (itemIsInRect([px, py], rect)) {
    return void 0;
  }
  const distanceToLeft = px - rect.x;
  const distanceToRight = rect.x + rect.width - px;
  const distanceToTop = py - rect.y + 1;
  const distanceToBottom = rect.y + rect.height - py;
  const minDistance = Math.min(allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToLeft, allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToRight, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToTop, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToBottom);
  if (minDistance === distanceToBottom) {
    return {
      x: rect.x,
      y: rect.y + rect.height,
      width: rect.width,
      height: py - rect.y - rect.height + 1
    };
  } else if (minDistance === distanceToTop) {
    return {
      x: rect.x,
      y: py,
      width: rect.width,
      height: rect.y - py
    };
  } else if (minDistance === distanceToRight) {
    return {
      x: rect.x + rect.width,
      y: rect.y,
      width: px - rect.x - rect.width + 1,
      height: rect.height
    };
  } else {
    return {
      x: px,
      y: rect.y,
      width: rect.x - px,
      height: rect.height
    };
  }
}
function intersectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}
function pointInRect(rect, x, y) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
function combineRects(a, b2) {
  const x = Math.min(a.x, b2.x);
  const y = Math.min(a.y, b2.y);
  const width = Math.max(a.x + a.width, b2.x + b2.width) - x;
  const height = Math.max(a.y + a.height, b2.y + b2.height) - y;
  return {
    x,
    y,
    width,
    height
  };
}
function rectContains(a, b2) {
  return a.x <= b2.x && a.y <= b2.y && a.x + a.width >= b2.x + b2.width && a.y + a.height >= b2.y + b2.height;
}
function hugRectToTarget(rect, width, height, mod) {
  if (rect.x > width || rect.y > height || rect.x < 0 && rect.y < 0 && rect.x + rect.width > width && rect.y + rect.height > height) {
    return void 0;
  }
  if (rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= height) {
    return rect;
  }
  const leftMax = -4;
  const topMax = -4;
  const rightMax = width + 4;
  const bottomMax = height + 4;
  const leftOverflow = leftMax - rect.x;
  const rightOverflow = rect.x + rect.width - rightMax;
  const topOverflow = topMax - rect.y;
  const bottomOverflow = rect.y + rect.height - bottomMax;
  const left = leftOverflow > 0 ? rect.x + Math.floor(leftOverflow / mod) * mod : rect.x;
  const right = rightOverflow > 0 ? rect.x + rect.width - Math.floor(rightOverflow / mod) * mod : rect.x + rect.width;
  const top = topOverflow > 0 ? rect.y + Math.floor(topOverflow / mod) * mod : rect.y;
  const bottom = bottomOverflow > 0 ? rect.y + rect.height - Math.floor(bottomOverflow / mod) * mod : rect.y + rect.height;
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}
function splitRectIntoRegions(rect, splitIndicies, width, height, splitLocations) {
  const [lSplit, tSplit, rSplit, bSplit] = splitIndicies;
  const [lClip, tClip, rClip, bClip] = splitLocations;
  const {
    x: inX,
    y: inY,
    width: inW,
    height: inH
  } = rect;
  const result = [];
  if (inW <= 0 || inH <= 0) return result;
  const inRight = inX + inW;
  const inBottom = inY + inH;
  const isOverLeft = inX < lSplit;
  const isOverTop = inY < tSplit;
  const isOverRight = inX + inW > rSplit;
  const isOverBottom = inY + inH > bSplit;
  const isOverCenterVert = inX >= lSplit && inX < rSplit || inRight > lSplit && inRight <= rSplit || inX < lSplit && inRight > rSplit;
  const isOverCenterHoriz = inY >= tSplit && inY < bSplit || inBottom > tSplit && inBottom <= bSplit || inY < tSplit && inBottom > bSplit;
  const isOverCenter = isOverCenterVert && isOverCenterHoriz;
  if (isOverCenter) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: tClip,
        width: rClip - lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverTop) {
    const x = inX;
    const y = inY;
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: 0,
        width: lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = inY;
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: 0,
        width: rClip - lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverRight) {
    const x = Math.max(inX, rSplit);
    const y = inY;
    const right = inRight;
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: 0,
        width: width - rClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverLeft && isOverCenterHoriz) {
    const x = inX;
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: tClip,
        width: lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverRight && isOverCenterHoriz) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, tSplit);
    const right = inRight;
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: tClip,
        width: width - rClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverBottom) {
    const x = inX;
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: bClip,
        width: lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverBottom && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: bClip,
        width: rClip - lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverRight && isOverBottom) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, bSplit);
    const right = inRight;
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: bClip,
        width: width - rClip + 1,
        height: height - bClip + 1
      }
    });
  }
  return result;
}
const loadingCell$1 = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
function drawCells(ctx, effectiveColumns, allColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, outerTheme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth) {
  var _damage$size;
  let toDraw = (_damage$size = damage === null || damage === void 0 ? void 0 : damage.size) !== null && _damage$size !== void 0 ? _damage$size : Number.MAX_SAFE_INTEGER;
  const frameTime = performance.now();
  let font = outerTheme.baseFontFull;
  ctx.font = font;
  const deprepArg = {
    ctx
  };
  const cellIndex = [0, 0];
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) : 0;
  let result;
  let handledSpans = void 0;
  const rowSpannedCells = new CellSet();
  const handledRowSpans = /* @__PURE__ */ new Set();
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawStartY, clipX, startRow) => {
    const diff = Math.max(0, clipX - drawX);
    const colDrawX = drawX + diff;
    const colDrawY = totalHeaderHeight + 1;
    const colWidth = c.width - diff;
    const colHeight = height - totalHeaderHeight - 1;
    if (drawRegions.length > 0) {
      let found = false;
      for (let i = 0; i < drawRegions.length; i++) {
        const dr = drawRegions[i];
        if (intersectRect(colDrawX, colDrawY, colWidth, colHeight, dr.x, dr.y, dr.width, dr.height)) {
          found = true;
          break;
        }
      }
      if (!found) return;
    }
    const reclip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
      ctx.clip();
    };
    const colSelected = selection.columns.hasIndex(c.sourceIndex);
    const groupTheme = getGroupDetails(getGroupName(c.group)).overrideTheme;
    const colTheme = c.themeOverride === void 0 && groupTheme === void 0 ? outerTheme : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);
    const colFont = colTheme.baseFontFull;
    if (colFont !== font) {
      font = colFont;
      ctx.font = colFont;
    }
    reclip();
    let prepResult = void 0;
    walkRowsInCol(startRow, colDrawStartY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky, isTrailingRow) => {
      var _c$trailingRowOptions, _c$trailingRowOptions2;
      if (row < 0) return;
      cellIndex[0] = c.sourceIndex;
      cellIndex[1] = row;
      if (rowSpannedCells.has(cellIndex)) {
        toDraw--;
        return;
      }
      if (damage !== void 0 && !damage.has(cellIndex)) {
        return;
      }
      if (drawRegions.length > 0) {
        let found = false;
        for (let i = 0; i < drawRegions.length; i++) {
          const dr = drawRegions[i];
          if (intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height)) {
            found = true;
            break;
          }
        }
        if (!found) return;
      }
      const rowSelected = selection.rows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      const cell = row < rows ? getCellContent(cellIndex) : loadingCell$1;
      let cellX = drawX;
      let cellWidth = c.width;
      let cellY = drawY;
      let cellHeight = rh;
      let drawingSpan = false;
      let skipContents = false;
      if (cell.rowspan !== void 0) {
        const [startRowX, endRow] = cell.rowspan;
        const spanKey = `${c.sourceIndex}|${startRowX}`;
        if (!handledRowSpans.has(spanKey)) {
          let spanY = drawY;
          for (let i = startRowX; i < row; i++) {
            spanY -= getRowHeight(i);
          }
          let spanHeight = 0;
          for (let i = startRowX; i < endRow; i++) {
            spanHeight += getRowHeight(i);
          }
          if (spanY < colDrawY + colHeight && spanY + spanHeight > colDrawY) {
            cellY = spanY;
            cellHeight = spanHeight;
            handledRowSpans.add(spanKey);
            for (let i = startRowX; i < endRow; i++) {
              if (i !== row) {
                rowSpannedCells.add([c.sourceIndex, i]);
              }
            }
            drawingSpan = true;
          } else {
            handledRowSpans.add(spanKey);
            for (let i = startRowX; i < endRow; i++) {
              rowSpannedCells.add([c.sourceIndex, i]);
            }
            toDraw--;
            return;
          }
        } else {
          toDraw--;
          return;
        }
      }
      if (cell.span !== void 0) {
        const [startCol, endCol] = cell.span;
        const spanKey = `${row},${startCol},${endCol},${c.sticky}`;
        if (handledSpans === void 0) handledSpans = /* @__PURE__ */ new Set();
        if (!handledSpans.has(spanKey)) {
          const areas = getSpanBounds(cell.span, drawX, drawY, c.width, rh, c, allColumns);
          const area = c.sticky ? areas[0] : areas[1];
          if (!c.sticky && areas[0] !== void 0) {
            skipContents = true;
          }
          if (area !== void 0) {
            cellX = area.x;
            cellWidth = area.width;
            handledSpans.add(spanKey);
            drawingSpan = true;
          }
        } else {
          toDraw--;
          return;
        }
      }
      if (drawingSpan) {
        ctx.restore();
        prepResult = void 0;
        ctx.save();
        ctx.beginPath();
        const d2 = Math.max(0, clipX - cellX);
        ctx.rect(cellX + d2, cellY, cellWidth - d2, cellHeight);
        if (result === void 0) {
          result = [];
        }
        result.push({
          x: cellX + d2,
          y: cellY,
          width: cellWidth - d2,
          height: cellHeight
        });
        ctx.clip();
      }
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const trailingTheme = isTrailingRow && ((_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.themeOverride) !== void 0 ? (_c$trailingRowOptions2 = c.trailingRowOptions) === null || _c$trailingRowOptions2 === void 0 ? void 0 : _c$trailingRowOptions2.themeOverride : void 0;
      const theme = cell.themeOverride === void 0 && rowTheme === void 0 && trailingTheme === void 0 ? colTheme : mergeAndRealizeTheme(colTheme, rowTheme, trailingTheme, cell.themeOverride);
      ctx.beginPath();
      const isSelected = cellIsSelected(cellIndex, cell, selection);
      let accentCount = cellIsInRange(cellIndex, cell, selection, drawFocus);
      const spanIsHighlighted = cell.span !== void 0 && selection.columns.some((index) => cell.span !== void 0 && index >= cell.span[0] && index <= cell.span[1]);
      if (isSelected && !isFocused && drawFocus) {
        accentCount = 0;
      } else if (isSelected && drawFocus) {
        accentCount = Math.max(accentCount, 1);
      }
      if (spanIsHighlighted) {
        accentCount++;
      }
      if (!isSelected) {
        if (rowSelected) accentCount++;
        if (colSelected && !isTrailingRow) accentCount++;
      }
      const bgCell = cell.kind === GridCellKind.Protected ? theme.bgCellMedium : theme.bgCell;
      let fill;
      if (isSticky || bgCell !== outerTheme.bgCell) {
        fill = blend(bgCell, fill);
      }
      if (accentCount > 0 || rowDisabled) {
        if (rowDisabled) {
          fill = blend(theme.bgHeader, fill);
        }
        for (let i = 0; i < accentCount; i++) {
          fill = blend(theme.accentLight, fill);
        }
      } else if (prelightCells !== void 0) {
        for (const pre of prelightCells) {
          if (pre[0] === c.sourceIndex && pre[1] === row) {
            fill = blend(theme.bgSearchResult, fill);
            break;
          }
        }
      }
      if (highlightRegions !== void 0) {
        for (let i = 0; i < highlightRegions.length; i++) {
          const region = highlightRegions[i];
          const r = region.range;
          if (region.style !== "solid-outline" && r.x <= c.sourceIndex && c.sourceIndex < r.x + r.width && r.y <= row && row < r.y + r.height) {
            fill = blend(region.color, fill);
          }
        }
      }
      let didDamageClip = false;
      if (damage !== void 0) {
        const top = drawY + 1;
        const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - freezeTrailingRowsHeight);
        const h = bottom - top;
        if (h !== rh - 1 || cellX + 1 <= clipX) {
          didDamageClip = true;
          ctx.save();
          ctx.beginPath();
          ctx.rect(cellX + 1, top, cellWidth - 1, h);
          ctx.clip();
        }
        fill = fill === void 0 ? theme.bgCell : blend(fill, theme.bgCell);
      }
      const isLastColumn = c.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (fill !== void 0) {
        ctx.fillStyle = fill;
        if (prepResult !== void 0) {
          prepResult.fillStyle = fill;
        }
        if (damage !== void 0) {
          ctx.fillRect(cellX + 1, cellY + 1, cellWidth - (isLastColumn ? 2 : 1), cellHeight - (isLastRow ? 2 : 1));
        } else {
          ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
        }
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 0.6;
      }
      let hoverValue;
      for (let i = 0; i < hoverValues.length; i++) {
        const hv = hoverValues[i];
        if (hv.item[0] === c.sourceIndex && hv.item[1] === row) {
          hoverValue = hv;
          break;
        }
      }
      if (cellWidth > minimumCellWidth && !skipContents) {
        var _hoverValue$hoverAmou, _hoverValue;
        const cellFont = theme.baseFontFull;
        if (cellFont !== font) {
          ctx.font = cellFont;
          font = cellFont;
        }
        let vtrans = 0;
        if (cell.rowspan !== void 0) {
          var _cell$rowSpanPosition;
          const pos = (_cell$rowSpanPosition = cell.rowSpanPosition) !== null && _cell$rowSpanPosition !== void 0 ? _cell$rowSpanPosition : "top";
          if (pos === "top") {
            vtrans = rh / 2 - cellHeight / 2;
          } else if (pos === "bottom") {
            const [_2, endRow] = cell.rowspan;
            const lastRowHeight = getRowHeight(endRow - 1);
            vtrans = cellHeight / 2 - lastRowHeight / 2;
          }
        }
        prepResult = drawCell(ctx, cell, c.sourceIndex, row, isLastColumn, isLastRow, cellX, cellY, cellWidth, cellHeight, accentCount > 0, theme, fill !== null && fill !== void 0 ? fill : theme.bgCell, imageLoader, spriteManager, (_hoverValue$hoverAmou = (_hoverValue = hoverValue) === null || _hoverValue === void 0 ? void 0 : _hoverValue.hoverAmount) !== null && _hoverValue$hoverAmou !== void 0 ? _hoverValue$hoverAmou : 0, hoverInfo, hyperWrapping, frameTime, drawCellCallback, prepResult, enqueue, renderStateProvider, getCellRenderer, overrideCursor, vtrans);
      }
      if (didDamageClip) {
        ctx.restore();
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 1;
      }
      toDraw--;
      if (drawingSpan) {
        var _prepResult, _prepResult$deprep;
        ctx.restore();
        (_prepResult = prepResult) === null || _prepResult === void 0 || (_prepResult$deprep = _prepResult.deprep) === null || _prepResult$deprep === void 0 || _prepResult$deprep.call(_prepResult, deprepArg);
        prepResult = void 0;
        reclip();
        font = colFont;
        ctx.font = colFont;
      }
      return toDraw <= 0;
    });
    ctx.restore();
    return toDraw <= 0;
  });
  if (result === void 0) return;
  return result;
}
const allocatedItem = [0, 0];
const reusableRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
const drawState = [void 0, () => void 0];
let animationFrameRequested = false;
function animRequest() {
  animationFrameRequested = true;
}
function drawCell(ctx, cell, col, row, isLastCol, isLastRow, x, y, w2, h, highlighted, theme, finalCellFillColor, imageLoader, spriteManager, hoverAmount, hoverInfo, hyperWrapping, frameTime, drawCellCallback, lastPrep, enqueue, renderStateProvider, getCellRenderer, overrideCursor, vtrans) {
  let hoverX;
  let hoverY;
  if (hoverInfo !== void 0 && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
    hoverX = hoverInfo[1][0];
    hoverY = hoverInfo[1][1];
  }
  let result = void 0;
  allocatedItem[0] = col;
  allocatedItem[1] = row;
  reusableRect.x = x;
  reusableRect.y = y;
  reusableRect.width = w2;
  reusableRect.height = h;
  drawState[0] = renderStateProvider.getValue(allocatedItem);
  drawState[1] = (val) => renderStateProvider.setValue(allocatedItem, val);
  animationFrameRequested = false;
  const args = {
    ctx,
    theme,
    col,
    row,
    cell,
    rect: reusableRect,
    highlighted,
    cellFillColor: finalCellFillColor,
    hoverAmount,
    frameTime,
    hoverX,
    drawState,
    hoverY,
    imageLoader,
    spriteManager,
    hyperWrapping,
    overrideCursor: hoverX !== void 0 ? overrideCursor : void 0,
    requestAnimationFrame: animRequest
  };
  const needsAnim = drawLastUpdateUnderlay(args, cell.lastUpdated, frameTime, lastPrep, isLastCol, isLastRow);
  const r = getCellRenderer(cell);
  if (r !== void 0) {
    var _lastPrep, _r$drawPrep;
    if (((_lastPrep = lastPrep) === null || _lastPrep === void 0 ? void 0 : _lastPrep.renderer) !== r) {
      var _lastPrep2, _lastPrep2$deprep;
      (_lastPrep2 = lastPrep) === null || _lastPrep2 === void 0 || (_lastPrep2$deprep = _lastPrep2.deprep) === null || _lastPrep2$deprep === void 0 || _lastPrep2$deprep.call(_lastPrep2, args);
      lastPrep = void 0;
    }
    const partialPrepResult = (_r$drawPrep = r.drawPrep) === null || _r$drawPrep === void 0 ? void 0 : _r$drawPrep.call(r, args, lastPrep);
    ctx.save();
    ctx.translate(0, vtrans);
    if (drawCellCallback !== void 0 && !isInnerOnlyCell(args.cell)) {
      drawCellCallback(args, () => r.draw(args, cell));
    } else {
      r.draw(args, cell);
    }
    ctx.restore();
    result = partialPrepResult === void 0 ? void 0 : {
      deprep: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.deprep,
      fillStyle: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.fillStyle,
      font: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.font,
      renderer: r
    };
  }
  if (needsAnim || animationFrameRequested) enqueue === null || enqueue === void 0 || enqueue(allocatedItem);
  return result;
}
function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted) {
  var _theme$roundingRadius;
  let hoverX = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : -20;
  let hoverY = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : -20;
  let maxSize = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : void 0;
  let alignment = arguments.length > 11 && arguments[11] !== void 0 ? arguments[11] : "center";
  let style = arguments.length > 12 && arguments[12] !== void 0 ? arguments[12] : "square";
  let disabled = arguments.length > 13 && arguments[13] !== void 0 ? arguments[13] : false;
  const centerY = Math.floor(y + height / 2);
  const rectBordRadius = style === "circle" ? 1e4 : (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4;
  let checkBoxWidth = getSquareWidth(maxSize !== null && maxSize !== void 0 ? maxSize : theme.checkboxMaxSize, height, theme.cellVerticalPadding);
  let checkBoxHalfWidth = checkBoxWidth / 2;
  const posX = getSquareXPosFromAlign(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = getSquareBB(posX, centerY, checkBoxWidth);
  const hovered = pointIsWithinBB(x + hoverX, y + hoverY, bb);
  switch (checked) {
    case true: {
      ctx.beginPath();
      roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
      if (style === "circle") {
        checkBoxHalfWidth *= 0.8;
        checkBoxWidth *= 0.8;
      }
      ctx.fillStyle = disabled ? theme.bgCellMedium : highlighted ? theme.accentColor : theme.textMedium;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(posX - checkBoxHalfWidth + checkBoxWidth / 4.23, centerY - checkBoxHalfWidth + checkBoxWidth / 1.97);
      ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 2.42, centerY - checkBoxHalfWidth + checkBoxWidth / 1.44);
      ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 1.29, centerY - checkBoxHalfWidth + checkBoxWidth / 3.25);
      ctx.strokeStyle = disabled ? theme.textLight : theme.bgCell;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 1.9;
      ctx.stroke();
      break;
    }
    case BooleanEmpty:
    case false: {
      ctx.beginPath();
      roundedRect(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
      ctx.lineWidth = 1;
      ctx.strokeStyle = disabled ? theme.textLight : hovered ? theme.textDark : theme.textMedium;
      ctx.stroke();
      break;
    }
    case BooleanIndeterminate: {
      ctx.beginPath();
      roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
      ctx.fillStyle = disabled ? theme.bgCellMedium : hovered ? theme.textMedium : theme.textLight;
      ctx.fill();
      if (style === "circle") {
        checkBoxHalfWidth *= 0.8;
        checkBoxWidth *= 0.8;
      }
      ctx.beginPath();
      ctx.moveTo(posX - checkBoxWidth / 3, centerY);
      ctx.lineTo(posX + checkBoxWidth / 3, centerY);
      ctx.strokeStyle = disabled ? theme.textLight : theme.bgCell;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.9;
      ctx.stroke();
      break;
    }
    default:
      assertNever();
  }
}
function drawGridHeaders(ctx, effectiveCols, allColumns, enableGroups, hovered, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode, groupLevels, groupHeaderHeights) {
  var _hovered$, _hovered$2, _hovered$3, _hovered$4;
  const effectiveGroupLevels = groupLevels !== null && groupLevels !== void 0 ? groupLevels : enableGroups ? 1 : 0;
  const effectiveGroupHeaderHeights = groupHeaderHeights !== null && groupHeaderHeights !== void 0 ? groupHeaderHeights : enableGroups ? [groupHeaderHeight] : [];
  const totalGroupHeaderHeight = effectiveGroupHeaderHeights.reduce((a, b2) => a + b2, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  if (totalHeaderHeight <= 0) return;
  ctx.fillStyle = outerTheme.bgHeader;
  if (damage !== void 0 && enableGroups && (groupLevels !== null && groupLevels !== void 0 ? groupLevels : 1) > 1) {
    ctx.fillRect(0, totalGroupHeaderHeight, width, headerHeight);
  } else {
    ctx.fillRect(0, 0, width, totalHeaderHeight);
  }
  const hCol = hovered === null || hovered === void 0 || (_hovered$ = hovered[0]) === null || _hovered$ === void 0 ? void 0 : _hovered$[0];
  const hRow = hovered === null || hovered === void 0 || (_hovered$2 = hovered[0]) === null || _hovered$2 === void 0 ? void 0 : _hovered$2[1];
  const hPosX = hovered === null || hovered === void 0 || (_hovered$3 = hovered[1]) === null || _hovered$3 === void 0 ? void 0 : _hovered$3[0];
  const hPosY = hovered === null || hovered === void 0 || (_hovered$4 = hovered[1]) === null || _hovered$4 === void 0 ? void 0 : _hovered$4[1];
  const font = outerTheme.headerFontFull;
  ctx.font = font;
  walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
    var _hoverValues$find$hov, _hoverValues$find;
    if (damage !== void 0 && !damage.has([c.sourceIndex, -1])) return;
    const diff = Math.max(0, clipX - x);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + diff, totalGroupHeaderHeight, c.width - diff, headerHeight);
    ctx.clip();
    const groupTheme = getGroupDetails(getGroupName(c.group)).overrideTheme;
    const theme = c.themeOverride === void 0 && groupTheme === void 0 ? outerTheme : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);
    if (theme.bgHeader !== outerTheme.bgHeader) {
      ctx.fillStyle = theme.bgHeader;
      ctx.fill();
    }
    if (theme !== outerTheme) {
      ctx.font = theme.headerFontFull;
    }
    const selected = selection.columns.hasIndex(c.sourceIndex);
    const noHover = dragAndDropState !== void 0 || isResizing || c.headerRowMarkerDisabled === true;
    const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
    const hover = noHover ? 0 : (_hoverValues$find$hov = (_hoverValues$find = hoverValues.find((s) => s.item[0] === c.sourceIndex && s.item[1] === -1)) === null || _hoverValues$find === void 0 ? void 0 : _hoverValues$find.hoverAmount) !== null && _hoverValues$find$hov !== void 0 ? _hoverValues$find$hov : 0;
    const hasSelectedCell = (selection === null || selection === void 0 ? void 0 : selection.current) !== void 0 && selection.current.cell[0] === c.sourceIndex;
    const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;
    const y = enableGroups ? totalGroupHeaderHeight : 0;
    const xOffset = c.sourceIndex === 0 ? 0 : 1;
    if (selected) {
      ctx.fillStyle = bgFillStyle;
      ctx.fillRect(x + xOffset, y, c.width - xOffset, headerHeight);
    } else if (hasSelectedCell || hover > 0) {
      ctx.beginPath();
      ctx.rect(x + xOffset, y, c.width - xOffset, headerHeight);
      if (hasSelectedCell) {
        ctx.fillStyle = theme.bgHeaderHasFocus;
        ctx.fill();
      }
      if (hover > 0) {
        ctx.globalAlpha = hover;
        ctx.fillStyle = theme.bgHeaderHovered;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    drawHeader(ctx, x, y, c.width, headerHeight, c, selected, theme, hoveredBoolean, hoveredBoolean ? hPosX : void 0, hoveredBoolean ? hPosY : void 0, hasSelectedCell, hover, spriteManager, drawHeaderCallback, touchMode);
    ctx.restore();
  });
  if (enableGroups) {
    if (effectiveGroupLevels > 1) {
      drawMultiLevelGroups(ctx, effectiveCols, width, translateX, effectiveGroupHeaderHeights, effectiveGroupLevels, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
    } else {
      drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
    }
  }
  if (enableGroups && (groupLevels !== null && groupLevels !== void 0 ? groupLevels : 1) > 1) {
    ctx.beginPath();
    ctx.moveTo(0, totalGroupHeaderHeight + 0.5);
    ctx.lineTo(width, totalGroupHeaderHeight + 0.5);
    ctx.strokeStyle = outerTheme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
function drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$5;
  const [hCol, hRow] = (_hovered$5 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$5 !== void 0 ? _hovered$5 : [];
  let finalX = 0;
  walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w2, h) => {
    var _groupTheme$bgGroupHe, _groupTheme$bgGroupHe2, _groupTheme$textGroup;
    if (damage !== void 0 && !damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w2, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === void 0 ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
    const isHovered = hRow === -2 && hCol !== void 0 && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? (_groupTheme$bgGroupHe = groupTheme.bgGroupHeaderHovered) !== null && _groupTheme$bgGroupHe !== void 0 ? _groupTheme$bgGroupHe : groupTheme.bgHeaderHovered : (_groupTheme$bgGroupHe2 = groupTheme.bgGroupHeader) !== null && _groupTheme$bgGroupHe2 !== void 0 ? _groupTheme$bgGroupHe2 : groupTheme.bgHeader;
    if (fillColor !== theme.bgHeader) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.fillStyle = (_groupTheme$textGroup = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup !== void 0 ? _groupTheme$textGroup : groupTheme.textHeader;
    if (group !== void 0) {
      const displayName = group.name;
      const textMetrics = ctx.measureText(displayName);
      const textWidth = textMetrics.width;
      const iconWidth = group.icon !== void 0 ? 26 : 0;
      const totalContentWidth = iconWidth + textWidth;
      const centerX = x + (w2 - totalContentWidth) / 2;
      if (group.icon !== void 0) {
        spriteManager.drawSprite(group.icon, "normal", ctx, centerX, (groupHeaderHeight - 20) / 2, 20, groupTheme);
      }
      ctx.fillText(displayName, centerX + iconWidth, groupHeaderHeight / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
      if (group.actions !== void 0 && isHovered) {
        var _hovered$6;
        const actionBoxes = getActionBoundsForGroup({
          x,
          y,
          width: w2,
          height: h
        }, group.actions);
        ctx.beginPath();
        const fadeStartX = actionBoxes[0].x - 10;
        const fadeWidth = x + w2 - fadeStartX;
        ctx.rect(fadeStartX, 0, fadeWidth, groupHeaderHeight);
        const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
        const trans = withAlpha(fillColor, 0);
        grad.addColorStop(0, trans);
        grad.addColorStop(10 / fadeWidth, fillColor);
        grad.addColorStop(1, fillColor);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 0.6;
        const [mouseX, mouseY] = (_hovered$6 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$6 !== void 0 ? _hovered$6 : [-1, -1];
        for (let i = 0; i < group.actions.length; i++) {
          const action = group.actions[i];
          const box = actionBoxes[i];
          const actionHovered = pointInRect(box, mouseX + x, mouseY);
          if (actionHovered) {
            ctx.globalAlpha = 1;
          }
          spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
          if (actionHovered) {
            ctx.globalAlpha = 0.6;
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, groupHeaderHeight);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    finalX = x + w2;
  });
  ctx.beginPath();
  ctx.moveTo(finalX + 0.5, 0);
  ctx.lineTo(finalX + 0.5, groupHeaderHeight);
  ctx.moveTo(0, groupHeaderHeight + 0.5);
  ctx.lineTo(width, groupHeaderHeight + 0.5);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1;
  ctx.stroke();
}
function drawMultiLevelGroups(ctx, effectiveCols, width, translateX, groupHeaderHeights, groupLevels, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$7;
  const [hCol, hRow] = (_hovered$7 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$7 !== void 0 ? _hovered$7 : [];
  ctx.font = theme.headerFontFull;
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b2) => a + b2, 0);
  if (damage === void 0) {
    ctx.fillStyle = theme.bgHeader;
    ctx.fillRect(0, 0, width, totalGroupHeaderHeight);
  }
  let finalX = 0;
  walkMultiLevelGroups(effectiveCols, width, translateX, groupHeaderHeights, groupLevels, (span, groupName, x, y, w2, h, level) => {
    var _groupTheme$bgGroupHe3, _groupTheme$bgGroupHe4, _groupTheme$textGroup2, _group$name;
    const damageRow = -(level + 2);
    if (damage !== void 0 && !damage.hasItemInRectangle({
      x: span[0],
      y: damageRow,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w2, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === void 0 ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
    const isHovered = hRow === damageRow && hCol !== void 0 && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? (_groupTheme$bgGroupHe3 = groupTheme.bgGroupHeaderHovered) !== null && _groupTheme$bgGroupHe3 !== void 0 ? _groupTheme$bgGroupHe3 : groupTheme.bgHeaderHovered : (_groupTheme$bgGroupHe4 = groupTheme.bgGroupHeader) !== null && _groupTheme$bgGroupHe4 !== void 0 ? _groupTheme$bgGroupHe4 : groupTheme.bgHeader;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, w2, h);
    ctx.fillStyle = (_groupTheme$textGroup2 = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup2 !== void 0 ? _groupTheme$textGroup2 : groupTheme.textHeader;
    const displayName = (_group$name = group === null || group === void 0 ? void 0 : group.name) !== null && _group$name !== void 0 ? _group$name : groupName;
    const textMetrics = ctx.measureText(displayName);
    const textWidth = textMetrics.width;
    const iconWidth = (group === null || group === void 0 ? void 0 : group.icon) !== void 0 ? 26 : 0;
    const totalContentWidth = iconWidth + textWidth;
    const centerX = x + (w2 - totalContentWidth) / 2;
    if ((group === null || group === void 0 ? void 0 : group.icon) !== void 0) {
      spriteManager.drawSprite(group.icon, "normal", ctx, centerX, y + (h - 20) / 2, 20, groupTheme);
    }
    ctx.fillText(displayName, centerX + iconWidth, y + h / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
    if (group !== void 0 && group.actions !== void 0 && isHovered) {
      var _hovered$8;
      const actionBoxes = getActionBoundsForGroup({
        x,
        y,
        width: w2,
        height: h
      }, group.actions);
      ctx.beginPath();
      const fadeStartX = actionBoxes[0].x - 10;
      const fadeWidth = x + w2 - fadeStartX;
      ctx.rect(fadeStartX, y, fadeWidth, h);
      const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
      const trans = withAlpha(fillColor, 0);
      grad.addColorStop(0, trans);
      grad.addColorStop(10 / fadeWidth, fillColor);
      grad.addColorStop(1, fillColor);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 0.6;
      const [mouseX, mouseY] = (_hovered$8 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$8 !== void 0 ? _hovered$8 : [-1, -1];
      for (let i = 0; i < group.actions.length; i++) {
        const action = group.actions[i];
        const box = actionBoxes[i];
        const actionHovered = pointInRect(box, mouseX + x, mouseY);
        if (actionHovered) {
          ctx.globalAlpha = 1;
        }
        spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
        if (actionHovered) {
          ctx.globalAlpha = 0.6;
        }
      }
      ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, y);
      ctx.lineTo(x + 0.5, y + h);
      ctx.stroke();
    }
    if (level < groupLevels - 1 || damage === void 0) {
      ctx.beginPath();
      ctx.moveTo(x, y + h + 0.5);
      ctx.lineTo(x + w2, y + h + 0.5);
      ctx.stroke();
    }
    ctx.restore();
    finalX = Math.max(finalX, x + w2);
  });
  if (damage === void 0) {
    ctx.beginPath();
    ctx.moveTo(finalX + 0.5, 0);
    ctx.lineTo(finalX + 0.5, totalGroupHeaderHeight);
    let borderY = 0;
    for (let level = 0; level < groupLevels - 1; level++) {
      borderY += groupHeaderHeights[level];
      ctx.moveTo(0, borderY + 0.5);
      ctx.lineTo(width, borderY + 0.5);
    }
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
const menuButtonSize = 30;
function getHeaderMenuBounds(x, y, width, height, isRtl) {
  return {
    x: x + width - menuButtonSize,
    y: Math.max(y, y + height / 2 - menuButtonSize / 2),
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
}
function getActionBoundsForGroup(box, actions) {
  const result = [];
  let x = box.x + box.width - 26 * actions.length;
  const y = box.y + box.height / 2 - 13;
  const height = 26;
  const width = 26;
  for (let i = 0; i < actions.length; i++) {
    result.push({
      x,
      y,
      width,
      height
    });
    x += 26;
  }
  return result;
}
function flipHorizontal(toFlip, mirrorX, isRTL) {
  if (!isRTL || toFlip === void 0) return toFlip;
  toFlip.x = mirrorX - (toFlip.x - mirrorX) - toFlip.width;
  return toFlip;
}
function computeHeaderLayout(ctx, c, x, y, width, height, theme, isRTL) {
  var _getMeasuredTextCache, _getMeasuredTextCache2;
  const xPad = theme.cellHorizontalPadding;
  const headerIconSize = theme.headerIconSize;
  const menuBounds = getHeaderMenuBounds(x, y, width, height);
  const textWidth = ctx === void 0 ? (_getMeasuredTextCache = (_getMeasuredTextCache2 = getMeasuredTextCache(c.title, theme.headerFontFull)) === null || _getMeasuredTextCache2 === void 0 ? void 0 : _getMeasuredTextCache2.width) !== null && _getMeasuredTextCache !== void 0 ? _getMeasuredTextCache : 0 : measureTextCached(c.title, ctx, theme.headerFontFull).width;
  const iconAreaWidth = c.icon !== void 0 ? Math.ceil(headerIconSize * 1.3) : 0;
  const coreContentWidth = iconAreaWidth + textWidth;
  const centerStartX = x + Math.max(xPad, (width - coreContentWidth) / 2);
  const iconBounds = c.icon === void 0 ? void 0 : {
    x: centerStartX,
    y: y + (height - headerIconSize) / 2,
    width: headerIconSize,
    height: headerIconSize
  };
  const iconOverlayBounds = iconBounds === void 0 || c.overlayIcon === void 0 ? void 0 : {
    x: iconBounds.x + 9,
    y: iconBounds.y + 6,
    width: 18,
    height: 18
  };
  const textBounds = {
    x: centerStartX + iconAreaWidth,
    y,
    width: textWidth,
    height
  };
  let indicatorIconBounds = void 0;
  if (c.indicatorIcon !== void 0) {
    indicatorIconBounds = {
      x: textBounds.x + textWidth + xPad,
      y: y + (height - headerIconSize) / 2,
      width: headerIconSize,
      height: headerIconSize
    };
  }
  const mirrorPoint = x + width / 2;
  return {
    menuBounds: flipHorizontal(menuBounds, mirrorPoint, isRTL),
    iconBounds: flipHorizontal(iconBounds, mirrorPoint, isRTL),
    iconOverlayBounds: flipHorizontal(iconOverlayBounds, mirrorPoint, isRTL),
    textBounds: flipHorizontal(textBounds, mirrorPoint, isRTL),
    indicatorIconBounds: flipHorizontal(indicatorIconBounds, mirrorPoint, isRTL)
  };
}
function drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout) {
  if (c.rowMarker !== void 0 && c.headerRowMarkerDisabled !== true) {
    const checked = c.rowMarkerChecked;
    if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
      ctx.globalAlpha = hoverAmount;
    }
    const markerTheme = c.headerRowMarkerTheme !== void 0 ? mergeAndRealizeTheme(theme, c.headerRowMarkerTheme) : theme;
    drawCheckbox(ctx, markerTheme, checked, x, y, width, height, false, void 0, void 0, theme.checkboxMaxSize, "center", c.rowMarker);
    if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
      ctx.globalAlpha = 1;
    }
    return;
  }
  const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;
  const shouldDrawMenu = c.hasMenu === true && (isHovered || touchMode && selected) && headerLayout.menuBounds !== void 0;
  if (c.icon !== void 0 && headerLayout.iconBounds !== void 0) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    spriteManager.drawSprite(c.icon, variant, ctx, headerLayout.iconBounds.x, headerLayout.iconBounds.y, headerLayout.iconBounds.width, theme);
    if (c.overlayIcon !== void 0 && headerLayout.iconOverlayBounds !== void 0) {
      spriteManager.drawSprite(c.overlayIcon, selected ? "selected" : "special", ctx, headerLayout.iconOverlayBounds.x, headerLayout.iconOverlayBounds.y, headerLayout.iconOverlayBounds.width, theme);
    }
  }
  if (shouldDrawMenu && width > 35) {
    const fadeWidth = 35;
    const fadeStart = isRtl ? fadeWidth : width - fadeWidth;
    const fadeEnd = isRtl ? fadeWidth * 0.7 : width - fadeWidth * 0.7;
    const fadeStartPercent = fadeStart / width;
    const fadeEndPercent = fadeEnd / width;
    const grad = ctx.createLinearGradient(x, 0, x + width, 0);
    const trans = withAlpha(fillStyle, 0);
    grad.addColorStop(isRtl ? 1 : 0, fillStyle);
    grad.addColorStop(fadeStartPercent, fillStyle);
    grad.addColorStop(fadeEndPercent, trans);
    grad.addColorStop(isRtl ? 0 : 1, trans);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = fillStyle;
  }
  if (isRtl) {
    ctx.textAlign = "right";
  }
  if (headerLayout.textBounds !== void 0) {
    ctx.fillText(c.title, isRtl ? headerLayout.textBounds.x + headerLayout.textBounds.width : headerLayout.textBounds.x, y + height / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
  }
  if (isRtl) {
    ctx.textAlign = "left";
  }
  if (c.indicatorIcon !== void 0 && headerLayout.indicatorIconBounds !== void 0 && (!shouldDrawMenu || !intersectRect(headerLayout.menuBounds.x, headerLayout.menuBounds.y, headerLayout.menuBounds.width, headerLayout.menuBounds.height, headerLayout.indicatorIconBounds.x, headerLayout.indicatorIconBounds.y, headerLayout.indicatorIconBounds.width, headerLayout.indicatorIconBounds.height))) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    spriteManager.drawSprite(c.indicatorIcon, variant, ctx, headerLayout.indicatorIconBounds.x, headerLayout.indicatorIconBounds.y, headerLayout.indicatorIconBounds.width, theme);
  }
  if (shouldDrawMenu && headerLayout.menuBounds !== void 0) {
    const menuBounds = headerLayout.menuBounds;
    const hovered = posX !== void 0 && posY !== void 0 && pointInRect(menuBounds, posX + x, posY + y);
    if (!hovered) {
      ctx.globalAlpha = 0.7;
    }
    if (c.menuIcon === void 0 || c.menuIcon === GridColumnMenuIcon.Triangle) {
      ctx.beginPath();
      const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
      const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
      roundedPoly(ctx, [{
        x: triangleX,
        y: triangleY
      }, {
        x: triangleX + 11,
        y: triangleY
      }, {
        x: triangleX + 5.5,
        y: triangleY + 6
      }], 1);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else if (c.menuIcon === GridColumnMenuIcon.Dots) {
      ctx.beginPath();
      const dotsX = menuBounds.x + menuBounds.width / 2;
      const dotsY = menuBounds.y + menuBounds.height / 2;
      drawMenuDots(ctx, dotsX, dotsY);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else {
      const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
      const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
      spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
    }
    if (!hovered) {
      ctx.globalAlpha = 1;
    }
  }
}
function drawHeader(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hasSelectedCell, hoverAmount, spriteManager, drawHeaderCallback, touchMode) {
  const isRtl = direction(c.title) === "rtl";
  const headerLayout = computeHeaderLayout(ctx, c, x, y, width, height, theme, isRtl);
  if (drawHeaderCallback !== void 0) {
    var _headerLayout$menuBou;
    drawHeaderCallback({
      ctx,
      theme,
      rect: {
        x,
        y,
        width,
        height
      },
      column: c,
      columnIndex: c.sourceIndex,
      isSelected: selected,
      hoverAmount,
      isHovered,
      hasSelectedCell,
      spriteManager,
      menuBounds: (_headerLayout$menuBou = headerLayout === null || headerLayout === void 0 ? void 0 : headerLayout.menuBounds) !== null && _headerLayout$menuBou !== void 0 ? _headerLayout$menuBou : {
        x: 0,
        y: 0,
        height: 0,
        width: 0
      },
      hoverX: posX,
      hoverY: posY
    }, () => drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout));
  } else {
    drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout);
  }
}
var _defineProperty;
var hasRequired_defineProperty;
function require_defineProperty() {
  if (hasRequired_defineProperty) return _defineProperty;
  hasRequired_defineProperty = 1;
  var getNative = require_getNative();
  var defineProperty = (function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  _defineProperty = defineProperty;
  return _defineProperty;
}
var _baseAssignValue;
var hasRequired_baseAssignValue;
function require_baseAssignValue() {
  if (hasRequired_baseAssignValue) return _baseAssignValue;
  hasRequired_baseAssignValue = 1;
  var defineProperty = require_defineProperty();
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  _baseAssignValue = baseAssignValue;
  return _baseAssignValue;
}
var _arrayAggregator;
var hasRequired_arrayAggregator;
function require_arrayAggregator() {
  if (hasRequired_arrayAggregator) return _arrayAggregator;
  hasRequired_arrayAggregator = 1;
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }
  _arrayAggregator = arrayAggregator;
  return _arrayAggregator;
}
var _createBaseFor;
var hasRequired_createBaseFor;
function require_createBaseFor() {
  if (hasRequired_createBaseFor) return _createBaseFor;
  hasRequired_createBaseFor = 1;
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  _createBaseFor = createBaseFor;
  return _createBaseFor;
}
var _baseFor;
var hasRequired_baseFor;
function require_baseFor() {
  if (hasRequired_baseFor) return _baseFor;
  hasRequired_baseFor = 1;
  var createBaseFor = require_createBaseFor();
  var baseFor = createBaseFor();
  _baseFor = baseFor;
  return _baseFor;
}
var _baseTimes;
var hasRequired_baseTimes;
function require_baseTimes() {
  if (hasRequired_baseTimes) return _baseTimes;
  hasRequired_baseTimes = 1;
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  _baseTimes = baseTimes;
  return _baseTimes;
}
var isBuffer = { exports: {} };
var stubFalse_1;
var hasRequiredStubFalse;
function requireStubFalse() {
  if (hasRequiredStubFalse) return stubFalse_1;
  hasRequiredStubFalse = 1;
  function stubFalse() {
    return false;
  }
  stubFalse_1 = stubFalse;
  return stubFalse_1;
}
isBuffer.exports;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer.exports;
  hasRequiredIsBuffer = 1;
  (function(module, exports) {
    var root = require_root(), stubFalse = requireStubFalse();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse;
    module.exports = isBuffer2;
  })(isBuffer, isBuffer.exports);
  return isBuffer.exports;
}
var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;
function require_baseIsTypedArray() {
  if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
  hasRequired_baseIsTypedArray = 1;
  var baseGetTag = require_baseGetTag(), isLength = requireIsLength(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  _baseIsTypedArray = baseIsTypedArray;
  return _baseIsTypedArray;
}
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary) return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary;
  return _baseUnary;
}
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
var hasRequired_nodeUtil;
function require_nodeUtil() {
  if (hasRequired_nodeUtil) return _nodeUtil.exports;
  hasRequired_nodeUtil = 1;
  (function(module, exports) {
    var freeGlobal = require_freeGlobal();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  })(_nodeUtil, _nodeUtil.exports);
  return _nodeUtil.exports;
}
var isTypedArray_1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray_1;
  hasRequiredIsTypedArray = 1;
  var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  isTypedArray_1 = isTypedArray;
  return isTypedArray_1;
}
var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;
function require_arrayLikeKeys() {
  if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
  hasRequired_arrayLikeKeys = 1;
  var baseTimes = require_baseTimes(), isArguments = requireIsArguments(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isIndex = require_isIndex(), isTypedArray = requireIsTypedArray();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  _arrayLikeKeys = arrayLikeKeys;
  return _arrayLikeKeys;
}
var _isPrototype;
var hasRequired_isPrototype;
function require_isPrototype() {
  if (hasRequired_isPrototype) return _isPrototype;
  hasRequired_isPrototype = 1;
  var objectProto = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  _isPrototype = isPrototype;
  return _isPrototype;
}
var _overArg;
var hasRequired_overArg;
function require_overArg() {
  if (hasRequired_overArg) return _overArg;
  hasRequired_overArg = 1;
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  _overArg = overArg;
  return _overArg;
}
var _nativeKeys;
var hasRequired_nativeKeys;
function require_nativeKeys() {
  if (hasRequired_nativeKeys) return _nativeKeys;
  hasRequired_nativeKeys = 1;
  var overArg = require_overArg();
  var nativeKeys = overArg(Object.keys, Object);
  _nativeKeys = nativeKeys;
  return _nativeKeys;
}
var _baseKeys;
var hasRequired_baseKeys;
function require_baseKeys() {
  if (hasRequired_baseKeys) return _baseKeys;
  hasRequired_baseKeys = 1;
  var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeys = baseKeys;
  return _baseKeys;
}
var keys_1;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys) return keys_1;
  hasRequiredKeys = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = requireIsArrayLike();
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  keys_1 = keys;
  return keys_1;
}
var _baseForOwn;
var hasRequired_baseForOwn;
function require_baseForOwn() {
  if (hasRequired_baseForOwn) return _baseForOwn;
  hasRequired_baseForOwn = 1;
  var baseFor = require_baseFor(), keys = requireKeys();
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }
  _baseForOwn = baseForOwn;
  return _baseForOwn;
}
var _createBaseEach;
var hasRequired_createBaseEach;
function require_createBaseEach() {
  if (hasRequired_createBaseEach) return _createBaseEach;
  hasRequired_createBaseEach = 1;
  var isArrayLike = requireIsArrayLike();
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  _createBaseEach = createBaseEach;
  return _createBaseEach;
}
var _baseEach;
var hasRequired_baseEach;
function require_baseEach() {
  if (hasRequired_baseEach) return _baseEach;
  hasRequired_baseEach = 1;
  var baseForOwn = require_baseForOwn(), createBaseEach = require_createBaseEach();
  var baseEach = createBaseEach(baseForOwn);
  _baseEach = baseEach;
  return _baseEach;
}
var _baseAggregator;
var hasRequired_baseAggregator;
function require_baseAggregator() {
  if (hasRequired_baseAggregator) return _baseAggregator;
  hasRequired_baseAggregator = 1;
  var baseEach = require_baseEach();
  function baseAggregator(collection, setter, iteratee, accumulator) {
    baseEach(collection, function(value, key, collection2) {
      setter(accumulator, value, iteratee(value), collection2);
    });
    return accumulator;
  }
  _baseAggregator = baseAggregator;
  return _baseAggregator;
}
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear) return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  _stackClear = stackClear;
  return _stackClear;
}
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete) return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  _stackDelete = stackDelete;
  return _stackDelete;
}
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet) return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  _stackGet = stackGet;
  return _stackGet;
}
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas) return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  _stackHas = stackHas;
  return _stackHas;
}
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet) return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  _stackSet = stackSet;
  return _stackSet;
}
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack) return _Stack;
  hasRequired_Stack = 1;
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  _Stack = Stack;
  return _Stack;
}
var _arraySome;
var hasRequired_arraySome;
function require_arraySome() {
  if (hasRequired_arraySome) return _arraySome;
  hasRequired_arraySome = 1;
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  _arraySome = arraySome;
  return _arraySome;
}
var _equalArrays;
var hasRequired_equalArrays;
function require_equalArrays() {
  if (hasRequired_equalArrays) return _equalArrays;
  hasRequired_equalArrays = 1;
  var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  _equalArrays = equalArrays;
  return _equalArrays;
}
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array) return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root = require_root();
  var Uint8Array = root.Uint8Array;
  _Uint8Array = Uint8Array;
  return _Uint8Array;
}
var _mapToArray;
var hasRequired_mapToArray;
function require_mapToArray() {
  if (hasRequired_mapToArray) return _mapToArray;
  hasRequired_mapToArray = 1;
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  _mapToArray = mapToArray;
  return _mapToArray;
}
var _equalByTag;
var hasRequired_equalByTag;
function require_equalByTag() {
  if (hasRequired_equalByTag) return _equalByTag;
  hasRequired_equalByTag = 1;
  var Symbol2 = require_Symbol(), Uint8Array = require_Uint8Array(), eq = requireEq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  _equalByTag = equalByTag;
  return _equalByTag;
}
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush = require_arrayPush(), isArray = requireIsArray();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  _baseGetAllKeys = baseGetAllKeys;
  return _baseGetAllKeys;
}
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter) return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  _arrayFilter = arrayFilter;
  return _arrayFilter;
}
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray) return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray() {
    return [];
  }
  stubArray_1 = stubArray;
  return stubArray_1;
}
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols) return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter = require_arrayFilter(), stubArray = requireStubArray();
  var objectProto = Object.prototype;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  _getSymbols = getSymbols;
  return _getSymbols;
}
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys) return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = requireKeys();
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  _getAllKeys = getAllKeys;
  return _getAllKeys;
}
var _equalObjects;
var hasRequired_equalObjects;
function require_equalObjects() {
  if (hasRequired_equalObjects) return _equalObjects;
  hasRequired_equalObjects = 1;
  var getAllKeys = require_getAllKeys();
  var COMPARE_PARTIAL_FLAG = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  _equalObjects = equalObjects;
  return _equalObjects;
}
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView) return _DataView;
  hasRequired_DataView = 1;
  var getNative = require_getNative(), root = require_root();
  var DataView = getNative(root, "DataView");
  _DataView = DataView;
  return _DataView;
}
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise) return _Promise;
  hasRequired_Promise = 1;
  var getNative = require_getNative(), root = require_root();
  var Promise2 = getNative(root, "Promise");
  _Promise = Promise2;
  return _Promise;
}
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap) return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative = require_getNative(), root = require_root();
  var WeakMap = getNative(root, "WeakMap");
  _WeakMap = WeakMap;
  return _WeakMap;
}
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag) return _getTag;
  hasRequired_getTag = 1;
  var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource();
  var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  _getTag = getTag;
  return _getTag;
}
var _baseIsEqualDeep;
var hasRequired_baseIsEqualDeep;
function require_baseIsEqualDeep() {
  if (hasRequired_baseIsEqualDeep) return _baseIsEqualDeep;
  hasRequired_baseIsEqualDeep = 1;
  var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag = require_getTag(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isTypedArray = requireIsTypedArray();
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  _baseIsEqualDeep = baseIsEqualDeep;
  return _baseIsEqualDeep;
}
var _baseIsEqual;
var hasRequired_baseIsEqual;
function require_baseIsEqual() {
  if (hasRequired_baseIsEqual) return _baseIsEqual;
  hasRequired_baseIsEqual = 1;
  var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike = requireIsObjectLike();
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  _baseIsEqual = baseIsEqual;
  return _baseIsEqual;
}
var _baseIsMatch;
var hasRequired_baseIsMatch;
function require_baseIsMatch() {
  if (hasRequired_baseIsMatch) return _baseIsMatch;
  hasRequired_baseIsMatch = 1;
  var Stack = require_Stack(), baseIsEqual = require_baseIsEqual();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  _baseIsMatch = baseIsMatch;
  return _baseIsMatch;
}
var _isStrictComparable;
var hasRequired_isStrictComparable;
function require_isStrictComparable() {
  if (hasRequired_isStrictComparable) return _isStrictComparable;
  hasRequired_isStrictComparable = 1;
  var isObject = requireIsObject();
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }
  _isStrictComparable = isStrictComparable;
  return _isStrictComparable;
}
var _getMatchData;
var hasRequired_getMatchData;
function require_getMatchData() {
  if (hasRequired_getMatchData) return _getMatchData;
  hasRequired_getMatchData = 1;
  var isStrictComparable = require_isStrictComparable(), keys = requireKeys();
  function getMatchData(object) {
    var result = keys(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }
  _getMatchData = getMatchData;
  return _getMatchData;
}
var _matchesStrictComparable;
var hasRequired_matchesStrictComparable;
function require_matchesStrictComparable() {
  if (hasRequired_matchesStrictComparable) return _matchesStrictComparable;
  hasRequired_matchesStrictComparable = 1;
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  _matchesStrictComparable = matchesStrictComparable;
  return _matchesStrictComparable;
}
var _baseMatches;
var hasRequired_baseMatches;
function require_baseMatches() {
  if (hasRequired_baseMatches) return _baseMatches;
  hasRequired_baseMatches = 1;
  var baseIsMatch = require_baseIsMatch(), getMatchData = require_getMatchData(), matchesStrictComparable = require_matchesStrictComparable();
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
  _baseMatches = baseMatches;
  return _baseMatches;
}
var _baseGet;
var hasRequired_baseGet;
function require_baseGet() {
  if (hasRequired_baseGet) return _baseGet;
  hasRequired_baseGet = 1;
  var castPath = require_castPath(), toKey = require_toKey();
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  _baseGet = baseGet;
  return _baseGet;
}
var get_1;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get_1;
  hasRequiredGet = 1;
  var baseGet = require_baseGet();
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  get_1 = get;
  return get_1;
}
var _baseHasIn;
var hasRequired_baseHasIn;
function require_baseHasIn() {
  if (hasRequired_baseHasIn) return _baseHasIn;
  hasRequired_baseHasIn = 1;
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  _baseHasIn = baseHasIn;
  return _baseHasIn;
}
var hasIn_1;
var hasRequiredHasIn;
function requireHasIn() {
  if (hasRequiredHasIn) return hasIn_1;
  hasRequiredHasIn = 1;
  var baseHasIn = require_baseHasIn(), hasPath = require_hasPath();
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  hasIn_1 = hasIn;
  return hasIn_1;
}
var _baseMatchesProperty;
var hasRequired_baseMatchesProperty;
function require_baseMatchesProperty() {
  if (hasRequired_baseMatchesProperty) return _baseMatchesProperty;
  hasRequired_baseMatchesProperty = 1;
  var baseIsEqual = require_baseIsEqual(), get = requireGet(), hasIn = requireHasIn(), isKey = require_isKey(), isStrictComparable = require_isStrictComparable(), matchesStrictComparable = require_matchesStrictComparable(), toKey = require_toKey();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }
  _baseMatchesProperty = baseMatchesProperty;
  return _baseMatchesProperty;
}
var identity_1;
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity_1;
  hasRequiredIdentity = 1;
  function identity(value) {
    return value;
  }
  identity_1 = identity;
  return identity_1;
}
var _baseProperty;
var hasRequired_baseProperty;
function require_baseProperty() {
  if (hasRequired_baseProperty) return _baseProperty;
  hasRequired_baseProperty = 1;
  function baseProperty(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  _baseProperty = baseProperty;
  return _baseProperty;
}
var _basePropertyDeep;
var hasRequired_basePropertyDeep;
function require_basePropertyDeep() {
  if (hasRequired_basePropertyDeep) return _basePropertyDeep;
  hasRequired_basePropertyDeep = 1;
  var baseGet = require_baseGet();
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }
  _basePropertyDeep = basePropertyDeep;
  return _basePropertyDeep;
}
var property_1;
var hasRequiredProperty;
function requireProperty() {
  if (hasRequiredProperty) return property_1;
  hasRequiredProperty = 1;
  var baseProperty = require_baseProperty(), basePropertyDeep = require_basePropertyDeep(), isKey = require_isKey(), toKey = require_toKey();
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }
  property_1 = property;
  return property_1;
}
var _baseIteratee;
var hasRequired_baseIteratee;
function require_baseIteratee() {
  if (hasRequired_baseIteratee) return _baseIteratee;
  hasRequired_baseIteratee = 1;
  var baseMatches = require_baseMatches(), baseMatchesProperty = require_baseMatchesProperty(), identity = requireIdentity(), isArray = requireIsArray(), property = requireProperty();
  function baseIteratee(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == "object") {
      return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }
  _baseIteratee = baseIteratee;
  return _baseIteratee;
}
var _createAggregator;
var hasRequired_createAggregator;
function require_createAggregator() {
  if (hasRequired_createAggregator) return _createAggregator;
  hasRequired_createAggregator = 1;
  var arrayAggregator = require_arrayAggregator(), baseAggregator = require_baseAggregator(), baseIteratee = require_baseIteratee(), isArray = requireIsArray();
  function createAggregator(setter, initializer) {
    return function(collection, iteratee) {
      var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
      return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
    };
  }
  _createAggregator = createAggregator;
  return _createAggregator;
}
var groupBy_1;
var hasRequiredGroupBy;
function requireGroupBy() {
  if (hasRequiredGroupBy) return groupBy_1;
  hasRequiredGroupBy = 1;
  var baseAssignValue = require_baseAssignValue(), createAggregator = require_createAggregator();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var groupBy2 = createAggregator(function(result, value, key) {
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      baseAssignValue(result, key, [value]);
    }
  });
  groupBy_1 = groupBy2;
  return groupBy_1;
}
var groupByExports = requireGroupBy();
const groupBy = /* @__PURE__ */ getDefaultExportFromCjs(groupByExports);
function drawBlanks(ctx, effectiveColumns, allColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowTheme, selectedRows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme) {
  if (damage !== void 0 || effectiveColumns[effectiveColumns.length - 1] !== allColumns[effectiveColumns.length - 1]) return;
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawY, clipX, startRow) => {
    if (c !== effectiveColumns[effectiveColumns.length - 1]) return;
    drawX += c.width;
    const x = Math.max(drawX, clipX);
    if (x > width) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, totalHeaderHeight + 1, 1e4, height - totalHeaderHeight - 1);
    ctx.clip();
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky) => {
      if (!isSticky && drawRegions.length > 0 && !drawRegions.some((dr) => intersectRect(drawX, drawY, 1e4, rh, dr.x, dr.y, dr.width, dr.height))) {
        return;
      }
      const rowSelected = selectedRows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      ctx.beginPath();
      const rowTheme = getRowTheme === null || getRowTheme === void 0 ? void 0 : getRowTheme(row);
      const blankTheme = rowTheme === void 0 ? theme : mergeAndRealizeTheme(theme, rowTheme);
      if (blankTheme.bgCell !== theme.bgCell) {
        ctx.fillStyle = blankTheme.bgCell;
        ctx.fillRect(drawX, drawY, 1e4, rh);
      }
      if (rowDisabled) {
        ctx.fillStyle = blankTheme.bgHeader;
        ctx.fillRect(drawX, drawY, 1e4, rh);
      }
      if (rowSelected) {
        ctx.fillStyle = blankTheme.accentLight;
        ctx.fillRect(drawX, drawY, 1e4, rh);
      }
    });
    ctx.restore();
  });
}
function overdrawStickyBoundaries(ctx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme) {
  var _theme$horizontalBord;
  let drawFreezeBorder = false;
  for (const c of effectiveCols) {
    if (c.sticky) continue;
    drawFreezeBorder = verticalBorder(c.sourceIndex);
    break;
  }
  const hColor = (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor;
  const vColor = theme.borderColor;
  const drawX = drawFreezeBorder ? getStickyWidth(effectiveCols) : 0;
  let vStroke;
  if (drawX !== 0) {
    vStroke = blendCache(vColor, theme.bgCell);
    ctx.beginPath();
    ctx.moveTo(drawX + 0.5, 0);
    ctx.lineTo(drawX + 0.5, height);
    ctx.strokeStyle = vStroke;
    ctx.stroke();
  }
  if (freezeTrailingRows > 0) {
    const hStroke = vColor === hColor && vStroke !== void 0 ? vStroke : blendCache(hColor, theme.bgCell);
    const h = getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight);
    ctx.beginPath();
    ctx.moveTo(0, height - h + 0.5);
    ctx.lineTo(width, height - h + 0.5);
    ctx.strokeStyle = hStroke;
    ctx.stroke();
  }
}
const getMinMaxXY = (drawRegions, width, height) => {
  let minX = 0;
  let maxX = width;
  let minY = 0;
  let maxY = height;
  if (drawRegions !== void 0 && drawRegions.length > 0) {
    minX = Number.MAX_SAFE_INTEGER;
    minY = Number.MAX_SAFE_INTEGER;
    maxX = Number.MIN_SAFE_INTEGER;
    maxY = Number.MIN_SAFE_INTEGER;
    for (const r of drawRegions) {
      minX = Math.min(minX, r.x - 1);
      maxX = Math.max(maxX, r.x + r.width + 1);
      minY = Math.min(minY, r.y - 1);
      maxY = Math.max(maxY, r.y + r.height + 1);
    }
  }
  return {
    minX,
    maxX,
    minY,
    maxY
  };
};
function drawExtraRowThemes(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
  const bgCell = theme.bgCell;
  const {
    minX,
    maxX,
    minY,
    maxY
  } = getMinMaxXY(drawRegions, width, height);
  const toDraw = [];
  const freezeY = height - getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight);
  let y = totalHeaderHeight;
  let row = cellYOffset;
  let extraRowsStartY = 0;
  while (y + translateY < freezeY) {
    const ty = y + translateY;
    const rh = getRowHeight(row);
    if (ty >= minY && ty <= maxY - 1) {
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const rowThemeBgCell = rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.bgCell;
      const needDraw = rowThemeBgCell !== void 0 && rowThemeBgCell !== bgCell && row >= rows - freezeTrailingRows;
      if (needDraw) {
        toDraw.push({
          x: minX,
          y: ty,
          w: maxX - minX,
          h: rh,
          color: rowThemeBgCell
        });
      }
    }
    y += rh;
    if (row < rows - freezeTrailingRows) extraRowsStartY = y;
    row++;
  }
  let x = 0;
  const h = Math.min(freezeY, maxY) - extraRowsStartY;
  if (h > 0) {
    for (let index = 0; index < effectiveCols.length; index++) {
      var _c$themeOverride;
      const c = effectiveCols[index];
      if (c.width === 0) continue;
      const tx = c.sticky ? x : x + translateX;
      const colThemeBgCell = (_c$themeOverride = c.themeOverride) === null || _c$themeOverride === void 0 ? void 0 : _c$themeOverride.bgCell;
      if (colThemeBgCell !== void 0 && colThemeBgCell !== bgCell && tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
        toDraw.push({
          x: tx,
          y: extraRowsStartY,
          w: c.width,
          h,
          color: colThemeBgCell
        });
      }
      x += c.width;
    }
  }
  if (toDraw.length === 0) return;
  let color;
  ctx.beginPath();
  for (let i = toDraw.length - 1; i >= 0; i--) {
    const r = toDraw[i];
    if (color === void 0) {
      color = r.color;
    } else if (r.color !== color) {
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      color = r.color;
    }
    ctx.rect(r.x, r.y, r.w, r.h);
  }
  if (color !== void 0) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.beginPath();
}
function drawGridLines(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
  var _theme$horizontalBord2;
  let verticalOnly = arguments.length > 17 && arguments[17] !== void 0 ? arguments[17] : false;
  if (spans !== void 0) {
    ctx.beginPath();
    ctx.save();
    ctx.rect(0, 0, width, height);
    for (const span of spans) {
      ctx.rect(span.x + 1, span.y + 1, span.width - 1, span.height - 1);
    }
    ctx.clip("evenodd");
  }
  const hColor = (_theme$horizontalBord2 = theme.horizontalBorderColor) !== null && _theme$horizontalBord2 !== void 0 ? _theme$horizontalBord2 : theme.borderColor;
  const vColor = theme.borderColor;
  const {
    minX,
    maxX,
    minY,
    maxY
  } = getMinMaxXY(drawRegions, width, height);
  const toDraw = [];
  ctx.beginPath();
  let x = 0.5;
  for (let index = 0; index < effectiveCols.length; index++) {
    const c = effectiveCols[index];
    if (c.width === 0) continue;
    x += c.width;
    const tx = c.sticky ? x : x + translateX;
    if (tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
      toDraw.push({
        x1: tx,
        y1: Math.max(groupHeaderHeight, minY),
        x2: tx,
        y2: Math.min(height, maxY),
        color: vColor
      });
    }
  }
  let freezeY = height + 0.5;
  for (let i = rows - freezeTrailingRows; i < rows; i++) {
    const rh = getRowHeight(i);
    freezeY -= rh;
    toDraw.push({
      x1: minX,
      y1: freezeY,
      x2: maxX,
      y2: freezeY,
      color: hColor
    });
  }
  if (verticalOnly !== true) {
    let y = totalHeaderHeight + 0.5;
    let row = cellYOffset;
    const target = freezeY;
    while (y + translateY < target) {
      const ty = y + translateY;
      if (ty >= minY && ty <= maxY - 1) {
        var _ref, _rowTheme$horizontalB;
        const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
        toDraw.push({
          x1: minX,
          y1: ty,
          x2: maxX,
          y2: ty,
          color: (_ref = (_rowTheme$horizontalB = rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.horizontalBorderColor) !== null && _rowTheme$horizontalB !== void 0 ? _rowTheme$horizontalB : rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.borderColor) !== null && _ref !== void 0 ? _ref : hColor
        });
      }
      y += getRowHeight(row);
      row++;
    }
  }
  const groups = groupBy(toDraw, (line) => line.color);
  for (const g of Object.keys(groups)) {
    ctx.strokeStyle = g;
    for (const line of groups[g]) {
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
    ctx.beginPath();
  }
  if (spans !== void 0) {
    ctx.restore();
  }
}
function blitLastFrame(ctx, blitSource, blitSourceScroll, targetScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, getRowHeight, doubleBuffer) {
  const drawRegions = [];
  ctx.imageSmoothingEnabled = false;
  const minY = Math.min(last.cellYOffset, cellYOffset);
  const maxY = Math.max(last.cellYOffset, cellYOffset);
  let deltaY = 0;
  if (typeof getRowHeight === "number") {
    deltaY += (maxY - minY) * getRowHeight;
  } else {
    for (let i = minY; i < maxY; i++) {
      deltaY += getRowHeight(i);
    }
  }
  if (cellYOffset > last.cellYOffset) {
    deltaY = -deltaY;
  }
  deltaY += translateY - last.translateY;
  const minX = Math.min(last.cellXOffset, cellXOffset);
  const maxX = Math.max(last.cellXOffset, cellXOffset);
  let deltaX = 0;
  for (let i = minX; i < maxX; i++) {
    deltaX += mappedColumns[i].width;
  }
  if (cellXOffset > last.cellXOffset) {
    deltaX = -deltaX;
  }
  deltaX += translateX - last.translateX;
  const stickyWidth = getStickyWidth(effectiveCols);
  if (deltaX !== 0 && deltaY !== 0) {
    return {
      regions: []
    };
  }
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) : 0;
  const blitWidth = width - stickyWidth - Math.abs(deltaX);
  const blitHeight = height - totalHeaderHeight - freezeTrailingRowsHeight - Math.abs(deltaY) - 1;
  if (blitWidth > 150 && blitHeight > 150) {
    const args = {
      sx: 0,
      sy: 0,
      sw: width * dpr,
      sh: height * dpr,
      dx: 0,
      dy: 0,
      dw: width * dpr,
      dh: height * dpr
    };
    if (deltaY > 0) {
      args.sy = (totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (deltaY + totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: totalHeaderHeight,
        width,
        height: deltaY + 1
      });
    } else if (deltaY < 0) {
      args.sy = (-deltaY + totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: height + deltaY - freezeTrailingRowsHeight,
        width,
        height: -deltaY + freezeTrailingRowsHeight
      });
    }
    if (deltaX > 0) {
      args.sx = stickyWidth * dpr;
      args.sw = blitWidth * dpr;
      args.dx = (deltaX + stickyWidth) * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: stickyWidth - 1,
        y: 0,
        width: deltaX + 2,
        height
      });
    } else if (deltaX < 0) {
      args.sx = (stickyWidth - deltaX) * dpr;
      args.sw = blitWidth * dpr;
      args.dx = stickyWidth * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: width + deltaX,
        y: 0,
        width: -deltaX,
        height
      });
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (doubleBuffer) {
      if (stickyWidth > 0 && deltaX !== 0 && deltaY === 0 && (targetScroll === void 0 || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[1]) !== false)) {
        const w2 = stickyWidth * dpr;
        const h = height * dpr;
        ctx.drawImage(blitSource, 0, 0, w2, h, 0, 0, w2, h);
      }
      if (freezeTrailingRowsHeight > 0 && deltaX === 0 && deltaY !== 0 && (targetScroll === void 0 || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[0]) !== false)) {
        const y = (height - freezeTrailingRowsHeight) * dpr;
        const w2 = width * dpr;
        const h = freezeTrailingRowsHeight * dpr;
        ctx.drawImage(blitSource, 0, y, w2, h, 0, y, w2, h);
      }
    }
    ctx.drawImage(blitSource, args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
    ctx.scale(dpr, dpr);
  }
  ctx.imageSmoothingEnabled = true;
  return {
    regions: drawRegions
  };
}
function blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedIndex) {
  const drawRegions = [];
  if (cellXOffset !== last.cellXOffset || cellYOffset !== last.cellYOffset || translateX !== last.translateX || translateY !== last.translateY) {
    return drawRegions;
  }
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _drawY, clipX) => {
    if (c.sourceIndex === resizedIndex) {
      const x = Math.max(drawX, clipX) + 1;
      drawRegions.push({
        x,
        y: 0,
        width: width - x,
        height
      });
      return true;
    }
  });
  return drawRegions;
}
function computeCanBlit(current, last) {
  if (last === void 0) return false;
  if (current.width !== last.width || current.height !== last.height || current.theme !== last.theme || current.headerHeight !== last.headerHeight || current.rowHeight !== last.rowHeight || current.rows !== last.rows || current.freezeColumns !== last.freezeColumns || current.getRowThemeOverride !== last.getRowThemeOverride || current.isFocused !== last.isFocused || current.isResizing !== last.isResizing || current.verticalBorder !== last.verticalBorder || current.getCellContent !== last.getCellContent || current.highlightRegions !== last.highlightRegions || current.selection !== last.selection || current.dragAndDropState !== last.dragAndDropState || current.prelightCells !== last.prelightCells || current.touchMode !== last.touchMode || current.maxScaleFactor !== last.maxScaleFactor) {
    return false;
  }
  if (current.mappedColumns !== last.mappedColumns) {
    if (current.mappedColumns.length > 100 || current.mappedColumns.length !== last.mappedColumns.length) {
      return false;
    }
    let resized;
    for (let i = 0; i < current.mappedColumns.length; i++) {
      const curCol = current.mappedColumns[i];
      const lastCol = last.mappedColumns[i];
      if (deepEqual(curCol, lastCol)) continue;
      if (resized !== void 0) return false;
      if (curCol.width === lastCol.width) return false;
      const {
        width,
        ...curRest
      } = curCol;
      const {
        width: lastWidth,
        ...lastRest
      } = lastCol;
      if (!deepEqual(curRest, lastRest)) return false;
      resized = i;
    }
    if (resized === void 0) {
      return true;
    }
    return resized;
  }
  return true;
}
function drawHighlightRings(ctx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, totalGroupHeaderHeight, rowHeight, freezeTrailingRows, rows, allHighlightRegions, theme, groupLevels, groupHeaderHeights) {
  const highlightRegions = allHighlightRegions === null || allHighlightRegions === void 0 ? void 0 : allHighlightRegions.filter((x) => x.style !== "no-outline");
  if (highlightRegions === void 0 || highlightRegions.length === 0) return void 0;
  const freezeLeft = getStickyWidth(mappedColumns);
  const freezeBottom = getFreezeTrailingHeight(rows, freezeTrailingRows, rowHeight);
  const splitIndicies = [freezeColumns, 0, mappedColumns.length, rows - freezeTrailingRows];
  const splitLocations = [freezeLeft, 0, width, height - freezeBottom];
  const drawRects = highlightRegions.map((h) => {
    var _h$style;
    const r = h.range;
    const style = (_h$style = h.style) !== null && _h$style !== void 0 ? _h$style : "dashed";
    return splitRectIntoRegions(r, splitIndicies, width, height, splitLocations).map((arg) => {
      const rect = arg.rect;
      const topLeftBounds = computeBounds(rect.x, rect.y, width, height, totalGroupHeaderHeight, headerHeight + totalGroupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights);
      const bottomRightBounds = rect.width === 1 && rect.height === 1 ? topLeftBounds : computeBounds(rect.x + rect.width - 1, rect.y + rect.height - 1, width, height, totalGroupHeaderHeight, headerHeight + totalGroupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights);
      if (rect.x + rect.width >= mappedColumns.length) {
        bottomRightBounds.width -= 1;
      }
      if (rect.y + rect.height >= rows) {
        bottomRightBounds.height -= 1;
      }
      return {
        color: h.color,
        style,
        clip: arg.clip,
        rect: hugRectToTarget({
          x: topLeftBounds.x,
          y: topLeftBounds.y,
          width: bottomRightBounds.x + bottomRightBounds.width - topLeftBounds.x,
          height: bottomRightBounds.y + bottomRightBounds.height - topLeftBounds.y
        }, width, height, 8)
      };
    });
  });
  const drawCb = () => {
    ctx.lineWidth = 1;
    let dashed = false;
    for (const dr of drawRects) {
      for (const s of dr) {
        if ((s === null || s === void 0 ? void 0 : s.rect) !== void 0 && intersectRect(0, 0, width, height, s.rect.x, s.rect.y, s.rect.width, s.rect.height)) {
          const wasDashed = dashed;
          const needsClip = !rectContains(s.clip, s.rect);
          ctx.beginPath();
          if (needsClip) {
            ctx.save();
            ctx.rect(s.clip.x, s.clip.y, s.clip.width, s.clip.height);
            ctx.clip();
          }
          if (s.style === "dashed" && !dashed) {
            ctx.setLineDash([5, 3]);
            dashed = true;
          } else if ((s.style === "solid" || s.style === "solid-outline") && dashed) {
            ctx.setLineDash([]);
            dashed = false;
          }
          ctx.strokeStyle = s.style === "solid-outline" ? blend(blend(s.color, theme.borderColor), theme.bgCell) : withAlpha(s.color, 1);
          ctx.closePath();
          ctx.strokeRect(s.rect.x + 0.5, s.rect.y + 0.5, s.rect.width - 1, s.rect.height - 1);
          if (needsClip) {
            ctx.restore();
            dashed = wasDashed;
          }
        }
      }
    }
    if (dashed) {
      ctx.setLineDash([]);
    }
  };
  drawCb();
  return drawCb;
}
function drawColumnResizeOutline(ctx, yOffset, xOffset, height, style) {
  ctx.beginPath();
  ctx.moveTo(yOffset, xOffset);
  ctx.lineTo(yOffset, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = style;
  ctx.stroke();
  ctx.globalAlpha = 1;
}
function drawFillHandle(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, allColumns, theme, totalHeaderHeight, selectedCell, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) {
  var _cell$span;
  if (selectedCell.current === void 0) return void 0;
  const drawFill = fillHandle !== false && fillHandle !== void 0;
  if (!drawFill) return void 0;
  const fill = typeof fillHandle === "object" ? {
    ...DEFAULT_FILL_HANDLE,
    ...fillHandle
  } : DEFAULT_FILL_HANDLE;
  const range2 = selectedCell.current.range;
  const currentItem = selectedCell.current.cell;
  const fillHandleTarget = [range2.x + range2.width - 1, range2.y + range2.height - 1];
  if (currentItem[1] >= rows && fillHandleTarget[1] >= rows) return void 0;
  const mustDraw = effectiveCols.some((c) => c.sourceIndex === currentItem[0] || c.sourceIndex === fillHandleTarget[0]);
  if (!mustDraw) return void 0;
  const [targetCol, targetRow] = selectedCell.current.cell;
  const cell = getCellContent(selectedCell.current.cell);
  const targetColSpan = (_cell$span = cell.span) !== null && _cell$span !== void 0 ? _cell$span : [targetCol, targetCol];
  const isStickyRow = targetRow >= rows - freezeTrailingRows;
  const stickRowHeight = freezeTrailingRows > 0 && !isStickyRow ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) - 1 : 0;
  const fillHandleRow = fillHandleTarget[1];
  let drawHandleCb = void 0;
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (col, drawX, colDrawY, clipX, startRow) => {
    if (col.sticky && targetCol > col.sourceIndex) return;
    const isBeforeTarget = col.sourceIndex < targetColSpan[0];
    const isAfterTarget = col.sourceIndex > targetColSpan[1];
    const isFillHandleCol = col.sourceIndex === fillHandleTarget[0];
    if (!isFillHandleCol && (isBeforeTarget || isAfterTarget)) {
      return;
    }
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, void 0, (drawY, row, rh) => {
      if (row !== targetRow && row !== fillHandleRow) return;
      let cellX = drawX;
      let cellWidth = col.width;
      if (cell.span !== void 0) {
        const areas = getSpanBounds(cell.span, drawX, drawY, col.width, rh, col, allColumns);
        const area = col.sticky ? areas[0] : areas[1];
        if (area !== void 0) {
          cellX = area.x;
          cellWidth = area.width;
        }
      }
      const doHandle = row === fillHandleRow && isFillHandleCol && drawFill;
      if (doHandle) {
        drawHandleCb = () => {
          var _col$themeOverride$ac, _col$themeOverride;
          if (clipX > cellX && !col.sticky) {
            ctx.beginPath();
            ctx.rect(clipX, 0, width - clipX, height);
            ctx.clip();
          }
          const size = fill.size;
          const half = size / 2;
          const hx = cellX + cellWidth + fill.offsetX - half + 0.5;
          const hy = drawY + rh + fill.offsetY - half + 0.5;
          ctx.beginPath();
          if (fill.shape === "circle") {
            ctx.arc(hx + half, hy + half, half, 0, Math.PI * 2);
          } else {
            ctx.rect(hx, hy, size, size);
          }
          ctx.fillStyle = (_col$themeOverride$ac = (_col$themeOverride = col.themeOverride) === null || _col$themeOverride === void 0 ? void 0 : _col$themeOverride.accentColor) !== null && _col$themeOverride$ac !== void 0 ? _col$themeOverride$ac : theme.accentColor;
          ctx.fill();
          if (fill.outline > 0) {
            ctx.lineWidth = fill.outline;
            ctx.strokeStyle = theme.bgCell;
            if (fill.shape === "circle") {
              ctx.beginPath();
              ctx.arc(hx + half, hy + half, half + fill.outline / 2, 0, Math.PI * 2);
              ctx.stroke();
            } else {
              ctx.strokeRect(hx - fill.outline / 2, hy - fill.outline / 2, size + fill.outline, size + fill.outline);
            }
          }
        };
      }
      return drawHandleCb !== void 0;
    });
    return drawHandleCb !== void 0;
  });
  if (drawHandleCb === void 0) return void 0;
  const result = () => {
    var _drawHandleCb;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, totalHeaderHeight, width, height - totalHeaderHeight - stickRowHeight);
    ctx.clip();
    (_drawHandleCb = drawHandleCb) === null || _drawHandleCb === void 0 || _drawHandleCb();
    ctx.restore();
  };
  result();
  return result;
}
function clipHeaderDamage(ctx, effectiveColumns, width, totalGroupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage) {
  if (damage === void 0 || damage.size === 0) return;
  ctx.beginPath();
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _colDrawY, clipX) => {
    const diff = Math.max(0, clipX - drawX);
    const finalX = drawX + diff + 1;
    const finalWidth = c.width - diff - 1;
    if (damage.has([c.sourceIndex, -1])) {
      ctx.rect(finalX, totalGroupHeaderHeight, finalWidth, totalHeaderHeight - totalGroupHeaderHeight);
    }
  });
  ctx.clip();
}
function getLastRow(effectiveColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow) {
  let result = 0;
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (_c, __drawX, colDrawY, _clipX, startRow) => {
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, void 0, (_drawY, row, _rh, isSticky) => {
      if (!isSticky) {
        result = Math.max(row, result);
      }
    });
    return true;
  });
  return result;
}
function drawGrid(arg, lastArg) {
  var _window$devicePixelRa, _selection$current;
  const {
    canvasCtx,
    headerCanvasCtx,
    width,
    height,
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mappedColumns,
    enableGroups,
    freezeColumns,
    dragAndDropState,
    theme,
    drawFocus,
    headerHeight,
    groupHeaderHeight,
    groupLevels,
    groupHeaderHeights,
    disabledRows,
    rowHeight,
    verticalBorder,
    overrideCursor,
    isResizing,
    selection,
    fillHandle,
    freezeTrailingRows,
    rows,
    getCellContent,
    getGroupDetails,
    getRowThemeOverride,
    isFocused,
    drawHeaderCallback,
    prelightCells,
    drawCellCallback,
    highlightRegions,
    resizeCol,
    imageLoader,
    lastBlitData,
    hoverValues,
    hyperWrapping,
    hoverInfo,
    spriteManager,
    maxScaleFactor,
    hasAppendRow,
    touchMode,
    enqueue,
    renderStateProvider,
    getCellRenderer,
    renderStrategy,
    bufferACtx,
    bufferBCtx,
    damage,
    minimumCellWidth,
    resizeIndicator
  } = arg;
  if (width === 0 || height === 0) return;
  const doubleBuffer = renderStrategy === "double-buffer";
  const dpr = Math.min(maxScaleFactor, Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1));
  const canBlit = renderStrategy !== "direct" && computeCanBlit(arg, lastArg);
  const canvas = canvasCtx.canvas;
  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }
  const overlayCanvas = headerCanvasCtx.canvas;
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b2) => a + b2, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const overlayHeight = totalHeaderHeight + 1;
  if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== overlayHeight * dpr) {
    overlayCanvas.width = width * dpr;
    overlayCanvas.height = overlayHeight * dpr;
    overlayCanvas.style.width = width + "px";
    overlayCanvas.style.height = overlayHeight + "px";
  }
  const bufferA = bufferACtx.canvas;
  const bufferB = bufferBCtx.canvas;
  if (doubleBuffer && (bufferA.width !== width * dpr || bufferA.height !== height * dpr)) {
    bufferA.width = width * dpr;
    bufferA.height = height * dpr;
    if (lastBlitData.current !== void 0) lastBlitData.current.aBufferScroll = void 0;
  }
  if (doubleBuffer && (bufferB.width !== width * dpr || bufferB.height !== height * dpr)) {
    bufferB.width = width * dpr;
    bufferB.height = height * dpr;
    if (lastBlitData.current !== void 0) lastBlitData.current.bBufferScroll = void 0;
  }
  const last = lastBlitData.current;
  if (canBlit === true && cellXOffset === (last === null || last === void 0 ? void 0 : last.cellXOffset) && cellYOffset === (last === null || last === void 0 ? void 0 : last.cellYOffset) && translateX === (last === null || last === void 0 ? void 0 : last.translateX) && translateY === (last === null || last === void 0 ? void 0 : last.translateY)) return;
  let mainCtx = null;
  if (doubleBuffer) {
    mainCtx = canvasCtx;
  }
  const overlayCtx = headerCanvasCtx;
  let targetCtx;
  if (!doubleBuffer) {
    targetCtx = canvasCtx;
  } else if (damage !== void 0) {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferBCtx : bufferACtx;
  } else {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferACtx : bufferBCtx;
  }
  const targetBuffer = targetCtx.canvas;
  const blitSource = doubleBuffer ? targetBuffer === bufferA ? bufferB : bufferA : canvas;
  const getRowHeight = typeof rowHeight === "number" ? () => rowHeight : rowHeight;
  overlayCtx.save();
  targetCtx.save();
  overlayCtx.beginPath();
  targetCtx.beginPath();
  overlayCtx.textBaseline = "middle";
  targetCtx.textBaseline = "middle";
  if (dpr !== 1) {
    overlayCtx.scale(dpr, dpr);
    targetCtx.scale(dpr, dpr);
  }
  const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
  let drawRegions = [];
  const mustDrawFocusOnHeader = drawFocus && ((_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell[1]) === cellYOffset && translateY === 0;
  let mustDrawHighlightRingsOnHeader = false;
  if (highlightRegions !== void 0) {
    for (const r of highlightRegions) {
      if (r.style !== "no-outline" && r.range.y === cellYOffset && translateY === 0) {
        mustDrawHighlightRingsOnHeader = true;
        break;
      }
    }
  }
  const drawHeaderTexture = () => {
    var _ref, _theme$headerBottomBo;
    overlayCtx.fillStyle = theme.bgHeader;
    overlayCtx.fillRect(0, 0, width, totalHeaderHeight + 1);
    drawGridHeaders(overlayCtx, effectiveCols, mappedColumns, enableGroups, hoverInfo, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, theme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode, groupLevels, groupHeaderHeights);
    drawGridLines(overlayCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, void 0, void 0, totalGroupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, true);
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, overlayHeight - 0.5);
    overlayCtx.lineTo(width, overlayHeight - 0.5);
    overlayCtx.strokeStyle = blend((_ref = (_theme$headerBottomBo = theme.headerBottomBorderColor) !== null && _theme$headerBottomBo !== void 0 ? _theme$headerBottomBo : theme.horizontalBorderColor) !== null && _ref !== void 0 ? _ref : theme.borderColor, theme.bgHeader);
    overlayCtx.stroke();
    if (mustDrawHighlightRingsOnHeader) {
      drawHighlightRings(overlayCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, totalGroupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme, groupLevels, groupHeaderHeights);
    }
    if (mustDrawFocusOnHeader) {
      drawFillHandle(overlayCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
    }
  };
  if (damage !== void 0) {
    const viewRegionWidth = effectiveCols[effectiveCols.length - 1].sourceIndex + 1;
    const damageInView = damage.hasItemInRegion([{
      x: cellXOffset,
      y: -2,
      width: viewRegionWidth,
      height: 2
    }, {
      x: cellXOffset,
      y: cellYOffset,
      width: viewRegionWidth,
      height: 300
    }, {
      x: 0,
      y: cellYOffset,
      width: freezeColumns,
      height: 300
    }, {
      x: 0,
      y: -2,
      width: freezeColumns,
      height: 2
    }, {
      x: cellXOffset,
      y: rows - freezeTrailingRows,
      width: viewRegionWidth,
      height: freezeTrailingRows,
      when: freezeTrailingRows > 0
    }]);
    const doDamage = (ctx) => {
      drawCells(ctx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
      const selectionCurrent = selection.current;
      if (fillHandle !== false && fillHandle !== void 0 && drawFocus && selectionCurrent !== void 0 && damage.has(rectBottomRight(selectionCurrent.range))) {
        drawFillHandle(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
      }
    };
    if (damageInView) {
      doDamage(targetCtx);
      if (mainCtx !== null) {
        mainCtx.save();
        mainCtx.scale(dpr, dpr);
        mainCtx.textBaseline = "middle";
        doDamage(mainCtx);
        mainCtx.restore();
      }
      const doHeaders = damage.hasHeader();
      if (doHeaders) {
        clipHeaderDamage(overlayCtx, effectiveCols, width, totalGroupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage);
        drawHeaderTexture();
      }
    }
    targetCtx.restore();
    overlayCtx.restore();
    return;
  }
  if (canBlit !== true || cellXOffset !== (last === null || last === void 0 ? void 0 : last.cellXOffset) || cellYOffset !== (last === null || last === void 0 ? void 0 : last.cellYOffset) || translateX !== (last === null || last === void 0 ? void 0 : last.translateX) || translateY !== (last === null || last === void 0 ? void 0 : last.translateY) || mustDrawFocusOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawFocusOnHeader) || mustDrawHighlightRingsOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawHighlightRingsOnHeader)) {
    drawHeaderTexture();
  }
  if (canBlit === true) {
    assert(blitSource !== void 0 && last !== void 0);
    const {
      regions
    } = blitLastFrame(targetCtx, blitSource, blitSource === bufferA ? last.aBufferScroll : last.bBufferScroll, blitSource === bufferA ? last.bBufferScroll : last.aBufferScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, rowHeight, doubleBuffer);
    drawRegions = regions;
  } else if (canBlit !== false) {
    assert(last !== void 0);
    const resizedCol = canBlit;
    drawRegions = blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedCol);
  }
  overdrawStickyBoundaries(targetCtx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme);
  const highlightRedraw = drawHighlightRings(targetCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, totalGroupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme, groupLevels, groupHeaderHeights);
  const focusRedraw = drawFocus ? drawFillHandle(targetCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) : void 0;
  targetCtx.fillStyle = theme.bgCell;
  if (drawRegions.length > 0) {
    targetCtx.beginPath();
    for (const r of drawRegions) {
      targetCtx.rect(r.x, r.y, r.width, r.height);
    }
    targetCtx.clip();
    targetCtx.fill();
    targetCtx.beginPath();
  } else {
    targetCtx.fillRect(0, 0, width, height);
  }
  const spans = drawCells(targetCtx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
  drawBlanks(targetCtx, effectiveCols, mappedColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowThemeOverride, selection.rows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme);
  drawExtraRowThemes(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  drawGridLines(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, totalGroupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  highlightRedraw === null || highlightRedraw === void 0 || highlightRedraw();
  focusRedraw === null || focusRedraw === void 0 || focusRedraw();
  if (isResizing && resizeIndicator !== "none") {
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
      if (c.sourceIndex === resizeCol) {
        var _theme$resizeIndicato;
        drawColumnResizeOutline(overlayCtx, x + c.width, 0, totalHeaderHeight + 1, blend((_theme$resizeIndicato = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato !== void 0 ? _theme$resizeIndicato : theme.accentLight, theme.bgHeader));
        if (resizeIndicator === "full") {
          var _theme$resizeIndicato2;
          drawColumnResizeOutline(targetCtx, x + c.width, totalHeaderHeight, height, blend((_theme$resizeIndicato2 = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato2 !== void 0 ? _theme$resizeIndicato2 : theme.accentLight, theme.bgCell));
        }
        return true;
      }
      return false;
    });
  }
  if (mainCtx !== null) {
    mainCtx.fillStyle = theme.bgCell;
    mainCtx.fillRect(0, 0, width, height);
    mainCtx.drawImage(targetCtx.canvas, 0, 0);
  }
  const lastRowDrawn = getLastRow(effectiveCols, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow);
  imageLoader === null || imageLoader === void 0 || imageLoader.setWindow({
    x: cellXOffset,
    y: cellYOffset,
    width: effectiveCols.length,
    height: lastRowDrawn - cellYOffset
  }, freezeColumns, Array.from({
    length: freezeTrailingRows
  }, (_2, i) => rows - 1 - i));
  const scrollX = last !== void 0 && (cellXOffset !== last.cellXOffset || translateX !== last.translateX);
  const scrollY = last !== void 0 && (cellYOffset !== last.cellYOffset || translateY !== last.translateY);
  lastBlitData.current = {
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mustDrawFocusOnHeader,
    mustDrawHighlightRingsOnHeader,
    lastBuffer: doubleBuffer ? targetBuffer === bufferA ? "a" : "b" : void 0,
    aBufferScroll: targetBuffer === bufferA ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.aBufferScroll,
    bBufferScroll: targetBuffer === bufferB ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.bBufferScroll
  };
  targetCtx.restore();
  overlayCtx.restore();
}
const hoverTime = 80;
function easeOutCubic(x) {
  const x1 = x - 1;
  return x1 * x1 * x1 + 1;
}
class AnimationManager {
  constructor(callback) {
    this.callback = callback;
    this.currentHoveredItem = void 0;
    this.leavingItems = [];
    this.lastAnimationTime = void 0;
    this.addToLeavingItems = (item) => {
      const isAlreadyLeaving = this.leavingItems.some((i) => itemsAreEqual(i.item, item.item));
      if (isAlreadyLeaving) {
        return;
      }
      this.leavingItems.push(item);
    };
    this.removeFromLeavingItems = (item) => {
      var _leavingItem$hoverAmo;
      const leavingItem = this.leavingItems.find((e) => itemsAreEqual(e.item, item));
      this.leavingItems = this.leavingItems.filter((i) => i !== leavingItem);
      return (_leavingItem$hoverAmo = leavingItem === null || leavingItem === void 0 ? void 0 : leavingItem.hoverAmount) !== null && _leavingItem$hoverAmo !== void 0 ? _leavingItem$hoverAmo : 0;
    };
    this.cleanUpLeavingElements = () => {
      this.leavingItems = this.leavingItems.filter((i) => i.hoverAmount > 0);
    };
    this.shouldStep = () => {
      const hasLeavingItems = this.leavingItems.length > 0;
      const currentHoveredIsAnimating = this.currentHoveredItem !== void 0 && this.currentHoveredItem.hoverAmount < 1;
      return hasLeavingItems || currentHoveredIsAnimating;
    };
    this.getAnimatingItems = () => {
      if (this.currentHoveredItem !== void 0) {
        return [...this.leavingItems, this.currentHoveredItem];
      }
      return this.leavingItems.map((x) => ({
        ...x,
        hoverAmount: easeOutCubic(x.hoverAmount)
      }));
    };
    this.step = (timestamp) => {
      if (this.lastAnimationTime === void 0) {
        this.lastAnimationTime = timestamp;
      } else {
        const step = timestamp - this.lastAnimationTime;
        const delta = step / hoverTime;
        for (const item of this.leavingItems) {
          item.hoverAmount = clamp$1(item.hoverAmount - delta, 0, 1);
        }
        if (this.currentHoveredItem !== void 0) {
          this.currentHoveredItem.hoverAmount = clamp$1(this.currentHoveredItem.hoverAmount + delta, 0, 1);
        }
        const animating = this.getAnimatingItems();
        this.callback(animating);
        this.cleanUpLeavingElements();
      }
      if (this.shouldStep()) {
        this.lastAnimationTime = timestamp;
        window.requestAnimationFrame(this.step);
      } else {
        this.lastAnimationTime = void 0;
      }
    };
    this.setHovered = (item) => {
      var _this$currentHoveredI;
      if (itemsAreEqual((_this$currentHoveredI = this.currentHoveredItem) === null || _this$currentHoveredI === void 0 ? void 0 : _this$currentHoveredI.item, item)) {
        return;
      }
      if (this.currentHoveredItem !== void 0) {
        this.addToLeavingItems(this.currentHoveredItem);
      }
      if (item !== void 0) {
        const hoverAmount = this.removeFromLeavingItems(item);
        this.currentHoveredItem = {
          item,
          hoverAmount
        };
      } else {
        this.currentHoveredItem = void 0;
      }
      if (this.lastAnimationTime === void 0) {
        window.requestAnimationFrame(this.step);
      }
    };
  }
}
class Lazy {
  constructor(fn) {
    this.fn = void 0;
    this.val = void 0;
    this.fn = fn;
  }
  get value() {
    var _this$val;
    return (_this$val = this.val) !== null && _this$val !== void 0 ? _this$val : this.val = this.fn();
  }
}
function lazy(fn) {
  return new Lazy(fn);
}
const browserIsFirefox = lazy(() => window.navigator.userAgent.includes("Firefox"));
const browserIsSafari = lazy(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome"));
const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));
function useAnimationQueue(draw) {
  const queue = React.useRef([]);
  const seq = React.useRef(0);
  const drawRef = React.useRef(draw);
  drawRef.current = draw;
  const loop = React.useCallback(() => {
    const requeue = () => window.requestAnimationFrame(fn);
    const fn = () => {
      const toDraw = queue.current.map(unpackNumberToColRow);
      queue.current = [];
      drawRef.current(new CellSet(toDraw));
      if (queue.current.length > 0) {
        seq.current++;
      } else {
        seq.current = 0;
      }
    };
    window.requestAnimationFrame(seq.current > 600 ? requeue : fn);
  }, []);
  return React.useCallback((item) => {
    if (queue.current.length === 0) loop();
    const packed = packColRowToNumber(item[0], item[1]);
    if (queue.current.includes(packed)) return;
    queue.current.push(packed);
  }, [loop]);
}
const headerKind = "header";
const groupHeaderKind = "group-header";
const outOfBoundsKind = "out-of-bounds";
var OutOfBoundsRegionAxis = /* @__PURE__ */ ((OutOfBoundsRegionAxis2) => {
  OutOfBoundsRegionAxis2[OutOfBoundsRegionAxis2["Start"] = -2] = "Start";
  OutOfBoundsRegionAxis2[OutOfBoundsRegionAxis2["StartPadding"] = -1] = "StartPadding";
  OutOfBoundsRegionAxis2[OutOfBoundsRegionAxis2["Center"] = 0] = "Center";
  OutOfBoundsRegionAxis2[OutOfBoundsRegionAxis2["EndPadding"] = 1] = "EndPadding";
  OutOfBoundsRegionAxis2[OutOfBoundsRegionAxis2["End"] = 2] = "End";
  return OutOfBoundsRegionAxis2;
})(OutOfBoundsRegionAxis || {});
function mouseEventArgsAreEqual(args, other) {
  if (args === other) return true;
  if ((args === null || args === void 0 ? void 0 : args.kind) === "out-of-bounds") {
    return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]) && (args === null || args === void 0 ? void 0 : args.region[0]) === (other === null || other === void 0 ? void 0 : other.region[0]) && (args === null || args === void 0 ? void 0 : args.region[1]) === (other === null || other === void 0 ? void 0 : other.region[1]);
  }
  return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]);
}
const getRowData = (cell, getCellRenderer) => {
  var _r$getAccessibilitySt;
  if (cell.kind === GridCellKind.Custom) return cell.copyData;
  const r = getCellRenderer === null || getCellRenderer === void 0 ? void 0 : getCellRenderer(cell);
  return (_r$getAccessibilitySt = r === null || r === void 0 ? void 0 : r.getAccessibilityString(cell)) !== null && _r$getAccessibilitySt !== void 0 ? _r$getAccessibilitySt : "";
};
const DataGrid = (p2, forwardedRef) => {
  var _p$translateX, _p$translateY, _experimental$eventTa, _experimental$enableF, _experimental$enableS, _eventTargetRef$curre, _eventTargetRef$curre2, _eventTargetRef$curre3, _eventTargetRef$curre4, _eventTargetRef$curre5, _eventTargetRef$curre6;
  const {
    width,
    height,
    accessibilityHeight,
    columns,
    cellXOffset: cellXOffsetReal,
    cellYOffset,
    headerHeight,
    fillHandle = false,
    groupHeaderHeight,
    groupLevels,
    groupHeaderHeights,
    rowHeight,
    rows,
    getCellContent,
    getRowThemeOverride,
    onHeaderMenuClick,
    onHeaderIndicatorClick,
    enableGroups,
    isFilling,
    onCanvasFocused,
    onCanvasBlur,
    isFocused,
    selection,
    freezeColumns,
    onContextMenu,
    freezeTrailingRows,
    fixedShadowX = true,
    fixedShadowY = true,
    drawFocusRing,
    onMouseDown,
    onMouseUp,
    onMouseMoveRaw,
    onMouseMove,
    onItemHovered,
    dragAndDropState,
    firstColAccessible,
    onKeyDown,
    onKeyUp,
    highlightRegions,
    canvasRef,
    onDragStart,
    onDragEnd,
    eventTargetRef,
    isResizing,
    resizeColumn: resizeCol,
    isDragging,
    isDraggable = false,
    allowResize,
    disabledRows,
    hasAppendRow,
    getGroupDetails,
    theme,
    prelightCells,
    headerIcons,
    verticalBorder,
    drawCell: drawCellCallback,
    drawHeader: drawHeaderCallback,
    onCellFocused,
    onDragOverCell,
    onDrop,
    onDragLeave,
    imageWindowLoader,
    smoothScrollX = false,
    smoothScrollY = false,
    experimental,
    getCellRenderer,
    resizeIndicator = "full"
  } = p2;
  const translateX = (_p$translateX = p2.translateX) !== null && _p$translateX !== void 0 ? _p$translateX : 0;
  const translateY = (_p$translateY = p2.translateY) !== null && _p$translateY !== void 0 ? _p$translateY : 0;
  const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));
  const ref = React.useRef(null);
  const windowEventTargetRef = React.useRef((_experimental$eventTa = experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget) !== null && _experimental$eventTa !== void 0 ? _experimental$eventTa : window);
  const windowEventTarget = windowEventTargetRef.current;
  const imageLoader = imageWindowLoader;
  const damageRegion = React.useRef();
  const [scrolling, setScrolling] = React.useState(false);
  const hoverValues = React.useRef([]);
  const lastBlitData = React.useRef();
  const [hoveredItemInfo, setHoveredItemInfo] = React.useState();
  const [hoveredOnEdge, setHoveredOnEdge] = React.useState();
  const overlayRef = React.useRef(null);
  const [drawCursorOverride, setDrawCursorOverride] = React.useState();
  const [lastWasTouch, setLastWasTouch] = React.useState(false);
  const lastWasTouchRef = React.useRef(lastWasTouch);
  lastWasTouchRef.current = lastWasTouch;
  const spriteManager = React.useMemo(() => new SpriteManager(headerIcons, () => {
    lastArgsRef.current = void 0;
    lastDrawRef.current();
  }), [headerIcons]);
  const totalGroupHeaderHeight = enableGroups ? groupHeaderHeights.reduce((a, b2) => a + b2, 0) : 0;
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const scrollingStopRef = React.useRef(-1);
  const enableFirefoxRescaling = ((_experimental$enableF = experimental === null || experimental === void 0 ? void 0 : experimental.enableFirefoxRescaling) !== null && _experimental$enableF !== void 0 ? _experimental$enableF : false) && browserIsFirefox.value;
  const enableSafariRescaling = ((_experimental$enableS = experimental === null || experimental === void 0 ? void 0 : experimental.enableSafariRescaling) !== null && _experimental$enableS !== void 0 ? _experimental$enableS : false) && browserIsSafari.value;
  React.useLayoutEffect(() => {
    if (window.devicePixelRatio === 1 || !enableFirefoxRescaling && !enableSafariRescaling) return;
    if (scrollingStopRef.current !== -1) {
      setScrolling(true);
    }
    window.clearTimeout(scrollingStopRef.current);
    scrollingStopRef.current = window.setTimeout(() => {
      setScrolling(false);
      scrollingStopRef.current = -1;
    }, 200);
  }, [cellYOffset, cellXOffset, translateX, translateY, enableFirefoxRescaling, enableSafariRescaling]);
  const mappedColumns = useMappedColumns(columns, freezeColumns);
  const stickyX = React.useMemo(() => fixedShadowX ? getStickyWidth(mappedColumns, dragAndDropState) : 0, [mappedColumns, dragAndDropState, fixedShadowX]);
  const getBoundsForItem = React.useCallback((canvas, col, row) => {
    const rect = canvas.getBoundingClientRect();
    if (col >= mappedColumns.length || row >= rows) {
      return void 0;
    }
    const scale = rect.width / width;
    const result = computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights);
    if (scale !== 1) {
      result.x *= scale;
      result.y *= scale;
      result.width *= scale;
      result.height *= scale;
    }
    result.x += rect.x;
    result.y += rect.y;
    return result;
  }, [width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights]);
  const getMouseArgsForPosition = React.useCallback((canvas_0, posX, posY, ev) => {
    const rect_0 = canvas_0.getBoundingClientRect();
    const scale_0 = rect_0.width / width;
    const x = (posX - rect_0.left) / scale_0;
    const y = (posY - rect_0.top) / scale_0;
    const edgeDetectionBuffer = 5;
    const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, void 0, translateX);
    let button = 0;
    let buttons = 0;
    const isMouse = typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "mouse" || typeof MouseEvent !== "undefined" && ev instanceof MouseEvent;
    const isTouch = typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "touch" || typeof TouchEvent !== "undefined" && ev instanceof TouchEvent;
    if (isMouse) {
      button = ev.button;
      buttons = ev.buttons;
    }
    const col_0 = getColumnIndexForX(x, effectiveCols, translateX);
    const row_0 = getRowIndexForY(y, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, groupLevels, groupHeaderHeights);
    const shiftKey = (ev === null || ev === void 0 ? void 0 : ev.shiftKey) === true;
    const ctrlKey = (ev === null || ev === void 0 ? void 0 : ev.ctrlKey) === true;
    const metaKey = (ev === null || ev === void 0 ? void 0 : ev.metaKey) === true;
    const scrollEdge = [x < 0 ? -1 : width < x ? 1 : 0, y < totalHeaderHeight ? -1 : height < y ? 1 : 0];
    let result_0;
    if (col_0 === -1 || y < 0 || x < 0 || row_0 === void 0 || x > width || y > height) {
      const horizontal = x > width ? 1 : x < 0 ? -1 : 0;
      const vertical = y > height ? 1 : y < 0 ? -1 : 0;
      let innerHorizontal = horizontal * 2;
      let innerVertical = vertical * 2;
      if (horizontal === 0) innerHorizontal = col_0 === -1 ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      if (vertical === 0) innerVertical = row_0 === void 0 ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      let isEdge = false;
      if (col_0 === -1 && row_0 === -1) {
        const b_0 = getBoundsForItem(canvas_0, mappedColumns.length - 1, -1);
        assert(b_0 !== void 0);
        isEdge = posX < b_0.x + b_0.width + edgeDetectionBuffer;
      }
      const isMaybeScrollbar = x > width && x < width + getScrollBarWidth() || y > height && y < height + getScrollBarWidth();
      result_0 = {
        kind: outOfBoundsKind,
        location: [col_0 !== -1 ? col_0 : x < 0 ? 0 : mappedColumns.length - 1, row_0 !== null && row_0 !== void 0 ? row_0 : rows - 1],
        region: [innerHorizontal, innerVertical],
        shiftKey,
        ctrlKey,
        metaKey,
        isEdge,
        isTouch,
        button,
        buttons,
        scrollEdge,
        isMaybeScrollbar
      };
    } else if (row_0 <= -1) {
      let bounds = getBoundsForItem(canvas_0, col_0, row_0);
      assert(bounds !== void 0);
      let isEdge_0 = bounds !== void 0 && bounds.x + bounds.width - posX <= edgeDetectionBuffer;
      const isGroupHeader = enableGroups && row_0 <= -2;
      const groupLevel = isGroupHeader ? -(row_0 + 2) : void 0;
      const previousCol = col_0 - 1;
      if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
        isEdge_0 = true;
        bounds = getBoundsForItem(canvas_0, previousCol, row_0);
        assert(bounds !== void 0);
        result_0 = {
          kind: isGroupHeader ? groupHeaderKind : headerKind,
          location: [previousCol, row_0],
          bounds,
          group: getGroupName(mappedColumns[previousCol].group, groupLevel),
          isEdge: isEdge_0,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      } else {
        result_0 = {
          kind: isGroupHeader ? groupHeaderKind : headerKind,
          group: getGroupName(mappedColumns[col_0].group, groupLevel),
          location: [col_0, row_0],
          bounds,
          isEdge: isEdge_0,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      }
    } else {
      const bounds_0 = getBoundsForItem(canvas_0, col_0, row_0);
      assert(bounds_0 !== void 0);
      const isEdge_1 = bounds_0 !== void 0 && bounds_0.x + bounds_0.width - posX < edgeDetectionBuffer;
      let isFillHandle = false;
      const drawFill = fillHandle !== false && fillHandle !== void 0;
      if (drawFill && selection.current !== void 0) {
        const fill = typeof fillHandle === "object" ? {
          ...DEFAULT_FILL_HANDLE,
          ...fillHandle
        } : DEFAULT_FILL_HANDLE;
        const fillHandleClickSize = fill.size;
        const half = fillHandleClickSize / 2;
        const fillHandleLocation = rectBottomRight(selection.current.range);
        const fillBounds = getBoundsForItem(canvas_0, fillHandleLocation[0], fillHandleLocation[1]);
        if (fillBounds !== void 0) {
          const centerX = fillBounds.x + fillBounds.width + fill.offsetX - half + 0.5;
          const centerY = fillBounds.y + fillBounds.height + fill.offsetY - half + 0.5;
          isFillHandle = Math.abs(centerX - posX) < fillHandleClickSize && Math.abs(centerY - posY) < fillHandleClickSize;
        }
      }
      result_0 = {
        kind: "cell",
        location: [col_0, row_0],
        bounds: bounds_0,
        isEdge: isEdge_1,
        shiftKey,
        ctrlKey,
        isFillHandle,
        metaKey,
        isTouch,
        localEventX: posX - bounds_0.x,
        localEventY: posY - bounds_0.y,
        button,
        buttons,
        scrollEdge
      };
    }
    return result_0;
  }, [width, mappedColumns, cellXOffset, translateX, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, getBoundsForItem, fillHandle, selection, totalHeaderHeight, groupLevels, groupHeaderHeights]);
  const [hoveredItem] = hoveredItemInfo !== null && hoveredItemInfo !== void 0 ? hoveredItemInfo : [];
  const enqueueRef = React.useRef(() => {
  });
  const hoverInfoRef = React.useRef(hoveredItemInfo);
  hoverInfoRef.current = hoveredItemInfo;
  const [bufferACtx, bufferBCtx] = React.useMemo(() => {
    const a_0 = document.createElement("canvas");
    const b_1 = document.createElement("canvas");
    a_0.style["display"] = "none";
    a_0.style["opacity"] = "0";
    a_0.style["position"] = "fixed";
    b_1.style["display"] = "none";
    b_1.style["opacity"] = "0";
    b_1.style["position"] = "fixed";
    return [a_0.getContext("2d", {
      alpha: false
    }), b_1.getContext("2d", {
      alpha: false
    })];
  }, []);
  React.useLayoutEffect(() => {
    if (bufferACtx === null || bufferBCtx === null) return;
    document.documentElement.append(bufferACtx.canvas);
    document.documentElement.append(bufferBCtx.canvas);
    return () => {
      bufferACtx.canvas.remove();
      bufferBCtx.canvas.remove();
    };
  }, [bufferACtx, bufferBCtx]);
  const renderStateProvider = React.useMemo(() => new RenderStateProvider(), []);
  const maxDPR = enableFirefoxRescaling && scrolling ? 1 : enableSafariRescaling && scrolling ? 2 : 5;
  const minimumCellWidth = (experimental === null || experimental === void 0 ? void 0 : experimental.disableMinimumCellWidth) === true ? 1 : 10;
  const lastArgsRef = React.useRef();
  const canvasCtx = React.useRef(null);
  const overlayCtx = React.useRef(null);
  const draw = React.useCallback(() => {
    var _experimental$hyperWr, _experimental$renderS, _hoverInfoRef$current;
    const canvas_1 = ref.current;
    const overlay = overlayRef.current;
    if (canvas_1 === null || overlay === null) return;
    if (canvasCtx.current === null) {
      canvasCtx.current = canvas_1.getContext("2d", {
        alpha: false
      });
      canvas_1.width = 0;
      canvas_1.height = 0;
    }
    if (overlayCtx.current === null) {
      overlayCtx.current = overlay.getContext("2d", {
        alpha: false
      });
      overlay.width = 0;
      overlay.height = 0;
    }
    if (canvasCtx.current === null || overlayCtx.current === null || bufferACtx === null || bufferBCtx === null) {
      return;
    }
    let didOverride = false;
    const overrideCursor = (cursor) => {
      didOverride = true;
      setDrawCursorOverride(cursor);
    };
    const last = lastArgsRef.current;
    const current = {
      headerCanvasCtx: overlayCtx.current,
      canvasCtx: canvasCtx.current,
      bufferACtx,
      bufferBCtx,
      width,
      height,
      cellXOffset,
      cellYOffset,
      translateX: Math.round(translateX),
      translateY: Math.round(translateY),
      mappedColumns,
      enableGroups,
      freezeColumns,
      dragAndDropState,
      theme,
      headerHeight,
      groupHeaderHeight,
      groupLevels,
      groupHeaderHeights,
      disabledRows: disabledRows !== null && disabledRows !== void 0 ? disabledRows : CompactSelection.empty(),
      rowHeight,
      verticalBorder,
      isResizing,
      resizeCol,
      isFocused,
      selection,
      fillHandle,
      drawCellCallback,
      hasAppendRow,
      overrideCursor,
      maxScaleFactor: maxDPR,
      freezeTrailingRows,
      rows,
      drawFocus: drawFocusRing,
      getCellContent,
      getGroupDetails: getGroupDetails !== null && getGroupDetails !== void 0 ? getGroupDetails : (name) => ({
        name
      }),
      getRowThemeOverride,
      drawHeaderCallback,
      prelightCells,
      highlightRegions,
      imageLoader,
      lastBlitData,
      damage: damageRegion.current,
      hoverValues: hoverValues.current,
      hoverInfo: hoverInfoRef.current,
      spriteManager,
      scrolling,
      hyperWrapping: (_experimental$hyperWr = experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping) !== null && _experimental$hyperWr !== void 0 ? _experimental$hyperWr : false,
      touchMode: lastWasTouch,
      enqueue: enqueueRef.current,
      renderStateProvider,
      renderStrategy: (_experimental$renderS = experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy) !== null && _experimental$renderS !== void 0 ? _experimental$renderS : browserIsSafari.value ? "double-buffer" : "single-buffer",
      getCellRenderer,
      minimumCellWidth,
      resizeIndicator
    };
    if (current.damage === void 0) {
      lastArgsRef.current = current;
      drawGrid(current, last);
    } else {
      drawGrid(current, void 0);
    }
    if (!didOverride && (current.damage === void 0 || current.damage.has(hoverInfoRef === null || hoverInfoRef === void 0 || (_hoverInfoRef$current = hoverInfoRef.current) === null || _hoverInfoRef$current === void 0 ? void 0 : _hoverInfoRef$current[0]))) {
      setDrawCursorOverride(void 0);
    }
  }, [bufferACtx, bufferBCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, enableGroups, freezeColumns, dragAndDropState, theme, headerHeight, groupHeaderHeight, groupLevels, groupHeaderHeights, disabledRows, rowHeight, verticalBorder, isResizing, hasAppendRow, resizeCol, isFocused, selection, fillHandle, freezeTrailingRows, rows, drawFocusRing, maxDPR, getCellContent, getGroupDetails, getRowThemeOverride, drawCellCallback, drawHeaderCallback, prelightCells, highlightRegions, imageLoader, spriteManager, scrolling, experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping, experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy, lastWasTouch, renderStateProvider, getCellRenderer, minimumCellWidth, resizeIndicator]);
  const lastDrawRef = React.useRef(draw);
  React.useLayoutEffect(() => {
    draw();
    lastDrawRef.current = draw;
  }, [draw]);
  React.useLayoutEffect(() => {
    const fn = async () => {
      var _document;
      if (((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === void 0) return;
      await document.fonts.ready;
      lastArgsRef.current = void 0;
      lastDrawRef.current();
    };
    void fn();
  }, []);
  const damageInternal = React.useCallback((locations) => {
    damageRegion.current = locations;
    lastDrawRef.current();
    damageRegion.current = void 0;
  }, []);
  const enqueue = useAnimationQueue(damageInternal);
  enqueueRef.current = enqueue;
  const damage = React.useCallback((cells) => {
    damageInternal(new CellSet(cells.map((x_0) => x_0.cell)));
  }, [damageInternal]);
  imageLoader.setCallback(damageInternal);
  const [overFill, setOverFill] = React.useState(false);
  const [hCol, hRow] = hoveredItem !== null && hoveredItem !== void 0 ? hoveredItem : [];
  const headerHovered = hCol !== void 0 && hRow === -1 && hCol >= 0 && hCol < mappedColumns.length && mappedColumns[hCol].headerRowMarkerDisabled !== true;
  const groupHeaderHovered = hCol !== void 0 && hRow === -2;
  let clickableInnerCellHovered = false;
  let editableBoolHovered = false;
  let cursorOverride = drawCursorOverride;
  if (cursorOverride === void 0 && hCol !== void 0 && hRow !== void 0 && hRow > -1 && hRow < rows) {
    const cell = getCellContent([hCol, hRow], true);
    clickableInnerCellHovered = cell.kind === InnerGridCellKind.NewRow || cell.kind === InnerGridCellKind.Marker && cell.markerKind !== "number";
    editableBoolHovered = cell.kind === GridCellKind.Boolean && booleanCellIsEditable(cell);
    cursorOverride = cell.cursor;
  }
  const canDrag = hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false;
  const cursor_0 = isDragging ? "grabbing" : canDrag || isResizing ? "col-resize" : overFill || isFilling ? "crosshair" : cursorOverride !== void 0 ? cursorOverride : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered ? "pointer" : "default";
  const style = React.useMemo(() => ({
    contain: "strict",
    display: "block",
    cursor: cursor_0
  }), [cursor_0]);
  const lastSetCursor = React.useRef("default");
  const target = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
  if (target !== null && target !== void 0 && lastSetCursor.current !== style.cursor) {
    target.style.cursor = lastSetCursor.current = style.cursor;
  }
  const groupHeaderActionForEvent = React.useCallback((group, bounds_1, localEventX, localEventY) => {
    if (getGroupDetails === void 0) return void 0;
    const groupDesc = getGroupDetails(group);
    if (groupDesc.actions !== void 0) {
      const boxes = getActionBoundsForGroup(bounds_1, groupDesc.actions);
      for (const [i, box] of boxes.entries()) {
        if (pointInRect(box, localEventX + bounds_1.x, localEventY + box.y)) {
          return groupDesc.actions[i];
        }
      }
    }
    return void 0;
  }, [getGroupDetails]);
  const isOverHeaderElement = React.useCallback((canvas_2, col_1, clientX, clientY) => {
    const header = mappedColumns[col_1];
    if (!isDragging && !isResizing && !(hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false)) {
      const headerBounds = getBoundsForItem(canvas_2, col_1, -1);
      assert(headerBounds !== void 0);
      const headerLayout = computeHeaderLayout(void 0, header, headerBounds.x, headerBounds.y, headerBounds.width, headerBounds.height, theme, direction(header.title) === "rtl");
      if (header.hasMenu === true && headerLayout.menuBounds !== void 0 && pointInRect(headerLayout.menuBounds, clientX, clientY)) {
        return {
          area: "menu",
          bounds: headerLayout.menuBounds
        };
      } else if (header.indicatorIcon !== void 0 && headerLayout.indicatorIconBounds !== void 0 && pointInRect(headerLayout.indicatorIconBounds, clientX, clientY)) {
        return {
          area: "indicator",
          bounds: headerLayout.indicatorIconBounds
        };
      }
    }
    return void 0;
  }, [mappedColumns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing, theme]);
  const downTime = React.useRef(0);
  const downPosition = React.useRef();
  const mouseDown = React.useRef(false);
  const onPointerDown = React.useCallback((ev_0) => {
    const canvas_3 = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas_3 === null || ev_0.target !== canvas_3 && ev_0.target !== eventTarget) return;
    mouseDown.current = true;
    const clientX_0 = ev_0.clientX;
    const clientY_0 = ev_0.clientY;
    if (ev_0.target === eventTarget && eventTarget !== null) {
      const bounds_2 = eventTarget.getBoundingClientRect();
      if (clientX_0 > bounds_2.right || clientY_0 > bounds_2.bottom) return;
    }
    const args = getMouseArgsForPosition(canvas_3, clientX_0, clientY_0, ev_0);
    downPosition.current = args.location;
    if (args.isTouch) {
      downTime.current = Date.now();
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (args.kind === headerKind && isOverHeaderElement(canvas_3, args.location[0], clientX_0, clientY_0) !== void 0) {
      return;
    } else if (args.kind === groupHeaderKind) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== void 0) {
        return;
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args);
    if (!args.isTouch && isDraggable !== true && isDraggable !== args.kind && args.button < 3 && args.button !== 1) {
      ev_0.preventDefault();
    }
  }, [eventTargetRef, isDraggable, getMouseArgsForPosition, groupHeaderActionForEvent, isOverHeaderElement, onMouseDown]);
  useEventListener("pointerdown", onPointerDown, windowEventTarget, false);
  const lastUpTime = React.useRef(0);
  const onPointerUp = React.useCallback((ev_1) => {
    const lastUpTimeValue = lastUpTime.current;
    lastUpTime.current = Date.now();
    const canvas_4 = ref.current;
    mouseDown.current = false;
    if (onMouseUp === void 0 || canvas_4 === null) return;
    const eventTarget_0 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev_1.target !== canvas_4 && ev_1.target !== eventTarget_0;
    const clientX_1 = ev_1.clientX;
    const clientY_1 = ev_1.clientY;
    const canCancel = ev_1.pointerType === "mouse" ? ev_1.button < 3 : true;
    let args_0 = getMouseArgsForPosition(canvas_4, clientX_1, clientY_1, ev_1);
    if (args_0.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
      args_0 = {
        ...args_0,
        isLongTouch: true
      };
    }
    if (lastUpTimeValue !== 0 && Date.now() - lastUpTimeValue < (args_0.isTouch ? 1e3 : 500)) {
      args_0 = {
        ...args_0,
        isDoubleClick: true
      };
    }
    if (lastWasTouchRef.current !== args_0.isTouch) {
      setLastWasTouch(args_0.isTouch);
    }
    if (!isOutside && ev_1.cancelable && canCancel) {
      ev_1.preventDefault();
    }
    const [col_2] = args_0.location;
    const headerBounds_0 = isOverHeaderElement(canvas_4, col_2, clientX_1, clientY_1);
    if (args_0.kind === headerKind && headerBounds_0 !== void 0) {
      var _downPosition$current, _downPosition$current2;
      if (args_0.button !== 0 || ((_downPosition$current = downPosition.current) === null || _downPosition$current === void 0 ? void 0 : _downPosition$current[0]) !== col_2 || ((_downPosition$current2 = downPosition.current) === null || _downPosition$current2 === void 0 ? void 0 : _downPosition$current2[1]) !== -1) {
        onMouseUp(args_0, true);
      }
      return;
    } else if (args_0.kind === groupHeaderKind) {
      const action_0 = groupHeaderActionForEvent(args_0.group, args_0.bounds, args_0.localEventX, args_0.localEventY);
      if (action_0 !== void 0) {
        if (args_0.button === 0) {
          action_0.onClick(args_0);
        }
        return;
      }
    }
    onMouseUp(args_0, isOutside);
  }, [onMouseUp, eventTargetRef, getMouseArgsForPosition, isOverHeaderElement, groupHeaderActionForEvent]);
  useEventListener("pointerup", onPointerUp, windowEventTarget, false);
  const onClickImpl = React.useCallback((ev_2) => {
    const canvas_5 = ref.current;
    if (canvas_5 === null) return;
    const eventTarget_1 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside_0 = ev_2.target !== canvas_5 && ev_2.target !== eventTarget_1;
    let clientX_2;
    let clientY_2;
    let canCancel_0 = true;
    if (ev_2 instanceof MouseEvent) {
      clientX_2 = ev_2.clientX;
      clientY_2 = ev_2.clientY;
      canCancel_0 = ev_2.button < 3;
    } else {
      clientX_2 = ev_2.changedTouches[0].clientX;
      clientY_2 = ev_2.changedTouches[0].clientY;
    }
    const args_1 = getMouseArgsForPosition(canvas_5, clientX_2, clientY_2, ev_2);
    if (lastWasTouchRef.current !== args_1.isTouch) {
      setLastWasTouch(args_1.isTouch);
    }
    if (!isOutside_0 && ev_2.cancelable && canCancel_0) {
      ev_2.preventDefault();
    }
    const [col_3] = args_1.location;
    if (args_1.kind === headerKind) {
      var _downPosition$current3, _downPosition$current4;
      const headerBounds_1 = isOverHeaderElement(canvas_5, col_3, clientX_2, clientY_2);
      if (headerBounds_1 !== void 0 && args_1.button === 0 && ((_downPosition$current3 = downPosition.current) === null || _downPosition$current3 === void 0 ? void 0 : _downPosition$current3[0]) === col_3 && ((_downPosition$current4 = downPosition.current) === null || _downPosition$current4 === void 0 ? void 0 : _downPosition$current4[1]) === -1) {
        if (headerBounds_1.area === "menu") {
          onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col_3, headerBounds_1.bounds);
        } else if (headerBounds_1.area === "indicator") {
          onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col_3, headerBounds_1.bounds);
        }
      }
    }
  }, [eventTargetRef, getMouseArgsForPosition, isOverHeaderElement, onHeaderMenuClick, onHeaderIndicatorClick]);
  useEventListener("click", onClickImpl, windowEventTarget, false);
  const onContextMenuImpl = React.useCallback((ev_3) => {
    const canvas_6 = ref.current;
    const eventTarget_2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas_6 === null || ev_3.target !== canvas_6 && ev_3.target !== eventTarget_2 || onContextMenu === void 0) return;
    const args_2 = getMouseArgsForPosition(canvas_6, ev_3.clientX, ev_3.clientY, ev_3);
    onContextMenu(args_2, () => {
      if (ev_3.cancelable) ev_3.preventDefault();
    });
  }, [eventTargetRef, getMouseArgsForPosition, onContextMenu]);
  useEventListener("contextmenu", onContextMenuImpl, (_eventTargetRef$curre = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre !== void 0 ? _eventTargetRef$curre : null, false);
  const onAnimationFrame = React.useCallback((values) => {
    damageRegion.current = new CellSet(values.map((x_1) => x_1.item));
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = void 0;
  }, []);
  const animManagerValue = React.useMemo(() => new AnimationManager(onAnimationFrame), [onAnimationFrame]);
  const animationManager = React.useRef(animManagerValue);
  animationManager.current = animManagerValue;
  React.useLayoutEffect(() => {
    const am = animationManager.current;
    if (hoveredItem === void 0 || hoveredItem[1] < 0) {
      am.setHovered(hoveredItem);
      return;
    }
    const cell_0 = getCellContent(hoveredItem, true);
    const r = getCellRenderer(cell_0);
    const cellNeedsHover = r === void 0 && cell_0.kind === GridCellKind.Custom || (r === null || r === void 0 ? void 0 : r.needsHover) !== void 0 && (typeof r.needsHover === "boolean" ? r.needsHover : r.needsHover(cell_0));
    am.setHovered(cellNeedsHover ? hoveredItem : void 0);
  }, [getCellContent, getCellRenderer, hoveredItem]);
  const hoveredRef = React.useRef();
  const onPointerMove = React.useCallback((ev_4) => {
    const canvas_7 = ref.current;
    if (canvas_7 === null) return;
    const eventTarget_3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isIndirect = ev_4.target !== canvas_7 && ev_4.target !== eventTarget_3;
    const args_3 = getMouseArgsForPosition(canvas_7, ev_4.clientX, ev_4.clientY, ev_4);
    if (args_3.kind !== "out-of-bounds" && isIndirect && !mouseDown.current && !args_3.isTouch) {
      return;
    }
    const maybeSetHoveredInfo = (newVal, needPosition) => {
      setHoveredItemInfo((cv) => {
        if (cv === newVal) return cv;
        if ((cv === null || cv === void 0 ? void 0 : cv[0][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][0]) && (cv === null || cv === void 0 ? void 0 : cv[0][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][1]) && ((cv === null || cv === void 0 ? void 0 : cv[1][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][0]) && (cv === null || cv === void 0 ? void 0 : cv[1][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][1]) || !needPosition)) {
          return cv;
        }
        return newVal;
      });
    };
    if (!mouseEventArgsAreEqual(args_3, hoveredRef.current)) {
      setDrawCursorOverride(void 0);
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args_3);
      maybeSetHoveredInfo(args_3.kind === outOfBoundsKind ? void 0 : [args_3.location, [args_3.localEventX, args_3.localEventY]], true);
      hoveredRef.current = args_3;
    } else if (args_3.kind === "cell" || args_3.kind === headerKind || args_3.kind === groupHeaderKind) {
      let needsDamageCell = false;
      let needsHoverPosition = true;
      if (args_3.kind === "cell") {
        var _getCellRenderer;
        const toCheck = getCellContent(args_3.location);
        const rendererNeeds = (_getCellRenderer = getCellRenderer(toCheck)) === null || _getCellRenderer === void 0 ? void 0 : _getCellRenderer.needsHoverPosition;
        needsHoverPosition = rendererNeeds !== null && rendererNeeds !== void 0 ? rendererNeeds : toCheck.kind === GridCellKind.Custom;
        needsDamageCell = needsHoverPosition;
      } else {
        needsDamageCell = true;
      }
      const newInfo = [args_3.location, [args_3.localEventX, args_3.localEventY]];
      maybeSetHoveredInfo(newInfo, needsHoverPosition);
      hoverInfoRef.current = newInfo;
      if (needsDamageCell) {
        damageInternal(new CellSet([args_3.location]));
      }
    }
    const notRowMarkerCol = args_3.location[0] >= (firstColAccessible ? 0 : 1);
    setHoveredOnEdge(args_3.kind === headerKind && args_3.isEdge && notRowMarkerCol && allowResize === true);
    setOverFill(args_3.kind === "cell" && args_3.isFillHandle);
    onMouseMoveRaw === null || onMouseMoveRaw === void 0 || onMouseMoveRaw(ev_4);
    onMouseMove(args_3);
  }, [eventTargetRef, getMouseArgsForPosition, firstColAccessible, allowResize, onMouseMoveRaw, onMouseMove, onItemHovered, getCellContent, getCellRenderer, damageInternal]);
  useEventListener("pointermove", onPointerMove, windowEventTarget, true);
  const onKeyDownImpl = React.useCallback((event) => {
    const canvas_8 = ref.current;
    if (canvas_8 === null) return;
    let bounds_3;
    let location = void 0;
    if (selection.current !== void 0) {
      bounds_3 = getBoundsForItem(canvas_8, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown({
      bounds: bounds_3,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      cancel: () => void 0,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location
    });
  }, [onKeyDown, selection, getBoundsForItem]);
  const onKeyUpImpl = React.useCallback((event_0) => {
    const canvas_9 = ref.current;
    if (canvas_9 === null) return;
    let bounds_4;
    let location_0 = void 0;
    if (selection.current !== void 0) {
      bounds_4 = getBoundsForItem(canvas_9, selection.current.cell[0], selection.current.cell[1]);
      location_0 = selection.current.cell;
    }
    onKeyUp === null || onKeyUp === void 0 || onKeyUp({
      bounds: bounds_4,
      stopPropagation: () => event_0.stopPropagation(),
      preventDefault: () => event_0.preventDefault(),
      cancel: () => void 0,
      ctrlKey: event_0.ctrlKey,
      metaKey: event_0.metaKey,
      shiftKey: event_0.shiftKey,
      altKey: event_0.altKey,
      key: event_0.key,
      keyCode: event_0.keyCode,
      rawEvent: event_0,
      location: location_0
    });
  }, [onKeyUp, selection, getBoundsForItem]);
  const refImpl = React.useCallback((instance) => {
    ref.current = instance;
    if (canvasRef !== void 0) {
      canvasRef.current = instance;
    }
    if (experimental !== null && experimental !== void 0 && experimental.eventTarget) {
      windowEventTargetRef.current = experimental.eventTarget;
    } else if (instance === null) {
      windowEventTargetRef.current = window;
    } else {
      const docRoot = instance.getRootNode();
      if (docRoot === document) windowEventTargetRef.current = window;
      windowEventTargetRef.current = docRoot;
    }
  }, [canvasRef, experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget]);
  const onDragStartImpl = React.useCallback((event_1) => {
    const canvas_10 = ref.current;
    if (canvas_10 === null || isDraggable === false || isResizing) {
      event_1.preventDefault();
      return;
    }
    let dragMime;
    let dragData;
    const args_4 = getMouseArgsForPosition(canvas_10, event_1.clientX, event_1.clientY);
    if (isDraggable !== true && args_4.kind !== isDraggable) {
      event_1.preventDefault();
      return;
    }
    const setData = (mime, payload) => {
      dragMime = mime;
      dragData = payload;
    };
    let dragImage;
    let dragImageX;
    let dragImageY;
    const setDragImage = (image, x_2, y_0) => {
      dragImage = image;
      dragImageX = x_2;
      dragImageY = y_0;
    };
    let prevented = false;
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args_4,
      setData,
      setDragImage,
      preventDefault: () => prevented = true,
      defaultPrevented: () => prevented
    });
    if (!prevented && dragMime !== void 0 && dragData !== void 0 && event_1.dataTransfer !== null) {
      event_1.dataTransfer.setData(dragMime, dragData);
      event_1.dataTransfer.effectAllowed = "copyLink";
      if (dragImage !== void 0 && dragImageX !== void 0 && dragImageY !== void 0) {
        event_1.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
      } else {
        const [col_4, row_1] = args_4.location;
        if (row_1 !== void 0) {
          var _window$devicePixelRa;
          const offscreen = document.createElement("canvas");
          const boundsForDragTarget = getBoundsForItem(canvas_10, col_4, row_1);
          assert(boundsForDragTarget !== void 0);
          const dpr = Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1);
          offscreen.width = boundsForDragTarget.width * dpr;
          offscreen.height = boundsForDragTarget.height * dpr;
          const ctx = offscreen.getContext("2d");
          if (ctx !== null) {
            ctx.scale(dpr, dpr);
            ctx.textBaseline = "middle";
            if (row_1 === -1) {
              ctx.font = theme.headerFontFull;
              ctx.fillStyle = theme.bgHeader;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawHeader(ctx, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, mappedColumns[col_4], false, theme, false, void 0, void 0, false, 0, spriteManager, drawHeaderCallback, false);
            } else {
              ctx.font = theme.baseFontFull;
              ctx.fillStyle = theme.bgCell;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawCell(ctx, getCellContent([col_4, row_1]), 0, row_1, false, false, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, false, theme, theme.bgCell, imageLoader, spriteManager, 1, void 0, false, 0, void 0, void 0, void 0, renderStateProvider, getCellRenderer, () => void 0, 0);
            }
          }
          offscreen.style.left = "-100%";
          offscreen.style.position = "absolute";
          offscreen.style.width = `${boundsForDragTarget.width}px`;
          offscreen.style.height = `${boundsForDragTarget.height}px`;
          document.body.append(offscreen);
          event_1.dataTransfer.setDragImage(offscreen, boundsForDragTarget.width / 2, boundsForDragTarget.height / 2);
          window.setTimeout(() => {
            offscreen.remove();
          }, 0);
        }
      }
    } else {
      event_1.preventDefault();
    }
  }, [isDraggable, isResizing, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme, mappedColumns, spriteManager, drawHeaderCallback, getCellContent, imageLoader, renderStateProvider, getCellRenderer]);
  useEventListener("dragstart", onDragStartImpl, (_eventTargetRef$curre2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre2 !== void 0 ? _eventTargetRef$curre2 : null, false, false);
  const activeDropTarget = React.useRef();
  const onDragOverImpl = React.useCallback((event_2) => {
    var _activeDropTarget$cur;
    const canvas_11 = ref.current;
    if (onDrop !== void 0) {
      event_2.preventDefault();
    }
    if (canvas_11 === null || onDragOverCell === void 0) {
      return;
    }
    const args_5 = getMouseArgsForPosition(canvas_11, event_2.clientX, event_2.clientY);
    const [rawCol, row_2] = args_5.location;
    const col_5 = rawCol - (firstColAccessible ? 0 : 1);
    const [activeCol, activeRow] = (_activeDropTarget$cur = activeDropTarget.current) !== null && _activeDropTarget$cur !== void 0 ? _activeDropTarget$cur : [];
    if (activeCol !== col_5 || activeRow !== row_2) {
      activeDropTarget.current = [col_5, row_2];
      onDragOverCell([col_5, row_2], event_2.dataTransfer);
    }
  }, [firstColAccessible, getMouseArgsForPosition, onDragOverCell, onDrop]);
  useEventListener("dragover", onDragOverImpl, (_eventTargetRef$curre3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre3 !== void 0 ? _eventTargetRef$curre3 : null, false, false);
  const onDragEndImpl = React.useCallback(() => {
    activeDropTarget.current = void 0;
    onDragEnd === null || onDragEnd === void 0 || onDragEnd();
  }, [onDragEnd]);
  useEventListener("dragend", onDragEndImpl, (_eventTargetRef$curre4 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre4 !== void 0 ? _eventTargetRef$curre4 : null, false, false);
  const onDropImpl = React.useCallback((event_3) => {
    const canvas_12 = ref.current;
    if (canvas_12 === null || onDrop === void 0) {
      return;
    }
    event_3.preventDefault();
    const args_6 = getMouseArgsForPosition(canvas_12, event_3.clientX, event_3.clientY);
    const [rawCol_0, row_3] = args_6.location;
    const col_6 = rawCol_0 - (firstColAccessible ? 0 : 1);
    onDrop([col_6, row_3], event_3.dataTransfer);
  }, [firstColAccessible, getMouseArgsForPosition, onDrop]);
  useEventListener("drop", onDropImpl, (_eventTargetRef$curre5 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre5 !== void 0 ? _eventTargetRef$curre5 : null, false, false);
  const onDragLeaveImpl = React.useCallback(() => {
    onDragLeave === null || onDragLeave === void 0 || onDragLeave();
  }, [onDragLeave]);
  useEventListener("dragleave", onDragLeaveImpl, (_eventTargetRef$curre6 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre6 !== void 0 ? _eventTargetRef$curre6 : null, false, false);
  const selectionRef = React.useRef(selection);
  selectionRef.current = selection;
  const focusRef = React.useRef(null);
  const focusElement = React.useCallback((el) => {
    if (ref.current === null || !ref.current.contains(document.activeElement)) return;
    if (el === null && selectionRef.current.current !== void 0) {
      var _canvasRef$current;
      canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus({
        preventScroll: true
      });
    } else if (el !== null) {
      el.focus({
        preventScroll: true
      });
    }
    focusRef.current = el;
  }, [canvasRef]);
  React.useImperativeHandle(forwardedRef, () => ({
    focus: () => {
      const el_0 = focusRef.current;
      if (el_0 === null || !document.contains(el_0)) {
        var _canvasRef$current2;
        canvasRef === null || canvasRef === void 0 || (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 || _canvasRef$current2.focus({
          preventScroll: true
        });
      } else {
        el_0.focus({
          preventScroll: true
        });
      }
    },
    getBounds: (col_7, row_4) => {
      if (canvasRef === void 0 || canvasRef.current === null) {
        return void 0;
      }
      return getBoundsForItem(canvasRef.current, col_7 !== null && col_7 !== void 0 ? col_7 : 0, row_4 !== null && row_4 !== void 0 ? row_4 : -1);
    },
    damage,
    getMouseArgsForPosition: (posX_0, posY_0, ev_5) => {
      if (canvasRef === void 0 || canvasRef.current === null) {
        return void 0;
      }
      return getMouseArgsForPosition(canvasRef.current, posX_0, posY_0, ev_5);
    }
  }), [canvasRef, damage, getBoundsForItem, getMouseArgsForPosition]);
  const lastFocusedSubdomNode = React.useRef();
  const accessibilityTree = useDebouncedMemo(() => {
    var _effectiveCols_0$, _selection$current$ce, _selection$current, _selection$current2;
    if (width < 50 || (experimental === null || experimental === void 0 ? void 0 : experimental.disableAccessibilityTree) === true) return null;
    let effectiveCols_0 = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    const colOffset = firstColAccessible ? 0 : -1;
    if (!firstColAccessible && ((_effectiveCols_0$ = effectiveCols_0[0]) === null || _effectiveCols_0$ === void 0 ? void 0 : _effectiveCols_0$.sourceIndex) === 0) {
      effectiveCols_0 = effectiveCols_0.slice(1);
    }
    const [fCol, fRow] = (_selection$current$ce = (_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell) !== null && _selection$current$ce !== void 0 ? _selection$current$ce : [];
    const range$1 = (_selection$current2 = selection.current) === null || _selection$current2 === void 0 ? void 0 : _selection$current2.range;
    const visibleCols = effectiveCols_0.map((c) => c.sourceIndex);
    const visibleRows = range(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));
    if (fCol !== void 0 && fRow !== void 0 && !(visibleCols.includes(fCol) && visibleRows.includes(fRow))) {
      focusElement(null);
    }
    return /* @__PURE__ */ jsxs("table", { role: "grid", "aria-rowcount": rows + 1, "aria-multiselectable": "true", "aria-colcount": mappedColumns.length + colOffset, children: [
      /* @__PURE__ */ jsx("thead", { role: "rowgroup", children: /* @__PURE__ */ jsx("tr", { role: "row", "aria-rowindex": 1, children: effectiveCols_0.map((c_0) => /* @__PURE__ */ jsx("th", { role: "columnheader", "aria-selected": selection.columns.hasIndex(c_0.sourceIndex), "aria-colindex": c_0.sourceIndex + 1 + colOffset, tabIndex: -1, onFocus: (e) => {
        if (e.target === focusRef.current) return;
        return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused([c_0.sourceIndex, -1]);
      }, children: c_0.title }, c_0.sourceIndex)) }) }),
      /* @__PURE__ */ jsx("tbody", { role: "rowgroup", children: visibleRows.map((row_5) => /* @__PURE__ */ jsx("tr", { role: "row", "aria-selected": selection.rows.hasIndex(row_5), "aria-rowindex": row_5 + 2, children: effectiveCols_0.map((c_1) => {
        const col_8 = c_1.sourceIndex;
        const key = packColRowToNumber(col_8, row_5);
        const focused = fCol === col_8 && fRow === row_5;
        const selected = range$1 !== void 0 && col_8 >= range$1.x && col_8 < range$1.x + range$1.width && row_5 >= range$1.y && row_5 < range$1.y + range$1.height;
        const id = `glide-cell-${col_8}-${row_5}`;
        const location_1 = [col_8, row_5];
        const cellContent = getCellContent(location_1, true);
        return /* @__PURE__ */ jsx("td", { role: "gridcell", "aria-colindex": col_8 + 1 + colOffset, "aria-selected": selected, "aria-readonly": isInnerOnlyCell(cellContent) || !isReadWriteCell(cellContent), id, "data-testid": id, onClick: () => {
          const canvas_13 = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
          if (canvas_13 === null || canvas_13 === void 0) return;
          return onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
            bounds: getBoundsForItem(canvas_13, col_8, row_5),
            cancel: () => void 0,
            preventDefault: () => void 0,
            stopPropagation: () => void 0,
            ctrlKey: false,
            key: "Enter",
            keyCode: 13,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: void 0,
            location: location_1
          });
        }, onFocusCapture: (e_0) => {
          var _lastFocusedSubdomNod, _lastFocusedSubdomNod2;
          if (e_0.target === focusRef.current || ((_lastFocusedSubdomNod = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod === void 0 ? void 0 : _lastFocusedSubdomNod[0]) === col_8 && ((_lastFocusedSubdomNod2 = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod2 === void 0 ? void 0 : _lastFocusedSubdomNod2[1]) === row_5) return;
          lastFocusedSubdomNode.current = location_1;
          return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused(location_1);
        }, ref: focused ? focusElement : void 0, tabIndex: -1, children: getRowData(cellContent, getCellRenderer) }, key);
      }) }, row_5)) })
    ] }, "access-tree");
  }, [width, mappedColumns, cellXOffset, dragAndDropState, translateX, rows, cellYOffset, accessibilityHeight, selection, focusElement, getCellContent, canvasRef, onKeyDown, getBoundsForItem, onCellFocused], 200);
  const opacityX = freezeColumns === 0 || !fixedShadowX ? 0 : cellXOffset > freezeColumns ? 1 : clamp$1(-translateX / 100, 0, 1);
  const absoluteOffsetY = -cellYOffset * 32 + translateY;
  const opacityY = !fixedShadowY ? 0 : clamp$1(-absoluteOffsetY / 100, 0, 1);
  const stickyShadow = React.useMemo(() => {
    if (!opacityX && !opacityY) {
      return null;
    }
    const styleX = {
      position: "absolute",
      top: 0,
      left: stickyX,
      width: width - stickyX,
      height,
      opacity: opacityX,
      pointerEvents: "none",
      transition: !smoothScrollX ? "opacity 0.2s" : void 0,
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    };
    const styleY = {
      position: "absolute",
      top: totalHeaderHeight,
      left: 0,
      width,
      height,
      opacity: opacityY,
      pointerEvents: "none",
      transition: !smoothScrollY ? "opacity 0.2s" : void 0,
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      opacityX > 0 && /* @__PURE__ */ jsx("div", { id: "shadow-x", style: styleX }),
      opacityY > 0 && /* @__PURE__ */ jsx("div", { id: "shadow-y", style: styleY })
    ] });
  }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);
  const overlayStyle = React.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: "none"
  }), []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("canvas", { "data-testid": "data-grid-canvas", tabIndex: -1, onKeyDown: onKeyDownImpl, onKeyUp: onKeyUpImpl, onFocus: onCanvasFocused, onBlur: onCanvasBlur, ref: refImpl, style, children: accessibilityTree }),
    /* @__PURE__ */ jsx("canvas", { ref: overlayRef, style: overlayStyle }),
    stickyShadow
  ] });
};
const DataGrid$1 = React.memo(React.forwardRef(DataGrid));
function offsetColumnSize(column, width, min, max) {
  var _column$growOffset;
  return clamp$1(Math.round(width - ((_column$growOffset = column.growOffset) !== null && _column$growOffset !== void 0 ? _column$growOffset : 0)), Math.ceil(min), Math.floor(max));
}
const DataGridDnd = (p2) => {
  var _ref;
  const $ = compilerRuntimeExports.c(137);
  const [resizeColStartX, setResizeColStartX] = React.useState();
  const [resizeCol, setResizeCol] = React.useState();
  const [dragCol, setDragCol] = React.useState();
  const [dropCol, setDropCol] = React.useState();
  const [dragColActive, setDragColActive] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState();
  const [dragRow, setDragRow] = React.useState();
  const [dropRow, setDropRow] = React.useState();
  const [dragRowActive, setDragRowActive] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState();
  const {
    onHeaderMenuClick,
    onHeaderIndicatorClick,
    getCellContent,
    onColumnMoved,
    onColumnResize,
    onColumnResizeStart,
    onColumnResizeEnd,
    gridRef,
    maxColumnWidth,
    minColumnWidth,
    onRowMoved,
    lockColumns,
    onColumnProposeMove,
    onMouseDown,
    onMouseUp,
    onItemHovered,
    onDragStart,
    canvasRef
  } = p2;
  const canResize = ((_ref = onColumnResize !== null && onColumnResize !== void 0 ? onColumnResize : onColumnResizeEnd) !== null && _ref !== void 0 ? _ref : onColumnResizeStart) !== void 0;
  const {
    columns,
    selection
  } = p2;
  const selectedColumns = selection.columns;
  let t0;
  if ($[0] !== dragCol || $[1] !== dragColActive || $[2] !== dragRow || $[3] !== dragRowActive || $[4] !== dropCol || $[5] !== lockColumns || $[6] !== onItemHovered || $[7] !== resizeCol) {
    t0 = (args) => {
      const [col, row] = args.location;
      if (dragCol !== void 0 && dropCol !== col && col >= lockColumns) {
        setDragColActive(true);
        setDropCol(col);
      } else {
        if (dragRow !== void 0 && row !== void 0) {
          setDragRowActive(true);
          setDropRow(Math.max(0, row));
        } else {
          if (resizeCol === void 0 && !dragColActive && !dragRowActive) {
            onItemHovered === null || onItemHovered === void 0 || onItemHovered(args);
          }
        }
      }
    };
    $[0] = dragCol;
    $[1] = dragColActive;
    $[2] = dragRow;
    $[3] = dragRowActive;
    $[4] = dropCol;
    $[5] = lockColumns;
    $[6] = onItemHovered;
    $[7] = resizeCol;
    $[8] = t0;
  } else {
    t0 = $[8];
  }
  const onItemHoveredImpl = t0;
  const canDragCol = onColumnMoved !== void 0;
  let t1;
  if ($[9] !== canDragCol || $[10] !== canResize || $[11] !== canvasRef || $[12] !== columns || $[13] !== gridRef || $[14] !== lockColumns || $[15] !== onColumnResizeStart || $[16] !== onMouseDown || $[17] !== onRowMoved) {
    t1 = (args_0) => {
      if (args_0.button === 0) {
        const [col_0, row_0] = args_0.location;
        if (args_0.kind === "out-of-bounds" && args_0.isEdge && canResize) {
          var _gridRef$current;
          const bounds = gridRef === null || gridRef === void 0 || (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.getBounds(columns.length - 1, -1);
          if (bounds !== void 0) {
            setResizeColStartX(bounds.x);
            setResizeCol(columns.length - 1);
          }
        } else {
          if (args_0.kind === "header" && col_0 >= lockColumns) {
            const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
            if (args_0.isEdge && canResize && canvas) {
              var _columns$col_0$growOf;
              setResizeColStartX(args_0.bounds.x);
              setResizeCol(col_0);
              const rect = canvas.getBoundingClientRect();
              const scale = rect.width / canvas.offsetWidth;
              const width = args_0.bounds.width / scale;
              onColumnResizeStart === null || onColumnResizeStart === void 0 || onColumnResizeStart(columns[col_0], width, col_0, width + ((_columns$col_0$growOf = columns[col_0].growOffset) !== null && _columns$col_0$growOf !== void 0 ? _columns$col_0$growOf : 0));
            } else {
              if (args_0.kind === "header" && canDragCol) {
                setDragStartX(args_0.bounds.x);
                setDragCol(col_0);
              }
            }
          } else {
            if (args_0.kind === "cell" && lockColumns > 0 && col_0 === 0 && row_0 !== void 0 && onRowMoved !== void 0) {
              setDragStartY(args_0.bounds.y);
              setDragRow(row_0);
            }
          }
        }
      }
      onMouseDown === null || onMouseDown === void 0 || onMouseDown(args_0);
    };
    $[9] = canDragCol;
    $[10] = canResize;
    $[11] = canvasRef;
    $[12] = columns;
    $[13] = gridRef;
    $[14] = lockColumns;
    $[15] = onColumnResizeStart;
    $[16] = onMouseDown;
    $[17] = onRowMoved;
    $[18] = t1;
  } else {
    t1 = $[18];
  }
  const onMouseDownImpl = t1;
  let t2;
  if ($[19] !== dragColActive || $[20] !== dragRowActive || $[21] !== onHeaderMenuClick) {
    t2 = (col_1, screenPosition) => {
      if (dragColActive || dragRowActive) {
        return;
      }
      onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col_1, screenPosition);
    };
    $[19] = dragColActive;
    $[20] = dragRowActive;
    $[21] = onHeaderMenuClick;
    $[22] = t2;
  } else {
    t2 = $[22];
  }
  const onHeaderMenuClickMangled = t2;
  let t3;
  if ($[23] !== dragColActive || $[24] !== dragRowActive || $[25] !== onHeaderIndicatorClick) {
    t3 = (col_2, screenPosition_0) => {
      if (dragColActive || dragRowActive) {
        return;
      }
      onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col_2, screenPosition_0);
    };
    $[23] = dragColActive;
    $[24] = dragRowActive;
    $[25] = onHeaderIndicatorClick;
    $[26] = t3;
  } else {
    t3 = $[26];
  }
  const onHeaderIndicatorClickMangled = t3;
  const lastResizeWidthRef = React.useRef(-1);
  let t4;
  if ($[27] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t4 = () => {
      lastResizeWidthRef.current = -1;
      setDragRow(void 0);
      setDropRow(void 0);
      setDragStartY(void 0);
      setDragRowActive(false);
      setDragCol(void 0);
      setDropCol(void 0);
      setDragStartX(void 0);
      setDragColActive(false);
      setResizeCol(void 0);
      setResizeColStartX(void 0);
    };
    $[27] = t4;
  } else {
    t4 = $[27];
  }
  const clearAll = t4;
  let t5;
  if ($[28] !== columns || $[29] !== dragCol || $[30] !== dragRow || $[31] !== dropCol || $[32] !== dropRow || $[33] !== maxColumnWidth || $[34] !== minColumnWidth || $[35] !== onColumnMoved || $[36] !== onColumnProposeMove || $[37] !== onColumnResize || $[38] !== onColumnResizeEnd || $[39] !== onMouseUp || $[40] !== onRowMoved || $[41] !== resizeCol || $[42] !== selectedColumns) {
    t5 = (args_1, isOutside) => {
      if (args_1.button === 0) {
        if (resizeCol !== void 0) {
          var _columns$resizeCol$gr;
          if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.hasIndex(resizeCol)) === true) {
            for (const c of selectedColumns) {
              var _col_3$growOffset;
              if (c === resizeCol) {
                continue;
              }
              const col_3 = columns[c];
              const newSize = offsetColumnSize(col_3, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
              onColumnResize === null || onColumnResize === void 0 || onColumnResize(col_3, newSize, c, newSize + ((_col_3$growOffset = col_3.growOffset) !== null && _col_3$growOffset !== void 0 ? _col_3$growOffset : 0));
            }
          }
          const ns = offsetColumnSize(columns[resizeCol], lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
          onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(columns[resizeCol], ns, resizeCol, ns + ((_columns$resizeCol$gr = columns[resizeCol].growOffset) !== null && _columns$resizeCol$gr !== void 0 ? _columns$resizeCol$gr : 0));
          if (selectedColumns.hasIndex(resizeCol)) {
            for (const c_0 of selectedColumns) {
              var _col_4$growOffset;
              if (c_0 === resizeCol) {
                continue;
              }
              const col_4 = columns[c_0];
              const s = offsetColumnSize(col_4, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
              onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(col_4, s, c_0, s + ((_col_4$growOffset = col_4.growOffset) !== null && _col_4$growOffset !== void 0 ? _col_4$growOffset : 0));
            }
          }
        }
        clearAll();
        if (dragCol !== void 0 && dropCol !== void 0 && (onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(dragCol, dropCol)) !== false) {
          onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(dragCol, dropCol);
        }
        if (dragRow !== void 0 && dropRow !== void 0) {
          onRowMoved === null || onRowMoved === void 0 || onRowMoved(dragRow, dropRow);
        }
      }
      onMouseUp === null || onMouseUp === void 0 || onMouseUp(args_1, isOutside);
    };
    $[28] = columns;
    $[29] = dragCol;
    $[30] = dragRow;
    $[31] = dropCol;
    $[32] = dropRow;
    $[33] = maxColumnWidth;
    $[34] = minColumnWidth;
    $[35] = onColumnMoved;
    $[36] = onColumnProposeMove;
    $[37] = onColumnResize;
    $[38] = onColumnResizeEnd;
    $[39] = onMouseUp;
    $[40] = onRowMoved;
    $[41] = resizeCol;
    $[42] = selectedColumns;
    $[43] = t5;
  } else {
    t5 = $[43];
  }
  const onMouseUpImpl = t5;
  let t6;
  bb0: {
    if (dragCol === void 0 || dropCol === void 0) {
      t6 = void 0;
      break bb0;
    }
    if (dragCol === dropCol) {
      t6 = void 0;
      break bb0;
    }
    if ((onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(dragCol, dropCol)) === false) {
      t6 = void 0;
      break bb0;
    }
    let t72;
    if ($[44] !== dragCol || $[45] !== dropCol) {
      t72 = {
        src: dragCol,
        dest: dropCol
      };
      $[44] = dragCol;
      $[45] = dropCol;
      $[46] = t72;
    } else {
      t72 = $[46];
    }
    t6 = t72;
  }
  const dragOffset = t6;
  let t7;
  if ($[47] !== canvasRef || $[48] !== columns || $[49] !== dragCol || $[50] !== dragRow || $[51] !== dragStartX || $[52] !== dragStartY || $[53] !== maxColumnWidth || $[54] !== minColumnWidth || $[55] !== onColumnResize || $[56] !== resizeCol || $[57] !== resizeColStartX || $[58] !== selectedColumns) {
    t7 = (event) => {
      const canvas_0 = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
      if (dragCol !== void 0 && dragStartX !== void 0) {
        const diff = Math.abs(event.clientX - dragStartX);
        if (diff > 20) {
          setDragColActive(true);
        }
      } else {
        if (dragRow !== void 0 && dragStartY !== void 0) {
          const diff_0 = Math.abs(event.clientY - dragStartY);
          if (diff_0 > 20) {
            setDragRowActive(true);
          }
        } else {
          if (resizeCol !== void 0 && resizeColStartX !== void 0 && canvas_0) {
            var _column$growOffset2;
            const rect_0 = canvas_0.getBoundingClientRect();
            const scale_0 = rect_0.width / canvas_0.offsetWidth;
            const newWidth = (event.clientX - resizeColStartX) / scale_0;
            const column = columns[resizeCol];
            const ns_0 = offsetColumnSize(column, newWidth, minColumnWidth, maxColumnWidth);
            onColumnResize === null || onColumnResize === void 0 || onColumnResize(column, ns_0, resizeCol, ns_0 + ((_column$growOffset2 = column.growOffset) !== null && _column$growOffset2 !== void 0 ? _column$growOffset2 : 0));
            lastResizeWidthRef.current = newWidth;
            if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.first()) === resizeCol) {
              for (const c_1 of selectedColumns) {
                var _col_5$growOffset;
                if (c_1 === resizeCol) {
                  continue;
                }
                const col_5 = columns[c_1];
                const s_0 = offsetColumnSize(col_5, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
                onColumnResize === null || onColumnResize === void 0 || onColumnResize(col_5, s_0, c_1, s_0 + ((_col_5$growOffset = col_5.growOffset) !== null && _col_5$growOffset !== void 0 ? _col_5$growOffset : 0));
              }
            }
          }
        }
      }
    };
    $[47] = canvasRef;
    $[48] = columns;
    $[49] = dragCol;
    $[50] = dragRow;
    $[51] = dragStartX;
    $[52] = dragStartY;
    $[53] = maxColumnWidth;
    $[54] = minColumnWidth;
    $[55] = onColumnResize;
    $[56] = resizeCol;
    $[57] = resizeColStartX;
    $[58] = selectedColumns;
    $[59] = t7;
  } else {
    t7 = $[59];
  }
  const onMouseMove = t7;
  let t8;
  if ($[60] !== dragRow || $[61] !== dropRow || $[62] !== getCellContent) {
    t8 = (cell, forceStrict) => {
      if (dragRow === void 0 || dropRow === void 0) {
        return getCellContent(cell, forceStrict);
      }
      let [col_6, row_1] = cell;
      if (row_1 === dropRow) {
        row_1 = dragRow;
      } else {
        if (row_1 > dropRow) {
          row_1 = row_1 - 1;
        }
        if (row_1 >= dragRow) {
          row_1 = row_1 + 1;
        }
      }
      return getCellContent([col_6, row_1], forceStrict);
    };
    $[60] = dragRow;
    $[61] = dropRow;
    $[62] = getCellContent;
    $[63] = t8;
  } else {
    t8 = $[63];
  }
  const getMangledCellContent = t8;
  let t9;
  if ($[64] !== onDragStart) {
    t9 = (args_2) => {
      onDragStart === null || onDragStart === void 0 || onDragStart(args_2);
      if (!args_2.defaultPrevented()) {
        clearAll();
      }
    };
    $[64] = onDragStart;
    $[65] = t9;
  } else {
    t9 = $[65];
  }
  const onDragStartImpl = t9;
  const t10 = resizeCol !== void 0;
  let t11;
  if ($[66] !== canResize || $[67] !== dragColActive || $[68] !== dragOffset || $[69] !== getMangledCellContent || $[70] !== gridRef || $[71] !== onDragStartImpl || $[72] !== onHeaderIndicatorClickMangled || $[73] !== onHeaderMenuClickMangled || $[74] !== onItemHoveredImpl || $[75] !== onMouseDownImpl || $[76] !== onMouseMove || $[77] !== onMouseUpImpl || $[78] !== p2.accessibilityHeight || $[79] !== p2.canvasRef || $[80] !== p2.cellXOffset || $[81] !== p2.cellYOffset || $[82] !== p2.columns || $[83] !== p2.disabledRows || $[84] !== p2.drawCell || $[85] !== p2.drawFocusRing || $[86] !== p2.drawHeader || $[87] !== p2.enableGroups || $[88] !== p2.eventTargetRef || $[89] !== p2.experimental || $[90] !== p2.fillHandle || $[91] !== p2.firstColAccessible || $[92] !== p2.fixedShadowX || $[93] !== p2.fixedShadowY || $[94] !== p2.freezeColumns || $[95] !== p2.freezeTrailingRows || $[96] !== p2.getCellRenderer || $[97] !== p2.getGroupDetails || $[98] !== p2.getRowThemeOverride || $[99] !== p2.groupHeaderHeight || $[100] !== p2.groupHeaderHeights || $[101] !== p2.groupLevels || $[102] !== p2.hasAppendRow || $[103] !== p2.headerHeight || $[104] !== p2.headerIcons || $[105] !== p2.height || $[106] !== p2.highlightRegions || $[107] !== p2.imageWindowLoader || $[108] !== p2.isDraggable || $[109] !== p2.isFilling || $[110] !== p2.isFocused || $[111] !== p2.onCanvasBlur || $[112] !== p2.onCanvasFocused || $[113] !== p2.onCellFocused || $[114] !== p2.onContextMenu || $[115] !== p2.onDragEnd || $[116] !== p2.onDragLeave || $[117] !== p2.onDragOverCell || $[118] !== p2.onDrop || $[119] !== p2.onKeyDown || $[120] !== p2.onKeyUp || $[121] !== p2.onMouseMove || $[122] !== p2.prelightCells || $[123] !== p2.resizeIndicator || $[124] !== p2.rowHeight || $[125] !== p2.rows || $[126] !== p2.selection || $[127] !== p2.smoothScrollX || $[128] !== p2.smoothScrollY || $[129] !== p2.theme || $[130] !== p2.translateX || $[131] !== p2.translateY || $[132] !== p2.verticalBorder || $[133] !== p2.width || $[134] !== resizeCol || $[135] !== t10) {
    t11 = /* @__PURE__ */ jsx(DataGrid$1, { accessibilityHeight: p2.accessibilityHeight, canvasRef: p2.canvasRef, cellXOffset: p2.cellXOffset, cellYOffset: p2.cellYOffset, columns: p2.columns, disabledRows: p2.disabledRows, drawFocusRing: p2.drawFocusRing, drawHeader: p2.drawHeader, drawCell: p2.drawCell, enableGroups: p2.enableGroups, groupLevels: p2.groupLevels, groupHeaderHeights: p2.groupHeaderHeights, eventTargetRef: p2.eventTargetRef, experimental: p2.experimental, fillHandle: p2.fillHandle, firstColAccessible: p2.firstColAccessible, fixedShadowX: p2.fixedShadowX, fixedShadowY: p2.fixedShadowY, freezeColumns: p2.freezeColumns, getCellRenderer: p2.getCellRenderer, getGroupDetails: p2.getGroupDetails, getRowThemeOverride: p2.getRowThemeOverride, groupHeaderHeight: p2.groupHeaderHeight, headerHeight: p2.headerHeight, headerIcons: p2.headerIcons, height: p2.height, highlightRegions: p2.highlightRegions, imageWindowLoader: p2.imageWindowLoader, resizeColumn: resizeCol, isDraggable: p2.isDraggable, isFilling: p2.isFilling, isFocused: p2.isFocused, onCanvasBlur: p2.onCanvasBlur, onCanvasFocused: p2.onCanvasFocused, onCellFocused: p2.onCellFocused, onContextMenu: p2.onContextMenu, onDragEnd: p2.onDragEnd, onDragLeave: p2.onDragLeave, onDragOverCell: p2.onDragOverCell, onDrop: p2.onDrop, onKeyDown: p2.onKeyDown, onKeyUp: p2.onKeyUp, onMouseMove: p2.onMouseMove, prelightCells: p2.prelightCells, rowHeight: p2.rowHeight, rows: p2.rows, selection: p2.selection, smoothScrollX: p2.smoothScrollX, smoothScrollY: p2.smoothScrollY, theme: p2.theme, freezeTrailingRows: p2.freezeTrailingRows, hasAppendRow: p2.hasAppendRow, translateX: p2.translateX, translateY: p2.translateY, resizeIndicator: p2.resizeIndicator, verticalBorder: p2.verticalBorder, width: p2.width, getCellContent: getMangledCellContent, isResizing: t10, onHeaderMenuClick: onHeaderMenuClickMangled, onHeaderIndicatorClick: onHeaderIndicatorClickMangled, isDragging: dragColActive, onItemHovered: onItemHoveredImpl, onDragStart: onDragStartImpl, onMouseDown: onMouseDownImpl, allowResize: canResize, onMouseUp: onMouseUpImpl, dragAndDropState: dragOffset, onMouseMoveRaw: onMouseMove, ref: gridRef });
    $[66] = canResize;
    $[67] = dragColActive;
    $[68] = dragOffset;
    $[69] = getMangledCellContent;
    $[70] = gridRef;
    $[71] = onDragStartImpl;
    $[72] = onHeaderIndicatorClickMangled;
    $[73] = onHeaderMenuClickMangled;
    $[74] = onItemHoveredImpl;
    $[75] = onMouseDownImpl;
    $[76] = onMouseMove;
    $[77] = onMouseUpImpl;
    $[78] = p2.accessibilityHeight;
    $[79] = p2.canvasRef;
    $[80] = p2.cellXOffset;
    $[81] = p2.cellYOffset;
    $[82] = p2.columns;
    $[83] = p2.disabledRows;
    $[84] = p2.drawCell;
    $[85] = p2.drawFocusRing;
    $[86] = p2.drawHeader;
    $[87] = p2.enableGroups;
    $[88] = p2.eventTargetRef;
    $[89] = p2.experimental;
    $[90] = p2.fillHandle;
    $[91] = p2.firstColAccessible;
    $[92] = p2.fixedShadowX;
    $[93] = p2.fixedShadowY;
    $[94] = p2.freezeColumns;
    $[95] = p2.freezeTrailingRows;
    $[96] = p2.getCellRenderer;
    $[97] = p2.getGroupDetails;
    $[98] = p2.getRowThemeOverride;
    $[99] = p2.groupHeaderHeight;
    $[100] = p2.groupHeaderHeights;
    $[101] = p2.groupLevels;
    $[102] = p2.hasAppendRow;
    $[103] = p2.headerHeight;
    $[104] = p2.headerIcons;
    $[105] = p2.height;
    $[106] = p2.highlightRegions;
    $[107] = p2.imageWindowLoader;
    $[108] = p2.isDraggable;
    $[109] = p2.isFilling;
    $[110] = p2.isFocused;
    $[111] = p2.onCanvasBlur;
    $[112] = p2.onCanvasFocused;
    $[113] = p2.onCellFocused;
    $[114] = p2.onContextMenu;
    $[115] = p2.onDragEnd;
    $[116] = p2.onDragLeave;
    $[117] = p2.onDragOverCell;
    $[118] = p2.onDrop;
    $[119] = p2.onKeyDown;
    $[120] = p2.onKeyUp;
    $[121] = p2.onMouseMove;
    $[122] = p2.prelightCells;
    $[123] = p2.resizeIndicator;
    $[124] = p2.rowHeight;
    $[125] = p2.rows;
    $[126] = p2.selection;
    $[127] = p2.smoothScrollX;
    $[128] = p2.smoothScrollY;
    $[129] = p2.theme;
    $[130] = p2.translateX;
    $[131] = p2.translateY;
    $[132] = p2.verticalBorder;
    $[133] = p2.width;
    $[134] = resizeCol;
    $[135] = t10;
    $[136] = t11;
  } else {
    t11 = $[136];
  }
  return t11;
};
function useResizeDetector(initialSize) {
  const ref = useRef(null);
  const [size, setSize] = useState({
    width: initialSize === null || initialSize === void 0 ? void 0 : initialSize[0],
    height: initialSize === null || initialSize === void 0 ? void 0 : initialSize[1]
  });
  useLayoutEffect(() => {
    const resizeCallback = (entries) => {
      for (const entry of entries) {
        const {
          width,
          height
        } = entry && entry.contentRect || {};
        setSize((cv) => cv.width === width && cv.height === height ? cv : {
          width,
          height
        });
      }
    };
    const resizeObserver = new window.ResizeObserver(resizeCallback);
    if (ref.current) {
      resizeObserver.observe(ref.current, void 0);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);
  return {
    ref,
    ...size
  };
}
const useKineticScroll = (isEnabled, callback, targetScroller) => {
  const rafId = useRef(null);
  const isTouching = useRef(null);
  const lastScrollPosition = useRef(null);
  const sameCount = useRef(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const scrollEl = targetScroller.current;
  useEffect(() => {
    const handleScroll = () => {
      if (isTouching.current === false && scrollEl !== null) {
        var _lastScrollPosition$c, _lastScrollPosition$c2;
        const currentScrollPosition = [scrollEl.scrollLeft, scrollEl.scrollTop];
        if (((_lastScrollPosition$c = lastScrollPosition.current) === null || _lastScrollPosition$c === void 0 ? void 0 : _lastScrollPosition$c[0]) === currentScrollPosition[0] && ((_lastScrollPosition$c2 = lastScrollPosition.current) === null || _lastScrollPosition$c2 === void 0 ? void 0 : _lastScrollPosition$c2[1]) === currentScrollPosition[1]) {
          if (sameCount.current > 10) {
            lastScrollPosition.current = null;
            isTouching.current = null;
            return;
          } else {
            sameCount.current++;
          }
        } else {
          sameCount.current = 0;
          callbackRef.current(currentScrollPosition[0], currentScrollPosition[1]);
          lastScrollPosition.current = currentScrollPosition;
        }
        rafId.current = window.setTimeout(handleScroll, 1e3 / 120);
      }
    };
    const startTouch = () => {
      isTouching.current = true;
      lastScrollPosition.current = null;
      if (rafId.current !== null) {
        window.clearTimeout(rafId.current);
        rafId.current = null;
      }
    };
    const endTouch = (event) => {
      if (event.touches.length === 0) {
        isTouching.current = false;
        sameCount.current = 0;
        rafId.current = window.setTimeout(handleScroll, 1e3 / 120);
      }
    };
    if (isEnabled && scrollEl !== null) {
      const element = scrollEl;
      element.addEventListener("touchstart", startTouch);
      element.addEventListener("touchend", endTouch);
      return () => {
        element.removeEventListener("touchstart", startTouch);
        element.removeEventListener("touchend", endTouch);
        if (rafId.current !== null) {
          window.clearTimeout(rafId.current);
        }
      };
    }
  }, [isEnabled, scrollEl]);
};
const _exp$3 = () => (p2) => p2.isSafari ? "scroll" : "auto";
const ScrollRegionStyle = /* @__PURE__ */ styled_default("div")({
  name: "ScrollRegionStyle",
  class: "gdg-skhsru1",
  propsAsIs: false,
  vars: {
    "skhsru1-0": [_exp$3()]
  }
});
const BROWSER_MAX_DIV_HEIGHT = 33554400;
const MAX_PADDER_SEGMENT_HEIGHT = 5e6;
function useTouchUpDelayed(delay) {
  const $ = compilerRuntimeExports.c(3);
  const [hasTouches, setHasTouches] = React.useState(false);
  const safeWindow = typeof window === "undefined" ? null : window;
  const cbTimer = React.useRef(0);
  let t0;
  if ($[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      window.clearTimeout(cbTimer.current);
      setHasTouches(true);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  useEventListener("touchstart", t0, safeWindow, true, false);
  let t1;
  if ($[1] !== delay) {
    t1 = (e) => {
      if (e.touches.length === 0) {
        cbTimer.current = window.setTimeout(() => setHasTouches(false), delay);
      }
    };
    $[1] = delay;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  useEventListener("touchend", t1, safeWindow, true, false);
  return hasTouches;
}
const InfiniteScroller = (p2) => {
  var _rightElementProps$st, _rightElementProps$fi, _lastProps$current, _lastProps$current2;
  const {
    children,
    clientHeight,
    scrollHeight,
    scrollWidth,
    update,
    draggable,
    className,
    preventDiagonalScrolling = false,
    paddingBottom = 0,
    paddingRight = 0,
    rightElement,
    rightElementProps,
    kineticScrollPerfHack = false,
    scrollRef,
    initialSize
  } = p2;
  const padders = [];
  const rightElementSticky = (_rightElementProps$st = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.sticky) !== null && _rightElementProps$st !== void 0 ? _rightElementProps$st : false;
  const rightElementFill = (_rightElementProps$fi = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.fill) !== null && _rightElementProps$fi !== void 0 ? _rightElementProps$fi : false;
  const virtualScrollY = React.useRef(0);
  const lastScrollY = React.useRef(0);
  const scroller = React.useRef(null);
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  const lastDpr = React.useRef(dpr);
  React.useEffect(() => {
    if (lastDpr.current !== dpr) {
      virtualScrollY.current = 0;
      lastScrollY.current = 0;
      lastDpr.current = dpr;
      const el = scroller.current;
      if (el !== null) {
        onScrollRef.current(el.scrollLeft, el.scrollTop);
      }
    }
  }, [dpr]);
  const lastScrollPosition = React.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: void 0
  });
  const rightWrapRef = React.useRef(null);
  const hasTouches = useTouchUpDelayed(200);
  const [isIdle, setIsIdle] = React.useState(true);
  const idleTimer = React.useRef(0);
  React.useLayoutEffect(() => {
    if (!isIdle || hasTouches || lastScrollPosition.current.lockDirection === void 0) return;
    const el_0 = scroller.current;
    if (el_0 === null) return;
    const [lx, ly] = lastScrollPosition.current.lockDirection;
    if (lx !== void 0) {
      el_0.scrollLeft = lx;
    } else if (ly !== void 0) {
      el_0.scrollTop = ly;
    }
    lastScrollPosition.current.lockDirection = void 0;
  }, [hasTouches, isIdle]);
  const onScroll = React.useCallback((scrollLeft, scrollTop) => {
    var _lock$, _lock$2, _rightWrapRef$current, _rightWrapRef$current2;
    const el_1 = scroller.current;
    if (el_1 === null) return;
    scrollTop = scrollTop !== null && scrollTop !== void 0 ? scrollTop : el_1.scrollTop;
    scrollLeft = scrollLeft !== null && scrollLeft !== void 0 ? scrollLeft : el_1.scrollLeft;
    const lastScrollTop = lastScrollPosition.current.scrollTop;
    const lastScrollLeft = lastScrollPosition.current.scrollLeft;
    const dx = scrollLeft - lastScrollLeft;
    const dy = scrollTop - lastScrollTop;
    if (hasTouches && dx !== 0 && dy !== 0 && (Math.abs(dx) > 3 || Math.abs(dy) > 3) && preventDiagonalScrolling && lastScrollPosition.current.lockDirection === void 0) {
      lastScrollPosition.current.lockDirection = Math.abs(dx) < Math.abs(dy) ? [lastScrollLeft, void 0] : [void 0, lastScrollTop];
    }
    const lock = lastScrollPosition.current.lockDirection;
    scrollLeft = (_lock$ = lock === null || lock === void 0 ? void 0 : lock[0]) !== null && _lock$ !== void 0 ? _lock$ : scrollLeft;
    scrollTop = (_lock$2 = lock === null || lock === void 0 ? void 0 : lock[1]) !== null && _lock$2 !== void 0 ? _lock$2 : scrollTop;
    lastScrollPosition.current.scrollLeft = scrollLeft;
    lastScrollPosition.current.scrollTop = scrollTop;
    const cWidth = el_1.clientWidth;
    const cHeight = el_1.clientHeight;
    const newY = scrollTop;
    const delta = lastScrollY.current - newY;
    const scrollableHeight = el_1.scrollHeight - cHeight;
    lastScrollY.current = newY;
    let virtualY;
    if (scrollableHeight > 0 && scrollHeight > el_1.scrollHeight + 5) {
      if (Math.abs(delta) > 2e3 || newY === 0 || newY === scrollableHeight) {
        const scrollProgress = Math.max(0, Math.min(1, newY / scrollableHeight));
        const virtualScrollableHeight = scrollHeight - cHeight;
        virtualY = scrollProgress * virtualScrollableHeight;
        virtualScrollY.current = virtualY;
      } else {
        virtualScrollY.current -= delta;
        virtualY = virtualScrollY.current;
      }
    } else {
      virtualY = newY;
      virtualScrollY.current = virtualY;
    }
    virtualY = Math.max(0, Math.min(virtualY, scrollHeight - cHeight));
    virtualScrollY.current = virtualY;
    if (lock !== void 0) {
      window.clearTimeout(idleTimer.current);
      setIsIdle(false);
      idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);
    }
    update({
      x: scrollLeft,
      y: virtualY,
      width: cWidth - paddingRight,
      height: cHeight - paddingBottom,
      paddingRight: (_rightWrapRef$current = (_rightWrapRef$current2 = rightWrapRef.current) === null || _rightWrapRef$current2 === void 0 ? void 0 : _rightWrapRef$current2.clientWidth) !== null && _rightWrapRef$current !== void 0 ? _rightWrapRef$current : 0
    });
  }, [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]);
  useKineticScroll(kineticScrollPerfHack && browserIsSafari.value, onScroll, scroller);
  const onScrollRef = React.useRef(onScroll);
  onScrollRef.current = onScroll;
  const lastProps = React.useRef();
  const didFirstScroll = React.useRef(false);
  React.useLayoutEffect(() => {
    if (didFirstScroll.current) onScroll();
    else didFirstScroll.current = true;
  }, [onScroll, paddingBottom, paddingRight]);
  const setRefs = React.useCallback((instance) => {
    scroller.current = instance;
    if (scrollRef !== void 0) {
      scrollRef.current = instance;
    }
  }, [scrollRef]);
  let key = 0;
  let h = 0;
  const effectiveScrollHeight = Math.min(scrollHeight, BROWSER_MAX_DIV_HEIGHT);
  padders.push(/* @__PURE__ */ jsx("div", {
    style: {
      width: scrollWidth,
      height: 0
    }
  }, key++));
  while (h < effectiveScrollHeight) {
    const toAdd = Math.min(MAX_PADDER_SEGMENT_HEIGHT, effectiveScrollHeight - h);
    padders.push(/* @__PURE__ */ jsx("div", {
      style: {
        width: 0,
        height: toAdd
      }
    }, key++));
    h += toAdd;
  }
  const {
    ref,
    width,
    height
  } = useResizeDetector(initialSize);
  if (typeof window !== "undefined" && (((_lastProps$current = lastProps.current) === null || _lastProps$current === void 0 ? void 0 : _lastProps$current.height) !== height || ((_lastProps$current2 = lastProps.current) === null || _lastProps$current2 === void 0 ? void 0 : _lastProps$current2.width) !== width)) {
    window.setTimeout(() => onScrollRef.current(), 0);
    lastProps.current = {
      width,
      height
    };
  }
  if ((width !== null && width !== void 0 ? width : 0) === 0 || (height !== null && height !== void 0 ? height : 0) === 0) return /* @__PURE__ */ jsx("div", {
    ref
  });
  return /* @__PURE__ */ jsx("div", {
    ref,
    children: /* @__PURE__ */ jsxs(ScrollRegionStyle, {
      isSafari: browserIsSafari.value,
      children: [/* @__PURE__ */ jsx("div", {
        className: "dvn-underlay",
        children
      }), /* @__PURE__ */ jsx("div", {
        ref: setRefs,
        style: lastProps.current,
        draggable,
        onDragStart: (e) => {
          if (!draggable) {
            e.stopPropagation();
            e.preventDefault();
          }
        },
        className: "dvn-scroller " + (className !== null && className !== void 0 ? className : ""),
        onScroll: () => onScroll(),
        children: /* @__PURE__ */ jsxs("div", {
          className: "dvn-scroll-inner" + (rightElement === void 0 ? " dvn-hidden" : ""),
          children: [/* @__PURE__ */ jsx("div", {
            className: "dvn-stack",
            children: padders
          }), rightElement !== void 0 && /* @__PURE__ */ jsxs(Fragment, {
            children: [!rightElementFill && /* @__PURE__ */ jsx("div", {
              className: "dvn-spacer"
            }), /* @__PURE__ */ jsx("div", {
              ref: rightWrapRef,
              style: {
                height,
                maxHeight: clientHeight - Math.ceil(dpr % 1),
                position: "sticky",
                top: 0,
                paddingLeft: 1,
                marginBottom: -40,
                marginRight: paddingRight,
                flexGrow: rightElementFill ? 1 : void 0,
                right: rightElementSticky ? paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0 : void 0,
                pointerEvents: "auto"
              },
              children: rightElement
            })]
          })]
        })
      })]
    })
  });
};
const GridScroller = (p2) => {
  const $ = compilerRuntimeExports.c(105);
  const {
    columns,
    rows,
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    enableGroups,
    freezeColumns,
    experimental,
    nonGrowWidth,
    clientSize,
    className,
    onVisibleRegionChanged,
    scrollRef,
    preventDiagonalScrolling,
    rightElement,
    rightElementProps,
    overscrollX,
    overscrollY,
    initialSize,
    smoothScrollX: t0,
    smoothScrollY: t1,
    isDraggable
  } = p2;
  const smoothScrollX = t0 === void 0 ? false : t0;
  const smoothScrollY = t1 === void 0 ? false : t1;
  let t2;
  if ($[0] !== experimental) {
    t2 = experimental !== null && experimental !== void 0 ? experimental : {};
    $[0] = experimental;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const {
    paddingRight,
    paddingBottom
  } = t2;
  const [clientWidth, clientHeight] = clientSize;
  const last = React.useRef();
  const lastX = React.useRef();
  const lastY = React.useRef();
  const lastSize = React.useRef();
  const width = nonGrowWidth + Math.max(0, overscrollX !== null && overscrollX !== void 0 ? overscrollX : 0);
  let height = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
  if (typeof rowHeight === "number") {
    height = height + rows * rowHeight;
  } else {
    for (let r = 0; r < rows; r++) {
      height = height + rowHeight(r);
    }
  }
  if (overscrollY !== void 0) {
    height = height + overscrollY;
  }
  const lastArgs = React.useRef();
  let t3;
  if ($[2] !== columns || $[3] !== freezeColumns || $[4] !== onVisibleRegionChanged || $[5] !== rowHeight || $[6] !== rows || $[7] !== smoothScrollX || $[8] !== smoothScrollY) {
    t3 = () => {
      var _lastSize$current, _lastSize$current2;
      if (lastArgs.current === void 0) {
        return;
      }
      const args = {
        ...lastArgs.current
      };
      let x = 0;
      let tx = args.x < 0 ? -args.x : 0;
      let cellRight = 0;
      let cellX = 0;
      args.x = args.x < 0 ? 0 : args.x;
      let stickyColWidth = 0;
      for (let i = 0; i < freezeColumns; i++) {
        stickyColWidth = stickyColWidth + columns[i].width;
      }
      for (const c of columns) {
        const cx3 = x - stickyColWidth;
        if (args.x >= cx3 + c.width) {
          x = x + c.width;
          cellX++;
          cellRight++;
        } else {
          if (args.x > cx3) {
            x = x + c.width;
            if (smoothScrollX) {
              tx = tx + (cx3 - args.x);
            } else {
              cellX++;
            }
            cellRight++;
          } else {
            if (args.x + args.width > cx3) {
              x = x + c.width;
              cellRight++;
            } else {
              break;
            }
          }
        }
      }
      let ty = 0;
      let cellY = 0;
      let cellBottom = 0;
      if (typeof rowHeight === "number") {
        if (smoothScrollY) {
          cellY = Math.floor(args.y / rowHeight);
          ty = cellY * rowHeight - args.y;
        } else {
          cellY = Math.ceil(args.y / rowHeight);
        }
        cellBottom = Math.ceil(args.height / rowHeight) + cellY;
        if (ty < 0) {
          cellBottom++;
        }
      } else {
        let y = 0;
        for (let row = 0; row < rows; row++) {
          const rh = rowHeight(row);
          const cy = y + (smoothScrollY ? 0 : rh / 2);
          if (args.y >= y + rh) {
            y = y + rh;
            cellY++;
            cellBottom++;
          } else {
            if (args.y > cy) {
              y = y + rh;
              if (smoothScrollY) {
                ty = ty + (cy - args.y);
              } else {
                cellY++;
              }
              cellBottom++;
            } else {
              if (args.y + args.height > rh / 2 + y) {
                y = y + rh;
                cellBottom++;
              } else {
                break;
              }
            }
          }
        }
      }
      cellY = Math.max(0, Math.min(cellY, rows - 1));
      cellBottom = Math.max(cellY, Math.min(cellBottom, rows));
      const rect = {
        x: cellX,
        y: cellY,
        width: cellRight - cellX,
        height: cellBottom - cellY
      };
      const oldRect = last.current;
      if (oldRect === void 0 || oldRect.y !== rect.y || oldRect.x !== rect.x || oldRect.height !== rect.height || oldRect.width !== rect.width || lastX.current !== tx || lastY.current !== ty || args.width !== ((_lastSize$current = lastSize.current) === null || _lastSize$current === void 0 ? void 0 : _lastSize$current[0]) || args.height !== ((_lastSize$current2 = lastSize.current) === null || _lastSize$current2 === void 0 ? void 0 : _lastSize$current2[1])) {
        var _args$paddingRight;
        onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 || onVisibleRegionChanged({
          x: cellX,
          y: cellY,
          width: cellRight - cellX,
          height: cellBottom - cellY
        }, args.width, args.height, (_args$paddingRight = args.paddingRight) !== null && _args$paddingRight !== void 0 ? _args$paddingRight : 0, tx, ty);
        last.current = rect;
        lastX.current = tx;
        lastY.current = ty;
        lastSize.current = [args.width, args.height];
      }
    };
    $[2] = columns;
    $[3] = freezeColumns;
    $[4] = onVisibleRegionChanged;
    $[5] = rowHeight;
    $[6] = rows;
    $[7] = smoothScrollX;
    $[8] = smoothScrollY;
    $[9] = t3;
  } else {
    t3 = $[9];
  }
  const processArgs = t3;
  let t4;
  if ($[10] !== processArgs) {
    t4 = (args_0) => {
      lastArgs.current = args_0;
      processArgs();
    };
    $[10] = processArgs;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  const onScrollUpdate = t4;
  let t5;
  let t6;
  if ($[12] !== processArgs) {
    t5 = () => {
      processArgs();
    };
    t6 = [processArgs];
    $[12] = processArgs;
    $[13] = t5;
    $[14] = t6;
  } else {
    t5 = $[13];
    t6 = $[14];
  }
  React.useEffect(t5, t6);
  const t7 = experimental === null || experimental === void 0 ? void 0 : experimental.kineticScrollPerfHack;
  const t8 = isDraggable === true || typeof isDraggable === "string";
  const t9 = width + (paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0);
  const t10 = height + (paddingBottom !== null && paddingBottom !== void 0 ? paddingBottom : 0);
  let t11;
  if ($[15] !== clientHeight || $[16] !== clientWidth || $[17] !== p2.accessibilityHeight || $[18] !== p2.canvasRef || $[19] !== p2.cellXOffset || $[20] !== p2.cellYOffset || $[21] !== p2.columns || $[22] !== p2.disabledRows || $[23] !== p2.drawCell || $[24] !== p2.drawFocusRing || $[25] !== p2.drawHeader || $[26] !== p2.enableGroups || $[27] !== p2.experimental || $[28] !== p2.fillHandle || $[29] !== p2.firstColAccessible || $[30] !== p2.fixedShadowX || $[31] !== p2.fixedShadowY || $[32] !== p2.freezeColumns || $[33] !== p2.freezeTrailingRows || $[34] !== p2.getCellContent || $[35] !== p2.getCellRenderer || $[36] !== p2.getGroupDetails || $[37] !== p2.getRowThemeOverride || $[38] !== p2.gridRef || $[39] !== p2.groupHeaderHeight || $[40] !== p2.groupHeaderHeights || $[41] !== p2.groupLevels || $[42] !== p2.hasAppendRow || $[43] !== p2.headerHeight || $[44] !== p2.headerIcons || $[45] !== p2.highlightRegions || $[46] !== p2.imageWindowLoader || $[47] !== p2.isDraggable || $[48] !== p2.isFilling || $[49] !== p2.isFocused || $[50] !== p2.lockColumns || $[51] !== p2.maxColumnWidth || $[52] !== p2.minColumnWidth || $[53] !== p2.onCanvasBlur || $[54] !== p2.onCanvasFocused || $[55] !== p2.onCellFocused || $[56] !== p2.onColumnMoved || $[57] !== p2.onColumnProposeMove || $[58] !== p2.onColumnResize || $[59] !== p2.onColumnResizeEnd || $[60] !== p2.onColumnResizeStart || $[61] !== p2.onContextMenu || $[62] !== p2.onDragEnd || $[63] !== p2.onDragLeave || $[64] !== p2.onDragOverCell || $[65] !== p2.onDragStart || $[66] !== p2.onDrop || $[67] !== p2.onHeaderIndicatorClick || $[68] !== p2.onHeaderMenuClick || $[69] !== p2.onItemHovered || $[70] !== p2.onKeyDown || $[71] !== p2.onKeyUp || $[72] !== p2.onMouseDown || $[73] !== p2.onMouseMove || $[74] !== p2.onMouseUp || $[75] !== p2.onRowMoved || $[76] !== p2.prelightCells || $[77] !== p2.resizeIndicator || $[78] !== p2.rowHeight || $[79] !== p2.rows || $[80] !== p2.selection || $[81] !== p2.smoothScrollX || $[82] !== p2.smoothScrollY || $[83] !== p2.theme || $[84] !== p2.translateX || $[85] !== p2.translateY || $[86] !== p2.verticalBorder || $[87] !== scrollRef) {
    t11 = /* @__PURE__ */ jsx(DataGridDnd, { eventTargetRef: scrollRef, width: clientWidth, height: clientHeight, accessibilityHeight: p2.accessibilityHeight, canvasRef: p2.canvasRef, cellXOffset: p2.cellXOffset, cellYOffset: p2.cellYOffset, columns: p2.columns, disabledRows: p2.disabledRows, enableGroups: p2.enableGroups, groupLevels: p2.groupLevels, groupHeaderHeights: p2.groupHeaderHeights, fillHandle: p2.fillHandle, firstColAccessible: p2.firstColAccessible, fixedShadowX: p2.fixedShadowX, fixedShadowY: p2.fixedShadowY, freezeColumns: p2.freezeColumns, getCellContent: p2.getCellContent, getCellRenderer: p2.getCellRenderer, getGroupDetails: p2.getGroupDetails, getRowThemeOverride: p2.getRowThemeOverride, groupHeaderHeight: p2.groupHeaderHeight, headerHeight: p2.headerHeight, highlightRegions: p2.highlightRegions, imageWindowLoader: p2.imageWindowLoader, isFilling: p2.isFilling, isFocused: p2.isFocused, lockColumns: p2.lockColumns, maxColumnWidth: p2.maxColumnWidth, minColumnWidth: p2.minColumnWidth, onHeaderMenuClick: p2.onHeaderMenuClick, onHeaderIndicatorClick: p2.onHeaderIndicatorClick, onMouseMove: p2.onMouseMove, prelightCells: p2.prelightCells, rowHeight: p2.rowHeight, rows: p2.rows, selection: p2.selection, theme: p2.theme, freezeTrailingRows: p2.freezeTrailingRows, hasAppendRow: p2.hasAppendRow, translateX: p2.translateX, translateY: p2.translateY, onColumnProposeMove: p2.onColumnProposeMove, verticalBorder: p2.verticalBorder, drawFocusRing: p2.drawFocusRing, drawHeader: p2.drawHeader, drawCell: p2.drawCell, experimental: p2.experimental, gridRef: p2.gridRef, headerIcons: p2.headerIcons, isDraggable: p2.isDraggable, onCanvasBlur: p2.onCanvasBlur, onCanvasFocused: p2.onCanvasFocused, onCellFocused: p2.onCellFocused, onColumnMoved: p2.onColumnMoved, onColumnResize: p2.onColumnResize, onColumnResizeEnd: p2.onColumnResizeEnd, onColumnResizeStart: p2.onColumnResizeStart, onContextMenu: p2.onContextMenu, onDragEnd: p2.onDragEnd, onDragLeave: p2.onDragLeave, onDragOverCell: p2.onDragOverCell, onDragStart: p2.onDragStart, onDrop: p2.onDrop, onItemHovered: p2.onItemHovered, onKeyDown: p2.onKeyDown, onKeyUp: p2.onKeyUp, onMouseDown: p2.onMouseDown, onMouseUp: p2.onMouseUp, onRowMoved: p2.onRowMoved, smoothScrollX: p2.smoothScrollX, smoothScrollY: p2.smoothScrollY, resizeIndicator: p2.resizeIndicator });
    $[15] = clientHeight;
    $[16] = clientWidth;
    $[17] = p2.accessibilityHeight;
    $[18] = p2.canvasRef;
    $[19] = p2.cellXOffset;
    $[20] = p2.cellYOffset;
    $[21] = p2.columns;
    $[22] = p2.disabledRows;
    $[23] = p2.drawCell;
    $[24] = p2.drawFocusRing;
    $[25] = p2.drawHeader;
    $[26] = p2.enableGroups;
    $[27] = p2.experimental;
    $[28] = p2.fillHandle;
    $[29] = p2.firstColAccessible;
    $[30] = p2.fixedShadowX;
    $[31] = p2.fixedShadowY;
    $[32] = p2.freezeColumns;
    $[33] = p2.freezeTrailingRows;
    $[34] = p2.getCellContent;
    $[35] = p2.getCellRenderer;
    $[36] = p2.getGroupDetails;
    $[37] = p2.getRowThemeOverride;
    $[38] = p2.gridRef;
    $[39] = p2.groupHeaderHeight;
    $[40] = p2.groupHeaderHeights;
    $[41] = p2.groupLevels;
    $[42] = p2.hasAppendRow;
    $[43] = p2.headerHeight;
    $[44] = p2.headerIcons;
    $[45] = p2.highlightRegions;
    $[46] = p2.imageWindowLoader;
    $[47] = p2.isDraggable;
    $[48] = p2.isFilling;
    $[49] = p2.isFocused;
    $[50] = p2.lockColumns;
    $[51] = p2.maxColumnWidth;
    $[52] = p2.minColumnWidth;
    $[53] = p2.onCanvasBlur;
    $[54] = p2.onCanvasFocused;
    $[55] = p2.onCellFocused;
    $[56] = p2.onColumnMoved;
    $[57] = p2.onColumnProposeMove;
    $[58] = p2.onColumnResize;
    $[59] = p2.onColumnResizeEnd;
    $[60] = p2.onColumnResizeStart;
    $[61] = p2.onContextMenu;
    $[62] = p2.onDragEnd;
    $[63] = p2.onDragLeave;
    $[64] = p2.onDragOverCell;
    $[65] = p2.onDragStart;
    $[66] = p2.onDrop;
    $[67] = p2.onHeaderIndicatorClick;
    $[68] = p2.onHeaderMenuClick;
    $[69] = p2.onItemHovered;
    $[70] = p2.onKeyDown;
    $[71] = p2.onKeyUp;
    $[72] = p2.onMouseDown;
    $[73] = p2.onMouseMove;
    $[74] = p2.onMouseUp;
    $[75] = p2.onRowMoved;
    $[76] = p2.prelightCells;
    $[77] = p2.resizeIndicator;
    $[78] = p2.rowHeight;
    $[79] = p2.rows;
    $[80] = p2.selection;
    $[81] = p2.smoothScrollX;
    $[82] = p2.smoothScrollY;
    $[83] = p2.theme;
    $[84] = p2.translateX;
    $[85] = p2.translateY;
    $[86] = p2.verticalBorder;
    $[87] = scrollRef;
    $[88] = t11;
  } else {
    t11 = $[88];
  }
  let t12;
  if ($[89] !== className || $[90] !== clientHeight || $[91] !== initialSize || $[92] !== onScrollUpdate || $[93] !== paddingBottom || $[94] !== paddingRight || $[95] !== preventDiagonalScrolling || $[96] !== rightElement || $[97] !== rightElementProps || $[98] !== scrollRef || $[99] !== t10 || $[100] !== t11 || $[101] !== t7 || $[102] !== t8 || $[103] !== t9) {
    t12 = /* @__PURE__ */ jsx(InfiniteScroller, { scrollRef, className, kineticScrollPerfHack: t7, preventDiagonalScrolling, draggable: t8, scrollWidth: t9, scrollHeight: t10, clientHeight, rightElement, paddingBottom, paddingRight, rightElementProps, update: onScrollUpdate, initialSize, children: t11 });
    $[89] = className;
    $[90] = clientHeight;
    $[91] = initialSize;
    $[92] = onScrollUpdate;
    $[93] = paddingBottom;
    $[94] = paddingRight;
    $[95] = preventDiagonalScrolling;
    $[96] = rightElement;
    $[97] = rightElementProps;
    $[98] = scrollRef;
    $[99] = t10;
    $[100] = t11;
    $[101] = t7;
    $[102] = t8;
    $[103] = t9;
    $[104] = t12;
  } else {
    t12 = $[104];
  }
  return t12;
};
const SearchWrapper = /* @__PURE__ */ styled_default("div")({
  name: "SearchWrapper",
  class: "gdg-s7kwoj0",
  propsAsIs: false
});
const upArrow = /* @__PURE__ */ jsx("svg", { className: "button-icon", viewBox: "0 0 512 512", children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 244l144-144 144 144M256 120v292" }) });
const downArrow = /* @__PURE__ */ jsx("svg", { className: "button-icon", viewBox: "0 0 512 512", children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: "M112 268l144 144 144-144M256 392V100" }) });
const closeX = /* @__PURE__ */ jsx("svg", { className: "button-icon", viewBox: "0 0 512 512", children: /* @__PURE__ */ jsx("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32", d: "M368 368L144 144M368 144L144 368" }) });
const targetSearchTimeMS = 10;
const DataGridSearch = (p2) => {
  const {
    canvasRef,
    cellYOffset,
    rows,
    columns,
    searchInputRef,
    searchValue,
    searchResults: searchResultsIn,
    onSearchValueChange,
    getCellsForSelection,
    onSearchResultsChanged,
    showSearch = false,
    onSearchClose
  } = p2;
  const [searchID] = React.useState(() => "search-box-" + Math.round(Math.random() * 1e3));
  const [searchStringInner, setSearchStringInner] = React.useState("");
  const searchString = searchValue !== null && searchValue !== void 0 ? searchValue : searchStringInner;
  const setSearchString = React.useCallback((newVal) => {
    setSearchStringInner(newVal);
    onSearchValueChange === null || onSearchValueChange === void 0 || onSearchValueChange(newVal);
  }, [onSearchValueChange]);
  const [searchStatus, setSearchStatus] = React.useState();
  const searchStatusRef = React.useRef(searchStatus);
  searchStatusRef.current = searchStatus;
  React.useEffect(() => {
    if (searchResultsIn === void 0) return;
    if (searchResultsIn.length > 0) {
      setSearchStatus((cv) => {
        var _cv$selectedIndex;
        return {
          rowsSearched: rows,
          results: searchResultsIn.length,
          selectedIndex: (_cv$selectedIndex = cv === null || cv === void 0 ? void 0 : cv.selectedIndex) !== null && _cv$selectedIndex !== void 0 ? _cv$selectedIndex : -1
        };
      });
    } else {
      setSearchStatus(void 0);
    }
  }, [rows, searchResultsIn]);
  const abortControllerRef = React.useRef();
  if (abortControllerRef.current === void 0) abortControllerRef.current = new AbortController();
  const searchHandle = React.useRef();
  const [searchResultsInner, setSearchResultsInner] = React.useState([]);
  const searchResults = searchResultsIn !== null && searchResultsIn !== void 0 ? searchResultsIn : searchResultsInner;
  const cancelSearch = React.useCallback(() => {
    if (searchHandle.current !== void 0) {
      window.cancelAnimationFrame(searchHandle.current);
      searchHandle.current = void 0;
    }
    if (abortControllerRef.current !== void 0) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  }, []);
  const cellYOffsetRef = React.useRef(cellYOffset);
  cellYOffsetRef.current = cellYOffset;
  const beginSearch = React.useCallback((str) => {
    const regex = new RegExp(str.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let startY = cellYOffsetRef.current;
    let searchStride = Math.min(10, rows);
    let rowsSearched = 0;
    setSearchStatus(void 0);
    setSearchResultsInner([]);
    const runningResult = [];
    const tick = async () => {
      var _searchStatusRef$curr, _searchStatusRef$curr2;
      if (getCellsForSelection === void 0) return;
      const tStart = performance.now();
      const rowsLeft = rows - rowsSearched;
      let data = getCellsForSelection({
        x: 0,
        y: startY,
        width: columns.length,
        height: Math.min(searchStride, rowsLeft, rows - startY)
      }, abortControllerRef.current.signal);
      if (typeof data === "function") {
        data = await data();
      }
      let added = false;
      for (const [row, d2] of data.entries()) {
        for (const [col, cell] of d2.entries()) {
          let testString;
          switch (cell.kind) {
            case GridCellKind.Text:
            case GridCellKind.Number:
              testString = cell.displayData;
              break;
            case GridCellKind.Uri:
            case GridCellKind.Markdown:
              testString = cell.data;
              break;
            case GridCellKind.Boolean:
              testString = typeof cell.data === "boolean" ? cell.data.toString() : void 0;
              break;
            case GridCellKind.Image:
            case GridCellKind.Bubble:
              testString = cell.data.join("🐳");
              break;
            case GridCellKind.Custom:
              testString = cell.copyData;
              break;
          }
          if (testString !== void 0 && regex.test(testString)) {
            runningResult.push([col, row + startY]);
            added = true;
          }
        }
      }
      const tEnd = performance.now();
      if (added) {
        setSearchResultsInner([...runningResult]);
      }
      rowsSearched += data.length;
      assert(rowsSearched <= rows);
      const selectedIndex = (_searchStatusRef$curr = (_searchStatusRef$curr2 = searchStatusRef.current) === null || _searchStatusRef$curr2 === void 0 ? void 0 : _searchStatusRef$curr2.selectedIndex) !== null && _searchStatusRef$curr !== void 0 ? _searchStatusRef$curr : -1;
      setSearchStatus({
        results: runningResult.length,
        rowsSearched,
        selectedIndex
      });
      onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(runningResult, selectedIndex);
      if (startY + searchStride >= rows) {
        startY = 0;
      } else {
        startY += searchStride;
      }
      const tElapsed = tEnd - tStart;
      const rounded = Math.max(tElapsed, 1);
      const scalar = targetSearchTimeMS / rounded;
      searchStride = Math.ceil(searchStride * scalar);
      if (rowsSearched < rows && runningResult.length < 1e3) {
        searchHandle.current = window.requestAnimationFrame(tick);
      }
    };
    cancelSearch();
    searchHandle.current = window.requestAnimationFrame(tick);
  }, [cancelSearch, columns.length, getCellsForSelection, onSearchResultsChanged, rows]);
  const onClose = React.useCallback(() => {
    var _canvasRef$current;
    onSearchClose === null || onSearchClose === void 0 || onSearchClose();
    setSearchStatus(void 0);
    setSearchResultsInner([]);
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged([], -1);
    cancelSearch();
    canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus();
  }, [cancelSearch, canvasRef, onSearchClose, onSearchResultsChanged]);
  const onSearchChange = React.useCallback((event) => {
    setSearchString(event.target.value);
    if (searchResultsIn !== void 0) return;
    if (event.target.value === "") {
      setSearchStatus(void 0);
      setSearchResultsInner([]);
      cancelSearch();
    } else {
      beginSearch(event.target.value);
    }
  }, [beginSearch, cancelSearch, setSearchString, searchResultsIn]);
  React.useEffect(() => {
    if (searchInputRef.current === null) return;
    setSearchString("");
    setSearchStatus(void 0);
    if (searchResultsInner.length > 0) {
      setSearchResultsInner([]);
      onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged([], -1);
    }
    if (showSearch) {
      searchInputRef.current.focus({
        preventScroll: true
      });
    } else {
      cancelSearch();
    }
  }, [showSearch, searchInputRef]);
  const onNext = React.useCallback((ev) => {
    var _ev$stopPropagation;
    ev === null || ev === void 0 || (_ev$stopPropagation = ev.stopPropagation) === null || _ev$stopPropagation === void 0 || _ev$stopPropagation.call(ev);
    if (searchStatus === void 0 || searchStatus.results === 0) return;
    const newIndex = (searchStatus.selectedIndex + 1) % searchStatus.results;
    setSearchStatus({
      ...searchStatus,
      selectedIndex: newIndex
    });
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(searchResults, newIndex);
  }, [searchStatus, onSearchResultsChanged, searchResults]);
  const onPrev = React.useCallback((ev) => {
    var _ev$stopPropagation2;
    ev === null || ev === void 0 || (_ev$stopPropagation2 = ev.stopPropagation) === null || _ev$stopPropagation2 === void 0 || _ev$stopPropagation2.call(ev);
    if (searchStatus === void 0 || searchStatus.results === 0) return;
    let newIndex = (searchStatus.selectedIndex - 1) % searchStatus.results;
    if (newIndex < 0) newIndex += searchStatus.results;
    setSearchStatus({
      ...searchStatus,
      selectedIndex: newIndex
    });
    onSearchResultsChanged === null || onSearchResultsChanged === void 0 || onSearchResultsChanged(searchResults, newIndex);
  }, [onSearchResultsChanged, searchResults, searchStatus]);
  const onSearchKeyDown = React.useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && event.nativeEvent.code === "KeyF" || event.key === "Escape") {
      onClose();
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === "Enter") {
      if (event.shiftKey) {
        onPrev();
      } else {
        onNext();
      }
    }
  }, [onClose, onNext, onPrev]);
  React.useEffect(() => {
    return () => {
      cancelSearch();
    };
  }, [cancelSearch]);
  const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);
  React.useEffect(() => {
    if (showSearch) {
      setIsAnimatingOut(true);
    } else {
      const timeoutId = setTimeout(() => setIsAnimatingOut(false), 150);
      return () => clearTimeout(timeoutId);
    }
  }, [showSearch]);
  const searchbox = React.useMemo(() => {
    var _searchStatus$rowsSea, _searchStatus$results, _searchStatus$results2;
    if (!showSearch && !isAnimatingOut) {
      return null;
    }
    let resultString;
    if (searchStatus !== void 0) {
      resultString = searchStatus.results >= 1e3 ? `over 1000` : `${searchStatus.results} result${searchStatus.results !== 1 ? "s" : ""}`;
      if (searchStatus.selectedIndex >= 0) {
        resultString = `${searchStatus.selectedIndex + 1} of ${resultString}`;
      }
    }
    const cancelEvent = (ev) => {
      ev.stopPropagation();
    };
    const rowsSearchedProgress = rows > 0 ? Math.floor(((_searchStatus$rowsSea = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.rowsSearched) !== null && _searchStatus$rowsSea !== void 0 ? _searchStatus$rowsSea : 0) / rows * 100) : 0;
    const progressStyle = {
      width: `${rowsSearchedProgress}%`
    };
    return /* @__PURE__ */ jsxs(SearchWrapper, { className: "gdg-search-bar" + (showSearch ? "" : " out"), onMouseDown: cancelEvent, onMouseMove: cancelEvent, onMouseUp: cancelEvent, onClick: cancelEvent, children: [
      /* @__PURE__ */ jsxs("div", { className: "gdg-search-bar-inner", children: [
        /* @__PURE__ */ jsx("input", { id: searchID, "aria-hidden": !showSearch, "data-testid": "search-input", ref: searchInputRef, onChange: onSearchChange, value: searchString, tabIndex: showSearch ? void 0 : -1, onKeyDownCapture: onSearchKeyDown }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Previous Result", "aria-hidden": !showSearch, tabIndex: showSearch ? void 0 : -1, onClick: onPrev, disabled: ((_searchStatus$results = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results !== void 0 ? _searchStatus$results : 0) === 0, children: upArrow }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Next Result", "aria-hidden": !showSearch, tabIndex: showSearch ? void 0 : -1, onClick: onNext, disabled: ((_searchStatus$results2 = searchStatus === null || searchStatus === void 0 ? void 0 : searchStatus.results) !== null && _searchStatus$results2 !== void 0 ? _searchStatus$results2 : 0) === 0, children: downArrow }),
        onSearchClose !== void 0 && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Close Search", "aria-hidden": !showSearch, "data-testid": "search-close-button", tabIndex: showSearch ? void 0 : -1, onClick: onClose, children: closeX })
      ] }),
      searchStatus !== void 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "gdg-search-status", children: /* @__PURE__ */ jsx("div", { "data-testid": "search-result-area", children: resultString }) }),
        /* @__PURE__ */ jsx("div", { className: "gdg-search-progress", style: progressStyle })
      ] }) : /* @__PURE__ */ jsx("div", { className: "gdg-search-status", children: /* @__PURE__ */ jsx("label", { htmlFor: searchID, children: "Type to search" }) })
    ] });
  }, [showSearch, isAnimatingOut, searchStatus, rows, searchID, searchInputRef, onSearchChange, searchString, onSearchKeyDown, onPrev, onNext, onSearchClose, onClose]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(GridScroller, { prelightCells: searchResults, accessibilityHeight: p2.accessibilityHeight, canvasRef: p2.canvasRef, cellXOffset: p2.cellXOffset, cellYOffset: p2.cellYOffset, className: p2.className, clientSize: p2.clientSize, columns: p2.columns, disabledRows: p2.disabledRows, enableGroups: p2.enableGroups, groupLevels: p2.groupLevels, groupHeaderHeights: p2.groupHeaderHeights, fillHandle: p2.fillHandle, firstColAccessible: p2.firstColAccessible, nonGrowWidth: p2.nonGrowWidth, fixedShadowX: p2.fixedShadowX, fixedShadowY: p2.fixedShadowY, freezeColumns: p2.freezeColumns, getCellContent: p2.getCellContent, getCellRenderer: p2.getCellRenderer, getGroupDetails: p2.getGroupDetails, getRowThemeOverride: p2.getRowThemeOverride, groupHeaderHeight: p2.groupHeaderHeight, headerHeight: p2.headerHeight, highlightRegions: p2.highlightRegions, imageWindowLoader: p2.imageWindowLoader, initialSize: p2.initialSize, isFilling: p2.isFilling, isFocused: p2.isFocused, lockColumns: p2.lockColumns, maxColumnWidth: p2.maxColumnWidth, minColumnWidth: p2.minColumnWidth, onHeaderMenuClick: p2.onHeaderMenuClick, onHeaderIndicatorClick: p2.onHeaderIndicatorClick, onMouseMove: p2.onMouseMove, onVisibleRegionChanged: p2.onVisibleRegionChanged, overscrollX: p2.overscrollX, overscrollY: p2.overscrollY, preventDiagonalScrolling: p2.preventDiagonalScrolling, rightElement: p2.rightElement, rightElementProps: p2.rightElementProps, rowHeight: p2.rowHeight, rows: p2.rows, scrollRef: p2.scrollRef, selection: p2.selection, theme: p2.theme, freezeTrailingRows: p2.freezeTrailingRows, hasAppendRow: p2.hasAppendRow, translateX: p2.translateX, translateY: p2.translateY, verticalBorder: p2.verticalBorder, onColumnProposeMove: p2.onColumnProposeMove, drawFocusRing: p2.drawFocusRing, drawCell: p2.drawCell, drawHeader: p2.drawHeader, experimental: p2.experimental, gridRef: p2.gridRef, headerIcons: p2.headerIcons, isDraggable: p2.isDraggable, onCanvasBlur: p2.onCanvasBlur, onCanvasFocused: p2.onCanvasFocused, onCellFocused: p2.onCellFocused, onColumnMoved: p2.onColumnMoved, onColumnResize: p2.onColumnResize, onColumnResizeEnd: p2.onColumnResizeEnd, onColumnResizeStart: p2.onColumnResizeStart, onContextMenu: p2.onContextMenu, onDragEnd: p2.onDragEnd, onDragLeave: p2.onDragLeave, onDragOverCell: p2.onDragOverCell, onDragStart: p2.onDragStart, onDrop: p2.onDrop, onItemHovered: p2.onItemHovered, onKeyDown: p2.onKeyDown, onKeyUp: p2.onKeyUp, onMouseDown: p2.onMouseDown, onMouseUp: p2.onMouseUp, onRowMoved: p2.onRowMoved, smoothScrollX: p2.smoothScrollX, smoothScrollY: p2.smoothScrollY, resizeIndicator: p2.resizeIndicator }),
    searchbox
  ] });
};
const _exp$2 = () => (p2) => Math.max(16, p2.targetHeight - 10);
const RenameInput = /* @__PURE__ */ styled_default("input")({
  name: "RenameInput",
  class: "gdg-r1kzy40b",
  propsAsIs: false,
  vars: {
    "r1kzy40b-0": [_exp$2(), "px"]
  }
});
const GroupRename = (p2) => {
  const $ = compilerRuntimeExports.c(23);
  const {
    bounds,
    group,
    onClose,
    canvasBounds,
    onFinish
  } = p2;
  const [value, setValue] = React__default.useState(group);
  const t0 = bounds.x - canvasBounds.left + 1;
  const t1 = bounds.y - canvasBounds.top;
  const t2 = bounds.width - 2;
  let t3;
  if ($[0] !== bounds.height || $[1] !== t0 || $[2] !== t1 || $[3] !== t2) {
    t3 = {
      position: "absolute",
      left: t0,
      top: t1,
      width: t2,
      height: bounds.height
    };
    $[0] = bounds.height;
    $[1] = t0;
    $[2] = t1;
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t4 = "gdg-g1sqdbw3";
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] !== value.length) {
    t5 = (e) => e.target.setSelectionRange(0, value.length);
    $[6] = value.length;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  let t6;
  if ($[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t6 = (e_0) => setValue(e_0.target.value);
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  let t7;
  if ($[9] !== onClose || $[10] !== onFinish || $[11] !== value) {
    t7 = (e_1) => {
      if (e_1.key === "Enter") {
        onFinish(value);
      } else {
        if (e_1.key === "Escape") {
          onClose();
        }
      }
    };
    $[9] = onClose;
    $[10] = onFinish;
    $[11] = value;
    $[12] = t7;
  } else {
    t7 = $[12];
  }
  let t8;
  if ($[13] !== bounds.height || $[14] !== onClose || $[15] !== t5 || $[16] !== t7 || $[17] !== value) {
    t8 = /* @__PURE__ */ jsx(RenameInput, {
      targetHeight: bounds.height,
      "data-testid": "group-rename-input",
      value,
      onBlur: onClose,
      onFocus: t5,
      onChange: t6,
      onKeyDown: t7,
      autoFocus: true
    });
    $[13] = bounds.height;
    $[14] = onClose;
    $[15] = t5;
    $[16] = t7;
    $[17] = value;
    $[18] = t8;
  } else {
    t8 = $[18];
  }
  let t9;
  if ($[19] !== onClose || $[20] !== t3 || $[21] !== t8) {
    t9 = /* @__PURE__ */ jsx(ClickOutsideContainer, {
      style: t3,
      className: t4,
      onClickOutside: onClose,
      children: t8
    });
    $[19] = onClose;
    $[20] = t3;
    $[21] = t8;
    $[22] = t9;
  } else {
    t9 = $[22];
  }
  return t9;
};
function checkKey(key, args) {
  if (key === void 0) return false;
  if (key.length > 1 && key.startsWith("_")) {
    const keycode = Number.parseInt(key.slice(1));
    return keycode === args.keyCode;
  }
  if (key.length === 1 && key >= "a" && key <= "z") {
    return key.toUpperCase().codePointAt(0) === args.keyCode;
  }
  return key === args.key;
}
function isHotkey(hotkey, args, details) {
  const result = isHotkeyInner(hotkey, args);
  if (result) details.didMatch = true;
  return result;
}
function isHotkeyInner(hotkey, args) {
  if (hotkey.length === 0) return false;
  if (hotkey.includes("|")) {
    const parts = hotkey.split("|");
    for (const part of parts) {
      if (isHotkeyInner(part, args)) return true;
    }
    return false;
  }
  let wantCtrl = false;
  let wantShift = false;
  let wantAlt = false;
  let wantMeta = false;
  const split = hotkey.split("+");
  const key = split.pop();
  if (!checkKey(key, args)) return false;
  if (split[0] === "any") return true;
  for (const accel of split) {
    switch (accel) {
      case "ctrl":
        wantCtrl = true;
        break;
      case "shift":
        wantShift = true;
        break;
      case "alt":
        wantAlt = true;
        break;
      case "meta":
        wantMeta = true;
        break;
      case "primary":
        if (browserIsOSX.value) {
          wantMeta = true;
        } else {
          wantCtrl = true;
        }
        break;
    }
  }
  return args.altKey === wantAlt && args.ctrlKey === wantCtrl && args.shiftKey === wantShift && args.metaKey === wantMeta;
}
function convertCellToBuffer(cell) {
  var _cell$displayData, _cell$displayData2;
  if (cell.copyData !== void 0) {
    return {
      formatted: cell.copyData,
      rawValue: cell.copyData,
      format: "string",
      doNotEscape: true
    };
  }
  switch (cell.kind) {
    case GridCellKind.Boolean:
      return {
        formatted: cell.data === true ? "TRUE" : cell.data === false ? "FALSE" : cell.data === BooleanIndeterminate ? "INDETERMINATE" : "",
        rawValue: cell.data,
        format: "boolean"
      };
    case GridCellKind.Custom:
      return {
        formatted: cell.copyData,
        rawValue: cell.copyData,
        format: "string"
      };
    case GridCellKind.Image:
    case GridCellKind.Bubble:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string-array"
      };
    case GridCellKind.Drilldown:
      return {
        formatted: cell.data.map((x) => x.text),
        rawValue: cell.data.map((x) => x.text),
        format: "string-array"
      };
    case GridCellKind.Text:
      return {
        formatted: (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case GridCellKind.Uri:
      return {
        formatted: (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data,
        rawValue: cell.data,
        format: "url"
      };
    case GridCellKind.Markdown:
    case GridCellKind.RowID:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case GridCellKind.Number:
      return {
        formatted: cell.displayData,
        rawValue: cell.data,
        format: "number"
      };
    case GridCellKind.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case GridCellKind.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      assertNever();
  }
}
function createBufferFromGridCells(cells, columnIndexes) {
  const copyBuffer = cells.map((row, index) => {
    const mappedIndex = columnIndexes[index];
    return row.map((cell) => {
      if (cell.span !== void 0 && cell.span[0] !== mappedIndex) return {
        formatted: "",
        rawValue: "",
        format: "string"
      };
      return convertCellToBuffer(cell);
    });
  });
  return copyBuffer;
}
function escapeIfNeeded(str, withComma) {
  if ((withComma ? /[\t\n",]/ : /[\t\n"]/).test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function createTextBuffer(copyBuffer) {
  const lines = [];
  for (const row of copyBuffer) {
    const line = [];
    for (const cell of row) {
      if (cell.format === "url") {
        var _cell$rawValue$toStri, _cell$rawValue;
        line.push((_cell$rawValue$toStri = (_cell$rawValue = cell.rawValue) === null || _cell$rawValue === void 0 ? void 0 : _cell$rawValue.toString()) !== null && _cell$rawValue$toStri !== void 0 ? _cell$rawValue$toStri : "");
      } else if (cell.format === "string-array") {
        line.push(cell.formatted.map((x) => escapeIfNeeded(x, true)).join(","));
      } else {
        line.push(cell.doNotEscape === true ? cell.formatted : escapeIfNeeded(cell.formatted, false));
      }
    }
    lines.push(line.join("	"));
  }
  return lines.join("\n");
}
function formatHtmlTextContent(text) {
  return text.replace(/\t/g, "    ").replace(/ {2,}/g, (match) => "<span> </span>".repeat(match.length));
}
function formatHtmlAttributeContent(attrText) {
  return '"' + attrText.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function restoreHtmlEntities(str) {
  return str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function createHtmlBuffer(copyBuffer) {
  const lines = [];
  lines.push(`<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`, "<table><tbody>");
  for (const row of copyBuffer) {
    lines.push("<tr>");
    for (const cell of row) {
      const formatStr = `gdg-format="${cell.format}"`;
      if (cell.format === "url") {
        lines.push(`<td ${formatStr}><a href="${cell.rawValue}">${formatHtmlTextContent(cell.formatted)}</a></td>`);
      } else {
        if (cell.format === "string-array") {
          lines.push(`<td ${formatStr}><ol>${cell.formatted.map((x, ind) => `<li gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue[ind])}>` + formatHtmlTextContent(x) + "</li>").join("")}</ol></td>`);
        } else {
          var _cell$rawValue$toStri2, _cell$rawValue2;
          lines.push(`<td gdg-raw-value=${formatHtmlAttributeContent((_cell$rawValue$toStri2 = (_cell$rawValue2 = cell.rawValue) === null || _cell$rawValue2 === void 0 ? void 0 : _cell$rawValue2.toString()) !== null && _cell$rawValue$toStri2 !== void 0 ? _cell$rawValue$toStri2 : "")} ${formatStr}>${formatHtmlTextContent(cell.formatted)}</td>`);
        }
      }
    }
    lines.push("</tr>");
  }
  lines.push("</tbody></table>");
  return lines.join("");
}
function getCopyBufferContents(cells, columnIndexes) {
  const copyBuffer = createBufferFromGridCells(cells, columnIndexes);
  const textPlain = createTextBuffer(copyBuffer);
  const textHtml = createHtmlBuffer(copyBuffer);
  return {
    textPlain,
    textHtml
  };
}
function decodeHTML(html) {
  const fragment = document.createElement("html");
  fragment.innerHTML = html.replace(/&nbsp;/g, " ");
  const tableEl = fragment.querySelector("table");
  if (tableEl === null) return void 0;
  const walkEl = [tableEl];
  const result = [];
  let current;
  while (walkEl.length > 0) {
    const el = walkEl.pop();
    if (el === void 0) break;
    if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableRowElement) {
      if (current !== void 0) {
        result.push(current);
      }
      current = [];
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableCellElement) {
      var _clone$getAttribute;
      const clone = el.cloneNode(true);
      const firstTagIsPara = clone.children.length === 1 && clone.children[0].nodeName === "P";
      const para = firstTagIsPara ? clone.children[0] : null;
      const isAppleNumbers = (para === null || para === void 0 ? void 0 : para.children.length) === 1 && para.children[0].nodeName === "FONT";
      const brs = clone.querySelectorAll("br");
      for (const br of brs) {
        br.replaceWith("\n");
      }
      const attributeValue = clone.getAttribute("gdg-raw-value");
      const formatValue = (_clone$getAttribute = clone.getAttribute("gdg-format")) !== null && _clone$getAttribute !== void 0 ? _clone$getAttribute : "string";
      if (clone.querySelector("a") !== null) {
        var _current, _clone$querySelector$, _clone$querySelector, _clone$textContent;
        (_current = current) === null || _current === void 0 || _current.push({
          rawValue: (_clone$querySelector$ = (_clone$querySelector = clone.querySelector("a")) === null || _clone$querySelector === void 0 ? void 0 : _clone$querySelector.getAttribute("href")) !== null && _clone$querySelector$ !== void 0 ? _clone$querySelector$ : "",
          formatted: (_clone$textContent = clone.textContent) !== null && _clone$textContent !== void 0 ? _clone$textContent : "",
          format: formatValue
        });
      } else if (clone.querySelector("ol") !== null) {
        var _current2;
        const rawValues = clone.querySelectorAll("li");
        (_current2 = current) === null || _current2 === void 0 || _current2.push({
          rawValue: [...rawValues].map((x) => {
            var _x$getAttribute;
            return (_x$getAttribute = x.getAttribute("gdg-raw-value")) !== null && _x$getAttribute !== void 0 ? _x$getAttribute : "";
          }),
          formatted: [...rawValues].map((x) => {
            var _x$textContent;
            return (_x$textContent = x.textContent) !== null && _x$textContent !== void 0 ? _x$textContent : "";
          }),
          format: "string-array"
        });
      } else if (attributeValue !== null) {
        var _current3, _clone$textContent2;
        (_current3 = current) === null || _current3 === void 0 || _current3.push({
          rawValue: restoreHtmlEntities(attributeValue),
          formatted: (_clone$textContent2 = clone.textContent) !== null && _clone$textContent2 !== void 0 ? _clone$textContent2 : "",
          format: formatValue
        });
      } else {
        var _clone$textContent3, _current4;
        let textContent = (_clone$textContent3 = clone.textContent) !== null && _clone$textContent3 !== void 0 ? _clone$textContent3 : "";
        if (isAppleNumbers) {
          textContent = textContent.replace(/\n(?!\n)/g, "");
        }
        (_current4 = current) === null || _current4 === void 0 || _current4.push({
          rawValue: textContent !== null && textContent !== void 0 ? textContent : "",
          formatted: textContent !== null && textContent !== void 0 ? textContent : "",
          format: formatValue
        });
      }
    }
  }
  if (current !== void 0) {
    result.push(current);
  }
  return result;
}
function expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortController) {
  const origVal = newVal;
  if (spanRangeBehavior === "allowPartial" || newVal.current === void 0 || getCellsForSelection === void 0) return newVal;
  let isFilled = false;
  do {
    var _newVal, _newVal$current;
    if (((_newVal = newVal) === null || _newVal === void 0 ? void 0 : _newVal.current) === void 0) break;
    const r = (_newVal$current = newVal.current) === null || _newVal$current === void 0 ? void 0 : _newVal$current.range;
    const cells = [];
    if (r.width > 2) {
      const leftCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof leftCells === "function") {
        return origVal;
      }
      cells.push(...leftCells);
      const rightCells = getCellsForSelection({
        x: r.x + r.width - 1,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof rightCells === "function") {
        return origVal;
      }
      cells.push(...rightCells);
    } else {
      const rCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height
      }, abortController.signal);
      if (typeof rCells === "function") {
        return origVal;
      }
      cells.push(...rCells);
    }
    let left = r.x - rowMarkerOffset;
    let right = r.x + r.width - 1 - rowMarkerOffset;
    for (const row of cells) {
      for (const cell of row) {
        if (cell.span === void 0) continue;
        left = Math.min(cell.span[0], left);
        right = Math.max(cell.span[1], right);
      }
    }
    if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
      isFilled = true;
    } else {
      var _newVal$current$cell;
      newVal = {
        current: {
          cell: (_newVal$current$cell = newVal.current.cell) !== null && _newVal$current$cell !== void 0 ? _newVal$current$cell : [0, 0],
          range: {
            x: left + rowMarkerOffset,
            y: r.y,
            width: right - left + 1,
            height: r.height
          },
          rangeStack: newVal.current.rangeStack
        },
        columns: newVal.columns,
        rows: newVal.rows
      };
    }
  } while (!isFilled);
  return newVal;
}
function descape(s) {
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1).replace(/""/g, '"');
  }
  return s;
}
function unquote(str) {
  let State;
  ((State2) => {
    State2[State2["None"] = 0] = "None";
    State2[State2["inString"] = 1] = "inString";
    State2[State2["inStringPostQuote"] = 2] = "inStringPostQuote";
  })(State || (State = {}));
  const result = [];
  let current = [];
  let start = 0;
  let state = 0;
  str = str.replace(/\r\n/g, "\n");
  let index = 0;
  for (const char of str) {
    switch (state) {
      case 0:
        if (char === "	" || char === "\n") {
          current.push(str.slice(start, index));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
        } else if (char === `"`) {
          state = 1;
        }
        break;
      case 1:
        if (char === `"`) {
          state = 2;
        }
        break;
      case 2:
        if (char === '"') {
          state = 1;
        } else if (char === "	" || char === "\n") {
          current.push(descape(str.slice(start, index)));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
          state = 0;
        } else {
          state = 0;
        }
        break;
    }
    index++;
  }
  if (start < str.length) {
    current.push(descape(str.slice(start, str.length)));
  }
  result.push(current);
  return result.map((r) => r.map((c) => ({
    rawValue: c,
    formatted: c,
    format: "string"
  })));
}
function copyToClipboard(cells, columnIndexes, e) {
  var _window$navigator$cli3;
  const copyBuffer = getCopyBufferContents(cells, columnIndexes);
  const copyWithWriteText = (s) => {
    var _window$navigator$cli;
    void ((_window$navigator$cli = window.navigator.clipboard) === null || _window$navigator$cli === void 0 ? void 0 : _window$navigator$cli.writeText(s));
  };
  const copyWithWrite = (s, html) => {
    var _window$navigator$cli2;
    if (((_window$navigator$cli2 = window.navigator.clipboard) === null || _window$navigator$cli2 === void 0 ? void 0 : _window$navigator$cli2.write) === void 0) return false;
    void window.navigator.clipboard.write([new ClipboardItem({
      "text/plain": new Blob([s], {
        type: "text/plain"
      }),
      "text/html": new Blob([html], {
        type: "text/html"
      })
    })]);
    return true;
  };
  const copyWithClipboardData = (s, html) => {
    try {
      var _e$clipboardData, _e$clipboardData2;
      if (e === void 0 || e.clipboardData === null) throw new Error("No clipboard data");
      e === null || e === void 0 || (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 || _e$clipboardData.setData("text/plain", s);
      e === null || e === void 0 || (_e$clipboardData2 = e.clipboardData) === null || _e$clipboardData2 === void 0 || _e$clipboardData2.setData("text/html", html);
    } catch {
      if (!copyWithWrite(s, html)) {
        copyWithWriteText(s);
      }
    }
  };
  if (((_window$navigator$cli3 = window.navigator.clipboard) === null || _window$navigator$cli3 === void 0 ? void 0 : _window$navigator$cli3.write) !== void 0 || (e === null || e === void 0 ? void 0 : e.clipboardData) !== void 0) {
    void copyWithClipboardData(copyBuffer.textPlain, copyBuffer.textHtml);
  } else {
    void copyWithWriteText(copyBuffer.textPlain);
  }
  e === null || e === void 0 || e.preventDefault();
}
function toggleBoolean(data) {
  return data !== true;
}
function useKeyboardHandlers(args) {
  const {
    state,
    keybindings,
    overlayOpen,
    columnSelect,
    rowSelect,
    rangeSelect,
    editOnType,
    trapFocus,
    showTrailingBlankRow,
    columnsInLength,
    rowGroupingNavBehavior,
    mapper,
    onKeyDownIn,
    onSelectionCleared,
    onCellActivated,
    onDelete,
    getCellContent,
    setSelectedColumns,
    setSelectedRows,
    setShowSearchInner,
    searchInputRef,
    adjustSelection,
    updateSelectedCell,
    deleteRange,
    fillDown,
    fillRight,
    appendRow,
    getCustomNewRowTargetColumn,
    scrollToRef
  } = args;
  const {
    gridSelection,
    gridRef,
    visibleRegionRef,
    rowMarkerOffset,
    rows,
    setGridSelection,
    getMangledCellContent,
    mangledOnCellsEdited,
    setOverlay,
    reselect,
    focus
  } = state;
  const handleFixedKeybindings = (event) => {
    const cancel = () => {
      event.stopPropagation();
      event.preventDefault();
    };
    const details = {
      didMatch: false
    };
    const {
      bounds
    } = event;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const keys = keybindings;
    if (!overlayOpen && isHotkey(keys.clear, event, details)) {
      var _gridSelection$curren, _gridSelection$curren2;
      const clearedCell = (_gridSelection$curren = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.cell) !== null && _gridSelection$curren !== void 0 ? _gridSelection$curren : [rowMarkerOffset, 0];
      setGridSelection({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
        current: {
          cell: clearedCell,
          range: {
            x: clearedCell[0],
            y: clearedCell[1],
            width: 1,
            height: 1
          },
          rangeStack: []
        }
      }, false);
      onSelectionCleared === null || onSelectionCleared === void 0 || onSelectionCleared();
      focus();
    } else if (!overlayOpen && isHotkey(keys.selectAll, event, details)) {
      var _gridSelection$curren3, _gridSelection$curren4;
      setGridSelection({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
        current: {
          cell: (_gridSelection$curren3 = (_gridSelection$curren4 = gridSelection.current) === null || _gridSelection$curren4 === void 0 ? void 0 : _gridSelection$curren4.cell) !== null && _gridSelection$curren3 !== void 0 ? _gridSelection$curren3 : [rowMarkerOffset, 0],
          range: {
            x: rowMarkerOffset,
            y: 0,
            width: columnsInLength,
            height: rows
          },
          rangeStack: []
        }
      }, false);
    } else if (isHotkey(keys.search, event, details)) {
      var _searchInputRef$curre;
      searchInputRef === null || searchInputRef === void 0 || (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 || _searchInputRef$curre.focus({
        preventScroll: true
      });
      setShowSearchInner(true);
    } else if (isHotkey(keys.delete, event, details)) {
      var _onDelete;
      const callbackResult = (_onDelete = onDelete === null || onDelete === void 0 ? void 0 : onDelete(gridSelection)) !== null && _onDelete !== void 0 ? _onDelete : true;
      if (callbackResult !== false) {
        const toDelete = callbackResult === true ? gridSelection : callbackResult;
        if (toDelete.current !== void 0) {
          deleteRange(toDelete.current.range);
          for (const r of toDelete.current.rangeStack) {
            deleteRange(r);
          }
        }
        for (const r of toDelete.rows) {
          deleteRange({
            x: rowMarkerOffset,
            y: r,
            width: columnsInLength,
            height: 1
          });
        }
        for (const col2 of toDelete.columns) {
          deleteRange({
            x: col2,
            y: 0,
            width: 1,
            height: rows
          });
        }
      }
    }
    if (details.didMatch) {
      cancel();
      return true;
    }
    if (gridSelection.current === void 0) return false;
    let [col, row] = gridSelection.current.cell;
    const [, startRow] = gridSelection.current.cell;
    let freeMove = false;
    let cancelOnlyOnMove = false;
    if (isHotkey(keys.scrollToSelectedCell, event, details)) {
      scrollToRef.current(col - rowMarkerOffset, row);
    } else if (columnSelect !== "none" && isHotkey(keys.selectColumn, event, details)) {
      if (selectedColumns.hasIndex(col)) {
        setSelectedColumns(selectedColumns.remove(col), void 0, true);
      } else {
        if (columnSelect === "single") {
          setSelectedColumns(CompactSelection.fromSingleSelection(col), void 0, true);
        } else {
          setSelectedColumns(void 0, col, true);
        }
      }
    } else if (rowSelect !== "none" && isHotkey(keys.selectRow, event, details)) {
      if (selectedRows.hasIndex(row)) {
        setSelectedRows(selectedRows.remove(row), void 0, true);
      } else {
        if (rowSelect === "single") {
          setSelectedRows(CompactSelection.fromSingleSelection(row), void 0, true);
        } else {
          setSelectedRows(void 0, row, true);
        }
      }
    } else if (!overlayOpen && bounds !== void 0 && isHotkey(keys.activateCell, event, details)) {
      if (row === rows && showTrailingBlankRow) {
        window.setTimeout(() => {
          const customTargetColumn = getCustomNewRowTargetColumn(col);
          void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col);
        }, 0);
      } else {
        const activationEvent = {
          inputType: "keyboard",
          key: event.key
        };
        const cellContent = getMangledCellContent([col, row]);
        if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {
          var _gridRef$current;
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activationEvent);
          mangledOnCellsEdited([{
            location: [col, row],
            value: {
              ...cellContent,
              data: toggleBoolean(cellContent.data)
            }
          }]);
          (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage([{
            cell: [col, row]
          }]);
        } else {
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activationEvent);
          reselect(bounds, activationEvent);
        }
      }
    } else if (gridSelection.current.range.height > 1 && isHotkey(keys.downFill, event, details)) {
      fillDown();
    } else if (gridSelection.current.range.width > 1 && isHotkey(keys.rightFill, event, details)) {
      fillRight();
    } else if (isHotkey(keys.goToNextPage, event, details)) {
      row += Math.max(1, visibleRegionRef.current.height - 4);
    } else if (isHotkey(keys.goToPreviousPage, event, details)) {
      row -= Math.max(1, visibleRegionRef.current.height - 4);
    } else if (isHotkey(keys.goToFirstCell, event, details)) {
      setOverlay(void 0);
      row = 0;
      col = 0;
    } else if (isHotkey(keys.goToLastCell, event, details)) {
      setOverlay(void 0);
      row = Number.MAX_SAFE_INTEGER;
      col = Number.MAX_SAFE_INTEGER;
    } else if (isHotkey(keys.selectToFirstCell, event, details)) {
      setOverlay(void 0);
      adjustSelection([-2, -2]);
    } else if (isHotkey(keys.selectToLastCell, event, details)) {
      setOverlay(void 0);
      adjustSelection([2, 2]);
    } else if (!overlayOpen) {
      if (isHotkey(keys.goDownCell, event, details)) {
        row += 1;
      } else if (isHotkey(keys.goUpCell, event, details)) {
        row -= 1;
      } else if (isHotkey(keys.goRightCell, event, details)) {
        col += 1;
      } else if (isHotkey(keys.goLeftCell, event, details)) {
        col -= 1;
      } else if (isHotkey(keys.goDownCellRetainSelection, event, details)) {
        row += 1;
        freeMove = true;
      } else if (isHotkey(keys.goUpCellRetainSelection, event, details)) {
        row -= 1;
        freeMove = true;
      } else if (isHotkey(keys.goRightCellRetainSelection, event, details)) {
        col += 1;
        freeMove = true;
      } else if (isHotkey(keys.goLeftCellRetainSelection, event, details)) {
        col -= 1;
        freeMove = true;
      } else if (isHotkey(keys.goToLastRow, event, details)) {
        row = rows - 1;
      } else if (isHotkey(keys.goToFirstRow, event, details)) {
        row = Number.MIN_SAFE_INTEGER;
      } else if (isHotkey(keys.goToLastColumn, event, details)) {
        col = Number.MAX_SAFE_INTEGER;
      } else if (isHotkey(keys.goToFirstColumn, event, details)) {
        col = Number.MIN_SAFE_INTEGER;
      } else if (rangeSelect === "rect" || rangeSelect === "multi-rect") {
        if (isHotkey(keys.selectGrowDown, event, details)) {
          adjustSelection([0, 1]);
        } else if (isHotkey(keys.selectGrowUp, event, details)) {
          adjustSelection([0, -1]);
        } else if (isHotkey(keys.selectGrowRight, event, details)) {
          adjustSelection([1, 0]);
        } else if (isHotkey(keys.selectGrowLeft, event, details)) {
          adjustSelection([-1, 0]);
        } else if (isHotkey(keys.selectToLastRow, event, details)) {
          adjustSelection([0, 2]);
        } else if (isHotkey(keys.selectToFirstRow, event, details)) {
          adjustSelection([0, -2]);
        } else if (isHotkey(keys.selectToLastColumn, event, details)) {
          adjustSelection([2, 0]);
        } else if (isHotkey(keys.selectToFirstColumn, event, details)) {
          adjustSelection([-2, 0]);
        }
      }
      cancelOnlyOnMove = details.didMatch;
    } else {
      if (isHotkey(keys.closeOverlay, event, details)) {
        setOverlay(void 0);
      }
      if (isHotkey(keys.acceptOverlayDown, event, details)) {
        setOverlay(void 0);
        row++;
      }
      if (isHotkey(keys.acceptOverlayUp, event, details)) {
        setOverlay(void 0);
        row--;
      }
      if (isHotkey(keys.acceptOverlayLeft, event, details)) {
        setOverlay(void 0);
        col--;
      }
      if (isHotkey(keys.acceptOverlayRight, event, details)) {
        setOverlay(void 0);
        col++;
      }
    }
    const mustRestrictRow = rowGroupingNavBehavior !== void 0 && rowGroupingNavBehavior !== "normal";
    if (mustRestrictRow && row !== startRow) {
      const skipUp = rowGroupingNavBehavior === "skip-up" || rowGroupingNavBehavior === "skip" || rowGroupingNavBehavior === "block";
      const skipDown = rowGroupingNavBehavior === "skip-down" || rowGroupingNavBehavior === "skip" || rowGroupingNavBehavior === "block";
      const didMoveUp = row < startRow;
      if (didMoveUp && skipUp) {
        while (row >= 0 && mapper(row).isGroupHeader) {
          row--;
        }
        if (row < 0) {
          row = startRow;
        }
      } else if (!didMoveUp && skipDown) {
        while (row < rows && mapper(row).isGroupHeader) {
          row++;
        }
        if (row >= rows) {
          row = startRow;
        }
      }
    }
    const moved = updateSelectedCell(col, row, false, freeMove);
    const didMatch = details.didMatch;
    if (didMatch && (moved || !cancelOnlyOnMove || trapFocus)) {
      cancel();
    }
    return didMatch;
  };
  const onKeyDown = (event) => {
    let cancelled = false;
    if (onKeyDownIn !== void 0) {
      onKeyDownIn({
        ...event,
        ...event.location && {
          location: [event.location[0] - rowMarkerOffset, event.location[1]]
        },
        cancel: () => {
          cancelled = true;
        }
      });
    }
    if (cancelled) return;
    if (handleFixedKeybindings(event)) return;
    if (gridSelection.current === void 0) return;
    const [col, row] = gridSelection.current.cell;
    const vr = visibleRegionRef.current;
    const isIMEInput = event.keyCode === 229;
    const isCharacterInput = editOnType && !event.metaKey && !event.ctrlKey && event.key.length === 1 && /[!-~\xA1-\xAC\xAE-\u0377\u037A-\u037F\u0384-\u038A\u038C\u038E-\u03A1\u03A3-\u052F\u0531-\u0556\u0559-\u058A\u058D-\u058F\u0591-\u05C7\u05D0-\u05EA\u05EF-\u05F4\u0606-\u061B\u061D-\u06DC\u06DE-\u070D\u0710-\u074A\u074D-\u07B1\u07C0-\u07FA\u07FD-\u082D\u0830-\u083E\u0840-\u085B\u085E\u0860-\u086A\u0870-\u088E\u0897-\u08E1\u08E3-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A76\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C77-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E3A\u0E3F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FDA\u1000-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u13A0-\u13F5\u13F8-\u13FD\u1400-\u167F\u1681-\u169C\u16A0-\u16F8\u1700-\u1715\u171F-\u1736\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u1800-\u180D\u180F-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE-\u1A1B\u1A1E-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1AB0-\u1ACE\u1B00-\u1B4C\u1B4E-\u1BF3\u1BFC-\u1C37\u1C3B-\u1C49\u1C4D-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD0-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2010-\u2027\u2030-\u205E\u2070\u2071\u2074-\u208E\u2090-\u209C\u20A0-\u20C0\u20D0-\u20F0\u2100-\u218B\u2190-\u2429\u2440-\u244A\u2460-\u2B73\u2B76-\u2B95\u2B97-\u2CF3\u2CF9-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u303F\u3041-\u3096\u3099-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31E5\u31EF-\u321E\u3220-\uA48C\uA490-\uA4C6\uA4D0-\uA62B\uA640-\uA6F7\uA700-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA82C\uA830-\uA839\uA840-\uA877\uA880-\uA8C5\uA8CE-\uA8D9\uA8E0-\uA953\uA95F-\uA97C\uA980-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAAC2\uAADB-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB6B\uAB70-\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC2\uFBD3-\uFD8F\uFD92-\uFDC7\uFDCF\uFDF0-\uFE19\uFE20-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFE70-\uFE74\uFE76-\uFEFC\uFF01-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}-\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1018E}\u{10190}-\u{1019C}\u{101A0}\u{101D0}-\u{101FD}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E0}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{1037A}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{105C0}-\u{105F3}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{1091F}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A38}-\u{10A3A}\u{10A3F}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE6}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B39}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D27}\u{10D30}-\u{10D39}\u{10D40}-\u{10D65}\u{10D69}-\u{10D85}\u{10D8E}\u{10D8F}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EAB}-\u{10EAD}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC4}\u{10EFC}-\u{10F27}\u{10F30}-\u{10F59}\u{10F70}-\u{10F89}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{11000}-\u{1104D}\u{11052}-\u{11075}\u{1107F}-\u{110BC}\u{110BE}-\u{110C2}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11100}-\u{11134}\u{11136}-\u{11147}\u{11150}-\u{11176}\u{11180}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{11241}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112EA}\u{112F0}-\u{112F9}\u{11300}-\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133B}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11380}-\u{11389}\u{1138B}\u{1138E}\u{11390}-\u{113B5}\u{113B7}-\u{113C0}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}-\u{113D5}\u{113D7}\u{113D8}\u{113E1}\u{113E2}\u{11400}-\u{1145B}\u{1145D}-\u{11461}\u{11480}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B5}\u{115B8}-\u{115DD}\u{11600}-\u{11644}\u{11650}-\u{11659}\u{11660}-\u{1166C}\u{11680}-\u{116B9}\u{116C0}-\u{116C9}\u{116D0}-\u{116E3}\u{11700}-\u{1171A}\u{1171D}-\u{1172B}\u{11730}-\u{11746}\u{11800}-\u{1183B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{11946}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D7}\u{119DA}-\u{119E4}\u{11A00}-\u{11A47}\u{11A50}-\u{11AA2}\u{11AB0}-\u{11AF8}\u{11B00}-\u{11B09}\u{11BC0}-\u{11BE1}\u{11BF0}-\u{11BF9}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C36}\u{11C38}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D47}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF8}\u{11F00}-\u{11F10}\u{11F12}-\u{11F3A}\u{11F3E}-\u{11F5A}\u{11FB0}\u{11FC0}-\u{11FF1}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{12F90}-\u{12FF2}\u{13000}-\u{1342F}\u{13440}-\u{13455}\u{13460}-\u{143FA}\u{14400}-\u{14646}\u{16100}-\u{16139}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}-\u{16ABE}\u{16AC0}-\u{16AC9}\u{16AD0}-\u{16AED}\u{16AF0}-\u{16AF5}\u{16B00}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16D40}-\u{16D79}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F4F}-\u{16F87}\u{16F8F}-\u{16F9F}\u{16FE0}-\u{16FE4}\u{16FF0}\u{16FF1}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18CFF}-\u{18D08}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}-\u{1BC9F}\u{1CC00}-\u{1CCF9}\u{1CD00}-\u{1CEB3}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1CF50}-\u{1CFC3}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D172}\u{1D17B}-\u{1D1EA}\u{1D200}-\u{1D245}\u{1D2C0}-\u{1D2D3}\u{1D2E0}-\u{1D2F3}\u{1D300}-\u{1D356}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D7CB}\u{1D7CE}-\u{1DA8B}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E030}-\u{1E06D}\u{1E08F}\u{1E100}-\u{1E12C}\u{1E130}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E290}-\u{1E2AE}\u{1E2C0}-\u{1E2F9}\u{1E2FF}\u{1E4D0}-\u{1E4F9}\u{1E5D0}-\u{1E5FA}\u{1E5FF}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8D6}\u{1E900}-\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1EEF0}\u{1EEF1}\u{1F000}-\u{1F02B}\u{1F030}-\u{1F093}\u{1F0A0}-\u{1F0AE}\u{1F0B1}-\u{1F0BF}\u{1F0C1}-\u{1F0CF}\u{1F0D1}-\u{1F0F5}\u{1F100}-\u{1F1AD}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{1F260}-\u{1F265}\u{1F300}-\u{1F6D7}\u{1F6DC}-\u{1F6EC}\u{1F6F0}-\u{1F6FC}\u{1F700}-\u{1F776}\u{1F77B}-\u{1F7D9}\u{1F7E0}-\u{1F7EB}\u{1F7F0}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F8B0}-\u{1F8BB}\u{1F8C0}\u{1F8C1}\u{1F900}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA7C}\u{1FA80}-\u{1FA89}\u{1FA8F}-\u{1FAC6}\u{1FACE}-\u{1FADC}\u{1FADF}-\u{1FAE9}\u{1FAF0}-\u{1FAF8}\u{1FB00}-\u{1FB92}\u{1FB94}-\u{1FBF9}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B739}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{323AF}\u{E0100}-\u{E01EF}]/u.test(event.key);
    if ((isIMEInput || isCharacterInput) && event.bounds !== void 0 && isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, Math.min(row, rows - 1))]))) {
      if ((!showTrailingBlankRow || row !== rows) && (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (isIMEInput) {
        const activationEvent = {
          inputType: "keyboard",
          key: ""
        };
        onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activationEvent);
        reselect(event.bounds, activationEvent, "");
      } else {
        const activationEvent = {
          inputType: "keyboard",
          key: event.key
        };
        onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activationEvent);
        reselect(event.bounds, activationEvent, event.key);
      }
    }
  };
  return {
    handleFixedKeybindings,
    onKeyDown
  };
}
function useSelectionBehavior(gridSelection, setGridSelection, rangeBehavior, columnBehavior, rowBehavior, rangeSelect, rangeSelectionColumnSpanning) {
  const $ = compilerRuntimeExports.c(24);
  let t0;
  if ($[0] !== columnBehavior || $[1] !== gridSelection || $[2] !== rangeBehavior || $[3] !== rangeSelect || $[4] !== rangeSelectionColumnSpanning || $[5] !== rowBehavior || $[6] !== setGridSelection) {
    t0 = (value, expand, append, trigger) => {
      var _gridSelection$curren, _gridSelection$curren2;
      if ((rangeSelect === "cell" || rangeSelect === "multi-cell") && value !== void 0) {
        value = {
          ...value,
          range: {
            x: value.cell[0],
            y: value.cell[1],
            width: 1,
            height: 1
          }
        };
      }
      if (!rangeSelectionColumnSpanning && value !== void 0 && value.range.width > 1) {
        value = {
          ...value,
          range: {
            ...value.range,
            width: 1,
            x: value.cell[0]
          }
        };
      }
      const rangeMixable = rangeBehavior === "mixed" && (append || trigger === "drag") || rangeBehavior === "additive";
      const allowColumnCoSelect = (columnBehavior === "mixed" || columnBehavior === "additive") && rangeMixable;
      const allowRowCoSelect = append || (rowBehavior === "mixed" || rowBehavior === "additive") && rangeMixable;
      let newVal = {
        current: value === void 0 ? void 0 : {
          ...value,
          rangeStack: trigger === "drag" ? (_gridSelection$curren = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.rangeStack) !== null && _gridSelection$curren !== void 0 ? _gridSelection$curren : [] : []
        },
        columns: allowColumnCoSelect ? gridSelection.columns : CompactSelection.empty(),
        rows: allowRowCoSelect ? gridSelection.rows : CompactSelection.empty()
      };
      const addLastRange = append && (rangeSelect === "multi-rect" || rangeSelect === "multi-cell");
      if (addLastRange && newVal.current !== void 0 && gridSelection.current !== void 0) {
        newVal = {
          ...newVal,
          current: {
            ...newVal.current,
            rangeStack: [...gridSelection.current.rangeStack, gridSelection.current.range]
          }
        };
      }
      setGridSelection(newVal, expand);
    };
    $[0] = columnBehavior;
    $[1] = gridSelection;
    $[2] = rangeBehavior;
    $[3] = rangeSelect;
    $[4] = rangeSelectionColumnSpanning;
    $[5] = rowBehavior;
    $[6] = setGridSelection;
    $[7] = t0;
  } else {
    t0 = $[7];
  }
  const setCurrent = t0;
  let t1;
  if ($[8] !== columnBehavior || $[9] !== gridSelection || $[10] !== rangeBehavior || $[11] !== rowBehavior || $[12] !== setGridSelection) {
    t1 = (newRows, append_0, allowMixed) => {
      newRows = newRows !== null && newRows !== void 0 ? newRows : gridSelection.rows;
      if (append_0 !== void 0) {
        newRows = newRows.add(append_0);
      }
      let newVal_0;
      if (rowBehavior === "exclusive" && newRows.length > 0) {
        newVal_0 = {
          current: void 0,
          columns: CompactSelection.empty(),
          rows: newRows
        };
      } else {
        const rangeMixed = allowMixed && rangeBehavior === "mixed" || rangeBehavior === "additive";
        const columnMixed = allowMixed && columnBehavior === "mixed" || columnBehavior === "additive";
        const current = !rangeMixed ? void 0 : gridSelection.current;
        newVal_0 = {
          current,
          columns: columnMixed ? gridSelection.columns : CompactSelection.empty(),
          rows: newRows
        };
      }
      setGridSelection(newVal_0, false);
    };
    $[8] = columnBehavior;
    $[9] = gridSelection;
    $[10] = rangeBehavior;
    $[11] = rowBehavior;
    $[12] = setGridSelection;
    $[13] = t1;
  } else {
    t1 = $[13];
  }
  const setSelectedRows = t1;
  let t2;
  if ($[14] !== columnBehavior || $[15] !== gridSelection || $[16] !== rangeBehavior || $[17] !== rowBehavior || $[18] !== setGridSelection) {
    t2 = (newCols, append_1, allowMixed_0) => {
      newCols = newCols !== null && newCols !== void 0 ? newCols : gridSelection.columns;
      if (append_1 !== void 0) {
        newCols = newCols.add(append_1);
      }
      let newVal_1;
      if (columnBehavior === "exclusive" && newCols.length > 0) {
        newVal_1 = {
          current: void 0,
          rows: CompactSelection.empty(),
          columns: newCols
        };
      } else {
        const rangeMixed_0 = allowMixed_0 && rangeBehavior === "mixed" || rangeBehavior === "additive";
        const rowMixed = allowMixed_0 && rowBehavior === "mixed" || rowBehavior === "additive";
        const current_0 = !rangeMixed_0 ? void 0 : gridSelection.current;
        newVal_1 = {
          current: current_0,
          rows: rowMixed ? gridSelection.rows : CompactSelection.empty(),
          columns: newCols
        };
      }
      setGridSelection(newVal_1, false);
    };
    $[14] = columnBehavior;
    $[15] = gridSelection;
    $[16] = rangeBehavior;
    $[17] = rowBehavior;
    $[18] = setGridSelection;
    $[19] = t2;
  } else {
    t2 = $[19];
  }
  const setSelectedColumns = t2;
  let t3;
  if ($[20] !== setCurrent || $[21] !== setSelectedColumns || $[22] !== setSelectedRows) {
    t3 = [setCurrent, setSelectedRows, setSelectedColumns];
    $[20] = setCurrent;
    $[21] = setSelectedColumns;
    $[22] = setSelectedRows;
    $[23] = t3;
  } else {
    t3 = $[23];
  }
  return t3;
}
function useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortController, rows) {
  const getCellsForSelectionDirectWhenValid = (rect) => {
    var _getCellsForSelection;
    if (getCellsForSelectionIn === true) {
      const result = [];
      for (let y = rect.y; y < rect.y + rect.height; y++) {
        const row = [];
        for (let x = rect.x; x < rect.x + rect.width; x++) {
          if (x < 0 || y >= rows) {
            row.push({
              kind: GridCellKind.Loading,
              allowOverlay: false
            });
          } else {
            row.push(getCellContent([x, y]));
          }
        }
        result.push(row);
      }
      return result;
    }
    return (_getCellsForSelection = getCellsForSelectionIn === null || getCellsForSelectionIn === void 0 ? void 0 : getCellsForSelectionIn(rect, abortController.signal)) !== null && _getCellsForSelection !== void 0 ? _getCellsForSelection : [];
  };
  const getCellsForSelectionDirect = getCellsForSelectionIn !== void 0 ? getCellsForSelectionDirectWhenValid : void 0;
  const getCellsForSelectionMangled = (rect) => {
    if (getCellsForSelectionDirect === void 0) return [];
    const newRect = {
      ...rect,
      x: rect.x - rowMarkerOffset
    };
    if (newRect.x < 0) {
      newRect.x = 0;
      newRect.width--;
      const r = getCellsForSelectionDirect(newRect, abortController.signal);
      if (typeof r === "function") {
        return async () => (await r()).map((row) => [{
          kind: GridCellKind.Loading,
          allowOverlay: false
        }, ...row]);
      }
      return r.map((row) => [{
        kind: GridCellKind.Loading,
        allowOverlay: false
      }, ...row]);
    }
    return getCellsForSelectionDirect(newRect, abortController.signal);
  };
  const getCellsForSelection = getCellsForSelectionIn !== void 0 ? getCellsForSelectionMangled : void 0;
  return [getCellsForSelection, getCellsForSelectionDirect];
}
function toCss(x) {
  if (typeof x === "string") return x;
  return `${x}px`;
}
const _exp$1 = () => (p2) => p2.innerWidth;
const _exp2 = () => (p2) => p2.innerHeight;
const Wrapper = /* @__PURE__ */ styled_default("div")({
  name: "Wrapper",
  class: "gdg-wpajpy2",
  propsAsIs: false,
  vars: {
    "wpajpy2-0": [_exp$1()],
    "wpajpy2-1": [_exp2()]
  }
});
const DataEditorContainer = (p2) => {
  const $ = compilerRuntimeExports.c(14);
  let children;
  let inHeight;
  let inWidth;
  let rest;
  if ($[0] !== p2) {
    ({
      inWidth,
      inHeight,
      children,
      ...rest
    } = p2);
    $[0] = p2;
    $[1] = children;
    $[2] = inHeight;
    $[3] = inWidth;
    $[4] = rest;
  } else {
    children = $[1];
    inHeight = $[2];
    inWidth = $[3];
    rest = $[4];
  }
  let t0;
  if ($[5] !== inHeight) {
    t0 = toCss(inHeight);
    $[5] = inHeight;
    $[6] = t0;
  } else {
    t0 = $[6];
  }
  let t1;
  if ($[7] !== inWidth) {
    t1 = toCss(inWidth);
    $[7] = inWidth;
    $[8] = t1;
  } else {
    t1 = $[8];
  }
  let t2;
  if ($[9] !== children || $[10] !== rest || $[11] !== t0 || $[12] !== t1) {
    t2 = /* @__PURE__ */ jsx(Wrapper, {
      innerHeight: t0,
      innerWidth: t1,
      ...rest,
      children
    });
    $[9] = children;
    $[10] = rest;
    $[11] = t0;
    $[12] = t1;
    $[13] = t2;
  } else {
    t2 = $[13];
  }
  return t2;
};
const maxPxPerMs = 2;
const msToFullSpeed = 1300;
function useAutoscroll(scrollDirection, scrollRef, onScroll) {
  const $ = compilerRuntimeExports.c(8);
  const speedScalar = React__default.useRef(0);
  let t0;
  if ($[0] !== scrollDirection) {
    t0 = scrollDirection !== null && scrollDirection !== void 0 ? scrollDirection : [0, 0];
    $[0] = scrollDirection;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const [xDir, yDir] = t0;
  let t1;
  let t2;
  if ($[2] !== onScroll || $[3] !== scrollRef || $[4] !== xDir || $[5] !== yDir) {
    t1 = () => {
      if (xDir === 0 && yDir === 0) {
        speedScalar.current = 0;
        return;
      }
      let cancelled = false;
      let lastTime = 0;
      const scrollFn = (curTime) => {
        if (cancelled) {
          return;
        }
        if (lastTime === 0) {
          lastTime = curTime;
        } else {
          var _scrollRef$current;
          const step = curTime - lastTime;
          speedScalar.current = Math.min(1, speedScalar.current + step / msToFullSpeed);
          const motion = speedScalar.current ** 1.618 * step * maxPxPerMs;
          (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollBy(xDir * motion, yDir * motion);
          lastTime = curTime;
          onScroll === null || onScroll === void 0 || onScroll();
        }
        window.requestAnimationFrame(scrollFn);
      };
      window.requestAnimationFrame(scrollFn);
      return () => {
        cancelled = true;
      };
    };
    t2 = [scrollRef, xDir, yDir, onScroll];
    $[2] = onScroll;
    $[3] = scrollRef;
    $[4] = xDir;
    $[5] = yDir;
    $[6] = t1;
    $[7] = t2;
  } else {
    t1 = $[6];
    t2 = $[7];
  }
  React__default.useEffect(t1, t2);
}
function useClipboard(args) {
  const $ = compilerRuntimeExports.c(38);
  const {
    state,
    keybindings,
    getCellsForSelection,
    coercePasteValue,
    onPaste,
    copyHeaders,
    columnsIn,
    onDelete,
    deleteRange,
    safeWindow
  } = args;
  const {
    gridSelection,
    gridRef,
    scrollRef,
    canvasRef,
    abortControllerRef,
    rowMarkerOffset,
    mangledCols,
    mangledRows,
    rows,
    getMangledCellContent,
    mangledOnCellsEdited,
    getCellRenderer
  } = state;
  let t0;
  if ($[0] !== canvasRef || $[1] !== coercePasteValue || $[2] !== getCellRenderer || $[3] !== getMangledCellContent || $[4] !== gridRef || $[5] !== gridSelection || $[6] !== keybindings.paste || $[7] !== mangledCols || $[8] !== mangledOnCellsEdited || $[9] !== mangledRows || $[10] !== onPaste || $[11] !== rowMarkerOffset || $[12] !== rows || $[13] !== scrollRef) {
    t0 = async (e) => {
      var _scrollRef$current, _canvasRef$current;
      if (!keybindings.paste) {
        return;
      }
      const pasteToCell = function pasteToCell2(inner, target, rawValue, formatted) {
        var _rawValue$join, _rawValue$toString;
        const stringifiedRawValue = typeof rawValue === "object" ? (_rawValue$join = rawValue === null || rawValue === void 0 ? void 0 : rawValue.join("\n")) !== null && _rawValue$join !== void 0 ? _rawValue$join : "" : (_rawValue$toString = rawValue === null || rawValue === void 0 ? void 0 : rawValue.toString()) !== null && _rawValue$toString !== void 0 ? _rawValue$toString : "";
        if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
          const coerced = coercePasteValue === null || coercePasteValue === void 0 ? void 0 : coercePasteValue(stringifiedRawValue, inner);
          if (coerced !== void 0 && isEditableGridCell(coerced)) {
            return {
              location: target,
              value: coerced
            };
          }
          const r = getCellRenderer(inner);
          if (r === void 0) {
            return;
          }
          if (r.kind === GridCellKind.Custom) {
            var _onPaste, _ref;
            assert(inner.kind === GridCellKind.Custom);
            const newVal = (_onPaste = (_ref = r).onPaste) === null || _onPaste === void 0 ? void 0 : _onPaste.call(_ref, stringifiedRawValue, inner.data);
            if (newVal === void 0) {
              return;
            }
            return {
              location: target,
              value: {
                ...inner,
                data: newVal
              }
            };
          } else {
            var _r$onPaste;
            const newVal_0 = (_r$onPaste = r.onPaste) === null || _r$onPaste === void 0 ? void 0 : _r$onPaste.call(r, stringifiedRawValue, inner, {
              formatted,
              formattedString: typeof formatted === "string" ? formatted : formatted === null || formatted === void 0 ? void 0 : formatted.join("\n"),
              rawValue
            });
            if (newVal_0 === void 0) {
              return;
            }
            assert(newVal_0.kind === inner.kind);
            return {
              location: target,
              value: newVal_0
            };
          }
        }
      };
      const selectedColumns = gridSelection.columns;
      const selectedRows = gridSelection.rows;
      const focused = ((_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.contains(document.activeElement)) === true || ((_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.contains(document.activeElement)) === true;
      let target_0;
      if (gridSelection.current !== void 0) {
        target_0 = [gridSelection.current.range.x, gridSelection.current.range.y];
      } else {
        if (selectedColumns.length === 1) {
          var _selectedColumns$firs;
          target_0 = [(_selectedColumns$firs = selectedColumns.first()) !== null && _selectedColumns$firs !== void 0 ? _selectedColumns$firs : 0, 0];
        } else {
          if (selectedRows.length === 1) {
            var _selectedRows$first;
            target_0 = [rowMarkerOffset, (_selectedRows$first = selectedRows.first()) !== null && _selectedRows$first !== void 0 ? _selectedRows$first : 0];
          }
        }
      }
      if (focused && target_0 !== void 0) {
        var _gridRef$current;
        let data;
        let text;
        if (navigator.clipboard.read !== void 0) {
          const clipboardContent = await navigator.clipboard.read();
          for (const item of clipboardContent) {
            if (item.types.includes("text/html")) {
              const htmlBlob = await item.getType("text/html");
              const html = await htmlBlob.text();
              const decoded = decodeHTML(html);
              if (decoded !== void 0) {
                data = decoded;
                break;
              }
            }
            if (item.types.includes("text/plain")) {
              text = await (await item.getType("text/plain")).text();
            }
          }
        } else {
          if (navigator.clipboard.readText !== void 0) {
            text = await navigator.clipboard.readText();
          } else {
            if (e !== void 0 && (e === null || e === void 0 ? void 0 : e.clipboardData) !== null) {
              if (e.clipboardData.types.includes("text/html")) {
                const html_0 = e.clipboardData.getData("text/html");
                data = decodeHTML(html_0);
              }
              if (data === void 0 && e.clipboardData.types.includes("text/plain")) {
                text = e.clipboardData.getData("text/plain");
              }
            } else {
              return;
            }
          }
        }
        const [targetCol, targetRow] = target_0;
        const editList = [];
        do {
          if (onPaste === void 0) {
            var _ref2, _data;
            const cellData = getMangledCellContent(target_0);
            const rawValue_0 = (_ref2 = text !== null && text !== void 0 ? text : (_data = data) === null || _data === void 0 ? void 0 : _data.map(_temp2$1).join("	")) !== null && _ref2 !== void 0 ? _ref2 : "";
            const newVal_1 = pasteToCell(cellData, target_0, rawValue_0, void 0);
            if (newVal_1 !== void 0) {
              editList.push(newVal_1);
            }
            break;
          }
          if (data === void 0) {
            if (text === void 0) {
              return;
            }
            data = unquote(text);
          }
          if (onPaste === false || typeof onPaste === "function" && (onPaste === null || onPaste === void 0 ? void 0 : onPaste([target_0[0] - rowMarkerOffset, target_0[1]], data.map(_temp4))) !== true) {
            return;
          }
          for (const [row, dataRow] of data.entries()) {
            if (row + targetRow >= rows) {
              break;
            }
            for (const [col, dataItem] of dataRow.entries()) {
              const index = [col + targetCol, row + targetRow];
              const [writeCol, writeRow] = index;
              if (writeCol >= mangledCols.length) {
                continue;
              }
              if (writeRow >= mangledRows) {
                continue;
              }
              const cellData_0 = getMangledCellContent(index);
              const newVal_2 = pasteToCell(cellData_0, index, dataItem.rawValue, dataItem.formatted);
              if (newVal_2 !== void 0) {
                editList.push(newVal_2);
              }
            }
          }
        } while (false);
        mangledOnCellsEdited(editList);
        (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage(editList.map(_temp5));
      }
    };
    $[0] = canvasRef;
    $[1] = coercePasteValue;
    $[2] = getCellRenderer;
    $[3] = getMangledCellContent;
    $[4] = gridRef;
    $[5] = gridSelection;
    $[6] = keybindings.paste;
    $[7] = mangledCols;
    $[8] = mangledOnCellsEdited;
    $[9] = mangledRows;
    $[10] = onPaste;
    $[11] = rowMarkerOffset;
    $[12] = rows;
    $[13] = scrollRef;
    $[14] = t0;
  } else {
    t0 = $[14];
  }
  const onPasteInternal = t0;
  useEventListener("paste", onPasteInternal, safeWindow, false, true);
  let t1;
  if ($[15] !== abortControllerRef || $[16] !== canvasRef || $[17] !== columnsIn || $[18] !== copyHeaders || $[19] !== getCellsForSelection || $[20] !== gridSelection || $[21] !== keybindings.copy || $[22] !== rowMarkerOffset || $[23] !== rows || $[24] !== scrollRef) {
    t1 = async (e_0, ignoreFocus) => {
      var _scrollRef$current2, _canvasRef$current2;
      if (!keybindings.copy) {
        return;
      }
      const focused_0 = ignoreFocus === true || ((_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.contains(document.activeElement)) === true || ((_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 ? void 0 : _canvasRef$current2.contains(document.activeElement)) === true;
      const selectedColumns_0 = gridSelection.columns;
      const selectedRows_0 = gridSelection.rows;
      const copyToClipboardWithHeaders = (cells, columnIndexes) => {
        if (!copyHeaders) {
          copyToClipboard(cells, columnIndexes, e_0);
        } else {
          const headers = columnIndexes.map((index_0) => ({
            kind: GridCellKind.Text,
            data: columnsIn[index_0].title,
            displayData: columnsIn[index_0].title,
            allowOverlay: false
          }));
          copyToClipboard([headers, ...cells], columnIndexes, e_0);
        }
      };
      if (focused_0 && getCellsForSelection !== void 0) {
        if (gridSelection.current !== void 0) {
          let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
          if (typeof thunk !== "object") {
            thunk = await thunk();
          }
          copyToClipboardWithHeaders(thunk, range(gridSelection.current.range.x - rowMarkerOffset, gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset));
        } else {
          if (selectedRows_0 !== void 0 && selectedRows_0.length > 0) {
            const toCopy = [...selectedRows_0];
            const cells_0 = toCopy.map((rowIndex) => {
              const thunk_0 = getCellsForSelection({
                x: rowMarkerOffset,
                y: rowIndex,
                width: columnsIn.length,
                height: 1
              }, abortControllerRef.current.signal);
              if (typeof thunk_0 === "object") {
                return thunk_0[0];
              }
              return thunk_0().then(_temp6);
            });
            if (cells_0.some(_temp7)) {
              const settled = await Promise.all(cells_0);
              copyToClipboardWithHeaders(settled, range(columnsIn.length));
            } else {
              copyToClipboardWithHeaders(cells_0, range(columnsIn.length));
            }
          } else {
            if (selectedColumns_0.length > 0) {
              const results = [];
              const cols = [];
              for (const col_0 of selectedColumns_0) {
                let thunk_1 = getCellsForSelection({
                  x: col_0,
                  y: 0,
                  width: 1,
                  height: rows
                }, abortControllerRef.current.signal);
                if (typeof thunk_1 !== "object") {
                  thunk_1 = await thunk_1();
                }
                results.push(thunk_1);
                cols.push(col_0 - rowMarkerOffset);
              }
              if (results.length === 1) {
                copyToClipboardWithHeaders(results[0], cols);
              } else {
                const toCopy_0 = results.reduce(_temp8);
                copyToClipboardWithHeaders(toCopy_0, cols);
              }
            }
          }
        }
      }
    };
    $[15] = abortControllerRef;
    $[16] = canvasRef;
    $[17] = columnsIn;
    $[18] = copyHeaders;
    $[19] = getCellsForSelection;
    $[20] = gridSelection;
    $[21] = keybindings.copy;
    $[22] = rowMarkerOffset;
    $[23] = rows;
    $[24] = scrollRef;
    $[25] = t1;
  } else {
    t1 = $[25];
  }
  const onCopy = t1;
  useEventListener("copy", onCopy, safeWindow, false, false);
  let t2;
  if ($[26] !== canvasRef || $[27] !== deleteRange || $[28] !== gridSelection || $[29] !== keybindings.cut || $[30] !== onCopy || $[31] !== onDelete || $[32] !== scrollRef) {
    t2 = async (e_1) => {
      var _scrollRef$current3, _canvasRef$current3;
      if (!keybindings.cut) {
        return;
      }
      const focused_1 = ((_scrollRef$current3 = scrollRef.current) === null || _scrollRef$current3 === void 0 ? void 0 : _scrollRef$current3.contains(document.activeElement)) === true || ((_canvasRef$current3 = canvasRef.current) === null || _canvasRef$current3 === void 0 ? void 0 : _canvasRef$current3.contains(document.activeElement)) === true;
      if (!focused_1) {
        return;
      }
      await onCopy(e_1);
      if (gridSelection.current !== void 0) {
        let effectiveSelection = {
          current: {
            cell: gridSelection.current.cell,
            range: gridSelection.current.range,
            rangeStack: []
          },
          rows: CompactSelection.empty(),
          columns: CompactSelection.empty()
        };
        const onDeleteResult = onDelete === null || onDelete === void 0 ? void 0 : onDelete(effectiveSelection);
        if (onDeleteResult === false) {
          return;
        }
        effectiveSelection = onDeleteResult === void 0 || onDeleteResult === true ? effectiveSelection : onDeleteResult;
        if (effectiveSelection.current === void 0) {
          return;
        }
        deleteRange(effectiveSelection.current.range);
      }
    };
    $[26] = canvasRef;
    $[27] = deleteRange;
    $[28] = gridSelection;
    $[29] = keybindings.cut;
    $[30] = onCopy;
    $[31] = onDelete;
    $[32] = scrollRef;
    $[33] = t2;
  } else {
    t2 = $[33];
  }
  const onCut = t2;
  useEventListener("cut", onCut, safeWindow, false, false);
  let t3;
  if ($[34] !== onCopy || $[35] !== onCut || $[36] !== onPasteInternal) {
    t3 = {
      onCopy,
      onCut,
      onPasteInternal
    };
    $[34] = onCopy;
    $[35] = onCut;
    $[36] = onPasteInternal;
    $[37] = t3;
  } else {
    t3 = $[37];
  }
  return t3;
}
function _temp8(pv, cv) {
  return pv.map((row_0, index_1) => [...row_0, ...cv[index_1]]);
}
function _temp7(x) {
  return x instanceof Promise;
}
function _temp6(v2) {
  return v2[0];
}
function _temp5(c) {
  return {
    cell: c.location
  };
}
function _temp4(r_1) {
  return r_1.map(_temp3);
}
function _temp3(cb_0) {
  var _cb_0$rawValue$toStri, _cb_0$rawValue;
  return (_cb_0$rawValue$toStri = (_cb_0$rawValue = cb_0.rawValue) === null || _cb_0$rawValue === void 0 ? void 0 : _cb_0$rawValue.toString()) !== null && _cb_0$rawValue$toStri !== void 0 ? _cb_0$rawValue$toStri : "";
}
function _temp2$1(r_0) {
  return r_0.map(_temp$3).join("	");
}
function _temp$3(cb) {
  return cb.rawValue;
}
function useRemAdjuster(_ref) {
  let {
    rowHeight: rowHeightIn,
    headerHeight: headerHeightIn,
    groupHeaderHeight: groupHeaderHeightIn,
    theme: themeIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    scaleToRem,
    remSize
  } = _ref;
  const [rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY] = ((_themeIn$headerIconSi, _themeIn$cellHorizont, _themeIn$cellVertical) => {
    if (!scaleToRem || remSize === 16) return [rowHeightIn, headerHeightIn, groupHeaderHeightIn, themeIn, overscrollXIn, overscrollYIn];
    const scaler = remSize / 16;
    const rh = rowHeightIn;
    const bt = getDataEditorTheme();
    return [typeof rh === "number" ? rh * scaler : (n) => Math.ceil(rh(n) * scaler), Math.ceil(headerHeightIn * scaler), Math.ceil(groupHeaderHeightIn * scaler), {
      ...themeIn,
      headerIconSize: ((_themeIn$headerIconSi = themeIn === null || themeIn === void 0 ? void 0 : themeIn.headerIconSize) !== null && _themeIn$headerIconSi !== void 0 ? _themeIn$headerIconSi : bt.headerIconSize) * scaler,
      cellHorizontalPadding: ((_themeIn$cellHorizont = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellHorizontalPadding) !== null && _themeIn$cellHorizont !== void 0 ? _themeIn$cellHorizont : bt.cellHorizontalPadding) * scaler,
      cellVerticalPadding: ((_themeIn$cellVertical = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellVerticalPadding) !== null && _themeIn$cellVertical !== void 0 ? _themeIn$cellVertical : bt.cellVerticalPadding) * scaler
    }, Math.ceil((overscrollXIn !== null && overscrollXIn !== void 0 ? overscrollXIn : 0) * scaler), Math.ceil((overscrollYIn !== null && overscrollYIn !== void 0 ? overscrollYIn : 0) * scaler)];
  })();
  return {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  };
}
const keybindingDefaults = {
  downFill: false,
  rightFill: false,
  clear: true,
  closeOverlay: true,
  acceptOverlayDown: true,
  acceptOverlayUp: true,
  acceptOverlayLeft: true,
  acceptOverlayRight: true,
  copy: true,
  paste: true,
  cut: true,
  search: false,
  delete: true,
  activateCell: true,
  scrollToSelectedCell: true,
  goToFirstCell: true,
  goToFirstColumn: true,
  goToFirstRow: true,
  goToLastCell: true,
  goToLastColumn: true,
  goToLastRow: true,
  goToNextPage: true,
  goToPreviousPage: true,
  selectToFirstCell: true,
  selectToFirstColumn: true,
  selectToFirstRow: true,
  selectToLastCell: true,
  selectToLastColumn: true,
  selectToLastRow: true,
  selectAll: true,
  selectRow: true,
  selectColumn: true,
  goUpCell: true,
  goRightCell: true,
  goDownCell: true,
  goLeftCell: true,
  goUpCellRetainSelection: true,
  goRightCellRetainSelection: true,
  goDownCellRetainSelection: true,
  goLeftCellRetainSelection: true,
  selectGrowUp: true,
  selectGrowRight: true,
  selectGrowDown: true,
  selectGrowLeft: true
};
function realizeKeybind(keybind, defaultVal) {
  if (keybind === true) return defaultVal;
  if (keybind === false) return "";
  return keybind;
}
function realizeKeybinds(keybinds) {
  const isOSX = browserIsOSX.value;
  return {
    activateCell: realizeKeybind(keybinds.activateCell, " |Enter|shift+Enter"),
    clear: realizeKeybind(keybinds.clear, "any+Escape"),
    closeOverlay: realizeKeybind(keybinds.closeOverlay, "any+Escape"),
    acceptOverlayDown: realizeKeybind(keybinds.acceptOverlayDown, "Enter"),
    acceptOverlayUp: realizeKeybind(keybinds.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: realizeKeybind(keybinds.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: realizeKeybind(keybinds.acceptOverlayRight, "Tab"),
    copy: keybinds.copy,
    cut: keybinds.cut,
    delete: realizeKeybind(keybinds.delete, isOSX ? "Backspace|Delete" : "Delete"),
    downFill: realizeKeybind(keybinds.downFill, "primary+_68"),
    scrollToSelectedCell: realizeKeybind(keybinds.scrollToSelectedCell, "primary+Enter"),
    goDownCell: realizeKeybind(keybinds.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: realizeKeybind(keybinds.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: realizeKeybind(keybinds.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: realizeKeybind(keybinds.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: realizeKeybind(keybinds.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: realizeKeybind(keybinds.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: realizeKeybind(keybinds.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: realizeKeybind(keybinds.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: realizeKeybind(keybinds.goToFirstCell, "primary+Home"),
    goToFirstColumn: realizeKeybind(keybinds.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: realizeKeybind(keybinds.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: realizeKeybind(keybinds.goToLastCell, "primary+End"),
    goToLastColumn: realizeKeybind(keybinds.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: realizeKeybind(keybinds.goToLastRow, "primary+ArrowDown"),
    goToNextPage: realizeKeybind(keybinds.goToNextPage, "PageDown"),
    goToPreviousPage: realizeKeybind(keybinds.goToPreviousPage, "PageUp"),
    paste: keybinds.paste,
    rightFill: realizeKeybind(keybinds.rightFill, "primary+_82"),
    search: realizeKeybind(keybinds.search, "primary+f"),
    selectAll: realizeKeybind(keybinds.selectAll, "primary+a"),
    selectColumn: realizeKeybind(keybinds.selectColumn, "ctrl+ "),
    selectGrowDown: realizeKeybind(keybinds.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: realizeKeybind(keybinds.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: realizeKeybind(keybinds.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: realizeKeybind(keybinds.selectGrowUp, "shift+ArrowUp"),
    selectRow: realizeKeybind(keybinds.selectRow, "shift+ "),
    selectToFirstCell: realizeKeybind(keybinds.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: realizeKeybind(keybinds.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: realizeKeybind(keybinds.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: realizeKeybind(keybinds.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: realizeKeybind(keybinds.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: realizeKeybind(keybinds.selectToLastRow, "primary+shift+ArrowDown")
  };
}
function useKeybindingsWithDefaults(keybindingsIn) {
  const $ = compilerRuntimeExports.c(9);
  const keys = useDeepMemo(keybindingsIn);
  let t0;
  bb0: {
    var _ref, _keys$goToNextPage, _ref2, _keys$goToPreviousPag, _ref3, _keys$goToFirstCell, _ref4, _keys$goToLastCell, _ref5, _keys$selectToFirstCe, _ref6, _keys$selectToLastCel;
    if (keys === void 0) {
      let t12;
      if ($[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
        t12 = realizeKeybinds(keybindingDefaults);
        $[0] = t12;
      } else {
        t12 = $[0];
      }
      t0 = t12;
      break bb0;
    }
    const t1 = (_ref = (_keys$goToNextPage = keys === null || keys === void 0 ? void 0 : keys.goToNextPage) !== null && _keys$goToNextPage !== void 0 ? _keys$goToNextPage : keys === null || keys === void 0 ? void 0 : keys.pageDown) !== null && _ref !== void 0 ? _ref : keybindingDefaults.goToNextPage;
    const t2 = (_ref2 = (_keys$goToPreviousPag = keys === null || keys === void 0 ? void 0 : keys.goToPreviousPage) !== null && _keys$goToPreviousPag !== void 0 ? _keys$goToPreviousPag : keys === null || keys === void 0 ? void 0 : keys.pageUp) !== null && _ref2 !== void 0 ? _ref2 : keybindingDefaults.goToPreviousPage;
    const t3 = (_ref3 = (_keys$goToFirstCell = keys === null || keys === void 0 ? void 0 : keys.goToFirstCell) !== null && _keys$goToFirstCell !== void 0 ? _keys$goToFirstCell : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref3 !== void 0 ? _ref3 : keybindingDefaults.goToFirstCell;
    const t4 = (_ref4 = (_keys$goToLastCell = keys === null || keys === void 0 ? void 0 : keys.goToLastCell) !== null && _keys$goToLastCell !== void 0 ? _keys$goToLastCell : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref4 !== void 0 ? _ref4 : keybindingDefaults.goToLastCell;
    const t5 = (_ref5 = (_keys$selectToFirstCe = keys === null || keys === void 0 ? void 0 : keys.selectToFirstCell) !== null && _keys$selectToFirstCe !== void 0 ? _keys$selectToFirstCe : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref5 !== void 0 ? _ref5 : keybindingDefaults.selectToFirstCell;
    const t6 = (_ref6 = (_keys$selectToLastCel = keys === null || keys === void 0 ? void 0 : keys.selectToLastCell) !== null && _keys$selectToLastCel !== void 0 ? _keys$selectToLastCel : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref6 !== void 0 ? _ref6 : keybindingDefaults.selectToLastCell;
    let t7;
    if ($[1] !== keys || $[2] !== t1 || $[3] !== t2 || $[4] !== t3 || $[5] !== t4 || $[6] !== t5 || $[7] !== t6) {
      const withBackCompatApplied = {
        ...keys,
        goToNextPage: t1,
        goToPreviousPage: t2,
        goToFirstCell: t3,
        goToLastCell: t4,
        selectToFirstCell: t5,
        selectToLastCell: t6
      };
      t7 = realizeKeybinds({
        ...keybindingDefaults,
        ...withBackCompatApplied
      });
      $[1] = keys;
      $[2] = t1;
      $[3] = t2;
      $[4] = t3;
      $[5] = t4;
      $[6] = t5;
      $[7] = t6;
      $[8] = t7;
    } else {
      t7 = $[8];
    }
    t0 = t7;
  }
  return t0;
}
function expandRowGroups(groups) {
  function processGroup(group, depth, path) {
    if (typeof group === "number") {
      return {
        headerIndex: group,
        isCollapsed: false,
        depth,
        path
      };
    }
    const expandedGroup = {
      headerIndex: group.headerIndex,
      isCollapsed: group.isCollapsed,
      depth,
      path
    };
    if (group.subGroups !== void 0) {
      expandedGroup.subGroups = group.subGroups.map((x, ind) => processGroup(x, depth + 1, [...path, ind])).sort((a, b2) => a.headerIndex - b2.headerIndex);
    }
    return expandedGroup;
  }
  const expanded = groups.map((group, i) => processGroup(group, 0, [i]));
  return expanded.sort((a, b2) => a.headerIndex - b2.headerIndex);
}
function flattenRowGroups(rowGrouping, rows) {
  const flattened = [];
  function processGroup(group, nextHeaderIndex) {
    let skipChildren = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    let rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
    if (group.subGroups !== void 0) {
      rowsInGroup = group.subGroups[0].headerIndex - group.headerIndex;
    }
    rowsInGroup--;
    flattened.push({
      rowIndex: -1,
      headerIndex: group.headerIndex,
      contentIndex: -1,
      skip: skipChildren,
      isCollapsed: group.isCollapsed,
      depth: group.depth,
      path: group.path,
      rows: rowsInGroup
    });
    if (group.subGroups) {
      for (let i = 0; i < group.subGroups.length; i++) {
        const nextSubHeaderIndex = i < group.subGroups.length - 1 ? group.subGroups[i + 1].headerIndex : nextHeaderIndex;
        processGroup(group.subGroups[i], nextSubHeaderIndex, skipChildren || group.isCollapsed);
      }
    }
  }
  const expandedGroups = expandRowGroups(rowGrouping.groups);
  for (let i = 0; i < expandedGroups.length; i++) {
    const nextHeaderIndex = i < expandedGroups.length - 1 ? expandedGroups[i + 1].headerIndex : null;
    processGroup(expandedGroups[i], nextHeaderIndex);
  }
  let rowIndex = 0;
  let contentIndex = 0;
  for (const g of flattened) {
    g.contentIndex = contentIndex;
    contentIndex += g.rows;
    g.rowIndex = rowIndex;
    rowIndex += g.isCollapsed ? 1 : g.rows + 1;
  }
  return flattened.filter((x) => x.skip === false).map((x) => {
    const {
      skip,
      ...rest
    } = x;
    return rest;
  });
}
function mapRowIndexToPath(row, flattenedRowGroups) {
  if (flattenedRowGroups === void 0 || flattenRowGroups.length === 0) return {
    path: [row],
    originalIndex: row,
    isGroupHeader: false,
    groupIndex: row,
    contentIndex: row,
    groupRows: -1
  };
  let toGo = row;
  for (const group of flattenedRowGroups) {
    if (toGo === 0) return {
      path: [...group.path, -1],
      originalIndex: group.headerIndex,
      isGroupHeader: true,
      groupIndex: -1,
      contentIndex: -1,
      groupRows: group.rows
    };
    if (!group.isCollapsed) {
      if (toGo <= group.rows) return {
        path: [...group.path, toGo - 1],
        originalIndex: group.headerIndex + toGo,
        isGroupHeader: false,
        groupIndex: toGo - 1,
        contentIndex: group.contentIndex + toGo - 1,
        groupRows: group.rows
      };
      toGo = toGo - group.rows - 1;
    } else {
      toGo--;
    }
  }
  return {
    path: [row],
    originalIndex: row,
    isGroupHeader: false,
    groupIndex: row,
    contentIndex: row,
    groupRows: -1
  };
}
function useRowGroupingInner(options, rows, rowHeightIn, getRowThemeOverrideIn) {
  const flattenedRowGroups = options === void 0 ? void 0 : flattenRowGroups(options, rows);
  const flattenedRowGroupsMap = flattenedRowGroups === null || flattenedRowGroups === void 0 ? void 0 : flattenedRowGroups.reduce((acc, group) => {
    acc[group.rowIndex] = group;
    return acc;
  }, {});
  const effectiveRows = (() => {
    if (flattenedRowGroups === void 0) return rows;
    return flattenedRowGroups.reduce((acc, group) => acc + (group.isCollapsed ? 1 : group.rows + 1), 0);
  })();
  const rowHeight = (() => {
    if (options === void 0) return rowHeightIn;
    if (typeof rowHeightIn === "number" && options.height === rowHeightIn) return rowHeightIn;
    return (rowIndex) => {
      if (flattenedRowGroupsMap !== null && flattenedRowGroupsMap !== void 0 && flattenedRowGroupsMap[rowIndex]) return options.height;
      return typeof rowHeightIn === "number" ? rowHeightIn : rowHeightIn(rowIndex);
    };
  })();
  const rowNumberMapperOut = (row) => {
    if (flattenedRowGroups === void 0) return row;
    let toGo = row;
    for (const group of flattenedRowGroups) {
      if (toGo === 0) return void 0;
      toGo--;
      if (!group.isCollapsed) {
        if (toGo < group.rows) return group.contentIndex + toGo;
        toGo -= group.rows;
      }
    }
    return row;
  };
  const getRowThemeOverride = whenDefined(getRowThemeOverrideIn !== null && getRowThemeOverrideIn !== void 0 ? getRowThemeOverrideIn : options === null || options === void 0 ? void 0 : options.themeOverride, (row) => {
    if (options === void 0) return getRowThemeOverrideIn === null || getRowThemeOverrideIn === void 0 ? void 0 : getRowThemeOverrideIn(row, row, row);
    if (getRowThemeOverrideIn === void 0 && (options === null || options === void 0 ? void 0 : options.themeOverride) === void 0) return void 0;
    const {
      isGroupHeader,
      contentIndex,
      groupIndex
    } = mapRowIndexToPath(row, flattenedRowGroups);
    if (isGroupHeader) return options.themeOverride;
    return getRowThemeOverrideIn === null || getRowThemeOverrideIn === void 0 ? void 0 : getRowThemeOverrideIn(row, groupIndex, contentIndex);
  });
  if (options === void 0) return {
    rowHeight,
    rows,
    rowNumberMapper: rowNumberMapperOut,
    getRowThemeOverride
  };
  return {
    rowHeight,
    rows: effectiveRows,
    rowNumberMapper: rowNumberMapperOut,
    getRowThemeOverride
  };
}
function useRowGrouping(options, rows) {
  const $ = compilerRuntimeExports.c(7);
  let t0;
  if ($[0] !== options || $[1] !== rows) {
    t0 = options === void 0 ? void 0 : flattenRowGroups(options, rows);
    $[0] = options;
    $[1] = rows;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  const flattenedRowGroups = t0;
  let t1;
  if ($[3] !== flattenedRowGroups) {
    t1 = (itemOrRow) => {
      if (typeof itemOrRow === "number") {
        return mapRowIndexToPath(itemOrRow, flattenedRowGroups);
      }
      const r = mapRowIndexToPath(itemOrRow[1], flattenedRowGroups);
      return {
        ...r,
        originalIndex: [itemOrRow[0], r.originalIndex]
      };
    };
    $[3] = flattenedRowGroups;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  const t2 = t1;
  let t3;
  if ($[5] !== t2) {
    t3 = {
      getRowGroupingForPath,
      updateRowGroupingByPath,
      mapper: t2
    };
    $[5] = t2;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
}
function updateRowGroupingByPath(rowGrouping, path, update) {
  const [index, ...rest] = path;
  if (rest[0] === -1) {
    return rowGrouping.map((group, i) => i === index ? {
      ...group,
      ...update
    } : group);
  }
  return rowGrouping.map((group, i) => {
    var _group$subGroups;
    return i === index ? {
      ...group,
      subGroups: updateRowGroupingByPath((_group$subGroups = group.subGroups) !== null && _group$subGroups !== void 0 ? _group$subGroups : [], rest, update)
    } : group;
  });
}
function getRowGroupingForPath(rowGrouping, path) {
  var _rowGrouping$index$su;
  const [index, ...rest] = path;
  if (rest[0] === -1) {
    return rowGrouping[index];
  }
  return getRowGroupingForPath((_rowGrouping$index$su = rowGrouping[index].subGroups) !== null && _rowGrouping$index$su !== void 0 ? _rowGrouping$index$su : [], rest);
}
function useCallbackRef(initialValue, callback) {
  const [ref] = React.useState(() => ({
    value: initialValue,
    callback,
    facade: {
      get current() {
        return ref.value;
      },
      set current(value) {
        const last = ref.value;
        if (last !== value) {
          ref.value = value;
          ref.callback(value, last);
        }
      }
    }
  }));
  ref.callback = callback;
  return ref.facade;
}
function useInitialScrollOffset(scrollOffsetX, scrollOffsetY, rowHeight, visibleRegionRef, onDidScroll) {
  var _visibleRegionRef$cur, _visibleRegionRef$cur2, _visibleRegion$height, _visibleRegion$width;
  const [visibleRegionY, visibleRegionTy] = [scrollOffsetY !== void 0 && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0, scrollOffsetY !== void 0 && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0];
  const visibleRegionInput = {
    x: visibleRegionRef.current.x,
    y: visibleRegionY,
    width: (_visibleRegionRef$cur = visibleRegionRef.current.width) !== null && _visibleRegionRef$cur !== void 0 ? _visibleRegionRef$cur : 1,
    height: (_visibleRegionRef$cur2 = visibleRegionRef.current.height) !== null && _visibleRegionRef$cur2 !== void 0 ? _visibleRegionRef$cur2 : 1,
    ty: visibleRegionTy
  };
  const [visibleRegion, setVisibleRegion, empty2] = useStateWithReactiveInput(visibleRegionInput);
  const onDidScrollRef = React.useRef(onDidScroll);
  onDidScrollRef.current = onDidScroll;
  const scrollRef = useCallbackRef(null, (newVal) => {
    if (newVal !== null && scrollOffsetY !== void 0) {
      newVal.scrollTop = scrollOffsetY;
    } else if (newVal !== null && scrollOffsetX !== void 0) {
      newVal.scrollLeft = scrollOffsetX;
    }
  });
  const vScrollReady = ((_visibleRegion$height = visibleRegion.height) !== null && _visibleRegion$height !== void 0 ? _visibleRegion$height : 1) > 1;
  React.useLayoutEffect(() => {
    if (scrollOffsetY !== void 0 && scrollRef.current !== null && vScrollReady) {
      if (scrollRef.current.scrollTop === scrollOffsetY) return;
      scrollRef.current.scrollTop = scrollOffsetY;
      if (scrollRef.current.scrollTop !== scrollOffsetY) {
        empty2();
      }
      onDidScrollRef.current();
    }
  }, [scrollOffsetY, vScrollReady, empty2, scrollRef]);
  const hScrollReady = ((_visibleRegion$width = visibleRegion.width) !== null && _visibleRegion$width !== void 0 ? _visibleRegion$width : 1) > 1;
  React.useLayoutEffect(() => {
    if (scrollOffsetX !== void 0 && scrollRef.current !== null && hScrollReady) {
      if (scrollRef.current.scrollLeft === scrollOffsetX) return;
      scrollRef.current.scrollLeft = scrollOffsetX;
      if (scrollRef.current.scrollLeft !== scrollOffsetX) {
        empty2();
      }
      onDidScrollRef.current();
    }
  }, [scrollOffsetX, hScrollReady, empty2, scrollRef]);
  return {
    visibleRegion,
    setVisibleRegion,
    scrollRef
  };
}
const GhostInputBox = /* @__PURE__ */ styled_default("textarea")({
  name: "GhostInputBox",
  class: "gdg-g1m8wxmu",
  propsAsIs: false
});
const GhostInputImpl = (props, ref) => {
  const $ = compilerRuntimeExports.c(23);
  const {
    onInput,
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    disabled: t0
  } = props;
  const disabled = t0 === void 0 ? false : t0;
  const textareaRef = React.useRef(null);
  const isComposingRef = React.useRef(false);
  let t1;
  if ($[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      width: 0,
      height: 0
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const minDimensionsRef = React.useRef(t1);
  let t2;
  if ($[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t2 = () => {
      const el = textareaRef.current;
      if (!el || el.style.opacity === "0") {
        return;
      }
      const minWidth = minDimensionsRef.current.width;
      const minHeight = minDimensionsRef.current.height;
      el.style.width = `${minWidth}px`;
      el.style.height = `${minHeight}px`;
      const newWidth = Math.max(minWidth, el.scrollWidth + 2);
      const newHeight = Math.max(minHeight, el.scrollHeight + 2);
      el.style.width = `${newWidth}px`;
      el.style.height = `${newHeight}px`;
    };
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const autoResize = t2;
  let t3;
  if ($[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t3 = () => ({
      focus: () => {
        var _textareaRef$current;
        (_textareaRef$current = textareaRef.current) === null || _textareaRef$current === void 0 || _textareaRef$current.focus({
          preventScroll: true
        });
      },
      blur: () => {
        var _textareaRef$current2;
        (_textareaRef$current2 = textareaRef.current) === null || _textareaRef$current2 === void 0 || _textareaRef$current2.blur();
      },
      clear: () => {
        if (textareaRef.current) {
          textareaRef.current.value = "";
          textareaRef.current.setSelectionRange(0, 0);
        }
      },
      getValue: () => {
        var _textareaRef$current$, _textareaRef$current3;
        return (_textareaRef$current$ = (_textareaRef$current3 = textareaRef.current) === null || _textareaRef$current3 === void 0 ? void 0 : _textareaRef$current3.value) !== null && _textareaRef$current$ !== void 0 ? _textareaRef$current$ : "";
      },
      setValue: (value) => {
        if (textareaRef.current) {
          textareaRef.current.value = value;
          const len = value.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      },
      setPosition: (x, y, width, height) => {
        const el_0 = textareaRef.current;
        if (el_0) {
          minDimensionsRef.current = {
            width,
            height
          };
          el_0.style.left = `${x}px`;
          el_0.style.top = `${y}px`;
          el_0.style.width = `${width}px`;
          el_0.style.height = `${height}px`;
        }
      },
      setVisible: (visible) => {
        const el_1 = textareaRef.current;
        if (el_1) {
          if (visible) {
            el_1.style.opacity = "1";
            el_1.style.pointerEvents = "auto";
            el_1.style.zIndex = "10000";
          } else {
            el_1.style.left = "-9999px";
            el_1.style.top = "0";
            el_1.style.width = "1px";
            el_1.style.height = "1px";
            el_1.style.opacity = "0";
            el_1.style.pointerEvents = "none";
            el_1.style.zIndex = "0";
          }
        }
      }
    });
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  React.useImperativeHandle(ref, t3);
  let t4;
  if ($[3] !== onInput) {
    t4 = (e) => {
      const target = e.currentTarget;
      onInput(target.value, isComposingRef.current);
      autoResize();
    };
    $[3] = onInput;
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  const handleInput = t4;
  let t5;
  if ($[5] !== onCompositionStart) {
    t5 = () => {
      isComposingRef.current = true;
      onCompositionStart();
    };
    $[5] = onCompositionStart;
    $[6] = t5;
  } else {
    t5 = $[6];
  }
  const handleCompositionStart = t5;
  let t6;
  if ($[7] !== onCompositionEnd) {
    t6 = (e_0) => {
      isComposingRef.current = false;
      onCompositionEnd(e_0.currentTarget.value);
    };
    $[7] = onCompositionEnd;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  const handleCompositionEnd = t6;
  let t7;
  if ($[9] !== onKeyDown) {
    t7 = (e_1) => {
      onKeyDown(e_1);
    };
    $[9] = onKeyDown;
    $[10] = t7;
  } else {
    t7 = $[10];
  }
  const handleKeyDown = t7;
  let t8;
  if ($[11] !== onKeyUp) {
    t8 = (e_2) => {
      onKeyUp === null || onKeyUp === void 0 || onKeyUp(e_2);
    };
    $[11] = onKeyUp;
    $[12] = t8;
  } else {
    t8 = $[12];
  }
  const handleKeyUp = t8;
  const t9 = disabled ? -1 : 0;
  let t10;
  if ($[13] !== disabled || $[14] !== handleCompositionEnd || $[15] !== handleCompositionStart || $[16] !== handleInput || $[17] !== handleKeyDown || $[18] !== handleKeyUp || $[19] !== onBlur || $[20] !== onFocus || $[21] !== t9) {
    t10 = /* @__PURE__ */ jsx(GhostInputBox, { ref: textareaRef, defaultValue: "", tabIndex: t9, disabled, onInput: handleInput, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp, onFocus, onBlur, "aria-label": "Grid input", wrap: "off", rows: 1, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false });
    $[13] = disabled;
    $[14] = handleCompositionEnd;
    $[15] = handleCompositionStart;
    $[16] = handleInput;
    $[17] = handleKeyDown;
    $[18] = handleKeyUp;
    $[19] = onBlur;
    $[20] = onFocus;
    $[21] = t9;
    $[22] = t10;
  } else {
    t10 = $[22];
  }
  return t10;
};
const GhostInput = React.memo(React.forwardRef(GhostInputImpl));
const onGhostCompositionEnd = (_finalValue) => {
};
function useGhostInput(args) {
  const {
    state,
    onKeyDown,
    onFinishEditing,
    onKeyUpIn,
    onCellActivated,
    setIsFocused
  } = args;
  const {
    gridSelection,
    overlayRef,
    ghostInputRef,
    ghostInputVisibleRef,
    gridRef,
    rowMarkerOffset,
    getMangledCellContent,
    reselect
  } = state;
  const onGhostInput = (value, composing) => {
    if (overlayRef.current !== void 0) {
      return;
    }
    if (!composing && value.length > 0 && value.trim().length > 0 && gridSelection.current !== void 0) {
      const [col, row] = gridSelection.current.cell;
      const cell = getMangledCellContent([col, row]);
      if (cell.kind === GridCellKind.Custom) {
        const cellData = cell.data;
        const cellKind = cellData === null || cellData === void 0 ? void 0 : cellData.kind;
        if (cellKind !== "number-cell" && cellKind !== "date-picker-cell") {
          return;
        }
      }
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
        var _gridRef$current;
        const bounds = (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.getBounds(col, row);
        if (bounds !== void 0) {
          const activation = {
            inputType: "keyboard",
            key: value
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activation);
          reselect(bounds, activation, value);
        }
      }
    }
  };
  const onGhostCompositionStart = () => {
    var _overlayRef$current;
    if (gridSelection.current === void 0) return;
    const [col, row] = gridSelection.current.cell;
    const currentOverlayCell = (_overlayRef$current = overlayRef.current) === null || _overlayRef$current === void 0 ? void 0 : _overlayRef$current.cell;
    if (currentOverlayCell !== void 0 && (currentOverlayCell[0] !== col || currentOverlayCell[1] !== row)) {
      var _ghostInputRef$curren, _ghostInputRef$curren2;
      (_ghostInputRef$curren = ghostInputRef.current) === null || _ghostInputRef$curren === void 0 || _ghostInputRef$curren.clear();
      (_ghostInputRef$curren2 = ghostInputRef.current) === null || _ghostInputRef$curren2 === void 0 || _ghostInputRef$curren2.setVisible(false);
      state.setGhostInputVisible(false);
      overlayRef.current = void 0;
      state.setOverlay(void 0);
    }
    if (overlayRef.current === void 0) {
      const cell = getMangledCellContent([col, row]);
      if (cell.kind === GridCellKind.Custom) {
        const cellData = cell.data;
        const cellKind = cellData === null || cellData === void 0 ? void 0 : cellData.kind;
        if (cellKind !== "number-cell" && cellKind !== "date-picker-cell") {
          return;
        }
      }
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
        var _gridRef$current2;
        const bounds = (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.getBounds(col, row);
        if (bounds !== void 0) {
          var _ghostInputRef$curren3;
          (_ghostInputRef$curren3 = ghostInputRef.current) === null || _ghostInputRef$curren3 === void 0 || _ghostInputRef$curren3.clear();
          const activation = {
            inputType: "keyboard",
            key: ""
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activation);
          reselect(bounds, activation, "");
        }
      }
    }
  };
  const onGhostKeyDown = (event) => {
    var _gridSelection$curren, _gridRef$current3;
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (overlayRef.current !== void 0 && ghostInputVisibleRef.current) {
      const key = event.key;
      const cellContent = overlayRef.current.content;
      if (cellContent.kind === GridCellKind.Custom) {
        if (key === "Enter" || key === "Tab" || key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      if (key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(void 0, [0, 0]);
        return;
      }
      if (key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(void 0, [0, 1]);
        return;
      }
      if (key === "Tab") {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(void 0, event.shiftKey ? [-1, 0] : [1, 0]);
        return;
      }
    }
    {
      const key = event.key;
      const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
      if (isPrintable) {
        if (key === " " && gridSelection.current !== void 0) {
          const cell2 = gridSelection.current.cell;
          const cellContent = getMangledCellContent(cell2);
          if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) ;
          else {
            return;
          }
        } else {
          return;
        }
      }
    }
    if (overlayRef.current !== void 0 && ghostInputVisibleRef.current) {
      const key = event.key;
      const isEditingKey = key === "Backspace" || key === "Delete";
      const isCursorKey = key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown" || key === "Home" || key === "End";
      if (isEditingKey || isCursorKey) {
        return;
      }
    }
    const cell = (_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell;
    const bounds = cell !== void 0 ? (_gridRef$current3 = gridRef.current) === null || _gridRef$current3 === void 0 ? void 0 : _gridRef$current3.getBounds(cell[0], cell[1]) : void 0;
    let cancelled = false;
    const gridArgs = {
      bounds,
      cancel: () => {
        cancelled = true;
      },
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location: cell
    };
    onKeyDown(gridArgs);
    if (cancelled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const onGhostKeyUp = (event) => {
    var _gridSelection$curren2, _gridRef$current4;
    const cell = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.cell;
    const bounds = cell !== void 0 ? (_gridRef$current4 = gridRef.current) === null || _gridRef$current4 === void 0 ? void 0 : _gridRef$current4.getBounds(cell[0], cell[1]) : void 0;
    const gridArgs = {
      bounds,
      cancel: () => {
      },
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location: cell
    };
    onKeyUpIn === null || onKeyUpIn === void 0 || onKeyUpIn(gridArgs);
  };
  const onGhostFocus = () => {
    setIsFocused(true);
  };
  const onGhostBlur = () => {
    setIsFocused(false);
  };
  return {
    onGhostInput,
    onGhostCompositionStart,
    onGhostCompositionEnd,
    onGhostKeyDown,
    onGhostKeyUp,
    onGhostFocus,
    onGhostBlur
  };
}
function useMouseHandlers(args) {
  const {
    state,
    mouseState,
    setMouseState,
    fillHighlightRegion,
    setFillHighlightRegion,
    setScrollDir,
    handleSelect,
    onMouseMove,
    onCellClicked,
    onCellActivated,
    onCellContextMenu,
    onHeaderContextMenu,
    onGroupHeaderContextMenu,
    onHeaderClicked,
    onGroupHeaderClicked,
    onColumnResize,
    onFillPattern,
    cellActivationBehavior,
    columnSelect,
    columnSelectionMode,
    columns,
    groupLevels,
    mergedTheme,
    minColumnWidth,
    maxColumnWidth,
    themeForCell,
    getCellsForSelection,
    setSelectedColumns,
    visibleRegion,
    lastMouseSelectLocation
  } = args;
  const {
    gridSelection,
    gridRef,
    visibleRegionRef,
    abortControllerRef,
    rowMarkerOffset,
    mangledCols,
    rows,
    setGridSelection,
    getMangledCellContent,
    mangledOnCellsEdited,
    reselect,
    focus,
    getCellRenderer
  } = state;
  const isActivelyDraggingHeader = React.useRef(false);
  const touchDownArgs = React.useRef(visibleRegion);
  const mouseDownData = React.useRef(void 0);
  const isPrevented = React.useRef(false);
  const onMouseDown = (mouseArgs) => {
    isPrevented.current = false;
    touchDownArgs.current = visibleRegionRef.current;
    if (mouseArgs.button !== 0 && mouseArgs.button !== 1) {
      mouseDownData.current = void 0;
      return;
    }
    const time = performance.now();
    mouseDownData.current = {
      button: mouseArgs.button,
      time,
      location: mouseArgs.location
    };
    if ((mouseArgs === null || mouseArgs === void 0 ? void 0 : mouseArgs.kind) === "header") {
      isActivelyDraggingHeader.current = true;
    }
    const fh = mouseArgs.kind === "cell" && mouseArgs.isFillHandle;
    if (!fh && mouseArgs.kind !== "cell" && mouseArgs.isEdge) return;
    setMouseState({
      previousSelection: gridSelection,
      fillHandle: fh
    });
    lastMouseSelectLocation.current = void 0;
    if (!mouseArgs.isTouch && mouseArgs.button === 0 && !fh) {
      handleSelect(mouseArgs);
    } else if (!mouseArgs.isTouch && mouseArgs.button === 1) {
      lastMouseSelectLocation.current = mouseArgs.location;
    }
  };
  const handleGroupHeaderSelection = (mouseArgs_0) => {
    if (mouseArgs_0.kind !== groupHeaderKind || columnSelect !== "multi") {
      return;
    }
    const isMultiKey = browserIsOSX.value ? mouseArgs_0.metaKey : mouseArgs_0.ctrlKey;
    const [col, row] = mouseArgs_0.location;
    const selectedColumns = gridSelection.columns;
    if (col < rowMarkerOffset) return;
    const needle = mangledCols[col];
    let start = col;
    let end = col;
    const clickedLevel = row <= -2 ? -(row + 2) : 0;
    const compareGroups = (g1, g2) => {
      if (groupLevels > 1) {
        return isGroupEqualAtLevel(g1, g2, clickedLevel, groupLevels);
      }
      return isGroupEqual(g1, g2);
    };
    for (let i = col - 1; i >= rowMarkerOffset; i--) {
      if (!compareGroups(needle.group, mangledCols[i].group)) break;
      start--;
    }
    for (let i_0 = col + 1; i_0 < mangledCols.length; i_0++) {
      if (!compareGroups(needle.group, mangledCols[i_0].group)) break;
      end++;
    }
    focus();
    if (isMultiKey || mouseArgs_0.isTouch || columnSelectionMode === "multi") {
      if (selectedColumns.hasAll([start, end + 1])) {
        let newVal = selectedColumns;
        for (let index = start; index <= end; index++) {
          newVal = newVal.remove(index);
        }
        setSelectedColumns(newVal, void 0, isMultiKey);
      } else {
        setSelectedColumns(void 0, [start, end + 1], isMultiKey);
      }
    } else {
      setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), void 0, isMultiKey);
    }
  };
  const normalSizeColumn = async (col_0) => {
    if (getCellsForSelection !== void 0 && onColumnResize !== void 0) {
      const start_0 = visibleRegionRef.current.y;
      const end_0 = visibleRegionRef.current.height;
      let cells = getCellsForSelection({
        x: col_0,
        y: start_0,
        width: 1,
        height: Math.min(end_0, rows - start_0)
      }, abortControllerRef.current.signal);
      if (typeof cells !== "object") {
        cells = await cells();
      }
      const inputCol = columns[col_0 - rowMarkerOffset];
      const offscreen = document.createElement("canvas");
      const ctx = offscreen.getContext("2d", {
        alpha: false
      });
      if (ctx !== null) {
        ctx.font = mergedTheme.baseFontFull;
        const newCol = measureColumn(ctx, mergedTheme, inputCol, 0, cells, minColumnWidth, maxColumnWidth, false, getCellRenderer);
        onColumnResize === null || onColumnResize === void 0 || onColumnResize(inputCol, newCol.width, col_0, newCol.width);
      }
    }
  };
  const fillPattern = async (previousSelection, currentSelection) => {
    var _previousSelection$cu, _gridRef$current;
    const patternRange = (_previousSelection$cu = previousSelection.current) === null || _previousSelection$cu === void 0 ? void 0 : _previousSelection$cu.range;
    if (patternRange === void 0 || getCellsForSelection === void 0 || currentSelection.current === void 0) {
      return;
    }
    const currentRange = currentSelection.current.range;
    if (onFillPattern !== void 0) {
      let canceled = false;
      onFillPattern({
        fillDestination: {
          ...currentRange,
          x: currentRange.x - rowMarkerOffset
        },
        patternSource: {
          ...patternRange,
          x: patternRange.x - rowMarkerOffset
        },
        preventDefault: () => canceled = true
      });
      if (canceled) return;
    }
    let cells_0 = getCellsForSelection(patternRange, abortControllerRef.current.signal);
    if (typeof cells_0 !== "object") cells_0 = await cells_0();
    const pattern = cells_0;
    const editItemList = [];
    for (let x = 0; x < currentRange.width; x++) {
      for (let y = 0; y < currentRange.height; y++) {
        const cell = [currentRange.x + x, currentRange.y + y];
        if (itemIsInRect(cell, patternRange)) continue;
        const patternCell = pattern[y % patternRange.height][x % patternRange.width];
        if (isInnerOnlyCell(patternCell) || !isReadWriteCell(patternCell)) continue;
        editItemList.push({
          location: cell,
          value: {
            ...patternCell
          }
        });
      }
    }
    mangledOnCellsEdited(editItemList);
    (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage(editItemList.map((c) => ({
      cell: c.location
    })));
  };
  const fillRight = () => {
    if (gridSelection.current === void 0 || gridSelection.current.range.width <= 1) return;
    const firstColSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          width: 1
        }
      }
    };
    void fillPattern(firstColSelection, gridSelection);
  };
  const fillDown = () => {
    if (gridSelection.current === void 0 || gridSelection.current.range.height <= 1) return;
    const firstRowSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          height: 1
        }
      }
    };
    void fillPattern(firstRowSelection, gridSelection);
  };
  const onMouseUp = (mouseArgs_1, isOutside) => {
    var _mouse$previousSelect, _lastMouseSelectLocat;
    const mouse = mouseState;
    setMouseState(void 0);
    setFillHighlightRegion(void 0);
    setScrollDir(void 0);
    isActivelyDraggingHeader.current = false;
    if (isOutside) return;
    if ((mouse === null || mouse === void 0 ? void 0 : mouse.fillHandle) === true && gridSelection.current !== void 0 && ((_mouse$previousSelect = mouse.previousSelection) === null || _mouse$previousSelect === void 0 ? void 0 : _mouse$previousSelect.current) !== void 0) {
      if (fillHighlightRegion === void 0) return;
      const newRange = {
        ...gridSelection,
        current: {
          ...gridSelection.current,
          range: combineRects(mouse.previousSelection.current.range, fillHighlightRegion)
        }
      };
      void fillPattern(mouse.previousSelection, newRange);
      setGridSelection(newRange, true);
      return;
    }
    const [col_1, row_0] = mouseArgs_1.location;
    const [lastMouseDownCol, lastMouseDownRow] = (_lastMouseSelectLocat = lastMouseSelectLocation.current) !== null && _lastMouseSelectLocat !== void 0 ? _lastMouseSelectLocat : [];
    const preventDefault = () => {
      isPrevented.current = true;
    };
    const handleMaybeClick = (a) => {
      const isValidClick = a.isTouch || lastMouseDownCol === col_1 && lastMouseDownRow === row_0;
      if (isValidClick) {
        onCellClicked === null || onCellClicked === void 0 || onCellClicked([col_1 - rowMarkerOffset, row_0], {
          ...a,
          preventDefault
        });
      }
      if (a.button === 1) return !isPrevented.current;
      if (!isPrevented.current) {
        var _c_0$activationBehavi;
        const c_0 = getMangledCellContent(mouseArgs_1.location);
        const r = getCellRenderer(c_0);
        if (r !== void 0 && r.onClick !== void 0 && isValidClick) {
          const newVal_0 = r.onClick({
            ...a,
            cell: c_0,
            posX: a.localEventX,
            posY: a.localEventY,
            bounds: a.bounds,
            theme: themeForCell(c_0, mouseArgs_1.location),
            preventDefault
          });
          if (newVal_0 !== void 0 && !isInnerOnlyCell(newVal_0) && isEditableGridCell(newVal_0)) {
            var _gridRef$current2;
            mangledOnCellsEdited([{
              location: a.location,
              value: newVal_0
            }]);
            (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 || _gridRef$current2.damage([{
              cell: a.location
            }]);
          }
        }
        if (isPrevented.current || gridSelection.current === void 0) return false;
        let shouldActivate = false;
        switch ((_c_0$activationBehavi = c_0.activationBehaviorOverride) !== null && _c_0$activationBehavi !== void 0 ? _c_0$activationBehavi : cellActivationBehavior) {
          case "double-click":
          case "second-click": {
            var _mouse$previousSelect2;
            if ((mouse === null || mouse === void 0 || (_mouse$previousSelect2 = mouse.previousSelection) === null || _mouse$previousSelect2 === void 0 || (_mouse$previousSelect2 = _mouse$previousSelect2.current) === null || _mouse$previousSelect2 === void 0 ? void 0 : _mouse$previousSelect2.cell) === void 0) break;
            const [selectedCol, selectedRow] = gridSelection.current.cell;
            const [prevCol, prevRow] = mouse.previousSelection.current.cell;
            const isClickOnSelected = col_1 === selectedCol && col_1 === prevCol && row_0 === selectedRow && row_0 === prevRow;
            shouldActivate = isClickOnSelected && (a.isDoubleClick === true || cellActivationBehavior === "second-click");
            break;
          }
          case "single-click": {
            shouldActivate = true;
            break;
          }
        }
        if (shouldActivate) {
          var _c_0$activationBehavi2;
          const act = a.isDoubleClick === true ? "double-click" : (_c_0$activationBehavi2 = c_0.activationBehaviorOverride) !== null && _c_0$activationBehavi2 !== void 0 ? _c_0$activationBehavi2 : cellActivationBehavior;
          const activationEvent = {
            inputType: "pointer",
            pointerActivation: act,
            pointerType: a.isTouch ? "touch" : "mouse"
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col_1 - rowMarkerOffset, row_0], activationEvent);
          reselect(a.bounds, activationEvent);
          return true;
        }
      }
      return false;
    };
    const clickLocation = mouseArgs_1.location[0] - rowMarkerOffset;
    if (mouseArgs_1.isTouch) {
      const vr = visibleRegionRef.current;
      const touchVr = touchDownArgs.current;
      if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
        return;
      }
      if (mouseArgs_1.isLongTouch === true) {
        var _gridSelection$curren;
        if (mouseArgs_1.kind === "cell" && itemsAreEqual((_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell, mouseArgs_1.location)) {
          onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([clickLocation, mouseArgs_1.location[1]], {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        } else if (mouseArgs_1.kind === "header" && gridSelection.columns.hasIndex(col_1)) {
          onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        } else if (mouseArgs_1.kind === groupHeaderKind) {
          if (clickLocation < 0) {
            return;
          }
          onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        }
      }
      if (mouseArgs_1.kind === "cell") {
        if (!handleMaybeClick(mouseArgs_1)) {
          handleSelect(mouseArgs_1);
        }
      } else if (mouseArgs_1.kind === groupHeaderKind) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
      } else {
        if (mouseArgs_1.kind === headerKind) {
          onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
        }
        handleSelect(mouseArgs_1);
      }
      return;
    }
    if (mouseArgs_1.kind === "header") {
      if (clickLocation < 0) {
        return;
      }
      if (mouseArgs_1.isEdge) {
        if (mouseArgs_1.isDoubleClick === true) {
          void normalSizeColumn(col_1);
        }
      } else if (mouseArgs_1.button === 0 && col_1 === lastMouseDownCol && row_0 === lastMouseDownRow) {
        onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
      }
    }
    if (mouseArgs_1.kind === groupHeaderKind) {
      if (clickLocation < 0) {
        return;
      }
      if (mouseArgs_1.button === 0 && col_1 === lastMouseDownCol && row_0 === lastMouseDownRow) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
        if (!isPrevented.current) {
          handleGroupHeaderSelection(mouseArgs_1);
        }
      }
    }
    if (mouseArgs_1.kind === "cell" && (mouseArgs_1.button === 0 || mouseArgs_1.button === 1)) {
      handleMaybeClick(mouseArgs_1);
    }
    lastMouseSelectLocation.current = void 0;
  };
  const onMouseMoveImpl = (mouseArgs_2) => {
    const a_0 = {
      ...mouseArgs_2,
      location: [mouseArgs_2.location[0] - rowMarkerOffset, mouseArgs_2.location[1]]
    };
    onMouseMove === null || onMouseMove === void 0 || onMouseMove(a_0);
    if (mouseState !== void 0 && mouseArgs_2.buttons === 0) {
      setMouseState(void 0);
      setFillHighlightRegion(void 0);
      setScrollDir(void 0);
      isActivelyDraggingHeader.current = false;
    }
    setScrollDir((cv) => {
      var _mouseDownData$curren, _mouseDownData$curren2;
      if (isActivelyDraggingHeader.current) return [mouseArgs_2.scrollEdge[0], 0];
      if (mouseArgs_2.scrollEdge[0] === (cv === null || cv === void 0 ? void 0 : cv[0]) && mouseArgs_2.scrollEdge[1] === cv[1]) return cv;
      return mouseState === void 0 || ((_mouseDownData$curren = (_mouseDownData$curren2 = mouseDownData.current) === null || _mouseDownData$curren2 === void 0 ? void 0 : _mouseDownData$curren2.location[0]) !== null && _mouseDownData$curren !== void 0 ? _mouseDownData$curren : 0) < rowMarkerOffset ? void 0 : mouseArgs_2.scrollEdge;
    });
  };
  return {
    onMouseDown,
    onMouseUp,
    onMouseMoveImpl,
    handleGroupHeaderSelection,
    normalSizeColumn,
    fillDown,
    fillRight,
    mouseDownData,
    isActivelyDraggingHeader
  };
}
const DataGridOverlayEditor = React.lazy(async () => await Promise.resolve().then(() => dataGridOverlayEditor));
let idCounter = 0;
function getSpanStops(cells) {
  return uniq(flatten(flatten(cells).filter((c) => c.span !== void 0).map((c) => {
    var _c$span$, _c$span, _c$span$2, _c$span2;
    return range(((_c$span$ = (_c$span = c.span) === null || _c$span === void 0 ? void 0 : _c$span[0]) !== null && _c$span$ !== void 0 ? _c$span$ : 0) + 1, ((_c$span$2 = (_c$span2 = c.span) === null || _c$span2 === void 0 ? void 0 : _c$span2[1]) !== null && _c$span$2 !== void 0 ? _c$span$2 : 0) + 1);
  })));
}
function shiftSelection(input, offset) {
  if (input === void 0 || offset === 0 || input.columns.length === 0 && input.current === void 0) return input;
  return {
    current: input.current === void 0 ? void 0 : {
      cell: [input.current.cell[0] + offset, input.current.cell[1]],
      range: {
        ...input.current.range,
        x: input.current.range.x + offset
      },
      rangeStack: input.current.rangeStack.map((r) => ({
        ...r,
        x: r.x + offset
      }))
    },
    rows: input.rows,
    columns: input.columns.offset(offset)
  };
}
const loadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
const emptyGridSelection = {
  columns: CompactSelection.empty(),
  rows: CompactSelection.empty(),
  current: void 0
};
const DataEditorImpl = (p2, forwardedRef) => {
  var _rowMarkersObj$rowNum, _ref, _rowMarkersObj$kind, _rowMarkersObj$width, _ref2, _rowMarkersObj$startI, _rowMarkersObj$theme, _rowMarkersObj$checkb, _rowMarkersObj$rowSta, _rowMarkersObj$rowSta2, _rowMarkersObj$rowId, _rowMarkersObj$rowIdW, _gridSelection$curren, _gridSelection$curren5, _gridSelectionOuter$c, _gridSelectionOuter$c2;
  const [gridSelectionInner, setGridSelectionInner] = React.useState(emptyGridSelection);
  const [overlay, setOverlay] = React.useState();
  const searchInputRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [mouseState, setMouseState] = React.useState();
  const [scrollDir, setScrollDir] = React.useState();
  const lastSent = React.useRef(void 0);
  const ghostInputRef = React.useRef(null);
  const [ghostInputVisible, setGhostInputVisible] = React.useState(false);
  const ghostInputVisibleRef = React.useRef(ghostInputVisible);
  ghostInputVisibleRef.current = ghostInputVisible;
  const overlayRef = React.useRef(overlay);
  overlayRef.current = overlay;
  const safeWindow = typeof window === "undefined" ? null : window;
  const {
    imageEditorOverride,
    getRowThemeOverride: getRowThemeOverrideIn,
    markdownDivCreateNode,
    width,
    height,
    columns: columnsIn,
    rows: rowsIn,
    getCellContent,
    onCellClicked,
    onCellActivated,
    onFillPattern,
    onFinishedEditing,
    coercePasteValue,
    drawHeader: drawHeaderIn,
    drawCell: drawCellIn,
    editorBloom,
    onHeaderClicked,
    onColumnProposeMove,
    rangeSelectionColumnSpanning = true,
    spanRangeBehavior = "default",
    onGroupHeaderClicked,
    onCellContextMenu,
    className,
    onHeaderContextMenu,
    getCellsForSelection: getCellsForSelectionIn,
    onGroupHeaderContextMenu,
    onGroupHeaderRenamed,
    onCellEdited,
    onCellsEdited,
    onSearchResultsChanged: onSearchResultsChangedIn,
    searchResults,
    onSearchValueChange,
    searchValue,
    onKeyDown: onKeyDownIn,
    onKeyUp: onKeyUpIn,
    keybindings: keybindingsIn,
    editOnType = true,
    onRowAppended,
    onColumnAppended,
    onColumnMoved,
    validateCell: validateCellIn,
    highlightRegions: highlightRegionsIn,
    rangeSelect = "rect",
    columnSelect = "multi",
    rowSelect = "multi",
    rangeSelectionBlending = "exclusive",
    columnSelectionBlending = "exclusive",
    rowSelectionBlending = "exclusive",
    onDelete: onDeleteIn,
    onDragStart,
    onMouseMove,
    onPaste,
    copyHeaders = false,
    freezeColumns = 0,
    cellActivationBehavior = "second-click",
    rowSelectionMode = "auto",
    columnSelectionMode = "auto",
    onHeaderMenuClick,
    onHeaderIndicatorClick,
    getGroupDetails,
    rowGrouping,
    onSearchClose: onSearchCloseIn,
    onItemHovered,
    onSelectionCleared,
    showSearch: showSearchIn,
    onVisibleRegionChanged,
    gridSelection: gridSelectionOuter,
    onGridSelectionChange,
    minColumnWidth: minColumnWidthIn = 50,
    maxColumnWidth: maxColumnWidthIn = 500,
    maxColumnAutoWidth: maxColumnAutoWidthIn,
    provideEditor,
    trailingRowOptions,
    freezeTrailingRows = 0,
    allowedFillDirections = "orthogonal",
    scrollOffsetX,
    scrollOffsetY,
    verticalBorder,
    onDragOverCell,
    onDrop,
    onColumnResize: onColumnResizeIn,
    onColumnResizeEnd: onColumnResizeEndIn,
    onColumnResizeStart: onColumnResizeStartIn,
    customRenderers: additionalRenderers,
    fillHandle,
    experimental,
    fixedShadowX,
    fixedShadowY,
    headerIcons,
    imageWindowLoader,
    initialSize,
    isDraggable,
    onDragLeave,
    onRowMoved,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    preventDiagonalScrolling,
    rightElement,
    rightElementProps,
    trapFocus = false,
    smoothScrollX,
    smoothScrollY,
    scaleToRem = false,
    rowHeight: rowHeightIn = 34,
    headerHeight: headerHeightIn = 36,
    groupHeaderHeight: groupHeaderHeightIn = headerHeightIn,
    theme: themeIn,
    isOutsideClick,
    renderers,
    resizeIndicator,
    scrollToActiveCell = true,
    drawFocusRing: drawFocusRingIn = true,
    portalElementRef,
    onRowStatus,
    onRowId
  } = p2;
  const drawFocusRing = drawFocusRingIn === "no-editor" ? overlay === void 0 : drawFocusRingIn;
  const rowMarkersObj = typeof p2.rowMarkers === "string" ? void 0 : p2.rowMarkers;
  const rowNumberOption = (_rowMarkersObj$rowNum = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowNumber) !== null && _rowMarkersObj$rowNum !== void 0 ? _rowMarkersObj$rowNum : false;
  let normalizedKind = (_ref = (_rowMarkersObj$kind = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.kind) !== null && _rowMarkersObj$kind !== void 0 ? _rowMarkersObj$kind : p2.rowMarkers) !== null && _ref !== void 0 ? _ref : "none";
  let showRowNumber = rowNumberOption;
  if (normalizedKind === "both" || normalizedKind === "checkbox-and-number") {
    normalizedKind = "checkbox";
    showRowNumber = true;
  }
  const rowMarkers = normalizedKind;
  const rowMarkerWidthRaw = (_rowMarkersObj$width = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.width) !== null && _rowMarkersObj$width !== void 0 ? _rowMarkersObj$width : p2.rowMarkerWidth;
  const rowMarkerStartIndex = (_ref2 = (_rowMarkersObj$startI = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.startIndex) !== null && _rowMarkersObj$startI !== void 0 ? _rowMarkersObj$startI : p2.rowMarkerStartIndex) !== null && _ref2 !== void 0 ? _ref2 : 1;
  const rowMarkerTheme = (_rowMarkersObj$theme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.theme) !== null && _rowMarkersObj$theme !== void 0 ? _rowMarkersObj$theme : p2.rowMarkerTheme;
  const headerRowMarkerTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerTheme;
  const headerRowMarkerAlwaysVisible = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerAlwaysVisible;
  const headerRowMarkerDisabled = rowSelect !== "multi" || (rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerDisabled) === true;
  const rowMarkerCheckboxStyle = (_rowMarkersObj$checkb = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.checkboxStyle) !== null && _rowMarkersObj$checkb !== void 0 ? _rowMarkersObj$checkb : "square";
  const rowStatusOption = (_rowMarkersObj$rowSta = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatus) !== null && _rowMarkersObj$rowSta !== void 0 ? _rowMarkersObj$rowSta : false;
  const rowStatusWidth = (_rowMarkersObj$rowSta2 = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatusWidth) !== null && _rowMarkersObj$rowSta2 !== void 0 ? _rowMarkersObj$rowSta2 : 40;
  const rowStatusTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatusTheme;
  const rowIdOption = (_rowMarkersObj$rowId = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowId) !== null && _rowMarkersObj$rowId !== void 0 ? _rowMarkersObj$rowId : false;
  const rowIdWidth = (_rowMarkersObj$rowIdW = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowIdWidth) !== null && _rowMarkersObj$rowIdW !== void 0 ? _rowMarkersObj$rowIdW : 80;
  const rowIdTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowIdTheme;
  const minColumnWidth = Math.max(minColumnWidthIn, 20);
  const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
  const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn !== null && maxColumnAutoWidthIn !== void 0 ? maxColumnAutoWidthIn : maxColumnWidth, minColumnWidth);
  const docStyle = (() => {
    if (typeof window === "undefined") return {
      fontSize: "16px"
    };
    return window.getComputedStyle(document.documentElement);
  })();
  const {
    rows,
    rowNumberMapper,
    rowHeight: rowHeightPostGrouping,
    getRowThemeOverride
  } = useRowGroupingInner(rowGrouping, rowsIn, rowHeightIn, getRowThemeOverrideIn);
  const remSize = Number.parseFloat(docStyle.fontSize);
  const {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  } = useRemAdjuster({
    groupHeaderHeight: groupHeaderHeightIn,
    headerHeight: headerHeightIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    remSize,
    rowHeight: rowHeightPostGrouping,
    scaleToRem,
    theme: themeIn
  });
  const keybindings = useKeybindingsWithDefaults(keybindingsIn);
  const rowMarkerWidth = rowMarkerWidthRaw !== null && rowMarkerWidthRaw !== void 0 ? rowMarkerWidthRaw : rowsIn > 1e4 ? 48 : rowsIn > 1e3 ? 44 : rowsIn > 100 ? 36 : 32;
  const hasRowMarkers = rowMarkers !== "none";
  const hasRowStatus = rowStatusOption === true;
  const hasRowId = rowIdOption === true;
  const rowMarkerOffset = (hasRowMarkers ? showRowNumber ? 2 : 1 : 0) + (hasRowStatus ? 1 : 0) + (hasRowId ? 1 : 0);
  const totalMarkerWidth = (hasRowMarkers ? (showRowNumber ? 2 : 1) * rowMarkerWidth : 0) + (hasRowStatus ? rowStatusWidth : 0) + (hasRowId ? rowIdWidth : 0);
  const showTrailingBlankRow = trailingRowOptions !== void 0;
  const lastRowSticky = (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true;
  const [showSearchInner, setShowSearchInner] = React.useState(false);
  const showSearch = showSearchIn !== null && showSearchIn !== void 0 ? showSearchIn : showSearchInner;
  const onSearchClose = () => {
    if (onSearchCloseIn !== void 0) {
      onSearchCloseIn();
    } else {
      setShowSearchInner(false);
    }
  };
  const gridSelectionOuterMangled = gridSelectionOuter === void 0 ? void 0 : shiftSelection(gridSelectionOuter, rowMarkerOffset);
  const gridSelection = gridSelectionOuterMangled !== null && gridSelectionOuterMangled !== void 0 ? gridSelectionOuterMangled : gridSelectionInner;
  const abortControllerRef = React.useRef(new AbortController());
  React.useEffect(() => () => abortControllerRef === null || abortControllerRef === void 0 ? void 0 : abortControllerRef.current.abort(), []);
  const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortControllerRef.current, rows);
  const validateCell = (cell, newValue, prevValue) => {
    if (validateCellIn === void 0) return true;
    const item = [cell[0] - rowMarkerOffset, cell[1]];
    return validateCellIn === null || validateCellIn === void 0 ? void 0 : validateCellIn(item, newValue, prevValue);
  };
  const expectedExternalGridSelection = React.useRef(gridSelectionOuter);
  const setGridSelection = (newVal, expand) => {
    if (expand) {
      newVal = expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortControllerRef.current);
    }
    if (onGridSelectionChange !== void 0) {
      expectedExternalGridSelection.current = shiftSelection(newVal, -rowMarkerOffset);
      onGridSelectionChange(expectedExternalGridSelection.current);
    } else {
      setGridSelectionInner(newVal);
    }
  };
  const onColumnResize = whenDefined(onColumnResizeIn, ((_2, w2, ind, wg) => {
    onColumnResizeIn === null || onColumnResizeIn === void 0 || onColumnResizeIn(columnsIn[ind - rowMarkerOffset], w2, ind - rowMarkerOffset, wg);
  }));
  const onColumnResizeEnd = whenDefined(onColumnResizeEndIn, ((_2, w2, ind, wg) => {
    onColumnResizeEndIn === null || onColumnResizeEndIn === void 0 || onColumnResizeEndIn(columnsIn[ind - rowMarkerOffset], w2, ind - rowMarkerOffset, wg);
  }));
  const onColumnResizeStart = whenDefined(onColumnResizeStartIn, ((_2, w2, ind, wg) => {
    onColumnResizeStartIn === null || onColumnResizeStartIn === void 0 || onColumnResizeStartIn(columnsIn[ind - rowMarkerOffset], w2, ind - rowMarkerOffset, wg);
  }));
  const drawHeader2 = whenDefined(drawHeaderIn, ((args, draw) => {
    var _drawHeaderIn;
    return (_drawHeaderIn = drawHeaderIn === null || drawHeaderIn === void 0 ? void 0 : drawHeaderIn({
      ...args,
      columnIndex: args.columnIndex - rowMarkerOffset
    }, draw)) !== null && _drawHeaderIn !== void 0 ? _drawHeaderIn : false;
  }));
  const drawCell2 = whenDefined(drawCellIn, ((args, draw) => {
    var _drawCellIn;
    return (_drawCellIn = drawCellIn === null || drawCellIn === void 0 ? void 0 : drawCellIn({
      ...args,
      col: args.col - rowMarkerOffset
    }, draw)) !== null && _drawCellIn !== void 0 ? _drawCellIn : false;
  }));
  const onDelete = (sel) => {
    if (onDeleteIn !== void 0) {
      const result = onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
      if (typeof result === "boolean") {
        return result;
      }
      return shiftSelection(result, rowMarkerOffset);
    }
    return true;
  };
  const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(gridSelection, setGridSelection, rangeSelectionBlending, columnSelectionBlending, rowSelectionBlending, rangeSelect, rangeSelectionColumnSpanning);
  const mergedTheme = mergeAndRealizeTheme(getDataEditorTheme(), theme);
  const [clientSize, setClientSize] = React.useState([0, 0, 0]);
  const rendererMap = (() => {
    if (renderers === void 0) return {};
    const result = {};
    for (const r of renderers) {
      result[r.kind] = r;
    }
    return result;
  })();
  const getCellRenderer = (cell) => {
    if (cell.kind !== GridCellKind.Custom) {
      return rendererMap[cell.kind];
    }
    return additionalRenderers === null || additionalRenderers === void 0 ? void 0 : additionalRenderers.find((x) => x.isMatch(cell));
  };
  let {
    sizedColumns: columns,
    nonGrowWidth
  } = useColumnSizer(columnsIn, rows, getCellsForSeletionDirect, clientSize[0] - totalMarkerWidth - clientSize[2], minColumnWidth, maxColumnAutoWidth, mergedTheme, getCellRenderer, abortControllerRef.current);
  nonGrowWidth += totalMarkerWidth;
  const groupLevels = (() => {
    let maxLevel = 0;
    for (const col of columns) {
      if (col.group === void 0) continue;
      if (typeof col.group === "string") {
        maxLevel = Math.max(maxLevel, 1);
      } else {
        maxLevel = Math.max(maxLevel, col.group.length);
      }
    }
    return maxLevel;
  })();
  const enableGroups = groupLevels > 0;
  const groupHeaderHeights = groupLevels === 0 ? [] : Array(groupLevels).fill(groupHeaderHeight);
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b2) => a + b2, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const numSelectedRows = gridSelection.rows.length;
  const rowMarkerChecked = rowMarkers === "none" ? void 0 : numSelectedRows === 0 ? false : numSelectedRows === rows ? true : void 0;
  const mangledCols = (() => {
    const markerColumns = [];
    if (rowMarkers !== "none") {
      if (showRowNumber) {
        markerColumns.push({
          title: "",
          width: rowMarkerWidth,
          icon: void 0,
          hasMenu: false,
          style: "normal",
          themeOverride: rowMarkerTheme,
          rowMarker: rowMarkerCheckboxStyle,
          rowMarkerChecked: false,
          headerRowMarkerTheme,
          headerRowMarkerAlwaysVisible: false,
          headerRowMarkerDisabled: true
        });
      }
      markerColumns.push({
        title: "",
        width: rowMarkerWidth,
        icon: void 0,
        hasMenu: false,
        style: "normal",
        themeOverride: rowMarkerTheme,
        rowMarker: rowMarkerCheckboxStyle,
        rowMarkerChecked,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled
      });
    }
    if (hasRowStatus) {
      markerColumns.push({
        title: "",
        width: rowStatusWidth,
        icon: void 0,
        hasMenu: false,
        style: "normal",
        themeOverride: rowStatusTheme
      });
    }
    if (hasRowId) {
      markerColumns.push({
        title: "ID",
        width: rowIdWidth,
        icon: void 0,
        hasMenu: false,
        style: "normal",
        themeOverride: rowIdTheme
      });
    }
    return [...markerColumns, ...columns];
  })();
  const visibleRegionRef = React.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  });
  const hasJustScrolled = React.useRef(false);
  const {
    setVisibleRegion,
    visibleRegion,
    scrollRef
  } = useInitialScrollOffset(scrollOffsetX, scrollOffsetY, rowHeight, visibleRegionRef, () => hasJustScrolled.current = true);
  visibleRegionRef.current = visibleRegion;
  const cellXOffset = visibleRegion.x + rowMarkerOffset;
  const cellYOffset = visibleRegion.y;
  const gridRef = React.useRef(null);
  const focus = (immediate) => {
    if (immediate === true) {
      var _ghostInputRef$curren;
      (_ghostInputRef$curren = ghostInputRef.current) === null || _ghostInputRef$curren === void 0 || _ghostInputRef$curren.focus();
    } else {
      window.requestAnimationFrame(() => {
        var _ghostInputRef$curren2;
        (_ghostInputRef$curren2 = ghostInputRef.current) === null || _ghostInputRef$curren2 === void 0 || _ghostInputRef$curren2.focus();
      });
    }
  };
  const mangledRows = showTrailingBlankRow ? rows + 1 : rows;
  const mangledOnCellsEdited = (items) => {
    const mangledItems = rowMarkerOffset === 0 ? items : items.map((x) => ({
      ...x,
      location: [x.location[0] - rowMarkerOffset, x.location[1]]
    }));
    const r = onCellsEdited === null || onCellsEdited === void 0 ? void 0 : onCellsEdited(mangledItems);
    if (r !== true) {
      for (const i of mangledItems) {
        onCellEdited === null || onCellEdited === void 0 || onCellEdited(i.location, i.value);
      }
    }
    return r;
  };
  const [fillHighlightRegion, setFillHighlightRegion] = React.useState();
  const highlightRange = gridSelection.current !== void 0 && gridSelection.current.range.width * gridSelection.current.range.height > 1 ? gridSelection.current.range : void 0;
  const highlightFocus = drawFocusRing ? (_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell : void 0;
  const highlightFocusCol = highlightFocus === null || highlightFocus === void 0 ? void 0 : highlightFocus[0];
  const highlightFocusRow = highlightFocus === null || highlightFocus === void 0 ? void 0 : highlightFocus[1];
  const highlightRegions = ((_ref3, _ref4) => {
    if ((highlightRegionsIn === void 0 || highlightRegionsIn.length === 0) && ((_ref3 = (_ref4 = highlightRange !== null && highlightRange !== void 0 ? highlightRange : highlightFocusCol) !== null && _ref4 !== void 0 ? _ref4 : highlightFocusRow) !== null && _ref3 !== void 0 ? _ref3 : fillHighlightRegion) === void 0) return void 0;
    const regions = [];
    if (highlightRegionsIn !== void 0) {
      for (const r of highlightRegionsIn) {
        const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
        if (maxWidth > 0) {
          regions.push({
            color: r.color,
            range: {
              ...r.range,
              x: r.range.x + rowMarkerOffset,
              width: Math.min(maxWidth, r.range.width)
            },
            style: r.style
          });
        }
      }
    }
    if (fillHighlightRegion !== void 0) {
      regions.push({
        color: withAlpha(mergedTheme.accentColor, 0),
        range: fillHighlightRegion,
        style: "dashed"
      });
    }
    if (highlightRange !== void 0) {
      regions.push({
        color: withAlpha(mergedTheme.accentColor, 0.5),
        range: highlightRange,
        style: "solid-outline"
      });
    }
    if (highlightFocusCol !== void 0 && highlightFocusRow !== void 0) {
      regions.push({
        color: mergedTheme.accentColor,
        range: {
          x: highlightFocusCol,
          y: highlightFocusRow,
          width: 1,
          height: 1
        },
        style: "solid-outline"
      });
    }
    return regions.length > 0 ? regions : void 0;
  })();
  const mangledColsRef = React.useRef(mangledCols);
  mangledColsRef.current = mangledCols;
  const getMangledCellContent = function(_ref5) {
    let [col, row] = _ref5;
    let forceStrict = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
    let currentColIndex = 0;
    let rowNumberColIndex = -1;
    let checkboxColIndex = -1;
    let rowStatusColIndex = -1;
    let rowIdColIndex = -1;
    if (hasRowMarkers && showRowNumber) {
      rowNumberColIndex = currentColIndex++;
    }
    if (hasRowMarkers) {
      checkboxColIndex = currentColIndex++;
    }
    if (hasRowStatus) {
      rowStatusColIndex = currentColIndex++;
    }
    if (hasRowId) {
      rowIdColIndex = currentColIndex++;
    }
    if (col === rowNumberColIndex) {
      var _p$disabledRows;
      if (isTrailing) {
        return loadingCell;
      }
      const mappedRow = rowNumberMapper(row);
      if (mappedRow === void 0) return loadingCell;
      return {
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        checkboxStyle: rowMarkerCheckboxStyle,
        checked: false,
        markerKind: "number",
        row: rowMarkerStartIndex + mappedRow,
        drawHandle: false,
        cursor: void 0,
        disabled: ((_p$disabledRows = p2.disabledRows) === null || _p$disabledRows === void 0 ? void 0 : _p$disabledRows.call(p2, row)) === true
      };
    }
    if (col === checkboxColIndex) {
      var _p$disabledRows2;
      if (isTrailing) {
        return loadingCell;
      }
      const mappedRow = rowNumberMapper(row);
      if (mappedRow === void 0) return loadingCell;
      let markerKind;
      if (showRowNumber) {
        markerKind = rowMarkers === "checkbox-visible" ? "checkbox-visible" : "checkbox";
      } else if (rowMarkers === "clickable-number") {
        markerKind = "number";
      } else {
        markerKind = rowMarkers;
      }
      return {
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        checkboxStyle: rowMarkerCheckboxStyle,
        checked: (gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.rows.hasIndex(row)) === true,
        markerKind,
        row: rowMarkerStartIndex + mappedRow,
        drawHandle: onRowMoved !== void 0,
        cursor: showRowNumber ? void 0 : rowMarkers === "clickable-number" ? "pointer" : void 0,
        disabled: ((_p$disabledRows2 = p2.disabledRows) === null || _p$disabledRows2 === void 0 ? void 0 : _p$disabledRows2.call(p2, row)) === true
      };
    }
    if (col === rowStatusColIndex) {
      if (isTrailing) {
        return loadingCell;
      }
      const status = onRowStatus === null || onRowStatus === void 0 ? void 0 : onRowStatus(row);
      return {
        kind: InnerGridCellKind.RowStatus,
        allowOverlay: false,
        status,
        themeOverride: rowStatusTheme
      };
    }
    if (col === rowIdColIndex) {
      if (isTrailing) {
        return loadingCell;
      }
      const rowId = onRowId === null || onRowId === void 0 ? void 0 : onRowId(row);
      return {
        kind: InnerGridCellKind.RowId,
        allowOverlay: false,
        rowId,
        themeOverride: rowIdTheme
      };
    }
    if (isTrailing) {
      var _trailingRowOptions$h, _c$trailingRowOptions;
      const isFirst = col === rowMarkerOffset;
      const maybeFirstColumnHint = isFirst ? (_trailingRowOptions$h = trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.hint) !== null && _trailingRowOptions$h !== void 0 ? _trailingRowOptions$h : "" : "";
      const c = mangledColsRef.current[col];
      if ((c === null || c === void 0 || (_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.disabled) === true) {
        return loadingCell;
      } else {
        var _c$trailingRowOptions2, _c$trailingRowOptions3, _c$trailingRowOptions4, _c$trailingRowOptions5;
        const hint = (_c$trailingRowOptions2 = c === null || c === void 0 || (_c$trailingRowOptions3 = c.trailingRowOptions) === null || _c$trailingRowOptions3 === void 0 ? void 0 : _c$trailingRowOptions3.hint) !== null && _c$trailingRowOptions2 !== void 0 ? _c$trailingRowOptions2 : maybeFirstColumnHint;
        const icon = (_c$trailingRowOptions4 = c === null || c === void 0 || (_c$trailingRowOptions5 = c.trailingRowOptions) === null || _c$trailingRowOptions5 === void 0 ? void 0 : _c$trailingRowOptions5.addIcon) !== null && _c$trailingRowOptions4 !== void 0 ? _c$trailingRowOptions4 : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.addIcon;
        return {
          kind: InnerGridCellKind.NewRow,
          hint,
          allowOverlay: false,
          icon
        };
      }
    } else {
      const outerCol = col - rowMarkerOffset;
      if (forceStrict || (experimental === null || experimental === void 0 ? void 0 : experimental.strict) === true) {
        var _vr$extras, _vr$extras2, _vr$extras3;
        const vr = visibleRegionRef.current;
        const isOutsideMainArea = vr.x > outerCol || outerCol > vr.x + vr.width || vr.y > row || row > vr.y + vr.height || row >= rowsRef.current;
        const isSelected = outerCol === ((_vr$extras = vr.extras) === null || _vr$extras === void 0 || (_vr$extras = _vr$extras.selected) === null || _vr$extras === void 0 ? void 0 : _vr$extras[0]) && row === ((_vr$extras2 = vr.extras) === null || _vr$extras2 === void 0 ? void 0 : _vr$extras2.selected[1]);
        let isInFreezeArea = false;
        if (((_vr$extras3 = vr.extras) === null || _vr$extras3 === void 0 ? void 0 : _vr$extras3.freezeRegions) !== void 0) {
          for (const fr of vr.extras.freezeRegions) {
            if (pointInRect(fr, outerCol, row)) {
              isInFreezeArea = true;
              break;
            }
          }
        }
        if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
          return loadingCell;
        }
      }
      let result = getCellContent([outerCol, row]);
      if (rowMarkerOffset !== 0 && result.span !== void 0) {
        result = {
          ...result,
          span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset]
        };
      }
      return result;
    }
  };
  const mangledGetGroupDetails = (group) => {
    var _getGroupDetails;
    let result = (_getGroupDetails = getGroupDetails === null || getGroupDetails === void 0 ? void 0 : getGroupDetails(group)) !== null && _getGroupDetails !== void 0 ? _getGroupDetails : {
      name: group
    };
    if (onGroupHeaderRenamed !== void 0 && group !== "") {
      var _result$actions;
      result = {
        icon: result.icon,
        name: result.name,
        overrideTheme: result.overrideTheme,
        actions: [...(_result$actions = result.actions) !== null && _result$actions !== void 0 ? _result$actions : [], {
          title: "Rename",
          icon: "renameIcon",
          onClick: (e) => setRenameGroup({
            group: result.name,
            bounds: e.bounds
          })
        }]
      };
    }
    return result;
  };
  const setOverlaySimple = (val) => {
    var _mangledGetGroupDetai;
    const [col, row] = val.cell;
    const column = mangledCols[col];
    const groupTheme = (column === null || column === void 0 ? void 0 : column.group) !== void 0 ? (_mangledGetGroupDetai = mangledGetGroupDetails(column.group)) === null || _mangledGetGroupDetai === void 0 ? void 0 : _mangledGetGroupDetai.overrideTheme : void 0;
    const colTheme = column === null || column === void 0 ? void 0 : column.themeOverride;
    const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
    setOverlay({
      ...val,
      theme: mergeAndRealizeTheme(mergedTheme, groupTheme, colTheme, rowTheme, val.content.themeOverride)
    });
  };
  const reselect = (bounds, activation, initialValue) => {
    if (gridSelection.current === void 0) return;
    const [col, row] = gridSelection.current.cell;
    const c = getMangledCellContent([col, row]);
    if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
      let content = c;
      if (initialValue !== void 0) {
        switch (content.kind) {
          case GridCellKind.Number: {
            const d2 = maybe(() => initialValue === "-" ? -0 : Number.parseFloat(initialValue), 0);
            content = {
              ...content,
              data: Number.isNaN(d2) ? 0 : d2
            };
            break;
          }
          case GridCellKind.Text:
          case GridCellKind.Markdown:
          case GridCellKind.Uri:
            content = {
              ...content,
              data: initialValue
            };
            break;
        }
      }
      setOverlaySimple({
        target: bounds,
        content,
        initialValue,
        cell: [col, row],
        highlight: initialValue === void 0,
        forceEditMode: initialValue !== void 0,
        activation
      });
      const isCustomCell = content.kind === GridCellKind.Custom;
      const useGhostMode = initialValue !== void 0 && !isCustomCell;
      if (useGhostMode) {
        var _ghostInputRef$curren3, _ghostInputRef$curren5;
        (_ghostInputRef$curren3 = ghostInputRef.current) === null || _ghostInputRef$curren3 === void 0 || _ghostInputRef$curren3.setPosition(bounds.x, bounds.y, bounds.width, bounds.height);
        if (initialValue.length > 0) {
          var _ghostInputRef$curren4;
          (_ghostInputRef$curren4 = ghostInputRef.current) === null || _ghostInputRef$curren4 === void 0 || _ghostInputRef$curren4.setValue(initialValue);
        }
        (_ghostInputRef$curren5 = ghostInputRef.current) === null || _ghostInputRef$curren5 === void 0 || _ghostInputRef$curren5.setVisible(true);
        setGhostInputVisible(true);
      } else if (isCustomCell && initialValue !== void 0) {
        var _ghostInputRef$curren6, _ghostInputRef$curren7, _ghostInputRef$curren8;
        (_ghostInputRef$curren6 = ghostInputRef.current) === null || _ghostInputRef$curren6 === void 0 || _ghostInputRef$curren6.clear();
        (_ghostInputRef$curren7 = ghostInputRef.current) === null || _ghostInputRef$curren7 === void 0 || _ghostInputRef$curren7.setVisible(false);
        (_ghostInputRef$curren8 = ghostInputRef.current) === null || _ghostInputRef$curren8 === void 0 || _ghostInputRef$curren8.blur();
        setGhostInputVisible(false);
      }
    } else if (c.kind === GridCellKind.Boolean && activation.inputType === "keyboard" && c.readonly !== true) {
      var _gridRef$current;
      mangledOnCellsEdited([{
        location: gridSelection.current.cell,
        value: {
          ...c,
          data: toggleBoolean(c.data)
        }
      }]);
      (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage([{
        cell: gridSelection.current.cell
      }]);
    }
  };
  const focusOnRowFromTrailingBlankRow = (col, row) => {
    var _gridRef$current2;
    const bounds = (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.getBounds(col, row);
    if (bounds === void 0 || scrollRef.current === null) {
      return;
    }
    const content = getMangledCellContent([col, row]);
    if (!content.allowOverlay) {
      return;
    }
    setOverlaySimple({
      target: bounds,
      content,
      initialValue: void 0,
      highlight: true,
      cell: [col, row],
      forceEditMode: true,
      activation: {
        inputType: "keyboard",
        key: "Enter"
      }
    });
  };
  const scrollTo = function(col, row) {
    let dir = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "both";
    let paddingX = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    let paddingY = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    let options = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : void 0;
    if (scrollRef.current !== null) {
      const grid = gridRef.current;
      const canvas = canvasRef.current;
      const trueCol = typeof col !== "number" ? col.unit === "cell" ? col.amount : void 0 : col;
      const trueRow = typeof row !== "number" ? row.unit === "cell" ? row.amount : void 0 : row;
      const desiredX = typeof col !== "number" && col.unit === "px" ? col.amount : void 0;
      const desiredY = typeof row !== "number" && row.unit === "px" ? row.amount : void 0;
      if (grid !== null && canvas !== null) {
        let targetRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        let scrollX = 0;
        let scrollY = 0;
        if (trueCol !== void 0 || trueRow !== void 0) {
          var _grid$getBounds;
          targetRect = (_grid$getBounds = grid.getBounds((trueCol !== null && trueCol !== void 0 ? trueCol : 0) + rowMarkerOffset, trueRow !== null && trueRow !== void 0 ? trueRow : 0)) !== null && _grid$getBounds !== void 0 ? _grid$getBounds : targetRect;
          if (targetRect.width === 0 || targetRect.height === 0) return;
        }
        const scrollBounds = canvas.getBoundingClientRect();
        const scale = scrollBounds.width / canvas.offsetWidth;
        if (desiredX !== void 0) {
          targetRect = {
            ...targetRect,
            x: desiredX - scrollBounds.left - scrollRef.current.scrollLeft,
            width: 1
          };
        }
        if (desiredY !== void 0) {
          targetRect = {
            ...targetRect,
            y: desiredY + scrollBounds.top - scrollRef.current.scrollTop,
            height: 1
          };
        }
        if (targetRect !== void 0) {
          const bounds = {
            x: targetRect.x - paddingX,
            y: targetRect.y - paddingY,
            width: targetRect.width + 2 * paddingX,
            height: targetRect.height + 2 * paddingY
          };
          let frozenWidth = 0;
          for (let i = 0; i < freezeColumns; i++) {
            frozenWidth += columns[i].width;
          }
          let trailingRowHeight = 0;
          const freezeTrailingRowsEffective = freezeTrailingRows + (lastRowSticky ? 1 : 0);
          if (freezeTrailingRowsEffective > 0) {
            trailingRowHeight = getFreezeTrailingHeight(mangledRows, freezeTrailingRowsEffective, rowHeight);
          }
          let sLeft = frozenWidth * scale + scrollBounds.left + totalMarkerWidth * scale;
          let sRight = scrollBounds.right;
          let sTop = scrollBounds.top + totalHeaderHeight * scale;
          let sBottom = scrollBounds.bottom - trailingRowHeight * scale;
          const minx = targetRect.width + paddingX * 2;
          switch (options === null || options === void 0 ? void 0 : options.hAlign) {
            case "start":
              sRight = sLeft + minx;
              break;
            case "end":
              sLeft = sRight - minx;
              break;
            case "center":
              sLeft = Math.floor((sLeft + sRight) / 2) - minx / 2;
              sRight = sLeft + minx;
              break;
          }
          const miny = targetRect.height + paddingY * 2;
          switch (options === null || options === void 0 ? void 0 : options.vAlign) {
            case "start":
              sBottom = sTop + miny;
              break;
            case "end":
              sTop = sBottom - miny;
              break;
            case "center":
              sTop = Math.floor((sTop + sBottom) / 2) - miny / 2;
              sBottom = sTop + miny;
              break;
          }
          if (sLeft > bounds.x) {
            scrollX = bounds.x - sLeft;
          } else if (sRight < bounds.x + bounds.width) {
            scrollX = bounds.x + bounds.width - sRight;
          }
          if (sTop > bounds.y) {
            scrollY = bounds.y - sTop;
          } else if (sBottom < bounds.y + bounds.height) {
            scrollY = bounds.y + bounds.height - sBottom;
          }
          if (dir === "vertical" || typeof col === "number" && col < freezeColumns) {
            scrollX = 0;
          } else if (dir === "horizontal" || typeof row === "number" && row >= mangledRows - freezeTrailingRowsEffective) {
            scrollY = 0;
          }
          if (scrollX !== 0 || scrollY !== 0) {
            var _options$behavior;
            if (scale !== 1) {
              scrollX /= scale;
              scrollY /= scale;
            }
            scrollRef.current.scrollTo({
              left: scrollX + scrollRef.current.scrollLeft,
              top: scrollY + scrollRef.current.scrollTop,
              behavior: (_options$behavior = options === null || options === void 0 ? void 0 : options.behavior) !== null && _options$behavior !== void 0 ? _options$behavior : "auto"
            });
          }
        }
      }
    }
  };
  const scrollToRef = React.useRef(scrollTo);
  scrollToRef.current = scrollTo;
  const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
  const getCellContentRef = React.useRef(getCellContent);
  focusCallback.current = focusOnRowFromTrailingBlankRow;
  getCellContentRef.current = getCellContent;
  const rowsRef = React.useRef(rows);
  rowsRef.current = rows;
  const colsRef = React.useRef(mangledCols.length);
  colsRef.current = mangledCols.length;
  const appendRow = async function(col) {
    var _ref6, _c$trailingRowOptions6, _c$trailingRowOptions7;
    let openOverlay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    let behavior = arguments.length > 2 ? arguments[2] : void 0;
    const c = mangledCols[col];
    const appendResult = (_ref6 = (_c$trailingRowOptions6 = c === null || c === void 0 || (_c$trailingRowOptions7 = c.trailingRowOptions) === null || _c$trailingRowOptions7 === void 0 ? void 0 : _c$trailingRowOptions7.onRowAppended) !== null && _c$trailingRowOptions6 !== void 0 ? _c$trailingRowOptions6 : onRowAppended) === null || _ref6 === void 0 ? void 0 : _ref6();
    let r = void 0;
    let bottom = true;
    if (appendResult !== void 0) {
      r = await appendResult;
      if (r === "top") bottom = false;
      if (typeof r === "number") bottom = false;
    }
    let backoff = 0;
    const doFocus = () => {
      if (rowsRef.current <= rows) {
        if (backoff < 500) {
          window.setTimeout(doFocus, backoff);
        }
        backoff = 50 + backoff * 2;
        return;
      }
      const row = typeof r === "number" ? r : bottom ? rows : 0;
      scrollToRef.current(col - rowMarkerOffset, row, "both", 0, 20, behavior ? {
        behavior
      } : void 0);
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, false, false, "edit");
      const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
        window.setTimeout(() => {
          focusCallback.current(col, row);
        }, 0);
      }
    };
    doFocus();
  };
  const appendColumn = async function(row) {
    let openOverlay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const appendResult = onColumnAppended === null || onColumnAppended === void 0 ? void 0 : onColumnAppended();
    let r = void 0;
    let right = true;
    if (appendResult !== void 0) {
      r = await appendResult;
      if (r === "left") right = false;
      if (typeof r === "number") right = false;
    }
    let backoff = 0;
    const doFocus = () => {
      if (colsRef.current <= mangledCols.length) {
        if (backoff < 500) {
          window.setTimeout(doFocus, backoff);
        }
        backoff = 50 + backoff * 2;
        return;
      }
      const col = typeof r === "number" ? r : right ? mangledCols.length : 0;
      scrollTo(col - rowMarkerOffset, row);
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, false, false, "edit");
      const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
        window.setTimeout(() => {
          focusCallback.current(col, row);
        }, 0);
      }
    };
    doFocus();
  };
  const getCustomNewRowTargetColumn = (col) => {
    var _columns$col$trailing, _columns$col;
    const customTargetColumn = (_columns$col$trailing = (_columns$col = columns[col]) === null || _columns$col === void 0 || (_columns$col = _columns$col.trailingRowOptions) === null || _columns$col === void 0 ? void 0 : _columns$col.targetColumn) !== null && _columns$col$trailing !== void 0 ? _columns$col$trailing : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.targetColumn;
    if (typeof customTargetColumn === "number") {
      const customTargetOffset = hasRowMarkers ? 1 : 0;
      return customTargetColumn + customTargetOffset;
    }
    if (typeof customTargetColumn === "object") {
      const maybeIndex = columnsIn.indexOf(customTargetColumn);
      if (maybeIndex >= 0) {
        const customTargetOffset = hasRowMarkers ? 1 : 0;
        return maybeIndex + customTargetOffset;
      }
    }
    return void 0;
  };
  const lastSelectedRowRef = React.useRef(void 0);
  const lastSelectedColRef = React.useRef(void 0);
  const themeForCell = (cell, pos) => {
    var _mangledCols$col;
    const [col, row] = pos;
    return mergeAndRealizeTheme(mergedTheme, (_mangledCols$col = mangledCols[col]) === null || _mangledCols$col === void 0 ? void 0 : _mangledCols$col.themeOverride, getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row), cell.themeOverride);
  };
  const {
    mapper
  } = useRowGrouping(rowGrouping, rowsIn);
  const rowGroupingNavBehavior = rowGrouping === null || rowGrouping === void 0 ? void 0 : rowGrouping.navigationBehavior;
  const lastMouseSelectLocation = React.useRef(void 0);
  const handleSelect = (args) => {
    var _gridSelection$curren2, _gridSelection$curren3;
    const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
    const isMultiRow = isMultiKey && rowSelect === "multi";
    const [col, row] = args.location;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const [cellCol, cellRow] = (_gridSelection$curren2 = (_gridSelection$curren3 = gridSelection.current) === null || _gridSelection$curren3 === void 0 ? void 0 : _gridSelection$curren3.cell) !== null && _gridSelection$curren2 !== void 0 ? _gridSelection$curren2 : [];
    if (args.kind === "cell") {
      lastSelectedColRef.current = void 0;
      lastMouseSelectLocation.current = [col, row];
      const checkboxColIndex = showRowNumber ? 1 : 0;
      const isCheckboxCol = col === checkboxColIndex;
      if (isCheckboxCol && hasRowMarkers) {
        if (showTrailingBlankRow === true && row === rows || rowMarkers === "number" || rowSelect === "none") return;
        const markerCell = getMangledCellContent(args.location);
        if (markerCell.kind !== InnerGridCellKind.Marker) {
          return;
        }
        if (markerCell.disabled === true) return;
        if (onRowMoved !== void 0) {
          var _renderer$onClick;
          const renderer = getCellRenderer(markerCell);
          assert((renderer === null || renderer === void 0 ? void 0 : renderer.kind) === InnerGridCellKind.Marker);
          const postClick = renderer === null || renderer === void 0 || (_renderer$onClick = renderer.onClick) === null || _renderer$onClick === void 0 ? void 0 : _renderer$onClick.call(renderer, {
            ...args,
            cell: markerCell,
            posX: args.localEventX,
            posY: args.localEventY,
            bounds: args.bounds,
            theme: themeForCell(markerCell, args.location),
            preventDefault: () => void 0
          });
          if (postClick === void 0 || postClick.checked === markerCell.checked) return;
        }
        setOverlay(void 0);
        focus();
        const isSelected = selectedRows.hasIndex(row);
        const lastHighlighted = lastSelectedRowRef.current;
        if (rowSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastHighlighted !== void 0 && selectedRows.hasIndex(lastHighlighted)) {
          const newSlice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];
          if (isMultiRow || rowSelectionMode === "multi") {
            setSelectedRows(void 0, newSlice, true);
          } else {
            setSelectedRows(CompactSelection.fromSingleSelection(newSlice), void 0, isMultiRow);
          }
        } else if (rowSelect === "multi" && (isMultiRow || args.isTouch || rowSelectionMode === "multi")) {
          if (isSelected) {
            setSelectedRows(selectedRows.remove(row), void 0, true);
          } else {
            setSelectedRows(void 0, row, true);
            lastSelectedRowRef.current = row;
          }
        } else if (isSelected && selectedRows.length === 1) {
          setSelectedRows(CompactSelection.empty(), void 0, isMultiKey);
        } else {
          setSelectedRows(CompactSelection.fromSingleSelection(row), void 0, isMultiKey);
          lastSelectedRowRef.current = row;
        }
      } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
        const customTargetColumn = getCustomNewRowTargetColumn(col);
        void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col);
      } else {
        if (cellCol !== col || cellRow !== row) {
          var _gridSelection$curren4;
          const cell = getMangledCellContent(args.location);
          const renderer = getCellRenderer(cell);
          if ((renderer === null || renderer === void 0 ? void 0 : renderer.onSelect) !== void 0) {
            let prevented = false;
            renderer.onSelect({
              ...args,
              cell,
              posX: args.localEventX,
              posY: args.localEventY,
              bounds: args.bounds,
              preventDefault: () => prevented = true,
              theme: themeForCell(cell, args.location)
            });
            if (prevented) {
              return;
            }
          }
          if (rowGroupingNavBehavior === "block" && mapper(row).isGroupHeader) {
            return;
          }
          const isLastStickyRow = lastRowSticky && row === rows;
          const startedFromLastSticky = lastRowSticky && gridSelection !== void 0 && ((_gridSelection$curren4 = gridSelection.current) === null || _gridSelection$curren4 === void 0 ? void 0 : _gridSelection$curren4.cell[1]) === rows;
          if ((args.shiftKey || args.isLongTouch === true) && cellCol !== void 0 && cellRow !== void 0 && gridSelection.current !== void 0 && !startedFromLastSticky) {
            if (isLastStickyRow) {
              return;
            }
            const left = Math.min(col, cellCol);
            const right = Math.max(col, cellCol);
            const top = Math.min(row, cellRow);
            const bottom = Math.max(row, cellRow);
            setCurrent({
              ...gridSelection.current,
              range: {
                x: left,
                y: top,
                width: right - left + 1,
                height: bottom - top + 1
              }
            }, true, isMultiKey, "click");
            lastSelectedRowRef.current = void 0;
            focus();
          } else {
            const hasRowSelection = gridSelection.rows.length > 0;
            setCurrent({
              cell: [col, row],
              range: {
                x: col,
                y: row,
                width: 1,
                height: 1
              }
            }, true, isMultiKey || hasRowSelection, "click");
            lastSelectedRowRef.current = void 0;
            setOverlay(void 0);
            focus();
          }
        }
      }
    } else if (args.kind === "header") {
      lastMouseSelectLocation.current = [col, row];
      setOverlay(void 0);
      const headerCheckboxColIndex = showRowNumber ? 1 : 0;
      if (hasRowMarkers && col === headerCheckboxColIndex) {
        lastSelectedRowRef.current = void 0;
        lastSelectedColRef.current = void 0;
        if (!headerRowMarkerDisabled && rowSelect === "multi") {
          if (selectedRows.length !== rows) {
            setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), void 0, isMultiKey);
          } else {
            setSelectedRows(CompactSelection.empty(), void 0, isMultiKey);
          }
          focus();
        }
      } else {
        const lastCol = lastSelectedColRef.current;
        if (columnSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastCol !== void 0 && selectedColumns.hasIndex(lastCol)) {
          const newSlice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];
          if (isMultiKey || args.isTouch || columnSelectionMode === "multi") {
            setSelectedColumns(void 0, newSlice, isMultiKey);
          } else {
            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), void 0, isMultiKey);
          }
        } else if (columnSelect === "multi" && (isMultiKey || args.isTouch || columnSelectionMode === "multi")) {
          if (selectedColumns.hasIndex(col)) {
            setSelectedColumns(selectedColumns.remove(col), void 0, isMultiKey);
          } else {
            setSelectedColumns(void 0, col, isMultiKey);
          }
          lastSelectedColRef.current = col;
        } else if (columnSelect !== "none") {
          if (selectedColumns.hasIndex(col)) {
            setSelectedColumns(selectedColumns.remove(col), void 0, isMultiKey);
          } else {
            setSelectedColumns(CompactSelection.fromSingleSelection(col), void 0, isMultiKey);
          }
          lastSelectedColRef.current = col;
        }
        lastSelectedRowRef.current = void 0;
        focus();
      }
    } else if (args.kind === groupHeaderKind) {
      lastMouseSelectLocation.current = [col, row];
    } else if (args.kind === outOfBoundsKind && !args.isMaybeScrollbar) {
      setGridSelection(emptyGridSelection, false);
      setOverlay(void 0);
      focus();
      onSelectionCleared === null || onSelectionCleared === void 0 || onSelectionCleared();
      lastSelectedRowRef.current = void 0;
      lastSelectedColRef.current = void 0;
    }
  };
  const coreState = {
    gridSelection,
    overlay,
    gridRef,
    ghostInputRef,
    overlayRef,
    ghostInputVisibleRef,
    scrollRef,
    canvasRef,
    visibleRegionRef,
    abortControllerRef,
    rowMarkerOffset,
    mangledCols,
    mangledRows,
    rows,
    setGridSelection,
    getMangledCellContent,
    mangledOnCellsEdited,
    setOverlay,
    focus,
    setGhostInputVisible,
    reselect,
    getCellRenderer
  };
  const {
    onMouseDown,
    onMouseUp,
    onMouseMoveImpl,
    normalSizeColumn,
    fillDown,
    fillRight,
    mouseDownData,
    isActivelyDraggingHeader
  } = useMouseHandlers({
    state: coreState,
    mouseState,
    setMouseState,
    fillHighlightRegion,
    setFillHighlightRegion,
    setScrollDir,
    handleSelect,
    onMouseMove,
    onCellClicked,
    onCellActivated,
    onCellContextMenu,
    onHeaderContextMenu,
    onGroupHeaderContextMenu,
    onHeaderClicked,
    onGroupHeaderClicked,
    onColumnResize,
    onFillPattern,
    cellActivationBehavior,
    columnSelect,
    columnSelectionMode,
    columns,
    groupLevels,
    mergedTheme,
    minColumnWidth,
    maxColumnWidth,
    themeForCell,
    getCellsForSelection,
    setSelectedColumns,
    visibleRegion,
    lastMouseSelectLocation
  });
  const [renameGroup, setRenameGroup] = React.useState();
  const onHeaderMenuClickInner = (col, screenPosition) => {
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col - rowMarkerOffset, screenPosition);
  };
  const onHeaderIndicatorClickInner = (col, screenPosition) => {
    onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col - rowMarkerOffset, screenPosition);
  };
  React.useEffect(() => {
    if (overlay === void 0) return;
    const findScrollableParents = (element) => {
      const parents = [];
      let currentParent = element.parentElement;
      while (currentParent && currentParent !== document.documentElement) {
        const styles = window.getComputedStyle(currentParent);
        const overflow = styles.overflow + styles.overflowY + styles.overflowX;
        if (overflow.includes("scroll") || overflow.includes("auto")) {
          parents.push(currentParent);
        }
        currentParent = currentParent.parentElement;
      }
      return parents;
    };
    const handleParentScroll = (event) => {
      const target = event.target;
      if (scrollRef.current && !scrollRef.current.contains(target)) {
        setOverlay(void 0);
      }
    };
    const scrollableParents = [];
    if (scrollRef.current) {
      const parents = findScrollableParents(scrollRef.current);
      scrollableParents.push(...parents);
    }
    scrollableParents.forEach((parent) => {
      parent.addEventListener("scroll", handleParentScroll);
    });
    window.addEventListener("scroll", handleParentScroll);
    document.addEventListener("scroll", handleParentScroll, true);
    return () => {
      scrollableParents.forEach((parent) => {
        parent.removeEventListener("scroll", handleParentScroll);
      });
      window.removeEventListener("scroll", handleParentScroll);
      document.removeEventListener("scroll", handleParentScroll, true);
    };
  }, [overlay, setOverlay, scrollRef]);
  const currentCell = gridSelection === null || gridSelection === void 0 || (_gridSelection$curren5 = gridSelection.current) === null || _gridSelection$curren5 === void 0 ? void 0 : _gridSelection$curren5.cell;
  const onVisibleRegionChangedImpl = (region, clientWidth, clientHeight, rightElWidth, tx, ty) => {
    hasJustScrolled.current = false;
    if (overlay !== void 0) {
      const prevRegion = visibleRegionRef.current;
      const hasScrolled = prevRegion.x !== region.x || prevRegion.y !== region.y;
      if (hasScrolled) {
        setOverlay(void 0);
      }
    }
    let selected = currentCell;
    if (selected !== void 0) {
      selected = [selected[0] - rowMarkerOffset, selected[1]];
    }
    const freezeRegion = freezeColumns === 0 ? void 0 : {
      x: 0,
      y: region.y,
      width: freezeColumns,
      height: region.height
    };
    const freezeRegions = [];
    if (freezeRegion !== void 0) freezeRegions.push(freezeRegion);
    if (freezeTrailingRows > 0) {
      freezeRegions.push({
        x: region.x - rowMarkerOffset,
        y: rows - freezeTrailingRows,
        width: region.width,
        height: freezeTrailingRows
      });
      if (freezeColumns > 0) {
        freezeRegions.push({
          x: 0,
          y: rows - freezeTrailingRows,
          width: freezeColumns,
          height: freezeTrailingRows
        });
      }
    }
    const newRegion = {
      x: region.x - rowMarkerOffset,
      y: region.y,
      width: region.width,
      height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
      tx,
      ty,
      extras: {
        selected,
        freezeRegion,
        freezeRegions
      }
    };
    visibleRegionRef.current = newRegion;
    setVisibleRegion(newRegion);
    setClientSize([clientWidth, clientHeight, rightElWidth]);
    onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 || onVisibleRegionChanged(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
  };
  const onColumnProposeMoveImpl = whenDefined(onColumnProposeMove, (startIndex, endIndex) => {
    return (onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset)) !== false;
  });
  const onColumnMovedImpl = whenDefined(onColumnMoved, (startIndex, endIndex) => {
    onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
    if (columnSelect !== "none") {
      setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), void 0, true);
    }
  });
  const isActivelyDragging = React.useRef(false);
  const onDragStartImpl = (args) => {
    if (args.location[0] === 0 && rowMarkerOffset > 0) {
      args.preventDefault();
      return;
    }
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
    if (!args.defaultPrevented()) {
      isActivelyDragging.current = true;
    }
    setMouseState(void 0);
  };
  const onDragEnd = () => {
    isActivelyDragging.current = false;
  };
  const rowGroupingSelectionBehavior = rowGrouping === null || rowGrouping === void 0 ? void 0 : rowGrouping.selectionBehavior;
  const getSelectionRowLimits = (selectedRow) => {
    if (rowGroupingSelectionBehavior !== "block-spanning") return void 0;
    const {
      isGroupHeader,
      path,
      groupRows
    } = mapper(selectedRow);
    if (isGroupHeader) {
      return [selectedRow, selectedRow];
    }
    const groupRowIndex = path[path.length - 1];
    const lowerBounds = selectedRow - groupRowIndex;
    const upperBounds = selectedRow + groupRows - groupRowIndex - 1;
    return [lowerBounds, upperBounds];
  };
  const hoveredRef = React.useRef(void 0);
  const onItemHoveredImpl = (args) => {
    var _mouseDownData$curren, _mouseDownData$curren2;
    if (mouseEventArgsAreEqual(args, hoveredRef.current)) return;
    hoveredRef.current = args;
    if ((mouseDownData === null || mouseDownData === void 0 || (_mouseDownData$curren = mouseDownData.current) === null || _mouseDownData$curren === void 0 ? void 0 : _mouseDownData$curren.button) !== void 0 && mouseDownData.current.button >= 1) return;
    if (args.buttons !== 0 && mouseState !== void 0 && ((_mouseDownData$curren2 = mouseDownData.current) === null || _mouseDownData$curren2 === void 0 ? void 0 : _mouseDownData$curren2.location[0]) === 0 && rowMarkerOffset === 1 && rowSelect === "multi" && mouseState.previousSelection && !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) && gridSelection.rows.hasIndex(mouseDownData.current.location[1])) {
      const start = Math.min(mouseDownData.current.location[1], args.location[1]);
      const end = Math.max(mouseDownData.current.location[1], args.location[1]) + 1;
      setSelectedRows(CompactSelection.fromSingleSelection([start, end]), void 0, false);
    } else if (args.buttons !== 0 && mouseState !== void 0 && gridSelection.current !== void 0 && !isActivelyDragging.current && !isActivelyDraggingHeader.current && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
      var _mouseState$previousS;
      const [selectedCol, selectedRow] = gridSelection.current.cell;
      let [col, row] = args.location;
      if (row < 0) {
        row = visibleRegionRef.current.y;
      }
      if (mouseState.fillHandle === true && ((_mouseState$previousS = mouseState.previousSelection) === null || _mouseState$previousS === void 0 ? void 0 : _mouseState$previousS.current) !== void 0) {
        const prevRange = mouseState.previousSelection.current.range;
        row = Math.min(row, showTrailingBlankRow ? rows - 1 : rows);
        const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
        setFillHighlightRegion(rect);
      } else {
        const startedFromLastStickyRow = showTrailingBlankRow && selectedRow === rows;
        if (startedFromLastStickyRow) return;
        const landedOnLastStickyRow = showTrailingBlankRow && row === rows;
        if (landedOnLastStickyRow) {
          if (args.kind === outOfBoundsKind) row--;
          else return;
        }
        col = Math.max(col, rowMarkerOffset);
        const clampLimits = getSelectionRowLimits(selectedRow);
        row = clampLimits === void 0 ? row : clamp$1(row, clampLimits[0], clampLimits[1]);
        const deltaX = col - selectedCol;
        const deltaY = row - selectedRow;
        const newRange = {
          x: deltaX >= 0 ? selectedCol : col,
          y: deltaY >= 0 ? selectedRow : row,
          width: Math.abs(deltaX) + 1,
          height: Math.abs(deltaY) + 1
        };
        setCurrent({
          ...gridSelection.current,
          range: newRange
        }, true, false, "drag");
      }
    }
    onItemHovered === null || onItemHovered === void 0 || onItemHovered({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
  };
  const adjustSelectionOnScroll = () => {
    const args = hoveredRef.current;
    if (args === void 0) return;
    const [xDir, yDir] = args.scrollEdge;
    let [col, row] = args.location;
    const visible = visibleRegionRef.current;
    if (xDir === -1) {
      var _visible$extras$freez, _visible$extras;
      col = (_visible$extras$freez = (_visible$extras = visible.extras) === null || _visible$extras === void 0 || (_visible$extras = _visible$extras.freezeRegion) === null || _visible$extras === void 0 ? void 0 : _visible$extras.x) !== null && _visible$extras$freez !== void 0 ? _visible$extras$freez : visible.x;
    } else if (xDir === 1) {
      col = visible.x + visible.width;
    }
    if (yDir === -1) {
      row = Math.max(0, visible.y);
    } else if (yDir === 1) {
      row = Math.min(rows - 1, visible.y + visible.height);
    }
    col = clamp$1(col, 0, mangledCols.length - 1);
    row = clamp$1(row, 0, rows - 1);
    onItemHoveredImpl({
      ...args,
      location: [col, row]
    });
  };
  useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);
  const adjustSelection = (direction2) => {
    var _getSelectionRowLimit;
    if (gridSelection.current === void 0) return;
    const [x, y] = direction2;
    const [col, row] = gridSelection.current.cell;
    const old = gridSelection.current.range;
    let left = old.x;
    let right = old.x + old.width;
    let top = old.y;
    let bottom = old.y + old.height;
    const [minRow, maxRowRaw] = (_getSelectionRowLimit = getSelectionRowLimits(row)) !== null && _getSelectionRowLimit !== void 0 ? _getSelectionRowLimit : [0, rows - 1];
    const maxRow = maxRowRaw + 1;
    if (y !== 0) {
      switch (y) {
        case 2: {
          bottom = maxRow;
          top = row;
          scrollTo(0, bottom, "vertical");
          break;
        }
        case -2: {
          top = minRow;
          bottom = row + 1;
          scrollTo(0, top, "vertical");
          break;
        }
        case 1: {
          if (top < row) {
            top++;
            scrollTo(0, top, "vertical");
          } else {
            bottom = Math.min(maxRow, bottom + 1);
            scrollTo(0, bottom, "vertical");
          }
          break;
        }
        case -1: {
          if (bottom > row + 1) {
            bottom--;
            scrollTo(0, bottom, "vertical");
          } else {
            top = Math.max(minRow, top - 1);
            scrollTo(0, top, "vertical");
          }
          break;
        }
        default: {
          assertNever();
        }
      }
    }
    if (x !== 0) {
      if (x === 2) {
        right = mangledCols.length;
        left = col;
        scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
      } else if (x === -2) {
        left = rowMarkerOffset;
        right = col + 1;
        scrollTo(left - rowMarkerOffset, 0, "horizontal");
      } else {
        let disallowed = [];
        if (getCellsForSelection !== void 0) {
          const cells = getCellsForSelection({
            x: left,
            y: top,
            width: right - left - rowMarkerOffset,
            height: bottom - top
          }, abortControllerRef.current.signal);
          if (typeof cells === "object") {
            disallowed = getSpanStops(cells);
          }
        }
        if (x === 1) {
          let done = false;
          if (left < col) {
            if (disallowed.length > 0) {
              const target = range(left + 1, col + 1).find((n) => !disallowed.includes(n - rowMarkerOffset));
              if (target !== void 0) {
                left = target;
                done = true;
              }
            } else {
              left++;
              done = true;
            }
            if (done) scrollTo(left, 0, "horizontal");
          }
          if (!done) {
            right = Math.min(mangledCols.length, right + 1);
            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
          }
        } else if (x === -1) {
          let done = false;
          if (right > col + 1) {
            if (disallowed.length > 0) {
              const target = range(right - 1, col, -1).find((n) => !disallowed.includes(n - rowMarkerOffset));
              if (target !== void 0) {
                right = target;
                done = true;
              }
            } else {
              right--;
              done = true;
            }
            if (done) scrollTo(right - rowMarkerOffset, 0, "horizontal");
          }
          if (!done) {
            left = Math.max(rowMarkerOffset, left - 1);
            scrollTo(left - rowMarkerOffset, 0, "horizontal");
          }
        } else {
          assertNever();
        }
      }
    }
    setCurrent({
      cell: gridSelection.current.cell,
      range: {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      }
    }, true, false, "keyboard-select");
  };
  const scrollToActiveCellRef = React.useRef(scrollToActiveCell);
  scrollToActiveCellRef.current = scrollToActiveCell;
  const updateSelectedCell = (col, row, fromEditingTrailingRow, freeMove) => {
    const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
    col = clamp$1(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
    row = clamp$1(row, 0, rowMax);
    const curCol = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0];
    const curRow = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1];
    if (col === curCol && row === curRow) return false;
    if (freeMove && gridSelection.current !== void 0) {
      const newStack = [...gridSelection.current.rangeStack];
      if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
        newStack.push(gridSelection.current.range);
      }
      setGridSelection({
        ...gridSelection,
        current: {
          cell: [col, row],
          range: {
            x: col,
            y: row,
            width: 1,
            height: 1
          },
          rangeStack: newStack
        }
      }, true);
    } else {
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-nav");
    }
    if (lastSent.current !== void 0 && lastSent.current[0] === col && lastSent.current[1] === row) {
      lastSent.current = void 0;
    }
    if (scrollToActiveCellRef.current) {
      const paddingY = 20;
      scrollTo(col - rowMarkerOffset, row, "both", 0, paddingY);
    }
    return true;
  };
  const onFinishEditing = (newValue, movement) => {
    var _ghostInputRef$curren9, _ghostInputRef$curren0, _currentOverlay$conte, _ghostInputRef$curren1, _ghostInputRef$curren10;
    const currentOverlay = overlayRef.current;
    ghostInputVisibleRef.current;
    let finalValue = newValue;
    const ghostText = (_ghostInputRef$curren9 = (_ghostInputRef$curren0 = ghostInputRef.current) === null || _ghostInputRef$curren0 === void 0 ? void 0 : _ghostInputRef$curren0.getValue()) !== null && _ghostInputRef$curren9 !== void 0 ? _ghostInputRef$curren9 : "";
    const isCustomCell = (currentOverlay === null || currentOverlay === void 0 || (_currentOverlay$conte = currentOverlay.content) === null || _currentOverlay$conte === void 0 ? void 0 : _currentOverlay$conte.kind) === GridCellKind.Custom;
    if ((currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.cell) !== void 0 && ghostText.length > 0 && currentOverlay.content !== void 0 && !isCustomCell) {
      const cellContent = currentOverlay.content;
      if (cellContent.kind === GridCellKind.Text) {
        finalValue = {
          ...cellContent,
          data: ghostText,
          displayData: ghostText
        };
      } else if (cellContent.kind === GridCellKind.Number) {
        const num = Number.parseFloat(ghostText);
        const numVal = Number.isNaN(num) ? 0 : num;
        finalValue = {
          ...cellContent,
          data: numVal,
          displayData: numVal.toLocaleString()
        };
      } else if (cellContent.kind === GridCellKind.Uri) {
        finalValue = {
          ...cellContent,
          data: ghostText,
          displayData: ghostText
        };
      } else if (cellContent.kind === GridCellKind.Markdown) {
        finalValue = {
          ...cellContent,
          data: ghostText
        };
      }
    } else if (isCustomCell) {
      finalValue = newValue;
    }
    if (finalValue !== void 0 && ghostText.length === 0) {
      if (finalValue.kind === GridCellKind.Text && finalValue.data !== finalValue.displayData) {
        finalValue = {
          ...finalValue,
          displayData: finalValue.data
        };
      } else if (finalValue.kind === GridCellKind.Number) {
        const formatted = finalValue.data !== void 0 ? finalValue.data.toLocaleString() : "0";
        if (finalValue.displayData !== formatted) {
          finalValue = {
            ...finalValue,
            displayData: formatted
          };
        }
      } else if (finalValue.kind === GridCellKind.Uri && finalValue.data !== finalValue.displayData) {
        finalValue = {
          ...finalValue,
          displayData: finalValue.data
        };
      }
    }
    const originalContent = currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.content;
    const hasValueChanged = () => {
      if (finalValue === void 0 || originalContent === void 0) return false;
      if (finalValue.kind !== originalContent.kind) return true;
      switch (finalValue.kind) {
        case GridCellKind.Text:
        case GridCellKind.Uri:
        case GridCellKind.Markdown:
          return finalValue.data !== originalContent.data;
        case GridCellKind.Number:
          return finalValue.data !== originalContent.data;
        case GridCellKind.Boolean:
          return finalValue.data !== originalContent.data;
        default:
          return true;
      }
    };
    if ((currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.cell) !== void 0 && finalValue !== void 0 && isEditableGridCell(finalValue) && hasValueChanged()) {
      mangledOnCellsEdited([{
        location: currentOverlay.cell,
        value: finalValue
      }]);
      window.requestAnimationFrame(() => {
        var _gridRef$current3;
        (_gridRef$current3 = gridRef.current) === null || _gridRef$current3 === void 0 || _gridRef$current3.damage([{
          cell: currentOverlay.cell
        }]);
      });
    }
    (_ghostInputRef$curren1 = ghostInputRef.current) === null || _ghostInputRef$curren1 === void 0 || _ghostInputRef$curren1.clear();
    (_ghostInputRef$curren10 = ghostInputRef.current) === null || _ghostInputRef$curren10 === void 0 || _ghostInputRef$curren10.setVisible(false);
    setGhostInputVisible(false);
    focus(true);
    overlayRef.current = void 0;
    setOverlay(void 0);
    const [movX, movY] = movement;
    if (gridSelection.current !== void 0 && (movX !== 0 || movY !== 0)) {
      const isEditingLastRow = gridSelection.current.cell[1] === mangledRows - 1;
      if (isEditingLastRow && movY === 1) {
        onFinishedEditing === null || onFinishedEditing === void 0 || onFinishedEditing(newValue, [0, 0]);
        return;
      }
      const isEditingLastCol = gridSelection.current.cell[0] === mangledCols.length - 1 && newValue !== void 0;
      let updateSelected = true;
      if (isEditingLastRow && movY === 1 && onRowAppended !== void 0) {
        updateSelected = false;
        const col = gridSelection.current.cell[0] + movX;
        const customTargetColumn = getCustomNewRowTargetColumn(col);
        void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col, false);
      }
      if (isEditingLastCol && movX === 1 && onColumnAppended !== void 0) {
        updateSelected = false;
        const row = gridSelection.current.cell[1] + movY;
        void appendColumn(row, false);
      }
      if (updateSelected) {
        const newCol = clamp$1(gridSelection.current.cell[0] + movX, rowMarkerOffset, mangledCols.length - 1);
        const newRow = clamp$1(gridSelection.current.cell[1] + movY, 0, mangledRows - 1);
        updateSelectedCell(newCol, newRow, isEditingLastRow, false);
        window.requestAnimationFrame(() => {
          var _ghostInputRef$curren11;
          (_ghostInputRef$curren11 = ghostInputRef.current) === null || _ghostInputRef$curren11 === void 0 || _ghostInputRef$curren11.focus();
        });
      }
    }
    onFinishedEditing === null || onFinishedEditing === void 0 || onFinishedEditing(newValue, movement);
  };
  const [overlayID] = React.useState(() => `gdg-overlay-${idCounter++}`);
  const deleteRange = (r) => {
    var _gridRef$current4;
    focus();
    const editList = [];
    for (let x = r.x; x < r.x + r.width; x++) {
      for (let y = r.y; y < r.y + r.height; y++) {
        const cellValue = getCellContent([x - rowMarkerOffset, y]);
        if (!cellValue.allowOverlay && cellValue.kind !== GridCellKind.Boolean) continue;
        let newVal = void 0;
        if (cellValue.kind === GridCellKind.Custom) {
          var _toDelete$provideEdit;
          const toDelete = getCellRenderer(cellValue);
          const editor = toDelete === null || toDelete === void 0 || (_toDelete$provideEdit = toDelete.provideEditor) === null || _toDelete$provideEdit === void 0 ? void 0 : _toDelete$provideEdit.call(toDelete, {
            ...cellValue,
            location: [x - rowMarkerOffset, y]
          });
          if ((toDelete === null || toDelete === void 0 ? void 0 : toDelete.onDelete) !== void 0) {
            newVal = toDelete.onDelete(cellValue);
          } else if (isObjectEditorCallbackResult(editor)) {
            var _editor$deletedValue;
            newVal = editor === null || editor === void 0 || (_editor$deletedValue = editor.deletedValue) === null || _editor$deletedValue === void 0 ? void 0 : _editor$deletedValue.call(editor, cellValue);
          }
        } else if (isEditableGridCell(cellValue) && cellValue.allowOverlay || cellValue.kind === GridCellKind.Boolean) {
          var _toDelete$onDelete;
          const toDelete = getCellRenderer(cellValue);
          newVal = toDelete === null || toDelete === void 0 || (_toDelete$onDelete = toDelete.onDelete) === null || _toDelete$onDelete === void 0 ? void 0 : _toDelete$onDelete.call(toDelete, cellValue);
        }
        if (newVal !== void 0 && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
          editList.push({
            location: [x, y],
            value: newVal
          });
        }
      }
    }
    mangledOnCellsEdited(editList);
    (_gridRef$current4 = gridRef.current) === null || _gridRef$current4 === void 0 || _gridRef$current4.damage(editList.map((x) => ({
      cell: x.location
    })));
  };
  const overlayOpen = overlay !== void 0;
  const {
    onKeyDown
  } = useKeyboardHandlers({
    state: coreState,
    keybindings,
    overlayOpen,
    columnSelect,
    rowSelect,
    rangeSelect,
    editOnType,
    trapFocus,
    showTrailingBlankRow,
    columnsInLength: columnsIn.length,
    rowGroupingNavBehavior,
    mapper,
    onKeyDownIn,
    onSelectionCleared,
    onCellActivated,
    onDelete,
    getCellContent,
    setSelectedColumns,
    setSelectedRows,
    setShowSearchInner,
    searchInputRef,
    adjustSelection,
    updateSelectedCell,
    deleteRange,
    fillDown,
    fillRight,
    appendRow,
    getCustomNewRowTargetColumn,
    scrollToRef
  });
  const [isFocused, setIsFocused] = React.useState(false);
  const setIsFocusedDebounced = React.useRef(debounce((val) => {
    setIsFocused(val);
  }, 5));
  const {
    onGhostInput,
    onGhostCompositionStart,
    onGhostCompositionEnd: onGhostCompositionEnd2,
    onGhostKeyDown,
    onGhostKeyUp,
    onGhostFocus,
    onGhostBlur
  } = useGhostInput({
    state: coreState,
    onKeyDown,
    onFinishEditing,
    onKeyUpIn,
    onCellActivated,
    setIsFocused
  });
  const onContextMenu = (args, preventDefault) => {
    const adjustedCol = args.location[0] - rowMarkerOffset;
    if (args.kind === "header") {
      onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === groupHeaderKind) {
      if (adjustedCol < 0) {
        return;
      }
      onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === "cell") {
      const [col, row] = args.location;
      onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([adjustedCol, row], {
        ...args,
        preventDefault
      });
      if (!gridSelectionHasItem(gridSelection, args.location)) {
        updateSelectedCell(col, row, false, false);
      }
    }
  };
  const {
    onCopy,
    onPasteInternal
  } = useClipboard({
    state: coreState,
    keybindings,
    getCellsForSelection,
    coercePasteValue,
    onPaste,
    copyHeaders,
    columnsIn,
    onDelete,
    deleteRange,
    safeWindow
  });
  const onSearchResultsChanged = (results, navIndex) => {
    if (onSearchResultsChangedIn !== void 0) {
      if (rowMarkerOffset !== 0) {
        results = results.map((item) => [item[0] - rowMarkerOffset, item[1]]);
      }
      onSearchResultsChangedIn(results, navIndex);
      return;
    }
    if (results.length === 0 || navIndex === -1) return;
    const [col, row] = results[navIndex];
    if (lastSent.current !== void 0 && lastSent.current[0] === col && lastSent.current[1] === row) {
      return;
    }
    lastSent.current = [col, row];
    updateSelectedCell(col, row, false, false);
  };
  const [outCol, outRow] = (_gridSelectionOuter$c = gridSelectionOuter === null || gridSelectionOuter === void 0 || (_gridSelectionOuter$c2 = gridSelectionOuter.current) === null || _gridSelectionOuter$c2 === void 0 ? void 0 : _gridSelectionOuter$c2.cell) !== null && _gridSelectionOuter$c !== void 0 ? _gridSelectionOuter$c : [];
  React.useLayoutEffect(() => {
    var _expectedExternalGrid, _expectedExternalGrid2;
    if (scrollToActiveCellRef.current && !hasJustScrolled.current && outCol !== void 0 && outRow !== void 0 && (outCol !== ((_expectedExternalGrid = expectedExternalGridSelection.current) === null || _expectedExternalGrid === void 0 || (_expectedExternalGrid = _expectedExternalGrid.current) === null || _expectedExternalGrid === void 0 ? void 0 : _expectedExternalGrid.cell[0]) || outRow !== ((_expectedExternalGrid2 = expectedExternalGridSelection.current) === null || _expectedExternalGrid2 === void 0 || (_expectedExternalGrid2 = _expectedExternalGrid2.current) === null || _expectedExternalGrid2 === void 0 ? void 0 : _expectedExternalGrid2.cell[1]))) {
      scrollToRef.current(outCol, outRow);
    }
    hasJustScrolled.current = false;
  }, [outCol, outRow]);
  const selectionOutOfBounds = gridSelection.current !== void 0 && (gridSelection.current.cell[0] >= mangledCols.length || gridSelection.current.cell[1] >= mangledRows);
  React.useLayoutEffect(() => {
    if (selectionOutOfBounds) {
      setGridSelection(emptyGridSelection, false);
    }
  }, [selectionOutOfBounds, setGridSelection]);
  const disabledRows = showTrailingBlankRow === true && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.tint) === true ? CompactSelection.fromSingleSelection(mangledRows - 1) : CompactSelection.empty();
  const mangledVerticalBorder = (col) => {
    var _verticalBorder;
    return typeof verticalBorder === "boolean" ? verticalBorder : (_verticalBorder = verticalBorder === null || verticalBorder === void 0 ? void 0 : verticalBorder(col - rowMarkerOffset)) !== null && _verticalBorder !== void 0 ? _verticalBorder : true;
  };
  const renameGroupNode = renameGroup === void 0 || canvasRef.current === null ? null : /* @__PURE__ */ jsx(GroupRename, { bounds: renameGroup.bounds, group: renameGroup.group, canvasBounds: canvasRef.current.getBoundingClientRect(), onClose: () => setRenameGroup(void 0), onFinish: (newVal) => {
    setRenameGroup(void 0);
    onGroupHeaderRenamed === null || onGroupHeaderRenamed === void 0 || onGroupHeaderRenamed(renameGroup.group, newVal);
  } });
  const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + rowMarkerOffset);
  React.useImperativeHandle(forwardedRef, () => ({
    appendRow: (col, openOverlay) => appendRow(col + rowMarkerOffset, openOverlay),
    appendColumn: (row, openOverlay) => appendColumn(row, openOverlay),
    updateCells: (damageList) => {
      var _gridRef$current5;
      if (rowMarkerOffset !== 0) {
        damageList = damageList.map((x) => ({
          cell: [x.cell[0] + rowMarkerOffset, x.cell[1]]
        }));
      }
      return (_gridRef$current5 = gridRef.current) === null || _gridRef$current5 === void 0 ? void 0 : _gridRef$current5.damage(damageList);
    },
    getBounds: (col, row) => {
      var _gridRef$current6;
      if ((canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current) === null || (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null) {
        return void 0;
      }
      if (col === void 0 && row === void 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scale = rect.width / scrollRef.current.clientWidth;
        return {
          x: rect.x - scrollRef.current.scrollLeft * scale,
          y: rect.y - scrollRef.current.scrollTop * scale,
          width: scrollRef.current.scrollWidth * scale,
          height: scrollRef.current.scrollHeight * scale
        };
      }
      return (_gridRef$current6 = gridRef.current) === null || _gridRef$current6 === void 0 ? void 0 : _gridRef$current6.getBounds((col !== null && col !== void 0 ? col : 0) + rowMarkerOffset, row);
    },
    focus: () => {
      var _gridRef$current7;
      return (_gridRef$current7 = gridRef.current) === null || _gridRef$current7 === void 0 ? void 0 : _gridRef$current7.focus();
    },
    emit: async (e) => {
      switch (e) {
        case "delete":
          onKeyDown({
            bounds: void 0,
            cancel: () => void 0,
            stopPropagation: () => void 0,
            preventDefault: () => void 0,
            ctrlKey: false,
            key: "Delete",
            keyCode: 46,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "fill-right":
          onKeyDown({
            bounds: void 0,
            cancel: () => void 0,
            stopPropagation: () => void 0,
            preventDefault: () => void 0,
            ctrlKey: true,
            key: "r",
            keyCode: 82,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "fill-down":
          onKeyDown({
            bounds: void 0,
            cancel: () => void 0,
            stopPropagation: () => void 0,
            preventDefault: () => void 0,
            ctrlKey: true,
            key: "d",
            keyCode: 68,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: void 0,
            location: void 0
          });
          break;
        case "copy":
          await onCopy(void 0, true);
          break;
        case "paste":
          await onPasteInternal();
          break;
      }
    },
    scrollTo,
    remeasureColumns: (cols) => {
      for (const col of cols) {
        void normalSizeColumn(col + rowMarkerOffset);
      }
    },
    getMouseArgsForPosition: (posX, posY, ev) => {
      if ((gridRef === null || gridRef === void 0 ? void 0 : gridRef.current) === null) {
        return void 0;
      }
      const args = gridRef.current.getMouseArgsForPosition(posX, posY, ev);
      if (args === void 0) {
        return void 0;
      }
      return {
        ...args,
        location: [args.location[0] - rowMarkerOffset, args.location[1]]
      };
    }
  }), [appendRow, appendColumn, normalSizeColumn, scrollRef, onCopy, onKeyDown, onPasteInternal, rowMarkerOffset, scrollTo]);
  const [selCol, selRow] = currentCell !== null && currentCell !== void 0 ? currentCell : [];
  const onCellFocused = (cell) => {
    const [col, row] = cell;
    if (row === -1) {
      if (columnSelect !== "none") {
        setSelectedColumns(CompactSelection.fromSingleSelection(col), void 0, false);
        focus();
      }
      return;
    }
    if (selCol === col && selRow === row) return;
    setCurrent({
      cell,
      range: {
        x: col,
        y: row,
        width: 1,
        height: 1
      }
    }, true, false, "keyboard-nav");
    scrollTo(col, row);
  };
  const onCanvasFocused = () => {
    setIsFocusedDebounced.current(true);
    if (gridSelection.current === void 0 && gridSelection.columns.length === 0 && gridSelection.rows.length === 0 && mouseState === void 0) {
      setCurrent({
        cell: [rowMarkerOffset, cellYOffset],
        range: {
          x: rowMarkerOffset,
          y: cellYOffset,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-select");
    }
  };
  const onFocusOut = () => {
    setIsFocusedDebounced.current(false);
  };
  const [idealWidth, idealHeight] = ((_experimental$scrollb) => {
    let h;
    const scrollbarWidth = (_experimental$scrollb = experimental === null || experimental === void 0 ? void 0 : experimental.scrollbarWidthOverride) !== null && _experimental$scrollb !== void 0 ? _experimental$scrollb : getScrollBarWidth();
    const rowsCountWithTrailingRow = rows + (showTrailingBlankRow ? 1 : 0);
    if (typeof rowHeight === "number") {
      h = totalHeaderHeight + rowsCountWithTrailingRow * rowHeight;
    } else {
      let avg = 0;
      const toAverage = Math.min(rowsCountWithTrailingRow, 10);
      for (let i = 0; i < toAverage; i++) {
        avg += rowHeight(i);
      }
      avg = Math.floor(avg / toAverage);
      h = totalHeaderHeight + rowsCountWithTrailingRow * avg;
    }
    h += scrollbarWidth;
    const w2 = mangledCols.reduce((acc, x) => x.width + acc, 0) + scrollbarWidth;
    return [`${Math.min(1e5, w2)}px`, `${Math.min(1e5, h)}px`];
  })();
  const cssStyle = makeCSSStyle(mergedTheme);
  return /* @__PURE__ */ jsxs(ThemeContext.Provider, { value: mergedTheme, children: [
    /* @__PURE__ */ jsxs(DataEditorContainer, { style: cssStyle, className, inWidth: width !== null && width !== void 0 ? width : idealWidth, inHeight: height !== null && height !== void 0 ? height : idealHeight, children: [
      /* @__PURE__ */ jsx(DataGridSearch, { fillHandle, drawFocusRing, experimental, fixedShadowX, fixedShadowY, getRowThemeOverride, headerIcons, imageWindowLoader, initialSize, isDraggable, onDragLeave, onRowMoved, overscrollX, overscrollY, preventDiagonalScrolling, rightElement, rightElementProps, smoothScrollX, smoothScrollY, className, enableGroups, onCanvasFocused, onCanvasBlur: onFocusOut, canvasRef, onContextMenu, theme: mergedTheme, cellXOffset, cellYOffset, accessibilityHeight: visibleRegion.height, onDragEnd, columns: mangledCols, nonGrowWidth, drawHeader: drawHeader2, onColumnProposeMove: onColumnProposeMoveImpl, drawCell: drawCell2, disabledRows, freezeColumns: mangledFreezeColumns, lockColumns: rowMarkerOffset, firstColAccessible: rowMarkerOffset === 0, getCellContent: getMangledCellContent, minColumnWidth, maxColumnWidth, searchInputRef, showSearch, onSearchClose, highlightRegions, getCellsForSelection, getGroupDetails: mangledGetGroupDetails, headerHeight, isFocused, groupHeaderHeight: enableGroups ? groupHeaderHeight : 0, groupLevels, groupHeaderHeights, freezeTrailingRows: freezeTrailingRows + (showTrailingBlankRow && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true ? 1 : 0), hasAppendRow: showTrailingBlankRow, onColumnResize, onColumnResizeEnd, onColumnResizeStart, onCellFocused, onColumnMoved: onColumnMovedImpl, onDragStart: onDragStartImpl, onHeaderMenuClick: onHeaderMenuClickInner, onHeaderIndicatorClick: onHeaderIndicatorClickInner, onItemHovered: onItemHoveredImpl, isFilling: (mouseState === null || mouseState === void 0 ? void 0 : mouseState.fillHandle) === true, onMouseMove: onMouseMoveImpl, onKeyDown, onKeyUp: onKeyUpIn, onMouseDown, onMouseUp, onDragOverCell, onDrop, onSearchResultsChanged, onVisibleRegionChanged: onVisibleRegionChangedImpl, clientSize, rowHeight, searchResults, searchValue, onSearchValueChange, rows: mangledRows, scrollRef, selection: gridSelection, translateX: visibleRegion.tx, translateY: visibleRegion.ty, verticalBorder: mangledVerticalBorder, gridRef, getCellRenderer, resizeIndicator }),
      renameGroupNode,
      overlay !== void 0 && /* @__PURE__ */ jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(DataGridOverlayEditor, { ...overlay, validateCell, bloom: editorBloom, id: overlayID, getCellRenderer, className: (experimental === null || experimental === void 0 ? void 0 : experimental.isSubGrid) === true ? "click-outside-ignore" : void 0, provideEditor, imageEditorOverride, portalElementRef, onFinishEditing, markdownDivCreateNode, isOutsideClick, customEventTarget: experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget, isGhostMode: ghostInputVisible }) })
    ] }),
    ((_portalElementRef$cur) => {
      const portalElement = (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal");
      if (portalElement === null) return null;
      return createPortal(/* @__PURE__ */ jsx(GhostInput, { ref: ghostInputRef, onInput: onGhostInput, onCompositionStart: onGhostCompositionStart, onCompositionEnd: onGhostCompositionEnd2, onKeyDown: onGhostKeyDown, onKeyUp: onGhostKeyUp, onFocus: onGhostFocus, onBlur: onGhostBlur }), portalElement);
    })()
  ] });
};
const DataEditor = React.forwardRef(DataEditorImpl);
function isOverEditableRegion(e) {
  var _cell$maxSize, _cell$contentAlign;
  const {
    cell,
    posX: pointerX,
    posY: pointerY,
    bounds,
    theme
  } = e;
  const {
    width,
    height,
    x: cellX,
    y: cellY
  } = bounds;
  const maxWidth = (_cell$maxSize = cell.maxSize) !== null && _cell$maxSize !== void 0 ? _cell$maxSize : theme.checkboxMaxSize;
  const cellCenterY = Math.floor(bounds.y + height / 2);
  const checkBoxWidth = getSquareWidth(maxWidth, height, theme.cellVerticalPadding);
  const posX = getSquareXPosFromAlign((_cell$contentAlign = cell.contentAlign) !== null && _cell$contentAlign !== void 0 ? _cell$contentAlign : "center", cellX, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = getSquareBB(posX, cellCenterY, checkBoxWidth);
  const checkBoxClicked = pointIsWithinBB(cellX + pointerX, cellY + pointerY, bb);
  return booleanCellIsEditable(cell) && checkBoxClicked;
}
const booleanCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "false";
  },
  kind: GridCellKind.Boolean,
  needsHover: true,
  useLabel: false,
  needsHoverPosition: true,
  measure: () => 50,
  draw: (a) => {
    var _a$cell$maxSize, _a$cell$hoverEffectIn;
    return drawBoolean(a, a.cell.data, booleanCellIsEditable(a.cell), (_a$cell$maxSize = a.cell.maxSize) !== null && _a$cell$maxSize !== void 0 ? _a$cell$maxSize : a.theme.checkboxMaxSize, (_a$cell$hoverEffectIn = a.cell.hoverEffectIntensity) !== null && _a$cell$hoverEffectIn !== void 0 ? _a$cell$hoverEffectIn : 0.35);
  },
  onDelete: (c) => ({
    ...c,
    data: false
  }),
  onSelect: (e) => {
    if (isOverEditableRegion(e)) {
      e.preventDefault();
    }
  },
  onClick: (e) => {
    if (isOverEditableRegion(e)) {
      return {
        ...e.cell,
        data: toggleBoolean(e.cell.data)
      };
    }
    return void 0;
  },
  onPaste: (toPaste, cell) => {
    let newVal = BooleanEmpty;
    if (toPaste.toLowerCase() === "true") {
      newVal = true;
    } else if (toPaste.toLowerCase() === "false") {
      newVal = false;
    } else if (toPaste.toLowerCase() === "indeterminate") {
      newVal = BooleanIndeterminate;
    }
    return newVal === cell.data ? void 0 : {
      ...cell,
      data: newVal
    };
  }
};
function drawBoolean(args, data, canEdit, maxSize, hoverEffectIntensity) {
  if (!canEdit && data === BooleanEmpty) {
    return;
  }
  const {
    ctx,
    hoverAmount,
    theme,
    rect,
    highlighted,
    hoverX,
    hoverY,
    cell: {
      contentAlign
    }
  } = args;
  const {
    x,
    y,
    width: w2,
    height: h
  } = rect;
  let shouldRestoreAlpha = false;
  if (hoverEffectIntensity > 0) {
    let alpha = canEdit ? 1 - hoverEffectIntensity + hoverEffectIntensity * hoverAmount : 0.4;
    if (data === BooleanEmpty) {
      alpha *= hoverAmount;
    }
    if (alpha === 0) {
      return;
    }
    if (alpha < 1) {
      shouldRestoreAlpha = true;
      ctx.globalAlpha = alpha;
    }
  }
  drawCheckbox(ctx, theme, data, x, y, w2, h, highlighted, hoverX, hoverY, maxSize, contentAlign);
  if (shouldRestoreAlpha) {
    ctx.globalAlpha = 1;
  }
}
const BubblesOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "BubblesOverlayEditorStyle",
  class: "gdg-b1u3f35e",
  propsAsIs: false
});
const BubblesOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(7);
  const {
    bubbles
  } = p2;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  let t0;
  if ($[0] !== bubbles) {
    t0 = bubbles.map(_temp$2);
    $[0] = bubbles;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const t1 = !isGhostMode;
  let t2;
  if ($[2] !== t1) {
    t2 = /* @__PURE__ */ jsx("textarea", { className: "gdg-input", autoFocus: t1 });
    $[2] = t1;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  let t3;
  if ($[4] !== t0 || $[5] !== t2) {
    t3 = /* @__PURE__ */ jsxs(BubblesOverlayEditorStyle, { children: [
      t0,
      t2
    ] });
    $[4] = t0;
    $[5] = t2;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
};
function _temp$2(b2, i) {
  return /* @__PURE__ */ jsx("div", { className: "boe-bubble", children: b2 }, i);
}
const bubbleCellRenderer = {
  getAccessibilityString: (c) => makeAccessibilityStringForArray(c.data),
  kind: GridCellKind.Bubble,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, theme) => {
    const bubblesWidth = cell.data.reduce((acc, data) => ctx.measureText(data).width + acc + theme.bubblePadding * 2 + theme.bubbleMargin, 0);
    if (cell.data.length === 0) return theme.cellHorizontalPadding * 2;
    return bubblesWidth + 2 * theme.cellHorizontalPadding - theme.bubbleMargin;
  },
  draw: (a) => drawBubbles(a, a.cell.data),
  provideEditor: () => (p2) => {
    const {
      value
    } = p2;
    return /* @__PURE__ */ jsx(BubblesOverlayEditor, { bubbles: value.data });
  },
  onPaste: () => void 0
};
function drawBubbles(args, data) {
  const {
    rect,
    theme,
    ctx,
    highlighted
  } = args;
  const {
    x,
    y,
    width: w2,
    height: h
  } = rect;
  let renderX = x + theme.cellHorizontalPadding;
  const renderBoxes = [];
  for (const s of data) {
    if (renderX > x + w2) break;
    const textWidth = measureTextCached(s, ctx, theme.baseFontFull).width;
    renderBoxes.push({
      x: renderX,
      width: textWidth
    });
    renderX += textWidth + theme.bubblePadding * 2 + theme.bubbleMargin;
  }
  ctx.beginPath();
  for (const rectInfo of renderBoxes) {
    var _theme$roundingRadius;
    roundedRect(ctx, rectInfo.x, y + (h - theme.bubbleHeight) / 2, rectInfo.width + theme.bubblePadding * 2, theme.bubbleHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : theme.bubbleHeight / 2);
  }
  ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
  ctx.fill();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(data[i], rectInfo.x + theme.bubblePadding, y + h / 2 + getMiddleCenterBias(ctx, theme));
  }
}
const DrilldownOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "DrilldownOverlayEditorStyle",
  class: "gdg-d1aves4e",
  propsAsIs: false
});
const DrilldownOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(4);
  const {
    drilldowns
  } = p2;
  let t0;
  if ($[0] !== drilldowns) {
    t0 = drilldowns.map(_temp$1);
    $[0] = drilldowns;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== t0) {
    t1 = /* @__PURE__ */ jsx(DrilldownOverlayEditorStyle, {
      children: t0
    });
    $[2] = t0;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  return t1;
};
function _temp$1(d2, i) {
  return /* @__PURE__ */ jsxs("div", {
    className: "doe-bubble",
    children: [d2.img !== void 0 && /* @__PURE__ */ jsx("img", {
      src: d2.img
    }), /* @__PURE__ */ jsx("div", {
      children: d2.text
    })]
  }, i);
}
const drilldownCellRenderer = {
  getAccessibilityString: (c) => makeAccessibilityStringForArray(c.data.map((d2) => d2.text)),
  kind: GridCellKind.Drilldown,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, theme) => cell.data.reduce((acc, data) => ctx.measureText(data.text).width + acc + theme.bubblePadding * 2 + theme.bubbleMargin + (data.img !== void 0 ? 18 : 0), 0) + 2 * theme.cellHorizontalPadding - 4,
  draw: (a) => drawDrilldownCell(a, a.cell.data),
  provideEditor: () => (p2) => {
    const {
      value
    } = p2;
    return /* @__PURE__ */ jsx(DrilldownOverlayEditor, { drilldowns: value.data });
  },
  onPaste: () => void 0
};
const drilldownCache = {};
function getAndCacheDrilldownBorder(bgCell, border, height, rounding) {
  const dpr = Math.ceil(window.devicePixelRatio);
  const shadowBlur = 5;
  const targetHeight = height - shadowBlur * 2;
  const middleWidth = 4;
  const innerHeight = height * dpr;
  const sideWidth = rounding + shadowBlur;
  const targetWidth = rounding * 3;
  const innerWidth = (targetWidth + shadowBlur * 2) * dpr;
  const key = `${bgCell},${border},${dpr},${height}`;
  if (drilldownCache[key] !== void 0) {
    return {
      el: drilldownCache[key],
      height: innerHeight,
      width: innerWidth,
      middleWidth: middleWidth * dpr,
      sideWidth: sideWidth * dpr,
      padding: shadowBlur * dpr,
      dpr
    };
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  ctx.scale(dpr, dpr);
  drilldownCache[key] = canvas;
  ctx.beginPath();
  roundedRect(ctx, shadowBlur, shadowBlur, targetWidth, targetHeight, rounding);
  ctx.shadowColor = "rgba(24, 25, 34, 0.4)";
  ctx.shadowBlur = 1;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowColor = "rgba(24, 25, 34, 0.3)";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 5;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  roundedRect(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetWidth, targetHeight, rounding);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.stroke();
  return {
    el: canvas,
    height: innerHeight,
    width: innerWidth,
    sideWidth: sideWidth * dpr,
    middleWidth: rounding * dpr,
    padding: shadowBlur * dpr,
    dpr
  };
}
function drawDrilldownCell(args, data) {
  var _theme$roundingRadius;
  const {
    rect,
    theme,
    ctx,
    imageLoader,
    col,
    row
  } = args;
  const {
    x,
    width: w2
  } = rect;
  const font = theme.baseFontFull;
  const emHeight = getEmHeight(ctx, font);
  const h = Math.min(rect.height, Math.max(16, Math.ceil(emHeight * theme.lineHeight) * 2));
  const y = Math.floor(rect.y + (rect.height - h) / 2);
  const bubbleHeight = h - 10;
  const bubblePad = theme.bubblePadding;
  const bubbleMargin = theme.bubbleMargin;
  let renderX = x + theme.cellHorizontalPadding;
  const rounding = (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 6;
  const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder, h, rounding);
  const renderBoxes = [];
  for (const el of data) {
    if (renderX > x + w2) break;
    const textMetrics = measureTextCached(el.text, ctx, font);
    const textWidth = textMetrics.width;
    let imgWidth = 0;
    if (el.img !== void 0) {
      const img = imageLoader.loadOrGetImage(el.img, col, row);
      if (img !== void 0) {
        imgWidth = bubbleHeight - 8 + 4;
      }
    }
    const renderWidth = textWidth + imgWidth + bubblePad * 2;
    renderBoxes.push({
      x: renderX,
      width: renderWidth
    });
    renderX += renderWidth + bubbleMargin;
  }
  if (tileMap !== null) {
    const {
      el,
      height,
      middleWidth,
      sideWidth,
      width,
      dpr,
      padding
    } = tileMap;
    const outerSideWidth = sideWidth / dpr;
    const outerPadding = padding / dpr;
    for (const rectInfo of renderBoxes) {
      const rx = Math.floor(rectInfo.x);
      const rw = Math.floor(rectInfo.width);
      const outerMiddleWidth = rw - (outerSideWidth - outerPadding) * 2;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(el, 0, 0, sideWidth, height, rx - outerPadding, y, outerSideWidth, h);
      if (outerMiddleWidth > 0) ctx.drawImage(el, sideWidth, 0, middleWidth, height, rx + (outerSideWidth - outerPadding), y, outerMiddleWidth, h);
      ctx.drawImage(el, width - sideWidth, 0, sideWidth, height, rx + rw - (outerSideWidth - outerPadding), y, outerSideWidth, h);
      ctx.imageSmoothingEnabled = true;
    }
  }
  ctx.beginPath();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    const d2 = data[i];
    let drawX = rectInfo.x + bubblePad;
    if (d2.img !== void 0) {
      const img = imageLoader.loadOrGetImage(d2.img, col, row);
      if (img !== void 0) {
        var _theme$roundingRadius2;
        const imgSize = bubbleHeight - 8;
        let srcX = 0;
        let srcY = 0;
        let srcWidth = img.width;
        let srcHeight = img.height;
        if (srcWidth > srcHeight) {
          srcX += (srcWidth - srcHeight) / 2;
          srcWidth = srcHeight;
        } else if (srcHeight > srcWidth) {
          srcY += (srcHeight - srcWidth) / 2;
          srcHeight = srcWidth;
        }
        ctx.beginPath();
        roundedRect(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, (_theme$roundingRadius2 = theme.roundingRadius) !== null && _theme$roundingRadius2 !== void 0 ? _theme$roundingRadius2 : 3);
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize);
        ctx.restore();
        drawX += imgSize + 4;
      }
    }
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(d2.text, drawX, y + h / 2 + getMiddleCenterBias(ctx, theme));
  }
}
const imageCellRenderer = {
  getAccessibilityString: (c) => c.data.join(", "),
  kind: GridCellKind.Image,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  draw: (a) => {
    var _a$cell$displayData, _ref, _a$cell$rounding;
    return drawImage(a, (_a$cell$displayData = a.cell.displayData) !== null && _a$cell$displayData !== void 0 ? _a$cell$displayData : a.cell.data, (_ref = (_a$cell$rounding = a.cell.rounding) !== null && _a$cell$rounding !== void 0 ? _a$cell$rounding : a.theme.roundingRadius) !== null && _ref !== void 0 ? _ref : 4, a.cell.contentAlign);
  },
  measure: (_ctx, cell) => cell.data.length * 50,
  onDelete: (c) => ({
    ...c,
    data: []
  }),
  provideEditor: () => (p2) => {
    const {
      value,
      onFinishedEditing,
      imageEditorOverride
    } = p2;
    const ImageEditor = imageEditorOverride !== null && imageEditorOverride !== void 0 ? imageEditorOverride : ImageOverlayEditor;
    return /* @__PURE__ */ jsx(ImageEditor, { urls: value.data, canWrite: value.readonly !== true, onCancel: onFinishedEditing, onChange: (newImage) => {
      onFinishedEditing({
        ...value,
        data: [newImage]
      });
    } });
  },
  onPaste: (toPaste, cell) => {
    toPaste = toPaste.trim();
    const fragments = toPaste.split(",");
    const uris = fragments.map((f) => {
      try {
        new URL(f);
        return f;
      } catch {
        return void 0;
      }
    }).filter((x) => x !== void 0);
    if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i])) return void 0;
    return {
      ...cell,
      data: uris
    };
  }
};
const itemMargin = 4;
function drawImage(args, data, rounding, contentAlign) {
  const {
    rect,
    col,
    row,
    theme,
    ctx,
    imageLoader
  } = args;
  const {
    x,
    y,
    height: h,
    width: w2
  } = rect;
  const imgHeight = h - theme.cellVerticalPadding * 2;
  const images = [];
  let totalWidth = 0;
  for (let index = 0; index < data.length; index++) {
    const i = data[index];
    if (i.length === 0) continue;
    const img = imageLoader.loadOrGetImage(i, col, row);
    if (img !== void 0) {
      images[index] = img;
      const imgWidth = img.width * (imgHeight / img.height);
      totalWidth += imgWidth + itemMargin;
    }
  }
  if (totalWidth === 0) return;
  totalWidth -= itemMargin;
  let drawX = x + theme.cellHorizontalPadding;
  if (contentAlign === "right") drawX = Math.floor(x + w2 - theme.cellHorizontalPadding - totalWidth);
  else if (contentAlign === "center") drawX = Math.floor(x + w2 / 2 - totalWidth / 2);
  for (const img of images) {
    if (img === void 0) continue;
    const imgWidth = img.width * (imgHeight / img.height);
    if (rounding > 0) {
      ctx.beginPath();
      roundedRect(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, rounding);
      ctx.save();
      ctx.clip();
    }
    ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
    if (rounding > 0) {
      ctx.restore();
    }
    drawX += imgWidth + itemMargin;
  }
}
function getRandomNumber(x, y) {
  let seed = x * 49632 + y * 325176;
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed / 4294967295 * 2;
}
const loadingCellRenderer = {
  getAccessibilityString: () => "",
  kind: GridCellKind.Loading,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: () => 120,
  draw: (a) => {
    var _cell$skeletonHeight, _theme$roundingRadius;
    const {
      cell,
      col,
      row,
      ctx,
      rect,
      theme
    } = a;
    if (cell.skeletonWidth === void 0 || cell.skeletonWidth === 0) {
      return;
    }
    let width = cell.skeletonWidth;
    if (cell.skeletonWidthVariability !== void 0 && cell.skeletonWidthVariability > 0) {
      width += Math.round(getRandomNumber(col, row) * cell.skeletonWidthVariability);
    }
    const hpad = theme.cellHorizontalPadding;
    if (width + hpad * 2 >= rect.width) {
      width = rect.width - hpad * 2 - 1;
    }
    const rectHeight = (_cell$skeletonHeight = cell.skeletonHeight) !== null && _cell$skeletonHeight !== void 0 ? _cell$skeletonHeight : Math.min(18, rect.height - 2 * theme.cellVerticalPadding);
    roundedRect(ctx, rect.x + hpad, rect.y + (rect.height - rectHeight) / 2, width, rectHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 3);
    ctx.fillStyle = withAlpha(theme.textDark, 0.1);
    ctx.fill();
  },
  onPaste: () => void 0
};
const _exp = () => (p2) => p2.targetWidth;
const MarkdownOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "MarkdownOverlayEditorStyle",
  class: "gdg-m1lue1td",
  propsAsIs: false,
  vars: {
    "m1lue1td-0": [_exp(), "px"]
  }
});
const MarkdownOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(30);
  const {
    value,
    onChange,
    forceEditMode,
    createNode,
    targetRect,
    onFinish,
    validatedSelection
  } = p2;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  const markdown = value.data;
  const readonly = value.readonly === true;
  const [editMode, setEditMode] = React.useState(markdown === "" || forceEditMode);
  let t0;
  if ($[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      setEditMode(_temp);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onEditClick = t0;
  const addLeftPad = markdown ? "gdg-ml-6" : "";
  if (editMode) {
    const t12 = targetRect.width - 20;
    const t22 = !isGhostMode;
    let t32;
    if ($[1] !== markdown || $[2] !== onChange || $[3] !== t22 || $[4] !== validatedSelection) {
      t32 = /* @__PURE__ */ jsx(GrowingEntry, { autoFocus: t22, highlight: false, validatedSelection, value: markdown, onKeyDown: _temp2, onChange });
      $[1] = markdown;
      $[2] = onChange;
      $[3] = t22;
      $[4] = validatedSelection;
      $[5] = t32;
    } else {
      t32 = $[5];
    }
    const t42 = `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`;
    let t52;
    if ($[6] !== onFinish || $[7] !== value) {
      t52 = () => onFinish(value);
      $[6] = onFinish;
      $[7] = value;
      $[8] = t52;
    } else {
      t52 = $[8];
    }
    let t6;
    if ($[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
      t6 = /* @__PURE__ */ jsx(Checkmark, {});
      $[9] = t6;
    } else {
      t6 = $[9];
    }
    let t7;
    if ($[10] !== t42 || $[11] !== t52) {
      t7 = /* @__PURE__ */ jsx("div", { className: t42, onClick: t52, children: t6 });
      $[10] = t42;
      $[11] = t52;
      $[12] = t7;
    } else {
      t7 = $[12];
    }
    let t8;
    if ($[13] !== t12 || $[14] !== t32 || $[15] !== t7) {
      t8 = /* @__PURE__ */ jsxs(MarkdownOverlayEditorStyle, { targetWidth: t12, children: [
        t32,
        t7
      ] });
      $[13] = t12;
      $[14] = t32;
      $[15] = t7;
      $[16] = t8;
    } else {
      t8 = $[16];
    }
    return t8;
  }
  let t1;
  if ($[17] !== createNode || $[18] !== markdown) {
    t1 = /* @__PURE__ */ jsx(MarkdownDiv, { contents: markdown, createNode });
    $[17] = createNode;
    $[18] = markdown;
    $[19] = t1;
  } else {
    t1 = $[19];
  }
  let t2;
  if ($[20] !== addLeftPad || $[21] !== readonly) {
    t2 = !readonly && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsx("div", { className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`, onClick: onEditClick, children: /* @__PURE__ */ jsx(EditPencil, {}) })
    ] });
    $[20] = addLeftPad;
    $[21] = readonly;
    $[22] = t2;
  } else {
    t2 = $[22];
  }
  const t3 = !isGhostMode;
  let t4;
  if ($[23] !== t3) {
    t4 = /* @__PURE__ */ jsx("textarea", { className: "gdg-md-edit-textarea gdg-input", autoFocus: t3 });
    $[23] = t3;
    $[24] = t4;
  } else {
    t4 = $[24];
  }
  let t5;
  if ($[25] !== t1 || $[26] !== t2 || $[27] !== t4 || $[28] !== targetRect.width) {
    t5 = /* @__PURE__ */ jsxs(MarkdownOverlayEditorStyle, { targetWidth: targetRect.width, children: [
      t1,
      t2,
      t4
    ] });
    $[25] = t1;
    $[26] = t2;
    $[27] = t4;
    $[28] = targetRect.width;
    $[29] = t5;
  } else {
    t5 = $[29];
  }
  return t5;
};
function _temp(e) {
  return !e;
}
function _temp2(e_0) {
  if (e_0.key === "Enter") {
    e_0.stopPropagation();
  }
}
const markdownCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: GridCellKind.Markdown,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: prepTextCell,
  measure: (ctx, cell, t) => {
    const firstLine = cell.data.split("\n")[0];
    return ctx.measureText(firstLine).width + 2 * t.cellHorizontalPadding;
  },
  draw: (a) => drawTextCell(a, a.cell.data, a.cell.contentAlign),
  onDelete: (c) => ({
    ...c,
    data: ""
  }),
  provideEditor: () => (p2) => {
    const {
      onChange,
      value,
      target,
      onFinishedEditing,
      markdownDivCreateNode,
      forceEditMode,
      validatedSelection
    } = p2;
    return /* @__PURE__ */ jsx(MarkdownOverlayEditor, { onFinish: onFinishedEditing, targetRect: target, value, validatedSelection, onChange: (e) => onChange({
      ...value,
      data: e.target.value
    }), forceEditMode, createNode: markdownDivCreateNode });
  },
  onPaste: (toPaste, cell) => toPaste === cell.data ? void 0 : {
    ...cell,
    data: toPaste
  }
};
const markerCellRenderer = {
  getAccessibilityString: (c) => c.row.toString(),
  kind: InnerGridCellKind.Marker,
  needsHover: true,
  needsHoverPosition: false,
  drawPrep: prepMarkerRowCell,
  measure: () => 44,
  draw: (a) => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle, a.cell.checkboxStyle, a.cell.disabled),
  onClick: (e) => {
    const {
      bounds,
      cell,
      posX: x,
      posY: y
    } = e;
    if (cell.disabled === true) return;
    const {
      width,
      height
    } = bounds;
    const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
    const centerY = height / 2;
    if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
      return {
        ...cell,
        checked: !cell.checked
      };
    }
    return void 0;
  },
  onPaste: () => void 0
};
function prepMarkerRowCell(args, lastPrep) {
  const {
    ctx,
    theme
  } = args;
  const newFont = theme.markerFontFull;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepMarkerRowCell;
  ctx.textAlign = "center";
  return result;
}
function deprepMarkerRowCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawMarkerRowCell(args, index, checked, markerKind, drawHandle, style, disabled) {
  if (disabled) {
    const {
      ctx: ctx2,
      rect: rect2,
      theme: theme2
    } = args;
    const {
      x: x2,
      y: y2,
      width: width2,
      height: height2
    } = rect2;
    const mKind = markerKind === "checkbox" ? "checkbox-visible" : markerKind;
    if (mKind !== "number") {
      ctx2.globalAlpha = checked ? 1 : 0.4;
      drawCheckbox(ctx2, theme2, checked, drawHandle ? x2 + 7 : x2, y2, drawHandle ? width2 - 7 : width2, height2, false, -20, -20, theme2.checkboxMaxSize, "center", style, true);
      ctx2.globalAlpha = 1;
    }
    if (mKind === "number" || mKind === "both" && !checked) {
      const text = index.toString();
      const fontStyle = theme2.markerFontFull;
      const start = x2 + width2 / 2;
      ctx2.fillStyle = "#cccccc";
      ctx2.font = fontStyle;
      ctx2.fillText(text, start, y2 + height2 / 2 + getMiddleCenterBias(ctx2, fontStyle));
    }
    if (drawHandle) {
      ctx2.globalAlpha = 0.4;
      ctx2.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx2.rect(x2 + xOffset, y2 + height2 / 2 + yOffset, 2, 2);
        }
      }
      ctx2.fillStyle = "#cccccc";
      ctx2.fill();
      ctx2.beginPath();
      ctx2.globalAlpha = 1;
    }
    return;
  }
  const {
    ctx,
    rect,
    hoverAmount,
    theme
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const checkedboxAlpha = checked ? 1 : markerKind === "checkbox-visible" ? 0.6 + 0.4 * hoverAmount : hoverAmount;
  if (markerKind !== "number" && checkedboxAlpha > 0) {
    ctx.globalAlpha = checkedboxAlpha;
    const offsetAmount = 7 * (checked ? hoverAmount : 1);
    drawCheckbox(ctx, theme, checked, drawHandle ? x + offsetAmount : x, y, drawHandle ? width - offsetAmount : width, height, true, void 0, void 0, theme.checkboxMaxSize, "center", style, disabled);
    if (drawHandle) {
      ctx.globalAlpha = hoverAmount;
      ctx.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
        }
      }
      ctx.fillStyle = theme.textLight;
      ctx.fill();
      ctx.beginPath();
    }
    ctx.globalAlpha = 1;
  }
  if (markerKind === "number" || markerKind === "both" && !checked) {
    const text = index.toString();
    const fontStyle = theme.markerFontFull;
    const start = x + width / 2;
    if (markerKind === "both" && hoverAmount !== 0) {
      ctx.globalAlpha = 1 - hoverAmount;
    }
    ctx.fillStyle = theme.textLight;
    ctx.font = fontStyle;
    ctx.fillText(text, start, y + height / 2 + getMiddleCenterBias(ctx, fontStyle));
    if (hoverAmount !== 0) {
      ctx.globalAlpha = 1;
    }
  }
}
const newRowCellRenderer = {
  getAccessibilityString: () => "",
  kind: InnerGridCellKind.NewRow,
  needsHover: true,
  needsHoverPosition: false,
  measure: () => 200,
  draw: (a) => drawNewRowCell(a, a.cell.hint, a.cell.icon),
  onPaste: () => void 0
};
function drawNewRowCell(args, data, icon) {
  const {
    ctx,
    rect,
    hoverAmount,
    theme,
    spriteManager
  } = args;
  const {
    x,
    y,
    width: w2,
    height: h
  } = rect;
  ctx.beginPath();
  ctx.globalAlpha = hoverAmount;
  ctx.rect(x + 1, y + 1, w2, h - 2);
  ctx.fillStyle = theme.bgHeaderHovered;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  const alwaysShowIcon = data !== "";
  let textX = 0;
  if (icon !== void 0) {
    const padding = 8;
    const size = h - padding;
    const px = x + padding / 2;
    const py = y + padding / 2;
    spriteManager.drawSprite(icon, "normal", ctx, px, py, size, theme, alwaysShowIcon ? 1 : hoverAmount);
    textX = size;
  } else {
    textX = 24;
    const finalLineSize = 12;
    const lineSize = alwaysShowIcon ? finalLineSize : hoverAmount * finalLineSize;
    const xTranslate = alwaysShowIcon ? 0 : (1 - hoverAmount) * finalLineSize * 0.5;
    const padPlus = theme.cellHorizontalPadding + 4;
    if (lineSize > 0) {
      ctx.moveTo(x + padPlus + xTranslate, y + h / 2);
      ctx.lineTo(x + padPlus + xTranslate + lineSize, y + h / 2);
      ctx.moveTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 - lineSize * 0.5);
      ctx.lineTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 + lineSize * 0.5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.bgIconHeader;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
  ctx.fillStyle = theme.textMedium;
  ctx.fillText(data, textX + x + theme.cellHorizontalPadding + 0.5, y + h / 2 + getMiddleCenterBias(ctx, theme));
  ctx.beginPath();
}
function drawEditHoverIndicator(ctx, theme, effectTheme, displayData, rect, hoverAmount, overrideCursor) {
  var _effectTheme$fullSize, _theme$roundingRadius, _effectTheme$bgColor;
  ctx.textBaseline = "alphabetic";
  const effectRect = getHoverEffectRect(ctx, rect, displayData, theme, (_effectTheme$fullSize = effectTheme === null || effectTheme === void 0 ? void 0 : effectTheme.fullSize) !== null && _effectTheme$fullSize !== void 0 ? _effectTheme$fullSize : false);
  ctx.beginPath();
  roundedRect(ctx, effectRect.x, effectRect.y, effectRect.width, effectRect.height, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4);
  ctx.globalAlpha = hoverAmount;
  ctx.fillStyle = (_effectTheme$bgColor = effectTheme === null || effectTheme === void 0 ? void 0 : effectTheme.bgColor) !== null && _effectTheme$bgColor !== void 0 ? _effectTheme$bgColor : withAlpha(theme.textDark, 0.1);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = theme.textDark;
  ctx.textBaseline = "middle";
  overrideCursor === null || overrideCursor === void 0 || overrideCursor("text");
}
function getHoverEffectRect(ctx, cellRect, displayData, theme, fullSize) {
  const padX = theme.cellHorizontalPadding;
  const padY = theme.cellVerticalPadding;
  if (fullSize) {
    return {
      x: cellRect.x + padX / 2,
      y: cellRect.y + padY / 2 + 1,
      width: cellRect.width - padX,
      height: cellRect.height - padY - 1
    };
  }
  const m = measureTextCached(displayData, ctx, theme.baseFontFull, "alphabetic");
  const maxH = cellRect.height - padY;
  const h = Math.min(maxH, m.actualBoundingBoxAscent * 2.5);
  return {
    x: cellRect.x + padX / 2,
    y: cellRect.y + (cellRect.height - h) / 2 + 1,
    width: m.width + padX * 3,
    height: h - 1
  };
}
const NumberOverlayEditor$1 = React.lazy(async () => await Promise.resolve().then(() => numberOverlayEditor));
const numberCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: GridCellKind.Number,
  needsHover: (cell) => cell.hoverEffect === true,
  needsHoverPosition: false,
  useLabel: true,
  drawPrep: prepTextCell,
  draw: (a) => {
    const {
      hoverAmount,
      cell,
      ctx,
      theme,
      rect,
      overrideCursor
    } = a;
    const {
      hoverEffect,
      displayData,
      hoverEffectTheme
    } = cell;
    if (hoverEffect === true && hoverAmount > 0) {
      drawEditHoverIndicator(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
    }
    drawTextCell(a, a.cell.displayData, a.cell.contentAlign);
  },
  measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
  onDelete: (c) => ({
    ...c,
    data: void 0
  }),
  provideEditor: () => (p2) => {
    const {
      isHighlighted,
      onChange,
      onFinishedEditing,
      value,
      validatedSelection
    } = p2;
    return /* @__PURE__ */ jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(NumberOverlayEditor$1, { highlight: isHighlighted, disabled: value.readonly === true, value: value.data, fixedDecimals: value.fixedDecimals, allowNegative: value.allowNegative, thousandSeparator: value.thousandSeparator, decimalSeparator: value.decimalSeparator, validatedSelection, onChange: (x) => {
      var _x$floatValue;
      return onChange({
        ...value,
        data: Number.isNaN((_x$floatValue = x.floatValue) !== null && _x$floatValue !== void 0 ? _x$floatValue : 0) ? 0 : x.floatValue
      });
    }, onKeyDown: (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onFinishedEditing(value, [0, 1]);
      } else if (e.key === "Tab") {
        e.preventDefault();
        onFinishedEditing(value, [e.shiftKey ? -1 : 1, 0]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onFinishedEditing(void 0, [0, 0]);
      }
    } }) });
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    const newNumber = typeof details.rawValue === "number" ? details.rawValue : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
    if (Number.isNaN(newNumber) || cell.data === newNumber) return void 0;
    return {
      ...cell,
      data: newNumber,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
const protectedCellRenderer = {
  getAccessibilityString: () => "",
  measure: () => 108,
  kind: GridCellKind.Protected,
  needsHover: false,
  needsHoverPosition: false,
  draw: drawProtectedCell,
  onPaste: () => void 0
};
function drawProtectedCell(args) {
  const {
    ctx,
    theme,
    rect
  } = args;
  const {
    x,
    y,
    height: h
  } = rect;
  ctx.beginPath();
  const radius = 2.5;
  let xStart = x + theme.cellHorizontalPadding + radius;
  const center = y + h / 2;
  const p2 = Math.cos(degreesToRadians(30)) * radius;
  const q = Math.sin(degreesToRadians(30)) * radius;
  for (let i = 0; i < 12; i++) {
    ctx.moveTo(xStart, center - radius);
    ctx.lineTo(xStart, center + radius);
    ctx.moveTo(xStart + p2, center - q);
    ctx.lineTo(xStart - p2, center + q);
    ctx.moveTo(xStart - p2, center - q);
    ctx.lineTo(xStart + p2, center + q);
    xStart += 8;
  }
  ctx.lineWidth = 1.1;
  ctx.lineCap = "square";
  ctx.strokeStyle = theme.textLight;
  ctx.stroke();
}
const rowIDCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$rowId;
    return (_c$rowId = c.rowId) !== null && _c$rowId !== void 0 ? _c$rowId : "";
  },
  kind: InnerGridCellKind.RowId,
  needsHover: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => {
    var _cell$rowId;
    const textWidth = measureTextCached((_cell$rowId = cell.rowId) !== null && _cell$rowId !== void 0 ? _cell$rowId : "", ctx, t.baseFontStyle).width;
    return textWidth + t.cellHorizontalPadding * 2;
  },
  draw: (args) => {
    const {
      ctx,
      rect,
      cell,
      theme
    } = args;
    const rowId = cell.rowId;
    if (!rowId) return;
    ctx.fillStyle = theme.textDark;
    ctx.font = theme.baseFontStyle;
    ctx.textAlign = "left";
    const x = rect.x + theme.cellHorizontalPadding;
    const centerY = rect.y + rect.height / 2;
    ctx.fillText(rowId, x, centerY + getMiddleCenterBias(ctx, theme));
  },
  onClick: () => void 0,
  onPaste: () => void 0
};
const rowIdMarkerCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$rowId;
    return (_c$rowId = c.rowId) !== null && _c$rowId !== void 0 ? _c$rowId : "";
  },
  kind: InnerGridCellKind.RowId,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: prepRowIdMarkerCell,
  measure: () => 80,
  draw: (a) => drawRowIdMarkerCell(a, a.cell.rowId),
  onClick: () => void 0,
  onPaste: () => void 0
};
function prepRowIdMarkerCell(args, lastPrep) {
  const {
    ctx
  } = args;
  const newFont = "12px sans-serif";
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepRowIdMarkerCell;
  ctx.textAlign = "left";
  return result;
}
function deprepRowIdMarkerCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawRowIdMarkerCell(args, rowId) {
  if (!rowId) return;
  const {
    ctx,
    rect,
    theme
  } = args;
  const {
    x,
    y,
    height
  } = rect;
  ctx.fillStyle = theme.textDark;
  ctx.font = "12px sans-serif";
  const textX = x + 8;
  const centerY = y + height / 2;
  ctx.fillText(rowId, textX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
const rowStatusCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$status;
    return (_c$status = c.status) !== null && _c$status !== void 0 ? _c$status : "";
  },
  kind: InnerGridCellKind.RowStatus,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: prepRowStatusCell,
  measure: () => 40,
  draw: (a) => drawRowStatusCell(a, a.cell.status),
  onClick: () => void 0,
  onPaste: () => void 0
};
function prepRowStatusCell(args, lastPrep) {
  const {
    ctx
  } = args;
  const newFont = "bold 14px sans-serif";
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepRowStatusCell;
  ctx.textAlign = "center";
  return result;
}
function deprepRowStatusCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawRowStatusCell(args, status) {
  if (!status) return;
  const {
    ctx,
    rect
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const colors = {
    A: "#2e7d32",
    U: "#f9a825",
    D: "#c62828"
  };
  ctx.fillStyle = colors[status];
  ctx.font = "bold 14px sans-serif";
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  ctx.fillText(status, centerX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
const textCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: GridCellKind.Text,
  needsHover: (textCell) => textCell.hoverEffect === true,
  needsHoverPosition: false,
  drawPrep: prepTextCell,
  useLabel: true,
  draw: (a) => {
    const {
      cell,
      hoverAmount,
      hyperWrapping,
      ctx,
      rect,
      theme,
      overrideCursor
    } = a;
    const {
      displayData,
      contentAlign,
      hoverEffect,
      allowWrapping,
      hoverEffectTheme
    } = cell;
    if (hoverEffect === true && hoverAmount > 0) {
      drawEditHoverIndicator(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
    }
    drawTextCell(a, displayData, contentAlign, allowWrapping, hyperWrapping);
  },
  measure: (ctx, cell, t) => {
    const lines = cell.displayData.split("\n", cell.allowWrapping === true ? void 0 : 1);
    let maxLineWidth = 0;
    for (const line of lines) {
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
    }
    return maxLineWidth + 2 * t.cellHorizontalPadding;
  },
  onDelete: (c) => ({
    ...c,
    data: ""
  }),
  provideEditor: (cell) => ({
    disablePadding: cell.allowWrapping === true,
    editor: (p2) => {
      const {
        isHighlighted,
        onChange,
        value,
        validatedSelection
      } = p2;
      return /* @__PURE__ */ jsx(GrowingEntry, { style: cell.allowWrapping === true ? {
        padding: "3px 8.5px"
      } : void 0, highlight: isHighlighted, autoFocus: value.readonly !== true, disabled: value.readonly === true, altNewline: true, value: value.data, validatedSelection, onChange: (e) => onChange({
        ...value,
        data: e.target.value
      }) });
    }
  }),
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? void 0 : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
const UriOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "UriOverlayEditorStyle",
  class: "gdg-u1nlzx18",
  propsAsIs: false
});
const UriOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(17);
  const {
    uri,
    onChange,
    forceEditMode,
    readonly,
    validatedSelection,
    preview
  } = p2;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  const [editMode, setEditMode] = React.useState(!readonly && (uri === "" || forceEditMode));
  let t0;
  if ($[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      setEditMode(true);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onEditClick = t0;
  if (editMode) {
    const t12 = !isGhostMode;
    let t22;
    if ($[1] !== onChange || $[2] !== t12 || $[3] !== uri || $[4] !== validatedSelection) {
      t22 = /* @__PURE__ */ jsx(GrowingEntry, { validatedSelection, highlight: true, autoFocus: t12, value: uri, onChange });
      $[1] = onChange;
      $[2] = t12;
      $[3] = uri;
      $[4] = validatedSelection;
      $[5] = t22;
    } else {
      t22 = $[5];
    }
    return t22;
  }
  let t1;
  if ($[6] !== preview || $[7] !== uri) {
    t1 = /* @__PURE__ */ jsx("a", { className: "gdg-link-area", href: uri, target: "_blank", rel: "noopener noreferrer", children: preview });
    $[6] = preview;
    $[7] = uri;
    $[8] = t1;
  } else {
    t1 = $[8];
  }
  let t2;
  if ($[9] !== readonly) {
    t2 = !readonly && /* @__PURE__ */ jsx("div", { className: "gdg-edit-icon", onClick: onEditClick, children: /* @__PURE__ */ jsx(EditPencil, {}) });
    $[9] = readonly;
    $[10] = t2;
  } else {
    t2 = $[10];
  }
  const t3 = !isGhostMode;
  let t4;
  if ($[11] !== t3) {
    t4 = /* @__PURE__ */ jsx("textarea", { className: "gdg-input", autoFocus: t3 });
    $[11] = t3;
    $[12] = t4;
  } else {
    t4 = $[12];
  }
  let t5;
  if ($[13] !== t1 || $[14] !== t2 || $[15] !== t4) {
    t5 = /* @__PURE__ */ jsxs(UriOverlayEditorStyle, { children: [
      t1,
      t2,
      t4
    ] });
    $[13] = t1;
    $[14] = t2;
    $[15] = t4;
    $[16] = t5;
  } else {
    t5 = $[16];
  }
  return t5;
};
function getTextRect(metrics, rect, theme, contentAlign) {
  let x = theme.cellHorizontalPadding;
  const y = rect.height / 2 - metrics.actualBoundingBoxAscent / 2;
  const width = metrics.width;
  const height = metrics.actualBoundingBoxAscent;
  if (contentAlign === "right") {
    x = rect.width - width - theme.cellHorizontalPadding;
  } else if (contentAlign === "center") {
    x = rect.width / 2 - width / 2;
  }
  return {
    x,
    y,
    width,
    height
  };
}
function isOverLinkText(e) {
  var _cell$displayData;
  const {
    cell,
    bounds,
    posX,
    posY,
    theme
  } = e;
  const txt = (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data;
  if (cell.hoverEffect !== true || cell.onClickUri === void 0) return false;
  const m = getMeasuredTextCache(txt, theme.baseFontFull);
  if (m === void 0) return false;
  const textRect = getTextRect(m, bounds, theme, cell.contentAlign);
  return pointInRect({
    x: textRect.x - 4,
    y: textRect.y - 4,
    width: textRect.width + 8,
    height: textRect.height + 8
  }, posX, posY);
}
const uriCellRenderer = {
  getAccessibilityString: (c) => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: GridCellKind.Uri,
  needsHover: (uriCell) => uriCell.hoverEffect === true,
  needsHoverPosition: true,
  useLabel: true,
  drawPrep: prepTextCell,
  draw: (a) => {
    var _cell$displayData2;
    const {
      cell,
      theme,
      overrideCursor,
      hoverX,
      hoverY,
      rect,
      ctx
    } = a;
    const txt = (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data;
    const isLinky = cell.hoverEffect === true;
    if (overrideCursor !== void 0 && isLinky && hoverX !== void 0 && hoverY !== void 0) {
      const m = measureTextCached(txt, ctx, theme.baseFontFull);
      const textRect = getTextRect(m, rect, theme, cell.contentAlign);
      const {
        x,
        y,
        width: w2,
        height: h
      } = textRect;
      if (hoverX >= x - 4 && hoverX <= x - 4 + w2 + 8 && hoverY >= y - 4 && hoverY <= y - 4 + h + 8) {
        const middleCenterBias = getMiddleCenterBias(ctx, theme.baseFontFull);
        overrideCursor("pointer");
        const underlineOffset = 5;
        const drawY = y - middleCenterBias;
        ctx.beginPath();
        ctx.moveTo(rect.x + x, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.lineTo(rect.x + x + w2, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.strokeStyle = theme.linkColor;
        ctx.stroke();
        ctx.save();
        ctx.fillStyle = a.cellFillColor;
        drawTextCell({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 1
          }
        }, txt, cell.contentAlign);
        drawTextCell({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 2
          }
        }, txt, cell.contentAlign);
        drawTextCell({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 1
          }
        }, txt, cell.contentAlign);
        drawTextCell({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 2
          }
        }, txt, cell.contentAlign);
        ctx.restore();
      }
    }
    ctx.fillStyle = isLinky ? theme.linkColor : theme.textDark;
    drawTextCell(a, txt, cell.contentAlign);
  },
  onSelect: (e) => {
    if (isOverLinkText(e)) {
      e.preventDefault();
    }
  },
  onClick: (a) => {
    const {
      cell
    } = a;
    const didClick = isOverLinkText(a);
    if (didClick) {
      var _cell$onClickUri;
      (_cell$onClickUri = cell.onClickUri) === null || _cell$onClickUri === void 0 || _cell$onClickUri.call(cell, a);
    }
    return void 0;
  },
  measure: (ctx, cell, theme) => {
    var _cell$displayData3;
    return ctx.measureText((_cell$displayData3 = cell.displayData) !== null && _cell$displayData3 !== void 0 ? _cell$displayData3 : cell.data).width + theme.cellHorizontalPadding * 2;
  },
  onDelete: (c) => ({
    ...c,
    data: ""
  }),
  provideEditor: (cell) => (p2) => {
    var _value$displayData;
    const {
      onChange,
      value,
      forceEditMode,
      validatedSelection
    } = p2;
    return /* @__PURE__ */ jsx(UriOverlayEditor, { forceEditMode: value.readonly !== true && (forceEditMode || cell.hoverEffect === true && cell.onClickUri !== void 0), uri: value.data, preview: (_value$displayData = value.displayData) !== null && _value$displayData !== void 0 ? _value$displayData : value.data, validatedSelection, readonly: value.readonly === true, onChange: (e) => onChange({
      ...value,
      data: e.target.value
    }) });
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? void 0 : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
const AllCellRenderers = [markerCellRenderer, newRowCellRenderer, rowStatusCellRenderer, rowIdMarkerCellRenderer, booleanCellRenderer, bubbleCellRenderer, drilldownCellRenderer, imageCellRenderer, loadingCellRenderer, markdownCellRenderer, numberCellRenderer, protectedCellRenderer, rowIDCellRenderer, textCellRenderer, uriCellRenderer];
var throttle_1;
var hasRequiredThrottle;
function requireThrottle() {
  if (hasRequiredThrottle) return throttle_1;
  hasRequiredThrottle = 1;
  var debounce2 = requireDebounce(), isObject = requireIsObject();
  var FUNC_ERROR_TEXT = "Expected a function";
  function throttle2(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce2(func, wait, {
      "leading": leading,
      "maxWait": wait,
      "trailing": trailing
    });
  }
  throttle_1 = throttle2;
  return throttle_1;
}
var throttleExports = requireThrottle();
const throttle = /* @__PURE__ */ getDefaultExportFromCjs(throttleExports);
const imgPool = [];
class ImageWindowLoaderImpl extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.imageLoaded = () => void 0;
    this.loadedLocations = [];
    this.cache = {};
    this.sendLoaded = throttle(() => {
      this.imageLoaded(new CellSet(this.loadedLocations));
      this.loadedLocations = [];
    }, 20);
    this.clearOutOfWindow = () => {
      const keys = Object.keys(this.cache);
      for (const key of keys) {
        const obj = this.cache[key];
        let keep = false;
        for (let j = 0; j < obj.cells.length; j++) {
          const packed = obj.cells[j];
          if (this.isInWindow(packed)) {
            keep = true;
            break;
          }
        }
        if (keep) {
          obj.cells = obj.cells.filter(this.isInWindow);
        } else {
          obj.cancel();
          delete this.cache[key];
        }
      }
    };
  }
  setCallback(imageLoaded) {
    this.imageLoaded = imageLoaded;
  }
  loadImage(url, col, row, key) {
    var _imgPool$pop;
    let loaded = false;
    const img = (_imgPool$pop = imgPool.pop()) !== null && _imgPool$pop !== void 0 ? _imgPool$pop : new Image();
    let canceled = false;
    const result = {
      img: void 0,
      cells: [packColRowToNumber(col, row)],
      url,
      cancel: () => {
        if (canceled) return;
        canceled = true;
        if (imgPool.length < 12) {
          imgPool.unshift(img);
        } else if (!loaded) {
          img.src = "";
        }
      }
    };
    const loadPromise = new Promise((r) => img.addEventListener("load", () => r(null)));
    requestAnimationFrame(async () => {
      try {
        img.src = url;
        await loadPromise;
        await img.decode();
        const toWrite = this.cache[key];
        if (toWrite !== void 0 && !canceled) {
          toWrite.img = img;
          for (const packed of toWrite.cells) {
            this.loadedLocations.push(unpackNumberToColRow(packed));
          }
          loaded = true;
          this.sendLoaded();
        }
      } catch {
        result.cancel();
      }
    });
    this.cache[key] = result;
  }
  loadOrGetImage(url, col, row) {
    const key = url;
    const current = this.cache[key];
    if (current !== void 0) {
      const packed = packColRowToNumber(col, row);
      if (!current.cells.includes(packed)) {
        current.cells.push(packed);
      }
      return current.img;
    } else {
      this.loadImage(url, col, row, key);
    }
    return void 0;
  }
}
const DataEditorAllImpl = (p2, ref) => {
  var _p$renderers;
  const $ = compilerRuntimeExports.c(10);
  let t0;
  if ($[0] !== p2.headerIcons) {
    t0 = {
      ...sprites,
      ...p2.headerIcons
    };
    $[0] = p2.headerIcons;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const allSprites = t0;
  const renderers = (_p$renderers = p2.renderers) !== null && _p$renderers !== void 0 ? _p$renderers : AllCellRenderers;
  let t1;
  if ($[2] !== p2.imageWindowLoader) {
    var _p$imageWindowLoader;
    t1 = (_p$imageWindowLoader = p2.imageWindowLoader) !== null && _p$imageWindowLoader !== void 0 ? _p$imageWindowLoader : new ImageWindowLoaderImpl();
    $[2] = p2.imageWindowLoader;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const imageWindowLoader = t1;
  let t2;
  if ($[4] !== allSprites || $[5] !== imageWindowLoader || $[6] !== p2 || $[7] !== ref || $[8] !== renderers) {
    t2 = /* @__PURE__ */ jsx(DataEditor, { ...p2, renderers, headerIcons: allSprites, ref, imageWindowLoader });
    $[4] = allSprites;
    $[5] = imageWindowLoader;
    $[6] = p2;
    $[7] = ref;
    $[8] = renderers;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  return t2;
};
const DataEditorAll = React.forwardRef(DataEditorAllImpl);
const NumberOverlayEditorStyle = /* @__PURE__ */ styled_default("div")({
  name: "NumberOverlayEditorStyle",
  class: "gdg-n1v9tqa4",
  propsAsIs: false
});
function __rest(s, e) {
  var t = {};
  for (var p2 in s) {
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0) {
      t[p2] = s[p2];
    }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i])) {
        t[p2[i]] = s[p2[i]];
      }
    }
  }
  return t;
}
var SourceType;
(function(SourceType2) {
  SourceType2["event"] = "event";
  SourceType2["props"] = "prop";
})(SourceType || (SourceType = {}));
function noop() {
}
function memoizeOnce(cb) {
  var lastArgs;
  var lastValue = void 0;
  return function() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    if (lastArgs && args.length === lastArgs.length && args.every(function(value, index) {
      return value === lastArgs[index];
    })) {
      return lastValue;
    }
    lastArgs = args;
    lastValue = cb.apply(void 0, args);
    return lastValue;
  };
}
function charIsNumber(char) {
  return !!(char || "").match(/\d/);
}
function isNil(val) {
  return val === null || val === void 0;
}
function isNanValue(val) {
  return typeof val === "number" && isNaN(val);
}
function isNotValidValue(val) {
  return isNil(val) || isNanValue(val) || typeof val === "number" && !isFinite(val);
}
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
  switch (thousandsGroupStyle) {
    case "lakh":
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case "wan":
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case "thousand":
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, "$1" + thousandSeparator);
}
function usePersistentCallback(cb) {
  var callbackRef = useRef(cb);
  callbackRef.current = cb;
  var persistentCbRef = useRef(function() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    return callbackRef.current.apply(callbackRef, args);
  });
  return persistentCbRef.current;
}
function splitDecimal(numStr, allowNegative) {
  if (allowNegative === void 0) allowNegative = true;
  var hasNegation = numStr[0] === "-";
  var addNegation = hasNegation && allowNegative;
  numStr = numStr.replace("-", "");
  var parts = numStr.split(".");
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || "";
  return {
    beforeDecimal,
    afterDecimal,
    hasNegation,
    addNegation
  };
}
function fixLeadingZero(numStr) {
  if (!numStr) {
    return numStr;
  }
  var isNegative = numStr[0] === "-";
  if (isNegative) {
    numStr = numStr.substring(1, numStr.length);
  }
  var parts = numStr.split(".");
  var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
  var afterDecimal = parts[1] || "";
  return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
}
function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = "";
  var filler = fixedDecimalScale ? "0" : "";
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}
function repeat(str, count) {
  return Array(count + 1).join(str);
}
function toNumericString(num) {
  var _num = num + "";
  var sign = _num[0] === "-" ? "-" : "";
  if (sign) {
    _num = _num.substring(1);
  }
  var ref = _num.split(/[eE]/g);
  var coefficient = ref[0];
  var exponent = ref[1];
  exponent = Number(exponent);
  if (!exponent) {
    return sign + coefficient;
  }
  coefficient = coefficient.replace(".", "");
  var decimalIndex = 1 + exponent;
  var coffiecientLn = coefficient.length;
  if (decimalIndex < 0) {
    coefficient = "0." + repeat("0", Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    coefficient = coefficient + repeat("0", decimalIndex - coffiecientLn);
  } else {
    coefficient = (coefficient.substring(0, decimalIndex) || "0") + "." + coefficient.substring(decimalIndex);
  }
  return sign + coefficient;
}
function roundToPrecision(numStr, scale, fixedDecimalScale) {
  if (["", "-"].indexOf(numStr) !== -1) {
    return numStr;
  }
  var shouldHaveDecimalSeparator = (numStr.indexOf(".") !== -1 || fixedDecimalScale) && scale;
  var ref = splitDecimal(numStr);
  var beforeDecimal = ref.beforeDecimal;
  var afterDecimal = ref.afterDecimal;
  var hasNegation = ref.hasNegation;
  var floatValue = parseFloat("0." + (afterDecimal || "0"));
  var floatValueStr = afterDecimal.length <= scale ? "0." + afterDecimal : floatValue.toFixed(scale);
  var roundedDecimalParts = floatValueStr.split(".");
  var intPart = beforeDecimal;
  if (beforeDecimal && Number(roundedDecimalParts[0])) {
    intPart = beforeDecimal.split("").reverse().reduce(function(roundedStr, current, idx2) {
      if (roundedStr.length > idx2) {
        return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);
  }
  var decimalPart = limitToScale(roundedDecimalParts[1] || "", scale, fixedDecimalScale);
  var negation = hasNegation ? "-" : "";
  var decimalSeparator = shouldHaveDecimalSeparator ? "." : "";
  return "" + negation + intPart + decimalSeparator + decimalPart;
}
function setCaretPosition(el, caretPos) {
  el.value = el.value;
  if (el !== null) {
    if (el.createTextRange) {
      var range2 = el.createTextRange();
      range2.move("character", caretPos);
      range2.select();
      return true;
    }
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }
    el.focus();
    return false;
  }
}
var findChangeRange = memoizeOnce(function(prevValue, newValue) {
  var i = 0, j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  }
  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }
  return {
    from: { start: i, end: prevLength - j },
    to: { start: i, end: newLength - j }
  };
});
var findChangedRangeFromCaretPositions = function(lastCaretPositions, currentCaretPosition) {
  var startPosition = Math.min(lastCaretPositions.selectionStart, currentCaretPosition);
  return {
    from: { start: startPosition, end: lastCaretPositions.selectionEnd },
    to: { start: startPosition, end: currentCaretPosition }
  };
};
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function geInputCaretPosition(el) {
  return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode() {
  return typeof navigator !== "undefined" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function getDefaultChangeMeta(value) {
  return {
    from: {
      start: 0,
      end: 0
    },
    to: {
      start: 0,
      end: value.length
    },
    lastValue: ""
  };
}
function defaultIsCharacterSame(ref) {
  var currentValue = ref.currentValue;
  var formattedValue = ref.formattedValue;
  var currentValueIndex = ref.currentValueIndex;
  var formattedValueIndex = ref.formattedValueIndex;
  return currentValue[currentValueIndex] === formattedValue[formattedValueIndex];
}
function getCaretPosition(newFormattedValue, lastFormattedValue, curValue, curCaretPos, boundary, isValidInputCharacter, isCharacterSame) {
  if (isCharacterSame === void 0) isCharacterSame = defaultIsCharacterSame;
  var firstAllowedPosition = boundary.findIndex(function(b2) {
    return b2;
  });
  var prefixFormat = newFormattedValue.slice(0, firstAllowedPosition);
  if (!lastFormattedValue && !curValue.startsWith(prefixFormat)) {
    lastFormattedValue = prefixFormat;
    curValue = prefixFormat + curValue;
    curCaretPos = curCaretPos + prefixFormat.length;
  }
  var curValLn = curValue.length;
  var formattedValueLn = newFormattedValue.length;
  var addedIndexMap = {};
  var indexMap = new Array(curValLn);
  for (var i = 0; i < curValLn; i++) {
    indexMap[i] = -1;
    for (var j = 0, jLn = formattedValueLn; j < jLn; j++) {
      var isCharSame = isCharacterSame({
        currentValue: curValue,
        lastValue: lastFormattedValue,
        formattedValue: newFormattedValue,
        currentValueIndex: i,
        formattedValueIndex: j
      });
      if (isCharSame && addedIndexMap[j] !== true) {
        indexMap[i] = j;
        addedIndexMap[j] = true;
        break;
      }
    }
  }
  var pos = curCaretPos;
  while (pos < curValLn && (indexMap[pos] === -1 || !isValidInputCharacter(curValue[pos]))) {
    pos++;
  }
  var endIndex = pos === curValLn || indexMap[pos] === -1 ? formattedValueLn : indexMap[pos];
  pos = curCaretPos - 1;
  while (pos > 0 && indexMap[pos] === -1) {
    pos--;
  }
  var startIndex = pos === -1 || indexMap[pos] === -1 ? 0 : indexMap[pos] + 1;
  if (startIndex > endIndex) {
    return endIndex;
  }
  return curCaretPos - startIndex < endIndex - curCaretPos ? startIndex : endIndex;
}
function getCaretPosInBoundary(value, caretPos, boundary, direction2) {
  var valLn = value.length;
  caretPos = clamp(caretPos, 0, valLn);
  if (direction2 === "left") {
    while (caretPos >= 0 && !boundary[caretPos]) {
      caretPos--;
    }
    if (caretPos === -1) {
      caretPos = boundary.indexOf(true);
    }
  } else {
    while (caretPos <= valLn && !boundary[caretPos]) {
      caretPos++;
    }
    if (caretPos > valLn) {
      caretPos = boundary.lastIndexOf(true);
    }
  }
  if (caretPos === -1) {
    caretPos = valLn;
  }
  return caretPos;
}
function caretUnknownFormatBoundary(formattedValue) {
  var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
    return true;
  });
  for (var i = 0, ln = boundaryAry.length; i < ln; i++) {
    boundaryAry[i] = Boolean(charIsNumber(formattedValue[i]) || charIsNumber(formattedValue[i - 1]));
  }
  return boundaryAry;
}
function useInternalValues(value, defaultValue, valueIsNumericString, format2, removeFormatting2, onValueChange) {
  if (onValueChange === void 0) onValueChange = noop;
  var getValues = usePersistentCallback(function(value2, valueIsNumericString2) {
    var formattedValue, numAsString;
    if (isNotValidValue(value2)) {
      numAsString = "";
      formattedValue = "";
    } else if (typeof value2 === "number" || valueIsNumericString2) {
      numAsString = typeof value2 === "number" ? toNumericString(value2) : value2;
      formattedValue = format2(numAsString);
    } else {
      numAsString = removeFormatting2(value2, void 0);
      formattedValue = format2(numAsString);
    }
    return { formattedValue, numAsString };
  });
  var ref = useState(function() {
    return getValues(isNil(value) ? defaultValue : value, valueIsNumericString);
  });
  var values = ref[0];
  var setValues = ref[1];
  var _onValueChange = function(newValues2, sourceInfo) {
    if (newValues2.formattedValue !== values.formattedValue) {
      setValues({
        formattedValue: newValues2.formattedValue,
        numAsString: newValues2.value
      });
    }
    onValueChange(newValues2, sourceInfo);
  };
  var _value = value;
  var _valueIsNumericString = valueIsNumericString;
  if (isNil(value)) {
    _value = values.numAsString;
    _valueIsNumericString = true;
  }
  var newValues = getValues(_value, _valueIsNumericString);
  useMemo(function() {
    setValues(newValues);
  }, [newValues.formattedValue]);
  return [values, _onValueChange];
}
function defaultRemoveFormatting(value) {
  return value.replace(/[^0-9]/g, "");
}
function defaultFormat(value) {
  return value;
}
function NumberFormatBase(props) {
  var type = props.type;
  if (type === void 0) type = "text";
  var displayType = props.displayType;
  if (displayType === void 0) displayType = "input";
  var customInput = props.customInput;
  var renderText = props.renderText;
  var getInputRef = props.getInputRef;
  var format2 = props.format;
  if (format2 === void 0) format2 = defaultFormat;
  var removeFormatting2 = props.removeFormatting;
  if (removeFormatting2 === void 0) removeFormatting2 = defaultRemoveFormatting;
  var defaultValue = props.defaultValue;
  var valueIsNumericString = props.valueIsNumericString;
  var onValueChange = props.onValueChange;
  var isAllowed = props.isAllowed;
  var onChange = props.onChange;
  if (onChange === void 0) onChange = noop;
  var onKeyDown = props.onKeyDown;
  if (onKeyDown === void 0) onKeyDown = noop;
  var onMouseUp = props.onMouseUp;
  if (onMouseUp === void 0) onMouseUp = noop;
  var onFocus = props.onFocus;
  if (onFocus === void 0) onFocus = noop;
  var onBlur = props.onBlur;
  if (onBlur === void 0) onBlur = noop;
  var propValue = props.value;
  var getCaretBoundary2 = props.getCaretBoundary;
  if (getCaretBoundary2 === void 0) getCaretBoundary2 = caretUnknownFormatBoundary;
  var isValidInputCharacter = props.isValidInputCharacter;
  if (isValidInputCharacter === void 0) isValidInputCharacter = charIsNumber;
  var isCharacterSame = props.isCharacterSame;
  var otherProps = __rest(props, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "removeFormatting", "defaultValue", "valueIsNumericString", "onValueChange", "isAllowed", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value", "getCaretBoundary", "isValidInputCharacter", "isCharacterSame"]);
  var ref = useInternalValues(propValue, defaultValue, Boolean(valueIsNumericString), format2, removeFormatting2, onValueChange);
  var ref_0 = ref[0];
  var formattedValue = ref_0.formattedValue;
  var numAsString = ref_0.numAsString;
  var onFormattedValueChange = ref[1];
  var caretPositionBeforeChange = useRef();
  var lastUpdatedValue = useRef({ formattedValue, numAsString });
  var _onValueChange = function(values, source) {
    lastUpdatedValue.current = { formattedValue: values.formattedValue, numAsString: values.value };
    onFormattedValueChange(values, source);
  };
  var ref$1 = useState(false);
  var mounted = ref$1[0];
  var setMounted = ref$1[1];
  var focusedElm = useRef(null);
  var timeout = useRef({
    setCaretTimeout: null,
    focusTimeout: null
  });
  useEffect(function() {
    setMounted(true);
    return function() {
      clearTimeout(timeout.current.setCaretTimeout);
      clearTimeout(timeout.current.focusTimeout);
    };
  }, []);
  var _format = format2;
  var getValueObject = function(formattedValue2, numAsString2) {
    var floatValue = parseFloat(numAsString2);
    return {
      formattedValue: formattedValue2,
      value: numAsString2,
      floatValue: isNaN(floatValue) ? void 0 : floatValue
    };
  };
  var setPatchedCaretPosition = function(el, caretPos, currentValue) {
    if (el.selectionStart === 0 && el.selectionEnd === el.value.length) {
      return;
    }
    setCaretPosition(el, caretPos);
    timeout.current.setCaretTimeout = setTimeout(function() {
      if (el.value === currentValue && el.selectionStart !== caretPos) {
        setCaretPosition(el, caretPos);
      }
    }, 0);
  };
  var correctCaretPosition = function(value, caretPos, direction2) {
    return getCaretPosInBoundary(value, caretPos, getCaretBoundary2(value), direction2);
  };
  var getNewCaretPosition = function(inputValue, newFormattedValue, caretPos) {
    var caretBoundary = getCaretBoundary2(newFormattedValue);
    var updatedCaretPos = getCaretPosition(newFormattedValue, formattedValue, inputValue, caretPos, caretBoundary, isValidInputCharacter, isCharacterSame);
    updatedCaretPos = getCaretPosInBoundary(newFormattedValue, updatedCaretPos, caretBoundary);
    return updatedCaretPos;
  };
  var updateValueAndCaretPosition = function(params) {
    var newFormattedValue = params.formattedValue;
    if (newFormattedValue === void 0) newFormattedValue = "";
    var input = params.input;
    var source = params.source;
    var event = params.event;
    var numAsString2 = params.numAsString;
    var caretPos;
    if (input) {
      var inputValue = params.inputValue || input.value;
      var currentCaretPosition2 = geInputCaretPosition(input);
      input.value = newFormattedValue;
      caretPos = getNewCaretPosition(inputValue, newFormattedValue, currentCaretPosition2);
      if (caretPos !== void 0) {
        setPatchedCaretPosition(input, caretPos, newFormattedValue);
      }
    }
    if (newFormattedValue !== formattedValue) {
      _onValueChange(getValueObject(newFormattedValue, numAsString2), { event, source });
    }
  };
  useEffect(function() {
    var ref2 = lastUpdatedValue.current;
    var lastFormattedValue = ref2.formattedValue;
    var lastNumAsString = ref2.numAsString;
    if (formattedValue !== lastFormattedValue || numAsString !== lastNumAsString) {
      _onValueChange(getValueObject(formattedValue, numAsString), {
        event: void 0,
        source: SourceType.props
      });
    }
  }, [formattedValue, numAsString]);
  var currentCaretPosition = focusedElm.current ? geInputCaretPosition(focusedElm.current) : void 0;
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(function() {
    var input = focusedElm.current;
    if (formattedValue !== lastUpdatedValue.current.formattedValue && input) {
      var caretPos = getNewCaretPosition(lastUpdatedValue.current.formattedValue, formattedValue, currentCaretPosition);
      input.value = formattedValue;
      setPatchedCaretPosition(input, caretPos, formattedValue);
    }
  }, [formattedValue]);
  var formatInputValue = function(inputValue, event, source) {
    var input = event.target;
    var changeRange = caretPositionBeforeChange.current ? findChangedRangeFromCaretPositions(caretPositionBeforeChange.current, input.selectionEnd) : findChangeRange(formattedValue, inputValue);
    var changeMeta = Object.assign(Object.assign({}, changeRange), { lastValue: formattedValue });
    var _numAsString = removeFormatting2(inputValue, changeMeta);
    var _formattedValue = _format(_numAsString);
    _numAsString = removeFormatting2(_formattedValue, void 0);
    if (isAllowed && !isAllowed(getValueObject(_formattedValue, _numAsString))) {
      var input$1 = event.target;
      var currentCaretPosition2 = geInputCaretPosition(input$1);
      var caretPos = getNewCaretPosition(inputValue, formattedValue, currentCaretPosition2);
      input$1.value = formattedValue;
      setPatchedCaretPosition(input$1, caretPos, formattedValue);
      return false;
    }
    updateValueAndCaretPosition({
      formattedValue: _formattedValue,
      numAsString: _numAsString,
      inputValue,
      event,
      source,
      input: event.target
    });
    return true;
  };
  var setCaretPositionInfoBeforeChange = function(el, endOffset) {
    if (endOffset === void 0) endOffset = 0;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    caretPositionBeforeChange.current = { selectionStart, selectionEnd: selectionEnd + endOffset };
  };
  var _onChange = function(e) {
    var el = e.target;
    var inputValue = el.value;
    var changed = formatInputValue(inputValue, e, SourceType.event);
    if (changed) {
      onChange(e);
    }
    caretPositionBeforeChange.current = void 0;
  };
  var _onKeyDown = function(e) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value;
    if (value === void 0) value = "";
    var expectedCaretPosition;
    if (key === "ArrowLeft" || key === "Backspace") {
      expectedCaretPosition = Math.max(selectionStart - 1, 0);
    } else if (key === "ArrowRight") {
      expectedCaretPosition = Math.min(selectionStart + 1, value.length);
    } else if (key === "Delete") {
      expectedCaretPosition = selectionStart;
    }
    var endOffset = 0;
    if (key === "Delete" && selectionStart === selectionEnd) {
      endOffset = 1;
    }
    var isArrowKey = key === "ArrowLeft" || key === "ArrowRight";
    if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd && !isArrowKey) {
      onKeyDown(e);
      setCaretPositionInfoBeforeChange(el, endOffset);
      return;
    }
    var newCaretPosition = expectedCaretPosition;
    if (isArrowKey) {
      var direction2 = key === "ArrowLeft" ? "left" : "right";
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, direction2);
      if (newCaretPosition !== expectedCaretPosition) {
        e.preventDefault();
      }
    } else if (key === "Delete" && !isValidInputCharacter(value[expectedCaretPosition])) {
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "right");
    } else if (key === "Backspace" && !isValidInputCharacter(value[expectedCaretPosition])) {
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "left");
    }
    if (newCaretPosition !== expectedCaretPosition) {
      setPatchedCaretPosition(el, newCaretPosition, value);
    }
    onKeyDown(e);
    setCaretPositionInfoBeforeChange(el, endOffset);
  };
  var _onMouseUp = function(e) {
    var el = e.target;
    var correctCaretPositionIfRequired = function() {
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value;
      if (value === void 0) value = "";
      if (selectionStart === selectionEnd) {
        var caretPosition = correctCaretPosition(value, selectionStart);
        if (caretPosition !== selectionStart) {
          setPatchedCaretPosition(el, caretPosition, value);
        }
      }
    };
    correctCaretPositionIfRequired();
    requestAnimationFrame(function() {
      correctCaretPositionIfRequired();
    });
    onMouseUp(e);
    setCaretPositionInfoBeforeChange(el);
  };
  var _onFocus = function(e) {
    if (e.persist) {
      e.persist();
    }
    var el = e.target;
    var currentTarget = e.currentTarget;
    focusedElm.current = el;
    timeout.current.focusTimeout = setTimeout(function() {
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value;
      if (value === void 0) value = "";
      var caretPosition = correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
        setPatchedCaretPosition(el, caretPosition, value);
      }
      onFocus(Object.assign(Object.assign({}, e), { currentTarget }));
    }, 0);
  };
  var _onBlur = function(e) {
    focusedElm.current = null;
    clearTimeout(timeout.current.focusTimeout);
    clearTimeout(timeout.current.setCaretTimeout);
    onBlur(e);
  };
  var inputMode = mounted && addInputMode() ? "numeric" : void 0;
  var inputProps = Object.assign({ inputMode }, otherProps, {
    type,
    value: formattedValue,
    onChange: _onChange,
    onKeyDown: _onKeyDown,
    onMouseUp: _onMouseUp,
    onFocus: _onFocus,
    onBlur: _onBlur
  });
  if (displayType === "text") {
    return renderText ? React__default.createElement(React__default.Fragment, null, renderText(formattedValue, otherProps) || null) : React__default.createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), formattedValue);
  } else if (customInput) {
    var CustomInput = customInput;
    return React__default.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
  }
  return React__default.createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
}
function format(numStr, props) {
  var decimalScale = props.decimalScale;
  var fixedDecimalScale = props.fixedDecimalScale;
  var prefix = props.prefix;
  if (prefix === void 0) prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0) suffix = "";
  var allowNegative = props.allowNegative;
  var thousandsGroupStyle = props.thousandsGroupStyle;
  if (thousandsGroupStyle === void 0) thousandsGroupStyle = "thousand";
  if (numStr === "" || numStr === "-") {
    return numStr;
  }
  var ref = getSeparators(props);
  var thousandSeparator = ref.thousandSeparator;
  var decimalSeparator = ref.decimalSeparator;
  var hasDecimalSeparator = decimalScale !== 0 && numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
  var ref$1 = splitDecimal(numStr, allowNegative);
  var beforeDecimal = ref$1.beforeDecimal;
  var afterDecimal = ref$1.afterDecimal;
  var addNegation = ref$1.addNegation;
  if (decimalScale !== void 0) {
    afterDecimal = limitToScale(afterDecimal, decimalScale, !!fixedDecimalScale);
  }
  if (thousandSeparator) {
    beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
  }
  if (prefix) {
    beforeDecimal = prefix + beforeDecimal;
  }
  if (suffix) {
    afterDecimal = afterDecimal + suffix;
  }
  if (addNegation) {
    beforeDecimal = "-" + beforeDecimal;
  }
  numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
  return numStr;
}
function getSeparators(props) {
  var decimalSeparator = props.decimalSeparator;
  if (decimalSeparator === void 0) decimalSeparator = ".";
  var thousandSeparator = props.thousandSeparator;
  var allowedDecimalSeparators = props.allowedDecimalSeparators;
  if (thousandSeparator === true) {
    thousandSeparator = ",";
  }
  if (!allowedDecimalSeparators) {
    allowedDecimalSeparators = [decimalSeparator, "."];
  }
  return {
    decimalSeparator,
    thousandSeparator,
    allowedDecimalSeparators
  };
}
function handleNegation(value, allowNegative) {
  if (value === void 0) value = "";
  var negationRegex = new RegExp("(-)");
  var doubleNegationRegex = new RegExp("(-)(.)*(-)");
  var hasNegation = negationRegex.test(value);
  var removeNegation = doubleNegationRegex.test(value);
  value = value.replace(/-/g, "");
  if (hasNegation && !removeNegation && allowNegative) {
    value = "-" + value;
  }
  return value;
}
function getNumberRegex(decimalSeparator, global2) {
  return new RegExp("(^-)|[0-9]|" + escapeRegExp(decimalSeparator), "g");
}
function isNumericString(val, prefix, suffix) {
  if (val === "") {
    return true;
  }
  return !(prefix === null || prefix === void 0 ? void 0 : prefix.match(/\d/)) && !(suffix === null || suffix === void 0 ? void 0 : suffix.match(/\d/)) && typeof val === "string" && !isNaN(Number(val));
}
function removeFormatting(value, changeMeta, props) {
  var assign;
  if (changeMeta === void 0) changeMeta = getDefaultChangeMeta(value);
  var allowNegative = props.allowNegative;
  var prefix = props.prefix;
  if (prefix === void 0) prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0) suffix = "";
  var decimalScale = props.decimalScale;
  var from = changeMeta.from;
  var to = changeMeta.to;
  var start = to.start;
  var end = to.end;
  var ref = getSeparators(props);
  var allowedDecimalSeparators = ref.allowedDecimalSeparators;
  var decimalSeparator = ref.decimalSeparator;
  var isBeforeDecimalSeparator = value[end] === decimalSeparator;
  if (charIsNumber(value) && (value === prefix || value === suffix) && changeMeta.lastValue === "") {
    return value;
  }
  if (end - start === 1 && allowedDecimalSeparators.indexOf(value[start]) !== -1) {
    var separator = decimalScale === 0 ? "" : decimalSeparator;
    value = value.substring(0, start) + separator + value.substring(start + 1, value.length);
  }
  var stripNegation = function(value2, start2, end2) {
    var hasNegation2 = false;
    var hasDoubleNegation = false;
    if (prefix.startsWith("-")) {
      hasNegation2 = false;
    } else if (value2.startsWith("--")) {
      hasNegation2 = false;
      hasDoubleNegation = true;
    } else if (suffix.startsWith("-") && value2.length === suffix.length) {
      hasNegation2 = false;
    } else if (value2[0] === "-") {
      hasNegation2 = true;
    }
    var charsToRemove = hasNegation2 ? 1 : 0;
    if (hasDoubleNegation) {
      charsToRemove = 2;
    }
    if (charsToRemove) {
      value2 = value2.substring(charsToRemove);
      start2 -= charsToRemove;
      end2 -= charsToRemove;
    }
    return { value: value2, start: start2, end: end2, hasNegation: hasNegation2 };
  };
  var toMetadata = stripNegation(value, start, end);
  var hasNegation = toMetadata.hasNegation;
  assign = toMetadata, value = assign.value, start = assign.start, end = assign.end;
  var ref$1 = stripNegation(changeMeta.lastValue, from.start, from.end);
  var fromStart = ref$1.start;
  var fromEnd = ref$1.end;
  var lastValue = ref$1.value;
  var updatedSuffixPart = value.substring(start, end);
  if (value.length && lastValue.length && (fromStart > lastValue.length - suffix.length || fromEnd < prefix.length) && !(updatedSuffixPart && suffix.startsWith(updatedSuffixPart))) {
    value = lastValue;
  }
  var startIndex = 0;
  if (value.startsWith(prefix)) {
    startIndex += prefix.length;
  } else if (start < prefix.length) {
    startIndex = start;
  }
  value = value.substring(startIndex);
  end -= startIndex;
  var endIndex = value.length;
  var suffixStartIndex = value.length - suffix.length;
  if (value.endsWith(suffix)) {
    endIndex = suffixStartIndex;
  } else if (end > suffixStartIndex) {
    endIndex = end;
  } else if (end > value.length - suffix.length) {
    endIndex = end;
  }
  value = value.substring(0, endIndex);
  value = handleNegation(hasNegation ? "-" + value : value, allowNegative);
  value = (value.match(getNumberRegex(decimalSeparator)) || []).join("");
  var firstIndex = value.indexOf(decimalSeparator);
  value = value.replace(new RegExp(escapeRegExp(decimalSeparator), "g"), function(match, index) {
    return index === firstIndex ? "." : "";
  });
  var ref$2 = splitDecimal(value, allowNegative);
  var beforeDecimal = ref$2.beforeDecimal;
  var afterDecimal = ref$2.afterDecimal;
  var addNegation = ref$2.addNegation;
  if (to.end - to.start < from.end - from.start && beforeDecimal === "" && isBeforeDecimalSeparator && !parseFloat(afterDecimal)) {
    value = addNegation ? "-" : "";
  }
  return value;
}
function getCaretBoundary(formattedValue, props) {
  var prefix = props.prefix;
  if (prefix === void 0) prefix = "";
  var suffix = props.suffix;
  if (suffix === void 0) suffix = "";
  var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
    return true;
  });
  var hasNegation = formattedValue[0] === "-";
  boundaryAry.fill(false, 0, prefix.length + (hasNegation ? 1 : 0));
  var valLn = formattedValue.length;
  boundaryAry.fill(false, valLn - suffix.length + 1, valLn + 1);
  return boundaryAry;
}
function validateAndUpdateProps(props) {
  var ref = getSeparators(props);
  var thousandSeparator = ref.thousandSeparator;
  var decimalSeparator = ref.decimalSeparator;
  var prefix = props.prefix;
  if (prefix === void 0) prefix = "";
  var allowNegative = props.allowNegative;
  if (allowNegative === void 0) allowNegative = true;
  if (thousandSeparator === decimalSeparator) {
    throw new Error("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: ' + decimalSeparator + " (default value for decimalSeparator is .)\n     ");
  }
  if (prefix.startsWith("-") && allowNegative) {
    console.error("\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " + prefix + "\n      allowNegative: " + allowNegative + "\n    ");
    allowNegative = false;
  }
  return Object.assign(Object.assign({}, props), { allowNegative });
}
function useNumericFormat(props) {
  props = validateAndUpdateProps(props);
  props.decimalSeparator;
  props.allowedDecimalSeparators;
  props.thousandsGroupStyle;
  var suffix = props.suffix;
  var allowNegative = props.allowNegative;
  var allowLeadingZeros = props.allowLeadingZeros;
  var onKeyDown = props.onKeyDown;
  if (onKeyDown === void 0) onKeyDown = noop;
  var onBlur = props.onBlur;
  if (onBlur === void 0) onBlur = noop;
  var thousandSeparator = props.thousandSeparator;
  var decimalScale = props.decimalScale;
  var fixedDecimalScale = props.fixedDecimalScale;
  var prefix = props.prefix;
  if (prefix === void 0) prefix = "";
  var defaultValue = props.defaultValue;
  var value = props.value;
  var valueIsNumericString = props.valueIsNumericString;
  var onValueChange = props.onValueChange;
  var restProps = __rest(props, ["decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "suffix", "allowNegative", "allowLeadingZeros", "onKeyDown", "onBlur", "thousandSeparator", "decimalScale", "fixedDecimalScale", "prefix", "defaultValue", "value", "valueIsNumericString", "onValueChange"]);
  var ref = getSeparators(props);
  var decimalSeparator = ref.decimalSeparator;
  var allowedDecimalSeparators = ref.allowedDecimalSeparators;
  var _format = function(numStr) {
    return format(numStr, props);
  };
  var _removeFormatting = function(inputValue, changeMeta) {
    return removeFormatting(inputValue, changeMeta, props);
  };
  var _value = isNil(value) ? defaultValue : value;
  var _valueIsNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString(_value, prefix, suffix);
  if (!isNil(value)) {
    _valueIsNumericString = _valueIsNumericString || typeof value === "number";
  } else if (!isNil(defaultValue)) {
    _valueIsNumericString = _valueIsNumericString || typeof defaultValue === "number";
  }
  var roundIncomingValueToPrecision = function(value2) {
    if (isNotValidValue(value2)) {
      return value2;
    }
    if (typeof value2 === "number") {
      value2 = toNumericString(value2);
    }
    if (_valueIsNumericString && typeof decimalScale === "number") {
      return roundToPrecision(value2, decimalScale, Boolean(fixedDecimalScale));
    }
    return value2;
  };
  var ref$1 = useInternalValues(roundIncomingValueToPrecision(value), roundIncomingValueToPrecision(defaultValue), Boolean(_valueIsNumericString), _format, _removeFormatting, onValueChange);
  var ref$1_0 = ref$1[0];
  var numAsString = ref$1_0.numAsString;
  var formattedValue = ref$1_0.formattedValue;
  var _onValueChange = ref$1[1];
  var _onKeyDown = function(e) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value2 = el.value;
    if (value2 === void 0) value2 = "";
    if ((key === "Backspace" || key === "Delete") && selectionEnd < prefix.length) {
      e.preventDefault();
      return;
    }
    if (selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }
    if (key === "Backspace" && value2[0] === "-" && selectionStart === prefix.length + 1 && allowNegative) {
      setCaretPosition(el, 1);
    }
    if (decimalScale && fixedDecimalScale) {
      if (key === "Backspace" && value2[selectionStart - 1] === decimalSeparator) {
        setCaretPosition(el, selectionStart - 1);
        e.preventDefault();
      } else if (key === "Delete" && value2[selectionStart] === decimalSeparator) {
        e.preventDefault();
      }
    }
    if ((allowedDecimalSeparators === null || allowedDecimalSeparators === void 0 ? void 0 : allowedDecimalSeparators.includes(key)) && value2[selectionStart] === decimalSeparator) {
      setCaretPosition(el, selectionStart + 1);
    }
    var _thousandSeparator = thousandSeparator === true ? "," : thousandSeparator;
    if (key === "Backspace" && value2[selectionStart - 1] === _thousandSeparator) {
      setCaretPosition(el, selectionStart - 1);
    }
    if (key === "Delete" && value2[selectionStart] === _thousandSeparator) {
      setCaretPosition(el, selectionStart + 1);
    }
    onKeyDown(e);
  };
  var _onBlur = function(e) {
    var _value2 = numAsString;
    if (!_value2.match(/\d/g)) {
      _value2 = "";
    }
    if (!allowLeadingZeros) {
      _value2 = fixLeadingZero(_value2);
    }
    if (fixedDecimalScale && decimalScale) {
      _value2 = roundToPrecision(_value2, decimalScale, fixedDecimalScale);
    }
    if (_value2 !== numAsString) {
      var formattedValue2 = format(_value2, props);
      _onValueChange({
        formattedValue: formattedValue2,
        value: _value2,
        floatValue: parseFloat(_value2)
      }, {
        event: e,
        source: SourceType.event
      });
    }
    onBlur(e);
  };
  var isValidInputCharacter = function(inputChar) {
    if (inputChar === decimalSeparator) {
      return true;
    }
    return charIsNumber(inputChar);
  };
  var isCharacterSame = function(ref2) {
    var currentValue = ref2.currentValue;
    var lastValue = ref2.lastValue;
    var formattedValue2 = ref2.formattedValue;
    var currentValueIndex = ref2.currentValueIndex;
    var formattedValueIndex = ref2.formattedValueIndex;
    var curChar = currentValue[currentValueIndex];
    var newChar = formattedValue2[formattedValueIndex];
    var typedRange = findChangeRange(lastValue, currentValue);
    var to = typedRange.to;
    var getDecimalSeparatorIndex = function(value2) {
      return _removeFormatting(value2).indexOf(".") + prefix.length;
    };
    if (value === 0 && fixedDecimalScale && decimalScale && currentValue[to.start] === decimalSeparator && getDecimalSeparatorIndex(currentValue) < currentValueIndex && getDecimalSeparatorIndex(formattedValue2) > formattedValueIndex) {
      return false;
    }
    if (currentValueIndex >= to.start && currentValueIndex < to.end && allowedDecimalSeparators && allowedDecimalSeparators.includes(curChar) && newChar === decimalSeparator) {
      return true;
    }
    return curChar === newChar;
  };
  return Object.assign(Object.assign({}, restProps), {
    value: formattedValue,
    valueIsNumericString: false,
    isValidInputCharacter,
    isCharacterSame,
    onValueChange: _onValueChange,
    format: _format,
    removeFormatting: _removeFormatting,
    getCaretBoundary: function(formattedValue2) {
      return getCaretBoundary(formattedValue2, props);
    },
    onKeyDown: _onKeyDown,
    onBlur: _onBlur
  });
}
function NumericFormat(props) {
  var numericFormatProps = useNumericFormat(props);
  return React__default.createElement(NumberFormatBase, Object.assign({}, numericFormatProps));
}
function getDecimalSeparator() {
  var _Intl$NumberFormat;
  const numberWithDecimalSeparator = 1.1;
  const result = (_Intl$NumberFormat = Intl.NumberFormat()) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.formatToParts(numberWithDecimalSeparator)) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.find((part) => part.type === "decimal")) === null || _Intl$NumberFormat === void 0 ? void 0 : _Intl$NumberFormat.value;
  return result !== null && result !== void 0 ? result : ".";
}
function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}
const NumberOverlayEditor = (p2) => {
  const $ = compilerRuntimeExports.c(25);
  const {
    value,
    onChange,
    onKeyDown,
    disabled,
    highlight,
    validatedSelection,
    fixedDecimals,
    allowNegative,
    thousandSeparator,
    decimalSeparator
  } = p2;
  const inputRef = React.useRef();
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  let t0;
  let t1;
  if ($[0] !== validatedSelection) {
    t0 = () => {
      if (validatedSelection !== void 0) {
        var _inputRef$current;
        const range2 = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range2[0], range2[1]);
      }
    };
    t1 = [validatedSelection];
    $[0] = validatedSelection;
    $[1] = t0;
    $[2] = t1;
  } else {
    t0 = $[1];
    t1 = $[2];
  }
  React.useLayoutEffect(t0, t1);
  let t2;
  if ($[3] !== isGhostMode) {
    t2 = isGhostMode ? {
      visibility: "hidden"
    } : void 0;
    $[3] = isGhostMode;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const ghostStyle = t2;
  const t3 = !isGhostMode;
  let t4;
  if ($[5] !== highlight) {
    t4 = (e) => e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length);
    $[5] = highlight;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  const t5 = disabled === true;
  let t6;
  if ($[7] !== thousandSeparator) {
    t6 = thousandSeparator !== null && thousandSeparator !== void 0 ? thousandSeparator : getThousandSeprator();
    $[7] = thousandSeparator;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  let t7;
  if ($[9] !== decimalSeparator) {
    t7 = decimalSeparator !== null && decimalSeparator !== void 0 ? decimalSeparator : getDecimalSeparator();
    $[9] = decimalSeparator;
    $[10] = t7;
  } else {
    t7 = $[10];
  }
  const t8 = Object.is(value, 0) ? "-" : value !== null && value !== void 0 ? value : "";
  let t9;
  if ($[11] !== allowNegative || $[12] !== fixedDecimals || $[13] !== onChange || $[14] !== onKeyDown || $[15] !== t3 || $[16] !== t4 || $[17] !== t5 || $[18] !== t6 || $[19] !== t7 || $[20] !== t8) {
    t9 = /* @__PURE__ */ jsx(NumericFormat, { autoFocus: t3, getInputRef: inputRef, className: "gdg-input", onFocus: t4, onKeyDown, disabled: t5, decimalScale: fixedDecimals, allowNegative, thousandSeparator: t6, decimalSeparator: t7, value: t8, onValueChange: onChange });
    $[11] = allowNegative;
    $[12] = fixedDecimals;
    $[13] = onChange;
    $[14] = onKeyDown;
    $[15] = t3;
    $[16] = t4;
    $[17] = t5;
    $[18] = t6;
    $[19] = t7;
    $[20] = t8;
    $[21] = t9;
  } else {
    t9 = $[21];
  }
  let t10;
  if ($[22] !== ghostStyle || $[23] !== t9) {
    t10 = /* @__PURE__ */ jsx(NumberOverlayEditorStyle, { style: ghostStyle, children: t9 });
    $[22] = ghostStyle;
    $[23] = t9;
    $[24] = t10;
  } else {
    t10 = $[24];
  }
  return t10;
};
const numberOverlayEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NumberOverlayEditor
}, Symbol.toStringTag, { value: "Module" }));
export {
  AllCellRenderers,
  BooleanEmpty,
  BooleanIndeterminate,
  CellSet,
  CompactSelection,
  DEFAULT_FILL_HANDLE,
  DataEditorAll as DataEditor,
  DataEditor as DataEditorCore,
  GridCellKind,
  GridColumnIcon,
  GridColumnMenuIcon,
  ImageOverlayEditor,
  ImageWindowLoaderImpl,
  InnerGridCellKind,
  MarkdownDiv,
  GrowingEntry as TextCellEntry,
  blend,
  booleanCellIsEditable,
  booleanCellRenderer,
  bubbleCellRenderer,
  decodeHTML,
  DataEditorAll as default,
  drawTextCellExternal as drawTextCell,
  drilldownCellRenderer,
  emptyGridSelection,
  getCopyBufferContents,
  getDataEditorTheme as getDefaultTheme,
  getEmHeight,
  getLuminance,
  getMiddleCenterBias,
  imageCellRenderer,
  interpolateColors,
  isEditableGridCell,
  isInnerOnlyCell,
  isObjectEditorCallbackResult,
  isReadWriteCell,
  isRectangleEqual,
  isSizedGridColumn,
  isTextEditableGridCell,
  loadingCellRenderer,
  markdownCellRenderer,
  markerCellRenderer,
  measureTextCached,
  newRowCellRenderer,
  numberCellRenderer,
  parseToRgba,
  protectedCellRenderer,
  resolveCellsThunk,
  roundedPoly,
  roundedRect,
  rowIDCellRenderer,
  rowStatusCellRenderer,
  sprites,
  textCellRenderer,
  uriCellRenderer,
  useColumnSizer,
  useRowGrouping,
  useTheme,
  withAlpha
};
//# sourceMappingURL=index.js.map
