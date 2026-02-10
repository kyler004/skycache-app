import mongoose from "mongoose";

const searchLogSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SearchLog = mongoose.model("SearchLog", searchLogSchema);

export default SearchLog;
