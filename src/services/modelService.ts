import { CreateMLCEngine, MLCEngine, type InitProgressCallback } from "@mlc-ai/web-llm";

export interface ModelConfig {
       id: string;
       name: string;
       size: string;
       description: string;
       family: string;
}

// Available models optimized for different hardware constraints
export const AVAILABLE_MODELS: ModelConfig[] = [
       {
              id: "Phi-3.5-mini-instruct-q4f32_1-MLC", // Compatible version
              name: "Phi-3.5 Mini (Compatible)",
              size: "2.3GB",
              description: "Fast, smart, and works on most devices (no shader-f16 required).",
              family: "phi3"
       },
       {
              id: "Llama-3.1-8B-Instruct-q4f32_1-MLC", // Compatible version
              name: "Llama 3.1 8B (Compatible)",
              size: "4.6GB",
              description: "Powerful 8B model. Balanced performance. Requires 8GB+ RAM.",
              family: "llama3"
       },
       {
              id: "Hermes-2-Pro-Llama-3-8B-q4f32_1-MLC", // Compatible version
              name: "Hermes 2 Pro (Coding)",
              size: "4.6GB",
              description: "Specialized for coding. Works on most devices.",
              family: "llama3"
       },
       {
              id: "gemma-2b-it-q4f32_1-MLC",
              name: "Gemma 2B (Compatible)",
              size: "1.4GB",
              description: "Google's lightweight model. Very fast.",
              family: "gemma"
       },
       {
              id: "Qwen2-7B-Instruct-q4f32_1-MLC",
              name: "Qwen2 7B",
              size: "4.0GB",
              description: "Balanced performance and speed.",
              family: "qwen2"
       }
];

class ModelService {
       private engine: MLCEngine | null = null;
       private currentModelId: string | null = null;

       async initialize(
              modelId: string,
              onProgress: InitProgressCallback
       ): Promise<void> {
              if (this.engine && this.currentModelId === modelId) {
                     return; // Already loaded
              }

              // Clean up existing engine if we are switching models or re-initializing
              if (this.engine) {
                     try {
                            console.log("Unloading previous engine...");
                            await this.engine.unload();
                            console.log("Previous engine unloaded.");
                     } catch (cleanupError) {
                            console.warn("Error unloading previous engine:", cleanupError);
                            // We continue even if unload fails, as the object might already be disposed
                     } finally {
                            this.engine = null;
                            this.currentModelId = null;
                     }
              }

              try {
                     // Create a new engine instance
                     // We rely on the browser's Cache API via web-llm's internal handling
                     console.log("Starting CreateMLCEngine for", modelId);

                     this.engine = await CreateMLCEngine(modelId, {
                            initProgressCallback: (report) => {
                                   console.log("Progress:", report);
                                   onProgress(report);
                            },
                            logLevel: "INFO", // Change to DEBUG for more verbosity
                     });

                     console.log("Engine created successfully");
                     this.currentModelId = modelId;
              } catch (error) {
                     console.error("Failed to initialize model:", error);
                     // Propagate specific error messages
                     if (error instanceof Error) {
                            const errorMessage = error.message;
                            if (errorMessage.includes("shader-f16")) {
                                   throw new Error(
                                          "This model requires 'shader-f16' which is not supported by your browser/model version. Please try the 'Compatible' versions listed."
                                   );
                            }
                            throw new Error(`Engine Init Failed: ${errorMessage}`);
                     }
                     throw error;
              }
       }

       async generateStreamingResponse(
              messages: { role: "system" | "user" | "assistant"; content: string }[],
              onUpdate: (currentText: string, usage?: unknown) => void,
              onFinish: (finalText: string, usage?: unknown) => void
       ): Promise<void> {
              if (!this.engine) {
                     throw new Error("Engine not initialized");
              }

              let chunks = "";
              try {
                     const completion = await this.engine.chat.completions.create({
                            messages,
                            stream: true,
                            temperature: 0.5, // Lower temperature for code stability
                            max_tokens: 2048,
                     });

                     for await (const chunk of completion) {
                            const delta = chunk.choices[0]?.delta?.content || "";
                            chunks += delta;
                            onUpdate(chunks);
                     }

                     onFinish(chunks);
              } catch (error) {
                     console.error("Generation failed:", error);
                     throw error;
              }
       }

       async getEngine() {
              return this.engine;
       }

       // Method to check if WebGPU is available
       async checkWebGPUAvailability(): Promise<boolean> {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (!(navigator as any).gpu) {
                     return false;
              }
              try {
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     const adapter = await (navigator as any).gpu.requestAdapter();
                     return !!adapter;
              } catch {
                     return false;
              }
       }
}

export const modelService = new ModelService();
