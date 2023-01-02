import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
    BadRequestException,
  Injectable,
} from "@nestjs/common";
import { IPicture } from "./picture.model";
import { PicturePayload } from "./payload/picture.payload";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Picture Service
 */
@Injectable()
export class PictureService {
  /**
   * Constructor
   * @param {Model<IPicture>} pictureModel
   */
  constructor(
    @InjectModel("Picture") private readonly pictureModel: Model<IPicture>,
  ) {}

  /**
   * Fetches a picture from database by UUID
   * @param {string} id
   * @returns {Promise<IPicture>} queried picture data
   */
  get(id: string): Promise<IPicture> {
    return this.pictureModel.findOne({slug: id}).exec();
  }

  /**
   * Create a picture with PicturePayload fields
   * @param {PicturePayload} payload picture payload
   * @returns {Promise<IPicture>} created picture data
   */
  async create(payload: PicturePayload): Promise<IPicture> {
    const createdPost = new this.pictureModel(payload);
    return createdPost.save();
  }

  /**
   * Delete picture given a id
   * @param {id} id
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(id: string): Promise<IGenericMessageBody> {
    return this.pictureModel.deleteOne({ _id: id }).then(picture => {
      if (picture.deletedCount === 1) {
        return { message: `Deleted picture from records` };
      } else {
        throw new BadRequestException(
            `Failed to delete a picture`,
          );
      }
    });
  }
}
