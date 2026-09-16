import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema(
  {
    giftNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 23,
    },
    title: {
      type: String,
      default: function () {
        return `Gift #${this.giftNumber}`;
      },
    },
    message: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    photoUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
    openedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Gift = mongoose.model('Gift', giftSchema);
export default Gift;
