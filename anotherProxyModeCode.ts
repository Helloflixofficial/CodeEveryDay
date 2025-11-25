import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();

app.use(
    '*',
    cors({
        origin: '*',
        allowHeaders: '*',
        allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
        maxAge: 600,
    })
);

app.all('*', async (c) => {
    const targetUrl = c.req.query('url');
    if (!targetUrl) return c.text('Missing target URL', 400);

    try {
        const url = new URL(targetUrl);
        const targetRequest = new Request(url.toString(), {
            method: c.req.method,
            headers: c.req.headers,
            body: ['GET', 'HEAD'].includes(c.req.method) ? null : c.req.body,
        });

        const response = await fetch(targetRequest);

        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Access-Control-Allow-Methods', '*');
        newHeaders.set('Access-Control-Allow-Headers', 'Content-Type');

        return new Response(response.body, {
            status: response.status,
            headers: newHeaders,
        });
    } catch (err) {
        return c.text('Invalid URL', 400);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
serve({ app, port: PORT });

console.log(`Proxy server running at http://localhost:${PORT}`);
