
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function(array, view, offset) {
    var offsetShifted = offset;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offsetShifted >>= 1; break;
      case 4: offsetShifted >>= 2; break;
      case 8: offsetShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offsetShifted + i] = array[i];
    }
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// MutableParamList
/** @suppress {undefinedVars, duplicate} */function MutableParamList() { throw "cannot construct a MutableParamList, no constructor in IDL" }
MutableParamList.prototype = Object.create(WrapperObject.prototype);
MutableParamList.prototype.constructor = MutableParamList;
MutableParamList.prototype.__class__ = MutableParamList;
MutableParamList.__cache__ = {};
Module['MutableParamList'] = MutableParamList;

  MutableParamList.prototype['__destroy__'] = MutableParamList.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MutableParamList___destroy___0(self);
};
// SList
/** @suppress {undefinedVars, duplicate} */function SList() {
  this.ptr = _emscripten_bind_SList_SList_0();
  getCache(SList)[this.ptr] = this;
};;
SList.prototype = Object.create(WrapperObject.prototype);
SList.prototype.constructor = SList;
SList.prototype.__class__ = SList;
SList.__cache__ = {};
Module['SList'] = SList;

SList.prototype['get'] = SList.prototype.get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_SList_get_1(self, arg0), VoidPtr);
};;

SList.prototype['size'] = SList.prototype.size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_SList_size_0(self);
};;

  SList.prototype['__destroy__'] = SList.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SList___destroy___0(self);
};
// MultiMap
/** @suppress {undefinedVars, duplicate} */function MultiMap() {
  this.ptr = _emscripten_bind_MultiMap_MultiMap_0();
  getCache(MultiMap)[this.ptr] = this;
};;
MultiMap.prototype = Object.create(WrapperObject.prototype);
MultiMap.prototype.constructor = MultiMap;
MultiMap.prototype.__class__ = MultiMap;
MultiMap.__cache__ = {};
Module['MultiMap'] = MultiMap;

MultiMap.prototype['getMapping'] = MultiMap.prototype.getMapping = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_MultiMap_getMapping_1(self, arg0), SingleMapping);
};;

MultiMap.prototype['rangeCount'] = MultiMap.prototype.rangeCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_MultiMap_rangeCount_0(self);
};;

MultiMap.prototype['map'] = MultiMap.prototype.map = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_MultiMap_map_1(self, arg0), MultiRange);
};;

MultiMap.prototype['addCombined'] = MultiMap.prototype.addCombined = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_MultiMap_addCombined_2(self, arg0, arg1);
};;

MultiMap.prototype['addReversed'] = MultiMap.prototype.addReversed = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_MultiMap_addReversed_1(self, arg0);
};;

  MultiMap.prototype['__destroy__'] = MultiMap.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MultiMap___destroy___0(self);
};
// GlyphLoader
/** @suppress {undefinedVars, duplicate} */function GlyphLoader() {
  this.ptr = _emscripten_bind_GlyphLoader_GlyphLoader_0();
  getCache(GlyphLoader)[this.ptr] = this;
};;
GlyphLoader.prototype = Object.create(WrapperObject.prototype);
GlyphLoader.prototype.constructor = GlyphLoader;
GlyphLoader.prototype.__class__ = GlyphLoader;
GlyphLoader.__cache__ = {};
Module['GlyphLoader'] = GlyphLoader;

GlyphLoader.prototype['getStringifiedGlyph'] = GlyphLoader.prototype.getStringifiedGlyph = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return UTF8ToString(_emscripten_bind_GlyphLoader_getStringifiedGlyph_1(self, arg0));
};;

  GlyphLoader.prototype['__destroy__'] = GlyphLoader.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GlyphLoader___destroy___0(self);
};
// LoggerToMemory
/** @suppress {undefinedVars, duplicate} */function LoggerToMemory(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { this.ptr = _emscripten_bind_LoggerToMemory_LoggerToMemory_1(arg0); getCache(LoggerToMemory)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_LoggerToMemory_LoggerToMemory_2(arg0, arg1);
  getCache(LoggerToMemory)[this.ptr] = this;
};;
LoggerToMemory.prototype = Object.create(WrapperObject.prototype);
LoggerToMemory.prototype.constructor = LoggerToMemory;
LoggerToMemory.prototype.__class__ = LoggerToMemory;
LoggerToMemory.__cache__ = {};
Module['LoggerToMemory'] = LoggerToMemory;

LoggerToMemory.prototype['reset'] = LoggerToMemory.prototype.reset = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LoggerToMemory_reset_0(self);
};;

LoggerToMemory.prototype['getErrorCount'] = LoggerToMemory.prototype.getErrorCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LoggerToMemory_getErrorCount_0(self);
};;

LoggerToMemory.prototype['getWarningCount'] = LoggerToMemory.prototype.getWarningCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LoggerToMemory_getWarningCount_0(self);
};;

LoggerToMemory.prototype['getInfoCount'] = LoggerToMemory.prototype.getInfoCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LoggerToMemory_getInfoCount_0(self);
};;

LoggerToMemory.prototype['getStoredCount'] = LoggerToMemory.prototype.getStoredCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LoggerToMemory_getStoredCount_0(self);
};;

LoggerToMemory.prototype['getErrorLevel'] = LoggerToMemory.prototype.getErrorLevel = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_LoggerToMemory_getErrorLevel_0(self);
};;

LoggerToMemory.prototype['getMessages'] = LoggerToMemory.prototype.getMessages = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LoggerToMemory_getMessages_0(self), string);
};;

LoggerToMemory.prototype['getCountSummary'] = LoggerToMemory.prototype.getCountSummary = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_LoggerToMemory_getCountSummary_0(self), string);
};;

LoggerToMemory.prototype['handle'] = LoggerToMemory.prototype.handle = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  _emscripten_bind_LoggerToMemory_handle_4(self, arg0, arg1, arg2, arg3);
};;

  LoggerToMemory.prototype['__destroy__'] = LoggerToMemory.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LoggerToMemory___destroy___0(self);
};
// ParamTree

ParamTree.prototype['addNode'] = ParamTree.prototype.addNode = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_ParamTree_addNode_3(self, arg0, arg1, arg2), ParamTreeNode);
};;

ParamTree.prototype['findNode'] = ParamTree.prototype.findNode = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_ParamTree_findNode_2(self, arg0, arg1), ParamTreeNode);
};;
/** @suppress {undefinedVars, duplicate} */function ParamTree(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_ParamTree_ParamTree_1(arg0);
  getCache(ParamTree)[this.ptr] = this;
};;
ParamTree.prototype = Object.create(WrapperObject.prototype);
ParamTree.prototype.constructor = ParamTree;
ParamTree.prototype.__class__ = ParamTree;
ParamTree.__cache__ = {};
Module['ParamTree'] = ParamTree;

  ParamTree.prototype['get_root'] = ParamTree.prototype.get_root = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTree_get_root_0(self), ParamTreeNode);
};
    ParamTree.prototype['set_root'] = ParamTree.prototype.set_root = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTree_set_root_1(self, arg0);
};
    Object.defineProperty(ParamTree.prototype, 'root', { get: ParamTree.prototype.get_root, set: ParamTree.prototype.set_root });
  ParamTree.prototype['__destroy__'] = ParamTree.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParamTree___destroy___0(self);
};
// GenoOper_fF
/** @suppress {undefinedVars, duplicate} */function GenoOper_fF() {
  this.ptr = _emscripten_bind_GenoOper_fF_GenoOper_fF_0();
  getCache(GenoOper_fF)[this.ptr] = this;
};;
GenoOper_fF.prototype = Object.create(WrapperObject.prototype);
GenoOper_fF.prototype.constructor = GenoOper_fF;
GenoOper_fF.prototype.__class__ = GenoOper_fF;
GenoOper_fF.__cache__ = {};
Module['GenoOper_fF'] = GenoOper_fF;

  GenoOper_fF.prototype['__destroy__'] = GenoOper_fF.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoOper_fF___destroy___0(self);
};
// Param
/** @suppress {undefinedVars, duplicate} */function Param(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_Param_Param_2(arg0, arg1);
  getCache(Param)[this.ptr] = this;
};;
Param.prototype = Object.create(WrapperObject.prototype);
Param.prototype.constructor = Param;
Param.prototype.__class__ = Param;
Param.__cache__ = {};
Module['Param'] = Param;

  Param.prototype['__destroy__'] = Param.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Param___destroy___0(self);
};
// IRange
/** @suppress {undefinedVars, duplicate} */function IRange() { throw "cannot construct a IRange, no constructor in IDL" }
IRange.prototype = Object.create(WrapperObject.prototype);
IRange.prototype.constructor = IRange;
IRange.prototype.__class__ = IRange;
IRange.__cache__ = {};
Module['IRange'] = IRange;

  IRange.prototype['get_begin'] = IRange.prototype.get_begin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_IRange_get_begin_0(self);
};
    IRange.prototype['set_begin'] = IRange.prototype.set_begin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_IRange_set_begin_1(self, arg0);
};
    Object.defineProperty(IRange.prototype, 'begin', { get: IRange.prototype.get_begin, set: IRange.prototype.set_begin });
  IRange.prototype['get_end'] = IRange.prototype.get_end = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_IRange_get_end_0(self);
};
    IRange.prototype['set_end'] = IRange.prototype.set_end = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_IRange_set_end_1(self, arg0);
};
    Object.defineProperty(IRange.prototype, 'end', { get: IRange.prototype.get_end, set: IRange.prototype.set_end });
  IRange.prototype['__destroy__'] = IRange.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_IRange___destroy___0(self);
};
// Geno_fB
/** @suppress {undefinedVars, duplicate} */function Geno_fB() {
  this.ptr = _emscripten_bind_Geno_fB_Geno_fB_0();
  getCache(Geno_fB)[this.ptr] = this;
};;
Geno_fB.prototype = Object.create(WrapperObject.prototype);
Geno_fB.prototype.constructor = Geno_fB;
Geno_fB.prototype.__class__ = Geno_fB;
Geno_fB.__cache__ = {};
Module['Geno_fB'] = Geno_fB;

  Geno_fB.prototype['__destroy__'] = Geno_fB.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Geno_fB___destroy___0(self);
};
// Geno_fL
/** @suppress {undefinedVars, duplicate} */function Geno_fL() {
  this.ptr = _emscripten_bind_Geno_fL_Geno_fL_0();
  getCache(Geno_fL)[this.ptr] = this;
};;
Geno_fL.prototype = Object.create(WrapperObject.prototype);
Geno_fL.prototype.constructor = Geno_fL;
Geno_fL.prototype.__class__ = Geno_fL;
Geno_fL.__cache__ = {};
Module['Geno_fL'] = Geno_fL;

  Geno_fL.prototype['__destroy__'] = Geno_fL.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Geno_fL___destroy___0(self);
};
// VoidPtr
/** @suppress {undefinedVars, duplicate} */function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// GenoValidator
/** @suppress {undefinedVars, duplicate} */function GenoValidator() { throw "cannot construct a GenoValidator, no constructor in IDL" }
GenoValidator.prototype = Object.create(WrapperObject.prototype);
GenoValidator.prototype.constructor = GenoValidator;
GenoValidator.prototype.__class__ = GenoValidator;
GenoValidator.__cache__ = {};
Module['GenoValidator'] = GenoValidator;

  GenoValidator.prototype['__destroy__'] = GenoValidator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoValidator___destroy___0(self);
};
// Geno_fH
/** @suppress {undefinedVars, duplicate} */function Geno_fH() {
  this.ptr = _emscripten_bind_Geno_fH_Geno_fH_0();
  getCache(Geno_fH)[this.ptr] = this;
};;
Geno_fH.prototype = Object.create(WrapperObject.prototype);
Geno_fH.prototype.constructor = Geno_fH;
Geno_fH.prototype.__class__ = Geno_fH;
Geno_fH.__cache__ = {};
Module['Geno_fH'] = Geno_fH;

  Geno_fH.prototype['__destroy__'] = Geno_fH.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Geno_fH___destroy___0(self);
};
// ParamEntry
/** @suppress {undefinedVars, duplicate} */function ParamEntry() { throw "cannot construct a ParamEntry, no constructor in IDL" }
ParamEntry.prototype = Object.create(WrapperObject.prototype);
ParamEntry.prototype.constructor = ParamEntry;
ParamEntry.prototype.__class__ = ParamEntry;
ParamEntry.__cache__ = {};
Module['ParamEntry'] = ParamEntry;

  ParamEntry.prototype['__destroy__'] = ParamEntry.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParamEntry___destroy___0(self);
};
// SingleMapping
/** @suppress {undefinedVars, duplicate} */function SingleMapping() { throw "cannot construct a SingleMapping, no constructor in IDL" }
SingleMapping.prototype = Object.create(WrapperObject.prototype);
SingleMapping.prototype.constructor = SingleMapping;
SingleMapping.prototype.__class__ = SingleMapping;
SingleMapping.__cache__ = {};
Module['SingleMapping'] = SingleMapping;

  SingleMapping.prototype['get_begin'] = SingleMapping.prototype.get_begin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_SingleMapping_get_begin_0(self);
};
    SingleMapping.prototype['set_begin'] = SingleMapping.prototype.set_begin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SingleMapping_set_begin_1(self, arg0);
};
    Object.defineProperty(SingleMapping.prototype, 'begin', { get: SingleMapping.prototype.get_begin, set: SingleMapping.prototype.set_begin });
  SingleMapping.prototype['get_to'] = SingleMapping.prototype.get_to = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SingleMapping_get_to_0(self), MultiRange);
};
    SingleMapping.prototype['set_to'] = SingleMapping.prototype.set_to = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_SingleMapping_set_to_1(self, arg0);
};
    Object.defineProperty(SingleMapping.prototype, 'to', { get: SingleMapping.prototype.get_to, set: SingleMapping.prototype.set_to });
  SingleMapping.prototype['__destroy__'] = SingleMapping.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SingleMapping___destroy___0(self);
};
// GenMan
/** @suppress {undefinedVars, duplicate} */function GenMan() {
  this.ptr = _emscripten_bind_GenMan_GenMan_0();
  getCache(GenMan)[this.ptr] = this;
};;
GenMan.prototype = Object.create(WrapperObject.prototype);
GenMan.prototype.constructor = GenMan;
GenMan.prototype.__class__ = GenMan;
GenMan.__cache__ = {};
Module['GenMan'] = GenMan;

