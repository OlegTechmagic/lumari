import 'tsconfig-paths/register';

import { patientRoute } from '@routes';
import { handlerWrapper } from '@utils';

export const handler = handlerWrapper(patientRoute);
