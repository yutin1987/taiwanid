import random from 'lodash/random';
import { generate, verify } from '../';

it('generate & verify', async () => {
  const taiwanId = generate();
  expect(verify(taiwanId)).toBe(true);
  expect(verify('F127516085')).toBe(true);
  expect(verify('FB20281169', /^[A-Z][12A-D]\d{8}$/i)).toBe(true);
});

it('generate resident certificate', () => {
  expect(generate('FB2028116')).toBe('FB20281169');
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
