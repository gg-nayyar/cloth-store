import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:
    {
      type: [String],
      required: true,
      default:[],
    },
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
});

export default mongoose.model("Product", productSchema);