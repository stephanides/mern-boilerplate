import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import nextjsApp from 'next';
import cors from 'cors';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import db from './db';

const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = nextjsApp({ dev });
const handle = nextApp.getRequestHandler();
const port: number = 3000;

const App: () => Promise<void> = async () => {
  try {
    await nextApp.prepare();

    const app: Express = express();

    app.use(
      helmet(),
      cors(),
      express.urlencoded({ extended: true, limit: '10mb' }),
      express.json({ limit: '10mb' })
    );

    const server = new ApolloServer({
      context: ({ req }) => ({ token: req.headers['x-access-token'] }),
      typeDefs,
      resolvers,
      introspection: true,
      playground: dev
        ? {
            endpoint: 'api',
            settings: {
              'editor.theme': 'light',
            },
          }
        : true,
    });

    server.applyMiddleware({ app, path: '/api' });
    await db();
    //await setup();

    app.all('*', (req, res) => handle(req, res));

    app.listen({ port });

    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default App;