GenMan.prototype['setDefaults'] = GenMan.prototype.setDefaults = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenMan_setDefaults_0(self);
};;

GenMan.prototype['HTMLize'] = GenMan.prototype.HTMLize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_GenMan_HTMLize_1(self, arg0), string);
};;

GenMan.prototype['HTMLizeShort'] = GenMan.prototype.HTMLizeShort = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_GenMan_HTMLizeShort_1(self, arg0), string);
};;

  GenMan.prototype['__destroy__'] = GenMan.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenMan___destroy___0(self);
};
// ModelGenoValidator
/** @suppress {undefinedVars, duplicate} */function ModelGenoValidator() {
  this.ptr = _emscripten_bind_ModelGenoValidator_ModelGenoValidator_0();
  getCache(ModelGenoValidator)[this.ptr] = this;
};;
ModelGenoValidator.prototype = Object.create(WrapperObject.prototype);
ModelGenoValidator.prototype.constructor = ModelGenoValidator;
ModelGenoValidator.prototype.__class__ = ModelGenoValidator;
ModelGenoValidator.__cache__ = {};
Module['ModelGenoValidator'] = ModelGenoValidator;

  ModelGenoValidator.prototype['__destroy__'] = ModelGenoValidator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ModelGenoValidator___destroy___0(self);
};
// ParamInterface
/** @suppress {undefinedVars, duplicate} */function ParamInterface() { throw "cannot construct a ParamInterface, no constructor in IDL" }
ParamInterface.prototype = Object.create(WrapperObject.prototype);
ParamInterface.prototype.constructor = ParamInterface;
ParamInterface.prototype.__class__ = ParamInterface;
ParamInterface.__cache__ = {};
Module['ParamInterface'] = ParamInterface;

ParamInterface.prototype['getGroupCount'] = ParamInterface.prototype.getGroupCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParamInterface_getGroupCount_0(self);
};;

ParamInterface.prototype['getPropCount'] = ParamInterface.prototype.getPropCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParamInterface_getPropCount_0(self);
};;

ParamInterface.prototype['getName'] = ParamInterface.prototype.getName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ParamInterface_getName_0(self));
};;

ParamInterface.prototype['getDescription'] = ParamInterface.prototype.getDescription = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ParamInterface_getDescription_0(self));
};;

ParamInterface.prototype['findId'] = ParamInterface.prototype.findId = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ParamInterface_findId_1(self, arg0);
};;

ParamInterface.prototype['findIdn'] = ParamInterface.prototype.findIdn = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_findIdn_2(self, arg0, arg1);
};;

ParamInterface.prototype['type'] = ParamInterface.prototype.type = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return UTF8ToString(_emscripten_bind_ParamInterface_type_1(self, arg0));
};;

ParamInterface.prototype['help'] = ParamInterface.prototype.help = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return UTF8ToString(_emscripten_bind_ParamInterface_help_1(self, arg0));
};;

ParamInterface.prototype['flags'] = ParamInterface.prototype.flags = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_ParamInterface_flags_1(self, arg0);
};;

ParamInterface.prototype['group'] = ParamInterface.prototype.group = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_ParamInterface_group_1(self, arg0);
};;

ParamInterface.prototype['grname'] = ParamInterface.prototype.grname = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return UTF8ToString(_emscripten_bind_ParamInterface_grname_1(self, arg0));
};;

ParamInterface.prototype['get'] = ParamInterface.prototype.get = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParamInterface_get_1(self, arg0), SString);
};;

ParamInterface.prototype['getString'] = ParamInterface.prototype.getString = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParamInterface_getString_1(self, arg0), SString);
};;

ParamInterface.prototype['getInt'] = ParamInterface.prototype.getInt = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_ParamInterface_getInt_1(self, arg0);
};;

ParamInterface.prototype['getDouble'] = ParamInterface.prototype.getDouble = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_ParamInterface_getDouble_1(self, arg0);
};;

ParamInterface.prototype['getStringById'] = ParamInterface.prototype.getStringById = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParamInterface_getStringById_1(self, arg0), SString);
};;

ParamInterface.prototype['getIntById'] = ParamInterface.prototype.getIntById = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ParamInterface_getIntById_1(self, arg0);
};;

ParamInterface.prototype['getDoubleById'] = ParamInterface.prototype.getDoubleById = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_ParamInterface_getDoubleById_1(self, arg0);
};;

ParamInterface.prototype['setIntFromString'] = ParamInterface.prototype.setIntFromString = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_ParamInterface_setIntFromString_3(self, arg0, arg1, arg2);
};;

ParamInterface.prototype['setDoubleFromString'] = ParamInterface.prototype.setDoubleFromString = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return _emscripten_bind_ParamInterface_setDoubleFromString_2(self, arg0, arg1);
};;

ParamInterface.prototype['setInt'] = ParamInterface.prototype.setInt = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_setInt_2(self, arg0, arg1);
};;

ParamInterface.prototype['setDouble'] = ParamInterface.prototype.setDouble = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_setDouble_2(self, arg0, arg1);
};;

ParamInterface.prototype['setString'] = ParamInterface.prototype.setString = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_setString_2(self, arg0, arg1);
};;

ParamInterface.prototype['setFromString'] = ParamInterface.prototype.setFromString = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_ParamInterface_setFromString_3(self, arg0, arg1, arg2);
};;

ParamInterface.prototype['setIntById'] = ParamInterface.prototype.setIntById = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_setIntById_2(self, arg0, arg1);
};;

ParamInterface.prototype['setDoubleById'] = ParamInterface.prototype.setDoubleById = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_ParamInterface_setDoubleById_2(self, arg0, arg1);
};;

ParamInterface.prototype['setStringById'] = ParamInterface.prototype.setStringById = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return _emscripten_bind_ParamInterface_setStringById_2(self, arg0, arg1);
};;

ParamInterface.prototype['setDefault'] = ParamInterface.prototype.setDefault = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { _emscripten_bind_ParamInterface_setDefault_0(self);  return }
  _emscripten_bind_ParamInterface_setDefault_1(self, arg0);
};;

ParamInterface.prototype['setMin'] = ParamInterface.prototype.setMin = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { _emscripten_bind_ParamInterface_setMin_0(self);  return }
  _emscripten_bind_ParamInterface_setMin_1(self, arg0);
};;

ParamInterface.prototype['setMax'] = ParamInterface.prototype.setMax = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { _emscripten_bind_ParamInterface_setMax_0(self);  return }
  _emscripten_bind_ParamInterface_setMax_1(self, arg0);
};;

ParamInterface.prototype['friendlyTypeDescrFromTypeDef'] = ParamInterface.prototype.friendlyTypeDescrFromTypeDef = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_ParamInterface_friendlyTypeDescrFromTypeDef_1(self, arg0), SString);
};;

ParamInterface.prototype['friendlyTypeDescr'] = ParamInterface.prototype.friendlyTypeDescr = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ParamInterface_friendlyTypeDescr_1(self, arg0), SString);
};;

ParamInterface.prototype['copyFrom'] = ParamInterface.prototype.copyFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamInterface_copyFrom_1(self, arg0);
};;

ParamInterface.prototype['quickCopyFrom'] = ParamInterface.prototype.quickCopyFrom = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamInterface_quickCopyFrom_1(self, arg0);
};;

ParamInterface.prototype['isValidTypeDescription'] = ParamInterface.prototype.isValidTypeDescription = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return !!(_emscripten_bind_ParamInterface_isValidTypeDescription_1(self, arg0));
};;

  ParamInterface.prototype['__destroy__'] = ParamInterface.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParamInterface___destroy___0(self);
};
// NeuroClass
/** @suppress {undefinedVars, duplicate} */function NeuroClass() {
  this.ptr = _emscripten_bind_NeuroClass_NeuroClass_0();
  getCache(NeuroClass)[this.ptr] = this;
};;
NeuroClass.prototype = Object.create(WrapperObject.prototype);
NeuroClass.prototype.constructor = NeuroClass;
NeuroClass.prototype.__class__ = NeuroClass;
NeuroClass.__cache__ = {};
Module['NeuroClass'] = NeuroClass;

