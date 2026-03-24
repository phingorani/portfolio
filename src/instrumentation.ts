export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { NodeSDK } = await import("@opentelemetry/sdk-node");
    const { getNodeAutoInstrumentations } = await import(
      "@opentelemetry/auto-instrumentations-node"
    );
    const { OTLPTraceExporter } = await import(
      "@opentelemetry/exporter-trace-otlp-http"
    );
    const { resourceFromAttributes } = await import(
      "@opentelemetry/resources"
    );
    const { ATTR_SERVICE_NAME } = await import(
      "@opentelemetry/semantic-conventions"
    );

    const otlpUrl =
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
      "http://tempo.monitoring.svc:4318";

    const sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: "portfolio",
      }),
      traceExporter: new OTLPTraceExporter({
        url: `${otlpUrl}/v1/traces`,
      }),
      instrumentations: [
        getNodeAutoInstrumentations({
          "@opentelemetry/instrumentation-http": {
            ignoreIncomingRequestHook: (req: any) => {
              const url = req.url || "";
              return url.includes("/_next/") || url.includes("/favicon");
            },
          },
          "@opentelemetry/instrumentation-fs": { enabled: false },
          "@opentelemetry/instrumentation-dns": { enabled: false },
        }),
      ],
    });

    sdk.start();
  }
}
