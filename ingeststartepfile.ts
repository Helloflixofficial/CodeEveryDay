
import { inngest } from "./client";
import { createAgent, createTool, gemini } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter";
import { getSandbox } from "./utils";
import z from "zod";
export const helloWorldGemini = inngest.createFunction(
    { id: "hello-world-gemini" },
    { event: "test/hello.world" },
    async ({ event, step }) => {

        const sandboxId = await step.run("get-sandbox-id", async () => {
            const sandbox = await Sandbox.create("vibe-app-demo-2");
            return sandbox.sandboxId;
        });
        const codeAgent = createAgent({
            model: gemini({
                model: "gemini-1.5-flash", // or use "gemini-2.5-pro" if needed
                apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
            }),
            name: "Gemini Dev Assistant",
            system: "You're a helpful AI assistant that helps with development tasks.",
            tools: [
                createTool({
                    name: "Terminal",
                    description: "use the terminal to run the cummands here",
                    parameters: z.object({
                        Command: z.string(),
                    }),
                    handler: async ({ command }, { step }) => {
                        return await step?.run("terminal", async () => {
                            const buffer = { stdout: "", stderr: "" };
                            try {
                                const sandbox = await getSandbox(sandboxId);
                                const result = await sandbox.commands.run(command, {
                                    onStdout: (data: string) => {
                                        buffer.stdout += data;
                                    },
                                    onStderr: (data: string) => {
                                        buffer.stderr += data;
                                    },
                                });
                                return result.stdout;
                            } catch (e) {
                                console.error(`Command faild ${e} \nstdout: ${buffer.stdout}\nstderror: ${buffer.stderr}`,);
                                return `Command faild ${e} \nstdout: ${buffer.stdout}\nstderror: ${buffer.stderr}`;

                            }

                        })

                    }
                })
            ]

        });


        const { output } = await codeAgent.run(
            `Write the foollowing snippet :${event.data.Value}`
        )

        const sandboxUrl = await step.run("get-sandbox-url", async () => {
            const sandbox = await getSandbox(sandboxId);
            const host = sandbox.getHost(3000);
            return `https://${host}`;
        });

        return { output, sandboxUrl };
    }
);
