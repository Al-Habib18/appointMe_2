/**
 * /** @format
 *
 * @format
 */

describe("index", () => {
    it("should be true", () => {
        expect(true).toBe(true);
    });
});

/*
it("should validate request body and create login_history successfully", async () => {
    // Mocked request and response objects
    const req = {
        body: {
            auth_user_id: "123",
            ip_address: "127.0.0.1",
            user_agent: "Mozilla/5.0",
            attempt: "SUCCESS",
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Mocking the createLoginHistorySchema.safeParse function
    const safeParseMock = jest.fn().mockReturnValue({
        success: true,
        data: req.body,
    });
    jest.mock("@schemas/index", () => ({
        createLoginHistorySchema: {
            safeParse: safeParseMock,
        },
    }));

    // Mocking the createLoginHistory function
    const createLoginHistoryMock = jest.fn().mockResolvedValue({
        id: "1",
        auth_user_id: "123",
        ip_address: "127.0.0.1",
        user_agent: "Mozilla/5.0",
        attempt: "SUCCESS",
        loginAt: new Date(),
    });
    jest.mock("../../src/lib/index", () => ({
        createLoginHistory: createLoginHistoryMock,
    }));

    // Importing the createController function after mocking
    const createController = require("../../src/controllers/create").default;

    // Calling the createController function
    await createController(req, res);

    // Assertions
    expect(safeParseMock).toHaveBeenCalledWith(req.body);
    expect(createLoginHistoryMock).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        message: "login_history created successfully",
        login_history: {
            id: "1",
            auth_user_id: "123",
            ip_address: "127.0.0.1",
            user_agent: "Mozilla/5.0",
            attempt: "SUCCESS",
            loginAt: expect.any(Date),
        },
    });
});
 */
