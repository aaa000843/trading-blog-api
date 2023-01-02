import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
  } from '@nestjs/common';
  import * as sharp from 'sharp';
  import * as path from 'path';

  const formatImage = async (image: Express.Multer.File) => {
    try {
      // resize to width of 500px auto scaled height to webp format
    const {data} = await sharp(image.buffer).resize(500).webp({effort: 3}).toBuffer({resolveWithObject: true})

    const originalname = `${path.parse(image.originalname).name}.webp`;

    image = {...image, originalname, size: data.toString().length, mimetype: 'image/webp', buffer: data};

    return image
    } catch(e) {
      console.log(e);
      return image
    }
  }
  
  @Injectable()
  export class ParseFile implements PipeTransform {
    async transform(
      file: Express.Multer.File,
      metadata: ArgumentMetadata,
    ): Promise<Express.Multer.File | Express.Multer.File[]> {
      if (file === undefined || file === null) {
        throw new BadRequestException('Validation failed (file expected)');
      }

      if(!file.mimetype.includes('image')) {
        throw new BadRequestException('Validation failed (image expected)');
      }

      if(file.size > 1000 * 1000) {
        throw new BadRequestException('Validation failed (size > 1 MB)');
      }

      // convert image to webp
      const webpImage = await formatImage(file)
  
      return webpImage;
    }
  }

  // ref: https://notiz.dev/blog/type-safe-file-uploads