import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UnsupportedMediaTypeException,
  Header,
  Res,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PictureService, IGenericMessageBody } from "./picture.service";
import { PicturePayload, PicturePropsPayload } from "./payload/picture.payload";
import { IPicture } from "./picture.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { ParseFile } from "./parse-file.pipe";
import { ConfigService } from "modules/config/config.service";

/**
 * Picture Controller
 */
@ApiBearerAuth()
@ApiTags("picture")
@Controller("api/picture")
export class PictureController {
  /**
   * Constructor
   * @param pictureService
   */
  constructor(
    private readonly pictureService: PictureService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Uploads a picture
   * @param payload the picture given slug to fetch
   * @returns {Promise<IPicture>} queried picture data
   */
  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  // @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Picture Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Picture Request Failed" })
  async uploadPicture(
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Body() body: PicturePropsPayload,
  ): Promise<IPicture> {
    const { originalname, mimetype, buffer, size } = file;

    const base64 = Buffer.from(buffer).toString("base64");

    const payload = {
      title: originalname,
      contentType: mimetype,
      image: base64,
      size,
      slug: body.slug,
      url: `${this.configService.get("APP_URL")}/api/picture/${body.slug}`,
    };

    const picture = await this.pictureService.create(payload);
    return picture;
  }

  /**
   * Retrieves a particular picture in base64 format
   * @param id the picture given id to fetch
   * @returns {Promise<IPicture>} queried picture data
   */
  @Get(":id")
  @ApiResponse({ status: 200, description: "Fetch Picture Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Picture Request Failed" })
  @Header("Cross-Origin-Resource-Policy", "cross-origin")
  async getPicture(@Param("id") id: string, @Res() res): Promise<any> {
    const picture = await this.pictureService.get(id);
    if (!picture) {
      throw new BadRequestException(
        "The picture with that id could not be found.",
      );
    }
    const buff = Buffer.from(picture.image, "base64");
    res.setHeader("Content-Type", picture.contentType);
    res.setHeader("Content-Length", buff.length);
    return res.send(buff);
  }

  /**
   * Removes a picture from the database
   * @param {string} id the id to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the picture has been deleted
   */
  @Delete(":id")
  // @UseGuards(AuthGuard("jwt"), ACGuard)
  // @UseRoles({
  //   resource: "picture",
  //   action: "delete",
  //   possession: "own",
  // })
  @ApiResponse({ status: 200, description: "Delete Picture Request Received" })
  @ApiResponse({ status: 400, description: "Delete Picture Request Failed" })
  async delete(@Param("id") id: string): Promise<IGenericMessageBody> {
    return await this.pictureService.delete(id);
  }
}
