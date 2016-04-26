var ids = require('../lib/ids.js');
var assert = require('assert');

var testCases = [
  {
    src: '⿰⿱畾宐毛',
    target: {
      type: '⿰',
      left: {
        type: '⿱',
        above: { type: 'char', char: '畾' },
        below: { type: 'char', char: '宐' }
      },
      right: { type: 'char', char: '毛' }
    }
  },
  {
    src: '⿲⺡丰色',
    target: {
      type: '⿲',
      left: { type: 'char', char: '⺡' },
      middle: { type: 'char', char: '丰' },
      right: { type: 'char', char: '色' }
    }
  },
  {
    src: '⿳𠂉一乁',
    target: {
      type: '⿳',
      above: { type: 'char', char: '𠂉' },
      middle: { type: 'char', char: '一' },
      below: { type: 'char', char: '乁' }
    }
  },
  {
    src: '⿴囗&CDP-8C78;',
    target: {
      type: '⿴',
      outside: { type: 'char', char: '囗' },
      inside: { type: 'html', code: 'CDP-8C78' }
    }
  },
  {
    src: '⿵乃&GT-K00064;',
    target: {
      type: '⿵',
      outside: { type: 'char', char: '乃' },
      inside: { type: 'html', code: 'GT-K00064' }
    }
  },
  {
    src: '⿶凵丵',
    target: {
      type: '⿶',
      outside: { type: 'char', char: '凵' },
      inside: { type: 'char', char: '丵' }
    }
  },
  {
    src: '⿷匚久',
    target: {
      type: '⿷',
      outside: { type: 'char', char: '匚' },
      inside: { type: 'char', char: '久' }
    }
  },
  {
    src: '⿸厃㔾',
    target: {
      type: '⿸',
      outside: { type: 'char', char: '厃' },
      inside: { type: 'char', char: '㔾' }
    }
  },
  {
    src: '⿹⺄去',
    target: {
      type: '⿹',
      outside: { type: 'char', char: '⺄' },
      inside: { type: 'char', char: '去' }
    }
  },
  {
    src: '⿺是匕',
    target: {
      type: '⿺',
      outside: { type: 'char', char: '是' },
      inside: { type: 'char', char: '匕' }
    }
  },
  {
    src: '⿻羊⿱䒑口',
    target: {
      type: '⿻',
      back: { type: 'char', char: '羊' },
      front: {
        type: '⿱',
        above: { type: 'char', char: '䒑' },
        below: { type: 'char', char: '口' }
      }
    }
  }
];

testCases.forEach(tc =>
  assert.deepStrictEqual(ids.parse(tc.src), tc.target));