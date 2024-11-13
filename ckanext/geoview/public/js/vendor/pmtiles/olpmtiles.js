"use strict";
var olpmtiles = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      "use strict";
      exports.read = function(buffer2, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i2 = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer2[offset + i2];
        i2 += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i2 = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer2[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer2[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
        }
        buffer2[offset + i2 - d] |= s * 128;
      };
    }
  });

  // node_modules/pbf/index.js
  var require_pbf = __commonJS({
    "node_modules/pbf/index.js"(exports, module) {
      "use strict";
      module.exports = Pbf;
      var ieee754 = require_ieee754();
      function Pbf(buf) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
      }
      __name(Pbf, "Pbf");
      Pbf.Varint = 0;
      Pbf.Fixed64 = 1;
      Pbf.Bytes = 2;
      Pbf.Fixed32 = 5;
      var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
      var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
      var TEXT_DECODER_MIN_LENGTH = 12;
      var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf8");
      Pbf.prototype = {
        destroy: /* @__PURE__ */ __name(function() {
          this.buf = null;
        }, "destroy"),
        // === READING =================================================================
        readFields: /* @__PURE__ */ __name(function(readField, result, end) {
          end = end || this.length;
          while (this.pos < end) {
            var val = this.readVarint(), tag = val >> 3, startPos = this.pos;
            this.type = val & 7;
            readField(tag, result, this);
            if (this.pos === startPos) this.skip(val);
          }
          return result;
        }, "readFields"),
        readMessage: /* @__PURE__ */ __name(function(readField, result) {
          return this.readFields(readField, result, this.readVarint() + this.pos);
        }, "readMessage"),
        readFixed32: /* @__PURE__ */ __name(function() {
          var val = readUInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        }, "readFixed32"),
        readSFixed32: /* @__PURE__ */ __name(function() {
          var val = readInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        }, "readSFixed32"),
        // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)
        readFixed64: /* @__PURE__ */ __name(function() {
          var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        }, "readFixed64"),
        readSFixed64: /* @__PURE__ */ __name(function() {
          var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        }, "readSFixed64"),
        readFloat: /* @__PURE__ */ __name(function() {
          var val = ieee754.read(this.buf, this.pos, true, 23, 4);
          this.pos += 4;
          return val;
        }, "readFloat"),
        readDouble: /* @__PURE__ */ __name(function() {
          var val = ieee754.read(this.buf, this.pos, true, 52, 8);
          this.pos += 8;
          return val;
        }, "readDouble"),
        readVarint: /* @__PURE__ */ __name(function(isSigned) {
          var buf = this.buf, val, b;
          b = buf[this.pos++];
          val = b & 127;
          if (b < 128) return val;
          b = buf[this.pos++];
          val |= (b & 127) << 7;
          if (b < 128) return val;
          b = buf[this.pos++];
          val |= (b & 127) << 14;
          if (b < 128) return val;
          b = buf[this.pos++];
          val |= (b & 127) << 21;
          if (b < 128) return val;
          b = buf[this.pos];
          val |= (b & 15) << 28;
          return readVarintRemainder2(val, isSigned, this);
        }, "readVarint"),
        readVarint64: /* @__PURE__ */ __name(function() {
          return this.readVarint(true);
        }, "readVarint64"),
        readSVarint: /* @__PURE__ */ __name(function() {
          var num = this.readVarint();
          return num % 2 === 1 ? (num + 1) / -2 : num / 2;
        }, "readSVarint"),
        readBoolean: /* @__PURE__ */ __name(function() {
          return Boolean(this.readVarint());
        }, "readBoolean"),
        readString: /* @__PURE__ */ __name(function() {
          var end = this.readVarint() + this.pos;
          var pos = this.pos;
          this.pos = end;
          if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            return readUtf8TextDecoder(this.buf, pos, end);
          }
          return readUtf8(this.buf, pos, end);
        }, "readString"),
        readBytes: /* @__PURE__ */ __name(function() {
          var end = this.readVarint() + this.pos, buffer2 = this.buf.subarray(this.pos, end);
          this.pos = end;
          return buffer2;
        }, "readBytes"),
        // verbose for performance reasons; doesn't affect gzipped size
        readPackedVarint: /* @__PURE__ */ __name(function(arr, isSigned) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readVarint(isSigned));
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readVarint(isSigned));
          return arr;
        }, "readPackedVarint"),
        readPackedSVarint: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readSVarint());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readSVarint());
          return arr;
        }, "readPackedSVarint"),
        readPackedBoolean: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readBoolean());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readBoolean());
          return arr;
        }, "readPackedBoolean"),
        readPackedFloat: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readFloat());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readFloat());
          return arr;
        }, "readPackedFloat"),
        readPackedDouble: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readDouble());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readDouble());
          return arr;
        }, "readPackedDouble"),
        readPackedFixed32: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readFixed32());
          return arr;
        }, "readPackedFixed32"),
        readPackedSFixed32: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readSFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readSFixed32());
          return arr;
        }, "readPackedSFixed32"),
        readPackedFixed64: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readFixed64());
          return arr;
        }, "readPackedFixed64"),
        readPackedSFixed64: /* @__PURE__ */ __name(function(arr) {
          if (this.type !== Pbf.Bytes) return arr.push(this.readSFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end) arr.push(this.readSFixed64());
          return arr;
        }, "readPackedSFixed64"),
        skip: /* @__PURE__ */ __name(function(val) {
          var type = val & 7;
          if (type === Pbf.Varint) while (this.buf[this.pos++] > 127) {
          }
          else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
          else if (type === Pbf.Fixed32) this.pos += 4;
          else if (type === Pbf.Fixed64) this.pos += 8;
          else throw new Error("Unimplemented type: " + type);
        }, "skip"),
        // === WRITING =================================================================
        writeTag: /* @__PURE__ */ __name(function(tag, type) {
          this.writeVarint(tag << 3 | type);
        }, "writeTag"),
        realloc: /* @__PURE__ */ __name(function(min) {
          var length = this.length || 16;
          while (length < this.pos + min) length *= 2;
          if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
          }
        }, "realloc"),
        finish: /* @__PURE__ */ __name(function() {
          this.length = this.pos;
          this.pos = 0;
          return this.buf.subarray(0, this.length);
        }, "finish"),
        writeFixed32: /* @__PURE__ */ __name(function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        }, "writeFixed32"),
        writeSFixed32: /* @__PURE__ */ __name(function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        }, "writeSFixed32"),
        writeFixed64: /* @__PURE__ */ __name(function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        }, "writeFixed64"),
        writeSFixed64: /* @__PURE__ */ __name(function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        }, "writeSFixed64"),
        writeVarint: /* @__PURE__ */ __name(function(val) {
          val = +val || 0;
          if (val > 268435455 || val < 0) {
            writeBigVarint(val, this);
            return;
          }
          this.realloc(4);
          this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
          if (val <= 127) return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127) return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127) return;
          this.buf[this.pos++] = val >>> 7 & 127;
        }, "writeVarint"),
        writeSVarint: /* @__PURE__ */ __name(function(val) {
          this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
        }, "writeSVarint"),
        writeBoolean: /* @__PURE__ */ __name(function(val) {
          this.writeVarint(Boolean(val));
        }, "writeBoolean"),
        writeString: /* @__PURE__ */ __name(function(str) {
          str = String(str);
          this.realloc(str.length * 4);
          this.pos++;
          var startPos = this.pos;
          this.pos = writeUtf8(this.buf, str, this.pos);
          var len = this.pos - startPos;
          if (len >= 128) makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        }, "writeString"),
        writeFloat: /* @__PURE__ */ __name(function(val) {
          this.realloc(4);
          ieee754.write(this.buf, val, this.pos, true, 23, 4);
          this.pos += 4;
        }, "writeFloat"),
        writeDouble: /* @__PURE__ */ __name(function(val) {
          this.realloc(8);
          ieee754.write(this.buf, val, this.pos, true, 52, 8);
          this.pos += 8;
        }, "writeDouble"),
        writeBytes: /* @__PURE__ */ __name(function(buffer2) {
          var len = buffer2.length;
          this.writeVarint(len);
          this.realloc(len);
          for (var i2 = 0; i2 < len; i2++) this.buf[this.pos++] = buffer2[i2];
        }, "writeBytes"),
        writeRawMessage: /* @__PURE__ */ __name(function(fn, obj) {
          this.pos++;
          var startPos = this.pos;
          fn(obj, this);
          var len = this.pos - startPos;
          if (len >= 128) makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        }, "writeRawMessage"),
        writeMessage: /* @__PURE__ */ __name(function(tag, fn, obj) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeRawMessage(fn, obj);
        }, "writeMessage"),
        writePackedVarint: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedVarint, arr);
        }, "writePackedVarint"),
        writePackedSVarint: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedSVarint, arr);
        }, "writePackedSVarint"),
        writePackedBoolean: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedBoolean, arr);
        }, "writePackedBoolean"),
        writePackedFloat: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedFloat, arr);
        }, "writePackedFloat"),
        writePackedDouble: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedDouble, arr);
        }, "writePackedDouble"),
        writePackedFixed32: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedFixed32, arr);
        }, "writePackedFixed32"),
        writePackedSFixed32: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedSFixed32, arr);
        }, "writePackedSFixed32"),
        writePackedFixed64: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedFixed64, arr);
        }, "writePackedFixed64"),
        writePackedSFixed64: /* @__PURE__ */ __name(function(tag, arr) {
          if (arr.length) this.writeMessage(tag, writePackedSFixed64, arr);
        }, "writePackedSFixed64"),
        writeBytesField: /* @__PURE__ */ __name(function(tag, buffer2) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeBytes(buffer2);
        }, "writeBytesField"),
        writeFixed32Field: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFixed32(val);
        }, "writeFixed32Field"),
        writeSFixed32Field: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeSFixed32(val);
        }, "writeSFixed32Field"),
        writeFixed64Field: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeFixed64(val);
        }, "writeFixed64Field"),
        writeSFixed64Field: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeSFixed64(val);
        }, "writeSFixed64Field"),
        writeVarintField: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeVarint(val);
        }, "writeVarintField"),
        writeSVarintField: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeSVarint(val);
        }, "writeSVarintField"),
        writeStringField: /* @__PURE__ */ __name(function(tag, str) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeString(str);
        }, "writeStringField"),
        writeFloatField: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFloat(val);
        }, "writeFloatField"),
        writeDoubleField: /* @__PURE__ */ __name(function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeDouble(val);
        }, "writeDoubleField"),
        writeBooleanField: /* @__PURE__ */ __name(function(tag, val) {
          this.writeVarintField(tag, Boolean(val));
        }, "writeBooleanField")
      };
      function readVarintRemainder2(l, s, p) {
        var buf = p.buf, h, b;
        b = buf[p.pos++];
        h = (b & 112) >> 4;
        if (b < 128) return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 3;
        if (b < 128) return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 10;
        if (b < 128) return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 17;
        if (b < 128) return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 24;
        if (b < 128) return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 1) << 31;
        if (b < 128) return toNum2(l, h, s);
        throw new Error("Expected varint not more than 10 bytes");
      }
      __name(readVarintRemainder2, "readVarintRemainder");
      function readPackedEnd(pbf) {
        return pbf.type === Pbf.Bytes ? pbf.readVarint() + pbf.pos : pbf.pos + 1;
      }
      __name(readPackedEnd, "readPackedEnd");
      function toNum2(low, high, isSigned) {
        if (isSigned) {
          return high * 4294967296 + (low >>> 0);
        }
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      __name(toNum2, "toNum");
      function writeBigVarint(val, pbf) {
        var low, high;
        if (val >= 0) {
          low = val % 4294967296 | 0;
          high = val / 4294967296 | 0;
        } else {
          low = ~(-val % 4294967296);
          high = ~(-val / 4294967296);
          if (low ^ 4294967295) {
            low = low + 1 | 0;
          } else {
            low = 0;
            high = high + 1 | 0;
          }
        }
        if (val >= 18446744073709552e3 || val < -18446744073709552e3) {
          throw new Error("Given varint doesn't fit into 10 bytes");
        }
        pbf.realloc(10);
        writeBigVarintLow(low, high, pbf);
        writeBigVarintHigh(high, pbf);
      }
      __name(writeBigVarint, "writeBigVarint");
      function writeBigVarintLow(low, high, pbf) {
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos] = low & 127;
      }
      __name(writeBigVarintLow, "writeBigVarintLow");
      function writeBigVarintHigh(high, pbf) {
        var lsb = (high & 7) << 4;
        pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
        if (!high) return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high) return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high) return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high) return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high) return;
        pbf.buf[pbf.pos++] = high & 127;
      }
      __name(writeBigVarintHigh, "writeBigVarintHigh");
      function makeRoomForExtraLength(startPos, len, pbf) {
        var extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
        pbf.realloc(extraLen);
        for (var i2 = pbf.pos - 1; i2 >= startPos; i2--) pbf.buf[i2 + extraLen] = pbf.buf[i2];
      }
      __name(makeRoomForExtraLength, "makeRoomForExtraLength");
      function writePackedVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeVarint(arr[i2]);
      }
      __name(writePackedVarint, "writePackedVarint");
      function writePackedSVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeSVarint(arr[i2]);
      }
      __name(writePackedSVarint, "writePackedSVarint");
      function writePackedFloat(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeFloat(arr[i2]);
      }
      __name(writePackedFloat, "writePackedFloat");
      function writePackedDouble(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeDouble(arr[i2]);
      }
      __name(writePackedDouble, "writePackedDouble");
      function writePackedBoolean(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeBoolean(arr[i2]);
      }
      __name(writePackedBoolean, "writePackedBoolean");
      function writePackedFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeFixed32(arr[i2]);
      }
      __name(writePackedFixed32, "writePackedFixed32");
      function writePackedSFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeSFixed32(arr[i2]);
      }
      __name(writePackedSFixed32, "writePackedSFixed32");
      function writePackedFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeFixed64(arr[i2]);
      }
      __name(writePackedFixed64, "writePackedFixed64");
      function writePackedSFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++) pbf.writeSFixed64(arr[i2]);
      }
      __name(writePackedSFixed64, "writePackedSFixed64");
      function readUInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + buf[pos + 3] * 16777216;
      }
      __name(readUInt32, "readUInt32");
      function writeInt32(buf, val, pos) {
        buf[pos] = val;
        buf[pos + 1] = val >>> 8;
        buf[pos + 2] = val >>> 16;
        buf[pos + 3] = val >>> 24;
      }
      __name(writeInt32, "writeInt32");
      function readInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + (buf[pos + 3] << 24);
      }
      __name(readInt32, "readInt32");
      function readUtf8(buf, pos, end) {
        var str = "";
        var i2 = pos;
        while (i2 < end) {
          var b0 = buf[i2];
          var c = null;
          var bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
          if (i2 + bytesPerSequence > end) break;
          var b1, b2, b3;
          if (bytesPerSequence === 1) {
            if (b0 < 128) {
              c = b0;
            }
          } else if (bytesPerSequence === 2) {
            b1 = buf[i2 + 1];
            if ((b1 & 192) === 128) {
              c = (b0 & 31) << 6 | b1 & 63;
              if (c <= 127) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 3) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            if ((b1 & 192) === 128 && (b2 & 192) === 128) {
              c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
              if (c <= 2047 || c >= 55296 && c <= 57343) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 4) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            b3 = buf[i2 + 3];
            if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
              c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
              if (c <= 65535 || c >= 1114112) {
                c = null;
              }
            }
          }
          if (c === null) {
            c = 65533;
            bytesPerSequence = 1;
          } else if (c > 65535) {
            c -= 65536;
            str += String.fromCharCode(c >>> 10 & 1023 | 55296);
            c = 56320 | c & 1023;
          }
          str += String.fromCharCode(c);
          i2 += bytesPerSequence;
        }
        return str;
      }
      __name(readUtf8, "readUtf8");
      function readUtf8TextDecoder(buf, pos, end) {
        return utf8TextDecoder.decode(buf.subarray(pos, end));
      }
      __name(readUtf8TextDecoder, "readUtf8TextDecoder");
      function writeUtf8(buf, str, pos) {
        for (var i2 = 0, c, lead; i2 < str.length; i2++) {
          c = str.charCodeAt(i2);
          if (c > 55295 && c < 57344) {
            if (lead) {
              if (c < 56320) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
                lead = c;
                continue;
              } else {
                c = lead - 55296 << 10 | c - 56320 | 65536;
                lead = null;
              }
            } else {
              if (c > 56319 || i2 + 1 === str.length) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
              } else {
                lead = c;
              }
              continue;
            }
          } else if (lead) {
            buf[pos++] = 239;
            buf[pos++] = 191;
            buf[pos++] = 189;
            lead = null;
          }
          if (c < 128) {
            buf[pos++] = c;
          } else {
            if (c < 2048) {
              buf[pos++] = c >> 6 | 192;
            } else {
              if (c < 65536) {
                buf[pos++] = c >> 12 | 224;
              } else {
                buf[pos++] = c >> 18 | 240;
                buf[pos++] = c >> 12 & 63 | 128;
              }
              buf[pos++] = c >> 6 & 63 | 128;
            }
            buf[pos++] = c & 63 | 128;
          }
        }
        return pos;
      }
      __name(writeUtf8, "writeUtf8");
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    PMTilesRasterSource: () => PMTilesRasterSource,
    PMTilesVectorSource: () => PMTilesVectorSource
  });

  // node_modules/ol/Disposable.js
  var _Disposable = class _Disposable {
    constructor() {
      this.disposed = false;
    }
    /**
     * Clean up.
     */
    dispose() {
      if (!this.disposed) {
        this.disposed = true;
        this.disposeInternal();
      }
    }
    /**
     * Extension point for disposable objects.
     * @protected
     */
    disposeInternal() {
    }
  };
  __name(_Disposable, "Disposable");
  var Disposable = _Disposable;
  var Disposable_default = Disposable;

  // node_modules/ol/events/Event.js
  var _BaseEvent = class _BaseEvent {
    /**
     * @param {string} type Type.
     */
    constructor(type) {
      this.propagationStopped;
      this.defaultPrevented;
      this.type = type;
      this.target = null;
    }
    /**
     * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
     * will be fired.
     * @api
     */
    preventDefault() {
      this.defaultPrevented = true;
    }
    /**
     * Stop event propagation.
     * @api
     */
    stopPropagation() {
      this.propagationStopped = true;
    }
  };
  __name(_BaseEvent, "BaseEvent");
  var BaseEvent = _BaseEvent;
  var Event_default = BaseEvent;

  // node_modules/ol/array.js
  function binarySearch(haystack, needle, comparator) {
    let mid, cmp;
    comparator = comparator || ascending;
    let low = 0;
    let high = haystack.length;
    let found = false;
    while (low < high) {
      mid = low + (high - low >> 1);
      cmp = +comparator(haystack[mid], needle);
      if (cmp < 0) {
        low = mid + 1;
      } else {
        high = mid;
        found = !cmp;
      }
    }
    return found ? low : ~low;
  }
  __name(binarySearch, "binarySearch");
  function ascending(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  __name(ascending, "ascending");
  function linearFindNearest(arr, target, direction) {
    if (arr[0] <= target) {
      return 0;
    }
    const n = arr.length;
    if (target <= arr[n - 1]) {
      return n - 1;
    }
    if (typeof direction === "function") {
      for (let i2 = 1; i2 < n; ++i2) {
        const candidate = arr[i2];
        if (candidate === target) {
          return i2;
        }
        if (candidate < target) {
          if (direction(target, arr[i2 - 1], candidate) > 0) {
            return i2 - 1;
          }
          return i2;
        }
      }
      return n - 1;
    }
    if (direction > 0) {
      for (let i2 = 1; i2 < n; ++i2) {
        if (arr[i2] < target) {
          return i2 - 1;
        }
      }
      return n - 1;
    }
    if (direction < 0) {
      for (let i2 = 1; i2 < n; ++i2) {
        if (arr[i2] <= target) {
          return i2;
        }
      }
      return n - 1;
    }
    for (let i2 = 1; i2 < n; ++i2) {
      if (arr[i2] == target) {
        return i2;
      }
      if (arr[i2] < target) {
        if (arr[i2 - 1] - target < target - arr[i2]) {
          return i2 - 1;
        }
        return i2;
      }
    }
    return n - 1;
  }
  __name(linearFindNearest, "linearFindNearest");
  function extend(arr, data) {
    const extension = Array.isArray(data) ? data : [data];
    const length = extension.length;
    for (let i2 = 0; i2 < length; i2++) {
      arr[arr.length] = extension[i2];
    }
  }
  __name(extend, "extend");
  function equals(arr1, arr2) {
    const len1 = arr1.length;
    if (len1 !== arr2.length) {
      return false;
    }
    for (let i2 = 0; i2 < len1; i2++) {
      if (arr1[i2] !== arr2[i2]) {
        return false;
      }
    }
    return true;
  }
  __name(equals, "equals");
  function isSorted(arr, func, strict) {
    const compare2 = func || ascending;
    return arr.every(function(currentVal, index) {
      if (index === 0) {
        return true;
      }
      const res = compare2(arr[index - 1], currentVal);
      return !(res > 0 || strict && res === 0);
    });
  }
  __name(isSorted, "isSorted");

  // node_modules/ol/functions.js
  function VOID() {
  }
  __name(VOID, "VOID");
  function memoizeOne(fn) {
    let called = false;
    let lastResult;
    let lastArgs;
    let lastThis;
    return function() {
      const nextArgs = Array.prototype.slice.call(arguments);
      if (!called || this !== lastThis || !equals(nextArgs, lastArgs)) {
        called = true;
        lastThis = this;
        lastArgs = nextArgs;
        lastResult = fn.apply(this, arguments);
      }
      return lastResult;
    };
  }
  __name(memoizeOne, "memoizeOne");
  function toPromise(getter) {
    function promiseGetter() {
      let value;
      try {
        value = getter();
      } catch (err2) {
        return Promise.reject(err2);
      }
      if (value instanceof Promise) {
        return value;
      }
      return Promise.resolve(value);
    }
    __name(promiseGetter, "promiseGetter");
    return promiseGetter();
  }
  __name(toPromise, "toPromise");

  // node_modules/ol/obj.js
  function clear(object) {
    for (const property in object) {
      delete object[property];
    }
  }
  __name(clear, "clear");
  function isEmpty(object) {
    let property;
    for (property in object) {
      return false;
    }
    return !property;
  }
  __name(isEmpty, "isEmpty");

  // node_modules/ol/events/Target.js
  var _Target = class _Target extends Disposable_default {
    /**
     * @param {*} [target] Default event target for dispatched events.
     */
    constructor(target) {
      super();
      this.eventTarget_ = target;
      this.pendingRemovals_ = null;
      this.dispatching_ = null;
      this.listeners_ = null;
    }
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    addEventListener(type, listener) {
      if (!type || !listener) {
        return;
      }
      const listeners = this.listeners_ || (this.listeners_ = {});
      const listenersForType = listeners[type] || (listeners[type] = []);
      if (!listenersForType.includes(listener)) {
        listenersForType.push(listener);
      }
    }
    /**
     * Dispatches an event and calls all listeners listening for events
     * of this type. The event parameter can either be a string or an
     * Object with a `type` property.
     *
     * @param {import("./Event.js").default|string} event Event object.
     * @return {boolean|undefined} `false` if anyone called preventDefault on the
     *     event object or if any of the listeners returned false.
     * @api
     */
    dispatchEvent(event) {
      const isString = typeof event === "string";
      const type = isString ? event : event.type;
      const listeners = this.listeners_ && this.listeners_[type];
      if (!listeners) {
        return;
      }
      const evt = isString ? new Event_default(event) : (
        /** @type {Event} */
        event
      );
      if (!evt.target) {
        evt.target = this.eventTarget_ || this;
      }
      const dispatching = this.dispatching_ || (this.dispatching_ = {});
      const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
      if (!(type in dispatching)) {
        dispatching[type] = 0;
        pendingRemovals[type] = 0;
      }
      ++dispatching[type];
      let propagate;
      for (let i2 = 0, ii = listeners.length; i2 < ii; ++i2) {
        if ("handleEvent" in listeners[i2]) {
          propagate = /** @type {import("../events.js").ListenerObject} */
          listeners[i2].handleEvent(evt);
        } else {
          propagate = /** @type {import("../events.js").ListenerFunction} */
          listeners[i2].call(this, evt);
        }
        if (propagate === false || evt.propagationStopped) {
          propagate = false;
          break;
        }
      }
      if (--dispatching[type] === 0) {
        let pr = pendingRemovals[type];
        delete pendingRemovals[type];
        while (pr--) {
          this.removeEventListener(type, VOID);
        }
        delete dispatching[type];
      }
      return propagate;
    }
    /**
     * Clean up.
     */
    disposeInternal() {
      this.listeners_ && clear(this.listeners_);
    }
    /**
     * Get the listeners for a specified event type. Listeners are returned in the
     * order that they will be called in.
     *
     * @param {string} type Type.
     * @return {Array<import("../events.js").Listener>|undefined} Listeners.
     */
    getListeners(type) {
      return this.listeners_ && this.listeners_[type] || void 0;
    }
    /**
     * @param {string} [type] Type. If not provided,
     *     `true` will be returned if this event target has any listeners.
     * @return {boolean} Has listeners.
     */
    hasListener(type) {
      if (!this.listeners_) {
        return false;
      }
      return type ? type in this.listeners_ : Object.keys(this.listeners_).length > 0;
    }
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    removeEventListener(type, listener) {
      if (!this.listeners_) {
        return;
      }
      const listeners = this.listeners_[type];
      if (!listeners) {
        return;
      }
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          listeners[index] = VOID;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);
          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  };
  __name(_Target, "Target");
  var Target = _Target;
  var Target_default = Target;

  // node_modules/ol/events/EventType.js
  var EventType_default = {
    /**
     * Generic change event. Triggered when the revision counter is increased.
     * @event module:ol/events/Event~BaseEvent#change
     * @api
     */
    CHANGE: "change",
    /**
     * Generic error event. Triggered when an error occurs.
     * @event module:ol/events/Event~BaseEvent#error
     * @api
     */
    ERROR: "error",
    BLUR: "blur",
    CLEAR: "clear",
    CONTEXTMENU: "contextmenu",
    CLICK: "click",
    DBLCLICK: "dblclick",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DROP: "drop",
    FOCUS: "focus",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    LOAD: "load",
    RESIZE: "resize",
    TOUCHMOVE: "touchmove",
    WHEEL: "wheel"
  };

  // node_modules/ol/TileState.js
  var TileState_default = {
    IDLE: 0,
    LOADING: 1,
    LOADED: 2,
    /**
     * Indicates that tile loading failed
     * @type {number}
     */
    ERROR: 3,
    EMPTY: 4
  };

  // node_modules/ol/util.js
  function abstract() {
    throw new Error("Unimplemented abstract method.");
  }
  __name(abstract, "abstract");
  var uidCounter_ = 0;
  function getUid(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
  }
  __name(getUid, "getUid");

  // node_modules/ol/easing.js
  function easeIn(t) {
    return Math.pow(t, 3);
  }
  __name(easeIn, "easeIn");

  // node_modules/ol/Tile.js
  var _Tile = class _Tile extends Target_default {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {Options} [options] Tile options.
     */
    constructor(tileCoord, state, options) {
      super();
      options = options ? options : {};
      this.tileCoord = tileCoord;
      this.state = state;
      this.interimTile = null;
      this.key = "";
      this.transition_ = options.transition === void 0 ? 250 : options.transition;
      this.transitionStarts_ = {};
      this.interpolate = !!options.interpolate;
    }
    /**
     * @protected
     */
    changed() {
      this.dispatchEvent(EventType_default.CHANGE);
    }
    /**
     * Called by the tile cache when the tile is removed from the cache due to expiry
     */
    release() {
      if (this.state === TileState_default.ERROR) {
        this.setState(TileState_default.EMPTY);
      }
    }
    /**
     * @return {string} Key.
     */
    getKey() {
      return this.key + "/" + this.tileCoord;
    }
    /**
     * Get the interim tile most suitable for rendering using the chain of interim
     * tiles. This corresponds to the  most recent tile that has been loaded, if no
     * such tile exists, the original tile is returned.
     * @return {!Tile} Best tile for rendering.
     */
    getInterimTile() {
      let tile = this.interimTile;
      if (!tile) {
        return this;
      }
      do {
        if (tile.getState() == TileState_default.LOADED) {
          this.transition_ = 0;
          return tile;
        }
        tile = tile.interimTile;
      } while (tile);
      return this;
    }
    /**
     * Goes through the chain of interim tiles and discards sections of the chain
     * that are no longer relevant.
     */
    refreshInterimChain() {
      let tile = this.interimTile;
      if (!tile) {
        return;
      }
      let prev = this;
      do {
        if (tile.getState() == TileState_default.LOADED) {
          tile.interimTile = null;
          break;
        }
        if (tile.getState() == TileState_default.LOADING) {
          prev = tile;
        } else if (tile.getState() == TileState_default.IDLE) {
          prev.interimTile = tile.interimTile;
        } else {
          prev = tile;
        }
        tile = prev.interimTile;
      } while (tile);
    }
    /**
     * Get the tile coordinate for this tile.
     * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
     * @api
     */
    getTileCoord() {
      return this.tileCoord;
    }
    /**
     * @return {import("./TileState.js").default} State.
     */
    getState() {
      return this.state;
    }
    /**
     * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
     * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
     * when the tile cannot be loaded. Otherwise the tile cannot be removed from
     * the tile queue and will block other requests.
     * @param {import("./TileState.js").default} state State.
     * @api
     */
    setState(state) {
      if (this.state !== TileState_default.ERROR && this.state > state) {
        throw new Error("Tile load sequence violation");
      }
      this.state = state;
      this.changed();
    }
    /**
     * Load the image or retry if loading previously failed.
     * Loading is taken care of by the tile queue, and calling this method is
     * only needed for preloading or for reloading in case of an error.
     * @abstract
     * @api
     */
    load() {
      abstract();
    }
    /**
     * Get the alpha value for rendering.
     * @param {string} id An id for the renderer.
     * @param {number} time The render frame time.
     * @return {number} A number between 0 and 1.
     */
    getAlpha(id, time) {
      if (!this.transition_) {
        return 1;
      }
      let start = this.transitionStarts_[id];
      if (!start) {
        start = time;
        this.transitionStarts_[id] = start;
      } else if (start === -1) {
        return 1;
      }
      const delta = time - start + 1e3 / 60;
      if (delta >= this.transition_) {
        return 1;
      }
      return easeIn(delta / this.transition_);
    }
    /**
     * Determine if a tile is in an alpha transition.  A tile is considered in
     * transition if tile.getAlpha() has not yet been called or has been called
     * and returned 1.
     * @param {string} id An id for the renderer.
     * @return {boolean} The tile is in transition.
     */
    inTransition(id) {
      if (!this.transition_) {
        return false;
      }
      return this.transitionStarts_[id] !== -1;
    }
    /**
     * Mark a transition as complete.
     * @param {string} id An id for the renderer.
     */
    endTransition(id) {
      if (this.transition_) {
        this.transitionStarts_[id] = -1;
      }
    }
  };
  __name(_Tile, "Tile");
  var Tile = _Tile;
  var Tile_default = Tile;

  // node_modules/ol/has.js
  var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  var FIREFOX = ua.includes("firefox");
  var SAFARI = ua.includes("safari") && !ua.includes("chrom");
  var SAFARI_BUG_237906 = SAFARI && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
  var WEBKIT = ua.includes("webkit") && !ua.includes("edge");
  var MAC = ua.includes("macintosh");
  var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
  var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
  var PASSIVE_EVENT_LISTENERS = function() {
    let passive = false;
    try {
      const options = Object.defineProperty({}, "passive", {
        get: /* @__PURE__ */ __name(function() {
          passive = true;
        }, "get")
      });
      window.addEventListener("_", null, options);
      window.removeEventListener("_", null, options);
    } catch (error) {
    }
    return passive;
  }();

  // node_modules/ol/dom.js
  function createCanvasContext2D(width, height, canvasPool3, settings) {
    let canvas;
    if (canvasPool3 && canvasPool3.length) {
      canvas = /** @type {HTMLCanvasElement} */
      canvasPool3.shift();
    } else if (WORKER_OFFSCREEN_CANVAS) {
      canvas = new OffscreenCanvas(width || 300, height || 300);
    } else {
      canvas = document.createElement("canvas");
    }
    if (width) {
      canvas.width = width;
    }
    if (height) {
      canvas.height = height;
    }
    return (
      /** @type {CanvasRenderingContext2D} */
      canvas.getContext("2d", settings)
    );
  }
  __name(createCanvasContext2D, "createCanvasContext2D");
  function releaseCanvas(context) {
    const canvas = context.canvas;
    canvas.width = 1;
    canvas.height = 1;
    context.clearRect(0, 0, 1, 1);
  }
  __name(releaseCanvas, "releaseCanvas");

  // node_modules/ol/DataTile.js
  function asImageLike(data) {
    return data instanceof Image || data instanceof HTMLCanvasElement || data instanceof HTMLVideoElement || data instanceof ImageBitmap ? data : null;
  }
  __name(asImageLike, "asImageLike");
  function asArrayLike(data) {
    return data instanceof Uint8Array || data instanceof Uint8ClampedArray || data instanceof Float32Array || data instanceof DataView ? data : null;
  }
  __name(asArrayLike, "asArrayLike");
  var sharedContext = null;
  function toArray(image) {
    if (!sharedContext) {
      sharedContext = createCanvasContext2D(
        image.width,
        image.height,
        void 0,
        { willReadFrequently: true }
      );
    }
    const canvas = sharedContext.canvas;
    const width = image.width;
    if (canvas.width !== width) {
      canvas.width = width;
    }
    const height = image.height;
    if (canvas.height !== height) {
      canvas.height = height;
    }
    sharedContext.clearRect(0, 0, width, height);
    sharedContext.drawImage(image, 0, 0);
    return sharedContext.getImageData(0, 0, width, height).data;
  }
  __name(toArray, "toArray");
  var defaultSize = [256, 256];
  var _DataTile = class _DataTile extends Tile_default {
    /**
     * @param {Options} options Tile options.
     */
    constructor(options) {
      const state = TileState_default.IDLE;
      super(options.tileCoord, state, {
        transition: options.transition,
        interpolate: options.interpolate
      });
      this.loader_ = options.loader;
      this.data_ = null;
      this.error_ = null;
      this.size_ = options.size || null;
    }
    /**
     * Get the tile size.
     * @return {import('./size.js').Size} Tile size.
     */
    getSize() {
      if (this.size_) {
        return this.size_;
      }
      const imageData = asImageLike(this.data_);
      if (imageData) {
        return [imageData.width, imageData.height];
      }
      return defaultSize;
    }
    /**
     * Get the data for the tile.
     * @return {Data} Tile data.
     * @api
     */
    getData() {
      return this.data_;
    }
    /**
     * Get any loading error.
     * @return {Error} Loading error.
     * @api
     */
    getError() {
      return this.error_;
    }
    /**
     * Load not yet loaded URI.
     * @api
     */
    load() {
      if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) {
        return;
      }
      this.state = TileState_default.LOADING;
      this.changed();
      const self2 = this;
      this.loader_().then(function(data) {
        self2.data_ = data;
        self2.state = TileState_default.LOADED;
        self2.changed();
      }).catch(function(error) {
        self2.error_ = error;
        self2.state = TileState_default.ERROR;
        self2.changed();
      });
    }
  };
  __name(_DataTile, "DataTile");
  var DataTile = _DataTile;
  var DataTile_default = DataTile;

  // node_modules/ol/reproj/common.js
  var ERROR_THRESHOLD = 0.5;

  // node_modules/ol/extent/Relationship.js
  var Relationship_default = {
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16
  };

  // node_modules/ol/extent.js
  function boundingExtent(coordinates2) {
    const extent = createEmpty();
    for (let i2 = 0, ii = coordinates2.length; i2 < ii; ++i2) {
      extendCoordinate(extent, coordinates2[i2]);
    }
    return extent;
  }
  __name(boundingExtent, "boundingExtent");
  function buffer(extent, value, dest) {
    if (dest) {
      dest[0] = extent[0] - value;
      dest[1] = extent[1] - value;
      dest[2] = extent[2] + value;
      dest[3] = extent[3] + value;
      return dest;
    }
    return [
      extent[0] - value,
      extent[1] - value,
      extent[2] + value,
      extent[3] + value
    ];
  }
  __name(buffer, "buffer");
  function closestSquaredDistanceXY(extent, x2, y) {
    let dx, dy;
    if (x2 < extent[0]) {
      dx = extent[0] - x2;
    } else if (extent[2] < x2) {
      dx = x2 - extent[2];
    } else {
      dx = 0;
    }
    if (y < extent[1]) {
      dy = extent[1] - y;
    } else if (extent[3] < y) {
      dy = y - extent[3];
    } else {
      dy = 0;
    }
    return dx * dx + dy * dy;
  }
  __name(closestSquaredDistanceXY, "closestSquaredDistanceXY");
  function containsCoordinate(extent, coordinate) {
    return containsXY(extent, coordinate[0], coordinate[1]);
  }
  __name(containsCoordinate, "containsCoordinate");
  function containsExtent(extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
  }
  __name(containsExtent, "containsExtent");
  function containsXY(extent, x2, y) {
    return extent[0] <= x2 && x2 <= extent[2] && extent[1] <= y && y <= extent[3];
  }
  __name(containsXY, "containsXY");
  function coordinateRelationship(extent, coordinate) {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const x2 = coordinate[0];
    const y = coordinate[1];
    let relationship = Relationship_default.UNKNOWN;
    if (x2 < minX) {
      relationship = relationship | Relationship_default.LEFT;
    } else if (x2 > maxX) {
      relationship = relationship | Relationship_default.RIGHT;
    }
    if (y < minY) {
      relationship = relationship | Relationship_default.BELOW;
    } else if (y > maxY) {
      relationship = relationship | Relationship_default.ABOVE;
    }
    if (relationship === Relationship_default.UNKNOWN) {
      relationship = Relationship_default.INTERSECTING;
    }
    return relationship;
  }
  __name(coordinateRelationship, "coordinateRelationship");
  function createEmpty() {
    return [Infinity, Infinity, -Infinity, -Infinity];
  }
  __name(createEmpty, "createEmpty");
  function createOrUpdate(minX, minY, maxX, maxY, dest) {
    if (dest) {
      dest[0] = minX;
      dest[1] = minY;
      dest[2] = maxX;
      dest[3] = maxY;
      return dest;
    }
    return [minX, minY, maxX, maxY];
  }
  __name(createOrUpdate, "createOrUpdate");
  function createOrUpdateEmpty(dest) {
    return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, dest);
  }
  __name(createOrUpdateEmpty, "createOrUpdateEmpty");
  function createOrUpdateFromCoordinate(coordinate, dest) {
    const x2 = coordinate[0];
    const y = coordinate[1];
    return createOrUpdate(x2, y, x2, y, dest);
  }
  __name(createOrUpdateFromCoordinate, "createOrUpdateFromCoordinate");
  function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, dest) {
    const extent = createOrUpdateEmpty(dest);
    return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
  }
  __name(createOrUpdateFromFlatCoordinates, "createOrUpdateFromFlatCoordinates");
  function extend2(extent1, extent2) {
    if (extent2[0] < extent1[0]) {
      extent1[0] = extent2[0];
    }
    if (extent2[2] > extent1[2]) {
      extent1[2] = extent2[2];
    }
    if (extent2[1] < extent1[1]) {
      extent1[1] = extent2[1];
    }
    if (extent2[3] > extent1[3]) {
      extent1[3] = extent2[3];
    }
    return extent1;
  }
  __name(extend2, "extend");
  function extendCoordinate(extent, coordinate) {
    if (coordinate[0] < extent[0]) {
      extent[0] = coordinate[0];
    }
    if (coordinate[0] > extent[2]) {
      extent[2] = coordinate[0];
    }
    if (coordinate[1] < extent[1]) {
      extent[1] = coordinate[1];
    }
    if (coordinate[1] > extent[3]) {
      extent[3] = coordinate[1];
    }
  }
  __name(extendCoordinate, "extendCoordinate");
  function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
    for (; offset < end; offset += stride) {
      extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    }
    return extent;
  }
  __name(extendFlatCoordinates, "extendFlatCoordinates");
  function extendXY(extent, x2, y) {
    extent[0] = Math.min(extent[0], x2);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x2);
    extent[3] = Math.max(extent[3], y);
  }
  __name(extendXY, "extendXY");
  function forEachCorner(extent, callback) {
    let val;
    val = callback(getBottomLeft(extent));
    if (val) {
      return val;
    }
    val = callback(getBottomRight(extent));
    if (val) {
      return val;
    }
    val = callback(getTopRight(extent));
    if (val) {
      return val;
    }
    val = callback(getTopLeft(extent));
    if (val) {
      return val;
    }
    return false;
  }
  __name(forEachCorner, "forEachCorner");
  function getArea(extent) {
    let area = 0;
    if (!isEmpty2(extent)) {
      area = getWidth(extent) * getHeight(extent);
    }
    return area;
  }
  __name(getArea, "getArea");
  function getBottomLeft(extent) {
    return [extent[0], extent[1]];
  }
  __name(getBottomLeft, "getBottomLeft");
  function getBottomRight(extent) {
    return [extent[2], extent[1]];
  }
  __name(getBottomRight, "getBottomRight");
  function getCenter(extent) {
    return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
  }
  __name(getCenter, "getCenter");
  function getCorner(extent, corner) {
    let coordinate;
    if (corner === "bottom-left") {
      coordinate = getBottomLeft(extent);
    } else if (corner === "bottom-right") {
      coordinate = getBottomRight(extent);
    } else if (corner === "top-left") {
      coordinate = getTopLeft(extent);
    } else if (corner === "top-right") {
      coordinate = getTopRight(extent);
    } else {
      throw new Error("Invalid corner");
    }
    return coordinate;
  }
  __name(getCorner, "getCorner");
  function getHeight(extent) {
    return extent[3] - extent[1];
  }
  __name(getHeight, "getHeight");
  function getIntersection(extent1, extent2, dest) {
    const intersection = dest ? dest : createEmpty();
    if (intersects(extent1, extent2)) {
      if (extent1[0] > extent2[0]) {
        intersection[0] = extent1[0];
      } else {
        intersection[0] = extent2[0];
      }
      if (extent1[1] > extent2[1]) {
        intersection[1] = extent1[1];
      } else {
        intersection[1] = extent2[1];
      }
      if (extent1[2] < extent2[2]) {
        intersection[2] = extent1[2];
      } else {
        intersection[2] = extent2[2];
      }
      if (extent1[3] < extent2[3]) {
        intersection[3] = extent1[3];
      } else {
        intersection[3] = extent2[3];
      }
    } else {
      createOrUpdateEmpty(intersection);
    }
    return intersection;
  }
  __name(getIntersection, "getIntersection");
  function getTopLeft(extent) {
    return [extent[0], extent[3]];
  }
  __name(getTopLeft, "getTopLeft");
  function getTopRight(extent) {
    return [extent[2], extent[3]];
  }
  __name(getTopRight, "getTopRight");
  function getWidth(extent) {
    return extent[2] - extent[0];
  }
  __name(getWidth, "getWidth");
  function intersects(extent1, extent2) {
    return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
  }
  __name(intersects, "intersects");
  function isEmpty2(extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
  }
  __name(isEmpty2, "isEmpty");
  function returnOrUpdate(extent, dest) {
    if (dest) {
      dest[0] = extent[0];
      dest[1] = extent[1];
      dest[2] = extent[2];
      dest[3] = extent[3];
      return dest;
    }
    return extent;
  }
  __name(returnOrUpdate, "returnOrUpdate");
  function intersectsSegment(extent, start, end) {
    let intersects2 = false;
    const startRel = coordinateRelationship(extent, start);
    const endRel = coordinateRelationship(extent, end);
    if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) {
      intersects2 = true;
    } else {
      const minX = extent[0];
      const minY = extent[1];
      const maxX = extent[2];
      const maxY = extent[3];
      const startX = start[0];
      const startY = start[1];
      const endX = end[0];
      const endY = end[1];
      const slope = (endY - startY) / (endX - startX);
      let x2, y;
      if (!!(endRel & Relationship_default.ABOVE) && !(startRel & Relationship_default.ABOVE)) {
        x2 = endX - (endY - maxY) / slope;
        intersects2 = x2 >= minX && x2 <= maxX;
      }
      if (!intersects2 && !!(endRel & Relationship_default.RIGHT) && !(startRel & Relationship_default.RIGHT)) {
        y = endY - (endX - maxX) * slope;
        intersects2 = y >= minY && y <= maxY;
      }
      if (!intersects2 && !!(endRel & Relationship_default.BELOW) && !(startRel & Relationship_default.BELOW)) {
        x2 = endX - (endY - minY) / slope;
        intersects2 = x2 >= minX && x2 <= maxX;
      }
      if (!intersects2 && !!(endRel & Relationship_default.LEFT) && !(startRel & Relationship_default.LEFT)) {
        y = endY - (endX - minX) * slope;
        intersects2 = y >= minY && y <= maxY;
      }
    }
    return intersects2;
  }
  __name(intersectsSegment, "intersectsSegment");
  function wrapX(extent, projection) {
    const projectionExtent = projection.getExtent();
    const center = getCenter(extent);
    if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
      const worldWidth = getWidth(projectionExtent);
      const worldsAway = Math.floor(
        (center[0] - projectionExtent[0]) / worldWidth
      );
      const offset = worldsAway * worldWidth;
      extent[0] -= offset;
      extent[2] -= offset;
    }
    return extent;
  }
  __name(wrapX, "wrapX");
  function wrapAndSliceX(extent, projection, multiWorld) {
    if (projection.canWrapX()) {
      const projectionExtent = projection.getExtent();
      if (!isFinite(extent[0]) || !isFinite(extent[2])) {
        return [[projectionExtent[0], extent[1], projectionExtent[2], extent[3]]];
      }
      wrapX(extent, projection);
      const worldWidth = getWidth(projectionExtent);
      if (getWidth(extent) > worldWidth && !multiWorld) {
        return [[projectionExtent[0], extent[1], projectionExtent[2], extent[3]]];
      }
      if (extent[0] < projectionExtent[0]) {
        return [
          [extent[0] + worldWidth, extent[1], projectionExtent[2], extent[3]],
          [projectionExtent[0], extent[1], extent[2], extent[3]]
        ];
      }
      if (extent[2] > projectionExtent[2]) {
        return [
          [extent[0], extent[1], projectionExtent[2], extent[3]],
          [projectionExtent[0], extent[1], extent[2] - worldWidth, extent[3]]
        ];
      }
    }
    return [extent];
  }
  __name(wrapAndSliceX, "wrapAndSliceX");

  // node_modules/ol/proj/Units.js
  var METERS_PER_UNIT = {
    // use the radius of the Normal sphere
    "radians": 6370997 / (2 * Math.PI),
    "degrees": 2 * Math.PI * 6370997 / 360,
    "ft": 0.3048,
    "m": 1,
    "us-ft": 1200 / 3937
  };

  // node_modules/ol/proj/Projection.js
  var _Projection = class _Projection {
    /**
     * @param {Options} options Projection options.
     */
    constructor(options) {
      this.code_ = options.code;
      this.units_ = /** @type {import("./Units.js").Units} */
      options.units;
      this.extent_ = options.extent !== void 0 ? options.extent : null;
      this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
      this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
      this.global_ = options.global !== void 0 ? options.global : false;
      this.canWrapX_ = !!(this.global_ && this.extent_);
      this.getPointResolutionFunc_ = options.getPointResolution;
      this.defaultTileGrid_ = null;
      this.metersPerUnit_ = options.metersPerUnit;
    }
    /**
     * @return {boolean} The projection is suitable for wrapping the x-axis
     */
    canWrapX() {
      return this.canWrapX_;
    }
    /**
     * Get the code for this projection, e.g. 'EPSG:4326'.
     * @return {string} Code.
     * @api
     */
    getCode() {
      return this.code_;
    }
    /**
     * Get the validity extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent() {
      return this.extent_;
    }
    /**
     * Get the units of this projection.
     * @return {import("./Units.js").Units} Units.
     * @api
     */
    getUnits() {
      return this.units_;
    }
    /**
     * Get the amount of meters per unit of this projection.  If the projection is
     * not configured with `metersPerUnit` or a units identifier, the return is
     * `undefined`.
     * @return {number|undefined} Meters.
     * @api
     */
    getMetersPerUnit() {
      return this.metersPerUnit_ || METERS_PER_UNIT[this.units_];
    }
    /**
     * Get the world extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getWorldExtent() {
      return this.worldExtent_;
    }
    /**
     * Get the axis orientation of this projection.
     * Example values are:
     * enu - the default easting, northing, elevation.
     * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
     *     or south orientated transverse mercator.
     * wnu - westing, northing, up - some planetary coordinate systems have
     *     "west positive" coordinate systems
     * @return {string} Axis orientation.
     * @api
     */
    getAxisOrientation() {
      return this.axisOrientation_;
    }
    /**
     * Is this projection a global projection which spans the whole world?
     * @return {boolean} Whether the projection is global.
     * @api
     */
    isGlobal() {
      return this.global_;
    }
    /**
     * Set if the projection is a global projection which spans the whole world
     * @param {boolean} global Whether the projection is global.
     * @api
     */
    setGlobal(global) {
      this.global_ = global;
      this.canWrapX_ = !!(global && this.extent_);
    }
    /**
     * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
     */
    getDefaultTileGrid() {
      return this.defaultTileGrid_;
    }
    /**
     * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
     */
    setDefaultTileGrid(tileGrid) {
      this.defaultTileGrid_ = tileGrid;
    }
    /**
     * Set the validity extent for this projection.
     * @param {import("../extent.js").Extent} extent Extent.
     * @api
     */
    setExtent(extent) {
      this.extent_ = extent;
      this.canWrapX_ = !!(this.global_ && extent);
    }
    /**
     * Set the world extent for this projection.
     * @param {import("../extent.js").Extent} worldExtent World extent
     *     [minlon, minlat, maxlon, maxlat].
     * @api
     */
    setWorldExtent(worldExtent) {
      this.worldExtent_ = worldExtent;
    }
    /**
     * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
     * for this projection.
     * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
     * @api
     */
    setGetPointResolution(func) {
      this.getPointResolutionFunc_ = func;
    }
    /**
     * Get the custom point resolution function for this projection (if set).
     * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
     * resolution function (if set).
     */
    getPointResolutionFunc() {
      return this.getPointResolutionFunc_;
    }
  };
  __name(_Projection, "Projection");
  var Projection = _Projection;
  var Projection_default = Projection;

  // node_modules/ol/proj/epsg3857.js
  var RADIUS = 6378137;
  var HALF_SIZE = Math.PI * RADIUS;
  var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
  var WORLD_EXTENT = [-180, -85, 180, 85];
  var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
  var _EPSG3857Projection = class _EPSG3857Projection extends Projection_default {
    /**
     * @param {string} code Code.
     */
    constructor(code) {
      super({
        code,
        units: "m",
        extent: EXTENT,
        global: true,
        worldExtent: WORLD_EXTENT,
        getPointResolution: /* @__PURE__ */ __name(function(resolution, point) {
          return resolution / Math.cosh(point[1] / RADIUS);
        }, "getPointResolution")
      });
    }
  };
  __name(_EPSG3857Projection, "EPSG3857Projection");
  var EPSG3857Projection = _EPSG3857Projection;
  var PROJECTIONS = [
    new EPSG3857Projection("EPSG:3857"),
    new EPSG3857Projection("EPSG:102100"),
    new EPSG3857Projection("EPSG:102113"),
    new EPSG3857Projection("EPSG:900913"),
    new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
    new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
  ];
  function fromEPSG4326(input, output, dimension) {
    const length = input.length;
    dimension = dimension > 1 ? dimension : 2;
    if (output === void 0) {
      if (dimension > 2) {
        output = input.slice();
      } else {
        output = new Array(length);
      }
    }
    for (let i2 = 0; i2 < length; i2 += dimension) {
      output[i2] = HALF_SIZE * input[i2] / 180;
      let y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i2 + 1] + 90) / 360));
      if (y > MAX_SAFE_Y) {
        y = MAX_SAFE_Y;
      } else if (y < -MAX_SAFE_Y) {
        y = -MAX_SAFE_Y;
      }
      output[i2 + 1] = y;
    }
    return output;
  }
  __name(fromEPSG4326, "fromEPSG4326");
  function toEPSG4326(input, output, dimension) {
    const length = input.length;
    dimension = dimension > 1 ? dimension : 2;
    if (output === void 0) {
      if (dimension > 2) {
        output = input.slice();
      } else {
        output = new Array(length);
      }
    }
    for (let i2 = 0; i2 < length; i2 += dimension) {
      output[i2] = 180 * input[i2] / HALF_SIZE;
      output[i2 + 1] = 360 * Math.atan(Math.exp(input[i2 + 1] / RADIUS)) / Math.PI - 90;
    }
    return output;
  }
  __name(toEPSG4326, "toEPSG4326");

  // node_modules/ol/proj/epsg4326.js
  var RADIUS2 = 6378137;
  var EXTENT2 = [-180, -90, 180, 90];
  var METERS_PER_UNIT2 = Math.PI * RADIUS2 / 180;
  var _EPSG4326Projection = class _EPSG4326Projection extends Projection_default {
    /**
     * @param {string} code Code.
     * @param {string} [axisOrientation] Axis orientation.
     */
    constructor(code, axisOrientation) {
      super({
        code,
        units: "degrees",
        extent: EXTENT2,
        axisOrientation,
        global: true,
        metersPerUnit: METERS_PER_UNIT2,
        worldExtent: EXTENT2
      });
    }
  };
  __name(_EPSG4326Projection, "EPSG4326Projection");
  var EPSG4326Projection = _EPSG4326Projection;
  var PROJECTIONS2 = [
    new EPSG4326Projection("CRS:84"),
    new EPSG4326Projection("EPSG:4326", "neu"),
    new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
    new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
    new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
    new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
    new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
  ];

  // node_modules/ol/proj/projections.js
  var cache = {};
  function get(code) {
    return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
  }
  __name(get, "get");
  function add(code, projection) {
    cache[code] = projection;
  }
  __name(add, "add");

  // node_modules/ol/proj/transforms.js
  var transforms = {};
  function add2(source, destination, transformFn) {
    const sourceCode = source.getCode();
    const destinationCode = destination.getCode();
    if (!(sourceCode in transforms)) {
      transforms[sourceCode] = {};
    }
    transforms[sourceCode][destinationCode] = transformFn;
  }
  __name(add2, "add");
  function get2(sourceCode, destinationCode) {
    let transform2;
    if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
      transform2 = transforms[sourceCode][destinationCode];
    }
    return transform2;
  }
  __name(get2, "get");

  // node_modules/ol/math.js
  function clamp(value, min, max2) {
    return Math.min(Math.max(value, min), max2);
  }
  __name(clamp, "clamp");
  function squaredSegmentDistance(x2, y, x1, y1, x22, y2) {
    const dx = x22 - x1;
    const dy = y2 - y1;
    if (dx !== 0 || dy !== 0) {
      const t = ((x2 - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x1 = x22;
        y1 = y2;
      } else if (t > 0) {
        x1 += dx * t;
        y1 += dy * t;
      }
    }
    return squaredDistance(x2, y, x1, y1);
  }
  __name(squaredSegmentDistance, "squaredSegmentDistance");
  function squaredDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
  }
  __name(squaredDistance, "squaredDistance");
  function solveLinearSystem(mat) {
    const n = mat.length;
    for (let i2 = 0; i2 < n; i2++) {
      let maxRow = i2;
      let maxEl = Math.abs(mat[i2][i2]);
      for (let r = i2 + 1; r < n; r++) {
        const absValue = Math.abs(mat[r][i2]);
        if (absValue > maxEl) {
          maxEl = absValue;
          maxRow = r;
        }
      }
      if (maxEl === 0) {
        return null;
      }
      const tmp = mat[maxRow];
      mat[maxRow] = mat[i2];
      mat[i2] = tmp;
      for (let j = i2 + 1; j < n; j++) {
        const coef = -mat[j][i2] / mat[i2][i2];
        for (let k = i2; k < n + 1; k++) {
          if (i2 == k) {
            mat[j][k] = 0;
          } else {
            mat[j][k] += coef * mat[i2][k];
          }
        }
      }
    }
    const x2 = new Array(n);
    for (let l = n - 1; l >= 0; l--) {
      x2[l] = mat[l][n] / mat[l][l];
      for (let m = l - 1; m >= 0; m--) {
        mat[m][n] -= mat[m][l] * x2[l];
      }
    }
    return x2;
  }
  __name(solveLinearSystem, "solveLinearSystem");
  function toRadians(angleInDegrees) {
    return angleInDegrees * Math.PI / 180;
  }
  __name(toRadians, "toRadians");
  function modulo(a, b) {
    const r = a % b;
    return r * b < 0 ? r + b : r;
  }
  __name(modulo, "modulo");
  function lerp(a, b, x2) {
    return a + x2 * (b - a);
  }
  __name(lerp, "lerp");
  function toFixed(n, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
  }
  __name(toFixed, "toFixed");
  function floor(n, decimals) {
    return Math.floor(toFixed(n, decimals));
  }
  __name(floor, "floor");
  function ceil(n, decimals) {
    return Math.ceil(toFixed(n, decimals));
  }
  __name(ceil, "ceil");

  // node_modules/ol/sphere.js
  var DEFAULT_RADIUS = 63710088e-1;
  function getDistance(c1, c2, radius) {
    radius = radius || DEFAULT_RADIUS;
    const lat1 = toRadians(c1[1]);
    const lat2 = toRadians(c2[1]);
    const deltaLatBy2 = (lat2 - lat1) / 2;
    const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
    const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  __name(getDistance, "getDistance");

  // node_modules/ol/proj.js
  function cloneTransform(input, output) {
    if (output !== void 0) {
      for (let i2 = 0, ii = input.length; i2 < ii; ++i2) {
        output[i2] = input[i2];
      }
      output = output;
    } else {
      output = input.slice();
    }
    return output;
  }
  __name(cloneTransform, "cloneTransform");
  function identityTransform(input, output) {
    if (output !== void 0 && input !== output) {
      for (let i2 = 0, ii = input.length; i2 < ii; ++i2) {
        output[i2] = input[i2];
      }
      input = output;
    }
    return input;
  }
  __name(identityTransform, "identityTransform");
  function addProjection(projection) {
    add(projection.getCode(), projection);
    add2(projection, projection, cloneTransform);
  }
  __name(addProjection, "addProjection");
  function addProjections(projections) {
    projections.forEach(addProjection);
  }
  __name(addProjections, "addProjections");
  function get3(projectionLike) {
    return typeof projectionLike === "string" ? get(
      /** @type {string} */
      projectionLike
    ) : (
      /** @type {Projection} */
      projectionLike || null
    );
  }
  __name(get3, "get");
  function getPointResolution(projection, resolution, point, units) {
    projection = get3(projection);
    let pointResolution;
    const getter = projection.getPointResolutionFunc();
    if (getter) {
      pointResolution = getter(resolution, point);
      if (units && units !== projection.getUnits()) {
        const metersPerUnit = projection.getMetersPerUnit();
        if (metersPerUnit) {
          pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT[units];
        }
      }
    } else {
      const projUnits = projection.getUnits();
      if (projUnits == "degrees" && !units || units == "degrees") {
        pointResolution = resolution;
      } else {
        const toEPSG43262 = getTransformFromProjections(
          projection,
          get3("EPSG:4326")
        );
        if (toEPSG43262 === identityTransform && projUnits !== "degrees") {
          pointResolution = resolution * projection.getMetersPerUnit();
        } else {
          let vertices = [
            point[0] - resolution / 2,
            point[1],
            point[0] + resolution / 2,
            point[1],
            point[0],
            point[1] - resolution / 2,
            point[0],
            point[1] + resolution / 2
          ];
          vertices = toEPSG43262(vertices, vertices, 2);
          const width = getDistance(vertices.slice(0, 2), vertices.slice(2, 4));
          const height = getDistance(vertices.slice(4, 6), vertices.slice(6, 8));
          pointResolution = (width + height) / 2;
        }
        const metersPerUnit = units ? METERS_PER_UNIT[units] : projection.getMetersPerUnit();
        if (metersPerUnit !== void 0) {
          pointResolution /= metersPerUnit;
        }
      }
    }
    return pointResolution;
  }
  __name(getPointResolution, "getPointResolution");
  function addEquivalentProjections(projections) {
    addProjections(projections);
    projections.forEach(function(source) {
      projections.forEach(function(destination) {
        if (source !== destination) {
          add2(source, destination, cloneTransform);
        }
      });
    });
  }
  __name(addEquivalentProjections, "addEquivalentProjections");
  function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
    projections1.forEach(function(projection1) {
      projections2.forEach(function(projection2) {
        add2(projection1, projection2, forwardTransform);
        add2(projection2, projection1, inverseTransform);
      });
    });
  }
  __name(addEquivalentTransforms, "addEquivalentTransforms");
  function equivalent(projection1, projection2) {
    if (projection1 === projection2) {
      return true;
    }
    const equalUnits = projection1.getUnits() === projection2.getUnits();
    if (projection1.getCode() === projection2.getCode()) {
      return equalUnits;
    }
    const transformFunc = getTransformFromProjections(projection1, projection2);
    return transformFunc === cloneTransform && equalUnits;
  }
  __name(equivalent, "equivalent");
  function getTransformFromProjections(sourceProjection, destinationProjection) {
    const sourceCode = sourceProjection.getCode();
    const destinationCode = destinationProjection.getCode();
    let transformFunc = get2(sourceCode, destinationCode);
    if (!transformFunc) {
      transformFunc = identityTransform;
    }
    return transformFunc;
  }
  __name(getTransformFromProjections, "getTransformFromProjections");
  function getTransform(source, destination) {
    const sourceProjection = get3(source);
    const destinationProjection = get3(destination);
    return getTransformFromProjections(sourceProjection, destinationProjection);
  }
  __name(getTransform, "getTransform");
  function transform(coordinate, source, destination) {
    const transformFunc = getTransform(source, destination);
    return transformFunc(coordinate, void 0, coordinate.length);
  }
  __name(transform, "transform");
  function addCommon() {
    addEquivalentProjections(PROJECTIONS);
    addEquivalentProjections(PROJECTIONS2);
    addEquivalentTransforms(
      PROJECTIONS2,
      PROJECTIONS,
      fromEPSG4326,
      toEPSG4326
    );
  }
  __name(addCommon, "addCommon");
  addCommon();

  // node_modules/ol/reproj/Triangulation.js
  var MAX_SUBDIVISION = 10;
  var MAX_TRIANGLE_WIDTH = 0.25;
  var _Triangulation = class _Triangulation {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection.
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
     * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
     * @param {number} errorThreshold Acceptable error (in source units).
     * @param {?number} destinationResolution The (optional) resolution of the destination.
     */
    constructor(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, destinationResolution) {
      this.sourceProj_ = sourceProj;
      this.targetProj_ = targetProj;
      let transformInvCache = {};
      const transformInv = getTransform(this.targetProj_, this.sourceProj_);
      this.transformInv_ = function(c) {
        const key = c[0] + "/" + c[1];
        if (!transformInvCache[key]) {
          transformInvCache[key] = transformInv(c);
        }
        return transformInvCache[key];
      };
      this.maxSourceExtent_ = maxSourceExtent;
      this.errorThresholdSquared_ = errorThreshold * errorThreshold;
      this.triangles_ = [];
      this.wrapsXInSource_ = false;
      this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) >= getWidth(this.sourceProj_.getExtent());
      this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
      this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
      const destinationTopLeft = getTopLeft(targetExtent);
      const destinationTopRight = getTopRight(targetExtent);
      const destinationBottomRight = getBottomRight(targetExtent);
      const destinationBottomLeft = getBottomLeft(targetExtent);
      const sourceTopLeft = this.transformInv_(destinationTopLeft);
      const sourceTopRight = this.transformInv_(destinationTopRight);
      const sourceBottomRight = this.transformInv_(destinationBottomRight);
      const sourceBottomLeft = this.transformInv_(destinationBottomLeft);
      const maxSubdivision = MAX_SUBDIVISION + (destinationResolution ? Math.max(
        0,
        Math.ceil(
          Math.log2(
            getArea(targetExtent) / (destinationResolution * destinationResolution * 256 * 256)
          )
        )
      ) : 0);
      this.addQuad_(
        destinationTopLeft,
        destinationTopRight,
        destinationBottomRight,
        destinationBottomLeft,
        sourceTopLeft,
        sourceTopRight,
        sourceBottomRight,
        sourceBottomLeft,
        maxSubdivision
      );
      if (this.wrapsXInSource_) {
        let leftBound = Infinity;
        this.triangles_.forEach(function(triangle, i2, arr) {
          leftBound = Math.min(
            leftBound,
            triangle.source[0][0],
            triangle.source[1][0],
            triangle.source[2][0]
          );
        });
        this.triangles_.forEach((triangle) => {
          if (Math.max(
            triangle.source[0][0],
            triangle.source[1][0],
            triangle.source[2][0]
          ) - leftBound > this.sourceWorldWidth_ / 2) {
            const newTriangle = [
              [triangle.source[0][0], triangle.source[0][1]],
              [triangle.source[1][0], triangle.source[1][1]],
              [triangle.source[2][0], triangle.source[2][1]]
            ];
            if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) {
              newTriangle[0][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) {
              newTriangle[1][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) {
              newTriangle[2][0] -= this.sourceWorldWidth_;
            }
            const minX = Math.min(
              newTriangle[0][0],
              newTriangle[1][0],
              newTriangle[2][0]
            );
            const maxX = Math.max(
              newTriangle[0][0],
              newTriangle[1][0],
              newTriangle[2][0]
            );
            if (maxX - minX < this.sourceWorldWidth_ / 2) {
              triangle.source = newTriangle;
            }
          }
        });
      }
      transformInvCache = {};
    }
    /**
     * Adds triangle to the triangulation.
     * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
     * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
     * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
     * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
     * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
     * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
     * @private
     */
    addTriangle_(a, b, c, aSrc, bSrc, cSrc) {
      this.triangles_.push({
        source: [aSrc, bSrc, cSrc],
        target: [a, b, c]
      });
    }
    /**
     * Adds quad (points in clock-wise order) to the triangulation
     * (and reprojects the vertices) if valid.
     * Performs quad subdivision if needed to increase precision.
     *
     * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
     * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
     * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
     * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
     * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
     * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
     * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
     * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
     * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
     * @private
     */
    addQuad_(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
      const sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
      const sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
      const sourceWorldWidth = (
        /** @type {number} */
        this.sourceWorldWidth_
      );
      const wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
      let needsSubdivision = false;
      if (maxSubdivision > 0) {
        if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
          const targetQuadExtent = boundingExtent([a, b, c, d]);
          const targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
          needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
        if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
          needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
      }
      if (!needsSubdivision && this.maxSourceExtent_) {
        if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
          if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) {
            return;
          }
        }
      }
      let isNotFinite = 0;
      if (!needsSubdivision) {
        if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
          if (maxSubdivision > 0) {
            needsSubdivision = true;
          } else {
            isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
            if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
              return;
            }
          }
        }
      }
      if (maxSubdivision > 0) {
        if (!needsSubdivision) {
          const center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
          const centerSrc = this.transformInv_(center);
          let dx;
          if (wrapsX) {
            const centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2;
            dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
          } else {
            dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
          }
          const dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
          const centerSrcErrorSquared = dx * dx + dy * dy;
          needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
        }
        if (needsSubdivision) {
          if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
            const bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
            const bcSrc = this.transformInv_(bc);
            const da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
            const daSrc = this.transformInv_(da);
            this.addQuad_(
              a,
              b,
              bc,
              da,
              aSrc,
              bSrc,
              bcSrc,
              daSrc,
              maxSubdivision - 1
            );
            this.addQuad_(
              da,
              bc,
              c,
              d,
              daSrc,
              bcSrc,
              cSrc,
              dSrc,
              maxSubdivision - 1
            );
          } else {
            const ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            const abSrc = this.transformInv_(ab);
            const cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
            const cdSrc = this.transformInv_(cd);
            this.addQuad_(
              a,
              ab,
              cd,
              d,
              aSrc,
              abSrc,
              cdSrc,
              dSrc,
              maxSubdivision - 1
            );
            this.addQuad_(
              ab,
              b,
              c,
              cd,
              abSrc,
              bSrc,
              cSrc,
              cdSrc,
              maxSubdivision - 1
            );
          }
          return;
        }
      }
      if (wrapsX) {
        if (!this.canWrapXInSource_) {
          return;
        }
        this.wrapsXInSource_ = true;
      }
      if ((isNotFinite & 11) == 0) {
        this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
      }
      if ((isNotFinite & 14) == 0) {
        this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
      }
      if (isNotFinite) {
        if ((isNotFinite & 13) == 0) {
          this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
        }
        if ((isNotFinite & 7) == 0) {
          this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
        }
      }
    }
    /**
     * Calculates extent of the `source` coordinates from all the triangles.
     *
     * @return {import("../extent.js").Extent} Calculated extent.
     */
    calculateSourceExtent() {
      const extent = createEmpty();
      this.triangles_.forEach(function(triangle, i2, arr) {
        const src = triangle.source;
        extendCoordinate(extent, src[0]);
        extendCoordinate(extent, src[1]);
        extendCoordinate(extent, src[2]);
      });
      return extent;
    }
    /**
     * @return {Array<Triangle>} Array of the calculated triangles.
     */
    getTriangles() {
      return this.triangles_;
    }
  };
  __name(_Triangulation, "Triangulation");
  var Triangulation = _Triangulation;
  var Triangulation_default = Triangulation;

  // node_modules/ol/reproj.js
  var brokenDiagonalRendering_;
  var canvasPool = [];
  function drawTestTriangle(ctx, u1, v1, u2, v2) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(u1, v1);
    ctx.lineTo(u2, v2);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
    ctx.restore();
  }
  __name(drawTestTriangle, "drawTestTriangle");
  function verifyBrokenDiagonalRendering(data, offset) {
    return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
  }
  __name(verifyBrokenDiagonalRendering, "verifyBrokenDiagonalRendering");
  function isBrokenDiagonalRendering() {
    if (brokenDiagonalRendering_ === void 0) {
      const ctx = createCanvasContext2D(6, 6, canvasPool);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
      drawTestTriangle(ctx, 4, 5, 4, 0);
      drawTestTriangle(ctx, 4, 5, 0, 5);
      const data = ctx.getImageData(0, 0, 3, 3).data;
      brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
      releaseCanvas(ctx);
      canvasPool.push(ctx.canvas);
    }
    return brokenDiagonalRendering_;
  }
  __name(isBrokenDiagonalRendering, "isBrokenDiagonalRendering");
  function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
    const sourceCenter = transform(targetCenter, targetProj, sourceProj);
    let sourceResolution = getPointResolution(
      targetProj,
      targetResolution,
      targetCenter
    );
    const targetMetersPerUnit = targetProj.getMetersPerUnit();
    if (targetMetersPerUnit !== void 0) {
      sourceResolution *= targetMetersPerUnit;
    }
    const sourceMetersPerUnit = sourceProj.getMetersPerUnit();
    if (sourceMetersPerUnit !== void 0) {
      sourceResolution /= sourceMetersPerUnit;
    }
    const sourceExtent = sourceProj.getExtent();
    if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
      const compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
      if (isFinite(compensationFactor) && compensationFactor > 0) {
        sourceResolution /= compensationFactor;
      }
    }
    return sourceResolution;
  }
  __name(calculateSourceResolution, "calculateSourceResolution");
  function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
    const targetCenter = getCenter(targetExtent);
    let sourceResolution = calculateSourceResolution(
      sourceProj,
      targetProj,
      targetCenter,
      targetResolution
    );
    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      forEachCorner(targetExtent, function(corner) {
        sourceResolution = calculateSourceResolution(
          sourceProj,
          targetProj,
          corner,
          targetResolution
        );
        return isFinite(sourceResolution) && sourceResolution > 0;
      });
    }
    return sourceResolution;
  }
  __name(calculateSourceExtentResolution, "calculateSourceExtentResolution");
  function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, renderEdges, interpolate, drawSingle, clipExtent) {
    const context = createCanvasContext2D(
      Math.round(pixelRatio * width),
      Math.round(pixelRatio * height),
      canvasPool
    );
    if (!interpolate) {
      context.imageSmoothingEnabled = false;
    }
    if (sources.length === 0) {
      return context.canvas;
    }
    context.scale(pixelRatio, pixelRatio);
    function pixelRound(value) {
      return Math.round(value * pixelRatio) / pixelRatio;
    }
    __name(pixelRound, "pixelRound");
    context.globalCompositeOperation = "lighter";
    const sourceDataExtent = createEmpty();
    sources.forEach(function(src, i2, arr) {
      extend2(sourceDataExtent, src.extent);
    });
    let stitchContext;
    const stitchScale = pixelRatio / sourceResolution;
    const inverseScale = (interpolate ? 1 : 1 + Math.pow(2, -24)) / stitchScale;
    if (!drawSingle || sources.length !== 1 || gutter !== 0) {
      stitchContext = createCanvasContext2D(
        Math.round(getWidth(sourceDataExtent) * stitchScale),
        Math.round(getHeight(sourceDataExtent) * stitchScale),
        canvasPool
      );
      if (!interpolate) {
        stitchContext.imageSmoothingEnabled = false;
      }
      if (sourceExtent && clipExtent) {
        const xPos = (sourceExtent[0] - sourceDataExtent[0]) * stitchScale;
        const yPos = -(sourceExtent[3] - sourceDataExtent[3]) * stitchScale;
        const width2 = getWidth(sourceExtent) * stitchScale;
        const height2 = getHeight(sourceExtent) * stitchScale;
        stitchContext.rect(xPos, yPos, width2, height2);
        stitchContext.clip();
      }
      sources.forEach(function(src, i2, arr) {
        if (src.image.width > 0 && src.image.height > 0) {
          if (src.clipExtent) {
            stitchContext.save();
            const xPos2 = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale;
            const yPos2 = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale;
            const width2 = getWidth(src.clipExtent) * stitchScale;
            const height2 = getHeight(src.clipExtent) * stitchScale;
            stitchContext.rect(
              interpolate ? xPos2 : Math.round(xPos2),
              interpolate ? yPos2 : Math.round(yPos2),
              interpolate ? width2 : Math.round(xPos2 + width2) - Math.round(xPos2),
              interpolate ? height2 : Math.round(yPos2 + height2) - Math.round(yPos2)
            );
            stitchContext.clip();
          }
          const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale;
          const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale;
          const srcWidth = getWidth(src.extent) * stitchScale;
          const srcHeight = getHeight(src.extent) * stitchScale;
          stitchContext.drawImage(
            src.image,
            gutter,
            gutter,
            src.image.width - 2 * gutter,
            src.image.height - 2 * gutter,
            interpolate ? xPos : Math.round(xPos),
            interpolate ? yPos : Math.round(yPos),
            interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos),
            interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos)
          );
          if (src.clipExtent) {
            stitchContext.restore();
          }
        }
      });
    }
    const targetTopLeft = getTopLeft(targetExtent);
    triangulation.getTriangles().forEach(function(triangle, i2, arr) {
      const source = triangle.source;
      const target = triangle.target;
      let x0 = source[0][0], y0 = source[0][1];
      let x1 = source[1][0], y1 = source[1][1];
      let x2 = source[2][0], y2 = source[2][1];
      const u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
      const v0 = pixelRound(
        -(target[0][1] - targetTopLeft[1]) / targetResolution
      );
      const u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
      const v1 = pixelRound(
        -(target[1][1] - targetTopLeft[1]) / targetResolution
      );
      const u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
      const v2 = pixelRound(
        -(target[2][1] - targetTopLeft[1]) / targetResolution
      );
      const sourceNumericalShiftX = x0;
      const sourceNumericalShiftY = y0;
      x0 = 0;
      y0 = 0;
      x1 -= sourceNumericalShiftX;
      y1 -= sourceNumericalShiftY;
      x2 -= sourceNumericalShiftX;
      y2 -= sourceNumericalShiftY;
      const augmentedMatrix = [
        [x1, y1, 0, 0, u1 - u0],
        [x2, y2, 0, 0, u2 - u0],
        [0, 0, x1, y1, v1 - v0],
        [0, 0, x2, y2, v2 - v0]
      ];
      const affineCoefs = solveLinearSystem(augmentedMatrix);
      if (!affineCoefs) {
        return;
      }
      context.save();
      context.beginPath();
      if (isBrokenDiagonalRendering() || !interpolate) {
        context.moveTo(u1, v1);
        const steps = 4;
        const ud = u0 - u1;
        const vd = v0 - v1;
        for (let step = 0; step < steps; step++) {
          context.lineTo(
            u1 + pixelRound((step + 1) * ud / steps),
            v1 + pixelRound(step * vd / (steps - 1))
          );
          if (step != steps - 1) {
            context.lineTo(
              u1 + pixelRound((step + 1) * ud / steps),
              v1 + pixelRound((step + 1) * vd / (steps - 1))
            );
          }
        }
        context.lineTo(u2, v2);
      } else {
        context.moveTo(u1, v1);
        context.lineTo(u0, v0);
        context.lineTo(u2, v2);
      }
      context.clip();
      context.transform(
        affineCoefs[0],
        affineCoefs[2],
        affineCoefs[1],
        affineCoefs[3],
        u0,
        v0
      );
      context.translate(
        sourceDataExtent[0] - sourceNumericalShiftX,
        sourceDataExtent[3] - sourceNumericalShiftY
      );
      let image;
      if (stitchContext) {
        image = stitchContext.canvas;
        context.scale(inverseScale, -inverseScale);
      } else {
        const source2 = sources[0];
        const extent = source2.extent;
        image = source2.image;
        context.scale(
          getWidth(extent) / image.width,
          -getHeight(extent) / image.height
        );
      }
      context.drawImage(image, 0, 0);
      context.restore();
    });
    if (stitchContext) {
      releaseCanvas(stitchContext);
      canvasPool.push(stitchContext.canvas);
    }
    if (renderEdges) {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "black";
      context.lineWidth = 1;
      triangulation.getTriangles().forEach(function(triangle, i2, arr) {
        const target = triangle.target;
        const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
        const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
        const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
        const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
        const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
        const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
        context.beginPath();
        context.moveTo(u1, v1);
        context.lineTo(u0, v0);
        context.lineTo(u2, v2);
        context.closePath();
        context.stroke();
      });
      context.restore();
    }
    return context.canvas;
  }
  __name(render, "render");

  // node_modules/ol/events.js
  function listen(target, type, listener, thisArg, once) {
    if (thisArg && thisArg !== target) {
      listener = listener.bind(thisArg);
    }
    if (once) {
      const originalListener = listener;
      listener = /* @__PURE__ */ __name(function() {
        target.removeEventListener(type, listener);
        originalListener.apply(this, arguments);
      }, "listener");
    }
    const eventsKey = {
      target,
      type,
      listener
    };
    target.addEventListener(type, listener);
    return eventsKey;
  }
  __name(listen, "listen");
  function listenOnce(target, type, listener, thisArg) {
    return listen(target, type, listener, thisArg, true);
  }
  __name(listenOnce, "listenOnce");
  function unlistenByKey(key) {
    if (key && key.target) {
      key.target.removeEventListener(key.type, key.listener);
      clear(key);
    }
  }
  __name(unlistenByKey, "unlistenByKey");

  // node_modules/ol/reproj/DataTile.js
  var _ReprojDataTile = class _ReprojDataTile extends DataTile_default {
    /**
     * @param {Options} options Tile options.
     */
    constructor(options) {
      super({
        tileCoord: options.tileCoord,
        loader: /* @__PURE__ */ __name(() => Promise.resolve(new Uint8Array(4)), "loader"),
        interpolate: options.interpolate,
        transition: options.transition
      });
      this.pixelRatio_ = options.pixelRatio;
      this.gutter_ = options.gutter;
      this.reprojData_ = null;
      this.reprojError_ = null;
      this.reprojSize_ = void 0;
      this.sourceTileGrid_ = options.sourceTileGrid;
      this.targetTileGrid_ = options.targetTileGrid;
      this.wrappedTileCoord_ = options.wrappedTileCoord || options.tileCoord;
      this.sourceTiles_ = [];
      this.sourcesListenerKeys_ = null;
      this.sourceZ_ = 0;
      const sourceProj = options.sourceProj;
      const sourceProjExtent = sourceProj.getExtent();
      const sourceTileGridExtent = options.sourceTileGrid.getExtent();
      this.clipExtent_ = sourceProj.canWrapX() ? sourceTileGridExtent ? getIntersection(sourceProjExtent, sourceTileGridExtent) : sourceProjExtent : sourceTileGridExtent;
      const targetExtent = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      const maxTargetExtent = this.targetTileGrid_.getExtent();
      let maxSourceExtent = this.sourceTileGrid_.getExtent();
      const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
      if (getArea(limitedTargetExtent) === 0) {
        this.state = TileState_default.EMPTY;
        return;
      }
      if (sourceProjExtent) {
        if (!maxSourceExtent) {
          maxSourceExtent = sourceProjExtent;
        } else {
          maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
        }
      }
      const targetResolution = this.targetTileGrid_.getResolution(
        this.wrappedTileCoord_[0]
      );
      const targetProj = options.targetProj;
      const sourceResolution = calculateSourceExtentResolution(
        sourceProj,
        targetProj,
        limitedTargetExtent,
        targetResolution
      );
      if (!isFinite(sourceResolution) || sourceResolution <= 0) {
        this.state = TileState_default.EMPTY;
        return;
      }
      const errorThresholdInPixels = options.errorThreshold !== void 0 ? options.errorThreshold : ERROR_THRESHOLD;
      this.triangulation_ = new Triangulation_default(
        sourceProj,
        targetProj,
        limitedTargetExtent,
        maxSourceExtent,
        sourceResolution * errorThresholdInPixels,
        targetResolution
      );
      if (this.triangulation_.getTriangles().length === 0) {
        this.state = TileState_default.EMPTY;
        return;
      }
      this.sourceZ_ = this.sourceTileGrid_.getZForResolution(sourceResolution);
      let sourceExtent = this.triangulation_.calculateSourceExtent();
      if (maxSourceExtent) {
        if (sourceProj.canWrapX()) {
          sourceExtent[1] = clamp(
            sourceExtent[1],
            maxSourceExtent[1],
            maxSourceExtent[3]
          );
          sourceExtent[3] = clamp(
            sourceExtent[3],
            maxSourceExtent[1],
            maxSourceExtent[3]
          );
        } else {
          sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
        }
      }
      if (!getArea(sourceExtent)) {
        this.state = TileState_default.EMPTY;
      } else {
        let worldWidth = 0;
        let worldsAway = 0;
        if (sourceProj.canWrapX()) {
          worldWidth = getWidth(sourceProjExtent);
          worldsAway = Math.floor(
            (sourceExtent[0] - sourceProjExtent[0]) / worldWidth
          );
        }
        const sourceExtents = wrapAndSliceX(
          sourceExtent.slice(),
          sourceProj,
          true
        );
        sourceExtents.forEach((extent) => {
          const sourceRange = this.sourceTileGrid_.getTileRangeForExtentAndZ(
            extent,
            this.sourceZ_
          );
          const getTile = options.getTileFunction;
          for (let srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
            for (let srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
              const tile = getTile(this.sourceZ_, srcX, srcY, this.pixelRatio_);
              if (tile) {
                const offset = worldsAway * worldWidth;
                this.sourceTiles_.push({ tile, offset });
              }
            }
          }
          ++worldsAway;
        });
        if (this.sourceTiles_.length === 0) {
          this.state = TileState_default.EMPTY;
        }
      }
    }
    /**
     * Get the tile size.
     * @return {import('../size.js').Size} Tile size.
     */
    getSize() {
      return this.reprojSize_;
    }
    /**
     * Get the data for the tile.
     * @return {import("../DataTile.js").Data} Tile data.
     */
    getData() {
      return this.reprojData_;
    }
    /**
     * Get any loading error.
     * @return {Error} Loading error.
     */
    getError() {
      return this.reprojError_;
    }
    /**
     * @private
     */
    reproject_() {
      const dataSources = [];
      this.sourceTiles_.forEach((source) => {
        var _a6;
        const tile = source.tile;
        if (!tile || tile.getState() !== TileState_default.LOADED) {
          return;
        }
        const size = tile.getSize();
        const gutter = this.gutter_;
        let tileData;
        const arrayData = asArrayLike(tile.getData());
        if (arrayData) {
          tileData = arrayData;
        } else {
          tileData = toArray(asImageLike(tile.getData()));
        }
        const pixelSize = [size[0] + 2 * gutter, size[1] + 2 * gutter];
        const isFloat = tileData instanceof Float32Array;
        const pixelCount = pixelSize[0] * pixelSize[1];
        const DataType = isFloat ? Float32Array : Uint8Array;
        const tileDataR = new DataType(tileData.buffer);
        const bytesPerElement = DataType.BYTES_PER_ELEMENT;
        const bytesPerPixel = bytesPerElement * tileDataR.length / pixelCount;
        const bytesPerRow = tileDataR.byteLength / pixelSize[1];
        const bandCount = Math.floor(
          bytesPerRow / bytesPerElement / pixelSize[0]
        );
        const packedLength = pixelCount * bandCount;
        let packedData = tileDataR;
        if (tileDataR.length !== packedLength) {
          packedData = new DataType(packedLength);
          let dataIndex = 0;
          let rowOffset = 0;
          const colCount = pixelSize[0] * bandCount;
          for (let rowIndex = 0; rowIndex < pixelSize[1]; ++rowIndex) {
            for (let colIndex = 0; colIndex < colCount; ++colIndex) {
              packedData[dataIndex++] = tileDataR[rowOffset + colIndex];
            }
            rowOffset += bytesPerRow / bytesPerElement;
          }
        }
        const extent = this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord);
        extent[0] += source.offset;
        extent[2] += source.offset;
        const clipExtent = (_a6 = this.clipExtent_) == null ? void 0 : _a6.slice();
        if (clipExtent) {
          clipExtent[0] += source.offset;
          clipExtent[2] += source.offset;
        }
        dataSources.push({
          extent,
          clipExtent,
          data: new Uint8Array(packedData.buffer),
          dataType: DataType,
          bytesPerPixel,
          pixelSize
        });
      });
      this.sourceTiles_.length = 0;
      if (dataSources.length === 0) {
        this.state = TileState_default.ERROR;
      } else {
        const z = this.wrappedTileCoord_[0];
        const size = this.targetTileGrid_.getTileSize(z);
        const targetWidth = typeof size === "number" ? size : size[0];
        const targetHeight = typeof size === "number" ? size : size[1];
        const targetResolution = this.targetTileGrid_.getResolution(z);
        const sourceResolution = this.sourceTileGrid_.getResolution(
          this.sourceZ_
        );
        const targetExtent = this.targetTileGrid_.getTileCoordExtent(
          this.wrappedTileCoord_
        );
        let dataR, dataU;
        const bytesPerPixel = dataSources[0].bytesPerPixel;
        const reprojs = Math.ceil(bytesPerPixel / 3);
        for (let reproj = reprojs - 1; reproj >= 0; --reproj) {
          const sources = [];
          for (let i2 = 0, len = dataSources.length; i2 < len; ++i2) {
            const dataSource = dataSources[i2];
            const buffer2 = dataSource.data;
            const pixelSize = dataSource.pixelSize;
            const width = pixelSize[0];
            const height = pixelSize[1];
            const context2 = createCanvasContext2D(width, height, canvasPool);
            const imageData2 = context2.createImageData(width, height);
            const data2 = imageData2.data;
            let offset2 = reproj * 3;
            for (let j = 0, len2 = data2.length; j < len2; j += 4) {
              data2[j] = buffer2[offset2];
              data2[j + 1] = buffer2[offset2 + 1];
              data2[j + 2] = buffer2[offset2 + 2];
              data2[j + 3] = 255;
              offset2 += bytesPerPixel;
            }
            context2.putImageData(imageData2, 0, 0);
            sources.push({
              extent: dataSource.extent,
              clipExtent: dataSource.clipExtent,
              image: context2.canvas
            });
          }
          const canvas = render(
            targetWidth,
            targetHeight,
            this.pixelRatio_,
            sourceResolution,
            this.sourceTileGrid_.getExtent(),
            targetResolution,
            targetExtent,
            this.triangulation_,
            sources,
            this.gutter_,
            false,
            false,
            false
            //true,
          );
          for (let i2 = 0, len = sources.length; i2 < len; ++i2) {
            const canvas2 = sources[i2].image;
            const context2 = canvas2.getContext("2d");
            releaseCanvas(context2);
            canvasPool.push(context2.canvas);
          }
          const context = canvas.getContext("2d");
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          releaseCanvas(context);
          canvasPool.push(canvas);
          if (!dataR) {
            dataU = new Uint8Array(
              bytesPerPixel * imageData.width * imageData.height
            );
            dataR = new dataSources[0].dataType(dataU.buffer);
          }
          const data = imageData.data;
          let offset = reproj * 3;
          for (let i2 = 0, len = data.length; i2 < len; i2 += 4) {
            if (data[i2 + 3] === 255) {
              dataU[offset] = data[i2];
              dataU[offset + 1] = data[i2 + 1];
              dataU[offset + 2] = data[i2 + 2];
            } else {
              dataU[offset] = 0;
              dataU[offset + 1] = 0;
              dataU[offset + 2] = 0;
            }
            offset += bytesPerPixel;
          }
        }
        this.reprojData_ = dataR;
        this.reprojSize_ = [
          Math.round(targetWidth * this.pixelRatio_),
          Math.round(targetHeight * this.pixelRatio_)
        ];
        this.state = TileState_default.LOADED;
      }
      this.changed();
    }
    /**
     * Load not yet loaded URI.
     */
    load() {
      if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) {
        return;
      }
      this.state = TileState_default.LOADING;
      this.changed();
      let leftToLoad = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(({ tile }) => {
        const state = tile.getState();
        if (state !== TileState_default.IDLE && state !== TileState_default.LOADING) {
          return;
        }
        leftToLoad++;
        const sourceListenKey = listen(
          tile,
          EventType_default.CHANGE,
          function() {
            const state2 = tile.getState();
            if (state2 == TileState_default.LOADED || state2 == TileState_default.ERROR || state2 == TileState_default.EMPTY) {
              unlistenByKey(sourceListenKey);
              leftToLoad--;
              if (leftToLoad === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          },
          this
        );
        this.sourcesListenerKeys_.push(sourceListenKey);
      });
      if (leftToLoad === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function({ tile }) {
          const state = tile.getState();
          if (state == TileState_default.IDLE) {
            tile.load();
          }
        });
      }
    }
    /**
     * @private
     */
    unlistenSources_() {
      this.sourcesListenerKeys_.forEach(unlistenByKey);
      this.sourcesListenerKeys_ = null;
    }
  };
  __name(_ReprojDataTile, "ReprojDataTile");
  var ReprojDataTile = _ReprojDataTile;
  var DataTile_default2 = ReprojDataTile;

  // node_modules/ol/asserts.js
  function assert(assertion, errorMessage) {
    if (!assertion) {
      throw new Error(errorMessage);
    }
  }
  __name(assert, "assert");

  // node_modules/ol/structs/LRUCache.js
  var _LRUCache = class _LRUCache {
    /**
     * @param {number} [highWaterMark] High water mark.
     */
    constructor(highWaterMark) {
      this.highWaterMark = highWaterMark !== void 0 ? highWaterMark : 2048;
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    }
    /**
     * @return {boolean} Can expire cache.
     */
    canExpireCache() {
      return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
    }
    /**
     * Expire the cache.
     * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
     */
    expireCache(keep) {
      while (this.canExpireCache()) {
        this.pop();
      }
    }
    /**
     * FIXME empty description for jsdoc
     */
    clear() {
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    }
    /**
     * @param {string} key Key.
     * @return {boolean} Contains key.
     */
    containsKey(key) {
      return this.entries_.hasOwnProperty(key);
    }
    /**
     * @param {function(T, string, LRUCache<T>): ?} f The function
     *     to call for every entry from the oldest to the newer. This function takes
     *     3 arguments (the entry value, the entry key and the LRUCache object).
     *     The return value is ignored.
     */
    forEach(f) {
      let entry = this.oldest_;
      while (entry) {
        f(entry.value_, entry.key_, this);
        entry = entry.newer;
      }
    }
    /**
     * @param {string} key Key.
     * @param {*} [options] Options (reserved for subclasses).
     * @return {T} Value.
     */
    get(key, options) {
      const entry = this.entries_[key];
      assert(
        entry !== void 0,
        "Tried to get a value for a key that does not exist in the cache"
      );
      if (entry === this.newest_) {
        return entry.value_;
      }
      if (entry === this.oldest_) {
        this.oldest_ = /** @type {Entry} */
        this.oldest_.newer;
        this.oldest_.older = null;
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      entry.newer = null;
      entry.older = this.newest_;
      this.newest_.newer = entry;
      this.newest_ = entry;
      return entry.value_;
    }
    /**
     * Remove an entry from the cache.
     * @param {string} key The entry key.
     * @return {T} The removed entry.
     */
    remove(key) {
      const entry = this.entries_[key];
      assert(
        entry !== void 0,
        "Tried to get a value for a key that does not exist in the cache"
      );
      if (entry === this.newest_) {
        this.newest_ = /** @type {Entry} */
        entry.older;
        if (this.newest_) {
          this.newest_.newer = null;
        }
      } else if (entry === this.oldest_) {
        this.oldest_ = /** @type {Entry} */
        entry.newer;
        if (this.oldest_) {
          this.oldest_.older = null;
        }
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      delete this.entries_[key];
      --this.count_;
      return entry.value_;
    }
    /**
     * @return {number} Count.
     */
    getCount() {
      return this.count_;
    }
    /**
     * @return {Array<string>} Keys.
     */
    getKeys() {
      const keys = new Array(this.count_);
      let i2 = 0;
      let entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        keys[i2++] = entry.key_;
      }
      return keys;
    }
    /**
     * @return {Array<T>} Values.
     */
    getValues() {
      const values = new Array(this.count_);
      let i2 = 0;
      let entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        values[i2++] = entry.value_;
      }
      return values;
    }
    /**
     * @return {T} Last value.
     */
    peekLast() {
      return this.oldest_.value_;
    }
    /**
     * @return {string} Last key.
     */
    peekLastKey() {
      return this.oldest_.key_;
    }
    /**
     * Get the key of the newest item in the cache.  Throws if the cache is empty.
     * @return {string} The newest key.
     */
    peekFirstKey() {
      return this.newest_.key_;
    }
    /**
     * Return an entry without updating least recently used time.
     * @param {string} key Key.
     * @return {T|undefined} Value.
     */
    peek(key) {
      var _a6;
      return (_a6 = this.entries_[key]) == null ? void 0 : _a6.value_;
    }
    /**
     * @return {T} value Value.
     */
    pop() {
      const entry = this.oldest_;
      delete this.entries_[entry.key_];
      if (entry.newer) {
        entry.newer.older = null;
      }
      this.oldest_ = /** @type {Entry} */
      entry.newer;
      if (!this.oldest_) {
        this.newest_ = null;
      }
      --this.count_;
      return entry.value_;
    }
    /**
     * @param {string} key Key.
     * @param {T} value Value.
     */
    replace(key, value) {
      this.get(key);
      this.entries_[key].value_ = value;
    }
    /**
     * @param {string} key Key.
     * @param {T} value Value.
     */
    set(key, value) {
      assert(
        !(key in this.entries_),
        "Tried to set a value for a key that is used already"
      );
      const entry = {
        key_: key,
        newer: null,
        older: this.newest_,
        value_: value
      };
      if (!this.newest_) {
        this.oldest_ = entry;
      } else {
        this.newest_.newer = entry;
      }
      this.newest_ = entry;
      this.entries_[key] = entry;
      ++this.count_;
    }
    /**
     * Set a maximum number of entries for the cache.
     * @param {number} size Cache size.
     * @api
     */
    setSize(size) {
      this.highWaterMark = size;
    }
  };
  __name(_LRUCache, "LRUCache");
  var LRUCache = _LRUCache;
  var LRUCache_default = LRUCache;

  // node_modules/ol/tilecoord.js
  function createOrUpdate2(z, x2, y, tileCoord) {
    if (tileCoord !== void 0) {
      tileCoord[0] = z;
      tileCoord[1] = x2;
      tileCoord[2] = y;
      return tileCoord;
    }
    return [z, x2, y];
  }
  __name(createOrUpdate2, "createOrUpdate");
  function getKeyZXY(z, x2, y) {
    return z + "/" + x2 + "/" + y;
  }
  __name(getKeyZXY, "getKeyZXY");
  function getKey(tileCoord) {
    return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
  }
  __name(getKey, "getKey");
  function getCacheKeyForTileKey(tileKey) {
    const [z, x2, y] = tileKey.substring(tileKey.lastIndexOf("/") + 1, tileKey.length).split(",").map(Number);
    return getKeyZXY(z, x2, y);
  }
  __name(getCacheKeyForTileKey, "getCacheKeyForTileKey");
  function fromKey(key) {
    return key.split("/").map(Number);
  }
  __name(fromKey, "fromKey");
  function hash(tileCoord) {
    return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
  }
  __name(hash, "hash");
  function withinExtentAndZ(tileCoord, tileGrid) {
    const z = tileCoord[0];
    const x2 = tileCoord[1];
    const y = tileCoord[2];
    if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
      return false;
    }
    const tileRange = tileGrid.getFullTileRange(z);
    if (!tileRange) {
      return true;
    }
    return tileRange.containsXY(x2, y);
  }
  __name(withinExtentAndZ, "withinExtentAndZ");

  // node_modules/ol/TileCache.js
  var _TileCache = class _TileCache extends LRUCache_default {
    clear() {
      while (this.getCount() > 0) {
        this.pop().release();
      }
      super.clear();
    }
    /**
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    expireCache(usedTiles) {
      while (this.canExpireCache()) {
        const tile = this.peekLast();
        if (tile.getKey() in usedTiles) {
          break;
        } else {
          this.pop().release();
        }
      }
    }
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    pruneExceptNewestZ() {
      if (this.getCount() === 0) {
        return;
      }
      const key = this.peekFirstKey();
      const tileCoord = fromKey(key);
      const z = tileCoord[0];
      this.forEach((tile) => {
        if (tile.tileCoord[0] !== z) {
          this.remove(getKey(tile.tileCoord));
          tile.release();
        }
      });
    }
  };
  __name(_TileCache, "TileCache");
  var TileCache = _TileCache;
  var TileCache_default = TileCache;

  // node_modules/ol/source/TileEventType.js
  var TileEventType_default = {
    /**
     * Triggered when a tile starts loading.
     * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
     * @api
     */
    TILELOADSTART: "tileloadstart",
    /**
     * Triggered when a tile finishes loading, either when its data is loaded,
     * or when loading was aborted because the tile is no longer needed.
     * @event module:ol/source/Tile.TileSourceEvent#tileloadend
     * @api
     */
    TILELOADEND: "tileloadend",
    /**
     * Triggered if tile loading results in an error. Note that this is not the
     * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
     * for details.
     * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
     * @api
     */
    TILELOADERROR: "tileloaderror"
  };

  // node_modules/ol/ObjectEventType.js
  var ObjectEventType_default = {
    /**
     * Triggered when a property is changed.
     * @event module:ol/Object.ObjectEvent#propertychange
     * @api
     */
    PROPERTYCHANGE: "propertychange"
  };

  // node_modules/ol/Observable.js
  var _Observable = class _Observable extends Target_default {
    constructor() {
      super();
      this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
      this.onInternal;
      this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
      this.onceInternal;
      this.un = /** @type {ObservableOnSignature<void>} */
      this.unInternal;
      this.revision_ = 0;
    }
    /**
     * Increases the revision counter and dispatches a 'change' event.
     * @api
     */
    changed() {
      ++this.revision_;
      this.dispatchEvent(EventType_default.CHANGE);
    }
    /**
     * Get the version number for this object.  Each time the object is modified,
     * its version number will be incremented.
     * @return {number} Revision.
     * @api
     */
    getRevision() {
      return this.revision_;
    }
    /**
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
     * @protected
     */
    onInternal(type, listener) {
      if (Array.isArray(type)) {
        const len = type.length;
        const keys = new Array(len);
        for (let i2 = 0; i2 < len; ++i2) {
          keys[i2] = listen(this, type[i2], listener);
        }
        return keys;
      }
      return listen(
        this,
        /** @type {string} */
        type,
        listener
      );
    }
    /**
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
     * @protected
     */
    onceInternal(type, listener) {
      let key;
      if (Array.isArray(type)) {
        const len = type.length;
        key = new Array(len);
        for (let i2 = 0; i2 < len; ++i2) {
          key[i2] = listenOnce(this, type[i2], listener);
        }
      } else {
        key = listenOnce(
          this,
          /** @type {string} */
          type,
          listener
        );
      }
      listener.ol_key = key;
      return key;
    }
    /**
     * Unlisten for a certain type of event.
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @protected
     */
    unInternal(type, listener) {
      const key = (
        /** @type {Object} */
        listener.ol_key
      );
      if (key) {
        unByKey(key);
      } else if (Array.isArray(type)) {
        for (let i2 = 0, ii = type.length; i2 < ii; ++i2) {
          this.removeEventListener(type[i2], listener);
        }
      } else {
        this.removeEventListener(type, listener);
      }
    }
  };
  __name(_Observable, "Observable");
  var Observable = _Observable;
  Observable.prototype.on;
  Observable.prototype.once;
  Observable.prototype.un;
  function unByKey(key) {
    if (Array.isArray(key)) {
      for (let i2 = 0, ii = key.length; i2 < ii; ++i2) {
        unlistenByKey(key[i2]);
      }
    } else {
      unlistenByKey(
        /** @type {import("./events.js").EventsKey} */
        key
      );
    }
  }
  __name(unByKey, "unByKey");
  var Observable_default = Observable;

  // node_modules/ol/Object.js
  var _ObjectEvent = class _ObjectEvent extends Event_default {
    /**
     * @param {string} type The event type.
     * @param {string} key The property name.
     * @param {*} oldValue The old value for `key`.
     */
    constructor(type, key, oldValue) {
      super(type);
      this.key = key;
      this.oldValue = oldValue;
    }
  };
  __name(_ObjectEvent, "ObjectEvent");
  var ObjectEvent = _ObjectEvent;
  var _BaseObject = class _BaseObject extends Observable_default {
    /**
     * @param {Object<string, *>} [values] An object with key-value pairs.
     */
    constructor(values) {
      super();
      this.on;
      this.once;
      this.un;
      getUid(this);
      this.values_ = null;
      if (values !== void 0) {
        this.setProperties(values);
      }
    }
    /**
     * Gets a value.
     * @param {string} key Key name.
     * @return {*} Value.
     * @api
     */
    get(key) {
      let value;
      if (this.values_ && this.values_.hasOwnProperty(key)) {
        value = this.values_[key];
      }
      return value;
    }
    /**
     * Get a list of object property names.
     * @return {Array<string>} List of property names.
     * @api
     */
    getKeys() {
      return this.values_ && Object.keys(this.values_) || [];
    }
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>} Object.
     * @api
     */
    getProperties() {
      return this.values_ && Object.assign({}, this.values_) || {};
    }
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>?} Object.
     */
    getPropertiesInternal() {
      return this.values_;
    }
    /**
     * @return {boolean} The object has properties.
     */
    hasProperties() {
      return !!this.values_;
    }
    /**
     * @param {string} key Key name.
     * @param {*} oldValue Old value.
     */
    notify(key, oldValue) {
      let eventType;
      eventType = `change:${key}`;
      if (this.hasListener(eventType)) {
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
      }
      eventType = ObjectEventType_default.PROPERTYCHANGE;
      if (this.hasListener(eventType)) {
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
      }
    }
    /**
     * @param {string} key Key name.
     * @param {import("./events.js").Listener} listener Listener.
     */
    addChangeListener(key, listener) {
      this.addEventListener(`change:${key}`, listener);
    }
    /**
     * @param {string} key Key name.
     * @param {import("./events.js").Listener} listener Listener.
     */
    removeChangeListener(key, listener) {
      this.removeEventListener(`change:${key}`, listener);
    }
    /**
     * Sets a value.
     * @param {string} key Key name.
     * @param {*} value Value.
     * @param {boolean} [silent] Update without triggering an event.
     * @api
     */
    set(key, value, silent) {
      const values = this.values_ || (this.values_ = {});
      if (silent) {
        values[key] = value;
      } else {
        const oldValue = values[key];
        values[key] = value;
        if (oldValue !== value) {
          this.notify(key, oldValue);
        }
      }
    }
    /**
     * Sets a collection of key-value pairs.  Note that this changes any existing
     * properties and adds new ones (it does not remove any existing properties).
     * @param {Object<string, *>} values Values.
     * @param {boolean} [silent] Update without triggering an event.
     * @api
     */
    setProperties(values, silent) {
      for (const key in values) {
        this.set(key, values[key], silent);
      }
    }
    /**
     * Apply any properties from another object without triggering events.
     * @param {BaseObject} source The source object.
     * @protected
     */
    applyProperties(source) {
      if (!source.values_) {
        return;
      }
      Object.assign(this.values_ || (this.values_ = {}), source.values_);
    }
    /**
     * Unsets a property.
     * @param {string} key Key name.
     * @param {boolean} [silent] Unset without triggering an event.
     * @api
     */
    unset(key, silent) {
      if (this.values_ && key in this.values_) {
        const oldValue = this.values_[key];
        delete this.values_[key];
        if (isEmpty(this.values_)) {
          this.values_ = null;
        }
        if (!silent) {
          this.notify(key, oldValue);
        }
      }
    }
  };
  __name(_BaseObject, "BaseObject");
  var BaseObject = _BaseObject;
  var Object_default = BaseObject;

  // node_modules/ol/source/Source.js
  var _Source = class _Source extends Object_default {
    /**
     * @param {Options} options Source options.
     */
    constructor(options) {
      super();
      this.projection = get3(options.projection);
      this.attributions_ = adaptAttributions(options.attributions);
      this.attributionsCollapsible_ = options.attributionsCollapsible !== void 0 ? options.attributionsCollapsible : true;
      this.loading = false;
      this.state_ = options.state !== void 0 ? options.state : "ready";
      this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
      this.interpolate_ = !!options.interpolate;
      this.viewResolver = null;
      this.viewRejector = null;
      const self2 = this;
      this.viewPromise_ = new Promise(function(resolve, reject) {
        self2.viewResolver = resolve;
        self2.viewRejector = reject;
      });
    }
    /**
     * Get the attribution function for the source.
     * @return {?Attribution} Attribution function.
     * @api
     */
    getAttributions() {
      return this.attributions_;
    }
    /**
     * @return {boolean} Attributions are collapsible.
     * @api
     */
    getAttributionsCollapsible() {
      return this.attributionsCollapsible_;
    }
    /**
     * Get the projection of the source.
     * @return {import("../proj/Projection.js").default|null} Projection.
     * @api
     */
    getProjection() {
      return this.projection;
    }
    /**
     * @param {import("../proj/Projection").default} [projection] Projection.
     * @return {Array<number>|null} Resolutions.
     */
    getResolutions(projection) {
      return null;
    }
    /**
     * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
     */
    getView() {
      return this.viewPromise_;
    }
    /**
     * Get the state of the source, see {@link import("./Source.js").State} for possible states.
     * @return {import("./Source.js").State} State.
     * @api
     */
    getState() {
      return this.state_;
    }
    /**
     * @return {boolean|undefined} Wrap X.
     */
    getWrapX() {
      return this.wrapX_;
    }
    /**
     * @return {boolean} Use linear interpolation when resampling.
     */
    getInterpolate() {
      return this.interpolate_;
    }
    /**
     * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
     * @api
     */
    refresh() {
      this.changed();
    }
    /**
     * Set the attributions of the source.
     * @param {AttributionLike|undefined} attributions Attributions.
     *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
     *     or `undefined`.
     * @api
     */
    setAttributions(attributions) {
      this.attributions_ = adaptAttributions(attributions);
      this.changed();
    }
    /**
     * Set the state of the source.
     * @param {import("./Source.js").State} state State.
     */
    setState(state) {
      this.state_ = state;
      this.changed();
    }
  };
  __name(_Source, "Source");
  var Source = _Source;
  function adaptAttributions(attributionLike) {
    if (!attributionLike) {
      return null;
    }
    if (Array.isArray(attributionLike)) {
      return function(frameState) {
        return attributionLike;
      };
    }
    if (typeof attributionLike === "function") {
      return attributionLike;
    }
    return function(frameState) {
      return [attributionLike];
    };
  }
  __name(adaptAttributions, "adaptAttributions");
  var Source_default = Source;

  // node_modules/ol/TileRange.js
  var _TileRange = class _TileRange {
    /**
     * @param {number} minX Minimum X.
     * @param {number} maxX Maximum X.
     * @param {number} minY Minimum Y.
     * @param {number} maxY Maximum Y.
     */
    constructor(minX, maxX, minY, maxY) {
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;
    }
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {boolean} Contains tile coordinate.
     */
    contains(tileCoord) {
      return this.containsXY(tileCoord[1], tileCoord[2]);
    }
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Contains.
     */
    containsTileRange(tileRange) {
      return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
    }
    /**
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @return {boolean} Contains coordinate.
     */
    containsXY(x2, y) {
      return this.minX <= x2 && x2 <= this.maxX && this.minY <= y && y <= this.maxY;
    }
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Equals.
     */
    equals(tileRange) {
      return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
    }
    /**
     * @param {TileRange} tileRange Tile range.
     */
    extend(tileRange) {
      if (tileRange.minX < this.minX) {
        this.minX = tileRange.minX;
      }
      if (tileRange.maxX > this.maxX) {
        this.maxX = tileRange.maxX;
      }
      if (tileRange.minY < this.minY) {
        this.minY = tileRange.minY;
      }
      if (tileRange.maxY > this.maxY) {
        this.maxY = tileRange.maxY;
      }
    }
    /**
     * @return {number} Height.
     */
    getHeight() {
      return this.maxY - this.minY + 1;
    }
    /**
     * @return {import("./size.js").Size} Size.
     */
    getSize() {
      return [this.getWidth(), this.getHeight()];
    }
    /**
     * @return {number} Width.
     */
    getWidth() {
      return this.maxX - this.minX + 1;
    }
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Intersects.
     */
    intersects(tileRange) {
      return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
    }
  };
  __name(_TileRange, "TileRange");
  var TileRange = _TileRange;
  function createOrUpdate3(minX, maxX, minY, maxY, tileRange) {
    if (tileRange !== void 0) {
      tileRange.minX = minX;
      tileRange.maxX = maxX;
      tileRange.minY = minY;
      tileRange.maxY = maxY;
      return tileRange;
    }
    return new TileRange(minX, maxX, minY, maxY);
  }
  __name(createOrUpdate3, "createOrUpdate");
  var TileRange_default = TileRange;

  // node_modules/ol/tilegrid/common.js
  var DEFAULT_MAX_ZOOM = 42;
  var DEFAULT_TILE_SIZE = 256;

  // node_modules/ol/geom/flat/segments.js
  function forEach(flatCoordinates, offset, end, stride, callback) {
    let ret;
    offset += stride;
    for (; offset < end; offset += stride) {
      ret = callback(
        flatCoordinates.slice(offset - stride, offset),
        flatCoordinates.slice(offset, offset + stride)
      );
      if (ret) {
        return ret;
      }
    }
    return false;
  }
  __name(forEach, "forEach");

  // node_modules/ol/geom/flat/contains.js
  function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
    const outside = forEachCorner(
      extent,
      /**
       * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
       * @return {boolean} Contains (x, y).
       */
      function(coordinate) {
        return !linearRingContainsXY(
          flatCoordinates,
          offset,
          end,
          stride,
          coordinate[0],
          coordinate[1]
        );
      }
    );
    return !outside;
  }
  __name(linearRingContainsExtent, "linearRingContainsExtent");
  function linearRingContainsXY(flatCoordinates, offset, end, stride, x2, y) {
    let wn = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      const x22 = flatCoordinates[offset];
      const y2 = flatCoordinates[offset + 1];
      if (y1 <= y) {
        if (y2 > y && (x22 - x1) * (y - y1) - (x2 - x1) * (y2 - y1) > 0) {
          wn++;
        }
      } else if (y2 <= y && (x22 - x1) * (y - y1) - (x2 - x1) * (y2 - y1) < 0) {
        wn--;
      }
      x1 = x22;
      y1 = y2;
    }
    return wn !== 0;
  }
  __name(linearRingContainsXY, "linearRingContainsXY");
  function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x2, y) {
    if (ends.length === 0) {
      return false;
    }
    if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x2, y)) {
      return false;
    }
    for (let i2 = 1, ii = ends.length; i2 < ii; ++i2) {
      if (linearRingContainsXY(flatCoordinates, ends[i2 - 1], ends[i2], stride, x2, y)) {
        return false;
      }
    }
    return true;
  }
  __name(linearRingsContainsXY, "linearRingsContainsXY");
  function linearRingssContainsXY(flatCoordinates, offset, endss, stride, x2, y) {
    if (endss.length === 0) {
      return false;
    }
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x2, y)) {
        return true;
      }
      offset = ends[ends.length - 1];
    }
    return false;
  }
  __name(linearRingssContainsXY, "linearRingssContainsXY");

  // node_modules/ol/geom/flat/intersectsextent.js
  function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
    const coordinatesExtent = extendFlatCoordinates(
      createEmpty(),
      flatCoordinates,
      offset,
      end,
      stride
    );
    if (!intersects(extent, coordinatesExtent)) {
      return false;
    }
    if (containsExtent(extent, coordinatesExtent)) {
      return true;
    }
    if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
      return true;
    }
    if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
      return true;
    }
    return forEach(
      flatCoordinates,
      offset,
      end,
      stride,
      /**
       * @param {import("../../coordinate.js").Coordinate} point1 Start point.
       * @param {import("../../coordinate.js").Coordinate} point2 End point.
       * @return {boolean} `true` if the segment and the extent intersect,
       *     `false` otherwise.
       */
      function(point1, point2) {
        return intersectsSegment(extent, point1, point2);
      }
    );
  }
  __name(intersectsLineString, "intersectsLineString");
  function intersectsLineStringArray(flatCoordinates, offset, ends, stride, extent) {
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      if (intersectsLineString(flatCoordinates, offset, ends[i2], stride, extent)) {
        return true;
      }
      offset = ends[i2];
    }
    return false;
  }
  __name(intersectsLineStringArray, "intersectsLineStringArray");
  function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
    if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
      return true;
    }
    if (linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[0],
      extent[1]
    )) {
      return true;
    }
    if (linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[0],
      extent[3]
    )) {
      return true;
    }
    if (linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[2],
      extent[1]
    )) {
      return true;
    }
    if (linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[2],
      extent[3]
    )) {
      return true;
    }
    return false;
  }
  __name(intersectsLinearRing, "intersectsLinearRing");
  function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
    if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
      return false;
    }
    if (ends.length === 1) {
      return true;
    }
    for (let i2 = 1, ii = ends.length; i2 < ii; ++i2) {
      if (linearRingContainsExtent(
        flatCoordinates,
        ends[i2 - 1],
        ends[i2],
        stride,
        extent
      )) {
        if (!intersectsLineString(
          flatCoordinates,
          ends[i2 - 1],
          ends[i2],
          stride,
          extent
        )) {
          return false;
        }
      }
    }
    return true;
  }
  __name(intersectsLinearRingArray, "intersectsLinearRingArray");
  function intersectsLinearRingMultiArray(flatCoordinates, offset, endss, stride, extent) {
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      if (intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)) {
        return true;
      }
      offset = ends[ends.length - 1];
    }
    return false;
  }
  __name(intersectsLinearRingMultiArray, "intersectsLinearRingMultiArray");

  // node_modules/ol/size.js
  function scale(size, ratio, dest) {
    if (dest === void 0) {
      dest = [0, 0];
    }
    dest[0] = size[0] * ratio + 0.5 | 0;
    dest[1] = size[1] * ratio + 0.5 | 0;
    return dest;
  }
  __name(scale, "scale");
  function toSize(size, dest) {
    if (Array.isArray(size)) {
      return size;
    }
    if (dest === void 0) {
      dest = [size, size];
    } else {
      dest[0] = size;
      dest[1] = size;
    }
    return dest;
  }
  __name(toSize, "toSize");

  // node_modules/ol/tilegrid/TileGrid.js
  var tmpTileCoord = [0, 0, 0];
  var DECIMALS = 5;
  var _TileGrid = class _TileGrid {
    /**
     * @param {Options} options Tile grid options.
     */
    constructor(options) {
      this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
      this.resolutions_ = options.resolutions;
      assert(
        isSorted(
          this.resolutions_,
          /**
           * @param {number} a First resolution
           * @param {number} b Second resolution
           * @return {number} Comparison result
           */
          (a, b) => b - a,
          true
        ),
        "`resolutions` must be sorted in descending order"
      );
      let zoomFactor;
      if (!options.origins) {
        for (let i2 = 0, ii = this.resolutions_.length - 1; i2 < ii; ++i2) {
          if (!zoomFactor) {
            zoomFactor = this.resolutions_[i2] / this.resolutions_[i2 + 1];
          } else {
            if (this.resolutions_[i2] / this.resolutions_[i2 + 1] !== zoomFactor) {
              zoomFactor = void 0;
              break;
            }
          }
        }
      }
      this.zoomFactor_ = zoomFactor;
      this.maxZoom = this.resolutions_.length - 1;
      this.origin_ = options.origin !== void 0 ? options.origin : null;
      this.origins_ = null;
      if (options.origins !== void 0) {
        this.origins_ = options.origins;
        assert(
          this.origins_.length == this.resolutions_.length,
          "Number of `origins` and `resolutions` must be equal"
        );
      }
      const extent = options.extent;
      if (extent !== void 0 && !this.origin_ && !this.origins_) {
        this.origin_ = getTopLeft(extent);
      }
      assert(
        !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
        "Either `origin` or `origins` must be configured, never both"
      );
      this.tileSizes_ = null;
      if (options.tileSizes !== void 0) {
        this.tileSizes_ = options.tileSizes;
        assert(
          this.tileSizes_.length == this.resolutions_.length,
          "Number of `tileSizes` and `resolutions` must be equal"
        );
      }
      this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? DEFAULT_TILE_SIZE : null;
      assert(
        !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
        "Either `tileSize` or `tileSizes` must be configured, never both"
      );
      this.extent_ = extent !== void 0 ? extent : null;
      this.fullTileRanges_ = null;
      this.tmpSize_ = [0, 0];
      this.tmpExtent_ = [0, 0, 0, 0];
      if (options.sizes !== void 0) {
        this.fullTileRanges_ = options.sizes.map((size, z) => {
          const tileRange = new TileRange_default(
            Math.min(0, size[0]),
            Math.max(size[0] - 1, -1),
            Math.min(0, size[1]),
            Math.max(size[1] - 1, -1)
          );
          if (extent) {
            const restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
            tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
            tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
            tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
            tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
          }
          return tileRange;
        });
      } else if (extent) {
        this.calculateTileRanges_(extent);
      }
    }
    /**
     * Call a function with each tile coordinate for a given extent and zoom level.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} zoom Integer zoom level.
     * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
     * @api
     */
    forEachTileCoord(extent, zoom, callback) {
      const tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
      for (let i2 = tileRange.minX, ii = tileRange.maxX; i2 <= ii; ++i2) {
        for (let j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
          callback([zoom, i2, j]);
        }
      }
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
     * @return {boolean} Callback succeeded.
     */
    forEachTileCoordParentTileRange(tileCoord, callback, tempTileRange, tempExtent) {
      let tileRange, x2, y;
      let tileCoordExtent = null;
      let z = tileCoord[0] - 1;
      if (this.zoomFactor_ === 2) {
        x2 = tileCoord[1];
        y = tileCoord[2];
      } else {
        tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent);
      }
      while (z >= this.minZoom) {
        if (x2 !== void 0 && y !== void 0) {
          x2 = Math.floor(x2 / 2);
          y = Math.floor(y / 2);
          tileRange = createOrUpdate3(x2, x2, y, y, tempTileRange);
        } else {
          tileRange = this.getTileRangeForExtentAndZ(
            tileCoordExtent,
            z,
            tempTileRange
          );
        }
        if (callback(z, tileRange)) {
          return true;
        }
        --z;
      }
      return false;
    }
    /**
     * Get the extent for this tile grid, if it was configured.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent() {
      return this.extent_;
    }
    /**
     * Get the maximum zoom level for the grid.
     * @return {number} Max zoom.
     * @api
     */
    getMaxZoom() {
      return this.maxZoom;
    }
    /**
     * Get the minimum zoom level for the grid.
     * @return {number} Min zoom.
     * @api
     */
    getMinZoom() {
      return this.minZoom;
    }
    /**
     * Get the origin for the grid at the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {import("../coordinate.js").Coordinate} Origin.
     * @api
     */
    getOrigin(z) {
      if (this.origin_) {
        return this.origin_;
      }
      return this.origins_[z];
    }
    /**
     * Get the resolution for the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {number} Resolution.
     * @api
     */
    getResolution(z) {
      return this.resolutions_[z];
    }
    /**
     * Get the list of resolutions for the tile grid.
     * @return {Array<number>} Resolutions.
     * @api
     */
    getResolutions() {
      return this.resolutions_;
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
     * @return {import("../TileRange.js").default|null} Tile range.
     */
    getTileCoordChildTileRange(tileCoord, tempTileRange, tempExtent) {
      if (tileCoord[0] < this.maxZoom) {
        if (this.zoomFactor_ === 2) {
          const minX = tileCoord[1] * 2;
          const minY = tileCoord[2] * 2;
          return createOrUpdate3(
            minX,
            minX + 1,
            minY,
            minY + 1,
            tempTileRange
          );
        }
        const tileCoordExtent = this.getTileCoordExtent(
          tileCoord,
          tempExtent || this.tmpExtent_
        );
        return this.getTileRangeForExtentAndZ(
          tileCoordExtent,
          tileCoord[0] + 1,
          tempTileRange
        );
      }
      return null;
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @return {import("../TileRange.js").default|null} Tile range.
     */
    getTileRangeForTileCoordAndZ(tileCoord, z, tempTileRange) {
      if (z > this.maxZoom || z < this.minZoom) {
        return null;
      }
      const tileCoordZ = tileCoord[0];
      const tileCoordX = tileCoord[1];
      const tileCoordY = tileCoord[2];
      if (z === tileCoordZ) {
        return createOrUpdate3(
          tileCoordX,
          tileCoordY,
          tileCoordX,
          tileCoordY,
          tempTileRange
        );
      }
      if (this.zoomFactor_) {
        const factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
        const minX = Math.floor(tileCoordX * factor);
        const minY = Math.floor(tileCoordY * factor);
        if (z < tileCoordZ) {
          return createOrUpdate3(minX, minX, minY, minY, tempTileRange);
        }
        const maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
        const maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
        return createOrUpdate3(minX, maxX, minY, maxY, tempTileRange);
      }
      const tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
    }
    /**
     * Get a tile range for the given extent and integer zoom level.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    getTileRangeForExtentAndZ(extent, z, tempTileRange) {
      this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tmpTileCoord);
      const minX = tmpTileCoord[1];
      const minY = tmpTileCoord[2];
      this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tmpTileCoord);
      const maxX = tmpTileCoord[1];
      const maxY = tmpTileCoord[2];
      return createOrUpdate3(minX, maxX, minY, maxY, tempTileRange);
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {import("../coordinate.js").Coordinate} Tile center.
     */
    getTileCoordCenter(tileCoord) {
      const origin = this.getOrigin(tileCoord[0]);
      const resolution = this.getResolution(tileCoord[0]);
      const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      return [
        origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution,
        origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution
      ];
    }
    /**
     * Get the extent of a tile coordinate.
     *
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getTileCoordExtent(tileCoord, tempExtent) {
      const origin = this.getOrigin(tileCoord[0]);
      const resolution = this.getResolution(tileCoord[0]);
      const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      const minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
      const minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
      const maxX = minX + tileSize[0] * resolution;
      const maxY = minY + tileSize[1] * resolution;
      return createOrUpdate(minX, minY, maxX, maxY, tempExtent);
    }
    /**
     * Get the tile coordinate for the given map coordinate and resolution.  This
     * method considers that coordinates that intersect tile boundaries should be
     * assigned the higher tile coordinate.
     *
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    getTileCoordForCoordAndResolution(coordinate, resolution, opt_tileCoord) {
      return this.getTileCoordForXYAndResolution_(
        coordinate[0],
        coordinate[1],
        resolution,
        false,
        opt_tileCoord
      );
    }
    /**
     * Note that this method should not be called for resolutions that correspond
     * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} resolution Resolution (for a non-integer zoom level).
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    getTileCoordForXYAndResolution_(x2, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
      const z = this.getZForResolution(resolution);
      const scale3 = resolution / this.getResolution(z);
      const origin = this.getOrigin(z);
      const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      let tileCoordX = scale3 * (x2 - origin[0]) / resolution / tileSize[0];
      let tileCoordY = scale3 * (origin[1] - y) / resolution / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
        tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
      } else {
        tileCoordX = floor(tileCoordX, DECIMALS);
        tileCoordY = floor(tileCoordY, DECIMALS);
      }
      return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
    }
    /**
     * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
     * they should have separate implementations.  This method is for integer zoom
     * levels.  The other method should only be called for resolutions corresponding
     * to non-integer zoom levels.
     * @param {number} x Map x coordinate.
     * @param {number} y Map y coordinate.
     * @param {number} z Integer zoom level.
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    getTileCoordForXYAndZ_(x2, y, z, reverseIntersectionPolicy, opt_tileCoord) {
      const origin = this.getOrigin(z);
      const resolution = this.getResolution(z);
      const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      let tileCoordX = (x2 - origin[0]) / resolution / tileSize[0];
      let tileCoordY = (origin[1] - y) / resolution / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
        tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
      } else {
        tileCoordX = floor(tileCoordX, DECIMALS);
        tileCoordY = floor(tileCoordY, DECIMALS);
      }
      return createOrUpdate2(z, tileCoordX, tileCoordY, opt_tileCoord);
    }
    /**
     * Get a tile coordinate given a map coordinate and zoom level.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    getTileCoordForCoordAndZ(coordinate, z, opt_tileCoord) {
      return this.getTileCoordForXYAndZ_(
        coordinate[0],
        coordinate[1],
        z,
        false,
        opt_tileCoord
      );
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {number} Tile resolution.
     */
    getTileCoordResolution(tileCoord) {
      return this.resolutions_[tileCoord[0]];
    }
    /**
     * Get the tile size for a zoom level. The type of the return value matches the
     * `tileSize` or `tileSizes` that the tile grid was configured with. To always
     * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
     * @param {number} z Z.
     * @return {number|import("../size.js").Size} Tile size.
     * @api
     */
    getTileSize(z) {
      if (this.tileSize_) {
        return this.tileSize_;
      }
      return this.tileSizes_[z];
    }
    /**
     * @param {number} z Zoom level.
     * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
     */
    getFullTileRange(z) {
      if (!this.fullTileRanges_) {
        return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
      }
      return this.fullTileRanges_[z];
    }
    /**
     * @param {number} resolution Resolution.
     * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
     *     If 0, the nearest resolution will be used.
     *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
     *     nearest lower resolution (higher Z) will be used. Default is 0.
     *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
     *
     * For example to change tile Z at the midpoint of zoom levels
     * ```js
     * function(value, high, low) {
     *   return value - low * Math.sqrt(high / low);
     * }
     * ```
     * @return {number} Z.
     * @api
     */
    getZForResolution(resolution, opt_direction) {
      const z = linearFindNearest(
        this.resolutions_,
        resolution,
        opt_direction || 0
      );
      return clamp(z, this.minZoom, this.maxZoom);
    }
    /**
     * The tile with the provided tile coordinate intersects the given viewport.
     * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
     * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
     * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
     */
    tileCoordIntersectsViewport(tileCoord, viewport) {
      return intersectsLinearRing(
        viewport,
        0,
        viewport.length,
        2,
        this.getTileCoordExtent(tileCoord)
      );
    }
    /**
     * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
     * @private
     */
    calculateTileRanges_(extent) {
      const length = this.resolutions_.length;
      const fullTileRanges = new Array(length);
      for (let z = this.minZoom; z < length; ++z) {
        fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
      }
      this.fullTileRanges_ = fullTileRanges;
    }
  };
  __name(_TileGrid, "TileGrid");
  var TileGrid = _TileGrid;
  var TileGrid_default = TileGrid;

  // node_modules/ol/tilegrid.js
  function getForProjection(projection) {
    let tileGrid = projection.getDefaultTileGrid();
    if (!tileGrid) {
      tileGrid = createForProjection(projection);
      projection.setDefaultTileGrid(tileGrid);
    }
    return tileGrid;
  }
  __name(getForProjection, "getForProjection");
  function wrapX2(tileGrid, tileCoord, projection) {
    const z = tileCoord[0];
    const center = tileGrid.getTileCoordCenter(tileCoord);
    const projectionExtent = extentFromProjection(projection);
    if (!containsCoordinate(projectionExtent, center)) {
      const worldWidth = getWidth(projectionExtent);
      const worldsAway = Math.ceil(
        (projectionExtent[0] - center[0]) / worldWidth
      );
      center[0] += worldWidth * worldsAway;
      return tileGrid.getTileCoordForCoordAndZ(center, z);
    }
    return tileCoord;
  }
  __name(wrapX2, "wrapX");
  function createForExtent(extent, maxZoom, tileSize, corner) {
    corner = corner !== void 0 ? corner : "top-left";
    const resolutions = resolutionsFromExtent(extent, maxZoom, tileSize);
    return new TileGrid_default({
      extent,
      origin: getCorner(extent, corner),
      resolutions,
      tileSize
    });
  }
  __name(createForExtent, "createForExtent");
  function createXYZ(options) {
    const xyzOptions = options || {};
    const extent = xyzOptions.extent || get3("EPSG:3857").getExtent();
    const gridOptions = {
      extent,
      minZoom: xyzOptions.minZoom,
      tileSize: xyzOptions.tileSize,
      resolutions: resolutionsFromExtent(
        extent,
        xyzOptions.maxZoom,
        xyzOptions.tileSize,
        xyzOptions.maxResolution
      )
    };
    return new TileGrid_default(gridOptions);
  }
  __name(createXYZ, "createXYZ");
  function resolutionsFromExtent(extent, maxZoom, tileSize, maxResolution) {
    maxZoom = maxZoom !== void 0 ? maxZoom : DEFAULT_MAX_ZOOM;
    tileSize = toSize(tileSize !== void 0 ? tileSize : DEFAULT_TILE_SIZE);
    const height = getHeight(extent);
    const width = getWidth(extent);
    maxResolution = maxResolution > 0 ? maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
    const length = maxZoom + 1;
    const resolutions = new Array(length);
    for (let z = 0; z < length; ++z) {
      resolutions[z] = maxResolution / Math.pow(2, z);
    }
    return resolutions;
  }
  __name(resolutionsFromExtent, "resolutionsFromExtent");
  function createForProjection(projection, maxZoom, tileSize, corner) {
    const extent = extentFromProjection(projection);
    return createForExtent(extent, maxZoom, tileSize, corner);
  }
  __name(createForProjection, "createForProjection");
  function extentFromProjection(projection) {
    projection = get3(projection);
    let extent = projection.getExtent();
    if (!extent) {
      const half = 180 * METERS_PER_UNIT.degrees / projection.getMetersPerUnit();
      extent = createOrUpdate(-half, -half, half, half);
    }
    return extent;
  }
  __name(extentFromProjection, "extentFromProjection");

  // node_modules/ol/source/Tile.js
  var _TileSource = class _TileSource extends Source_default {
    /**
     * @param {Options} options SourceTile source options.
     */
    constructor(options) {
      super({
        attributions: options.attributions,
        attributionsCollapsible: options.attributionsCollapsible,
        projection: options.projection,
        state: options.state,
        wrapX: options.wrapX,
        interpolate: options.interpolate
      });
      this.on;
      this.once;
      this.un;
      this.opaque_ = options.opaque !== void 0 ? options.opaque : false;
      this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
      this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
      const tileSize = [256, 256];
      if (this.tileGrid) {
        toSize(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
      }
      this.tileCache = new TileCache_default(options.cacheSize || 0);
      this.tmpSize = [0, 0];
      this.key_ = options.key || "";
      this.tileOptions = {
        transition: options.transition,
        interpolate: options.interpolate
      };
      this.zDirection = options.zDirection ? options.zDirection : 0;
    }
    /**
     * @return {boolean} Can expire cache.
     */
    canExpireCache() {
      return this.tileCache.canExpireCache();
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    expireCache(projection, usedTiles) {
      const tileCache = this.getTileCacheForProjection(projection);
      if (tileCache) {
        tileCache.expireCache(usedTiles);
      }
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {number} z Zoom level.
     * @param {import("../TileRange.js").default} tileRange Tile range.
     * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
     *     loaded tile.  If the callback returns `false`, the tile will not be
     *     considered loaded.
     * @return {boolean} The tile range is fully covered with loaded tiles.
     */
    forEachLoadedTile(projection, z, tileRange, callback) {
      const tileCache = this.getTileCacheForProjection(projection);
      if (!tileCache) {
        return false;
      }
      let covered = true;
      let tile, tileCoordKey, loaded;
      for (let x2 = tileRange.minX; x2 <= tileRange.maxX; ++x2) {
        for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
          tileCoordKey = getKeyZXY(z, x2, y);
          loaded = false;
          if (tileCache.containsKey(tileCoordKey)) {
            tile = /** @type {!import("../Tile.js").default} */
            tileCache.get(tileCoordKey);
            loaded = tile.getState() === TileState_default.LOADED;
            if (loaded) {
              loaded = callback(tile) !== false;
            }
          }
          if (!loaded) {
            covered = false;
          }
        }
      }
      return covered;
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {number} Gutter.
     */
    getGutterForProjection(projection) {
      return 0;
    }
    /**
     * Return the key to be used for all tiles in the source.
     * @return {string} The key for all tiles.
     */
    getKey() {
      return this.key_;
    }
    /**
     * Set the value to be used as the key for all tiles in the source.
     * @param {string} key The key for tiles.
     * @protected
     */
    setKey(key) {
      if (this.key_ !== key) {
        this.key_ = key;
        this.changed();
      }
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {boolean} Opaque.
     */
    getOpaque(projection) {
      return this.opaque_;
    }
    /**
     * @param {import("../proj/Projection").default} [projection] Projection.
     * @return {Array<number>|null} Resolutions.
     */
    getResolutions(projection) {
      const tileGrid = projection ? this.getTileGridForProjection(projection) : this.tileGrid;
      if (!tileGrid) {
        return null;
      }
      return tileGrid.getResolutions();
    }
    /**
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../Tile.js").default} Tile.
     */
    getTile(z, x2, y, pixelRatio, projection) {
      return abstract();
    }
    /**
     * Return the tile grid of the tile source.
     * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
     * @api
     */
    getTileGrid() {
      return this.tileGrid;
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    getTileGridForProjection(projection) {
      if (!this.tileGrid) {
        return getForProjection(projection);
      }
      return this.tileGrid;
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../TileCache.js").default} Tile cache.
     * @protected
     */
    getTileCacheForProjection(projection) {
      const sourceProjection = this.getProjection();
      assert(
        sourceProjection === null || equivalent(sourceProjection, projection),
        "A VectorTile source can only be rendered if it has a projection compatible with the view projection."
      );
      return this.tileCache;
    }
    /**
     * Get the tile pixel ratio for this source. Subclasses may override this
     * method, which is meant to return a supported pixel ratio that matches the
     * provided `pixelRatio` as close as possible.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Tile pixel ratio.
     */
    getTilePixelRatio(pixelRatio) {
      return this.tilePixelRatio_;
    }
    /**
     * @param {number} z Z.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../size.js").Size} Tile size.
     */
    getTilePixelSize(z, pixelRatio, projection) {
      const tileGrid = this.getTileGridForProjection(projection);
      const tilePixelRatio = this.getTilePixelRatio(pixelRatio);
      const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
      if (tilePixelRatio == 1) {
        return tileSize;
      }
      return scale(tileSize, tilePixelRatio, this.tmpSize);
    }
    /**
     * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
     * is outside the resolution and extent range of the tile grid, `null` will be
     * returned.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../proj/Projection.js").default} [projection] Projection.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
     *     null if no tile URL should be created for the passed `tileCoord`.
     */
    getTileCoordForTileUrlFunction(tileCoord, projection) {
      projection = projection !== void 0 ? projection : this.getProjection();
      const tileGrid = this.getTileGridForProjection(projection);
      if (this.getWrapX() && projection.isGlobal()) {
        tileCoord = wrapX2(tileGrid, tileCoord, projection);
      }
      return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
    }
    /**
     * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
     * @api
     */
    clear() {
      this.tileCache.clear();
    }
    refresh() {
      this.clear();
      super.refresh();
    }
    /**
     * Increases the cache size if needed
     * @param {number} tileCount Minimum number of tiles needed.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    updateCacheSize(tileCount, projection) {
      const tileCache = this.getTileCacheForProjection(projection);
      if (tileCount > tileCache.highWaterMark) {
        tileCache.highWaterMark = tileCount;
      }
    }
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    useTile(z, x2, y, projection) {
    }
  };
  __name(_TileSource, "TileSource");
  var TileSource = _TileSource;
  var _TileSourceEvent = class _TileSourceEvent extends Event_default {
    /**
     * @param {string} type Type.
     * @param {import("../Tile.js").default} tile The tile.
     */
    constructor(type, tile) {
      super(type);
      this.tile = tile;
    }
  };
  __name(_TileSourceEvent, "TileSourceEvent");
  var TileSourceEvent = _TileSourceEvent;
  var Tile_default2 = TileSource;

  // node_modules/ol/source/DataTile.js
  var _DataTileSource = class _DataTileSource extends Tile_default2 {
    /**
     * @param {Options} options DataTile source options.
     */
    constructor(options) {
      const projection = options.projection === void 0 ? "EPSG:3857" : options.projection;
      let tileGrid = options.tileGrid;
      if (tileGrid === void 0 && projection) {
        tileGrid = createXYZ({
          extent: extentFromProjection(projection),
          maxResolution: options.maxResolution,
          maxZoom: options.maxZoom,
          minZoom: options.minZoom,
          tileSize: options.tileSize
        });
      }
      super({
        cacheSize: 0.1,
        // don't cache on the source
        attributions: options.attributions,
        attributionsCollapsible: options.attributionsCollapsible,
        projection,
        tileGrid,
        opaque: options.opaque,
        state: options.state,
        wrapX: options.wrapX,
        transition: options.transition,
        interpolate: options.interpolate
      });
      this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
      this.tileSize_ = options.tileSize ? toSize(options.tileSize) : null;
      this.tileSizes_ = null;
      this.tileLoadingKeys_ = {};
      this.loader_ = options.loader;
      this.handleTileChange_ = this.handleTileChange_.bind(this);
      this.bandCount = options.bandCount === void 0 ? 4 : options.bandCount;
      this.tileGridForProjection_ = {};
      this.tileCacheForProjection_ = {};
    }
    /**
     * Set the source tile sizes.  The length of the array is expected to match the number of
     * levels in the tile grid.
     * @protected
     * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
     */
    setTileSizes(tileSizes) {
      this.tileSizes_ = tileSizes;
    }
    /**
     * Get the source tile size at the given zoom level.  This may be different than the rendered tile
     * size.
     * @protected
     * @param {number} z Tile zoom level.
     * @return {import('../size.js').Size} The source tile size.
     */
    getTileSize(z) {
      if (this.tileSizes_) {
        return this.tileSizes_[z];
      }
      if (this.tileSize_) {
        return this.tileSize_;
      }
      const tileGrid = this.getTileGrid();
      return tileGrid ? toSize(tileGrid.getTileSize(z)) : [256, 256];
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {number} Gutter.
     */
    getGutterForProjection(projection) {
      const thisProj = this.getProjection();
      if (!thisProj || equivalent(thisProj, projection)) {
        return this.gutter_;
      }
      return 0;
    }
    /**
     * @param {Loader} loader The data loader.
     * @protected
     */
    setLoader(loader) {
      this.loader_ = loader;
    }
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../proj/Projection.js").default} targetProj The output projection.
     * @param {import("../proj/Projection.js").default} sourceProj The input projection.
     * @return {!DataTile} Tile.
     */
    getReprojTile_(z, x2, y, targetProj, sourceProj) {
      const cache2 = this.getTileCacheForProjection(targetProj);
      const tileCoordKey = getKeyZXY(z, x2, y);
      if (cache2.containsKey(tileCoordKey)) {
        const tile = cache2.get(tileCoordKey);
        if (tile && tile.key == this.getKey()) {
          return tile;
        }
      }
      const tileGrid = this.getTileGrid();
      const reprojTilePixelRatio = Math.max.apply(
        null,
        tileGrid.getResolutions().map((r, z2) => {
          const tileSize = toSize(tileGrid.getTileSize(z2));
          const textureSize = this.getTileSize(z2);
          return Math.max(
            textureSize[0] / tileSize[0],
            textureSize[1] / tileSize[1]
          );
        })
      );
      const sourceTileGrid = this.getTileGridForProjection(sourceProj);
      const targetTileGrid = this.getTileGridForProjection(targetProj);
      const tileCoord = [z, x2, y];
      const wrappedTileCoord = this.getTileCoordForTileUrlFunction(
        tileCoord,
        targetProj
      );
      const options = Object.assign(
        {
          sourceProj,
          sourceTileGrid,
          targetProj,
          targetTileGrid,
          tileCoord,
          wrappedTileCoord,
          pixelRatio: reprojTilePixelRatio,
          gutter: this.getGutterForProjection(sourceProj),
          getTileFunction: /* @__PURE__ */ __name((z2, x3, y2, pixelRatio) => this.getTile(z2, x3, y2, pixelRatio, sourceProj), "getTileFunction")
        },
        this.tileOptions
      );
      const newTile = new DataTile_default2(options);
      newTile.key = this.getKey();
      return newTile;
    }
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!DataTile} Tile.
     */
    getTile(z, x2, y, pixelRatio, projection) {
      const sourceProjection = this.getProjection();
      if (sourceProjection && projection && !equivalent(sourceProjection, projection)) {
        return this.getReprojTile_(z, x2, y, projection, sourceProjection);
      }
      const size = this.getTileSize(z);
      const tileCoordKey = getKeyZXY(z, x2, y);
      if (this.tileCache.containsKey(tileCoordKey)) {
        return this.tileCache.get(tileCoordKey);
      }
      const sourceLoader = this.loader_;
      function loader() {
        return toPromise(function() {
          return sourceLoader(z, x2, y);
        });
      }
      __name(loader, "loader");
      const options = Object.assign(
        {
          tileCoord: [z, x2, y],
          loader,
          size
        },
        this.tileOptions
      );
      const tile = new DataTile_default(options);
      tile.key = this.getKey();
      tile.addEventListener(EventType_default.CHANGE, this.handleTileChange_);
      this.tileCache.set(tileCoordKey, tile);
      return tile;
    }
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     */
    handleTileChange_(event) {
      const tile = (
        /** @type {import("../Tile.js").default} */
        event.target
      );
      const uid = getUid(tile);
      const tileState = tile.getState();
      let type;
      if (tileState == TileState_default.LOADING) {
        this.tileLoadingKeys_[uid] = true;
        type = TileEventType_default.TILELOADSTART;
      } else if (uid in this.tileLoadingKeys_) {
        delete this.tileLoadingKeys_[uid];
        type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
      }
      if (type) {
        this.dispatchEvent(new TileSourceEvent(type, tile));
      }
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    getTileGridForProjection(projection) {
      const thisProj = this.getProjection();
      if (this.tileGrid && (!thisProj || equivalent(thisProj, projection))) {
        return this.tileGrid;
      }
      const projKey = getUid(projection);
      if (!(projKey in this.tileGridForProjection_)) {
        this.tileGridForProjection_[projKey] = getForProjection(projection);
      }
      return this.tileGridForProjection_[projKey];
    }
    /**
     * Sets the tile grid to use when reprojecting the tiles to the given
     * projection instead of the default tile grid for the projection.
     *
     * This can be useful when the default tile grid cannot be created
     * (e.g. projection has no extent defined) or
     * for optimization reasons (custom tile size, resolutions, ...).
     *
     * @param {import("../proj.js").ProjectionLike} projection Projection.
     * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
     * @api
     */
    setTileGridForProjection(projection, tilegrid) {
      const proj = get3(projection);
      if (proj) {
        const projKey = getUid(proj);
        if (!(projKey in this.tileGridForProjection_)) {
          this.tileGridForProjection_[projKey] = tilegrid;
        }
      }
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../TileCache.js").default} Tile cache.
     */
    getTileCacheForProjection(projection) {
      const thisProj = this.getProjection();
      if (!thisProj || equivalent(thisProj, projection)) {
        return this.tileCache;
      }
      const projKey = getUid(projection);
      if (!(projKey in this.tileCacheForProjection_)) {
        this.tileCacheForProjection_[projKey] = new TileCache_default(0.1);
      }
      return this.tileCacheForProjection_[projKey];
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    expireCache(projection, usedTiles) {
      const usedTileCache = this.getTileCacheForProjection(projection);
      this.tileCache.expireCache(
        this.tileCache == usedTileCache ? usedTiles : {}
      );
      for (const id in this.tileCacheForProjection_) {
        const tileCache = this.tileCacheForProjection_[id];
        tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
      }
    }
    clear() {
      super.clear();
      for (const id in this.tileCacheForProjection_) {
        this.tileCacheForProjection_[id].clear();
      }
    }
  };
  __name(_DataTileSource, "DataTileSource");
  var DataTileSource = _DataTileSource;
  var DataTile_default3 = DataTileSource;

  // node_modules/ol/Feature.js
  var _Feature = class _Feature extends Object_default {
    /**
     * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
     *     You may pass a Geometry object directly, or an object literal containing
     *     properties. If you pass an object literal, you may include a Geometry
     *     associated with a `geometry` key.
     */
    constructor(geometryOrProperties) {
      super();
      this.on;
      this.once;
      this.un;
      this.id_ = void 0;
      this.geometryName_ = "geometry";
      this.style_ = null;
      this.styleFunction_ = void 0;
      this.geometryChangeKey_ = null;
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
      if (geometryOrProperties) {
        if (typeof /** @type {?} */
        geometryOrProperties.getSimplifiedGeometry === "function") {
          const geometry = (
            /** @type {Geometry} */
            geometryOrProperties
          );
          this.setGeometry(geometry);
        } else {
          const properties = geometryOrProperties;
          this.setProperties(properties);
        }
      }
    }
    /**
     * Clone this feature. If the original feature has a geometry it
     * is also cloned. The feature id is not set in the clone.
     * @return {Feature<Geometry>} The clone.
     * @api
     */
    clone() {
      const clone = (
        /** @type {Feature<Geometry>} */
        new _Feature(this.hasProperties() ? this.getProperties() : null)
      );
      clone.setGeometryName(this.getGeometryName());
      const geometry = this.getGeometry();
      if (geometry) {
        clone.setGeometry(
          /** @type {Geometry} */
          geometry.clone()
        );
      }
      const style = this.getStyle();
      if (style) {
        clone.setStyle(style);
      }
      return clone;
    }
    /**
     * Get the feature's default geometry.  A feature may have any number of named
     * geometries.  The "default" geometry (the one that is rendered by default) is
     * set when calling {@link module:ol/Feature~Feature#setGeometry}.
     * @return {Geometry|undefined} The default geometry for the feature.
     * @api
     * @observable
     */
    getGeometry() {
      return (
        /** @type {Geometry|undefined} */
        this.get(this.geometryName_)
      );
    }
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is either set when reading data from a remote source or set explicitly by
     * calling {@link module:ol/Feature~Feature#setId}.
     * @return {number|string|undefined} Id.
     * @api
     */
    getId() {
      return this.id_;
    }
    /**
     * Get the name of the feature's default geometry.  By default, the default
     * geometry is named `geometry`.
     * @return {string} Get the property name associated with the default geometry
     *     for this feature.
     * @api
     */
    getGeometryName() {
      return this.geometryName_;
    }
    /**
     * Get the feature's style. Will return what was provided to the
     * {@link module:ol/Feature~Feature#setStyle} method.
     * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
     * @api
     */
    getStyle() {
      return this.style_;
    }
    /**
     * Get the feature's style function.
     * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
     * representing the current style of this feature.
     * @api
     */
    getStyleFunction() {
      return this.styleFunction_;
    }
    /**
     * @private
     */
    handleGeometryChange_() {
      this.changed();
    }
    /**
     * @private
     */
    handleGeometryChanged_() {
      if (this.geometryChangeKey_) {
        unlistenByKey(this.geometryChangeKey_);
        this.geometryChangeKey_ = null;
      }
      const geometry = this.getGeometry();
      if (geometry) {
        this.geometryChangeKey_ = listen(
          geometry,
          EventType_default.CHANGE,
          this.handleGeometryChange_,
          this
        );
      }
      this.changed();
    }
    /**
     * Set the default geometry for the feature.  This will update the property
     * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
     * @param {Geometry|undefined} geometry The new geometry.
     * @api
     * @observable
     */
    setGeometry(geometry) {
      this.set(this.geometryName_, geometry);
    }
    /**
     * Set the style for the feature to override the layer style.  This can be a
     * single style object, an array of styles, or a function that takes a
     * resolution and returns an array of styles. To unset the feature style, call
     * `setStyle()` without arguments or a falsey value.
     * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    setStyle(style) {
      this.style_ = style;
      this.styleFunction_ = !style ? void 0 : createStyleFunction(style);
      this.changed();
    }
    /**
     * Set the feature id.  The feature id is considered stable and may be used when
     * requesting features or comparing identifiers returned from a remote source.
     * The feature id can be used with the
     * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
     * @param {number|string|undefined} id The feature id.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    setId(id) {
      this.id_ = id;
      this.changed();
    }
    /**
     * Set the property name to be used when getting the feature's default geometry.
     * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
     * this name will be returned.
     * @param {string} name The property name of the default geometry.
     * @api
     */
    setGeometryName(name) {
      this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
      this.geometryName_ = name;
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
      this.handleGeometryChanged_();
    }
  };
  __name(_Feature, "Feature");
  var Feature = _Feature;
  function createStyleFunction(obj) {
    if (typeof obj === "function") {
      return obj;
    }
    let styles;
    if (Array.isArray(obj)) {
      styles = obj;
    } else {
      assert(
        typeof /** @type {?} */
        obj.getZIndex === "function",
        "Expected an `ol/style/Style` or an array of `ol/style/Style.js`"
      );
      const style = (
        /** @type {import("./style/Style.js").default} */
        obj
      );
      styles = [style];
    }
    return function() {
      return styles;
    };
  }
  __name(createStyleFunction, "createStyleFunction");
  var Feature_default = Feature;

  // node_modules/ol/transform.js
  var tmp_ = new Array(6);
  function create() {
    return [1, 0, 0, 1, 0, 0];
  }
  __name(create, "create");
  function compose(transform2, dx1, dy1, sx, sy, angle, dx2, dy2) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    transform2[0] = sx * cos;
    transform2[1] = sy * sin;
    transform2[2] = -sx * sin;
    transform2[3] = sy * cos;
    transform2[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
    transform2[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
    return transform2;
  }
  __name(compose, "compose");

  // node_modules/ol/geom/flat/transform.js
  function transform2D(flatCoordinates, offset, end, stride, transform2, dest) {
    dest = dest ? dest : [];
    let i2 = 0;
    for (let j = offset; j < end; j += stride) {
      const x2 = flatCoordinates[j];
      const y = flatCoordinates[j + 1];
      dest[i2++] = transform2[0] * x2 + transform2[2] * y + transform2[4];
      dest[i2++] = transform2[1] * x2 + transform2[3] * y + transform2[5];
    }
    if (dest && dest.length != i2) {
      dest.length = i2;
    }
    return dest;
  }
  __name(transform2D, "transform2D");
  function rotate(flatCoordinates, offset, end, stride, angle, anchor, dest) {
    dest = dest ? dest : [];
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const anchorX = anchor[0];
    const anchorY = anchor[1];
    let i2 = 0;
    for (let j = offset; j < end; j += stride) {
      const deltaX = flatCoordinates[j] - anchorX;
      const deltaY = flatCoordinates[j + 1] - anchorY;
      dest[i2++] = anchorX + deltaX * cos - deltaY * sin;
      dest[i2++] = anchorY + deltaX * sin + deltaY * cos;
      for (let k = j + 2; k < j + stride; ++k) {
        dest[i2++] = flatCoordinates[k];
      }
    }
    if (dest && dest.length != i2) {
      dest.length = i2;
    }
    return dest;
  }
  __name(rotate, "rotate");
  function scale2(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
    dest = dest ? dest : [];
    const anchorX = anchor[0];
    const anchorY = anchor[1];
    let i2 = 0;
    for (let j = offset; j < end; j += stride) {
      const deltaX = flatCoordinates[j] - anchorX;
      const deltaY = flatCoordinates[j + 1] - anchorY;
      dest[i2++] = anchorX + sx * deltaX;
      dest[i2++] = anchorY + sy * deltaY;
      for (let k = j + 2; k < j + stride; ++k) {
        dest[i2++] = flatCoordinates[k];
      }
    }
    if (dest && dest.length != i2) {
      dest.length = i2;
    }
    return dest;
  }
  __name(scale2, "scale");
  function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
    dest = dest ? dest : [];
    let i2 = 0;
    for (let j = offset; j < end; j += stride) {
      dest[i2++] = flatCoordinates[j] + deltaX;
      dest[i2++] = flatCoordinates[j + 1] + deltaY;
      for (let k = j + 2; k < j + stride; ++k) {
        dest[i2++] = flatCoordinates[k];
      }
    }
    if (dest && dest.length != i2) {
      dest.length = i2;
    }
    return dest;
  }
  __name(translate, "translate");

  // node_modules/ol/geom/Geometry.js
  var tmpTransform = create();
  var _Geometry = class _Geometry extends Object_default {
    constructor() {
      super();
      this.extent_ = createEmpty();
      this.extentRevision_ = -1;
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = 0;
      this.simplifyTransformedInternal = memoizeOne(
        (revision, squaredTolerance, transform2) => {
          if (!transform2) {
            return this.getSimplifiedGeometry(squaredTolerance);
          }
          const clone = this.clone();
          clone.applyTransform(transform2);
          return clone.getSimplifiedGeometry(squaredTolerance);
        }
      );
    }
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */
    simplifyTransformed(squaredTolerance, transform2) {
      return this.simplifyTransformedInternal(
        this.getRevision(),
        squaredTolerance,
        transform2
      );
    }
    /**
     * Make a complete copy of the geometry.
     * @abstract
     * @return {!Geometry} Clone.
     */
    clone() {
      return abstract();
    }
    /**
     * @abstract
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      return abstract();
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    containsXY(x2, y) {
      const coord = this.getClosestPoint([x2, y]);
      return coord[0] === x2 && coord[1] === y;
    }
    /**
     * Return the closest point of the geometry to the passed point as
     * {@link module:ol/coordinate~Coordinate coordinate}.
     * @param {import("../coordinate.js").Coordinate} point Point.
     * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
     * @return {import("../coordinate.js").Coordinate} Closest point.
     * @api
     */
    getClosestPoint(point, closestPoint) {
      closestPoint = closestPoint ? closestPoint : [NaN, NaN];
      this.closestPointXY(point[0], point[1], closestPoint, Infinity);
      return closestPoint;
    }
    /**
     * Returns true if this geometry includes the specified coordinate. If the
     * coordinate is on the boundary of the geometry, returns false.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains coordinate.
     * @api
     */
    intersectsCoordinate(coordinate) {
      return this.containsXY(coordinate[0], coordinate[1]);
    }
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    computeExtent(extent) {
      return abstract();
    }
    /**
     * Get the extent of the geometry.
     * @param {import("../extent.js").Extent} [extent] Extent.
     * @return {import("../extent.js").Extent} extent Extent.
     * @api
     */
    getExtent(extent) {
      if (this.extentRevision_ != this.getRevision()) {
        const extent2 = this.computeExtent(this.extent_);
        if (isNaN(extent2[0]) || isNaN(extent2[1])) {
          createOrUpdateEmpty(extent2);
        }
        this.extentRevision_ = this.getRevision();
      }
      return returnOrUpdate(this.extent_, extent);
    }
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} angle Rotation angle in radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    rotate(angle, anchor) {
      abstract();
    }
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    scale(sx, sy, anchor) {
      abstract();
    }
    /**
     * Create a simplified version of this geometry.  For linestrings, this uses
     * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
     * algorithm.  For polygons, a quantization-based
     * simplification is used to preserve topology.
     * @param {number} tolerance The tolerance distance for simplification.
     * @return {Geometry} A new, simplified version of the original geometry.
     * @api
     */
    simplify(tolerance) {
      return this.getSimplifiedGeometry(tolerance * tolerance);
    }
    /**
     * Create a simplified version of this geometry using the Douglas Peucker
     * algorithm.
     * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Geometry} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance) {
      return abstract();
    }
    /**
     * Get the type of this geometry.
     * @abstract
     * @return {Type} Geometry type.
     */
    getType() {
      return abstract();
    }
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @abstract
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     */
    applyTransform(transformFn) {
      abstract();
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     */
    intersectsExtent(extent) {
      return abstract();
    }
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @abstract
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    translate(deltaX, deltaY) {
      abstract();
    }
    /**
     * Transform each coordinate of the geometry from one coordinate reference
     * system to another. The geometry is modified in place.
     * For example, a line will be transformed to a line and a circle to a circle.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     *
     * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @return {this} This geometry.  Note that original geometry is
     *     modified in place.
     * @api
     */
    transform(source, destination) {
      const sourceProj = get3(source);
      const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
        const pixelExtent = sourceProj.getExtent();
        const projectedExtent = sourceProj.getWorldExtent();
        const scale3 = getHeight(projectedExtent) / getHeight(pixelExtent);
        compose(
          tmpTransform,
          projectedExtent[0],
          projectedExtent[3],
          scale3,
          -scale3,
          0,
          0,
          0
        );
        transform2D(
          inCoordinates,
          0,
          inCoordinates.length,
          stride,
          tmpTransform,
          outCoordinates
        );
        return getTransform(sourceProj, destination)(
          inCoordinates,
          outCoordinates,
          stride
        );
      } : getTransform(sourceProj, destination);
      this.applyTransform(transformFn);
      return this;
    }
  };
  __name(_Geometry, "Geometry");
  var Geometry = _Geometry;
  var Geometry_default = Geometry;

  // node_modules/ol/geom/SimpleGeometry.js
  var _SimpleGeometry = class _SimpleGeometry extends Geometry_default {
    constructor() {
      super();
      this.layout = "XY";
      this.stride = 2;
      this.flatCoordinates;
    }
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    computeExtent(extent) {
      return createOrUpdateFromFlatCoordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        extent
      );
    }
    /**
     * @abstract
     * @return {Array<*> | null} Coordinates.
     */
    getCoordinates() {
      return abstract();
    }
    /**
     * Return the first coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} First coordinate.
     * @api
     */
    getFirstCoordinate() {
      return this.flatCoordinates.slice(0, this.stride);
    }
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getFlatCoordinates() {
      return this.flatCoordinates;
    }
    /**
     * Return the last coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} Last point.
     * @api
     */
    getLastCoordinate() {
      return this.flatCoordinates.slice(
        this.flatCoordinates.length - this.stride
      );
    }
    /**
     * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
     * @return {import("./Geometry.js").GeometryLayout} Layout.
     * @api
     */
    getLayout() {
      return this.layout;
    }
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance) {
      if (this.simplifiedGeometryRevision !== this.getRevision()) {
        this.simplifiedGeometryMaxMinSquaredTolerance = 0;
        this.simplifiedGeometryRevision = this.getRevision();
      }
      if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
        return this;
      }
      const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
      const simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
      if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
        return simplifiedGeometry;
      }
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      return this;
    }
    /**
     * @return {number} Stride.
     */
    getStride() {
      return this.stride;
    }
    /**
     * @param {import("./Geometry.js").GeometryLayout} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    setFlatCoordinates(layout, flatCoordinates) {
      this.stride = getStrideForLayout(layout);
      this.layout = layout;
      this.flatCoordinates = flatCoordinates;
    }
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    setCoordinates(coordinates2, layout) {
      abstract();
    }
    /**
     * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    setLayout(layout, coordinates2, nesting) {
      let stride;
      if (layout) {
        stride = getStrideForLayout(layout);
      } else {
        for (let i2 = 0; i2 < nesting; ++i2) {
          if (coordinates2.length === 0) {
            this.layout = "XY";
            this.stride = 2;
            return;
          }
          coordinates2 = /** @type {Array<unknown>} */
          coordinates2[0];
        }
        stride = coordinates2.length;
        layout = getLayoutForStride(stride);
      }
      this.layout = layout;
      this.stride = stride;
    }
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     * @api
     */
    applyTransform(transformFn) {
      if (this.flatCoordinates) {
        transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
        this.changed();
      }
    }
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @param {number} angle Rotation angle in counter-clockwise radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    rotate(angle, anchor) {
      const flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        const stride = this.getStride();
        rotate(
          flatCoordinates,
          0,
          flatCoordinates.length,
          stride,
          angle,
          anchor,
          flatCoordinates
        );
        this.changed();
      }
    }
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    scale(sx, sy, anchor) {
      if (sy === void 0) {
        sy = sx;
      }
      if (!anchor) {
        anchor = getCenter(this.getExtent());
      }
      const flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        const stride = this.getStride();
        scale2(
          flatCoordinates,
          0,
          flatCoordinates.length,
          stride,
          sx,
          sy,
          anchor,
          flatCoordinates
        );
        this.changed();
      }
    }
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    translate(deltaX, deltaY) {
      const flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        const stride = this.getStride();
        translate(
          flatCoordinates,
          0,
          flatCoordinates.length,
          stride,
          deltaX,
          deltaY,
          flatCoordinates
        );
        this.changed();
      }
    }
  };
  __name(_SimpleGeometry, "SimpleGeometry");
  var SimpleGeometry = _SimpleGeometry;
  function getLayoutForStride(stride) {
    let layout;
    if (stride == 2) {
      layout = "XY";
    } else if (stride == 3) {
      layout = "XYZ";
    } else if (stride == 4) {
      layout = "XYZM";
    }
    return (
      /** @type {import("./Geometry.js").GeometryLayout} */
      layout
    );
  }
  __name(getLayoutForStride, "getLayoutForStride");
  function getStrideForLayout(layout) {
    let stride;
    if (layout == "XY") {
      stride = 2;
    } else if (layout == "XYZ" || layout == "XYM") {
      stride = 3;
    } else if (layout == "XYZM") {
      stride = 4;
    }
    return (
      /** @type {number} */
      stride
    );
  }
  __name(getStrideForLayout, "getStrideForLayout");
  var SimpleGeometry_default = SimpleGeometry;

  // node_modules/ol/geom/flat/deflate.js
  function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
    for (let i2 = 0, ii = coordinate.length; i2 < ii; ++i2) {
      flatCoordinates[offset++] = coordinate[i2];
    }
    return offset;
  }
  __name(deflateCoordinate, "deflateCoordinate");
  function deflateCoordinates(flatCoordinates, offset, coordinates2, stride) {
    for (let i2 = 0, ii = coordinates2.length; i2 < ii; ++i2) {
      const coordinate = coordinates2[i2];
      for (let j = 0; j < stride; ++j) {
        flatCoordinates[offset++] = coordinate[j];
      }
    }
    return offset;
  }
  __name(deflateCoordinates, "deflateCoordinates");
  function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, ends) {
    ends = ends ? ends : [];
    let i2 = 0;
    for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
      const end = deflateCoordinates(
        flatCoordinates,
        offset,
        coordinatess[j],
        stride
      );
      ends[i2++] = end;
      offset = end;
    }
    ends.length = i2;
    return ends;
  }
  __name(deflateCoordinatesArray, "deflateCoordinatesArray");
  function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, endss) {
    endss = endss ? endss : [];
    let i2 = 0;
    for (let j = 0, jj = coordinatesss.length; j < jj; ++j) {
      const ends = deflateCoordinatesArray(
        flatCoordinates,
        offset,
        coordinatesss[j],
        stride,
        endss[i2]
      );
      if (ends.length === 0) {
        ends[0] = offset;
      }
      endss[i2++] = ends;
      offset = ends[ends.length - 1];
    }
    endss.length = i2;
    return endss;
  }
  __name(deflateMultiCoordinatesArray, "deflateMultiCoordinatesArray");

  // node_modules/ol/geom/flat/closest.js
  function assignClosest(flatCoordinates, offset1, offset2, stride, x2, y, closestPoint) {
    const x1 = flatCoordinates[offset1];
    const y1 = flatCoordinates[offset1 + 1];
    const dx = flatCoordinates[offset2] - x1;
    const dy = flatCoordinates[offset2 + 1] - y1;
    let offset;
    if (dx === 0 && dy === 0) {
      offset = offset1;
    } else {
      const t = ((x2 - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        offset = offset2;
      } else if (t > 0) {
        for (let i2 = 0; i2 < stride; ++i2) {
          closestPoint[i2] = lerp(
            flatCoordinates[offset1 + i2],
            flatCoordinates[offset2 + i2],
            t
          );
        }
        closestPoint.length = stride;
        return;
      } else {
        offset = offset1;
      }
    }
    for (let i2 = 0; i2 < stride; ++i2) {
      closestPoint[i2] = flatCoordinates[offset + i2];
    }
    closestPoint.length = stride;
  }
  __name(assignClosest, "assignClosest");
  function maxSquaredDelta(flatCoordinates, offset, end, stride, max2) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    for (offset += stride; offset < end; offset += stride) {
      const x2 = flatCoordinates[offset];
      const y2 = flatCoordinates[offset + 1];
      const squaredDelta = squaredDistance(x1, y1, x2, y2);
      if (squaredDelta > max2) {
        max2 = squaredDelta;
      }
      x1 = x2;
      y1 = y2;
    }
    return max2;
  }
  __name(maxSquaredDelta, "maxSquaredDelta");
  function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max2) {
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      max2 = maxSquaredDelta(flatCoordinates, offset, end, stride, max2);
      offset = end;
    }
    return max2;
  }
  __name(arrayMaxSquaredDelta, "arrayMaxSquaredDelta");
  function multiArrayMaxSquaredDelta(flatCoordinates, offset, endss, stride, max2) {
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      max2 = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max2);
      offset = ends[ends.length - 1];
    }
    return max2;
  }
  __name(multiArrayMaxSquaredDelta, "multiArrayMaxSquaredDelta");
  function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x2, y, closestPoint, minSquaredDistance, tmpPoint) {
    if (offset == end) {
      return minSquaredDistance;
    }
    let i2, squaredDistance2;
    if (maxDelta === 0) {
      squaredDistance2 = squaredDistance(
        x2,
        y,
        flatCoordinates[offset],
        flatCoordinates[offset + 1]
      );
      if (squaredDistance2 < minSquaredDistance) {
        for (i2 = 0; i2 < stride; ++i2) {
          closestPoint[i2] = flatCoordinates[offset + i2];
        }
        closestPoint.length = stride;
        return squaredDistance2;
      }
      return minSquaredDistance;
    }
    tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
    let index = offset + stride;
    while (index < end) {
      assignClosest(
        flatCoordinates,
        index - stride,
        index,
        stride,
        x2,
        y,
        tmpPoint
      );
      squaredDistance2 = squaredDistance(x2, y, tmpPoint[0], tmpPoint[1]);
      if (squaredDistance2 < minSquaredDistance) {
        minSquaredDistance = squaredDistance2;
        for (i2 = 0; i2 < stride; ++i2) {
          closestPoint[i2] = tmpPoint[i2];
        }
        closestPoint.length = stride;
        index += stride;
      } else {
        index += stride * Math.max(
          (Math.sqrt(squaredDistance2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0,
          1
        );
      }
    }
    if (isRing) {
      assignClosest(
        flatCoordinates,
        end - stride,
        offset,
        stride,
        x2,
        y,
        tmpPoint
      );
      squaredDistance2 = squaredDistance(x2, y, tmpPoint[0], tmpPoint[1]);
      if (squaredDistance2 < minSquaredDistance) {
        minSquaredDistance = squaredDistance2;
        for (i2 = 0; i2 < stride; ++i2) {
          closestPoint[i2] = tmpPoint[i2];
        }
        closestPoint.length = stride;
      }
    }
    return minSquaredDistance;
  }
  __name(assignClosestPoint, "assignClosestPoint");
  function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x2, y, closestPoint, minSquaredDistance, tmpPoint) {
    tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      minSquaredDistance = assignClosestPoint(
        flatCoordinates,
        offset,
        end,
        stride,
        maxDelta,
        isRing,
        x2,
        y,
        closestPoint,
        minSquaredDistance,
        tmpPoint
      );
      offset = end;
    }
    return minSquaredDistance;
  }
  __name(assignClosestArrayPoint, "assignClosestArrayPoint");
  function assignClosestMultiArrayPoint(flatCoordinates, offset, endss, stride, maxDelta, isRing, x2, y, closestPoint, minSquaredDistance, tmpPoint) {
    tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      minSquaredDistance = assignClosestArrayPoint(
        flatCoordinates,
        offset,
        ends,
        stride,
        maxDelta,
        isRing,
        x2,
        y,
        closestPoint,
        minSquaredDistance,
        tmpPoint
      );
      offset = ends[ends.length - 1];
    }
    return minSquaredDistance;
  }
  __name(assignClosestMultiArrayPoint, "assignClosestMultiArrayPoint");

  // node_modules/ol/geom/flat/simplify.js
  function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    const n = (end - offset) / stride;
    if (n < 3) {
      for (; offset < end; offset += stride) {
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
      }
      return simplifiedOffset;
    }
    const markers = new Array(n);
    markers[0] = 1;
    markers[n - 1] = 1;
    const stack = [offset, end - stride];
    let index = 0;
    while (stack.length > 0) {
      const last = stack.pop();
      const first = stack.pop();
      let maxSquaredDistance = 0;
      const x1 = flatCoordinates[first];
      const y1 = flatCoordinates[first + 1];
      const x2 = flatCoordinates[last];
      const y2 = flatCoordinates[last + 1];
      for (let i2 = first + stride; i2 < last; i2 += stride) {
        const x3 = flatCoordinates[i2];
        const y = flatCoordinates[i2 + 1];
        const squaredDistance2 = squaredSegmentDistance(x3, y, x1, y1, x2, y2);
        if (squaredDistance2 > maxSquaredDistance) {
          index = i2;
          maxSquaredDistance = squaredDistance2;
        }
      }
      if (maxSquaredDistance > squaredTolerance) {
        markers[(index - offset) / stride] = 1;
        if (first + stride < index) {
          stack.push(first, index);
        }
        if (index + stride < last) {
          stack.push(index, last);
        }
      }
    }
    for (let i2 = 0; i2 < n; ++i2) {
      if (markers[i2]) {
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i2 * stride];
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i2 * stride + 1];
      }
    }
    return simplifiedOffset;
  }
  __name(douglasPeucker, "douglasPeucker");
  function douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      simplifiedOffset = douglasPeucker(
        flatCoordinates,
        offset,
        end,
        stride,
        squaredTolerance,
        simplifiedFlatCoordinates,
        simplifiedOffset
      );
      simplifiedEnds.push(simplifiedOffset);
      offset = end;
    }
    return simplifiedOffset;
  }
  __name(douglasPeuckerArray, "douglasPeuckerArray");
  function snap(value, tolerance) {
    return tolerance * Math.round(value / tolerance);
  }
  __name(snap, "snap");
  function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    if (offset == end) {
      return simplifiedOffset;
    }
    let x1 = snap(flatCoordinates[offset], tolerance);
    let y1 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    simplifiedFlatCoordinates[simplifiedOffset++] = x1;
    simplifiedFlatCoordinates[simplifiedOffset++] = y1;
    let x2, y2;
    do {
      x2 = snap(flatCoordinates[offset], tolerance);
      y2 = snap(flatCoordinates[offset + 1], tolerance);
      offset += stride;
      if (offset == end) {
        simplifiedFlatCoordinates[simplifiedOffset++] = x2;
        simplifiedFlatCoordinates[simplifiedOffset++] = y2;
        return simplifiedOffset;
      }
    } while (x2 == x1 && y2 == y1);
    while (offset < end) {
      const x3 = snap(flatCoordinates[offset], tolerance);
      const y3 = snap(flatCoordinates[offset + 1], tolerance);
      offset += stride;
      if (x3 == x2 && y3 == y2) {
        continue;
      }
      const dx1 = x2 - x1;
      const dy1 = y2 - y1;
      const dx2 = x3 - x1;
      const dy2 = y3 - y1;
      if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
        x2 = x3;
        y2 = y3;
        continue;
      }
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      x1 = x2;
      y1 = y2;
      x2 = x3;
      y2 = y3;
    }
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    return simplifiedOffset;
  }
  __name(quantize, "quantize");
  function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      simplifiedOffset = quantize(
        flatCoordinates,
        offset,
        end,
        stride,
        tolerance,
        simplifiedFlatCoordinates,
        simplifiedOffset
      );
      simplifiedEnds.push(simplifiedOffset);
      offset = end;
    }
    return simplifiedOffset;
  }
  __name(quantizeArray, "quantizeArray");
  function quantizeMultiArray(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      const simplifiedEnds = [];
      simplifiedOffset = quantizeArray(
        flatCoordinates,
        offset,
        ends,
        stride,
        tolerance,
        simplifiedFlatCoordinates,
        simplifiedOffset,
        simplifiedEnds
      );
      simplifiedEndss.push(simplifiedEnds);
      offset = ends[ends.length - 1];
    }
    return simplifiedOffset;
  }
  __name(quantizeMultiArray, "quantizeMultiArray");

  // node_modules/ol/geom/flat/inflate.js
  function inflateCoordinates(flatCoordinates, offset, end, stride, coordinates2) {
    coordinates2 = coordinates2 !== void 0 ? coordinates2 : [];
    let i2 = 0;
    for (let j = offset; j < end; j += stride) {
      coordinates2[i2++] = flatCoordinates.slice(j, j + stride);
    }
    coordinates2.length = i2;
    return coordinates2;
  }
  __name(inflateCoordinates, "inflateCoordinates");
  function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatess) {
    coordinatess = coordinatess !== void 0 ? coordinatess : [];
    let i2 = 0;
    for (let j = 0, jj = ends.length; j < jj; ++j) {
      const end = ends[j];
      coordinatess[i2++] = inflateCoordinates(
        flatCoordinates,
        offset,
        end,
        stride,
        coordinatess[i2]
      );
      offset = end;
    }
    coordinatess.length = i2;
    return coordinatess;
  }
  __name(inflateCoordinatesArray, "inflateCoordinatesArray");
  function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, coordinatesss) {
    coordinatesss = coordinatesss !== void 0 ? coordinatesss : [];
    let i2 = 0;
    for (let j = 0, jj = endss.length; j < jj; ++j) {
      const ends = endss[j];
      coordinatesss[i2++] = ends.length === 1 && ends[0] === offset ? [] : inflateCoordinatesArray(
        flatCoordinates,
        offset,
        ends,
        stride,
        coordinatesss[i2]
      );
      offset = ends[ends.length - 1];
    }
    coordinatesss.length = i2;
    return coordinatesss;
  }
  __name(inflateMultiCoordinatesArray, "inflateMultiCoordinatesArray");

  // node_modules/ol/geom/flat/area.js
  function linearRing(flatCoordinates, offset, end, stride) {
    let twiceArea = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      const x2 = flatCoordinates[offset];
      const y2 = flatCoordinates[offset + 1];
      twiceArea += y1 * x2 - x1 * y2;
      x1 = x2;
      y1 = y2;
    }
    return twiceArea / 2;
  }
  __name(linearRing, "linearRing");
  function linearRings(flatCoordinates, offset, ends, stride) {
    let area = 0;
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      area += linearRing(flatCoordinates, offset, end, stride);
      offset = end;
    }
    return area;
  }
  __name(linearRings, "linearRings");
  function linearRingss(flatCoordinates, offset, endss, stride) {
    let area = 0;
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      area += linearRings(flatCoordinates, offset, ends, stride);
      offset = ends[ends.length - 1];
    }
    return area;
  }
  __name(linearRingss, "linearRingss");

  // node_modules/ol/geom/LinearRing.js
  var _LinearRing = class _LinearRing extends SimpleGeometry_default {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates2, layout) {
      super();
      this.maxDelta_ = -1;
      this.maxDeltaRevision_ = -1;
      if (layout !== void 0 && !Array.isArray(coordinates2[0])) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
      } else {
        this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates2,
          layout
        );
      }
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!LinearRing} Clone.
     * @api
     */
    clone() {
      return new _LinearRing(this.flatCoordinates.slice(), this.layout);
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(
          maxSquaredDelta(
            this.flatCoordinates,
            0,
            this.flatCoordinates.length,
            this.stride,
            0
          )
        );
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestPoint(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        this.maxDelta_,
        true,
        x2,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    /**
     * Return the area of the linear ring on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea() {
      return linearRing(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride
      );
    }
    /**
     * Return the coordinates of the linear ring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    getCoordinates() {
      return inflateCoordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride
      );
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LinearRing} Simplified LinearRing.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      const simplifiedFlatCoordinates = [];
      simplifiedFlatCoordinates.length = douglasPeucker(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        squaredTolerance,
        simplifiedFlatCoordinates,
        0
      );
      return new _LinearRing(simplifiedFlatCoordinates, "XY");
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "LinearRing";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return false;
    }
    /**
     * Set the coordinates of the linear ring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride
      );
      this.changed();
    }
  };
  __name(_LinearRing, "LinearRing");
  var LinearRing = _LinearRing;
  var LinearRing_default = LinearRing;

  // node_modules/ol/geom/flat/interpolate.js
  function interpolatePoint(flatCoordinates, offset, end, stride, fraction, dest, dimension) {
    let o, t;
    const n = (end - offset) / stride;
    if (n === 1) {
      o = offset;
    } else if (n === 2) {
      o = offset;
      t = fraction;
    } else if (n !== 0) {
      let x1 = flatCoordinates[offset];
      let y1 = flatCoordinates[offset + 1];
      let length = 0;
      const cumulativeLengths = [0];
      for (let i2 = offset + stride; i2 < end; i2 += stride) {
        const x2 = flatCoordinates[i2];
        const y2 = flatCoordinates[i2 + 1];
        length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        cumulativeLengths.push(length);
        x1 = x2;
        y1 = y2;
      }
      const target = fraction * length;
      const index = binarySearch(cumulativeLengths, target);
      if (index < 0) {
        t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
        o = offset + (-index - 2) * stride;
      } else {
        o = offset + index * stride;
      }
    }
    dimension = dimension > 1 ? dimension : 2;
    dest = dest ? dest : new Array(dimension);
    for (let i2 = 0; i2 < dimension; ++i2) {
      dest[i2] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i2] : lerp(flatCoordinates[o + i2], flatCoordinates[o + stride + i2], t);
    }
    return dest;
  }
  __name(interpolatePoint, "interpolatePoint");
  function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
    if (end == offset) {
      return null;
    }
    let coordinate;
    if (m < flatCoordinates[offset + stride - 1]) {
      if (extrapolate) {
        coordinate = flatCoordinates.slice(offset, offset + stride);
        coordinate[stride - 1] = m;
        return coordinate;
      }
      return null;
    }
    if (flatCoordinates[end - 1] < m) {
      if (extrapolate) {
        coordinate = flatCoordinates.slice(end - stride, end);
        coordinate[stride - 1] = m;
        return coordinate;
      }
      return null;
    }
    if (m == flatCoordinates[offset + stride - 1]) {
      return flatCoordinates.slice(offset, offset + stride);
    }
    let lo = offset / stride;
    let hi = end / stride;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      if (m < flatCoordinates[(mid + 1) * stride - 1]) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    const m0 = flatCoordinates[lo * stride - 1];
    if (m == m0) {
      return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
    }
    const m1 = flatCoordinates[(lo + 1) * stride - 1];
    const t = (m - m0) / (m1 - m0);
    coordinate = [];
    for (let i2 = 0; i2 < stride - 1; ++i2) {
      coordinate.push(
        lerp(
          flatCoordinates[(lo - 1) * stride + i2],
          flatCoordinates[lo * stride + i2],
          t
        )
      );
    }
    coordinate.push(m);
    return coordinate;
  }
  __name(lineStringCoordinateAtM, "lineStringCoordinateAtM");
  function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
    if (interpolate) {
      return lineStringCoordinateAtM(
        flatCoordinates,
        offset,
        ends[ends.length - 1],
        stride,
        m,
        extrapolate
      );
    }
    let coordinate;
    if (m < flatCoordinates[stride - 1]) {
      if (extrapolate) {
        coordinate = flatCoordinates.slice(0, stride);
        coordinate[stride - 1] = m;
        return coordinate;
      }
      return null;
    }
    if (flatCoordinates[flatCoordinates.length - 1] < m) {
      if (extrapolate) {
        coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
        coordinate[stride - 1] = m;
        return coordinate;
      }
      return null;
    }
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      if (offset == end) {
        continue;
      }
      if (m < flatCoordinates[offset + stride - 1]) {
        return null;
      }
      if (m <= flatCoordinates[end - 1]) {
        return lineStringCoordinateAtM(
          flatCoordinates,
          offset,
          end,
          stride,
          m,
          false
        );
      }
      offset = end;
    }
    return null;
  }
  __name(lineStringsCoordinateAtM, "lineStringsCoordinateAtM");

  // node_modules/ol/geom/flat/length.js
  function lineStringLength(flatCoordinates, offset, end, stride) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    let length = 0;
    for (let i2 = offset + stride; i2 < end; i2 += stride) {
      const x2 = flatCoordinates[i2];
      const y2 = flatCoordinates[i2 + 1];
      length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      x1 = x2;
      y1 = y2;
    }
    return length;
  }
  __name(lineStringLength, "lineStringLength");

  // node_modules/ol/geom/LineString.js
  var _LineString = class _LineString extends SimpleGeometry_default {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates2, layout) {
      super();
      this.flatMidpoint_ = null;
      this.flatMidpointRevision_ = -1;
      this.maxDelta_ = -1;
      this.maxDeltaRevision_ = -1;
      if (layout !== void 0 && !Array.isArray(coordinates2[0])) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
      } else {
        this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates2,
          layout
        );
      }
    }
    /**
     * Append the passed coordinate to the coordinates of the linestring.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @api
     */
    appendCoordinate(coordinate) {
      extend(this.flatCoordinates, coordinate);
      this.changed();
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!LineString} Clone.
     * @api
     */
    clone() {
      const lineString = new _LineString(
        this.flatCoordinates.slice(),
        this.layout
      );
      lineString.applyProperties(this);
      return lineString;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(
          maxSquaredDelta(
            this.flatCoordinates,
            0,
            this.flatCoordinates.length,
            this.stride,
            0
          )
        );
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestPoint(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        this.maxDelta_,
        false,
        x2,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    /**
     * Iterate over each segment, calling the provided callback.
     * If the callback returns a truthy value the function returns that
     * value immediately. Otherwise the function returns `false`.
     *
     * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
     *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
     * @return {T|boolean} Value.
     * @template T,S
     * @api
     */
    forEachSegment(callback) {
      return forEach(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        callback
      );
    }
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * @param {number} m M.
     * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate|null} Coordinate.
     * @api
     */
    getCoordinateAtM(m, extrapolate) {
      if (this.layout != "XYM" && this.layout != "XYZM") {
        return null;
      }
      extrapolate = extrapolate !== void 0 ? extrapolate : false;
      return lineStringCoordinateAtM(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        m,
        extrapolate
      );
    }
    /**
     * Return the coordinates of the linestring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    getCoordinates() {
      return inflateCoordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride
      );
    }
    /**
     * Return the coordinate at the provided fraction along the linestring.
     * The `fraction` is a number between 0 and 1, where 0 is the start of the
     * linestring and 1 is the end.
     * @param {number} fraction Fraction.
     * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
     *     be modified. If not provided, a new coordinate will be returned.
     * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
     * @api
     */
    getCoordinateAt(fraction, dest) {
      return interpolatePoint(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        fraction,
        dest,
        this.stride
      );
    }
    /**
     * Return the length of the linestring on projected plane.
     * @return {number} Length (on projected plane).
     * @api
     */
    getLength() {
      return lineStringLength(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride
      );
    }
    /**
     * @return {Array<number>} Flat midpoint.
     */
    getFlatMidpoint() {
      var _a6;
      if (this.flatMidpointRevision_ != this.getRevision()) {
        this.flatMidpoint_ = this.getCoordinateAt(
          0.5,
          (_a6 = this.flatMidpoint_) != null ? _a6 : void 0
        );
        this.flatMidpointRevision_ = this.getRevision();
      }
      return (
        /** @type {Array<number>} */
        this.flatMidpoint_
      );
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} Simplified LineString.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      const simplifiedFlatCoordinates = [];
      simplifiedFlatCoordinates.length = douglasPeucker(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        squaredTolerance,
        simplifiedFlatCoordinates,
        0
      );
      return new _LineString(simplifiedFlatCoordinates, "XY");
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "LineString";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return intersectsLineString(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        extent
      );
    }
    /**
     * Set the coordinates of the linestring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride
      );
      this.changed();
    }
  };
  __name(_LineString, "LineString");
  var LineString = _LineString;
  var LineString_default = LineString;

  // node_modules/ol/geom/MultiLineString.js
  var _MultiLineString = class _MultiLineString extends SimpleGeometry_default {
    /**
     * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
     *     Coordinates or LineString geometries. (For internal use, flat coordinates in
     *     combination with `layout` and `ends` are also accepted.)
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<number>} [ends] Flat coordinate ends for internal use.
     */
    constructor(coordinates2, layout, ends) {
      super();
      this.ends_ = [];
      this.maxDelta_ = -1;
      this.maxDeltaRevision_ = -1;
      if (Array.isArray(coordinates2[0])) {
        this.setCoordinates(
          /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
          coordinates2,
          layout
        );
      } else if (layout !== void 0 && ends) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
        this.ends_ = ends;
      } else {
        const lineStrings = (
          /** @type {Array<LineString>} */
          coordinates2
        );
        const flatCoordinates = [];
        const ends2 = [];
        for (let i2 = 0, ii = lineStrings.length; i2 < ii; ++i2) {
          const lineString = lineStrings[i2];
          extend(flatCoordinates, lineString.getFlatCoordinates());
          ends2.push(flatCoordinates.length);
        }
        const layout2 = lineStrings.length === 0 ? this.getLayout() : lineStrings[0].getLayout();
        this.setFlatCoordinates(layout2, flatCoordinates);
        this.ends_ = ends2;
      }
    }
    /**
     * Append the passed linestring to the multilinestring.
     * @param {LineString} lineString LineString.
     * @api
     */
    appendLineString(lineString) {
      extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
      this.ends_.push(this.flatCoordinates.length);
      this.changed();
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiLineString} Clone.
     * @api
     */
    clone() {
      const multiLineString = new _MultiLineString(
        this.flatCoordinates.slice(),
        this.layout,
        this.ends_.slice()
      );
      multiLineString.applyProperties(this);
      return multiLineString;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(
          arrayMaxSquaredDelta(
            this.flatCoordinates,
            0,
            this.ends_,
            this.stride,
            0
          )
        );
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestArrayPoint(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        this.maxDelta_,
        false,
        x2,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * `interpolate` controls interpolation between consecutive LineStrings
     * within the MultiLineString. If `interpolate` is `true` the coordinates
     * will be linearly interpolated between the last coordinate of one LineString
     * and the first coordinate of the next LineString.  If `interpolate` is
     * `false` then the function will return `null` for Ms falling between
     * LineStrings.
     *
     * @param {number} m M.
     * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
     * @param {boolean} [interpolate] Interpolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate|null} Coordinate.
     * @api
     */
    getCoordinateAtM(m, extrapolate, interpolate) {
      if (this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0) {
        return null;
      }
      extrapolate = extrapolate !== void 0 ? extrapolate : false;
      interpolate = interpolate !== void 0 ? interpolate : false;
      return lineStringsCoordinateAtM(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        m,
        extrapolate,
        interpolate
      );
    }
    /**
     * Return the coordinates of the multilinestring.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    getCoordinates() {
      return inflateCoordinatesArray(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride
      );
    }
    /**
     * @return {Array<number>} Ends.
     */
    getEnds() {
      return this.ends_;
    }
    /**
     * Return the linestring at the specified index.
     * @param {number} index Index.
     * @return {LineString} LineString.
     * @api
     */
    getLineString(index) {
      if (index < 0 || this.ends_.length <= index) {
        return null;
      }
      return new LineString_default(
        this.flatCoordinates.slice(
          index === 0 ? 0 : this.ends_[index - 1],
          this.ends_[index]
        ),
        this.layout
      );
    }
    /**
     * Return the linestrings of this multilinestring.
     * @return {Array<LineString>} LineStrings.
     * @api
     */
    getLineStrings() {
      const flatCoordinates = this.flatCoordinates;
      const ends = this.ends_;
      const layout = this.layout;
      const lineStrings = [];
      let offset = 0;
      for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
        const end = ends[i2];
        const lineString = new LineString_default(
          flatCoordinates.slice(offset, end),
          layout
        );
        lineStrings.push(lineString);
        offset = end;
      }
      return lineStrings;
    }
    /**
     * @return {Array<number>} Flat midpoints.
     */
    getFlatMidpoints() {
      const midpoints = [];
      const flatCoordinates = this.flatCoordinates;
      let offset = 0;
      const ends = this.ends_;
      const stride = this.stride;
      for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
        const end = ends[i2];
        const midpoint = interpolatePoint(
          flatCoordinates,
          offset,
          end,
          stride,
          0.5
        );
        extend(midpoints, midpoint);
        offset = end;
      }
      return midpoints;
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiLineString} Simplified MultiLineString.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      const simplifiedFlatCoordinates = [];
      const simplifiedEnds = [];
      simplifiedFlatCoordinates.length = douglasPeuckerArray(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        squaredTolerance,
        simplifiedFlatCoordinates,
        0,
        simplifiedEnds
      );
      return new _MultiLineString(simplifiedFlatCoordinates, "XY", simplifiedEnds);
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "MultiLineString";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return intersectsLineStringArray(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        extent
      );
    }
    /**
     * Set the coordinates of the multilinestring.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 2);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      const ends = deflateCoordinatesArray(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride,
        this.ends_
      );
      this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
      this.changed();
    }
  };
  __name(_MultiLineString, "MultiLineString");
  var MultiLineString = _MultiLineString;
  var MultiLineString_default = MultiLineString;

  // node_modules/ol/geom/Point.js
  var _Point = class _Point extends SimpleGeometry_default {
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates2, layout) {
      super();
      this.setCoordinates(coordinates2, layout);
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!Point} Clone.
     * @api
     */
    clone() {
      const point = new _Point(this.flatCoordinates.slice(), this.layout);
      point.applyProperties(this);
      return point;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      const flatCoordinates = this.flatCoordinates;
      const squaredDistance2 = squaredDistance(
        x2,
        y,
        flatCoordinates[0],
        flatCoordinates[1]
      );
      if (squaredDistance2 < minSquaredDistance) {
        const stride = this.stride;
        for (let i2 = 0; i2 < stride; ++i2) {
          closestPoint[i2] = flatCoordinates[i2];
        }
        closestPoint.length = stride;
        return squaredDistance2;
      }
      return minSquaredDistance;
    }
    /**
     * Return the coordinate of the point.
     * @return {import("../coordinate.js").Coordinate} Coordinates.
     * @api
     */
    getCoordinates() {
      return this.flatCoordinates.slice();
    }
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    computeExtent(extent) {
      return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "Point";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    }
    /**
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 0);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinate(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride
      );
      this.changed();
    }
  };
  __name(_Point, "Point");
  var Point = _Point;
  var Point_default = Point;

  // node_modules/ol/geom/MultiPoint.js
  var _MultiPoint = class _MultiPoint extends SimpleGeometry_default {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates2, layout) {
      super();
      if (layout && !Array.isArray(coordinates2[0])) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
      } else {
        this.setCoordinates(
          /** @type {Array<import("../coordinate.js").Coordinate>} */
          coordinates2,
          layout
        );
      }
    }
    /**
     * Append the passed point to this multipoint.
     * @param {Point} point Point.
     * @api
     */
    appendPoint(point) {
      extend(this.flatCoordinates, point.getFlatCoordinates());
      this.changed();
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiPoint} Clone.
     * @api
     */
    clone() {
      const multiPoint = new _MultiPoint(
        this.flatCoordinates.slice(),
        this.layout
      );
      multiPoint.applyProperties(this);
      return multiPoint;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      const flatCoordinates = this.flatCoordinates;
      const stride = this.stride;
      for (let i2 = 0, ii = flatCoordinates.length; i2 < ii; i2 += stride) {
        const squaredDistance2 = squaredDistance(
          x2,
          y,
          flatCoordinates[i2],
          flatCoordinates[i2 + 1]
        );
        if (squaredDistance2 < minSquaredDistance) {
          minSquaredDistance = squaredDistance2;
          for (let j = 0; j < stride; ++j) {
            closestPoint[j] = flatCoordinates[i2 + j];
          }
          closestPoint.length = stride;
        }
      }
      return minSquaredDistance;
    }
    /**
     * Return the coordinates of the multipoint.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    getCoordinates() {
      return inflateCoordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride
      );
    }
    /**
     * Return the point at the specified index.
     * @param {number} index Index.
     * @return {Point} Point.
     * @api
     */
    getPoint(index) {
      const n = this.flatCoordinates.length / this.stride;
      if (index < 0 || n <= index) {
        return null;
      }
      return new Point_default(
        this.flatCoordinates.slice(
          index * this.stride,
          (index + 1) * this.stride
        ),
        this.layout
      );
    }
    /**
     * Return the points of this multipoint.
     * @return {Array<Point>} Points.
     * @api
     */
    getPoints() {
      const flatCoordinates = this.flatCoordinates;
      const layout = this.layout;
      const stride = this.stride;
      const points = [];
      for (let i2 = 0, ii = flatCoordinates.length; i2 < ii; i2 += stride) {
        const point = new Point_default(flatCoordinates.slice(i2, i2 + stride), layout);
        points.push(point);
      }
      return points;
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "MultiPoint";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      const flatCoordinates = this.flatCoordinates;
      const stride = this.stride;
      for (let i2 = 0, ii = flatCoordinates.length; i2 < ii; i2 += stride) {
        const x2 = flatCoordinates[i2];
        const y = flatCoordinates[i2 + 1];
        if (containsXY(extent, x2, y)) {
          return true;
        }
      }
      return false;
    }
    /**
     * Set the coordinates of the multipoint.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride
      );
      this.changed();
    }
  };
  __name(_MultiPoint, "MultiPoint");
  var MultiPoint = _MultiPoint;
  var MultiPoint_default = MultiPoint;

  // node_modules/ol/geom/flat/interiorpoint.js
  function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, dest) {
    let i2, ii, x2, x1, x22, y1, y2;
    const y = flatCenters[flatCentersOffset + 1];
    const intersections = [];
    for (let r = 0, rr = ends.length; r < rr; ++r) {
      const end = ends[r];
      x1 = flatCoordinates[end - stride];
      y1 = flatCoordinates[end - stride + 1];
      for (i2 = offset; i2 < end; i2 += stride) {
        x22 = flatCoordinates[i2];
        y2 = flatCoordinates[i2 + 1];
        if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
          x2 = (y - y1) / (y2 - y1) * (x22 - x1) + x1;
          intersections.push(x2);
        }
        x1 = x22;
        y1 = y2;
      }
    }
    let pointX = NaN;
    let maxSegmentLength = -Infinity;
    intersections.sort(ascending);
    x1 = intersections[0];
    for (i2 = 1, ii = intersections.length; i2 < ii; ++i2) {
      x22 = intersections[i2];
      const segmentLength = Math.abs(x22 - x1);
      if (segmentLength > maxSegmentLength) {
        x2 = (x1 + x22) / 2;
        if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x2, y)) {
          pointX = x2;
          maxSegmentLength = segmentLength;
        }
      }
      x1 = x22;
    }
    if (isNaN(pointX)) {
      pointX = flatCenters[flatCentersOffset];
    }
    if (dest) {
      dest.push(pointX, y, maxSegmentLength);
      return dest;
    }
    return [pointX, y, maxSegmentLength];
  }
  __name(getInteriorPointOfArray, "getInteriorPointOfArray");
  function getInteriorPointsOfMultiArray(flatCoordinates, offset, endss, stride, flatCenters) {
    let interiorPoints = [];
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      interiorPoints = getInteriorPointOfArray(
        flatCoordinates,
        offset,
        ends,
        stride,
        flatCenters,
        2 * i2,
        interiorPoints
      );
      offset = ends[ends.length - 1];
    }
    return interiorPoints;
  }
  __name(getInteriorPointsOfMultiArray, "getInteriorPointsOfMultiArray");

  // node_modules/ol/geom/flat/reverse.js
  function coordinates(flatCoordinates, offset, end, stride) {
    while (offset < end - stride) {
      for (let i2 = 0; i2 < stride; ++i2) {
        const tmp = flatCoordinates[offset + i2];
        flatCoordinates[offset + i2] = flatCoordinates[end - stride + i2];
        flatCoordinates[end - stride + i2] = tmp;
      }
      offset += stride;
      end -= stride;
    }
  }
  __name(coordinates, "coordinates");

  // node_modules/ol/geom/flat/orient.js
  function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
    let edge = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      const x2 = flatCoordinates[offset];
      const y2 = flatCoordinates[offset + 1];
      edge += (x2 - x1) * (y2 + y1);
      x1 = x2;
      y1 = y2;
    }
    return edge === 0 ? void 0 : edge > 0;
  }
  __name(linearRingIsClockwise, "linearRingIsClockwise");
  function linearRingsAreOriented(flatCoordinates, offset, ends, stride, right) {
    right = right !== void 0 ? right : false;
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      const isClockwise = linearRingIsClockwise(
        flatCoordinates,
        offset,
        end,
        stride
      );
      if (i2 === 0) {
        if (right && isClockwise || !right && !isClockwise) {
          return false;
        }
      } else {
        if (right && !isClockwise || !right && isClockwise) {
          return false;
        }
      }
      offset = end;
    }
    return true;
  }
  __name(linearRingsAreOriented, "linearRingsAreOriented");
  function linearRingssAreOriented(flatCoordinates, offset, endss, stride, right) {
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      if (!linearRingsAreOriented(flatCoordinates, offset, ends, stride, right)) {
        return false;
      }
      if (ends.length) {
        offset = ends[ends.length - 1];
      }
    }
    return true;
  }
  __name(linearRingssAreOriented, "linearRingssAreOriented");
  function orientLinearRings(flatCoordinates, offset, ends, stride, right) {
    right = right !== void 0 ? right : false;
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      const isClockwise = linearRingIsClockwise(
        flatCoordinates,
        offset,
        end,
        stride
      );
      const reverse = i2 === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
      if (reverse) {
        coordinates(flatCoordinates, offset, end, stride);
      }
      offset = end;
    }
    return offset;
  }
  __name(orientLinearRings, "orientLinearRings");
  function orientLinearRingsArray(flatCoordinates, offset, endss, stride, right) {
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      offset = orientLinearRings(
        flatCoordinates,
        offset,
        endss[i2],
        stride,
        right
      );
    }
    return offset;
  }
  __name(orientLinearRingsArray, "orientLinearRingsArray");
  function inflateEnds(flatCoordinates, ends) {
    const endss = [];
    let offset = 0;
    let prevEndIndex = 0;
    let startOrientation;
    for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
      const end = ends[i2];
      const orientation = linearRingIsClockwise(flatCoordinates, offset, end, 2);
      if (startOrientation === void 0) {
        startOrientation = orientation;
      }
      if (orientation === startOrientation) {
        endss.push(ends.slice(prevEndIndex, i2 + 1));
      } else {
        if (endss.length === 0) {
          continue;
        }
        endss[endss.length - 1].push(ends[prevEndIndex]);
      }
      prevEndIndex = i2 + 1;
      offset = end;
    }
    return endss;
  }
  __name(inflateEnds, "inflateEnds");

  // node_modules/ol/geom/Polygon.js
  var _Polygon = class _Polygon extends SimpleGeometry_default {
    /**
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
     *     Array of linear rings that define the polygon. The first linear ring of the
     *     array defines the outer-boundary or surface of the polygon. Each subsequent
     *     linear ring defines a hole in the surface of the polygon. A linear ring is
     *     an array of vertices' coordinates where the first coordinate and the last are
     *     equivalent. (For internal use, flat coordinates in combination with
     *     `layout` and `ends` are also accepted.)
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
     */
    constructor(coordinates2, layout, ends) {
      super();
      this.ends_ = [];
      this.flatInteriorPointRevision_ = -1;
      this.flatInteriorPoint_ = null;
      this.maxDelta_ = -1;
      this.maxDeltaRevision_ = -1;
      this.orientedRevision_ = -1;
      this.orientedFlatCoordinates_ = null;
      if (layout !== void 0 && ends) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
        this.ends_ = ends;
      } else {
        this.setCoordinates(
          /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
          coordinates2,
          layout
        );
      }
    }
    /**
     * Append the passed linear ring to this polygon.
     * @param {LinearRing} linearRing Linear ring.
     * @api
     */
    appendLinearRing(linearRing2) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = linearRing2.getFlatCoordinates().slice();
      } else {
        extend(this.flatCoordinates, linearRing2.getFlatCoordinates());
      }
      this.ends_.push(this.flatCoordinates.length);
      this.changed();
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!Polygon} Clone.
     * @api
     */
    clone() {
      const polygon = new _Polygon(
        this.flatCoordinates.slice(),
        this.layout,
        this.ends_.slice()
      );
      polygon.applyProperties(this);
      return polygon;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(
          arrayMaxSquaredDelta(
            this.flatCoordinates,
            0,
            this.ends_,
            this.stride,
            0
          )
        );
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestArrayPoint(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        this.maxDelta_,
        true,
        x2,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    containsXY(x2, y) {
      return linearRingsContainsXY(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        x2,
        y
      );
    }
    /**
     * Return the area of the polygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea() {
      return linearRings(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride
      );
    }
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for polygons.
     *
     * @param {boolean} [right] Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    getCoordinates(right) {
      let flatCoordinates;
      if (right !== void 0) {
        flatCoordinates = this.getOrientedFlatCoordinates().slice();
        orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, right);
      } else {
        flatCoordinates = this.flatCoordinates;
      }
      return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
    }
    /**
     * @return {Array<number>} Ends.
     */
    getEnds() {
      return this.ends_;
    }
    /**
     * @return {Array<number>} Interior point.
     */
    getFlatInteriorPoint() {
      if (this.flatInteriorPointRevision_ != this.getRevision()) {
        const flatCenter = getCenter(this.getExtent());
        this.flatInteriorPoint_ = getInteriorPointOfArray(
          this.getOrientedFlatCoordinates(),
          0,
          this.ends_,
          this.stride,
          flatCenter,
          0
        );
        this.flatInteriorPointRevision_ = this.getRevision();
      }
      return (
        /** @type {import("../coordinate.js").Coordinate} */
        this.flatInteriorPoint_
      );
    }
    /**
     * Return an interior point of the polygon.
     * @return {Point} Interior point as XYM coordinate, where M is the
     * length of the horizontal intersection that the point belongs to.
     * @api
     */
    getInteriorPoint() {
      return new Point_default(this.getFlatInteriorPoint(), "XYM");
    }
    /**
     * Return the number of rings of the polygon,  this includes the exterior
     * ring and any interior rings.
     *
     * @return {number} Number of rings.
     * @api
     */
    getLinearRingCount() {
      return this.ends_.length;
    }
    /**
     * Return the Nth linear ring of the polygon geometry. Return `null` if the
     * given index is out of range.
     * The exterior linear ring is available at index `0` and the interior rings
     * at index `1` and beyond.
     *
     * @param {number} index Index.
     * @return {LinearRing|null} Linear ring.
     * @api
     */
    getLinearRing(index) {
      if (index < 0 || this.ends_.length <= index) {
        return null;
      }
      return new LinearRing_default(
        this.flatCoordinates.slice(
          index === 0 ? 0 : this.ends_[index - 1],
          this.ends_[index]
        ),
        this.layout
      );
    }
    /**
     * Return the linear rings of the polygon.
     * @return {Array<LinearRing>} Linear rings.
     * @api
     */
    getLinearRings() {
      const layout = this.layout;
      const flatCoordinates = this.flatCoordinates;
      const ends = this.ends_;
      const linearRings2 = [];
      let offset = 0;
      for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
        const end = ends[i2];
        const linearRing2 = new LinearRing_default(
          flatCoordinates.slice(offset, end),
          layout
        );
        linearRings2.push(linearRing2);
        offset = end;
      }
      return linearRings2;
    }
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    getOrientedFlatCoordinates() {
      if (this.orientedRevision_ != this.getRevision()) {
        const flatCoordinates = this.flatCoordinates;
        if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
          this.orientedFlatCoordinates_ = flatCoordinates;
        } else {
          this.orientedFlatCoordinates_ = flatCoordinates.slice();
          this.orientedFlatCoordinates_.length = orientLinearRings(
            this.orientedFlatCoordinates_,
            0,
            this.ends_,
            this.stride
          );
        }
        this.orientedRevision_ = this.getRevision();
      }
      return (
        /** @type {Array<number>} */
        this.orientedFlatCoordinates_
      );
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Polygon} Simplified Polygon.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      const simplifiedFlatCoordinates = [];
      const simplifiedEnds = [];
      simplifiedFlatCoordinates.length = quantizeArray(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        Math.sqrt(squaredTolerance),
        simplifiedFlatCoordinates,
        0,
        simplifiedEnds
      );
      return new _Polygon(simplifiedFlatCoordinates, "XY", simplifiedEnds);
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "Polygon";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return intersectsLinearRingArray(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        extent
      );
    }
    /**
     * Set the coordinates of the polygon.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 2);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      const ends = deflateCoordinatesArray(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride,
        this.ends_
      );
      this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
      this.changed();
    }
  };
  __name(_Polygon, "Polygon");
  var Polygon = _Polygon;
  var Polygon_default = Polygon;

  // node_modules/ol/geom/flat/center.js
  function linearRingss2(flatCoordinates, offset, endss, stride) {
    const flatCenters = [];
    let extent = createEmpty();
    for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
      const ends = endss[i2];
      extent = createOrUpdateFromFlatCoordinates(
        flatCoordinates,
        offset,
        ends[0],
        stride
      );
      flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
      offset = ends[ends.length - 1];
    }
    return flatCenters;
  }
  __name(linearRingss2, "linearRingss");

  // node_modules/ol/geom/MultiPolygon.js
  var _MultiPolygon = class _MultiPolygon extends SimpleGeometry_default {
    /**
     * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
     */
    constructor(coordinates2, layout, endss) {
      super();
      this.endss_ = [];
      this.flatInteriorPointsRevision_ = -1;
      this.flatInteriorPoints_ = null;
      this.maxDelta_ = -1;
      this.maxDeltaRevision_ = -1;
      this.orientedRevision_ = -1;
      this.orientedFlatCoordinates_ = null;
      if (!endss && !Array.isArray(coordinates2[0])) {
        const polygons = (
          /** @type {Array<Polygon>} */
          coordinates2
        );
        const flatCoordinates = [];
        const thisEndss = [];
        for (let i2 = 0, ii = polygons.length; i2 < ii; ++i2) {
          const polygon = polygons[i2];
          const offset = flatCoordinates.length;
          const ends = polygon.getEnds();
          for (let j = 0, jj = ends.length; j < jj; ++j) {
            ends[j] += offset;
          }
          extend(flatCoordinates, polygon.getFlatCoordinates());
          thisEndss.push(ends);
        }
        layout = polygons.length === 0 ? this.getLayout() : polygons[0].getLayout();
        coordinates2 = flatCoordinates;
        endss = thisEndss;
      }
      if (layout !== void 0 && endss) {
        this.setFlatCoordinates(
          layout,
          /** @type {Array<number>} */
          coordinates2
        );
        this.endss_ = endss;
      } else {
        this.setCoordinates(
          /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
          coordinates2,
          layout
        );
      }
    }
    /**
     * Append the passed polygon to this multipolygon.
     * @param {Polygon} polygon Polygon.
     * @api
     */
    appendPolygon(polygon) {
      let ends;
      if (!this.flatCoordinates) {
        this.flatCoordinates = polygon.getFlatCoordinates().slice();
        ends = polygon.getEnds().slice();
        this.endss_.push();
      } else {
        const offset = this.flatCoordinates.length;
        extend(this.flatCoordinates, polygon.getFlatCoordinates());
        ends = polygon.getEnds().slice();
        for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
          ends[i2] += offset;
        }
      }
      this.endss_.push(ends);
      this.changed();
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiPolygon} Clone.
     * @api
     */
    clone() {
      const len = this.endss_.length;
      const newEndss = new Array(len);
      for (let i2 = 0; i2 < len; ++i2) {
        newEndss[i2] = this.endss_[i2].slice();
      }
      const multiPolygon = new _MultiPolygon(
        this.flatCoordinates.slice(),
        this.layout,
        newEndss
      );
      multiPolygon.applyProperties(this);
      return multiPolygon;
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x2, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x2, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(
          multiArrayMaxSquaredDelta(
            this.flatCoordinates,
            0,
            this.endss_,
            this.stride,
            0
          )
        );
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestMultiArrayPoint(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        this.maxDelta_,
        true,
        x2,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    containsXY(x2, y) {
      return linearRingssContainsXY(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        x2,
        y
      );
    }
    /**
     * Return the area of the multipolygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea() {
      return linearRingss(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride
      );
    }
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for multi-polygons.
     *
     * @param {boolean} [right] Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
     * @api
     */
    getCoordinates(right) {
      let flatCoordinates;
      if (right !== void 0) {
        flatCoordinates = this.getOrientedFlatCoordinates().slice();
        orientLinearRingsArray(
          flatCoordinates,
          0,
          this.endss_,
          this.stride,
          right
        );
      } else {
        flatCoordinates = this.flatCoordinates;
      }
      return inflateMultiCoordinatesArray(
        flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
    }
    /**
     * @return {Array<Array<number>>} Endss.
     */
    getEndss() {
      return this.endss_;
    }
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoints() {
      if (this.flatInteriorPointsRevision_ != this.getRevision()) {
        const flatCenters = linearRingss2(
          this.flatCoordinates,
          0,
          this.endss_,
          this.stride
        );
        this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(
          this.getOrientedFlatCoordinates(),
          0,
          this.endss_,
          this.stride,
          flatCenters
        );
        this.flatInteriorPointsRevision_ = this.getRevision();
      }
      return (
        /** @type {Array<number>} */
        this.flatInteriorPoints_
      );
    }
    /**
     * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
     * @return {MultiPoint} Interior points as XYM coordinates, where M is
     * the length of the horizontal intersection that the point belongs to.
     * @api
     */
    getInteriorPoints() {
      return new MultiPoint_default(this.getFlatInteriorPoints().slice(), "XYM");
    }
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    getOrientedFlatCoordinates() {
      if (this.orientedRevision_ != this.getRevision()) {
        const flatCoordinates = this.flatCoordinates;
        if (linearRingssAreOriented(flatCoordinates, 0, this.endss_, this.stride)) {
          this.orientedFlatCoordinates_ = flatCoordinates;
        } else {
          this.orientedFlatCoordinates_ = flatCoordinates.slice();
          this.orientedFlatCoordinates_.length = orientLinearRingsArray(
            this.orientedFlatCoordinates_,
            0,
            this.endss_,
            this.stride
          );
        }
        this.orientedRevision_ = this.getRevision();
      }
      return (
        /** @type {Array<number>} */
        this.orientedFlatCoordinates_
      );
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiPolygon} Simplified MultiPolygon.
     * @protected
     */
    getSimplifiedGeometryInternal(squaredTolerance) {
      const simplifiedFlatCoordinates = [];
      const simplifiedEndss = [];
      simplifiedFlatCoordinates.length = quantizeMultiArray(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        Math.sqrt(squaredTolerance),
        simplifiedFlatCoordinates,
        0,
        simplifiedEndss
      );
      return new _MultiPolygon(simplifiedFlatCoordinates, "XY", simplifiedEndss);
    }
    /**
     * Return the polygon at the specified index.
     * @param {number} index Index.
     * @return {Polygon} Polygon.
     * @api
     */
    getPolygon(index) {
      if (index < 0 || this.endss_.length <= index) {
        return null;
      }
      let offset;
      if (index === 0) {
        offset = 0;
      } else {
        const prevEnds = this.endss_[index - 1];
        offset = prevEnds[prevEnds.length - 1];
      }
      const ends = this.endss_[index].slice();
      const end = ends[ends.length - 1];
      if (offset !== 0) {
        for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
          ends[i2] -= offset;
        }
      }
      return new Polygon_default(
        this.flatCoordinates.slice(offset, end),
        this.layout,
        ends
      );
    }
    /**
     * Return the polygons of this multipolygon.
     * @return {Array<Polygon>} Polygons.
     * @api
     */
    getPolygons() {
      const layout = this.layout;
      const flatCoordinates = this.flatCoordinates;
      const endss = this.endss_;
      const polygons = [];
      let offset = 0;
      for (let i2 = 0, ii = endss.length; i2 < ii; ++i2) {
        const ends = endss[i2].slice();
        const end = ends[ends.length - 1];
        if (offset !== 0) {
          for (let j = 0, jj = ends.length; j < jj; ++j) {
            ends[j] -= offset;
          }
        }
        const polygon = new Polygon_default(
          flatCoordinates.slice(offset, end),
          layout,
          ends
        );
        polygons.push(polygon);
        offset = end;
      }
      return polygons;
    }
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    getType() {
      return "MultiPolygon";
    }
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    intersectsExtent(extent) {
      return intersectsLinearRingMultiArray(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        extent
      );
    }
    /**
     * Set the coordinates of the multipolygon.
     * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates2, layout) {
      this.setLayout(layout, coordinates2, 3);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      const endss = deflateMultiCoordinatesArray(
        this.flatCoordinates,
        0,
        coordinates2,
        this.stride,
        this.endss_
      );
      if (endss.length === 0) {
        this.flatCoordinates.length = 0;
      } else {
        const lastEnds = endss[endss.length - 1];
        this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
      }
      this.changed();
    }
  };
  __name(_MultiPolygon, "MultiPolygon");
  var MultiPolygon = _MultiPolygon;
  var MultiPolygon_default = MultiPolygon;

  // node_modules/ol/render/Feature.js
  var tmpTransform2 = create();
  var _RenderFeature = class _RenderFeature {
    /**
     * @param {Type} type Geometry type.
     * @param {Array<number>} flatCoordinates Flat coordinates. These always need
     *     to be right-handed for polygons.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @param {Object<string, *>} properties Properties.
     * @param {number|string|undefined} id Feature id.
     */
    constructor(type, flatCoordinates, ends, stride, properties, id) {
      this.styleFunction;
      this.extent_;
      this.id_ = id;
      this.type_ = type;
      this.flatCoordinates_ = flatCoordinates;
      this.flatInteriorPoints_ = null;
      this.flatMidpoints_ = null;
      this.ends_ = ends || null;
      this.properties_ = properties;
      this.squaredTolerance_;
      this.stride_ = stride;
      this.simplifiedGeometry_;
    }
    /**
     * Get a feature property by its key.
     * @param {string} key Key
     * @return {*} Value for the requested key.
     * @api
     */
    get(key) {
      return this.properties_[key];
    }
    /**
     * Get the extent of this feature's geometry.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent() {
      if (!this.extent_) {
        this.extent_ = this.type_ === "Point" ? createOrUpdateFromCoordinate(this.flatCoordinates_) : createOrUpdateFromFlatCoordinates(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2
        );
      }
      return this.extent_;
    }
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoint() {
      if (!this.flatInteriorPoints_) {
        const flatCenter = getCenter(this.getExtent());
        this.flatInteriorPoints_ = getInteriorPointOfArray(
          this.flatCoordinates_,
          0,
          this.ends_,
          2,
          flatCenter,
          0
        );
      }
      return this.flatInteriorPoints_;
    }
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoints() {
      if (!this.flatInteriorPoints_) {
        const ends = inflateEnds(this.flatCoordinates_, this.ends_);
        const flatCenters = linearRingss2(this.flatCoordinates_, 0, ends, 2);
        this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(
          this.flatCoordinates_,
          0,
          ends,
          2,
          flatCenters
        );
      }
      return this.flatInteriorPoints_;
    }
    /**
     * @return {Array<number>} Flat midpoint.
     */
    getFlatMidpoint() {
      if (!this.flatMidpoints_) {
        this.flatMidpoints_ = interpolatePoint(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          0.5
        );
      }
      return this.flatMidpoints_;
    }
    /**
     * @return {Array<number>} Flat midpoints.
     */
    getFlatMidpoints() {
      if (!this.flatMidpoints_) {
        this.flatMidpoints_ = [];
        const flatCoordinates = this.flatCoordinates_;
        let offset = 0;
        const ends = (
          /** @type {Array<number>} */
          this.ends_
        );
        for (let i2 = 0, ii = ends.length; i2 < ii; ++i2) {
          const end = ends[i2];
          const midpoint = interpolatePoint(flatCoordinates, offset, end, 2, 0.5);
          extend(this.flatMidpoints_, midpoint);
          offset = end;
        }
      }
      return this.flatMidpoints_;
    }
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is set when reading data from a remote source.
     * @return {number|string|undefined} Id.
     * @api
     */
    getId() {
      return this.id_;
    }
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getOrientedFlatCoordinates() {
      return this.flatCoordinates_;
    }
    /**
     * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
     * determining the geometry type in style function (see {@link #getType}).
     * @return {RenderFeature} Feature.
     * @api
     */
    getGeometry() {
      return this;
    }
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {RenderFeature} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance) {
      return this;
    }
    /**
     * Get a transformed and simplified version of the geometry.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
     * @return {RenderFeature} Simplified geometry.
     */
    simplifyTransformed(squaredTolerance, transform2) {
      return this;
    }
    /**
     * Get the feature properties.
     * @return {Object<string, *>} Feature properties.
     * @api
     */
    getProperties() {
      return this.properties_;
    }
    /**
     * Get an object of all property names and values.  This has the same behavior as getProperties,
     * but is here to conform with the {@link module:ol/Feature~Feature} interface.
     * @return {Object<string, *>?} Object.
     */
    getPropertiesInternal() {
      return this.properties_;
    }
    /**
     * @return {number} Stride.
     */
    getStride() {
      return this.stride_;
    }
    /**
     * @return {import('../style/Style.js').StyleFunction|undefined} Style
     */
    getStyleFunction() {
      return this.styleFunction;
    }
    /**
     * Get the type of this feature's geometry.
     * @return {Type} Geometry type.
     * @api
     */
    getType() {
      return this.type_;
    }
    /**
     * Transform geometry coordinates from tile pixel space to projected.
     *
     * @param {import("../proj.js").ProjectionLike} projection The data projection
     */
    transform(projection) {
      projection = get3(projection);
      const pixelExtent = projection.getExtent();
      const projectedExtent = projection.getWorldExtent();
      if (pixelExtent && projectedExtent) {
        const scale3 = getHeight(projectedExtent) / getHeight(pixelExtent);
        compose(
          tmpTransform2,
          projectedExtent[0],
          projectedExtent[3],
          scale3,
          -scale3,
          0,
          0,
          0
        );
        transform2D(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          tmpTransform2,
          this.flatCoordinates_
        );
      }
    }
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     */
    applyTransform(transformFn) {
      transformFn(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
    }
    /**
     * @return {RenderFeature} A cloned render feature.
     */
    clone() {
      var _a6;
      return new _RenderFeature(
        this.type_,
        this.flatCoordinates_.slice(),
        (_a6 = this.ends_) == null ? void 0 : _a6.slice(),
        this.stride_,
        Object.assign({}, this.properties_),
        this.id_
      );
    }
    /**
     * @return {Array<number>|null} Ends.
     */
    getEnds() {
      return this.ends_;
    }
    /**
     * Add transform and resolution based geometry simplification to this instance.
     * @return {RenderFeature} This render feature.
     */
    enableSimplifyTransformed() {
      this.simplifyTransformed = memoizeOne((squaredTolerance, transform2) => {
        if (squaredTolerance === this.squaredTolerance_) {
          return this.simplifiedGeometry_;
        }
        this.simplifiedGeometry_ = this.clone();
        if (transform2) {
          this.simplifiedGeometry_.applyTransform(transform2);
        }
        const simplifiedFlatCoordinates = this.simplifiedGeometry_.getFlatCoordinates();
        let simplifiedEnds;
        switch (this.type_) {
          case "LineString":
            simplifiedFlatCoordinates.length = douglasPeucker(
              simplifiedFlatCoordinates,
              0,
              this.simplifiedGeometry_.flatCoordinates_.length,
              this.simplifiedGeometry_.stride_,
              squaredTolerance,
              simplifiedFlatCoordinates,
              0
            );
            simplifiedEnds = [simplifiedFlatCoordinates.length];
            break;
          case "MultiLineString":
            simplifiedEnds = [];
            simplifiedFlatCoordinates.length = douglasPeuckerArray(
              simplifiedFlatCoordinates,
              0,
              this.simplifiedGeometry_.ends_,
              this.simplifiedGeometry_.stride_,
              squaredTolerance,
              simplifiedFlatCoordinates,
              0,
              simplifiedEnds
            );
            break;
          case "Polygon":
            simplifiedEnds = [];
            simplifiedFlatCoordinates.length = quantizeArray(
              simplifiedFlatCoordinates,
              0,
              this.simplifiedGeometry_.ends_,
              this.simplifiedGeometry_.stride_,
              Math.sqrt(squaredTolerance),
              simplifiedFlatCoordinates,
              0,
              simplifiedEnds
            );
            break;
          default:
        }
        if (simplifiedEnds) {
          this.simplifiedGeometry_ = new _RenderFeature(
            this.type_,
            simplifiedFlatCoordinates,
            simplifiedEnds,
            2,
            this.properties_,
            this.id_
          );
        }
        this.squaredTolerance_ = squaredTolerance;
        return this.simplifiedGeometry_;
      });
      return this;
    }
  };
  __name(_RenderFeature, "RenderFeature");
  var RenderFeature = _RenderFeature;
  RenderFeature.prototype.getFlatCoordinates = RenderFeature.prototype.getOrientedFlatCoordinates;
  var Feature_default2 = RenderFeature;

  // node_modules/ol/format/Feature.js
  var _FeatureFormat = class _FeatureFormat {
    constructor() {
      this.dataProjection = void 0;
      this.defaultFeatureProjection = void 0;
      this.featureClass = /** @type {T} */
      Feature_default;
      this.supportedMediaTypes = null;
    }
    /**
     * Adds the data projection to the read options.
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Options.
     * @return {ReadOptions|undefined} Options.
     * @protected
     */
    getReadOptions(source, options) {
      if (options) {
        let dataProjection = options.dataProjection ? get3(options.dataProjection) : this.readProjection(source);
        if (options.extent && dataProjection && dataProjection.getUnits() === "tile-pixels") {
          dataProjection = get3(dataProjection);
          dataProjection.setWorldExtent(options.extent);
        }
        options = {
          dataProjection,
          featureProjection: options.featureProjection
        };
      }
      return this.adaptOptions(options);
    }
    /**
     * Sets the `dataProjection` on the options, if no `dataProjection`
     * is set.
     * @param {WriteOptions|ReadOptions|undefined} options
     *     Options.
     * @protected
     * @return {WriteOptions|ReadOptions|undefined}
     *     Updated options.
     */
    adaptOptions(options) {
      return Object.assign(
        {
          dataProjection: this.dataProjection,
          featureProjection: this.defaultFeatureProjection,
          featureClass: this.featureClass
        },
        options
      );
    }
    /**
     * @abstract
     * @return {Type} The format type.
     */
    getType() {
      return abstract();
    }
    /**
     * Read a single feature from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {import("../Feature.js").FeatureLike|Array<import("../render/Feature.js").default>} Feature.
     */
    readFeature(source, options) {
      return abstract();
    }
    /**
     * Read all features from a source.
     *
     * @abstract
     * @param {Document|Element|ArrayBuffer|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {Array<import('../Feature.js').FeatureLike|FeatureClassToFeature<T>>} Features.
     */
    readFeatures(source, options) {
      return abstract();
    }
    /**
     * Read a single geometry from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @param {ReadOptions} [options] Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    readGeometry(source, options) {
      return abstract();
    }
    /**
     * Read the projection from a source.
     *
     * @abstract
     * @param {Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default|undefined} Projection.
     */
    readProjection(source) {
      return abstract();
    }
    /**
     * Encode a feature in this format.
     *
     * @abstract
     * @param {Feature} feature Feature.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeFeature(feature, options) {
      return abstract();
    }
    /**
     * Encode an array of features in this format.
     *
     * @abstract
     * @param {Array<Feature>} features Features.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeFeatures(features, options) {
      return abstract();
    }
    /**
     * Write a single geometry in this format.
     *
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {WriteOptions} [options] Write options.
     * @return {string|ArrayBuffer} Result.
     */
    writeGeometry(geometry, options) {
      return abstract();
    }
  };
  __name(_FeatureFormat, "FeatureFormat");
  var FeatureFormat = _FeatureFormat;
  var Feature_default3 = FeatureFormat;
  function transformGeometryWithOptions(geometry, write, options) {
    const featureProjection = options ? get3(options.featureProjection) : null;
    const dataProjection = options ? get3(options.dataProjection) : null;
    let transformed = geometry;
    if (featureProjection && dataProjection && !equivalent(featureProjection, dataProjection)) {
      if (write) {
        transformed = /** @type {T} */
        geometry.clone();
      }
      const fromProjection = write ? featureProjection : dataProjection;
      const toProjection = write ? dataProjection : featureProjection;
      if (fromProjection.getUnits() === "tile-pixels") {
        transformed.transform(fromProjection, toProjection);
      } else {
        transformed.applyTransform(getTransform(fromProjection, toProjection));
      }
    }
    if (write && options && /** @type {WriteOptions} */
    options.decimals !== void 0) {
      const power = Math.pow(
        10,
        /** @type {WriteOptions} */
        options.decimals
      );
      const transform2 = /* @__PURE__ */ __name(function(coordinates2) {
        for (let i2 = 0, ii = coordinates2.length; i2 < ii; ++i2) {
          coordinates2[i2] = Math.round(coordinates2[i2] * power) / power;
        }
        return coordinates2;
      }, "transform");
      if (transformed === geometry) {
        transformed = /** @type {T} */
        geometry.clone();
      }
      transformed.applyTransform(transform2);
    }
    return transformed;
  }
  __name(transformGeometryWithOptions, "transformGeometryWithOptions");

  // node_modules/ol/format/MVT.js
  var import_pbf = __toESM(require_pbf(), 1);
  var _MVT = class _MVT extends Feature_default3 {
    /**
     * @param {Options<T>} [options] Options.
     */
    constructor(options) {
      super();
      options = options ? options : {};
      this.dataProjection = new Projection_default({
        code: "",
        units: "tile-pixels"
      });
      this.featureClass = options.featureClass ? options.featureClass : (
        /** @type {T} */
        Feature_default2
      );
      this.geometryName_ = options.geometryName;
      this.layerName_ = options.layerName ? options.layerName : "layer";
      this.layers_ = options.layers ? options.layers : null;
      this.idProperty_ = options.idProperty;
      this.supportedMediaTypes = [
        "application/vnd.mapbox-vector-tile",
        "application/x-protobuf"
      ];
    }
    /**
     * Read the raw geometry from the pbf offset stored in a raw feature's geometry
     * property.
     * @param {PBF} pbf PBF.
     * @param {Object} feature Raw feature.
     * @param {Array<number>} flatCoordinates Array to store flat coordinates in.
     * @param {Array<number>} ends Array to store ends in.
     * @private
     */
    readRawGeometry_(pbf, feature, flatCoordinates, ends) {
      pbf.pos = feature.geometry;
      const end = pbf.readVarint() + pbf.pos;
      let cmd = 1;
      let length = 0;
      let x2 = 0;
      let y = 0;
      let coordsLen = 0;
      let currentEnd = 0;
      while (pbf.pos < end) {
        if (!length) {
          const cmdLen = pbf.readVarint();
          cmd = cmdLen & 7;
          length = cmdLen >> 3;
        }
        length--;
        if (cmd === 1 || cmd === 2) {
          x2 += pbf.readSVarint();
          y += pbf.readSVarint();
          if (cmd === 1) {
            if (coordsLen > currentEnd) {
              ends.push(coordsLen);
              currentEnd = coordsLen;
            }
          }
          flatCoordinates.push(x2, y);
          coordsLen += 2;
        } else if (cmd === 7) {
          if (coordsLen > currentEnd) {
            flatCoordinates.push(
              flatCoordinates[currentEnd],
              flatCoordinates[currentEnd + 1]
            );
            coordsLen += 2;
          }
        } else {
          throw new Error("Invalid command found in the PBF");
        }
      }
      if (coordsLen > currentEnd) {
        ends.push(coordsLen);
        currentEnd = coordsLen;
      }
    }
    /**
     * @private
     * @param {PBF} pbf PBF
     * @param {Object} rawFeature Raw Mapbox feature.
     * @param {import("./Feature.js").ReadOptions} options Read options.
     * @return {import("../Feature.js").FeatureLike|null} Feature.
     */
    createFeature_(pbf, rawFeature, options) {
      const type = rawFeature.type;
      if (type === 0) {
        return null;
      }
      let feature;
      const values = rawFeature.properties;
      let id;
      if (!this.idProperty_) {
        id = rawFeature.id;
      } else {
        id = values[this.idProperty_];
        delete values[this.idProperty_];
      }
      values[this.layerName_] = rawFeature.layer.name;
      const flatCoordinates = (
        /** @type {Array<number>} */
        []
      );
      const ends = (
        /** @type {Array<number>} */
        []
      );
      this.readRawGeometry_(pbf, rawFeature, flatCoordinates, ends);
      const geometryType = getGeometryType(type, ends.length);
      if (this.featureClass === Feature_default2) {
        feature = new /** @type {typeof RenderFeature} */
        this.featureClass(
          geometryType,
          flatCoordinates,
          ends,
          2,
          values,
          id
        );
        feature.transform(options.dataProjection);
      } else {
        let geom;
        if (geometryType == "Polygon") {
          const endss = inflateEnds(flatCoordinates, ends);
          geom = endss.length > 1 ? new MultiPolygon_default(flatCoordinates, "XY", endss) : new Polygon_default(flatCoordinates, "XY", ends);
        } else {
          geom = geometryType === "Point" ? new Point_default(flatCoordinates, "XY") : geometryType === "LineString" ? new LineString_default(flatCoordinates, "XY") : geometryType === "MultiPoint" ? new MultiPoint_default(flatCoordinates, "XY") : geometryType === "MultiLineString" ? new MultiLineString_default(flatCoordinates, "XY", ends) : null;
        }
        const ctor = (
          /** @type {typeof import("../Feature.js").default} */
          this.featureClass
        );
        feature = new ctor();
        if (this.geometryName_) {
          feature.setGeometryName(this.geometryName_);
        }
        const geometry = transformGeometryWithOptions(geom, false, options);
        feature.setGeometry(geometry);
        if (id !== void 0) {
          feature.setId(id);
        }
        feature.setProperties(values, true);
      }
      return feature;
    }
    /**
     * @return {import("./Feature.js").Type} Format.
     */
    getType() {
      return "arraybuffer";
    }
    /**
     * Read all features.
     *
     * @param {ArrayBuffer} source Source.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @return {Array<import('./Feature.js').FeatureClassToFeature<T>>} Features.
     * @api
     */
    readFeatures(source, options) {
      const layers = this.layers_;
      options = this.adaptOptions(options);
      const dataProjection = get3(options.dataProjection);
      dataProjection.setWorldExtent(options.extent);
      options.dataProjection = dataProjection;
      const pbf = new import_pbf.default(
        /** @type {ArrayBuffer} */
        source
      );
      const pbfLayers = pbf.readFields(layersPBFReader, {});
      const features = [];
      for (const name in pbfLayers) {
        if (layers && !layers.includes(name)) {
          continue;
        }
        const pbfLayer = pbfLayers[name];
        const extent = pbfLayer ? [0, 0, pbfLayer.extent, pbfLayer.extent] : null;
        dataProjection.setExtent(extent);
        for (let i2 = 0, ii = pbfLayer.length; i2 < ii; ++i2) {
          const rawFeature = readRawFeature(pbf, pbfLayer, i2);
          const feature = this.createFeature_(pbf, rawFeature, options);
          if (feature !== null) {
            features.push(feature);
          }
        }
      }
      return (
        /** @type {Array<import('./Feature.js').FeatureClassToFeature<T>>} */
        features
      );
    }
    /**
     * Read the projection from the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    readProjection(source) {
      return this.dataProjection;
    }
    /**
     * Sets the layers that features will be read from.
     * @param {Array<string>} layers Layers.
     * @api
     */
    setLayers(layers) {
      this.layers_ = layers;
    }
  };
  __name(_MVT, "MVT");
  var MVT = _MVT;
  function layersPBFReader(tag, layers, pbf) {
    if (tag === 3) {
      const layer = {
        keys: [],
        values: [],
        features: []
      };
      const end = pbf.readVarint() + pbf.pos;
      pbf.readFields(layerPBFReader, layer, end);
      layer.length = layer.features.length;
      if (layer.length) {
        layers[layer.name] = layer;
      }
    }
  }
  __name(layersPBFReader, "layersPBFReader");
  function layerPBFReader(tag, layer, pbf) {
    if (tag === 15) {
      layer.version = pbf.readVarint();
    } else if (tag === 1) {
      layer.name = pbf.readString();
    } else if (tag === 5) {
      layer.extent = pbf.readVarint();
    } else if (tag === 2) {
      layer.features.push(pbf.pos);
    } else if (tag === 3) {
      layer.keys.push(pbf.readString());
    } else if (tag === 4) {
      let value = null;
      const end = pbf.readVarint() + pbf.pos;
      while (pbf.pos < end) {
        tag = pbf.readVarint() >> 3;
        value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
      }
      layer.values.push(value);
    }
  }
  __name(layerPBFReader, "layerPBFReader");
  function featurePBFReader(tag, feature, pbf) {
    if (tag == 1) {
      feature.id = pbf.readVarint();
    } else if (tag == 2) {
      const end = pbf.readVarint() + pbf.pos;
      while (pbf.pos < end) {
        const key = feature.layer.keys[pbf.readVarint()];
        const value = feature.layer.values[pbf.readVarint()];
        feature.properties[key] = value;
      }
    } else if (tag == 3) {
      feature.type = pbf.readVarint();
    } else if (tag == 4) {
      feature.geometry = pbf.pos;
    }
  }
  __name(featurePBFReader, "featurePBFReader");
  function readRawFeature(pbf, layer, i2) {
    pbf.pos = layer.features[i2];
    const end = pbf.readVarint() + pbf.pos;
    const feature = {
      layer,
      type: 0,
      properties: {}
    };
    pbf.readFields(featurePBFReader, feature, end);
    return feature;
  }
  __name(readRawFeature, "readRawFeature");
  function getGeometryType(type, numEnds) {
    let geometryType;
    if (type === 1) {
      geometryType = numEnds === 1 ? "Point" : "MultiPoint";
    } else if (type === 2) {
      geometryType = numEnds === 1 ? "LineString" : "MultiLineString";
    } else if (type === 3) {
      geometryType = "Polygon";
    }
    return geometryType;
  }
  __name(getGeometryType, "getGeometryType");
  var MVT_default = MVT;

  // node_modules/ol/VectorTile.js
  var _VectorTile = class _VectorTile extends Tile_default {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {string} src Data source url.
     * @param {import("./format/Feature.js").default<typeof import("./Feature.js").default|typeof import("./render/Feature.js").default>} format Feature format.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options} [options] Tile options.
     */
    constructor(tileCoord, state, src, format, tileLoadFunction, options) {
      super(tileCoord, state, options);
      this.extent = null;
      this.format_ = format;
      this.features_ = null;
      this.loader_;
      this.projection = null;
      this.resolution;
      this.tileLoadFunction_ = tileLoadFunction;
      this.url_ = src;
      this.key = src;
    }
    /**
     * Get the feature format assigned for reading this tile's features.
     * @return {import("./format/Feature.js").default<typeof import("./Feature.js").default|typeof import("./render/Feature.js").default>} Feature format.
     * @api
     */
    getFormat() {
      return this.format_;
    }
    /**
     * Get the features for this tile. Geometries will be in the view projection.
     * @return {Array<import("./Feature.js").FeatureLike>} Features.
     * @api
     */
    getFeatures() {
      return this.features_;
    }
    /**
     * Load not yet loaded URI.
     */
    load() {
      if (this.state == TileState_default.IDLE) {
        this.setState(TileState_default.LOADING);
        this.tileLoadFunction_(this, this.url_);
        if (this.loader_) {
          this.loader_(this.extent, this.resolution, this.projection);
        }
      }
    }
    /**
     * Handler for successful tile load.
     * @param {Array<import("./Feature.js").default>} features The loaded features.
     * @param {import("./proj/Projection.js").default} dataProjection Data projection.
     */
    onLoad(features, dataProjection) {
      this.setFeatures(features);
    }
    /**
     * Handler for tile load errors.
     */
    onError() {
      this.setState(TileState_default.ERROR);
    }
    /**
     * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
     * Sets the features for the tile.
     * @param {Array<import("./Feature.js").FeatureLike>} features Features.
     * @api
     */
    setFeatures(features) {
      this.features_ = features;
      this.setState(TileState_default.LOADED);
    }
    /**
     * Set the feature loader for reading this tile's features.
     * @param {import("./featureloader.js").FeatureLoader} loader Feature loader.
     * @api
     */
    setLoader(loader) {
      this.loader_ = loader;
    }
  };
  __name(_VectorTile, "VectorTile");
  var VectorTile = _VectorTile;
  var VectorTile_default = VectorTile;

  // node_modules/ol/tileurlfunction.js
  function createFromTemplate(template, tileGrid) {
    const zRegEx = /\{z\}/g;
    const xRegEx = /\{x\}/g;
    const yRegEx = /\{y\}/g;
    const dashYRegEx = /\{-y\}/g;
    return (
      /**
       * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
       * @param {number} pixelRatio Pixel ratio.
       * @param {import("./proj/Projection.js").default} projection Projection.
       * @return {string|undefined} Tile URL.
       */
      function(tileCoord, pixelRatio, projection) {
        if (!tileCoord) {
          return void 0;
        }
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function() {
          const z = tileCoord[0];
          const range = tileGrid.getFullTileRange(z);
          if (!range) {
            throw new Error(
              "The {-y} placeholder requires a tile grid with extent"
            );
          }
          const y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
      }
    );
  }
  __name(createFromTemplate, "createFromTemplate");
  function createFromTemplates(templates, tileGrid) {
    const len = templates.length;
    const tileUrlFunctions = new Array(len);
    for (let i2 = 0; i2 < len; ++i2) {
      tileUrlFunctions[i2] = createFromTemplate(templates[i2], tileGrid);
    }
    return createFromTileUrlFunctions(tileUrlFunctions);
  }
  __name(createFromTemplates, "createFromTemplates");
  function createFromTileUrlFunctions(tileUrlFunctions) {
    if (tileUrlFunctions.length === 1) {
      return tileUrlFunctions[0];
    }
    return (
      /**
       * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
       * @param {number} pixelRatio Pixel ratio.
       * @param {import("./proj/Projection.js").default} projection Projection.
       * @return {string|undefined} Tile URL.
       */
      function(tileCoord, pixelRatio, projection) {
        if (!tileCoord) {
          return void 0;
        }
        const h = hash(tileCoord);
        const index = modulo(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    );
  }
  __name(createFromTileUrlFunctions, "createFromTileUrlFunctions");
  function expandUrl(url) {
    const urls = [];
    let match = /\{([a-z])-([a-z])\}/.exec(url);
    if (match) {
      const startCharCode = match[1].charCodeAt(0);
      const stopCharCode = match[2].charCodeAt(0);
      let charCode;
      for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
        urls.push(url.replace(match[0], String.fromCharCode(charCode)));
      }
      return urls;
    }
    match = /\{(\d+)-(\d+)\}/.exec(url);
    if (match) {
      const stop = parseInt(match[2], 10);
      for (let i2 = parseInt(match[1], 10); i2 <= stop; i2++) {
        urls.push(url.replace(match[0], i2.toString()));
      }
      return urls;
    }
    urls.push(url);
    return urls;
  }
  __name(expandUrl, "expandUrl");

  // node_modules/ol/source/UrlTile.js
  var _UrlTile = class _UrlTile extends Tile_default2 {
    /**
     * @param {Options} options Image tile options.
     */
    constructor(options) {
      super({
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state,
        tileGrid: options.tileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        transition: options.transition,
        interpolate: options.interpolate,
        key: options.key,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      });
      this.generateTileUrlFunction_ = this.tileUrlFunction === _UrlTile.prototype.tileUrlFunction;
      this.tileLoadFunction = options.tileLoadFunction;
      if (options.tileUrlFunction) {
        this.tileUrlFunction = options.tileUrlFunction;
      }
      this.urls = null;
      if (options.urls) {
        this.setUrls(options.urls);
      } else if (options.url) {
        this.setUrl(options.url);
      }
      this.tileLoadingKeys_ = {};
    }
    /**
     * Return the tile load function of the source.
     * @return {import("../Tile.js").LoadFunction} TileLoadFunction
     * @api
     */
    getTileLoadFunction() {
      return this.tileLoadFunction;
    }
    /**
     * Return the tile URL function of the source.
     * @return {import("../Tile.js").UrlFunction} TileUrlFunction
     * @api
     */
    getTileUrlFunction() {
      return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
    }
    /**
     * Return the URLs used for this source.
     * When a tileUrlFunction is used instead of url or urls,
     * null will be returned.
     * @return {!Array<string>|null} URLs.
     * @api
     */
    getUrls() {
      return this.urls;
    }
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    handleTileChange(event) {
      const tile = (
        /** @type {import("../Tile.js").default} */
        event.target
      );
      const uid = getUid(tile);
      const tileState = tile.getState();
      let type;
      if (tileState == TileState_default.LOADING) {
        this.tileLoadingKeys_[uid] = true;
        type = TileEventType_default.TILELOADSTART;
      } else if (uid in this.tileLoadingKeys_) {
        delete this.tileLoadingKeys_[uid];
        type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
      }
      if (type != void 0) {
        this.dispatchEvent(new TileSourceEvent(type, tile));
      }
    }
    /**
     * Set the tile load function of the source.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @api
     */
    setTileLoadFunction(tileLoadFunction) {
      this.tileCache.clear();
      this.tileLoadFunction = tileLoadFunction;
      this.changed();
    }
    /**
     * Set the tile URL function of the source.
     * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
     * @param {string} [key] Optional new tile key for the source.
     * @api
     */
    setTileUrlFunction(tileUrlFunction, key) {
      this.tileUrlFunction = tileUrlFunction;
      this.tileCache.pruneExceptNewestZ();
      if (typeof key !== "undefined") {
        this.setKey(key);
      } else {
        this.changed();
      }
    }
    /**
     * Set the URL to use for requests.
     * @param {string} url URL.
     * @api
     */
    setUrl(url) {
      const urls = expandUrl(url);
      this.urls = urls;
      this.setUrls(urls);
    }
    /**
     * Set the URLs to use for requests.
     * @param {Array<string>} urls URLs.
     * @api
     */
    setUrls(urls) {
      this.urls = urls;
      const key = urls.join("\n");
      if (this.generateTileUrlFunction_) {
        this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
      } else {
        this.setKey(key);
      }
    }
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    tileUrlFunction(tileCoord, pixelRatio, projection) {
      return void 0;
    }
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     */
    useTile(z, x2, y) {
      const tileCoordKey = getKeyZXY(z, x2, y);
      if (this.tileCache.containsKey(tileCoordKey)) {
        this.tileCache.get(tileCoordKey);
      }
    }
  };
  __name(_UrlTile, "UrlTile");
  var UrlTile = _UrlTile;
  var UrlTile_default = UrlTile;

  // node_modules/ol/VectorRenderTile.js
  var canvasPool2 = [];
  var _VectorRenderTile = class _VectorRenderTile extends Tile_default {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
     * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function
     * to get source tiles for this tile.
     */
    constructor(tileCoord, state, urlTileCoord, getSourceTiles) {
      super(tileCoord, state, { transition: 0 });
      this.context_ = {};
      this.executorGroups = {};
      this.loadingSourceTiles = 0;
      this.hitDetectionImageData = {};
      this.replayState_ = {};
      this.sourceTiles = [];
      this.errorTileKeys = {};
      this.wantedResolution;
      this.getSourceTiles = getSourceTiles.bind(void 0, this);
      this.wrappedTileCoord = urlTileCoord;
    }
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {CanvasRenderingContext2D} The rendering context.
     */
    getContext(layer) {
      const key = getUid(layer);
      if (!(key in this.context_)) {
        this.context_[key] = createCanvasContext2D(1, 1, canvasPool2);
      }
      return this.context_[key];
    }
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {boolean} Tile has a rendering context for the given layer.
     */
    hasContext(layer) {
      return getUid(layer) in this.context_;
    }
    /**
     * Get the Canvas for this tile.
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {HTMLCanvasElement} Canvas.
     */
    getImage(layer) {
      return this.hasContext(layer) ? this.getContext(layer).canvas : null;
    }
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {ReplayState} The replay state.
     */
    getReplayState(layer) {
      const key = getUid(layer);
      if (!(key in this.replayState_)) {
        this.replayState_[key] = {
          dirty: false,
          renderedRenderOrder: null,
          renderedResolution: NaN,
          renderedRevision: -1,
          renderedTileResolution: NaN,
          renderedTileRevision: -1,
          renderedTileZ: -1
        };
      }
      return this.replayState_[key];
    }
    /**
     * Load the tile.
     */
    load() {
      this.getSourceTiles();
    }
    /**
     * Remove from the cache due to expiry
     */
    release() {
      for (const key in this.context_) {
        const context = this.context_[key];
        releaseCanvas(context);
        canvasPool2.push(context.canvas);
        delete this.context_[key];
      }
      super.release();
    }
  };
  __name(_VectorRenderTile, "VectorRenderTile");
  var VectorRenderTile = _VectorRenderTile;
  var VectorRenderTile_default = VectorRenderTile;

  // node_modules/ol/featureloader.js
  var withCredentials = false;
  function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      typeof url === "function" ? url(extent, resolution, projection) : url,
      true
    );
    if (format.getType() == "arraybuffer") {
      xhr.responseType = "arraybuffer";
    }
    xhr.withCredentials = withCredentials;
    xhr.onload = function(event) {
      if (!xhr.status || xhr.status >= 200 && xhr.status < 300) {
        const type = format.getType();
        try {
          let source;
          if (type == "text" || type == "json") {
            source = xhr.responseText;
          } else if (type == "xml") {
            source = xhr.responseXML || xhr.responseText;
          } else if (type == "arraybuffer") {
            source = /** @type {ArrayBuffer} */
            xhr.response;
          }
          if (source) {
            success(
              /** @type {Array<FeatureType>} */
              format.readFeatures(source, {
                extent,
                featureProjection: projection
              }),
              format.readProjection(source)
            );
          } else {
            failure();
          }
        } catch (e) {
          failure();
        }
      } else {
        failure();
      }
    };
    xhr.onerror = failure;
    xhr.send();
  }
  __name(loadFeaturesXhr, "loadFeaturesXhr");

  // node_modules/ol/source/VectorTile.js
  var _VectorTile2 = class _VectorTile2 extends UrlTile_default {
    /**
     * @param {!Options<FeatureType>} options Vector tile options.
     */
    constructor(options) {
      const projection = options.projection || "EPSG:3857";
      const extent = options.extent || extentFromProjection(projection);
      const tileGrid = options.tileGrid || createXYZ({
        extent,
        maxResolution: options.maxResolution,
        maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 22,
        minZoom: options.minZoom,
        tileSize: options.tileSize || 512
      });
      super({
        attributions: options.attributions,
        attributionsCollapsible: options.attributionsCollapsible,
        cacheSize: options.cacheSize,
        interpolate: true,
        opaque: false,
        projection,
        state: options.state,
        tileGrid,
        tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultLoadFunction,
        tileUrlFunction: options.tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX === void 0 ? true : options.wrapX,
        transition: options.transition,
        zDirection: options.zDirection === void 0 ? 1 : options.zDirection
      });
      this.format_ = options.format ? options.format : null;
      this.sourceTileCache = new TileCache_default(this.tileCache.highWaterMark);
      this.overlaps_ = options.overlaps == void 0 ? true : options.overlaps;
      this.tileClass = options.tileClass ? options.tileClass : VectorTile_default;
      this.tileGrids_ = {};
    }
    /**
     * Get features whose bounding box intersects the provided extent. Only features for cached
     * tiles for the last rendered zoom level are available in the source. So this method is only
     * suitable for requesting tiles for extents that are currently rendered.
     *
     * Features are returned in random tile order and as they are included in the tiles. This means
     * they can be clipped, duplicated across tiles, and simplified to the render resolution.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {Array<FeatureType>} Features.
     * @api
     */
    getFeaturesInExtent(extent) {
      const features = [];
      const tileCache = this.tileCache;
      if (tileCache.getCount() === 0) {
        return features;
      }
      const z = fromKey(tileCache.peekFirstKey())[0];
      const tileGrid = this.tileGrid;
      tileCache.forEach(function(tile) {
        if (tile.tileCoord[0] !== z || tile.getState() !== TileState_default.LOADED) {
          return;
        }
        const sourceTiles = tile.getSourceTiles();
        for (let i2 = 0, ii = sourceTiles.length; i2 < ii; ++i2) {
          const sourceTile = sourceTiles[i2];
          const tileCoord = sourceTile.tileCoord;
          if (intersects(extent, tileGrid.getTileCoordExtent(tileCoord))) {
            const tileFeatures = sourceTile.getFeatures();
            if (tileFeatures) {
              for (let j = 0, jj = tileFeatures.length; j < jj; ++j) {
                const candidate = tileFeatures[j];
                const geometry = candidate.getGeometry();
                if (intersects(extent, geometry.getExtent())) {
                  features.push(candidate);
                }
              }
            }
          }
        }
      });
      return features;
    }
    /**
     * @return {boolean} The source can have overlapping geometries.
     */
    getOverlaps() {
      return this.overlaps_;
    }
    /**
     * clear {@link module:ol/TileCache~TileCache} and delete all source tiles
     * @api
     */
    clear() {
      this.tileCache.clear();
      this.sourceTileCache.clear();
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    expireCache(projection, usedTiles) {
      const tileCache = this.getTileCacheForProjection(projection);
      const usedSourceTiles = Object.keys(usedTiles).reduce((acc, key) => {
        const cacheKey = getCacheKeyForTileKey(key);
        const tile = tileCache.peek(cacheKey);
        if (tile) {
          const sourceTiles = tile.sourceTiles;
          for (let i2 = 0, ii = sourceTiles.length; i2 < ii; ++i2) {
            acc[sourceTiles[i2].getKey()] = true;
          }
        }
        return acc;
      }, {});
      super.expireCache(projection, usedTiles);
      this.sourceTileCache.expireCache(usedSourceTiles);
    }
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection").default} projection Projection.
     * @param {VectorRenderTile} tile Vector image tile.
     * @return {Array<import("../VectorTile").default>} Tile keys.
     */
    getSourceTiles(pixelRatio, projection, tile) {
      if (tile.getState() === TileState_default.IDLE) {
        tile.setState(TileState_default.LOADING);
        const urlTileCoord = tile.wrappedTileCoord;
        const tileGrid = this.getTileGridForProjection(projection);
        const extent = tileGrid.getTileCoordExtent(urlTileCoord);
        const z = urlTileCoord[0];
        const resolution = tileGrid.getResolution(z);
        buffer(extent, -resolution, extent);
        const sourceTileGrid = this.tileGrid;
        const sourceExtent = sourceTileGrid.getExtent();
        if (sourceExtent) {
          getIntersection(extent, sourceExtent, extent);
        }
        const sourceZ = sourceTileGrid.getZForResolution(
          resolution,
          this.zDirection
        );
        sourceTileGrid.forEachTileCoord(extent, sourceZ, (sourceTileCoord) => {
          const tileUrl = this.tileUrlFunction(
            sourceTileCoord,
            pixelRatio,
            projection
          );
          const sourceTile = this.sourceTileCache.containsKey(tileUrl) ? this.sourceTileCache.get(tileUrl) : new this.tileClass(
            sourceTileCoord,
            tileUrl ? TileState_default.IDLE : TileState_default.EMPTY,
            tileUrl,
            this.format_,
            this.tileLoadFunction
          );
          tile.sourceTiles.push(sourceTile);
          const sourceTileState = sourceTile.getState();
          if (sourceTileState < TileState_default.LOADED) {
            const listenChange = /* @__PURE__ */ __name((event) => {
              this.handleTileChange(event);
              const state = sourceTile.getState();
              if (state === TileState_default.LOADED || state === TileState_default.ERROR) {
                const sourceTileKey = sourceTile.getKey();
                if (sourceTileKey in tile.errorTileKeys) {
                  if (sourceTile.getState() === TileState_default.LOADED) {
                    delete tile.errorTileKeys[sourceTileKey];
                  }
                } else {
                  tile.loadingSourceTiles--;
                }
                if (state === TileState_default.ERROR) {
                  tile.errorTileKeys[sourceTileKey] = true;
                } else {
                  sourceTile.removeEventListener(EventType_default.CHANGE, listenChange);
                }
                if (tile.loadingSourceTiles === 0) {
                  tile.setState(
                    isEmpty(tile.errorTileKeys) ? TileState_default.LOADED : TileState_default.ERROR
                  );
                }
              }
            }, "listenChange");
            sourceTile.addEventListener(EventType_default.CHANGE, listenChange);
            tile.loadingSourceTiles++;
          }
          if (sourceTileState === TileState_default.IDLE) {
            sourceTile.extent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
            sourceTile.projection = projection;
            sourceTile.resolution = sourceTileGrid.getResolution(
              sourceTileCoord[0]
            );
            this.sourceTileCache.set(tileUrl, sourceTile);
            sourceTile.load();
          }
        });
        if (!tile.loadingSourceTiles) {
          tile.setState(
            tile.sourceTiles.some(
              (sourceTile) => sourceTile.getState() === TileState_default.ERROR
            ) ? TileState_default.ERROR : TileState_default.LOADED
          );
        }
      }
      return tile.sourceTiles;
    }
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!VectorRenderTile} Tile.
     */
    getTile(z, x2, y, pixelRatio, projection) {
      const coordKey = getKeyZXY(z, x2, y);
      const key = this.getKey();
      let tile;
      if (this.tileCache.containsKey(coordKey)) {
        tile = this.tileCache.get(coordKey);
        if (tile.key === key) {
          return tile;
        }
      }
      const tileCoord = [z, x2, y];
      let urlTileCoord = this.getTileCoordForTileUrlFunction(
        tileCoord,
        projection
      );
      const sourceExtent = this.getTileGrid().getExtent();
      const tileGrid = this.getTileGridForProjection(projection);
      if (urlTileCoord && sourceExtent) {
        const tileExtent = tileGrid.getTileCoordExtent(urlTileCoord);
        buffer(tileExtent, -tileGrid.getResolution(z), tileExtent);
        if (!intersects(sourceExtent, tileExtent)) {
          urlTileCoord = null;
        }
      }
      let empty = true;
      if (urlTileCoord !== null) {
        const sourceTileGrid = this.tileGrid;
        const resolution = tileGrid.getResolution(z);
        const sourceZ = sourceTileGrid.getZForResolution(resolution, 1);
        const extent = tileGrid.getTileCoordExtent(urlTileCoord);
        buffer(extent, -resolution, extent);
        sourceTileGrid.forEachTileCoord(extent, sourceZ, (sourceTileCoord) => {
          empty = empty && !this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
        });
      }
      const newTile = new VectorRenderTile_default(
        tileCoord,
        empty ? TileState_default.EMPTY : TileState_default.IDLE,
        urlTileCoord,
        this.getSourceTiles.bind(this, pixelRatio, projection)
      );
      newTile.key = key;
      if (tile) {
        newTile.interimTile = tile;
        newTile.refreshInterimChain();
        this.tileCache.replace(coordKey, newTile);
      } else {
        this.tileCache.set(coordKey, newTile);
      }
      return newTile;
    }
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    getTileGridForProjection(projection) {
      const code = projection.getCode();
      let tileGrid = this.tileGrids_[code];
      if (!tileGrid) {
        const sourceTileGrid = this.tileGrid;
        const resolutions = sourceTileGrid.getResolutions().slice();
        const origins = resolutions.map(function(resolution, z) {
          return sourceTileGrid.getOrigin(z);
        });
        const tileSizes = resolutions.map(function(resolution, z) {
          return sourceTileGrid.getTileSize(z);
        });
        const length = DEFAULT_MAX_ZOOM + 1;
        for (let z = resolutions.length; z < length; ++z) {
          resolutions.push(resolutions[z - 1] / 2);
          origins.push(origins[z - 1]);
          tileSizes.push(tileSizes[z - 1]);
        }
        tileGrid = new TileGrid_default({
          extent: sourceTileGrid.getExtent(),
          origins,
          resolutions,
          tileSizes
        });
        this.tileGrids_[code] = tileGrid;
      }
      return tileGrid;
    }
    /**
     * Get the tile pixel ratio for this source.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Tile pixel ratio.
     */
    getTilePixelRatio(pixelRatio) {
      return pixelRatio;
    }
    /**
     * @param {number} z Z.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../size.js").Size} Tile size.
     */
    getTilePixelSize(z, pixelRatio, projection) {
      const tileGrid = this.getTileGridForProjection(projection);
      const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
      return [
        Math.round(tileSize[0] * pixelRatio),
        Math.round(tileSize[1] * pixelRatio)
      ];
    }
    /**
     * Increases the cache size if needed
     * @param {number} tileCount Minimum number of tiles needed.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    updateCacheSize(tileCount, projection) {
      super.updateCacheSize(tileCount * 2, projection);
      this.sourceTileCache.highWaterMark = this.getTileCacheForProjection(projection).highWaterMark;
    }
  };
  __name(_VectorTile2, "VectorTile");
  var VectorTile2 = _VectorTile2;
  var VectorTile_default2 = VectorTile2;
  function defaultLoadFunction(tile, url) {
    tile.setLoader(
      /**
       * @param {import("../extent.js").Extent} extent Extent.
       * @param {number} resolution Resolution.
       * @param {import("../proj/Projection.js").default} projection Projection.
       */
      function(extent, resolution, projection) {
        loadFeaturesXhr(
          url,
          tile.getFormat(),
          extent,
          resolution,
          projection,
          tile.onLoad.bind(tile),
          tile.onError.bind(tile)
        );
      }
    );
  }
  __name(defaultLoadFunction, "defaultLoadFunction");

  // node_modules/pmtiles/dist/index.js
  var __pow = Math.pow;
  var __async2 = /* @__PURE__ */ __name((__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = /* @__PURE__ */ __name((value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }, "fulfilled");
      var rejected = /* @__PURE__ */ __name((value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }, "rejected");
      var step = /* @__PURE__ */ __name((x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected), "step");
      step((generator = generator.apply(__this, __arguments)).next());
    });
  }, "__async");
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = /* @__PURE__ */ __name(function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  }, "freb");
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = /* @__PURE__ */ __name(function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  }, "hMap");
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = /* @__PURE__ */ __name(function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  }, "max");
  var bits = /* @__PURE__ */ __name(function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  }, "bits");
  var bits16 = /* @__PURE__ */ __name(function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  }, "bits16");
  var shft = /* @__PURE__ */ __name(function(p) {
    return (p + 7) / 8 | 0;
  }, "shft");
  var slc = /* @__PURE__ */ __name(function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    var n = new u8(e - s);
    n.set(v.subarray(s, e));
    return n;
  }, "slc");
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = /* @__PURE__ */ __name(function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  }, "err");
  var inflt = /* @__PURE__ */ __name(function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf || st.i != 2;
    var noSt = st.i;
    if (!buf)
      buf = new u8(sl * 3);
    var cbuf = /* @__PURE__ */ __name(function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    }, "cbuf");
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (noBuf)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add3 = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add3 = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + 131072);
          var end = bt + add3;
          if (bt < dt) {
            var shift2 = dl - dt, dend = Math.min(dt, end);
            if (shift2 + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift2 + bt];
          }
          for (; bt < end; bt += 4) {
            buf[bt] = buf[bt - dt];
            buf[bt + 1] = buf[bt + 1 - dt];
            buf[bt + 2] = buf[bt + 2 - dt];
            buf[bt + 3] = buf[bt + 3 - dt];
          }
          bt = end;
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
  }, "inflt");
  var et = /* @__PURE__ */ new u8(0);
  var gzs = /* @__PURE__ */ __name(function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  }, "gzs");
  var gzl = /* @__PURE__ */ __name(function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
  }, "gzl");
  var zls = /* @__PURE__ */ __name(function(d, dict) {
    if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
      err(6, "invalid zlib data");
    if ((d[1] >> 5 & 1) == +!dict)
      err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
    return (d[1] >> 3 & 4) + 2;
  }, "zls");
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  __name(inflateSync, "inflateSync");
  function gunzipSync(data, opts) {
    var st = gzs(data);
    if (st + 8 > data.length)
      err(6, "invalid gzip data");
    return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
  }
  __name(gunzipSync, "gunzipSync");
  function unzlibSync(data, opts) {
    return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  __name(unzlibSync, "unzlibSync");
  function decompressSync(data, opts) {
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
  }
  __name(decompressSync, "decompressSync");
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  var shift = /* @__PURE__ */ __name((n, shift2) => {
    return n * __pow(2, shift2);
  }, "shift");
  var unshift = /* @__PURE__ */ __name((n, shift2) => {
    return Math.floor(n / __pow(2, shift2));
  }, "unshift");
  var getUint24 = /* @__PURE__ */ __name((view, pos) => {
    return shift(view.getUint16(pos + 1, true), 8) + view.getUint8(pos);
  }, "getUint24");
  var getUint48 = /* @__PURE__ */ __name((view, pos) => {
    return shift(view.getUint32(pos + 2, true), 16) + view.getUint16(pos, true);
  }, "getUint48");
  var compare = /* @__PURE__ */ __name((tz, tx, ty, view, i2) => {
    if (tz !== view.getUint8(i2))
      return tz - view.getUint8(i2);
    const x2 = getUint24(view, i2 + 1);
    if (tx !== x2)
      return tx - x2;
    const y = getUint24(view, i2 + 4);
    if (ty !== y)
      return ty - y;
    return 0;
  }, "compare");
  var queryLeafdir = /* @__PURE__ */ __name((view, z, x2, y) => {
    const offsetLen = queryView(view, z | 128, x2, y);
    if (offsetLen) {
      return {
        z,
        x: x2,
        y,
        offset: offsetLen[0],
        length: offsetLen[1],
        isDir: true
      };
    }
    return null;
  }, "queryLeafdir");
  var queryTile = /* @__PURE__ */ __name((view, z, x2, y) => {
    const offsetLen = queryView(view, z, x2, y);
    if (offsetLen) {
      return {
        z,
        x: x2,
        y,
        offset: offsetLen[0],
        length: offsetLen[1],
        isDir: false
      };
    }
    return null;
  }, "queryTile");
  var queryView = /* @__PURE__ */ __name((view, z, x2, y) => {
    let m = 0;
    let n = view.byteLength / 17 - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = compare(z, x2, y, view, k * 17);
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return [getUint48(view, k * 17 + 7), view.getUint32(k * 17 + 13, true)];
      }
    }
    return null;
  }, "queryView");
  var entrySort = /* @__PURE__ */ __name((a, b) => {
    if (a.isDir && !b.isDir) {
      return 1;
    }
    if (!a.isDir && b.isDir) {
      return -1;
    }
    if (a.z !== b.z) {
      return a.z - b.z;
    }
    if (a.x !== b.x) {
      return a.x - b.x;
    }
    return a.y - b.y;
  }, "entrySort");
  var parseEntry = /* @__PURE__ */ __name((dataview, i2) => {
    const zRaw = dataview.getUint8(i2 * 17);
    const z = zRaw & 127;
    return {
      z,
      x: getUint24(dataview, i2 * 17 + 1),
      y: getUint24(dataview, i2 * 17 + 4),
      offset: getUint48(dataview, i2 * 17 + 7),
      length: dataview.getUint32(i2 * 17 + 13, true),
      isDir: zRaw >> 7 === 1
    };
  }, "parseEntry");
  var sortDir = /* @__PURE__ */ __name((a) => {
    const entries = [];
    const view = new DataView(a);
    for (let i2 = 0; i2 < view.byteLength / 17; i2++) {
      entries.push(parseEntry(view, i2));
    }
    return createDirectory(entries);
  }, "sortDir");
  var createDirectory = /* @__PURE__ */ __name((entries) => {
    entries.sort(entrySort);
    const buffer2 = new ArrayBuffer(17 * entries.length);
    const arr = new Uint8Array(buffer2);
    for (let i2 = 0; i2 < entries.length; i2++) {
      const entry = entries[i2];
      let z = entry.z;
      if (entry.isDir)
        z = z | 128;
      arr[i2 * 17] = z;
      arr[i2 * 17 + 1] = entry.x & 255;
      arr[i2 * 17 + 2] = entry.x >> 8 & 255;
      arr[i2 * 17 + 3] = entry.x >> 16 & 255;
      arr[i2 * 17 + 4] = entry.y & 255;
      arr[i2 * 17 + 5] = entry.y >> 8 & 255;
      arr[i2 * 17 + 6] = entry.y >> 16 & 255;
      arr[i2 * 17 + 7] = entry.offset & 255;
      arr[i2 * 17 + 8] = unshift(entry.offset, 8) & 255;
      arr[i2 * 17 + 9] = unshift(entry.offset, 16) & 255;
      arr[i2 * 17 + 10] = unshift(entry.offset, 24) & 255;
      arr[i2 * 17 + 11] = unshift(entry.offset, 32) & 255;
      arr[i2 * 17 + 12] = unshift(entry.offset, 48) & 255;
      arr[i2 * 17 + 13] = entry.length & 255;
      arr[i2 * 17 + 14] = entry.length >> 8 & 255;
      arr[i2 * 17 + 15] = entry.length >> 16 & 255;
      arr[i2 * 17 + 16] = entry.length >> 24 & 255;
    }
    return buffer2;
  }, "createDirectory");
  var deriveLeaf = /* @__PURE__ */ __name((view, tile) => {
    if (view.byteLength < 17)
      return null;
    const numEntries = view.byteLength / 17;
    const entry = parseEntry(view, numEntries - 1);
    if (entry.isDir) {
      const leafLevel = entry.z;
      const levelDiff = tile.z - leafLevel;
      const leafX = Math.trunc(tile.x / (1 << levelDiff));
      const leafY = Math.trunc(tile.y / (1 << levelDiff));
      return { z: leafLevel, x: leafX, y: leafY };
    }
    return null;
  }, "deriveLeaf");
  function getHeader(source) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(0, 512e3);
      const dataview = new DataView(resp.data);
      const jsonSize = dataview.getUint32(4, true);
      const rootEntries = dataview.getUint16(8, true);
      const dec = new TextDecoder("utf-8");
      const jsonMetadata = JSON.parse(
        dec.decode(new DataView(resp.data, 10, jsonSize))
      );
      let tileCompression = 0;
      if (jsonMetadata.compression === "gzip") {
        tileCompression = 2;
      }
      let minzoom = 0;
      if ("minzoom" in jsonMetadata) {
        minzoom = +jsonMetadata.minzoom;
      }
      let maxzoom = 0;
      if ("maxzoom" in jsonMetadata) {
        maxzoom = +jsonMetadata.maxzoom;
      }
      let centerLon = 0;
      let centerLat = 0;
      let centerZoom = 0;
      let minLon = -180;
      let minLat = -85;
      let maxLon = 180;
      let maxLat = 85;
      if (jsonMetadata.bounds) {
        const split = jsonMetadata.bounds.split(",");
        minLon = +split[0];
        minLat = +split[1];
        maxLon = +split[2];
        maxLat = +split[3];
      }
      if (jsonMetadata.center) {
        const split = jsonMetadata.center.split(",");
        centerLon = +split[0];
        centerLat = +split[1];
        centerZoom = +split[2];
      }
      const header = {
        specVersion: dataview.getUint16(2, true),
        rootDirectoryOffset: 10 + jsonSize,
        rootDirectoryLength: rootEntries * 17,
        jsonMetadataOffset: 10,
        jsonMetadataLength: jsonSize,
        leafDirectoryOffset: 0,
        leafDirectoryLength: void 0,
        tileDataOffset: 0,
        tileDataLength: void 0,
        numAddressedTiles: 0,
        numTileEntries: 0,
        numTileContents: 0,
        clustered: false,
        internalCompression: 1,
        tileCompression,
        tileType: 1,
        minZoom: minzoom,
        maxZoom: maxzoom,
        minLon,
        minLat,
        maxLon,
        maxLat,
        centerZoom,
        centerLon,
        centerLat,
        etag: resp.etag
      };
      return header;
    });
  }
  __name(getHeader, "getHeader");
  function getZxy(header, source, cache2, z, x2, y, signal) {
    return __async2(this, null, function* () {
      let rootDir = yield cache2.getArrayBuffer(
        source,
        header.rootDirectoryOffset,
        header.rootDirectoryLength,
        header
      );
      if (header.specVersion === 1) {
        rootDir = sortDir(rootDir);
      }
      const entry = queryTile(new DataView(rootDir), z, x2, y);
      if (entry) {
        const resp = yield source.getBytes(entry.offset, entry.length, signal);
        let tileData = resp.data;
        const view = new DataView(tileData);
        if (view.getUint8(0) === 31 && view.getUint8(1) === 139) {
          tileData = decompressSync(new Uint8Array(tileData));
        }
        return {
          data: tileData
        };
      }
      const leafcoords = deriveLeaf(new DataView(rootDir), { z, x: x2, y });
      if (leafcoords) {
        const leafdirEntry = queryLeafdir(
          new DataView(rootDir),
          leafcoords.z,
          leafcoords.x,
          leafcoords.y
        );
        if (leafdirEntry) {
          let leafDir = yield cache2.getArrayBuffer(
            source,
            leafdirEntry.offset,
            leafdirEntry.length,
            header
          );
          if (header.specVersion === 1) {
            leafDir = sortDir(leafDir);
          }
          const tileEntry = queryTile(new DataView(leafDir), z, x2, y);
          if (tileEntry) {
            const resp = yield source.getBytes(
              tileEntry.offset,
              tileEntry.length,
              signal
            );
            let tileData = resp.data;
            const view = new DataView(tileData);
            if (view.getUint8(0) === 31 && view.getUint8(1) === 139) {
              tileData = decompressSync(new Uint8Array(tileData));
            }
            return {
              data: tileData
            };
          }
        }
      }
      return void 0;
    });
  }
  __name(getZxy, "getZxy");
  var v2_default = {
    getHeader,
    getZxy
  };
  function toNum(low, high) {
    return (high >>> 0) * 4294967296 + (low >>> 0);
  }
  __name(toNum, "toNum");
  function readVarintRemainder(l, p) {
    const buf = p.buf;
    let b = buf[p.pos++];
    let h = (b & 112) >> 4;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 3;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 10;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 17;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 24;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 1) << 31;
    if (b < 128)
      return toNum(l, h);
    throw new Error("Expected varint not more than 10 bytes");
  }
  __name(readVarintRemainder, "readVarintRemainder");
  function readVarint(p) {
    const buf = p.buf;
    let b = buf[p.pos++];
    let val = b & 127;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 7;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 14;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 21;
    if (b < 128)
      return val;
    b = buf[p.pos];
    val |= (b & 15) << 28;
    return readVarintRemainder(val, p);
  }
  __name(readVarint, "readVarint");
  function rotate2(n, xy, rx, ry) {
    if (ry === 0) {
      if (rx === 1) {
        xy[0] = n - 1 - xy[0];
        xy[1] = n - 1 - xy[1];
      }
      const t = xy[0];
      xy[0] = xy[1];
      xy[1] = t;
    }
  }
  __name(rotate2, "rotate");
  var tzValues = [
    0,
    1,
    5,
    21,
    85,
    341,
    1365,
    5461,
    21845,
    87381,
    349525,
    1398101,
    5592405,
    22369621,
    89478485,
    357913941,
    1431655765,
    5726623061,
    22906492245,
    91625968981,
    366503875925,
    1466015503701,
    5864062014805,
    23456248059221,
    93824992236885,
    375299968947541,
    1501199875790165
  ];
  function zxyToTileId(z, x2, y) {
    if (z > 26) {
      throw Error("Tile zoom level exceeds max safe number limit (26)");
    }
    if (x2 > __pow(2, z) - 1 || y > __pow(2, z) - 1) {
      throw Error("tile x/y outside zoom level bounds");
    }
    const acc = tzValues[z];
    const n = __pow(2, z);
    let rx = 0;
    let ry = 0;
    let d = 0;
    const xy = [x2, y];
    let s = n / 2;
    while (s > 0) {
      rx = (xy[0] & s) > 0 ? 1 : 0;
      ry = (xy[1] & s) > 0 ? 1 : 0;
      d += s * s * (3 * rx ^ ry);
      rotate2(s, xy, rx, ry);
      s = s / 2;
    }
    return acc + d;
  }
  __name(zxyToTileId, "zxyToTileId");
  function defaultDecompress(buf, compression) {
    return __async2(this, null, function* () {
      if (compression === 1 || compression === 0) {
        return buf;
      }
      if (compression === 2) {
        if (typeof globalThis.DecompressionStream === "undefined") {
          return decompressSync(new Uint8Array(buf));
        }
        const stream = new Response(buf).body;
        if (!stream) {
          throw Error("Failed to read response stream");
        }
        const result = stream.pipeThrough(
          // biome-ignore lint: needed to detect DecompressionStream in browser+node+cloudflare workers
          new globalThis.DecompressionStream("gzip")
        );
        return new Response(result).arrayBuffer();
      }
      throw Error("Compression method not supported");
    });
  }
  __name(defaultDecompress, "defaultDecompress");
  function tileTypeExt(t) {
    if (t === 1)
      return ".mvt";
    if (t === 2)
      return ".png";
    if (t === 3)
      return ".jpg";
    if (t === 4)
      return ".webp";
    if (t === 5)
      return ".avif";
    return "";
  }
  __name(tileTypeExt, "tileTypeExt");
  var HEADER_SIZE_BYTES = 127;
  function findTile(entries, tileId) {
    let m = 0;
    let n = entries.length - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = tileId - entries[k].tileId;
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return entries[k];
      }
    }
    if (n >= 0) {
      if (entries[n].runLength === 0) {
        return entries[n];
      }
      if (tileId - entries[n].tileId < entries[n].runLength) {
        return entries[n];
      }
    }
    return null;
  }
  __name(findTile, "findTile");
  var _a2;
  var FetchSource = (_a2 = class {
    constructor(url, customHeaders = new Headers()) {
      this.url = url;
      this.customHeaders = customHeaders;
      this.mustReload = false;
      let userAgent = "";
      if ("navigator" in globalThis) {
        userAgent = globalThis.navigator.userAgent || "";
      }
      const isWindows = userAgent.indexOf("Windows") > -1;
      const isChromiumBased = /Chrome|Chromium|Edg|OPR|Brave/.test(userAgent);
      this.chromeWindowsNoCache = false;
      if (isWindows && isChromiumBased) {
        this.chromeWindowsNoCache = true;
      }
    }
    getKey() {
      return this.url;
    }
    /**
     * Mutate the custom [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) set for all requests to the remote archive.
     */
    setHeaders(customHeaders) {
      this.customHeaders = customHeaders;
    }
    getBytes(offset, length, passedSignal, etag) {
      return __async2(this, null, function* () {
        let controller;
        let signal;
        if (passedSignal) {
          signal = passedSignal;
        } else {
          controller = new AbortController();
          signal = controller.signal;
        }
        const requestHeaders = new Headers(this.customHeaders);
        requestHeaders.set("range", `bytes=${offset}-${offset + length - 1}`);
        let cache2;
        if (this.mustReload) {
          cache2 = "reload";
        } else if (this.chromeWindowsNoCache) {
          cache2 = "no-store";
        }
        let resp = yield fetch(this.url, {
          signal,
          cache: cache2,
          headers: requestHeaders
          //biome-ignore lint: "cache" is incompatible between cloudflare workers and browser
        });
        if (offset === 0 && resp.status === 416) {
          const contentRange = resp.headers.get("Content-Range");
          if (!contentRange || !contentRange.startsWith("bytes */")) {
            throw Error("Missing content-length on 416 response");
          }
          const actualLength = +contentRange.substr(8);
          resp = yield fetch(this.url, {
            signal,
            cache: "reload",
            headers: { range: `bytes=0-${actualLength - 1}` }
            //biome-ignore lint: "cache" is incompatible between cloudflare workers and browser
          });
        }
        let newEtag = resp.headers.get("Etag");
        if (newEtag == null ? void 0 : newEtag.startsWith("W/")) {
          newEtag = null;
        }
        if (resp.status === 416 || etag && newEtag && newEtag !== etag) {
          this.mustReload = true;
          throw new EtagMismatch(
            `Server returned non-matching ETag ${etag} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`
          );
        }
        if (resp.status >= 300) {
          throw Error(`Bad response code: ${resp.status}`);
        }
        const contentLength = resp.headers.get("Content-Length");
        if (resp.status === 200 && (!contentLength || +contentLength > length)) {
          if (controller)
            controller.abort();
          throw Error(
            "Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving."
          );
        }
        const a = yield resp.arrayBuffer();
        return {
          data: a,
          etag: newEtag || void 0,
          cacheControl: resp.headers.get("Cache-Control") || void 0,
          expires: resp.headers.get("Expires") || void 0
        };
      });
    }
  }, __name(_a2, "FetchSource"), _a2);
  function getUint64(v, offset) {
    const wh = v.getUint32(offset + 4, true);
    const wl = v.getUint32(offset + 0, true);
    return wh * __pow(2, 32) + wl;
  }
  __name(getUint64, "getUint64");
  function bytesToHeader(bytes, etag) {
    const v = new DataView(bytes);
    const specVersion = v.getUint8(7);
    if (specVersion > 3) {
      throw Error(
        `Archive is spec version ${specVersion} but this library supports up to spec version 3`
      );
    }
    return {
      specVersion,
      rootDirectoryOffset: getUint64(v, 8),
      rootDirectoryLength: getUint64(v, 16),
      jsonMetadataOffset: getUint64(v, 24),
      jsonMetadataLength: getUint64(v, 32),
      leafDirectoryOffset: getUint64(v, 40),
      leafDirectoryLength: getUint64(v, 48),
      tileDataOffset: getUint64(v, 56),
      tileDataLength: getUint64(v, 64),
      numAddressedTiles: getUint64(v, 72),
      numTileEntries: getUint64(v, 80),
      numTileContents: getUint64(v, 88),
      clustered: v.getUint8(96) === 1,
      internalCompression: v.getUint8(97),
      tileCompression: v.getUint8(98),
      tileType: v.getUint8(99),
      minZoom: v.getUint8(100),
      maxZoom: v.getUint8(101),
      minLon: v.getInt32(102, true) / 1e7,
      minLat: v.getInt32(106, true) / 1e7,
      maxLon: v.getInt32(110, true) / 1e7,
      maxLat: v.getInt32(114, true) / 1e7,
      centerZoom: v.getUint8(118),
      centerLon: v.getInt32(119, true) / 1e7,
      centerLat: v.getInt32(123, true) / 1e7,
      etag
    };
  }
  __name(bytesToHeader, "bytesToHeader");
  function deserializeIndex(buffer2) {
    const p = { buf: new Uint8Array(buffer2), pos: 0 };
    const numEntries = readVarint(p);
    const entries = [];
    let lastId = 0;
    for (let i2 = 0; i2 < numEntries; i2++) {
      const v = readVarint(p);
      entries.push({ tileId: lastId + v, offset: 0, length: 0, runLength: 1 });
      lastId += v;
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      entries[i2].runLength = readVarint(p);
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      entries[i2].length = readVarint(p);
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      const v = readVarint(p);
      if (v === 0 && i2 > 0) {
        entries[i2].offset = entries[i2 - 1].offset + entries[i2 - 1].length;
      } else {
        entries[i2].offset = v - 1;
      }
    }
    return entries;
  }
  __name(deserializeIndex, "deserializeIndex");
  function detectVersion(a) {
    const v = new DataView(a);
    if (v.getUint16(2, true) === 2) {
      console.warn(
        "PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
      );
      return 2;
    }
    if (v.getUint16(2, true) === 1) {
      console.warn(
        "PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
      );
      return 1;
    }
    return 3;
  }
  __name(detectVersion, "detectVersion");
  var _a3;
  var EtagMismatch = (_a3 = class extends Error {
  }, __name(_a3, "EtagMismatch"), _a3);
  function getHeaderAndRoot(source, decompress) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(0, 16384);
      const v = new DataView(resp.data);
      if (v.getUint16(0, true) !== 19792) {
        throw new Error("Wrong magic number for PMTiles archive");
      }
      if (detectVersion(resp.data) < 3) {
        return [yield v2_default.getHeader(source)];
      }
      const headerData = resp.data.slice(0, HEADER_SIZE_BYTES);
      const header = bytesToHeader(headerData, resp.etag);
      const rootDirData = resp.data.slice(
        header.rootDirectoryOffset,
        header.rootDirectoryOffset + header.rootDirectoryLength
      );
      const dirKey = `${source.getKey()}|${header.etag || ""}|${header.rootDirectoryOffset}|${header.rootDirectoryLength}`;
      const rootDir = deserializeIndex(
        yield decompress(rootDirData, header.internalCompression)
      );
      return [header, [dirKey, rootDir.length, rootDir]];
    });
  }
  __name(getHeaderAndRoot, "getHeaderAndRoot");
  function getDirectory(source, decompress, offset, length, header) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(offset, length, void 0, header.etag);
      const data = yield decompress(resp.data, header.internalCompression);
      const directory = deserializeIndex(data);
      if (directory.length === 0) {
        throw new Error("Empty directory is invalid");
      }
      return directory;
    });
  }
  __name(getDirectory, "getDirectory");
  var _a4;
  var SharedPromiseCache = (_a4 = class {
    constructor(maxCacheEntries = 100, prefetch = true, decompress = defaultDecompress) {
      this.cache = /* @__PURE__ */ new Map();
      this.invalidations = /* @__PURE__ */ new Map();
      this.maxCacheEntries = maxCacheEntries;
      this.counter = 1;
      this.decompress = decompress;
    }
    getHeader(source) {
      return __async2(this, null, function* () {
        const cacheKey = source.getKey();
        const cacheValue = this.cache.get(cacheKey);
        if (cacheValue) {
          cacheValue.lastUsed = this.counter++;
          const data = yield cacheValue.data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          getHeaderAndRoot(source, this.decompress).then((res) => {
            if (res[1]) {
              this.cache.set(res[1][0], {
                lastUsed: this.counter++,
                data: Promise.resolve(res[1][2])
              });
            }
            resolve(res[0]);
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    getDirectory(source, offset, length, header) {
      return __async2(this, null, function* () {
        const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
        const cacheValue = this.cache.get(cacheKey);
        if (cacheValue) {
          cacheValue.lastUsed = this.counter++;
          const data = yield cacheValue.data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          getDirectory(source, this.decompress, offset, length, header).then((directory) => {
            resolve(directory);
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    // for v2 backwards compatibility
    getArrayBuffer(source, offset, length, header) {
      return __async2(this, null, function* () {
        const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
        const cacheValue = this.cache.get(cacheKey);
        if (cacheValue) {
          cacheValue.lastUsed = this.counter++;
          const data = yield cacheValue.data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          source.getBytes(offset, length, void 0, header.etag).then((resp) => {
            resolve(resp.data);
            if (this.cache.has(cacheKey)) {
            }
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    prune() {
      if (this.cache.size >= this.maxCacheEntries) {
        let minUsed = Infinity;
        let minKey = void 0;
        this.cache.forEach((cacheValue, key) => {
          if (cacheValue.lastUsed < minUsed) {
            minUsed = cacheValue.lastUsed;
            minKey = key;
          }
        });
        if (minKey) {
          this.cache.delete(minKey);
        }
      }
    }
    invalidate(source) {
      return __async2(this, null, function* () {
        const key = source.getKey();
        if (this.invalidations.get(key)) {
          return yield this.invalidations.get(key);
        }
        this.cache.delete(source.getKey());
        const p = new Promise((resolve, reject) => {
          this.getHeader(source).then((h) => {
            resolve();
            this.invalidations.delete(key);
          }).catch((e) => {
            reject(e);
          });
        });
        this.invalidations.set(key, p);
      });
    }
  }, __name(_a4, "SharedPromiseCache"), _a4);
  var _a5;
  var PMTiles = (_a5 = class {
    constructor(source, cache2, decompress) {
      if (typeof source === "string") {
        this.source = new FetchSource(source);
      } else {
        this.source = source;
      }
      if (decompress) {
        this.decompress = decompress;
      } else {
        this.decompress = defaultDecompress;
      }
      if (cache2) {
        this.cache = cache2;
      } else {
        this.cache = new SharedPromiseCache();
      }
    }
    /**
     * Return the header of the archive,
     * including information such as tile type, min/max zoom, bounds, and summary statistics.
     */
    getHeader() {
      return __async2(this, null, function* () {
        return yield this.cache.getHeader(this.source);
      });
    }
    /** @hidden */
    getZxyAttempt(z, x2, y, signal) {
      return __async2(this, null, function* () {
        const tileId = zxyToTileId(z, x2, y);
        const header = yield this.cache.getHeader(this.source);
        if (header.specVersion < 3) {
          return v2_default.getZxy(header, this.source, this.cache, z, x2, y, signal);
        }
        if (z < header.minZoom || z > header.maxZoom) {
          return void 0;
        }
        let dO = header.rootDirectoryOffset;
        let dL = header.rootDirectoryLength;
        for (let depth = 0; depth <= 3; depth++) {
          const directory = yield this.cache.getDirectory(
            this.source,
            dO,
            dL,
            header
          );
          const entry = findTile(directory, tileId);
          if (entry) {
            if (entry.runLength > 0) {
              const resp = yield this.source.getBytes(
                header.tileDataOffset + entry.offset,
                entry.length,
                signal,
                header.etag
              );
              return {
                data: yield this.decompress(resp.data, header.tileCompression),
                cacheControl: resp.cacheControl,
                expires: resp.expires
              };
            }
            dO = header.leafDirectoryOffset + entry.offset;
            dL = entry.length;
          } else {
            return void 0;
          }
        }
        throw Error("Maximum directory depth exceeded");
      });
    }
    /**
     * Primary method to get a single tile's bytes from an archive.
     *
     * Returns undefined if the tile does not exist in the archive.
     */
    getZxy(z, x2, y, signal) {
      return __async2(this, null, function* () {
        try {
          return yield this.getZxyAttempt(z, x2, y, signal);
        } catch (e) {
          if (e instanceof EtagMismatch) {
            this.cache.invalidate(this.source);
            return yield this.getZxyAttempt(z, x2, y, signal);
          }
          throw e;
        }
      });
    }
    /** @hidden */
    getMetadataAttempt() {
      return __async2(this, null, function* () {
        const header = yield this.cache.getHeader(this.source);
        const resp = yield this.source.getBytes(
          header.jsonMetadataOffset,
          header.jsonMetadataLength,
          void 0,
          header.etag
        );
        const decompressed = yield this.decompress(
          resp.data,
          header.internalCompression
        );
        const dec = new TextDecoder("utf-8");
        return JSON.parse(dec.decode(decompressed));
      });
    }
    /**
     * Return the arbitrary JSON metadata of the archive.
     */
    getMetadata() {
      return __async2(this, null, function* () {
        try {
          return yield this.getMetadataAttempt();
        } catch (e) {
          if (e instanceof EtagMismatch) {
            this.cache.invalidate(this.source);
            return yield this.getMetadataAttempt();
          }
          throw e;
        }
      });
    }
    /**
     * Construct a [TileJSON](https://github.com/mapbox/tilejson-spec) object.
     *
     * baseTilesUrl is the desired tiles URL, excluding the suffix `/{z}/{x}/{y}.{ext}`.
     * For example, if the desired URL is `http://example.com/tileset/{z}/{x}/{y}.mvt`,
     * the baseTilesUrl should be `https://example.com/tileset`.
     */
    getTileJson(baseTilesUrl) {
      return __async2(this, null, function* () {
        const header = yield this.getHeader();
        const metadata = yield this.getMetadata();
        const ext = tileTypeExt(header.tileType);
        return {
          tilejson: "3.0.0",
          scheme: "xyz",
          tiles: [`${baseTilesUrl}/{z}/{x}/{y}${ext}`],
          // biome-ignore lint: TileJSON spec
          vector_layers: metadata.vector_layers,
          attribution: metadata.attribution,
          description: metadata.description,
          name: metadata.name,
          version: metadata.version,
          bounds: [header.minLon, header.minLat, header.maxLon, header.maxLat],
          center: [header.centerLon, header.centerLat, header.centerZoom],
          minzoom: header.minZoom,
          maxzoom: header.maxZoom
        };
      });
    }
  }, __name(_a5, "PMTiles"), _a5);

  // src/index.ts
  var _PMTilesRasterSource = class _PMTilesRasterSource extends DataTile_default3 {
    constructor(options) {
      super(__spreadValues(__spreadValues({}, options), {
        state: "loading"
      }));
      this.loadImage = /* @__PURE__ */ __name((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.addEventListener("load", () => resolve(img));
          img.addEventListener("error", () => reject(new Error("load failed")));
          img.src = src;
        });
      }, "loadImage");
      const p = new PMTiles(options.url);
      p.getHeader().then((h) => {
        const projection = options.projection === void 0 ? "EPSG:3857" : options.projection;
        this.tileGrid = options.tileGrid || createXYZ({
          extent: extentFromProjection(projection),
          maxResolution: options.maxResolution,
          minZoom: h.minZoom,
          maxZoom: h.maxZoom,
          tileSize: options.tileSize
        });
        this.setLoader((z, x2, y) => __async(this, null, function* () {
          const response = yield p.getZxy(z, x2, y);
          if (!response) {
            return new Uint8Array();
          }
          const src = URL.createObjectURL(new Blob([response.data]));
          const image = yield this.loadImage(src);
          URL.revokeObjectURL(src);
          return image;
        }));
        this.setState("ready");
      });
    }
  };
  __name(_PMTilesRasterSource, "PMTilesRasterSource");
  var PMTilesRasterSource = _PMTilesRasterSource;
  var _PMTilesVectorSource = class _PMTilesVectorSource extends VectorTile_default2 {
    constructor(options) {
      super(__spreadValues(__spreadValues({}, options), {
        state: "loading",
        url: "pmtiles://{z}/{x}/{y}",
        format: options.format || new MVT_default()
      }));
      this.tileLoadFunction = /* @__PURE__ */ __name((tile, url) => {
        const vtile = tile;
        const re = new RegExp(/pmtiles:\/\/(\d+)\/(\d+)\/(\d+)/);
        const result = url.match(re);
        if (!(result && result.length >= 4)) {
          throw Error("Could not parse tile URL");
        }
        const z = +result[1];
        const x2 = +result[2];
        const y = +result[3];
        vtile.setLoader(
          (extent, resolution, projection) => {
            this.pmtiles_.getZxy(z, x2, y).then((tile_result) => {
              if (tile_result) {
                const format = vtile.getFormat();
                vtile.setFeatures(
                  format.readFeatures(tile_result.data, {
                    extent,
                    featureProjection: projection
                  })
                );
                vtile.setState(TileState_default.LOADED);
              } else {
                vtile.setFeatures([]);
                vtile.setState(TileState_default.EMPTY);
              }
            }).catch((err2) => {
              vtile.setFeatures([]);
              vtile.setState(TileState_default.ERROR);
            });
          }
        );
      }, "tileLoadFunction");
      this.pmtiles_ = new PMTiles(options.url);
      this.pmtiles_.getHeader().then((h) => {
        const projection = options.projection || "EPSG:3857";
        const extent = options.extent || extentFromProjection(projection);
        this.tileGrid = options.tileGrid || createXYZ({
          extent,
          maxResolution: options.maxResolution,
          maxZoom: options.maxZoom !== void 0 ? options.maxZoom : h.maxZoom,
          minZoom: h.minZoom,
          tileSize: options.tileSize || 512
        });
        this.setTileLoadFunction(this.tileLoadFunction);
        this.setState("ready");
      });
    }
  };
  __name(_PMTilesVectorSource, "PMTilesVectorSource");
  var PMTilesVectorSource = _PMTilesVectorSource;
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=olpmtiles.js.map