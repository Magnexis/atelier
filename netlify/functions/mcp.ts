import type { Config, Context } from "@netlify/functions";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";

const components = [
  { name: "Signal Toggle", id: "signal-toggle", category: "state", summary: "A two-sided state control with an observable local/share signal." },
  { name: "Ledger Field", id: "ledger-field", category: "input", summary: "A source-aware field with inline provenance and a character budget." },
  { name: "Margin Note", id: "margin-note", category: "feedback", summary: "A nearby system annotation for relevant decisions and state changes." },
  { name: "Compound Action", id: "compound-action", category: "action", summary: "An action that keeps intent, destination, and consequence in one commit path." },
  { name: "Signal Rail", id: "signal-rail", category: "navigation", summary: "A compact workspace index with a persistent active-context signal." },
  { name: "Command Ledger", id: "command-ledger", category: "utility", summary: "Scoped command discovery for local project operations." },
] as const;

const release = {
  version: "1.1.1",
  channel: "pre-release source package",
  notes: [
    "Introduces the local-first Vite Studio and token contract.",
    "Adds Signal Ledger primitives for state provenance and visible intent.",
    "Adds a read-only MCP endpoint for catalog and release discovery.",
  ],
};

function buildServer(): McpServer {
  const server = new McpServer({ name: "atelier-catalog", version: release.version });

  server.tool(
    "list_components",
    "List the public Atelier component families. This is read-only and returns no project or account data.",
    { category: z.string().optional().describe("Optional category filter such as state, input, feedback, action, navigation, or utility.") },
    ({ category }) => {
      const matches = category ? components.filter((component) => component.category === category.toLowerCase()) : components;
      return { content: [{ type: "text", text: JSON.stringify({ components: matches, total: matches.length }, null, 2) }] };
    },
  );

  server.tool(
    "get_component",
    "Read the public contract for one Atelier component by its stable id. This tool is read-only.",
    { id: z.string().min(1).describe("The component id, for example signal-toggle or ledger-field.") },
    ({ id }) => {
      const component = components.find((item) => item.id === id.toLowerCase());
      if (!component) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "not_found", message: `No Atelier component exists with id '${id}'.` }) }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify({ ...component, accessibility: "Keyboard state, visible focus, semantic labeling, and reduced-motion behavior are required before release." }, null, 2) }] };
    },
  );

  server.tool(
    "get_release_notes",
    "Read the current public Atelier release notes and distribution status. This tool is read-only.",
    {},
    () => ({ content: [{ type: "text", text: JSON.stringify(release, null, 2) }] }),
  );

  return server;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
};

export default async (request: Request, _context: Context): Promise<Response> => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return new Response("Method not allowed. Use MCP Streamable HTTP POST.", { status: 405, headers: cors });

  const server = buildServer();
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  Object.entries(cors).forEach(([key, value]) => response.headers.set(key, value));
  return response;
};

export const config: Config = {
  path: "/mcp",
  rateLimit: { windowSize: 60, windowLimit: 60, aggregateBy: ["ip"] },
};
