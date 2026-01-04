import { useState, useCallback, useEffect } from 'react';
import { modelService, AVAILABLE_MODELS, type ModelConfig } from '../services/modelService';
import type { InitProgressReport } from '@mlc-ai/web-llm';

export interface Message {
       role: 'user' | 'assistant' | 'system';
       content: string;
}

export interface ModelStats {
       loaded: boolean;
       loading: boolean;
       progress: InitProgressReport | null;
       error: string | null;
}

export function useModel() {
       const [modelStats, setModelStats] = useState<ModelStats>({
              loaded: false,
              loading: false,
              progress: null,
              error: null,
       });

       const [currentModel, setCurrentModel] = useState<ModelConfig | null>(null);

       // Check WebGPU support on mount
       useEffect(() => {
              modelService.checkWebGPUAvailability().then(isAvailable => {
                     if (!isAvailable) {
                            setModelStats(prev => ({ ...prev, error: "WebGPU is not supported in this browser. Please use Chrome 113+, Edge 113+, or Safari 18+." }));
                     }
              });
       }, []);

       const loadModel = useCallback(async (modelId: string) => {
              const selectedModel = AVAILABLE_MODELS.find(m => m.id === modelId);
              if (!selectedModel) return;

              setCurrentModel(selectedModel);
              setModelStats(prev => ({ ...prev, loading: true, error: null }));

              try {
                     await modelService.initialize(modelId, (report: InitProgressReport) => {
                            setModelStats(prev => ({ ...prev, progress: report }));
                     });
                     setModelStats(prev => ({ ...prev, loaded: true, loading: false }));
              } catch (err: unknown) {
                     const errorMessage = err instanceof Error ? err.message : "Failed to load model";
                     setModelStats(prev => ({
                            ...prev,
                            loading: false,
                            error: errorMessage
                     }));
              }
       }, []);

       const generateResponse = useCallback(async (
              history: Message[],
              onUpdate: (text: string) => void
       ) => {
              if (!modelStats.loaded) {
                     throw new Error("Model not loaded");
              }

              // Convert internal message format to WebLLM format if needed
              // (Our Message interface matches WebLLM's expectation simplified)
              await modelService.generateStreamingResponse(
                     history,
                     onUpdate,
                     () => {
                            // Final callback if needed
                     }
              );
       }, [modelStats.loaded]);

       return {
              modelStats,
              currentModel,
              availableModels: AVAILABLE_MODELS,
              loadModel,
              generateResponse
       };
}
