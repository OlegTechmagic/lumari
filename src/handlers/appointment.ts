import 'tsconfig-paths/register';

import { appointmentRoute } from '@routes';
import { handlerWrapper } from '@utils';

export const handler = handlerWrapper(appointmentRoute);
