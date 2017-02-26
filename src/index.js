import parseInt from 'lodash/parseInt';
import sample from 'lodash/sample';
import random from 'lodash/random';

const charNum = {
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

  const total = (Math.floor(charNum[value[0]] / 10) * 1) +
                ((charNum[value[0]] % 10) * 9) +
                (parseInt(value[1]) * 8) +
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
    sample(Object.keys(charNum)),
    random(1) + 1,
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
    random(9),
  ].map((value, idx) => (/[A-Z0-9]/i.test(format[idx]) ? format[idx] : value));

  const total = (Math.floor(charNum[id[0]] / 10) * 1) +
                ((charNum[id[0]] % 10) * 9) +
                (parseInt(id[1]) * 8) +
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
