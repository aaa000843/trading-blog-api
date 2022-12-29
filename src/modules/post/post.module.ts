import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Post } from "./post.model";
import { PostController } from "./post.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Post", schema: Post }])],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
