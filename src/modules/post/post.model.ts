import { Schema, Document } from "mongoose";

/**
 * Mongoose Post Schema
 */
export const Post = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Post Document
 */
export interface IPost extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;
  /**
   * Title
   */
  readonly title: string;
  /**
   * description
   */
  readonly description: string;
  /**
   * content
   */
  readonly content: string;
  /**
   * slug
   */
  readonly slug: string;
  /**
   * Date
   */
  readonly date: Date;
}
