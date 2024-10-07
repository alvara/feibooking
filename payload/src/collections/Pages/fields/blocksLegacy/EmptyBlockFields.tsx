import type { Block } from 'payload/types';
import { reactGridLayoutFields } from '../blocks/ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const EmptyBlockFields: Block = {
  slug: 'EmptyBlock', // required
  fields: [...reactGridLayoutFields],
};
