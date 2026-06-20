"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface WaitlistTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TerminalStep = "name" | "email" | "instagram" | "phone" | "goal" | "submitting" | "success" | "error";

export default function WaitlistTerminal({ isOpen, onClose }: WaitlistTerminalProps) {
  const [step, setStep] = useState<TerminalStep>("name");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    phone: "",
    goal: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [generatedKey, setGeneratedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      // Reset state on close
      setStep("name");
      setFormData({ name: "", email: "", instagram: "", phone: "", goal: "" });
      setInputValue("");
      setLogs([]);
      setGeneratedKey("");
      setErrorMessage("");
    }
  }, [isOpen, step]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, step]);

  if (!isOpen) return null;

  const currentStepTitle = {
    name: "01 // IDENTITY REGISTER",
    email: "02 // SECURE VECTOR",
    instagram: "03 // SOCIAL LINK",
    phone: "04 // TELEMETRY NODE",
    goal: "05 // INTENT MANIFEST",
    submitting: "TRANSMITTING DATA",
    success: "ACCESS GRANTED",
    error: "TRANSMISSION FAILURE",
  }[step];

  const handleNext = async (val: string) => {
    const trimmedVal = val.trim();
    if (!trimmedVal) {
      toast.warning("Empty response", { description: "Field cannot be blank in secure sequence." });
      return;
    }

    if (step === "name") {
      setFormData(prev => ({ ...prev, name: trimmedVal }));
      setLogs(prev => [...prev, `> Name logged: "${trimmedVal}"`, `Initializing Step 02...`]);
      setStep("email");
      setInputValue("");
    } else if (step === "email") {
      if (!/\S+@\S+\.\S+/.test(trimmedVal)) {
        toast.warning("Invalid Email", { description: "Provide a valid communications address." });
        return;
      }
      setFormData(prev => ({ ...prev, email: trimmedVal }));
      setLogs(prev => [...prev, `> Email logged: "${trimmedVal}"`, `Initializing Step 03...`]);
      setStep("instagram");
      setInputValue("");
    } else if (step === "instagram") {
      const handle = trimmedVal.startsWith("@") ? trimmedVal : `@${trimmedVal}`;
      setFormData(prev => ({ ...prev, instagram: handle }));
      setLogs(prev => [...prev, `> Instagram logged: "${handle}"`, `Initializing Step 04...`]);
      setStep("phone");
      setInputValue("");
    } else if (step === "phone") {
      setFormData(prev => ({ ...prev, phone: trimmedVal }));
      setLogs(prev => [...prev, `> Telemetry number logged: "${trimmedVal}"`, `Initializing Step 05...`]);
      setStep("goal");
      setInputValue("");
    } else if (step === "goal") {
      const finalData = { ...formData, goal: trimmedVal };
      setFormData(finalData);
      setLogs(prev => [
        ...prev,
        `> Intent logged: "${trimmedVal}"`,
        `All data vectors locked.`,
        `Opening secure port...`
      ]);
      setStep("submitting");
      setInputValue("");
      await submitWaitlist(finalData);
    }
  };

  const submitWaitlist = async (data: typeof formData) => {
    const simulatedLogs = [
      "Establishing connection to Blade Core Vault...",
      "Resolving database namespace 'bladeinnercircle'...",
      "Validating unique candidate footprint...",
      "Encrypting profile vectors (AES-256)...",
      "Broadcasting priority signal...",
    ];

    // Print logs one by one
    for (let i = 0; i < simulatedLogs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setLogs(prev => [...prev, simulatedLogs[i]]);
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to finalize registration.");
      }

      await new Promise(resolve => setTimeout(resolve, 300));
      setLogs(prev => [...prev, `[SUCCESS] Entry accepted. Token signature: ${result.waitlistKey}`, `Initializing priority email...`]);
      setGeneratedKey(result.waitlistKey);
      setStep("success");
    } catch (err: any) {
      console.error(err);
      setLogs(prev => [...prev, `[ERROR] Secure tunnel collapsed. Error: ${err.message}`]);
      setErrorMessage(err.message || "An unknown transmission error occurred.");
      setStep("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext(inputValue);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 font-mono bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl h-[600px] bg-[#030303] border border-[#F3D7A7]/20 rounded-lg flex flex-col overflow-hidden shadow-[0_0_50px_rgba(243,215,167,0.05)] text-left"
        >
          {/* Terminal Title Bar */}
          <div className="flex justify-between items-center bg-[#0a0a0a] border-b border-[#F3D7A7]/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-[#F3D7A7]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/50">
                BLADE // waitlist_sequence.exe
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-[#F3D7A7] transition-all hover:scale-105"
            >
              <X size={18} />
            </button>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4 text-xs md:text-sm text-white/80 select-text leading-relaxed">
            <div className="text-white/30 space-y-1">
              <p>BLADE CORE OPERATING SYSTEM v3.1</p>
              <p>INITIALIZING WAITLIST PROTOCOL FOR COHORT 02 (AUGUST 2026)...</p>
              <p>WARNING: UNIQUE IDENTITY footprint REQUIRED.</p>
              <p>--------------------------------------------------</p>
            </div>

            {/* Render previous logs */}
            {logs.map((log, idx) => (
              <p
                key={idx}
                className={
                  log.startsWith("[SUCCESS]") 
                    ? "text-green-400" 
                    : log.startsWith("[ERROR]") 
                    ? "text-red-500 font-bold" 
                    : log.startsWith(">") 
                    ? "text-[#F3D7A7]/70 font-semibold" 
                    : "text-white/40"
                }
              >
                {log}
              </p>
            ))}

            {/* Prompt steps */}
            {step === "name" && (
              <TerminalPrompt
                prompt="[ACCESS PROTOCOL] Enter your full name:"
                placeholder="e.g. John Doe"
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            )}

            {step === "email" && (
              <TerminalPrompt
                prompt="[COMMUNICATION NODE] Enter email address:"
                placeholder="e.g. john@example.com"
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            )}

            {step === "instagram" && (
              <TerminalPrompt
                prompt="[SOCIAL SPECTRUM] Enter Instagram handle:"
                placeholder="e.g. @john_operator"
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            )}

            {step === "phone" && (
              <TerminalPrompt
                prompt="[TELEMETRY CHANNEL] Enter contact number (with country code):"
                placeholder="e.g. +91 98765 43210"
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            )}

            {step === "goal" && (
              <TerminalPrompt
                prompt="[CORE INTENT] Briefly state your August cohort objective:"
                placeholder="e.g. Scaling video agency to 5 clients..."
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            )}

            {step === "submitting" && (
              <div className="flex items-center gap-3 text-[#F3D7A7] animate-pulse">
                <span className="w-1.5 h-3 bg-[#F3D7A7] inline-block animate-ping" />
                <span>Transmitting vectors...</span>
              </div>
            )}

            {/* Success message */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4 text-left"
              >
                <div className="flex items-center gap-4 text-green-400">
                  <CheckCircle2 size={24} />
                  <span className="font-bold uppercase tracking-widest text-sm">WAITLIST ENROLLMENT COMPLETED</span>
                </div>
                <div className="space-y-2 border-l-2 border-[#F3D7A7] pl-4 text-white/60">
                  <p>Congratulations. Your access profile is verified.</p>
                  <p>A confirmation briefing has been dispatched to <strong className="text-white">{formData.email}</strong>.</p>
                  <p>Your Priority Access Code is: <strong className="text-[#F3D7A7]">{generatedKey}</strong></p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-[#F3D7A7]/20 hover:border-[#F3D7A7] hover:bg-[#F3D7A7]/5 text-[#F3D7A7] uppercase tracking-[0.2em] font-bold text-[10px] transition-all"
                >
                  Exit Terminal
                </button>
              </motion.div>
            )}

            {/* Error message */}
            {step === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4 text-left"
              >
                <div className="flex items-center gap-4 text-red-500">
                  <AlertCircle size={24} />
                  <span className="font-bold uppercase tracking-widest text-sm">TRANSMISSION ENCOUNTERED EXCEPTION</span>
                </div>
                <p className="text-white/60">
                  System responded with failure: {errorMessage}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setStep("name");
                      setLogs([]);
                    }}
                    className="px-6 py-3 bg-red-950/20 border border-red-500/30 hover:border-red-500 text-red-400 uppercase tracking-[0.2em] font-bold text-[10px] transition-all"
                  >
                    Reset Connection
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-white/10 hover:border-white/30 text-white/50 uppercase tracking-[0.2em] font-bold text-[10px] transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Footer Indicator */}
          <div className="bg-[#050505] border-t border-[#F3D7A7]/10 px-6 py-3 flex justify-between items-center text-[10px] tracking-wider text-white/30 font-bold uppercase">
            <span>MODE: waiting_input</span>
            <span>SECTION: {currentStepTitle}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface TerminalPromptProps {
  prompt: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function TerminalPrompt({ prompt, placeholder, value, onChange, onKeyDown, inputRef }: TerminalPromptProps) {
  return (
    <div className="space-y-3 pt-2 text-left">
      <p className="text-white/60 font-bold">{prompt}</p>
      <div className="flex items-center gap-2 text-[#F3D7A7]">
        <ChevronRight size={16} className="text-[#F3D7A7]/60 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#F3D7A7] font-mono text-xs md:text-sm placeholder:text-white/5 caret-current select-text"
        />
      </div>
      <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] pl-6 font-semibold">
        Press [ENTER] to lock vector
      </p>
    </div>
  );
}
