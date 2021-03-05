import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn:
      "https://37884161b2164c1b812c06edc58959ff@o543435.ingest.sentry.io/5664000",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  init,
  log,
};
