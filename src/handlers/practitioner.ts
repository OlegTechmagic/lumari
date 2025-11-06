import 'tsconfig-paths/register';

import { practitionerRoute } from '@routes';
import { handlerWrapper } from '@utils';

export const handler = handlerWrapper(practitionerRoute);
