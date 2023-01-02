import { Module } from "@nestjs/common";
import { PictureService } from "./picture.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Picture } from "./picture.model";
import { PictureController } from "./picture.controller";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Picture", schema: Picture }]),
    ConfigModule,
  ],
  providers: [PictureService],
  exports: [PictureService],
  controllers: [PictureController],
})
export class PictureModule {}
