import random from 'lodash/random';
import { generate, verify } from '../';

it('generate & verify', async () => {
  const taiwanId = generate();
  expect(verify(taiwanId)).toBe(true);
});

it('custom generate & verify', async () => {
  const prefix = String.fromCharCode(65 + random(25));
  const taiwanId = generate(`${prefix}3########`);
  expect(new RegExp(`^${prefix}3[0-9]{8}$`, 'i').test(taiwanId)).toBe(true);
  expect(verify(taiwanId)).toBe(false);
});

it('generate & custom verify', async () => {
  const prefix = String.fromCharCode(65 + random(25));
  const taiwanId = generate(`${prefix}#8#######`);
  expect(verify(taiwanId, new RegExp(`^${prefix}[1-2]8[0-9]{7}$`, 'i'))).toBe(true);
});
