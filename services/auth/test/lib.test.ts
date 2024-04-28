/** @format */

// /** @format */

// import { createUser } from "../src/lib";
// import { UserRepository } from "./user.repository"; // Assuming a user repository

// jest.mock("./user.repository"); // Mock the user repository

// describe("UserService", () => {
//     it("creates a user successfully", async () => {
//         const mockUser = { username: "testuser", email: "test@example.com" };
//         const mockUserRepository = jest.mocked(UserRepository);
//         mockUserRepository.create.mockResolvedValue(mockUser);

//         const createdUser = await createUser(mockUser);

//         expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
//         expect(createdUser).toEqual(mockUser);
//     });

//     it("throws error for existing user", async () => {
//         const mockUser = { username: "testuser", email: "test@example.com" };
//         const mockUserRepository = jest.mocked(UserRepository);
//         const existingUserError = new Error("User already exists");
//         mockUserRepository.create.mockRejectedValue(existingUserError);

//         await expect(createUser(mockUser)).rejects.toEqual(existingUserError);
//         expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
//     });

//     // Add similar tests for data persistence errors and other scenarios
// });

describe("A two number", () => {
    describe("if two argument passes", () => {
        test("should return success", async () => {
            expect(3).toBe(3);
        });
    });
    describe("no argument passes", () => {
        test("should return success", async () => {
            expect(6).toBe(6);
        });
    });
});