NeuroClass.prototype['getName'] = NeuroClass.prototype.getName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_NeuroClass_getName_0(self), SString);
};;

NeuroClass.prototype['getVisualHints'] = NeuroClass.prototype.getVisualHints = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_NeuroClass_getVisualHints_0(self);
};;

  NeuroClass.prototype['__destroy__'] = NeuroClass.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NeuroClass___destroy___0(self);
};
// NNLayoutFunctionHelper
/** @suppress {undefinedVars, duplicate} */function NNLayoutFunctionHelper() {
  this.ptr = _emscripten_bind_NNLayoutFunctionHelper_NNLayoutFunctionHelper_0();
  getCache(NNLayoutFunctionHelper)[this.ptr] = this;
};;
NNLayoutFunctionHelper.prototype = Object.create(WrapperObject.prototype);
NNLayoutFunctionHelper.prototype.constructor = NNLayoutFunctionHelper;
NNLayoutFunctionHelper.prototype.__class__ = NNLayoutFunctionHelper;
NNLayoutFunctionHelper.__cache__ = {};
Module['NNLayoutFunctionHelper'] = NNLayoutFunctionHelper;

NNLayoutFunctionHelper.prototype['doLayout'] = NNLayoutFunctionHelper.prototype.doLayout = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_NNLayoutFunctionHelper_doLayout_2(self, arg0, arg1);
};;

  NNLayoutFunctionHelper.prototype['__destroy__'] = NNLayoutFunctionHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NNLayoutFunctionHelper___destroy___0(self);
};
// Joint
/** @suppress {undefinedVars, duplicate} */function Joint() {
  this.ptr = _emscripten_bind_Joint_Joint_0();
  getCache(Joint)[this.ptr] = this;
};;
Joint.prototype = Object.create(WrapperObject.prototype);
Joint.prototype.constructor = Joint;
Joint.prototype.__class__ = Joint;
Joint.__cache__ = {};
Module['Joint'] = Joint;

Joint.prototype['attachToParts'] = Joint.prototype.attachToParts = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Joint_attachToParts_2(self, arg0, arg1);
};;

Joint.prototype['resetDelta'] = Joint.prototype.resetDelta = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Joint_resetDelta_0(self);
};;

Joint.prototype['useDelta'] = Joint.prototype.useDelta = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_useDelta_1(self, arg0);
};;

Joint.prototype['isDelta'] = Joint.prototype.isDelta = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Joint_isDelta_0(self));
};;

Joint.prototype['getMapping'] = Joint.prototype.getMapping = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_getMapping_0(self), MultiRange);
};;

  Joint.prototype['get_part1'] = Joint.prototype.get_part1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_part1_0(self), Part);
};
    Joint.prototype['set_part1'] = Joint.prototype.set_part1 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_part1_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'part1', { get: Joint.prototype.get_part1, set: Joint.prototype.set_part1 });
  Joint.prototype['get_part2'] = Joint.prototype.get_part2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_part2_0(self), Part);
};
    Joint.prototype['set_part2'] = Joint.prototype.set_part2 = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_part2_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'part2', { get: Joint.prototype.get_part2, set: Joint.prototype.set_part2 });
  Joint.prototype['get_d'] = Joint.prototype.get_d = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_d_0(self), Pt3D);
};
    Joint.prototype['set_d'] = Joint.prototype.set_d = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_d_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'd', { get: Joint.prototype.get_d, set: Joint.prototype.set_d });
  Joint.prototype['get_rot'] = Joint.prototype.get_rot = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_rot_0(self), Pt3D);
};
    Joint.prototype['set_rot'] = Joint.prototype.set_rot = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_rot_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'rot', { get: Joint.prototype.get_rot, set: Joint.prototype.set_rot });
  Joint.prototype['get_refno'] = Joint.prototype.get_refno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Joint_get_refno_0(self);
};
    Joint.prototype['set_refno'] = Joint.prototype.set_refno = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_refno_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'refno', { get: Joint.prototype.get_refno, set: Joint.prototype.set_refno });
  Joint.prototype['get_stamina'] = Joint.prototype.get_stamina = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Joint_get_stamina_0(self);
};
    Joint.prototype['set_stamina'] = Joint.prototype.set_stamina = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_stamina_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'stamina', { get: Joint.prototype.get_stamina, set: Joint.prototype.set_stamina });
  Joint.prototype['get_stif'] = Joint.prototype.get_stif = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Joint_get_stif_0(self);
};
    Joint.prototype['set_stif'] = Joint.prototype.set_stif = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_stif_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'stif', { get: Joint.prototype.get_stif, set: Joint.prototype.set_stif });
  Joint.prototype['get_rotstif'] = Joint.prototype.get_rotstif = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Joint_get_rotstif_0(self);
};
    Joint.prototype['set_rotstif'] = Joint.prototype.set_rotstif = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_rotstif_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'rotstif', { get: Joint.prototype.get_rotstif, set: Joint.prototype.set_rotstif });
  Joint.prototype['get_o'] = Joint.prototype.get_o = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_o_0(self), Orient);
};
    Joint.prototype['set_o'] = Joint.prototype.set_o = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_o_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'o', { get: Joint.prototype.get_o, set: Joint.prototype.set_o });
  Joint.prototype['get_usedelta'] = Joint.prototype.get_usedelta = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Joint_get_usedelta_0(self));
};
    Joint.prototype['set_usedelta'] = Joint.prototype.set_usedelta = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_usedelta_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'usedelta', { get: Joint.prototype.get_usedelta, set: Joint.prototype.set_usedelta });
  Joint.prototype['get_vcolor'] = Joint.prototype.get_vcolor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Joint_get_vcolor_0(self), Pt3D);
};
    Joint.prototype['set_vcolor'] = Joint.prototype.set_vcolor = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_vcolor_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'vcolor', { get: Joint.prototype.get_vcolor, set: Joint.prototype.set_vcolor });
  Joint.prototype['get_shape'] = Joint.prototype.get_shape = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Joint_get_shape_0(self);
};
    Joint.prototype['set_shape'] = Joint.prototype.set_shape = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Joint_set_shape_1(self, arg0);
};
    Object.defineProperty(Joint.prototype, 'shape', { get: Joint.prototype.get_shape, set: Joint.prototype.set_shape });
  Joint.prototype['__destroy__'] = Joint.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Joint___destroy___0(self);
};
// Part
/** @suppress {undefinedVars, duplicate} */function Part(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Part_Part_0(); getCache(Part)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Part_Part_1(arg0);
  getCache(Part)[this.ptr] = this;
};;
Part.prototype = Object.create(WrapperObject.prototype);
Part.prototype.constructor = Part;
Part.prototype.__class__ = Part;
Part.__cache__ = {};
Module['Part'] = Part;

Part.prototype['setPositionAndRotationFromAxis'] = Part.prototype.setPositionAndRotationFromAxis = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Part_setPositionAndRotationFromAxis_2(self, arg0, arg1);
};;

Part.prototype['setOrient'] = Part.prototype.setOrient = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_setOrient_1(self, arg0);
};;

Part.prototype['setRot'] = Part.prototype.setRot = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_setRot_1(self, arg0);
};;

Part.prototype['getMapping'] = Part.prototype.getMapping = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_getMapping_0(self), MultiRange);
};;

  Part.prototype['get_refno'] = Part.prototype.get_refno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_refno_0(self);
};
    Part.prototype['set_refno'] = Part.prototype.set_refno = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_refno_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'refno', { get: Part.prototype.get_refno, set: Part.prototype.set_refno });
  Part.prototype['get_p'] = Part.prototype.get_p = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_get_p_0(self), Pt3D);
};
    Part.prototype['set_p'] = Part.prototype.set_p = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_p_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'p', { get: Part.prototype.get_p, set: Part.prototype.set_p });
  Part.prototype['get_o'] = Part.prototype.get_o = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_get_o_0(self), Orient);
};
    Part.prototype['set_o'] = Part.prototype.set_o = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_o_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'o', { get: Part.prototype.get_o, set: Part.prototype.set_o });
  Part.prototype['get_rot'] = Part.prototype.get_rot = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_get_rot_0(self), Pt3D);
};
    Part.prototype['set_rot'] = Part.prototype.set_rot = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_rot_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'rot', { get: Part.prototype.get_rot, set: Part.prototype.set_rot });
  Part.prototype['get_mass'] = Part.prototype.get_mass = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_mass_0(self);
};
    Part.prototype['set_mass'] = Part.prototype.set_mass = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_mass_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'mass', { get: Part.prototype.get_mass, set: Part.prototype.set_mass });
  Part.prototype['get_size'] = Part.prototype.get_size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_size_0(self);
};
    Part.prototype['set_size'] = Part.prototype.set_size = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_size_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'size', { get: Part.prototype.get_size, set: Part.prototype.set_size });
  Part.prototype['get_density'] = Part.prototype.get_density = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_density_0(self);
};
    Part.prototype['set_density'] = Part.prototype.set_density = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_density_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'density', { get: Part.prototype.get_density, set: Part.prototype.set_density });
  Part.prototype['get_friction'] = Part.prototype.get_friction = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_friction_0(self);
};
    Part.prototype['set_friction'] = Part.prototype.set_friction = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_friction_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'friction', { get: Part.prototype.get_friction, set: Part.prototype.set_friction });
  Part.prototype['get_ingest'] = Part.prototype.get_ingest = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_ingest_0(self);
};
    Part.prototype['set_ingest'] = Part.prototype.set_ingest = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_ingest_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'ingest', { get: Part.prototype.get_ingest, set: Part.prototype.set_ingest });
  Part.prototype['get_assim'] = Part.prototype.get_assim = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_assim_0(self);
};
    Part.prototype['set_assim'] = Part.prototype.set_assim = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_assim_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'assim', { get: Part.prototype.get_assim, set: Part.prototype.set_assim });
  Part.prototype['get_hollow'] = Part.prototype.get_hollow = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_hollow_0(self);
};
    Part.prototype['set_hollow'] = Part.prototype.set_hollow = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_hollow_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'hollow', { get: Part.prototype.get_hollow, set: Part.prototype.set_hollow });
  Part.prototype['get_scale'] = Part.prototype.get_scale = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_get_scale_0(self), Pt3D);
};
    Part.prototype['set_scale'] = Part.prototype.set_scale = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_scale_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'scale', { get: Part.prototype.get_scale, set: Part.prototype.set_scale });
  Part.prototype['get_vcolor'] = Part.prototype.get_vcolor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Part_get_vcolor_0(self), Pt3D);
};
    Part.prototype['set_vcolor'] = Part.prototype.set_vcolor = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_vcolor_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'vcolor', { get: Part.prototype.get_vcolor, set: Part.prototype.set_vcolor });
  Part.prototype['get_vsize'] = Part.prototype.get_vsize = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_vsize_0(self);
};
    Part.prototype['set_vsize'] = Part.prototype.set_vsize = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_vsize_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'vsize', { get: Part.prototype.get_vsize, set: Part.prototype.set_vsize });
  Part.prototype['get_shape'] = Part.prototype.get_shape = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Part_get_shape_0(self);
};
    Part.prototype['set_shape'] = Part.prototype.set_shape = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Part_set_shape_1(self, arg0);
};
    Object.defineProperty(Part.prototype, 'shape', { get: Part.prototype.get_shape, set: Part.prototype.set_shape });
  Part.prototype['__destroy__'] = Part.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Part___destroy___0(self);
};
// NNLayoutState_Model
/** @suppress {undefinedVars, duplicate} */function NNLayoutState_Model() { throw "cannot construct a NNLayoutState_Model, no constructor in IDL" }
NNLayoutState_Model.prototype = Object.create(WrapperObject.prototype);
NNLayoutState_Model.prototype.constructor = NNLayoutState_Model;
NNLayoutState_Model.prototype.__class__ = NNLayoutState_Model;
NNLayoutState_Model.__cache__ = {};
Module['NNLayoutState_Model'] = NNLayoutState_Model;

  NNLayoutState_Model.prototype['__destroy__'] = NNLayoutState_Model.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NNLayoutState_Model___destroy___0(self);
};
// NodePtr
/** @suppress {undefinedVars, duplicate} */function NodePtr() { throw "cannot construct a NodePtr, no constructor in IDL" }
NodePtr.prototype = Object.create(WrapperObject.prototype);
NodePtr.prototype.constructor = NodePtr;
NodePtr.prototype.__class__ = NodePtr;
NodePtr.__cache__ = {};
Module['NodePtr'] = NodePtr;

