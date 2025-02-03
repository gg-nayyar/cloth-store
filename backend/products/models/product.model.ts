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
  image: {
    type: [String],
    required: true,
    default: [],
  },
  material:{
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['top','bottom','shoes','accessories'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  }
  //   reviews: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Review",
  //     },
  //   ],
},
{
  timestamps: true,
});

export default mongoose.model("Product", productSchema);
