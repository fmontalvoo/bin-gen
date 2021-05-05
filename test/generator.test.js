const { generator, generateRandomCard } = require('../src/generator')

describe("Bin Generator", () => {
    test("Must return a random credit card",
        () => {
            const expected = "4222735662946768|02|2022|387";
            const result = generator("422273");
            expect(expected).toBe(result);
        });
});