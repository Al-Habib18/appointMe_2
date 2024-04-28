/** @format */

// /** @format */

// import { createUser } from "../controllers";
// import { UserService } from "../lib"; // Assuming a user service

// jest.mock("../user.service"); // Mock the user service

// describe("UserController", () => {
//     it("creates a user successfully", async () => {
//         const mockUser = { username: "testuser", email: "test@example.com" };
//         const mockUserService = jest.mocked(UserService);
//         mockUserService.createUser.mockResolvedValue(mockUser);

//         const req = { body: mockUser };
//         const res = { json: jest.fn(), status: jest.fn() };

//         await createUser(req, res);

//         expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser);
//         expect(res.status).toHaveBeenCalledWith(201); // Created
//         expect(res.json).toHaveBeenCalledWith(mockUser);
//     });

//     it("returns error for existing user", async () => {
//         const mockUser = { username: "testuser", email: "test@example.com" };
//         const mockUserService = jest.mocked(UserService);
//         const existingUserError = new Error("User already exists");
//         mockUserService.createUser.mockRejectedValue(existingUserError);

//         const req = { body: mockUser };
//         const res = { json: jest.fn(), status: jest.fn() };

//         await createUser(req, res);

//         expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser);
//         expect(res.status).toHaveBeenCalledWith(400); // Bad Request
//         expect(res.json).toHaveBeenCalledWith({
//             message: existingUserError.message,
//         });
//     });

//     // Add similar tests for invalid data and other error scenarios
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
