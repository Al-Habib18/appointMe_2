/** @format */

import { generateHash } from "../../src/utils";

it("should generate a hash with salt round of 10", async () => {
    const payload = "test payload";
    const hash = await generateHash(payload);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe("string");
});
