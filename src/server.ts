/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIG } from '@config';
import { appointmentRoute, documentRoute, patientRoute, practitionerRoute } from '@routes';
import http from 'http';
import { URL } from 'url';

const routes: { [key: string]: any } = {
  '/patients': patientRoute,
  '/document': documentRoute,
  '/appointment': appointmentRoute,
  '/practitioner': practitionerRoute,
};

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Bad Request' }));
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  const routeHandler = routes[parsedUrl.pathname];

  if (!routeHandler) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  let body = '';
  if (req.method === 'POST' || req.method === 'PUT') {
    for await (const chunk of req) {
      body += chunk;
    }
  }

  try {
    const response = await routeHandler({
      method: req.method,
      pathname: parsedUrl.pathname,
      query: Object.fromEntries(parsedUrl.searchParams),
      body: body ? JSON.parse(body) : undefined,
    });
    res.statusCode = response.statusCode ?? 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.body));
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message ?? 'Internal Server Error' }));
  }
});

const PORT = CONFIG.PORT;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
