const crypto = require("crypto");

function generateHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function isValidCandidate(candidate) {
  return candidate && typeof candidate === "string";
}

function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey || generateHash(JSON.stringify(event)) || TRIVIAL_PARTITION_KEY;

  if (!isValidCandidate(candidate)) {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHash(candidate);
  }

  return candidate || "defaultPartitionKey";
}

module.exports = deterministicPartitionKey;