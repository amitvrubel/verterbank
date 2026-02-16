import {normalizeYiddish} from "./normalize-yiddish";

describe("normalizeYiddish", () => {
  it('Should strip diacritical marks', () => {
    const input = 'ייִדיש';
    const expected = 'יידיש';
    const result = normalizeYiddish(input);
    expect(result).toBe(expected);
  });

  it('Should normalize composed characters', () => {
    const input = 'ײַ';
    const expected = 'יי';
    const result = normalizeYiddish(input);
    expect(result).toBe(expected);
  });

  it('Should collapse whitespaces', () => {
    const input = 'איך    וויל       גיין';
    const expected = 'איך וויל גיין';
    const result = normalizeYiddish(input);
    expect(result).toBe(expected);
  });

});
