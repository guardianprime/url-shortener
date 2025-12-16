/* ERROR HANDLING MIDDLEWARE TO BE CREATED SOON */
import Url from "../models/url.model";
async function deleteUrl() {
  await Url.collection.dropIndex("shortCode_1");
  console.log("completed!!");
}

deleteUrl();
