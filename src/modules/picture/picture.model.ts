import { Schema, Document } from "mongoose";

/**
 * Mongoose Picture Schema
 */
export const Picture = new Schema({
    title:{ type: String, required: true },
    description: { type: String},
    image: String,
    contentType: String,
    size: Number,
    date: {
        type: Date,
        default: Date.now,
      },
    slug: String,
    url: String,
});

/**
 * Mongoose Picture Document
 */
export interface IPicture extends Document {
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
  readonly description?: string;
  /**
   * image
   */
  readonly image: string;
  /**
   * contentType
   */
  readonly contentType: string;
  /**
   * size
  */
    readonly size: number;
  /**
   * slug
  */
  readonly slug: string;
  /**
   * Date
   */
  readonly date: Date;

  readonly url: String;
}
