import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PatchPostPayload {
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
   * SLug field
   */
  @ApiProperty()
  @IsNotEmpty()
  slug: string;
}
