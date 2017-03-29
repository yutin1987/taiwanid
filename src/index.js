import parseInt from 'lodash/parseInt';
import sample from 'lodash/sample';
import random from 'lodash/random';
import findKey from 'lodash/findKey';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

export const prefix = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 34,
  J: 18,
  K: 19,
  L: 20,
  M: 21,
  N: 22,
  O: 35,
  P: 23,
  Q: 24,
  R: 25,
  S: 26,
  T: 27,
  U: 28,
  V: 29,
  W: 32,
  X: 30,
  Y: 31,
  Z: 33,
};

export function verify(value, format = /^[A-Z][12]\d{8}$/i) {
  if (!format.test(value)) return false;

  const total = (Math.floor(prefix[value[0]] / 10) * 1) +
                ((prefix[value[0]] % 10) * 9) +
                (parseInt(prefix[value[1]] ? prefix[value[1]] % 10 : value[1]) * 8) +
                (parseInt(value[2]) * 7) +
                (parseInt(value[3]) * 6) +
                (parseInt(value[4]) * 5) +
                (parseInt(value[5]) * 4) +
                (parseInt(value[6]) * 3) +
                (parseInt(value[7]) * 2) +
                (parseInt(value[8]) * 1) +
                (parseInt(value[9]) * 1);

  return (total % 10 === 0);
}

export function generate(format = '##########') {
  const id = [
    sample(Object.keys(prefix)),
    random(1) + 1,
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
  ].map((value, idx) => (/[A-Z0-9]/i.test(format[idx]) ? format[idx] : value));

  const total = (Math.floor(prefix[id[0]] / 10) * 1) +
                ((prefix[id[0]] % 10) * 9) +
                (parseInt(prefix[id[1]] ? prefix[id[1]] % 10 : id[1]) * 8) +
                (parseInt(id[2]) * 7) +
                (parseInt(id[3]) * 6) +
                (parseInt(id[4]) * 5) +
                (parseInt(id[5]) * 4) +
                (parseInt(id[6]) * 3) +
                (parseInt(id[7]) * 2) +
                (parseInt(id[8]) * 1);

  id.push((10 - (total % 10)) % 10);

  return id.join('');
}

export function makeup(value, type = '12ABCD') {
  const regex = new RegExp(`^([${type}])(\\d{8})$`, 'gi');
  const id = regex.exec(value);
  const reply = [];

  if (!id) return reply;

  const typeNum = parseInt(id[1]);

  const total = (parseInt(id[2][0]) * 7) +
                (parseInt(id[2][1]) * 6) +
                (parseInt(id[2][2]) * 5) +
                (parseInt(id[2][3]) * 4) +
                (parseInt(id[2][4]) * 3) +
                (parseInt(id[2][5]) * 2) +
                (parseInt(id[2][6]) * 1) +
                (parseInt(id[2][7]) * 1);

  if (!typeNum) {
    const idx = (prefix[id[1]] % 10) * 8;
    forEach(prefix, (num, key) => {
      if (((Math.floor(num / 10) * 1) + ((num % 10) * 9) + idx + total) % 10 === 0) {
        reply.push(key);
      }
    });
    return reply;
  }

  forEach(prefix, (num, key) => {
    if (((Math.floor(num / 10) * 1) + ((num % 10) * 9) + (typeNum * 8) + total) % 10 === 0) {
      reply.push(key);
    }
  });

  return reply;
}

export function numberify(value) {
  const prefixNum = prefix[value[0]];
  const typeNum = prefix[value[1]] ? prefix[value[1]] : `0${value[1]}`;

  return parseInt(`${prefixNum}${typeNum}${value.substr(2)}`);
}

export function stringify(value) {
  const id = String(value);
  const prefixNum = parseInt(id.substr(0, 2));
  const prefixKey = findKey(prefix, num => (num === prefixNum));
  const typeNum = parseInt(id.substr(2, 2));
  const typeKey = typeNum > 9 ? findKey(prefix, num => (num === typeNum)) : typeNum;

  return `${prefixKey}${typeKey}${id.substr(4)}`;
}
