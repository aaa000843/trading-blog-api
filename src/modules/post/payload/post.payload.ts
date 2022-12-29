import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PostPayload {
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
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description: string;

  /**
   * Name field
   */
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  /**
   * Slug field
   */
  @ApiProperty()
  slug: string;
}