NodePtr.prototype['get'] = NodePtr.prototype.get = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_NodePtr_get_0(self), ParamTreeNode);
};;

  NodePtr.prototype['__destroy__'] = NodePtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NodePtr___destroy___0(self);
};
// ParamTreeNode
/** @suppress {undefinedVars, duplicate} */function ParamTreeNode() { throw "cannot construct a ParamTreeNode, no constructor in IDL" }
ParamTreeNode.prototype = Object.create(WrapperObject.prototype);
ParamTreeNode.prototype.constructor = ParamTreeNode;
ParamTreeNode.prototype.__class__ = ParamTreeNode;
ParamTreeNode.__cache__ = {};
Module['ParamTreeNode'] = ParamTreeNode;

  ParamTreeNode.prototype['get_tree'] = ParamTreeNode.prototype.get_tree = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeNode_get_tree_0(self), ParamTree);
};
    ParamTreeNode.prototype['set_tree'] = ParamTreeNode.prototype.set_tree = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_tree_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'tree', { get: ParamTreeNode.prototype.get_tree, set: ParamTreeNode.prototype.set_tree });
  ParamTreeNode.prototype['get_parent'] = ParamTreeNode.prototype.get_parent = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeNode_get_parent_0(self), ParamTreeNode);
};
    ParamTreeNode.prototype['set_parent'] = ParamTreeNode.prototype.set_parent = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_parent_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'parent', { get: ParamTreeNode.prototype.get_parent, set: ParamTreeNode.prototype.set_parent });
  ParamTreeNode.prototype['get_name'] = ParamTreeNode.prototype.get_name = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeNode_get_name_0(self), string);
};
    ParamTreeNode.prototype['set_name'] = ParamTreeNode.prototype.set_name = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_name_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'name', { get: ParamTreeNode.prototype.get_name, set: ParamTreeNode.prototype.set_name });
  ParamTreeNode.prototype['get_first_child'] = ParamTreeNode.prototype.get_first_child = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeNode_get_first_child_0(self), NodePtr);
};
    ParamTreeNode.prototype['set_first_child'] = ParamTreeNode.prototype.set_first_child = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_first_child_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'first_child', { get: ParamTreeNode.prototype.get_first_child, set: ParamTreeNode.prototype.set_first_child });
  ParamTreeNode.prototype['get_next_sibling'] = ParamTreeNode.prototype.get_next_sibling = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeNode_get_next_sibling_0(self), NodePtr);
};
    ParamTreeNode.prototype['set_next_sibling'] = ParamTreeNode.prototype.set_next_sibling = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_next_sibling_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'next_sibling', { get: ParamTreeNode.prototype.get_next_sibling, set: ParamTreeNode.prototype.set_next_sibling });
  ParamTreeNode.prototype['get_group_index'] = ParamTreeNode.prototype.get_group_index = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ParamTreeNode_get_group_index_0(self);
};
    ParamTreeNode.prototype['set_group_index'] = ParamTreeNode.prototype.set_group_index = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeNode_set_group_index_1(self, arg0);
};
    Object.defineProperty(ParamTreeNode.prototype, 'group_index', { get: ParamTreeNode.prototype.get_group_index, set: ParamTreeNode.prototype.set_group_index });
  ParamTreeNode.prototype['__destroy__'] = ParamTreeNode.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParamTreeNode___destroy___0(self);
};
// GenoOperatorsHelper
/** @suppress {undefinedVars, duplicate} */function GenoOperatorsHelper(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_GenoOperatorsHelper_GenoOperatorsHelper_1(arg0);
  getCache(GenoOperatorsHelper)[this.ptr] = this;
};;
GenoOperatorsHelper.prototype = Object.create(WrapperObject.prototype);
GenoOperatorsHelper.prototype.constructor = GenoOperatorsHelper;
GenoOperatorsHelper.prototype.__class__ = GenoOperatorsHelper;
GenoOperatorsHelper.__cache__ = {};
Module['GenoOperatorsHelper'] = GenoOperatorsHelper;

GenoOperatorsHelper.prototype['mutate'] = GenoOperatorsHelper.prototype.mutate = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_GenoOperatorsHelper_mutate_1(self, arg0);
};;

GenoOperatorsHelper.prototype['crossOver'] = GenoOperatorsHelper.prototype.crossOver = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return _emscripten_bind_GenoOperatorsHelper_crossOver_2(self, arg0, arg1);
};;

GenoOperatorsHelper.prototype['getLastMutateGeno'] = GenoOperatorsHelper.prototype.getLastMutateGeno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenoOperatorsHelper_getLastMutateGeno_0(self), SString);
};;

GenoOperatorsHelper.prototype['getLastCrossGeno1'] = GenoOperatorsHelper.prototype.getLastCrossGeno1 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenoOperatorsHelper_getLastCrossGeno1_0(self), SString);
};;

GenoOperatorsHelper.prototype['getLastCrossGeno2'] = GenoOperatorsHelper.prototype.getLastCrossGeno2 = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenoOperatorsHelper_getLastCrossGeno2_0(self), SString);
};;

  GenoOperatorsHelper.prototype['__destroy__'] = GenoOperatorsHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoOperatorsHelper___destroy___0(self);
};
// Pt3D
/** @suppress {undefinedVars, duplicate} */function Pt3D() {
  this.ptr = _emscripten_bind_Pt3D_Pt3D_0();
  getCache(Pt3D)[this.ptr] = this;
};;
Pt3D.prototype = Object.create(WrapperObject.prototype);
Pt3D.prototype.constructor = Pt3D;
Pt3D.prototype.__class__ = Pt3D;
Pt3D.__cache__ = {};
Module['Pt3D'] = Pt3D;

  Pt3D.prototype['get_x'] = Pt3D.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pt3D_get_x_0(self);
};
    Pt3D.prototype['set_x'] = Pt3D.prototype.set_x = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Pt3D_set_x_1(self, arg0);
};
    Object.defineProperty(Pt3D.prototype, 'x', { get: Pt3D.prototype.get_x, set: Pt3D.prototype.set_x });
  Pt3D.prototype['get_y'] = Pt3D.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pt3D_get_y_0(self);
};
    Pt3D.prototype['set_y'] = Pt3D.prototype.set_y = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Pt3D_set_y_1(self, arg0);
};
    Object.defineProperty(Pt3D.prototype, 'y', { get: Pt3D.prototype.get_y, set: Pt3D.prototype.set_y });
  Pt3D.prototype['get_z'] = Pt3D.prototype.get_z = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pt3D_get_z_0(self);
};
    Pt3D.prototype['set_z'] = Pt3D.prototype.set_z = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Pt3D_set_z_1(self, arg0);
};
    Object.defineProperty(Pt3D.prototype, 'z', { get: Pt3D.prototype.get_z, set: Pt3D.prototype.set_z });
  Pt3D.prototype['__destroy__'] = Pt3D.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Pt3D___destroy___0(self);
};
// GenoOperators
/** @suppress {undefinedVars, duplicate} */function GenoOperators() {
  this.ptr = _emscripten_bind_GenoOperators_GenoOperators_0();
  getCache(GenoOperators)[this.ptr] = this;
};;
GenoOperators.prototype = Object.create(WrapperObject.prototype);
GenoOperators.prototype.constructor = GenoOperators;
GenoOperators.prototype.__class__ = GenoOperators;
GenoOperators.__cache__ = {};
Module['GenoOperators'] = GenoOperators;

GenoOperators.prototype['checkValidity'] = GenoOperators.prototype.checkValidity = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return _emscripten_bind_GenoOperators_checkValidity_2(self, arg0, arg1);
};;

GenoOperators.prototype['validate'] = GenoOperators.prototype.validate = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return _emscripten_bind_GenoOperators_validate_2(self, arg0, arg1);
};;

GenoOperators.prototype['getSimplest'] = GenoOperators.prototype.getSimplest = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenoOperators_getSimplest_0(self), SString);
};;

  GenoOperators.prototype['__destroy__'] = GenoOperators.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoOperators___destroy___0(self);
};
// Neuro
/** @suppress {undefinedVars, duplicate} */function Neuro(arg0, arg1, arg2, arg3) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Neuro_Neuro_0(); getCache(Neuro)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_Neuro_Neuro_1(arg0); getCache(Neuro)[this.ptr] = this;return }
  if (arg2 === undefined) { this.ptr = _emscripten_bind_Neuro_Neuro_2(arg0, arg1); getCache(Neuro)[this.ptr] = this;return }
  if (arg3 === undefined) { this.ptr = _emscripten_bind_Neuro_Neuro_3(arg0, arg1, arg2); getCache(Neuro)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Neuro_Neuro_4(arg0, arg1, arg2, arg3);
  getCache(Neuro)[this.ptr] = this;
};;
Neuro.prototype = Object.create(WrapperObject.prototype);
Neuro.prototype.constructor = Neuro;
Neuro.prototype.__class__ = Neuro;
Neuro.__cache__ = {};
Module['Neuro'] = Neuro;

Neuro.prototype['setInputInfo'] = Neuro.prototype.setInputInfo = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  _emscripten_bind_Neuro_setInputInfo_3(self, arg0, arg1, arg2);
};;

Neuro.prototype['getInputInfo'] = Neuro.prototype.getInputInfo = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { return wrapPointer(_emscripten_bind_Neuro_getInputInfo_1(self, arg0), SString) }
  return wrapPointer(_emscripten_bind_Neuro_getInputInfo_2(self, arg0, arg1), SString);
};;

Neuro.prototype['getClass'] = Neuro.prototype.getClass = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getClass_0(self), NeuroClass);
};;

Neuro.prototype['setClass'] = Neuro.prototype.setClass = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_setClass_1(self, arg0);
};;

