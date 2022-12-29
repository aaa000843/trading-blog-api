import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UseGuards,
} from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
// import { ACGuard, UseRoles } from "nest-access-control";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostService, IGenericMessageBody } from "./post.service";
import { PostPayload } from "./payload/post.payload";
import { PatchPostPayload } from "./payload/patch.post.payload";
import { IPost } from "./post.model";

/**
 * Post Controller
 */
@ApiBearerAuth()
@ApiTags("post")
@Controller("api/post")
export class PostController {
  /**
   * Constructor
   * @param postService
   */
  constructor(private readonly postService: PostService) {}

  /**
   * Retrieves a particular post
   * @param slug the post given slug to fetch
   * @returns {Promise<IPost>} queried post data
   */
  @Post("/create")
  // @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async createPost(@Body() payload: PostPayload): Promise<IPost> {
    const post = await this.postService.create(payload);
    return post;
  }

  /**
   * Retrieves a particular post
   * @param slug the post given slug to fetch
   * @returns {Promise<IPost>} queried post data
   */
  @Get()
  @ApiResponse({ status: 200, description: "Fetch Posts Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Posts Request Failed" })
  async getAllPost(): Promise<IPost[]> {
    const posts = await this.postService.getAll();
    return posts;
  }

  /**
   * Retrieves a particular post
   * @param slug the post given slug to fetch
   * @returns {Promise<IPost>} queried post data
   */
  @Get(":slug")
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async getPost(@Param("slug") slug: string): Promise<IPost> {
    const post = await this.postService.getBySlug(slug);
    if (!post) {
      throw new BadRequestException(
        "The post with that slug could not be found.",
      );
    }
    return post;
  }

  /**
   * Edit a post
   * @param {PatchPostPayload} payload
   * @returns {Promise<IPost>} mutated post data
   */
  @Patch()
  // @UseGuards(AuthGuard("jwt"))
  // @UseRoles({
  //   resource: "post",
  //   action: "update",
  //   possession: "own",
  // })
  @ApiResponse({ status: 200, description: "Patch Post Request Received" })
  @ApiResponse({ status: 400, description: "Patch Post Request Failed" })
  async patchPost(@Body() payload: PatchPostPayload) {
    return await this.postService.edit(payload);
  }

  /**
   * Removes a post from the database
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the post has been deleted
   */
  @Delete(":slug")
  // @UseGuards(AuthGuard("jwt"), ACGuard)
  // @UseRoles({
  //   resource: "post",
  //   action: "delete",
  //   possession: "own",
  // })
  @ApiResponse({ status: 200, description: "Delete Post Request Received" })
  @ApiResponse({ status: 400, description: "Delete Post Request Failed" })
  async delete(
    @Param("slug") slug: string,
  ): Promise<IGenericMessageBody> {
    return await this.postService.delete(slug);
  }
}
