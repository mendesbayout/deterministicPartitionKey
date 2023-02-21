const deterministicPartitionKey = require("./deterministicPartitionKey");

describe("deterministicPartitionKey", () => {
  it("returns the partition key if it exists", () => {
    const event = { partitionKey: "lucas123" };
    expect(deterministicPartitionKey(event)).toBe("lucas123");
  });

  it("generates a partition key for an empty event object", () => {
    const event = {};
    expect(typeof deterministicPartitionKey(event)).toBe("string");
  });

  it("generates a partition key for a non-empty event object", () => {
    const event = { name: "Lucas", age: 30 };
    expect(typeof deterministicPartitionKey(event)).toBe("string");
  });

  it("returns a string partition key of at most 256 characters", () => {
    const event = {
      partitionKey: "abc123".repeat(100),
      name: "Alice",
      age: 30
    };
    expect(deterministicPartitionKey(event).length).toBeLessThanOrEqual(256);
  });

  it("returns a unique partition key for different event objects", () => {
    const event1 = { name: "Lucas", age: 30 };
    const event2 = { name: "Nina", age: 5 };
    expect(deterministicPartitionKey(event1)).not.toBe(deterministicPartitionKey(event2));
  });
});