Neuro.prototype['getClassParams'] = Neuro.prototype.getClassParams = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getClassParams_0(self), SString);
};;

Neuro.prototype['setClassParams'] = Neuro.prototype.setClassParams = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_setClassParams_1(self, arg0);
};;

Neuro.prototype['getClassName'] = Neuro.prototype.getClassName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getClassName_0(self), SString);
};;

Neuro.prototype['setClassName'] = Neuro.prototype.setClassName = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_setClassName_1(self, arg0);
};;

Neuro.prototype['getDetails'] = Neuro.prototype.getDetails = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getDetails_0(self), SString);
};;

Neuro.prototype['setDetails'] = Neuro.prototype.setDetails = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_setDetails_1(self, arg0);
};;

Neuro.prototype['attachToPart'] = Neuro.prototype.attachToPart = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_attachToPart_1(self, arg0);
};;

Neuro.prototype['attachToJoint'] = Neuro.prototype.attachToJoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_attachToJoint_1(self, arg0);
};;

Neuro.prototype['getPart'] = Neuro.prototype.getPart = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getPart_0(self), Part);
};;

Neuro.prototype['getJoint'] = Neuro.prototype.getJoint = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getJoint_0(self), Joint);
};;

Neuro.prototype['isOldEffector'] = Neuro.prototype.isOldEffector = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Neuro_isOldEffector_0(self));
};;

Neuro.prototype['isOldReceptor'] = Neuro.prototype.isOldReceptor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Neuro_isOldReceptor_0(self));
};;

Neuro.prototype['isOldNeuron'] = Neuro.prototype.isOldNeuron = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Neuro_isOldNeuron_0(self));
};;

Neuro.prototype['isNNConnection'] = Neuro.prototype.isNNConnection = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Neuro_isNNConnection_0(self));
};;

Neuro.prototype['getInputCount'] = Neuro.prototype.getInputCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Neuro_getInputCount_0(self);
};;

Neuro.prototype['getOutputsCount'] = Neuro.prototype.getOutputsCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Neuro_getOutputsCount_0(self);
};;

Neuro.prototype['getInput'] = Neuro.prototype.getInput = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getInput_1(self, arg0), Neuro);
};;

Neuro.prototype['getInputWeight'] = Neuro.prototype.getInputWeight = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_Neuro_getInputWeight_1(self, arg0);
};;

Neuro.prototype['setInputWeight'] = Neuro.prototype.setInputWeight = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Neuro_setInputWeight_2(self, arg0, arg1);
};;

Neuro.prototype['setInput'] = Neuro.prototype.setInput = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg2 === undefined) { _emscripten_bind_Neuro_setInput_2(self, arg0, arg1);  return }
  _emscripten_bind_Neuro_setInput_3(self, arg0, arg1, arg2);
};;

Neuro.prototype['addInput'] = Neuro.prototype.addInput = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_Neuro_addInput_3(self, arg0, arg1, arg2);
};;

Neuro.prototype['findInput'] = Neuro.prototype.findInput = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_Neuro_findInput_1(self, arg0);
};;

Neuro.prototype['removeInput'] = Neuro.prototype.removeInput = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_removeInput_1(self, arg0);
};;

Neuro.prototype['findInputs'] = Neuro.prototype.findInputs = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_Neuro_findInputs_4(self, arg0, arg1, arg2, arg3);
};;

Neuro.prototype['findOutputs'] = Neuro.prototype.findOutputs = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_Neuro_findOutputs_4(self, arg0, arg1, arg2, arg3);
};;

Neuro.prototype['getMapping'] = Neuro.prototype.getMapping = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Neuro_getMapping_0(self), MultiRange);
};;

  Neuro.prototype['get_refno'] = Neuro.prototype.get_refno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Neuro_get_refno_0(self);
};
    Neuro.prototype['set_refno'] = Neuro.prototype.set_refno = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Neuro_set_refno_1(self, arg0);
};
    Object.defineProperty(Neuro.prototype, 'refno', { get: Neuro.prototype.get_refno, set: Neuro.prototype.set_refno });
  Neuro.prototype['__destroy__'] = Neuro.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Neuro___destroy___0(self);
};
// string
/** @suppress {undefinedVars, duplicate} */function string() {
  this.ptr = _emscripten_bind_string_string_0();
  getCache(string)[this.ptr] = this;
};;
string.prototype = Object.create(WrapperObject.prototype);
string.prototype.constructor = string;
string.prototype.__class__ = string;
string.__cache__ = {};
Module['string'] = string;

string.prototype['c_str'] = string.prototype.c_str = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_string_c_str_0(self));
};;

  string.prototype['__destroy__'] = string.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_string___destroy___0(self);
};
// Geno_f4
/** @suppress {undefinedVars, duplicate} */function Geno_f4() {
  this.ptr = _emscripten_bind_Geno_f4_Geno_f4_0();
  getCache(Geno_f4)[this.ptr] = this;
};;
Geno_f4.prototype = Object.create(WrapperObject.prototype);
Geno_f4.prototype.constructor = Geno_f4;
Geno_f4.prototype.__class__ = Geno_f4;
Geno_f4.__cache__ = {};
Module['Geno_f4'] = Geno_f4;

  Geno_f4.prototype['__destroy__'] = Geno_f4.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Geno_f4___destroy___0(self);
};
// StdioFileSystem_autoselect
/** @suppress {undefinedVars, duplicate} */function StdioFileSystem_autoselect() {
  this.ptr = _emscripten_bind_StdioFileSystem_autoselect_StdioFileSystem_autoselect_0();
  getCache(StdioFileSystem_autoselect)[this.ptr] = this;
};;
StdioFileSystem_autoselect.prototype = Object.create(WrapperObject.prototype);
StdioFileSystem_autoselect.prototype.constructor = StdioFileSystem_autoselect;
StdioFileSystem_autoselect.prototype.__class__ = StdioFileSystem_autoselect;
StdioFileSystem_autoselect.__cache__ = {};
Module['StdioFileSystem_autoselect'] = StdioFileSystem_autoselect;

// GenoConvManager
/** @suppress {undefinedVars, duplicate} */function GenoConvManager() { throw "cannot construct a GenoConvManager, no constructor in IDL" }
GenoConvManager.prototype = Object.create(WrapperObject.prototype);
GenoConvManager.prototype.constructor = GenoConvManager;
GenoConvManager.prototype.__class__ = GenoConvManager;
GenoConvManager.__cache__ = {};
Module['GenoConvManager'] = GenoConvManager;

  GenoConvManager.prototype['__destroy__'] = GenoConvManager.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoConvManager___destroy___0(self);
};
// NNLayoutState
/** @suppress {undefinedVars, duplicate} */function NNLayoutState() { throw "cannot construct a NNLayoutState, no constructor in IDL" }
NNLayoutState.prototype = Object.create(WrapperObject.prototype);
NNLayoutState.prototype.constructor = NNLayoutState;
NNLayoutState.prototype.__class__ = NNLayoutState;
NNLayoutState.__cache__ = {};
Module['NNLayoutState'] = NNLayoutState;

  NNLayoutState.prototype['__destroy__'] = NNLayoutState.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NNLayoutState___destroy___0(self);
};
// Geno
/** @suppress {undefinedVars, duplicate} */function Geno(arg0, arg1, arg2, arg3) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  else arg3 = ensureString(arg3);
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Geno_Geno_0(); getCache(Geno)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_Geno_Geno_1(arg0); getCache(Geno)[this.ptr] = this;return }
  if (arg2 === undefined) { this.ptr = _emscripten_bind_Geno_Geno_2(arg0, arg1); getCache(Geno)[this.ptr] = this;return }
  if (arg3 === undefined) { this.ptr = _emscripten_bind_Geno_Geno_3(arg0, arg1, arg2); getCache(Geno)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Geno_Geno_4(arg0, arg1, arg2, arg3);
  getCache(Geno)[this.ptr] = this;
};;
Geno.prototype = Object.create(WrapperObject.prototype);
Geno.prototype.constructor = Geno;
Geno.prototype.__class__ = Geno;
Geno.__cache__ = {};
Module['Geno'] = Geno;

Geno.prototype['isValid'] = Geno.prototype.isValid = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Geno_isValid_0(self));
};;

Geno.prototype['getFormat'] = Geno.prototype.getFormat = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Geno_getFormat_0(self);
};;

Geno.prototype['getGenes'] = Geno.prototype.getGenes = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Geno_getGenes_0(self), SString);
};;

Geno.prototype['useValidators'] = Geno.prototype.useValidators = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Geno_useValidators_1(self, arg0), Validators);
};;

Geno.prototype['useConverters'] = Geno.prototype.useConverters = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Geno_useConverters_1(self, arg0), GenoConvManager);
};;

  Geno.prototype['__destroy__'] = Geno.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Geno___destroy___0(self);
};
// GenotypeMiniLoader
/** @suppress {undefinedVars, duplicate} */function GenotypeMiniLoader(arg0) {
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_GenotypeMiniLoader_GenotypeMiniLoader_1(arg0);
  getCache(GenotypeMiniLoader)[this.ptr] = this;
};;
GenotypeMiniLoader.prototype = Object.create(WrapperObject.prototype);
GenotypeMiniLoader.prototype.constructor = GenotypeMiniLoader;
GenotypeMiniLoader.prototype.__class__ = GenotypeMiniLoader;
GenotypeMiniLoader.__cache__ = {};
Module['GenotypeMiniLoader'] = GenotypeMiniLoader;

GenotypeMiniLoader.prototype['loadNextGenotype'] = GenotypeMiniLoader.prototype.loadNextGenotype = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenotypeMiniLoader_loadNextGenotype_0(self), GenotypeMini);
};;

  GenotypeMiniLoader.prototype['__destroy__'] = GenotypeMiniLoader.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenotypeMiniLoader___destroy___0(self);
};
// Model
/** @suppress {undefinedVars, duplicate} */function Model(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Model_Model_0(); getCache(Model)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_Model_Model_1(arg0); getCache(Model)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Model_Model_2(arg0, arg1);
  getCache(Model)[this.ptr] = this;
};;
Model.prototype = Object.create(WrapperObject.prototype);
Model.prototype.constructor = Model;
Model.prototype.__class__ = Model;
Model.__cache__ = {};
Module['Model'] = Model;

Model.prototype['getMap'] = Model.prototype.getMap = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_getMap_0(self), MultiMap);
};;

Model.prototype['getF0Map'] = Model.prototype.getF0Map = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_getF0Map_0(self), MultiMap);
};;

Model.prototype['getCurrentToF0Map'] = Model.prototype.getCurrentToF0Map = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_getCurrentToF0Map_1(self, arg0);
};;

Model.prototype['getStatus'] = Model.prototype.getStatus = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getStatus_0(self);
};;

Model.prototype['isValid'] = Model.prototype.isValid = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Model_isValid_0(self));
};;

Model.prototype['getErrorPosition'] = Model.prototype.getErrorPosition = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_Model_getErrorPosition_1(self, arg0);
};;

Model.prototype['getShapeType'] = Model.prototype.getShapeType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getShapeType_0(self);
};;

