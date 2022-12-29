import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IPost } from "./post.model";
import { PostPayload } from "./payload/post.payload";
import { PatchPostPayload } from "./payload/patch.post.payload";
import { slugify } from "./utils";

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
 * Post Service
 */
@Injectable()
export class PostService {
  /**
   * Constructor
   * @param {Model<IPost>} postModel
   */
  constructor(
    @InjectModel("Post") private readonly postModel: Model<IPost>,
  ) {}

  /**
   * Fetches all posts from database
   * @returns {Promise<IPost>} queried post data
   */
  getAll(): Promise<IPost[]> {
    return this.postModel.find({}).exec();
  }

  /**
   * Fetches a post from database by UUID
   * @param {string} id
   * @returns {Promise<IPost>} queried post data
   */
  get(id: string): Promise<IPost> {
    return this.postModel.findById(id).exec();
  }

  /**
   * Fetches a post from database by username
   * @param {string} slug
   * @returns {Promise<IPost>} queried post data
   */
  getBySlug(slug: string): Promise<IPost> {
    return this.postModel.findOne({ slug }).exec();
  }


  /**
   * Create a post with RegisterPayload fields
   * @param {PostPayload} payload post payload
   * @returns {Promise<IPost>} created post data
   */
  async create(payload: PostPayload): Promise<IPost> {
    const slug = slugify(payload.title);
    const post = await this.getBySlug(slug);
    if (post) {
      throw new NotAcceptableException(
        "Post with Slug already exists",
      );
    }
    // this will auto assign the admin role to each created user
    const createdPost = new this.postModel({
      ...payload,
      slug
    });

    return createdPost.save();
  }

  /**
   * Edit post data
   * @param {PatchPostPayload} payload
   * @returns {Promise<IPost>} mutated post data
   */
  async edit(payload: PatchPostPayload): Promise<IPost> {
    const {slug, ...restPayload} = payload
    const updatedPost = await this.postModel.updateOne(
      { slug },
      restPayload,
    );
    return this.getBySlug(slug);
  }

  /**
   * Delete post given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(slug: string): Promise<IGenericMessageBody> {
    return this.postModel.deleteOne({ slug }).then(post => {
      if (post.deletedCount === 1) {
        return { message: `Deleted ${slug} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a post by the slug of ${slug}.`,
        );
      }
    });
  }
}
