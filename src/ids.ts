export const compositions = "⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻";

export type IDS =
  Character |
  HTMLCode |
  LeftToRight |
  AboveToBelow |
  LeftToMiddleAndRight |
  AboveToMiddleAndBelow |
  FullSurround |
  SurroundFromAbove |
  SurroundFromBelow |
  SurroundFromLeft |
  SurroundFromUpperLeft |
  SurroundFromUpperRight |
  SurroundFromLowerLeft |
  Overlaid;

export interface Character {
  type: 'char',
  char: string
}

export interface HTMLCode {
  type: 'html',
  code: string
}

export interface LeftToRight {
  type: '⿰',
  left: IDS,
  right: IDS
}

export interface AboveToBelow {
  type: '⿱'
  above: IDS,
  below: IDS
}

export interface LeftToMiddleAndRight {
  type: '⿲',
  left: IDS,
  middle: IDS,
  right: IDS
}

export interface AboveToMiddleAndBelow {
  type: '⿳',
  above: IDS,
  middle: IDS,
  below: IDS
}

export interface FullSurround {
  type: '⿴',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromAbove {
  type: '⿵',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromBelow {
  type: '⿶',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromLeft {
  type: '⿷',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromUpperLeft {
  type: '⿸',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromUpperRight {
  type: '⿹',
  outside: IDS,
  inside: IDS
}

export interface SurroundFromLowerLeft {
  type: '⿺',
  outside: IDS,
  inside: IDS
}

export interface Overlaid {
  type: '⿻',
  back: IDS,
  front: IDS
}

/**
 * Parse an Ideographic Descrizption Sequences
 * @param str The string to parse (must not contain white space)
 * @returns IDS structure or null if the parse failed
 */
export function parse(str: string): IDS {
  const parsed = parsePart(str);
  if (parsed !== null && parsed.rest === '') return parsed.ids;
  else return null;
}

function parsePart(str: string): { ids: IDS, rest: string } {
  if (str.length === 0) return null;

  const split = strNextChar(str);
  switch (split.next) {
    case '&': return parseHTMLCode(split.rest);
    case '⿰': return parseLeftToRight(split.rest);
    case '⿱': return parseAboveToBelow(split.rest);
    case '⿲': return parseLeftToMiddleAndRight(split.rest);
    case '⿳': return parseAboveToMiddleAndBelow(split.rest);
    case '⿴': return parseFullSurround(split.rest);
    case '⿵': return parseSurroundFromAbove(split.rest);
    case '⿶': return parseSurroundFromBelow(split.rest);
    case '⿷': return parseSurroundFromLeft(split.rest);
    case '⿸': return parseSurroundFromUpperLeft(split.rest);
    case '⿹': return parseSurroundFromUpperRight(split.rest);
    case '⿺': return parseSurroundFromLowerLeft(split.rest);
    case '⿻': return parseOverlaid(split.rest);
    default: // parse single unicode char
      return {
        ids: { type: 'char', char: split.next },
        rest: split.rest
      }
  }
}

function parseHTMLCode(str: string): { ids: HTMLCode, rest: string } {
  const end = str.indexOf(';');
  if (end === -1) return null;
  else return {
    ids: { type: 'html', code: str.substr(0, end) },
    rest: str.substr(end + 1)
  };
}

function parseLeftToRight(str: string): { ids: LeftToRight, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿰', left: parsed.ids[0], right: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseAboveToBelow(str: string): { ids: AboveToBelow, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿱', above: parsed.ids[0], below: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseLeftToMiddleAndRight(str: string): { ids: LeftToMiddleAndRight, rest: string } {
  const parsed = parseParts(str, 3);
  if (parsed === null)
    return null;
  else
    return {
      ids: {
        type: '⿲',
        left: parsed.ids[0],
        middle: parsed.ids[1],
        right: parsed.ids[2]
      },
      rest: parsed.rest
    };
}

function parseAboveToMiddleAndBelow(str: string): { ids: AboveToMiddleAndBelow, rest: string } {
  const parsed = parseParts(str, 3);
  if (parsed === null)
    return null;
  else
    return {
      ids: {
        type: '⿳',
        above: parsed.ids[0],
        middle: parsed.ids[1],
        below: parsed.ids[2]
      },
      rest: parsed.rest
    };
}

function parseFullSurround(str: string): { ids: FullSurround, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿴', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromAbove(str: string): { ids: SurroundFromAbove, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿵', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromBelow(str: string): { ids: SurroundFromBelow, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿶', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromLeft(str: string): { ids: SurroundFromLeft, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿷', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromUpperLeft(str: string): { ids: SurroundFromUpperLeft, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿸', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromUpperRight(str: string): { ids: SurroundFromUpperRight, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿹', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseSurroundFromLowerLeft(str: string): { ids: SurroundFromLowerLeft, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿺', outside: parsed.ids[0], inside: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseOverlaid(str: string): { ids: Overlaid, rest: string } {
  const parsed = parseParts(str, 2);
  if (parsed === null)
    return null;
  else
    return {
      ids: { type: '⿻', back: parsed.ids[0], front: parsed.ids[1] },
      rest: parsed.rest
    };
}

function parseParts(str: string, count: number): { ids: IDS[], rest: string } {
  var parts: IDS[] = [];
  for (var i = 0; i < count; i++) {
    const parsed = parsePart(str);
    if (parsed === null) return null;
    parts.push(parsed.ids);
    str = parsed.rest;
  }
  return { ids: parts, rest: str };
}

// Work around javascript not handling multibyte strings
function strNextChar(str: string): { next: string, rest: string } {
  if ((str.charCodeAt(0) & 0xF800) === 0xD800) {
    return {
      next: str.substr(0, 2),
      rest: str.substr(2)
    }
  } else {
    return {
      next: str.charAt(0),
      rest: str.substr(1)
    }
  }
}