Model.prototype['updateRefno'] = Model.prototype.updateRefno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model_updateRefno_0(self);
};;

Model.prototype['getF0Geno'] = Model.prototype.getF0Geno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_getF0Geno_0(self), Geno);
};;

Model.prototype['makeGeno'] = Model.prototype.makeGeno = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_makeGeno_1(self, arg0);
};;

Model.prototype['setGeno'] = Model.prototype.setGeno = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_setGeno_1(self, arg0);
};;

Model.prototype['setValidationLevel'] = Model.prototype.setValidationLevel = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_setValidationLevel_1(self, arg0);
};;

Model.prototype['whereDelta'] = Model.prototype.whereDelta = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_Model_whereDelta_3(self, arg0, arg1, arg2), Pt3D);
};;

Model.prototype['resetAllDelta'] = Model.prototype.resetAllDelta = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model_resetAllDelta_0(self);
};;

Model.prototype['useAllDelta'] = Model.prototype.useAllDelta = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_useAllDelta_1(self, arg0);
};;

Model.prototype['validate'] = Model.prototype.validate = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Model_validate_0(self));
};;

Model.prototype['getPartCount'] = Model.prototype.getPartCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getPartCount_0(self);
};;

Model.prototype['getPart'] = Model.prototype.getPart = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_getPart_1(self, arg0), Part);
};;

Model.prototype['getJointCount'] = Model.prototype.getJointCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getJointCount_0(self);
};;

Model.prototype['getJoint'] = Model.prototype.getJoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_getJoint_1(self, arg0), Joint);
};;

Model.prototype['getNeuroCount'] = Model.prototype.getNeuroCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getNeuroCount_0(self);
};;

Model.prototype['getConnectionCount'] = Model.prototype.getConnectionCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_getConnectionCount_0(self);
};;

Model.prototype['getNeuro'] = Model.prototype.getNeuro = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_getNeuro_1(self, arg0), Neuro);
};;

Model.prototype['addPart'] = Model.prototype.addPart = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_addPart_1(self, arg0), Part);
};;

Model.prototype['addJoint'] = Model.prototype.addJoint = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_addJoint_1(self, arg0), Joint);
};;

Model.prototype['addNeuro'] = Model.prototype.addNeuro = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_addNeuro_1(self, arg0), Neuro);
};;

Model.prototype['addNewPart'] = Model.prototype.addNewPart = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Model_addNewPart_1(self, arg0), Part);
};;

Model.prototype['addNewJoint'] = Model.prototype.addNewJoint = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_Model_addNewJoint_3(self, arg0, arg1, arg2), Joint);
};;

Model.prototype['addNewNeuro'] = Model.prototype.addNewNeuro = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_addNewNeuro_0(self), Neuro);
};;

Model.prototype['removePart'] = Model.prototype.removePart = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg1 === undefined) { _emscripten_bind_Model_removePart_1(self, arg0);  return }
  if (arg2 === undefined) { _emscripten_bind_Model_removePart_2(self, arg0, arg1);  return }
  _emscripten_bind_Model_removePart_3(self, arg0, arg1, arg2);
};;

Model.prototype['removeJoint'] = Model.prototype.removeJoint = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { _emscripten_bind_Model_removeJoint_1(self, arg0);  return }
  _emscripten_bind_Model_removeJoint_2(self, arg0, arg1);
};;

Model.prototype['removeNeuro'] = Model.prototype.removeNeuro = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { _emscripten_bind_Model_removeNeuro_1(self, arg0);  return }
  _emscripten_bind_Model_removeNeuro_2(self, arg0, arg1);
};;

Model.prototype['removeNeuros'] = Model.prototype.removeNeuros = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_removeNeuros_1(self, arg0);
};;

Model.prototype['findPart'] = Model.prototype.findPart = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_Model_findPart_1(self, arg0);
};;

Model.prototype['findJoint'] = Model.prototype.findJoint = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { return _emscripten_bind_Model_findJoint_1(self, arg0) }
  return _emscripten_bind_Model_findJoint_2(self, arg0, arg1);
};;

Model.prototype['findNeuro'] = Model.prototype.findNeuro = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_Model_findNeuro_1(self, arg0);
};;

Model.prototype['findNeuros'] = Model.prototype.findNeuros = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_Model_findNeuros_4(self, arg0, arg1, arg2, arg3);
};;

Model.prototype['findJoints'] = Model.prototype.findJoints = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_Model_findJoints_2(self, arg0, arg1);
};;

Model.prototype['move'] = Model.prototype.move = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_move_1(self, arg0);
};;

Model.prototype['rotate'] = Model.prototype.rotate = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_rotate_1(self, arg0);
};;

Model.prototype['buildUsingSolidShapeTypes'] = Model.prototype.buildUsingSolidShapeTypes = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg1 === undefined) { _emscripten_bind_Model_buildUsingSolidShapeTypes_1(self, arg0);  return }
  if (arg2 === undefined) { _emscripten_bind_Model_buildUsingSolidShapeTypes_2(self, arg0, arg1);  return }
  _emscripten_bind_Model_buildUsingSolidShapeTypes_3(self, arg0, arg1, arg2);
};;

Model.prototype['open'] = Model.prototype.open = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model_open_0(self);
};;

Model.prototype['close'] = Model.prototype.close = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model_close_0(self);
};;

Model.prototype['rebuild'] = Model.prototype.rebuild = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg1 === undefined) { _emscripten_bind_Model_rebuild_1(self, arg0);  return }
  _emscripten_bind_Model_rebuild_2(self, arg0, arg1);
};;

Model.prototype['clear'] = Model.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model_clear_0(self);
};;

Model.prototype['getGeno'] = Model.prototype.getGeno = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_getGeno_0(self), Geno);
};;

  Model.prototype['get_size'] = Model.prototype.get_size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_get_size_0(self), Pt3D);
};
    Model.prototype['set_size'] = Model.prototype.set_size = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_set_size_1(self, arg0);
};
    Object.defineProperty(Model.prototype, 'size', { get: Model.prototype.get_size, set: Model.prototype.set_size });
  Model.prototype['get_vis_style'] = Model.prototype.get_vis_style = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Model_get_vis_style_0(self), SString);
};
    Model.prototype['set_vis_style'] = Model.prototype.set_vis_style = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_set_vis_style_1(self, arg0);
};
    Object.defineProperty(Model.prototype, 'vis_style', { get: Model.prototype.get_vis_style, set: Model.prototype.set_vis_style });
  Model.prototype['get_startenergy'] = Model.prototype.get_startenergy = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Model_get_startenergy_0(self);
};
    Model.prototype['set_startenergy'] = Model.prototype.set_startenergy = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Model_set_startenergy_1(self, arg0);
};
    Object.defineProperty(Model.prototype, 'startenergy', { get: Model.prototype.get_startenergy, set: Model.prototype.set_startenergy });
  Model.prototype['__destroy__'] = Model.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Model___destroy___0(self);
};
// SaveFileHelper
/** @suppress {undefinedVars, duplicate} */function SaveFileHelper() {
  this.ptr = _emscripten_bind_SaveFileHelper_SaveFileHelper_0();
  getCache(SaveFileHelper)[this.ptr] = this;
};;
SaveFileHelper.prototype = Object.create(WrapperObject.prototype);
SaveFileHelper.prototype.constructor = SaveFileHelper;
SaveFileHelper.prototype.__class__ = SaveFileHelper;
SaveFileHelper.__cache__ = {};
Module['SaveFileHelper'] = SaveFileHelper;

SaveFileHelper.prototype['Vfopen'] = SaveFileHelper.prototype.Vfopen = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return wrapPointer(_emscripten_bind_SaveFileHelper_Vfopen_2(self, arg0, arg1), VirtFILE);
};;

SaveFileHelper.prototype['getMinigenotype_paramtab'] = SaveFileHelper.prototype.getMinigenotype_paramtab = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_SaveFileHelper_getMinigenotype_paramtab_0(self), ParamEntry);
};;

  SaveFileHelper.prototype['__destroy__'] = SaveFileHelper.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SaveFileHelper___destroy___0(self);
};
// PreconfiguredGenetics
/** @suppress {undefinedVars, duplicate} */function PreconfiguredGenetics() {
  this.ptr = _emscripten_bind_PreconfiguredGenetics_PreconfiguredGenetics_0();
  getCache(PreconfiguredGenetics)[this.ptr] = this;
};;
PreconfiguredGenetics.prototype = Object.create(WrapperObject.prototype);
PreconfiguredGenetics.prototype.constructor = PreconfiguredGenetics;
PreconfiguredGenetics.prototype.__class__ = PreconfiguredGenetics;
PreconfiguredGenetics.__cache__ = {};
Module['PreconfiguredGenetics'] = PreconfiguredGenetics;

  PreconfiguredGenetics.prototype['get_gcm'] = PreconfiguredGenetics.prototype.get_gcm = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PreconfiguredGenetics_get_gcm_0(self), DefaultGenoConvManager);
};
    PreconfiguredGenetics.prototype['set_gcm'] = PreconfiguredGenetics.prototype.set_gcm = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PreconfiguredGenetics_set_gcm_1(self, arg0);
};
    Object.defineProperty(PreconfiguredGenetics.prototype, 'gcm', { get: PreconfiguredGenetics.prototype.get_gcm, set: PreconfiguredGenetics.prototype.set_gcm });
  PreconfiguredGenetics.prototype['get_genman'] = PreconfiguredGenetics.prototype.get_genman = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PreconfiguredGenetics_get_genman_0(self), GenMan);
};
    PreconfiguredGenetics.prototype['set_genman'] = PreconfiguredGenetics.prototype.set_genman = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PreconfiguredGenetics_set_genman_1(self, arg0);
};
    Object.defineProperty(PreconfiguredGenetics.prototype, 'genman', { get: PreconfiguredGenetics.prototype.get_genman, set: PreconfiguredGenetics.prototype.set_genman });
  PreconfiguredGenetics.prototype['get_validators'] = PreconfiguredGenetics.prototype.get_validators = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PreconfiguredGenetics_get_validators_0(self), Validators);
};
    PreconfiguredGenetics.prototype['set_validators'] = PreconfiguredGenetics.prototype.set_validators = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PreconfiguredGenetics_set_validators_1(self, arg0);
};
    Object.defineProperty(PreconfiguredGenetics.prototype, 'validators', { get: PreconfiguredGenetics.prototype.get_validators, set: PreconfiguredGenetics.prototype.set_validators });
  PreconfiguredGenetics.prototype['get_model_validator'] = PreconfiguredGenetics.prototype.get_model_validator = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PreconfiguredGenetics_get_model_validator_0(self), ModelGenoValidator);
};
    PreconfiguredGenetics.prototype['set_model_validator'] = PreconfiguredGenetics.prototype.set_model_validator = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PreconfiguredGenetics_set_model_validator_1(self, arg0);
};
    Object.defineProperty(PreconfiguredGenetics.prototype, 'model_validator', { get: PreconfiguredGenetics.prototype.get_model_validator, set: PreconfiguredGenetics.prototype.set_model_validator });
  PreconfiguredGenetics.prototype['__destroy__'] = PreconfiguredGenetics.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PreconfiguredGenetics___destroy___0(self);
};
// XYWH
/** @suppress {undefinedVars, duplicate} */function XYWH(arg0, arg1, arg2, arg3) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  this.ptr = _emscripten_bind_XYWH_XYWH_4(arg0, arg1, arg2, arg3);
  getCache(XYWH)[this.ptr] = this;
};;
XYWH.prototype = Object.create(WrapperObject.prototype);
XYWH.prototype.constructor = XYWH;
XYWH.prototype.__class__ = XYWH;
XYWH.__cache__ = {};
Module['XYWH'] = XYWH;

  XYWH.prototype['get_x'] = XYWH.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XYWH_get_x_0(self);
};
    XYWH.prototype['set_x'] = XYWH.prototype.set_x = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XYWH_set_x_1(self, arg0);
};
    Object.defineProperty(XYWH.prototype, 'x', { get: XYWH.prototype.get_x, set: XYWH.prototype.set_x });
  XYWH.prototype['get_y'] = XYWH.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XYWH_get_y_0(self);
};
    XYWH.prototype['set_y'] = XYWH.prototype.set_y = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XYWH_set_y_1(self, arg0);
};
    Object.defineProperty(XYWH.prototype, 'y', { get: XYWH.prototype.get_y, set: XYWH.prototype.set_y });
  XYWH.prototype['get_w'] = XYWH.prototype.get_w = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XYWH_get_w_0(self);
};
    XYWH.prototype['set_w'] = XYWH.prototype.set_w = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XYWH_set_w_1(self, arg0);
};
    Object.defineProperty(XYWH.prototype, 'w', { get: XYWH.prototype.get_w, set: XYWH.prototype.set_w });
  XYWH.prototype['get_h'] = XYWH.prototype.get_h = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XYWH_get_h_0(self);
};
    XYWH.prototype['set_h'] = XYWH.prototype.set_h = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XYWH_set_h_1(self, arg0);
};
    Object.defineProperty(XYWH.prototype, 'h', { get: XYWH.prototype.get_h, set: XYWH.prototype.set_h });
  XYWH.prototype['__destroy__'] = XYWH.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_XYWH___destroy___0(self);
};
// LoggerBase
/** @suppress {undefinedVars, duplicate} */function LoggerBase(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_LoggerBase_LoggerBase_0(); getCache(LoggerBase)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_LoggerBase_LoggerBase_1(arg0);
  getCache(LoggerBase)[this.ptr] = this;
};;
LoggerBase.prototype = Object.create(WrapperObject.prototype);
LoggerBase.prototype.constructor = LoggerBase;
LoggerBase.prototype.__class__ = LoggerBase;
LoggerBase.__cache__ = {};
Module['LoggerBase'] = LoggerBase;

  LoggerBase.prototype['__destroy__'] = LoggerBase.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LoggerBase___destroy___0(self);
};
// GenotypeMini
/** @suppress {undefinedVars, duplicate} */function GenotypeMini() {
  this.ptr = _emscripten_bind_GenotypeMini_GenotypeMini_0();
  getCache(GenotypeMini)[this.ptr] = this;
};;
GenotypeMini.prototype = Object.create(WrapperObject.prototype);
GenotypeMini.prototype.constructor = GenotypeMini;
GenotypeMini.prototype.__class__ = GenotypeMini;
GenotypeMini.__cache__ = {};
Module['GenotypeMini'] = GenotypeMini;

