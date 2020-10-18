import Image from '../models/Image';

export interface IImageView {
  id: number;
  url: string;
}

export default {
  render(image: Image): IImageView {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): IImageView[] {
    return images.map(image => this.render(image));
  },
};
