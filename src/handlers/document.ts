import 'tsconfig-paths/register';

import { documentRoute } from '@routes';
import { handlerWrapper } from '@utils';
export const handler = handlerWrapper(documentRoute);