GenotypeMini.prototype['clear'] = GenotypeMini.prototype.clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenotypeMini_clear_0(self);
};;

  GenotypeMini.prototype['get_name'] = GenotypeMini.prototype.get_name = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenotypeMini_get_name_0(self), SString);
};
    GenotypeMini.prototype['set_name'] = GenotypeMini.prototype.set_name = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GenotypeMini_set_name_1(self, arg0);
};
    Object.defineProperty(GenotypeMini.prototype, 'name', { get: GenotypeMini.prototype.get_name, set: GenotypeMini.prototype.set_name });
  GenotypeMini.prototype['get_genotype'] = GenotypeMini.prototype.get_genotype = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenotypeMini_get_genotype_0(self), SString);
};
    GenotypeMini.prototype['set_genotype'] = GenotypeMini.prototype.set_genotype = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GenotypeMini_set_genotype_1(self, arg0);
};
    Object.defineProperty(GenotypeMini.prototype, 'genotype', { get: GenotypeMini.prototype.get_genotype, set: GenotypeMini.prototype.set_genotype });
  GenotypeMini.prototype['get_info'] = GenotypeMini.prototype.get_info = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GenotypeMini_get_info_0(self), SString);
};
    GenotypeMini.prototype['set_info'] = GenotypeMini.prototype.set_info = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GenotypeMini_set_info_1(self, arg0);
};
    Object.defineProperty(GenotypeMini.prototype, 'info', { get: GenotypeMini.prototype.get_info, set: GenotypeMini.prototype.set_info });
  GenotypeMini.prototype['__destroy__'] = GenotypeMini.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenotypeMini___destroy___0(self);
};
// GenoOper_f9
/** @suppress {undefinedVars, duplicate} */function GenoOper_f9() {
  this.ptr = _emscripten_bind_GenoOper_f9_GenoOper_f9_0();
  getCache(GenoOper_f9)[this.ptr] = this;
};;
GenoOper_f9.prototype = Object.create(WrapperObject.prototype);
GenoOper_f9.prototype.constructor = GenoOper_f9;
GenoOper_f9.prototype.__class__ = GenoOper_f9;
GenoOper_f9.__cache__ = {};
Module['GenoOper_f9'] = GenoOper_f9;

  GenoOper_f9.prototype['__destroy__'] = GenoOper_f9.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_GenoOper_f9___destroy___0(self);
};
// SString
/** @suppress {undefinedVars, duplicate} */function SString() {
  this.ptr = _emscripten_bind_SString_SString_0();
  getCache(SString)[this.ptr] = this;
};;
SString.prototype = Object.create(WrapperObject.prototype);
SString.prototype.constructor = SString;
SString.prototype.__class__ = SString;
SString.__cache__ = {};
Module['SString'] = SString;

SString.prototype['set'] = SString.prototype.set = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_SString_set_1(self, arg0);
};;

SString.prototype['c_str'] = SString.prototype.c_str = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_SString_c_str_0(self));
};;

  SString.prototype['__destroy__'] = SString.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SString___destroy___0(self);
};
// NNLayoutState_Model_Fred
/** @suppress {undefinedVars, duplicate} */function NNLayoutState_Model_Fred(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_NNLayoutState_Model_Fred_NNLayoutState_Model_Fred_1(arg0);
  getCache(NNLayoutState_Model_Fred)[this.ptr] = this;
};;
NNLayoutState_Model_Fred.prototype = Object.create(WrapperObject.prototype);
NNLayoutState_Model_Fred.prototype.constructor = NNLayoutState_Model_Fred;
NNLayoutState_Model_Fred.prototype.__class__ = NNLayoutState_Model_Fred;
NNLayoutState_Model_Fred.__cache__ = {};
Module['NNLayoutState_Model_Fred'] = NNLayoutState_Model_Fred;

NNLayoutState_Model_Fred.prototype['GetElements'] = NNLayoutState_Model_Fred.prototype.GetElements = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_NNLayoutState_Model_Fred_GetElements_0(self);
};;

NNLayoutState_Model_Fred.prototype['GetValueXYWH'] = NNLayoutState_Model_Fred.prototype.GetValueXYWH = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_NNLayoutState_Model_Fred_GetValueXYWH_1(self, arg0), XYWH);
};;

NNLayoutState_Model_Fred.prototype['SetXYWH'] = NNLayoutState_Model_Fred.prototype.SetXYWH = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  _emscripten_bind_NNLayoutState_Model_Fred_SetXYWH_5(self, arg0, arg1, arg2, arg3, arg4);
};;

NNLayoutState_Model_Fred.prototype['GetInputs'] = NNLayoutState_Model_Fred.prototype.GetInputs = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_NNLayoutState_Model_Fred_GetInputs_1(self, arg0);
};;

NNLayoutState_Model_Fred.prototype['GetLink'] = NNLayoutState_Model_Fred.prototype.GetLink = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_NNLayoutState_Model_Fred_GetLink_2(self, arg0, arg1);
};;

NNLayoutState_Model_Fred.prototype['GetLinkValueXY'] = NNLayoutState_Model_Fred.prototype.GetLinkValueXY = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_NNLayoutState_Model_Fred_GetLinkValueXY_2(self, arg0, arg1), XY);
};;

  NNLayoutState_Model_Fred.prototype['__destroy__'] = NNLayoutState_Model_Fred.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_NNLayoutState_Model_Fred___destroy___0(self);
};
// ParamTreeConfigured
/** @suppress {undefinedVars, duplicate} */function ParamTreeConfigured() {
  this.ptr = _emscripten_bind_ParamTreeConfigured_ParamTreeConfigured_0();
  getCache(ParamTreeConfigured)[this.ptr] = this;
};;
ParamTreeConfigured.prototype = Object.create(WrapperObject.prototype);
ParamTreeConfigured.prototype.constructor = ParamTreeConfigured;
ParamTreeConfigured.prototype.__class__ = ParamTreeConfigured;
ParamTreeConfigured.__cache__ = {};
Module['ParamTreeConfigured'] = ParamTreeConfigured;

ParamTreeConfigured.prototype['generateTree'] = ParamTreeConfigured.prototype.generateTree = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeConfigured_generateTree_0(self), ParamTree);
};;

  ParamTreeConfigured.prototype['get_tree'] = ParamTreeConfigured.prototype.get_tree = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeConfigured_get_tree_0(self), ParamTree);
};
    ParamTreeConfigured.prototype['set_tree'] = ParamTreeConfigured.prototype.set_tree = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeConfigured_set_tree_1(self, arg0);
};
    Object.defineProperty(ParamTreeConfigured.prototype, 'tree', { get: ParamTreeConfigured.prototype.get_tree, set: ParamTreeConfigured.prototype.set_tree });
  ParamTreeConfigured.prototype['get_paramiface'] = ParamTreeConfigured.prototype.get_paramiface = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ParamTreeConfigured_get_paramiface_0(self), MutableParamList);
};
    ParamTreeConfigured.prototype['set_paramiface'] = ParamTreeConfigured.prototype.set_paramiface = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ParamTreeConfigured_set_paramiface_1(self, arg0);
};
    Object.defineProperty(ParamTreeConfigured.prototype, 'paramiface', { get: ParamTreeConfigured.prototype.get_paramiface, set: ParamTreeConfigured.prototype.set_paramiface });
  ParamTreeConfigured.prototype['__destroy__'] = ParamTreeConfigured.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParamTreeConfigured___destroy___0(self);
};
// XY
/** @suppress {undefinedVars, duplicate} */function XY(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_XY_XY_2(arg0, arg1);
  getCache(XY)[this.ptr] = this;
};;
XY.prototype = Object.create(WrapperObject.prototype);
XY.prototype.constructor = XY;
XY.prototype.__class__ = XY;
XY.__cache__ = {};
Module['XY'] = XY;

  XY.prototype['get_x'] = XY.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XY_get_x_0(self);
};
    XY.prototype['set_x'] = XY.prototype.set_x = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XY_set_x_1(self, arg0);
};
    Object.defineProperty(XY.prototype, 'x', { get: XY.prototype.get_x, set: XY.prototype.set_x });
  XY.prototype['get_y'] = XY.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_XY_get_y_0(self);
};
    XY.prototype['set_y'] = XY.prototype.set_y = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_XY_set_y_1(self, arg0);
};
    Object.defineProperty(XY.prototype, 'y', { get: XY.prototype.get_y, set: XY.prototype.set_y });
  XY.prototype['__destroy__'] = XY.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_XY___destroy___0(self);
};
// Validators
/** @suppress {undefinedVars, duplicate} */function Validators() {
  this.ptr = _emscripten_bind_Validators_Validators_0();
  getCache(Validators)[this.ptr] = this;
};;
Validators.prototype = Object.create(WrapperObject.prototype);
Validators.prototype.constructor = Validators;
Validators.prototype.__class__ = Validators;
Validators.__cache__ = {};
Module['Validators'] = Validators;

