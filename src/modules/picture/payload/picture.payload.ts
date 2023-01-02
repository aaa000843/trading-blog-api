import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty, Matches,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PicturePayload {
  /**
   * Title field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  /**
   * Username field
   */
  @ApiProperty()
  @IsNotEmpty()
  description?: string;

  /**
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  contentType: string;

    @ApiProperty({
        required: true,
      })
      @IsNotEmpty()
      image: string;


    /**
   * content type field
   */
    @ApiProperty({
        required: true,
      })
      @IsNotEmpty()
      size: number;
 
}

export class PicturePropsPayload {

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  slug: string;
    /**
   * content type field
   */
}
