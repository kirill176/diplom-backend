const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = admin.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const bucket = admin.storage().bucket();

class FileService {
  async addFile(file, user) {
    try {
      const filePath = file.path;

      const newFile = {
        id: uuidv4(),
        fileName: path.basename(filePath),
        fileSize: file.size,
        fileType: file.mimetype,
      };

      await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType: file.mimetype,
        },
      });

      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      fs.unlinkSync(filePath);

      user.files.push(newFile);
      user.usedSpace += fileSize;
      await user.save();

      return {
        message: "File uploaded successfully",
        fileUrl,
        fileSize,
        usedSpace: user.usedSpace,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }

  async removeFile(fileId) {
    try {
      await bucket.file(fileId).delete();

      return {
        message: "File deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Error deleting file");
    }
  }
}

module.exports = new FileService();
