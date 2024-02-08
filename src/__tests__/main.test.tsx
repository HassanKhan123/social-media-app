// describe("Button component", () => {
//   test("renders button with label", () => {
//     expect(2 * 2).toEqual(4);
//   });
// });

import {
  createUserAccount,
  getInfinitePosts,
  getPostById,
  saveUserToDB,
  searchPosts,
} from "../lib/appwrite/api";
import { account, avatars, databases } from "../lib/appwrite/config";
import { ID, Query } from "appwrite";

// Import the functions to be tested

// Mock the appwrite module
jest.mock("appwrite", () => ({
  ID: {
    unique: jest.fn().mockReturnValue("mockedUniqueId"),
  },
  account: {
    create: jest.fn().mockResolvedValue({
      $id: "mockedAccountId",
      email: "mockedEmail",
      name: "mockedName",
    }),
  },
  databases: {
    createDocument: jest.fn().mockResolvedValue({
      accountId: "mockedAccountId",
      email: "mockedEmail",
      name: "mockedName",
      imageUrl: "mockedImageUrl",
    }),
  },
  avatars: {
    getInitials: jest.fn().mockReturnValue("mockedAvatarUrl"),
  },
  uploadFile: jest.fn(),
  getFilePreview: jest.fn(),
  deleteFile: jest.fn(),
  storage: {
    createFile: jest.fn(),
    getFilePreview: jest.fn(),
    deleteFile: jest.fn(),
  },
}));

describe("createUserAccount function", () => {
  it("should create a new user account and save it to the database", async () => {
    const user = {
      email: "test@example.com",
      password: "testpassword",
      name: "Test User",
      username: "testuser",
    };

    const newUser = await createUserAccount(user);

    expect(newUser).toEqual({
      accountId: "mockedAccountId",
      email: "mockedEmail",
      name: "mockedName",
      imageUrl: "mockedAvatarUrl",
    });

    expect(ID.unique).toHaveBeenCalled();
    expect(avatars.getInitials).toHaveBeenCalledWith("Test User");
    expect(account.create).toHaveBeenCalledWith(
      "mockedUniqueId",
      "test@example.com",
      "testpassword",
      "Test User"
    );
    expect(databases.createDocument).toHaveBeenCalledWith(
      expect.any(String), // You might need to update these
      expect.any(String), // parameters according to your
      expect.any(String), // actual setup
      {
        accountId: "mockedAccountId",
        email: "mockedEmail",
        name: "mockedName",
        imageUrl: "mockedAvatarUrl",
      }
    );
  });
});

describe("saveUserToDB function", () => {
  it("should save user data to the database", async () => {
    const user = {
      accountId: "testAccountId",
      email: "test@example.com",
      name: "Test User",
      imageUrl: "testImageUrl",
    };

    //@ts-ignore
    const newUser = await saveUserToDB(user);

    expect(newUser).toEqual({
      accountId: "mockedAccountId",
      email: "mockedEmail",
      name: "mockedName",
      imageUrl: "mockedImageUrl",
    });

    expect(databases.createDocument).toHaveBeenCalledWith(
      expect.any(String), // You might need to update these
      expect.any(String), // parameters according to your
      expect.any(String), // actual setup
      {
        accountId: "testAccountId",
        email: "test@example.com",
        name: "Test User",
        imageUrl: "testImageUrl",
      }
    );
  });
});

describe("searchPosts function", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  it("should search for posts with the given search term", async () => {
    // Mocked data
    const searchTerm = "test";
    const mockedPosts: any = [
      /* mocked posts data */
    ];
    // Mocked return value

    //@ts-ignore
    databases.listDocuments.mockResolvedValue(mockedPosts);

    // Call the function
    const result = await searchPosts(searchTerm);

    // Assertions
    expect(databases.listDocuments).toHaveBeenCalledWith(
      expect.any(String), // databaseId
      expect.any(String), // postCollectionId
      [Query.search("caption", searchTerm)]
    );
    expect(result).toEqual(mockedPosts);
  });

  // Write more test cases to cover different scenarios like error handling, etc.
});

describe("getInfinitePosts function", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  it("should fetch infinite posts", async () => {
    // Mocked data
    const pageParam = 1; // Mocked pageParam value
    const mockedPosts: any = [
      /* mocked posts data */
    ];
    // Mocked return value
    //@ts-ignore
    databases.listDocuments.mockResolvedValue(mockedPosts);

    // Call the function
    const result = await getInfinitePosts({ pageParam });

    // Assertions
    expect(databases.listDocuments).toHaveBeenCalledWith(
      expect.any(String), // databaseId
      expect.any(String), // postCollectionId
      [
        Query.orderDesc("$updatedAt"),
        Query.limit(9),
        Query.cursorAfter(pageParam.toString()),
      ]
    );
    expect(result).toEqual(mockedPosts);
  });

  it("should fetch initial posts when pageParam is not provided", async () => {
    // Mocked data
    const mockedPosts: any = [
      /* mocked posts data */
    ];
    // Mocked return value
    //@ts-ignore
    databases.listDocuments.mockResolvedValue(mockedPosts);

    // Call the function without pageParam
    const result = await getInfinitePosts({ pageParam: 1 });

    // Assertions
    expect(databases.listDocuments).toHaveBeenCalledWith(
      expect.any(String), // databaseId
      expect.any(String), // postCollectionId
      [Query.orderDesc("$updatedAt"), Query.limit(9)]
    );
    expect(result).toEqual(mockedPosts);
  });

  // Write more test cases to cover different scenarios like error handling, etc.
});

describe("getPostById function", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  it("should fetch a post by id", async () => {
    // Mocked data
    const postId = "mockedPostId";
    const mockedPost = {
      /* mocked post data */
    };
    // Mocked return value
    //@ts-ignore
    databases.getDocument.mockResolvedValue(mockedPost);

    // Call the function
    const result = await getPostById(postId);

    // Assertions
    expect(databases.getDocument).toHaveBeenCalledWith(
      expect.any(String), // databaseId
      expect.any(String), // postCollectionId
      postId
    );
    expect(result).toEqual(mockedPost);
  });

  it("should throw an error if postId is not provided", async () => {
    // Call the function without postId
    await expect(getPostById()).rejects.toThrowError();
  });

  it("should throw an error if post is not found", async () => {
    // Mocked data
    const postId = "nonExistingPostId";
    // Mocked return value
    //@ts-ignore
    databases.getDocument.mockResolvedValue(null);

    // Call the function
    await expect(getPostById(postId)).rejects.toThrowError();
  });

  // Write more test cases to cover different scenarios like error handling, etc.
});
