import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// ERC-1155 contract deployed in step 2
const bundleDrop = sdk.getBundleDropModule(
  "0x5E0edEe213FB7ED3391954EED8b0871aa8458A76",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "AMS Windmill",
        description: "This NFT will give you access to AmsterdamDAO!",
        image: readFileSync("scripts/assets/amsterdam-icon.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()