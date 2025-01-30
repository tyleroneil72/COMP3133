import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisines: String,
  city: String,
  restaurant_id: String,
});

export default mongoose.model("Restaurant", restaurantSchema);
