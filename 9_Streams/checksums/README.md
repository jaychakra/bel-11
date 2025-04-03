# File checksums
## Purpose
- The primary role of a checksum is to ensure data integrity and detect corruption, which is better suited as a comparison value rather than an embedded one.

## Storage Design
- Filesystems store data in binary formats without embedding metadata like a hash within the file content. 
- Including a hash within the file would alter its content, creating a paradox because the hash would change each time it is recalculated.

## External Metadata
- Hashes are typically generated externally and stored separately, such as in a manifest file (e.g., `.md5`, `.sha256` files) or a database.

# Common Practices for File Hashes

## 1. Pre-computed Hash Files
- Hashes for files are often provided separately. For example:
  - A `.iso` file may come with an accompanying `.sha256` file containing its hash.
- This allows verification after downloading.

## 2. Filesystem-Level Integrity
- Certain filesystems (e.g., ZFS, Btrfs) or storage systems calculate and maintain hashes internally for error detection.
- These hashes are not part of the file’s data; they are part of the filesystem metadata.

## 3. Protocols with Hashes
- File transfer protocols like **BitTorrent** or **IPFS** use hashes extensively:
  - **BitTorrent**: Hashes are used to verify each piece of the file.
  - **IPFS**: The entire system is based on content-addressable hashes.

## 4. Digital Signatures
- A hash of the file is often used in cryptographic digital signatures to ensure authenticity and integrity, but this is done externally.

---

# How to Associate Hashes with Files

## 1. Manual Hash Generation
- Generate a hash for a file using tools like `md5sum`, `sha256sum`, or Node.js’s `crypto` module:
  ```bash
  openssl sha256 myfile.txt > myfile.txt.sha256
  ```

## 2. Using Metadata Storage
- Store hashes in databases, manifests, or alongside the file:
- Example manifest file:
```bash 
abc12345... myfile1.txt
def67890... myfile2.txt
```

## 3. Include Hash in File Transfer Protocols
- Use protocols that incorporate hashing for integrity verification.