Validators.prototype['append'] = Validators.prototype.append = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Validators_append_1(self, arg0);
};;

  Validators.prototype['__destroy__'] = Validators.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Validators___destroy___0(self);
};
// SimpleAbstractParam
/** @suppress {undefinedVars, duplicate} */function SimpleAbstractParam() { throw "cannot construct a SimpleAbstractParam, no constructor in IDL" }
SimpleAbstractParam.prototype = Object.create(WrapperObject.prototype);
SimpleAbstractParam.prototype.constructor = SimpleAbstractParam;
SimpleAbstractParam.prototype.__class__ = SimpleAbstractParam;
SimpleAbstractParam.__cache__ = {};
Module['SimpleAbstractParam'] = SimpleAbstractParam;

  SimpleAbstractParam.prototype['__destroy__'] = SimpleAbstractParam.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_SimpleAbstractParam___destroy___0(self);
};
// VirtFILE
/** @suppress {undefinedVars, duplicate} */function VirtFILE() { throw "cannot construct a VirtFILE, no constructor in IDL" }
VirtFILE.prototype = Object.create(WrapperObject.prototype);
VirtFILE.prototype.constructor = VirtFILE;
VirtFILE.prototype.__class__ = VirtFILE;
VirtFILE.__cache__ = {};
Module['VirtFILE'] = VirtFILE;

  VirtFILE.prototype['__destroy__'] = VirtFILE.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VirtFILE___destroy___0(self);
};
// MultiRange
/** @suppress {undefinedVars, duplicate} */function MultiRange() { throw "cannot construct a MultiRange, no constructor in IDL" }
MultiRange.prototype = Object.create(WrapperObject.prototype);
MultiRange.prototype.constructor = MultiRange;
MultiRange.prototype.__class__ = MultiRange;
MultiRange.__cache__ = {};
Module['MultiRange'] = MultiRange;

MultiRange.prototype['rangeCount'] = MultiRange.prototype.rangeCount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_MultiRange_rangeCount_0(self);
};;

MultiRange.prototype['getRange'] = MultiRange.prototype.getRange = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_MultiRange_getRange_1(self, arg0), IRange);
};;

  MultiRange.prototype['__destroy__'] = MultiRange.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_MultiRange___destroy___0(self);
};
// Orient
/** @suppress {undefinedVars, duplicate} */function Orient(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Orient_Orient_0(); getCache(Orient)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_Orient_Orient_1(arg0); getCache(Orient)[this.ptr] = this;return }
  if (arg2 === undefined) { this.ptr = _emscripten_bind_Orient_Orient_2(arg0, arg1); getCache(Orient)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Orient_Orient_3(arg0, arg1, arg2);
  getCache(Orient)[this.ptr] = this;
};;
Orient.prototype = Object.create(WrapperObject.prototype);
Orient.prototype.constructor = Orient;
Orient.prototype.__class__ = Orient;
Orient.__cache__ = {};
Module['Orient'] = Orient;

Orient.prototype['rotate'] = Orient.prototype.rotate = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_rotate_1(self, arg0);
};;

Orient.prototype['transform'] = Orient.prototype.transform = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Orient_transform_1(self, arg0), Pt3D);
};;

Orient.prototype['revTransform'] = Orient.prototype.revTransform = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_Orient_revTransform_1(self, arg0), Pt3D);
};;

Orient.prototype['transformSelf'] = Orient.prototype.transformSelf = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_transformSelf_1(self, arg0);
};;

Orient.prototype['revTransformSelf'] = Orient.prototype.revTransformSelf = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_revTransformSelf_1(self, arg0);
};;

Orient.prototype['getAngles'] = Orient.prototype.getAngles = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Orient_getAngles_0(self), Pt3D);
};;

Orient.prototype['lookAt'] = Orient.prototype.lookAt = /** @suppress {undefinedVars, duplicate} */function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_Orient_lookAt_2(self, arg0, arg1);
};;

Orient.prototype['normalize'] = Orient.prototype.normalize = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_Orient_normalize_0(self));
};;

  Orient.prototype['get_x'] = Orient.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Orient_get_x_0(self), Pt3D);
};
    Orient.prototype['set_x'] = Orient.prototype.set_x = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_set_x_1(self, arg0);
};
    Object.defineProperty(Orient.prototype, 'x', { get: Orient.prototype.get_x, set: Orient.prototype.set_x });
  Orient.prototype['get_y'] = Orient.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Orient_get_y_0(self), Pt3D);
};
    Orient.prototype['set_y'] = Orient.prototype.set_y = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_set_y_1(self, arg0);
};
    Object.defineProperty(Orient.prototype, 'y', { get: Orient.prototype.get_y, set: Orient.prototype.set_y });
  Orient.prototype['get_z'] = Orient.prototype.get_z = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Orient_get_z_0(self), Pt3D);
};
    Orient.prototype['set_z'] = Orient.prototype.set_z = /** @suppress {undefinedVars, duplicate} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Orient_set_z_1(self, arg0);
};
    Object.defineProperty(Orient.prototype, 'z', { get: Orient.prototype.get_z, set: Orient.prototype.set_z });
  Orient.prototype['__destroy__'] = Orient.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Orient___destroy___0(self);
};
// DefaultGenoConvManager
/** @suppress {undefinedVars, duplicate} */function DefaultGenoConvManager() {
  this.ptr = _emscripten_bind_DefaultGenoConvManager_DefaultGenoConvManager_0();
  getCache(DefaultGenoConvManager)[this.ptr] = this;
};;
DefaultGenoConvManager.prototype = Object.create(WrapperObject.prototype);
DefaultGenoConvManager.prototype.constructor = DefaultGenoConvManager;
DefaultGenoConvManager.prototype.__class__ = DefaultGenoConvManager;
DefaultGenoConvManager.__cache__ = {};
Module['DefaultGenoConvManager'] = DefaultGenoConvManager;

DefaultGenoConvManager.prototype['addDefaultConverters'] = DefaultGenoConvManager.prototype.addDefaultConverters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_DefaultGenoConvManager_addDefaultConverters_0(self);
};;

  DefaultGenoConvManager.prototype['__destroy__'] = DefaultGenoConvManager.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_DefaultGenoConvManager___destroy___0(self);
};
(function() {
  function setupEnums() {
    

    // Part_Shape

    Module['Part']['SHAPE_BALL_AND_STICK'] = _emscripten_enum_Part_Shape_SHAPE_BALL_AND_STICK();

    Module['Part']['SHAPE_ELLIPSOID'] = _emscripten_enum_Part_Shape_SHAPE_ELLIPSOID();

    Module['Part']['SHAPE_CUBOID'] = _emscripten_enum_Part_Shape_SHAPE_CUBOID();

    Module['Part']['SHAPE_CYLINDER'] = _emscripten_enum_Part_Shape_SHAPE_CYLINDER();

    

    // NeuroClass_Hint

    Module['NeuroClass']['Invisible'] = _emscripten_enum_NeuroClass_Hint_Invisible();

    Module['NeuroClass']['DontShowClass'] = _emscripten_enum_NeuroClass_Hint_DontShowClass();

    Module['NeuroClass']['AtFirstPart'] = _emscripten_enum_NeuroClass_Hint_AtFirstPart();

    Module['NeuroClass']['AtSecondPart'] = _emscripten_enum_NeuroClass_Hint_AtSecondPart();

    Module['NeuroClass']['EffectorClass'] = _emscripten_enum_NeuroClass_Hint_EffectorClass();

    Module['NeuroClass']['ReceptorClass'] = _emscripten_enum_NeuroClass_Hint_ReceptorClass();

    Module['NeuroClass']['V1BendMuscle'] = _emscripten_enum_NeuroClass_Hint_V1BendMuscle();

    Module['NeuroClass']['V1RotMuscle'] = _emscripten_enum_NeuroClass_Hint_V1RotMuscle();

    Module['NeuroClass']['LinearMuscle'] = _emscripten_enum_NeuroClass_Hint_LinearMuscle();

    

    // LoggerToMemory_Options2

    Module['LoggerToMemory']['StoreFirstMessage'] = _emscripten_enum_LoggerToMemory_Options2_StoreFirstMessage();

    Module['LoggerToMemory']['StoreAllMessages'] = _emscripten_enum_LoggerToMemory_Options2_StoreAllMessages();

    

    // LoggerBase_LoggerOptions

    Module['LoggerBase']['DontBlock'] = _emscripten_enum_LoggerBase_LoggerOptions_DontBlock();

    Module['LoggerBase']['CannotBeBlocked'] = _emscripten_enum_LoggerBase_LoggerOptions_CannotBeBlocked();

    Module['LoggerBase']['Enable'] = _emscripten_enum_LoggerBase_LoggerOptions_Enable();

    Module['LoggerBase']['Paused'] = _emscripten_enum_LoggerBase_LoggerOptions_Paused();

    

    // Joint_Shape

    Module['Joint']['SHAPE_BALL_AND_STICK'] = _emscripten_enum_Joint_Shape_SHAPE_BALL_AND_STICK();

    Module['Joint']['SHAPE_FIXED'] = _emscripten_enum_Joint_Shape_SHAPE_FIXED();

    

    // Model_ShapeType

    Module['Model']['SHAPE_UNKNOWN'] = _emscripten_enum_Model_ShapeType_SHAPE_UNKNOWN();

    Module['Model']['SHAPE_ILLEGAL'] = _emscripten_enum_Model_ShapeType_SHAPE_ILLEGAL();

    Module['Model']['SHAPE_BALL_AND_STICK'] = _emscripten_enum_Model_ShapeType_SHAPE_BALL_AND_STICK();

    Module['Model']['SHAPE_SOLIDS'] = _emscripten_enum_Model_ShapeType_SHAPE_SOLIDS();

    

    // ModelBuildStatus

    Module['empty'] = _emscripten_enum_ModelBuildStatus_empty();

    Module['building'] = _emscripten_enum_ModelBuildStatus_building();

    Module['invalid'] = _emscripten_enum_ModelBuildStatus_invalid();

    Module['valid'] = _emscripten_enum_ModelBuildStatus_valid();

  }
  if (runtimeInitialized) setupEnums();
  else addOnPreMain(setupEnums);
})();
