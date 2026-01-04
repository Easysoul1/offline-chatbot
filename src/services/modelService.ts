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
              id: "Phi-3-mini-4k-instruct-q4f16_1-MLC", // ~2.3GB, good for 4GB RAM
              name: "Phi-3 Mini (Lite)",
              size: "2.3GB",
              description: "Fastest. Best for low-memory devices (4GB RAM).",
              family: "phi3"
       },
       {
              id: "Llama-3.1-8B-Instruct-q4f16_1-MLC", // ~4.6GB
              name: "Llama 3.1 8B (Balanced)",
              size: "4.6GB",
              description: "Better reasoning. Requires 8GB+ RAM.",
              family: "llama3"
       },
       {
              id: "Hermes-2-Pro-Llama-3-8B-q4f16_1-MLC", // ~4.6GB
              name: "Hermes 2 Pro (Coding)",
              size: "4.6GB",
              description: "Specialized for coding tasks. Requires 8GB+ RAM.",
              family: "llama3"
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

              try {
                     // Create a new engine instance
                     // We rely on the browser's Cache API via web-llm's internal handling
                     this.engine = await CreateMLCEngine(modelId, {
                            initProgressCallback: onProgress,
                            logLevel: "INFO", // Change to DEBUG for more verbosity
                     });
                     this.currentModelId = modelId;
              } catch (error) {
                     console.error("Failed to initialize model:", error);
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
