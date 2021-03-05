import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn:
      "https://39966b102dd94ae6a7d563bfbf417fa1@o543435.ingest.sentry.io/5664071",
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
