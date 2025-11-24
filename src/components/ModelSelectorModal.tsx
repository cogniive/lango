"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";

type Model = {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  available: boolean;
  comingSoon?: boolean;
};

type ModelSelectorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
};

const models: Model[] = [
  {
    id: "chatgpt-5-mini",
    name: "ChatGPT-5-mini",
    icon: "C",
    iconBg: "from-teal-400 to-teal-600",
    available: true,
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    icon: "S",
    iconBg: "from-purple-400 to-purple-600",
    available: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: "G",
    iconBg: "from-blue-400 to-blue-600",
    available: true,
  },
  {
    id: "claude",
    name: "Claude",
    icon: "C",
    iconBg: "from-orange-400 to-orange-600",
    available: true,
  },
  {
    id: "dall-e-3",
    name: "Dall-e-3",
    icon: "D",
    iconBg: "from-gray-700 to-gray-900",
    available: true,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: "P",
    iconBg: "from-cyan-400 to-cyan-600",
    available: true,
  },
  {
    id: "grok",
    name: "Grok",
    icon: "G",
    iconBg: "from-gray-600 to-gray-800",
    available: true,
  },
  {
    id: "chatgpt-4o-mini",
    name: "ChatGPT-4o-mini",
    icon: "C",
    iconBg: "from-teal-400 to-teal-600",
    available: true,
  },
  {
    id: "flux",
    name: "Flux",
    icon: "F",
    iconBg: "from-emerald-400 to-emerald-600",
    available: false,
    comingSoon: true,
  },
];

const ModelSelectorModal = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
}: ModelSelectorModalProps) => {
  const handleSelectModel = (modelId: string, available: boolean) => {
    if (available) {
      onSelectModel(modelId);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-base font-semibold">
            Select Model
          </DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[400px] overflow-y-auto">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => handleSelectModel(model.id, model.available)}
              disabled={!model.available}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                !model.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${model.iconBg} flex items-center justify-center text-white text-sm font-semibold`}>
                  {model.icon}
                </div>
                <span className="font-medium text-gray-900">{model.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {model.comingSoon && (
                  <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">
                    COMING SOON
                  </span>
                )}
                {selectedModel === model.id && model.available && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelectorModal;
