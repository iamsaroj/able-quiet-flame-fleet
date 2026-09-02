//#region node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = /* @__PURE__ */ new Uint8Array(64);
var charToInt = /* @__PURE__ */ new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
	const c = chars.charCodeAt(i);
	intToChar[i] = c;
	charToInt[c] = i;
}
function encodeInteger(builder, num) {
	do {
		let clamped = num & 31;
		num >>>= 5;
		if (num > 0) clamped |= 32;
		builder.write(intToChar[clamped]);
	} while (num > 0);
}
function encodeSign(num) {
	return num < 0 ? -num << 1 | 1 : num << 1;
}
var bufLength = 16384;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? { decode(buf) {
	return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString();
} } : { decode(buf) {
	let out = "";
	for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
	return out;
} };
var StringWriter = class {
	constructor() {
		this.pos = 0;
		this.out = "";
		this.buffer = new Uint8Array(bufLength);
	}
	write(v) {
		const { buffer } = this;
		buffer[this.pos++] = v;
		if (this.pos === bufLength) {
			this.out += td.decode(buffer);
			this.pos = 0;
		}
	}
	flush() {
		const { buffer, out, pos } = this;
		return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
	}
};
function encode(decoded) {
	const writer = new StringWriter();
	let sourcesIndex = 0;
	let sourceLine = 0;
	let sourceColumn = 0;
	let namesIndex = 0;
	for (let i = 0; i < decoded.length; i++) {
		const line = decoded[i];
		if (i > 0) writer.write(semicolon);
		if (line.length === 0) continue;
		let genColumn = 0;
		for (let j = 0; j < line.length; j++) {
			const segment = line[j];
			if (j > 0) writer.write(comma);
			encodeInteger(writer, encodeSign(segment[0] - genColumn));
			genColumn = segment[0];
			if (segment.length === 1) continue;
			encodeInteger(writer, encodeSign(segment[1] - sourcesIndex));
			encodeInteger(writer, encodeSign(segment[2] - sourceLine));
			encodeInteger(writer, encodeSign(segment[3] - sourceColumn));
			sourcesIndex = segment[1];
			sourceLine = segment[2];
			sourceColumn = segment[3];
			if (segment.length === 4) continue;
			encodeInteger(writer, encodeSign(segment[4] - namesIndex));
			namesIndex = segment[4];
		}
	}
	return writer.flush();
}
//#endregion
//#region node_modules/@jridgewell/gen-mapping/dist/gen-mapping.mjs
var SetArray = class {
	constructor() {
		this._indexes = { __proto__: null };
		this.array = [];
	}
};
function cast(set) {
	return set;
}
function get(setarr, key) {
	return cast(setarr)._indexes[key];
}
function put(setarr, key) {
	const index = get(setarr, key);
	if (index !== void 0) return index;
	const { array, _indexes: indexes } = cast(setarr);
	return indexes[key] = array.push(key) - 1;
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var NO_NAME = -1;
var GenMapping = class {
	constructor({ file, sourceRoot } = {}) {
		this._names = new SetArray();
		this._sources = new SetArray();
		this._sourcesContent = [];
		this._mappings = [];
		this.file = file;
		this.sourceRoot = sourceRoot;
		this._ignoreList = new SetArray();
	}
};
function cast2(map) {
	return map;
}
var maybeAddSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
	return addSegmentInternal(true, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
};
function toDecodedMap(map) {
	const { _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names, _ignoreList: ignoreList } = cast2(map);
	removeEmptyFinalLines(mappings);
	return {
		version: 3,
		file: map.file || void 0,
		names: names.array,
		sourceRoot: map.sourceRoot || void 0,
		sources: sources.array,
		sourcesContent,
		mappings,
		ignoreList: ignoreList.array
	};
}
function toEncodedMap(map) {
	const decoded = toDecodedMap(map);
	return Object.assign({}, decoded, { mappings: encode(decoded.mappings) });
}
function addSegmentInternal(skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
	const { _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names } = cast2(map);
	const line = getIndex(mappings, genLine);
	const index = getColumnIndex(line, genColumn);
	if (!source) {
		if (skipable && skipSourceless(line, index)) return;
		return insert(line, index, [genColumn]);
	}
	const sourcesIndex = put(sources, source);
	const namesIndex = name ? put(names, name) : NO_NAME;
	if (sourcesIndex === sourcesContent.length) sourcesContent[sourcesIndex] = content != null ? content : null;
	if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) return;
	return insert(line, index, name ? [
		genColumn,
		sourcesIndex,
		sourceLine,
		sourceColumn,
		namesIndex
	] : [
		genColumn,
		sourcesIndex,
		sourceLine,
		sourceColumn
	]);
}
function getIndex(arr, index) {
	for (let i = arr.length; i <= index; i++) arr[i] = [];
	return arr[index];
}
function getColumnIndex(line, genColumn) {
	let index = line.length;
	for (let i = index - 1; i >= 0; index = i--) if (genColumn >= line[i][COLUMN]) break;
	return index;
}
function insert(array, index, value) {
	for (let i = array.length; i > index; i--) array[i] = array[i - 1];
	array[index] = value;
}
function removeEmptyFinalLines(mappings) {
	const { length } = mappings;
	let len = length;
	for (let i = len - 1; i >= 0; len = i, i--) if (mappings[i].length > 0) break;
	if (len < length) mappings.length = len;
}
function skipSourceless(line, index) {
	if (index === 0) return true;
	return line[index - 1].length === 1;
}
function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
	if (index === 0) return false;
	const prev = line[index - 1];
	if (prev.length === 1) return false;
	return sourcesIndex === prev[SOURCES_INDEX] && sourceLine === prev[SOURCE_LINE] && sourceColumn === prev[SOURCE_COLUMN] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME);
}
//#endregion
export { maybeAddSegment as n, toEncodedMap as r, GenMapping as t };
