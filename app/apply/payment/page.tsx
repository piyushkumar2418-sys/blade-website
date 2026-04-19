"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Copy,
  CreditCard,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const joiningFee = "Rs. 749";
const valueAnchor = "Rs. 4,999";

const benefits = [
  {
    description: "Revisit every session, breakdown, and implementation lesson whenever you need it.",
    icon: <PlayCircle size={20} />,
    title: "Recorded session access",
  },
  {
    description: "Learn from invited operators and creators who are actively building in the market.",
    icon: <GraduationCap size={20} />,
    title: "Guest sessions",
  },
  {
    description: "Get the templates, references, and internal resources shared inside the cohort.",
    icon: <Layers size={20} />,
    title: "Resources and systems",
  },
  {
    description: "Join a focused room of selected candidates committed to execution over theory.",
    icon: <ShieldCheck size={20} />,
    title: "Cohort access",
  },
];

const paymentMethods = [
  {
    icon: <CreditCard size={18} />,
    id: "upi-qr",
    label: "UPI QR",
    shortDescription: "Scan and pay using any app.",
  },
  {
    icon: <Building2 size={18} />,
    id: "bank",
    label: "Bank Transfer",
    shortDescription: "IMPS, NEFT, or Bank App.",
  },
] as const;

type PaymentMethodId = (typeof paymentMethods)[number]["id"];

const paymentConfig = {
  accountName: process.env.NEXT_PUBLIC_BIC_BANK_ACCOUNT_NAME || "Blade Inner Circle",
  accountNumber: process.env.NEXT_PUBLIC_BIC_BANK_ACCOUNT_NUMBER || "Add account number",
  bankName: process.env.NEXT_PUBLIC_BIC_BANK_NAME || "Add bank name",
  contactEmail: process.env.NEXT_PUBLIC_BIC_CONTACT_EMAIL || "admissions@bladeinnercircle.com",
  ifsc: process.env.NEXT_PUBLIC_BIC_BANK_IFSC || "Add IFSC code",
  upiId: process.env.NEXT_PUBLIC_BIC_UPI_ID || "yourupi@bank",
  upiName: process.env.NEXT_PUBLIC_BIC_UPI_NAME || "Blade Inner Circle",
};

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>("upi-qr");
  const [submitted, setSubmitted] = useState(false);
  const [proofFileName, setProofFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    selectionCode: "",
    transactionId: "",
    transactionTime: "",
  });
  const [copiedField, setCopiedField] = useState("");

  const upiLink = useMemo(() => {
    return `upi://pay?pa=${paymentConfig.upiId}&pn=${encodeURIComponent(paymentConfig.upiName)}&am=749&cu=INR`;
  }, []);

  const qrImageUrl = useMemo(() => {
    const encodedLink = encodeURIComponent(upiLink);
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodedLink}`;
  }, [upiLink]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleOpenUpi = () => {
    window.location.href = upiLink;
    setErrorMessage("UPI apps usually do not open in this desktop browser. Scan the QR with your phone or use the copied UPI ID.");
  };

  const handleSubmitProof = () => {
    if (!form.name || !form.email || !form.transactionId) {
      setErrorMessage("Please fill in Name, Email, and Transaction ID.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f3eb] text-black selection:bg-[#d9b465] selection:text-black">
      <nav className="border-b border-black/10 bg-white/75 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black">
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
      </nav>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d9b465]/50 bg-[#d9b465]/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8a6522]">
              <BadgeCheck size={14} />
              Candidate Selected
            </div>
            <div className="max-w-4xl">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.45em] text-black/45">
                Blade Inner Circle / Admission Confirmation
              </p>
              <h1 className="max-w-4xl text-6xl font-bold leading-[0.95] tracking-tight text-black md:text-7xl" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>
                Confirm Your Seat.
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-black/68">
                Your application has been selected. Complete the joining payment of{" "}
                <span className="font-semibold text-black">{joiningFee}</span> to secure your seat.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-black/10 bg-black/10 md:grid-cols-3">
              <SimpleStat kicker="Cohort Format" title="8 Week Program" />
              <SimpleStat kicker="Session Structure" title="Live + Recorded" />
              <SimpleStat kicker="What You Receive" title="Sessions + Resources" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="rounded-[2rem] border border-black/10 bg-[#fbfaf6] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.06)] md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Payment Details</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>
              Pay and submit proof.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-black/60">
              Use UPI to complete the payment, then share the transaction reference for verification.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Joining Fee</p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>{joiningFee}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/58">Choose one of the UPI options below.</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-start gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-bold uppercase tracking-[0.16em] transition-all ${
                    selectedMethod === method.id ? "border-[#d9b465] bg-[#d9b465]/12 text-black" : "border-black/10 bg-white text-black"
                  }`}
                >
                  <span className="text-[#9b7328]">{method.icon}</span>
                  <span>{method.label}</span>
                  <span className="text-[11px] font-normal normal-case tracking-normal text-black/55">{method.shortDescription}</span>
                </button>
              ))}
            </div>

            <PaymentMethodPanel
              copiedField={copiedField}
              onCopy={handleCopy}
              onOpenUpi={handleOpenUpi}
              qrImageUrl={qrImageUrl}
              selectedMethod={selectedMethod}
              upiLink={upiLink}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }} className="rounded-[2rem] border border-black/10 bg-[#fbfaf6] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.06)] md:p-8">
            {!submitted ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Submit Payment Proof</p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>
                  Share reference.
                </h2>
                <div className="mt-8 space-y-5">
                  <InputField label="Candidate Name" onChange={handleChange("name")} placeholder="Your full name" value={form.name} />
                  <InputField label="Email Address" onChange={handleChange("email")} placeholder="name@email.com" value={form.email} />
                  <InputField label="WhatsApp Number" onChange={handleChange("phone")} placeholder="+91 98765 43210" value={form.phone} />
                  <InputField label="Transaction ID / UTR" onChange={handleChange("transactionId")} placeholder="Enter reference number" value={form.transactionId} />
                  
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-black/45">Screenshot Proof (Optional)</span>
                    <div className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-black/20 bg-[#faf8f2] px-4 py-4 text-sm text-black/60">
                      <ImageIcon size={18} className="text-[#9b7328]" />
                      <span>{proofFileName || "Select screenshot"}</span>
                      <input type="file" className="hidden" onChange={(e) => setProofFileName(e.target.files?.[0]?.name || "")} />
                    </div>
                  </label>

                  {errorMessage && <div className="rounded-xl bg-red-50 p-4 text-xs text-red-600 font-bold uppercase tracking-widest">{errorMessage}</div>}
                  
                  <button onClick={handleSubmitProof} className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-5 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all hover:bg-[#d9b465] hover:text-black">
                    Submit For Verification <ArrowUpRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-[1.75rem] bg-black p-8 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9b465] text-black"><CheckCircle2 size={26} /></div>
                <h2 className="mt-6 text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>Proof ready.</h2>
                <p className="mt-4 text-base leading-relaxed text-white/68">We will verify your transaction and confirm your seat via email/WhatsApp shortly.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f3eb] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_55px_rgba(0,0,0,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5ecd9] text-[#9b7328]">{benefit.icon}</div>
              <h2 className="mt-6 text-[1.5rem] font-bold leading-tight tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>{benefit.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-black/40">Blade Inner Circle / Admission Portal</p>
          <p className="text-lg text-black/55 font-bold uppercase tracking-tighter" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>Selected candidates only.</p>
        </div>
      </footer>
    </main>
  );
}

function PaymentMethodPanel({ selectedMethod, qrImageUrl, onCopy, copiedField, onOpenUpi }: any) {
  if (selectedMethod === "upi-qr") {
    return (
      <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl border border-black/5 bg-[#faf8f2] p-8 md:flex-row">
        <img src={qrImageUrl} alt="UPI QR" className="h-48 w-48 rounded-2xl border border-black/10 bg-white p-2" />
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Scan To Pay</p>
          <h3 className="mt-3 text-2xl font-bold uppercase tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>Mobile UPI App</h3>
          <p className="mt-3 text-sm text-black/60">Scan this code using PhonePe, GPay, or Paytm.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onOpenUpi} className="rounded-full border border-black/10 px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Open App</button>
            <button onClick={() => onCopy(paymentConfig.upiId, "upi-id")} className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-[10px] font-bold uppercase tracking-widest">
              <Copy size={14} /> {copiedField === "upi-id" ? "Copied" : "Copy ID"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[1.75rem] border border-black/10 bg-white p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Bank Transfer</p>
      <h3 className="mt-3 text-2xl font-bold uppercase tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>IMPS / NEFT Details</h3>
      <div className="mt-6 space-y-4">
        <DetailRow label="Bank" value={paymentConfig.bankName} onCopy={() => onCopy(paymentConfig.bankName, "bank")} copied={copiedField === "bank"} />
        <DetailRow label="A/C Holder" value={paymentConfig.accountName} onCopy={() => onCopy(paymentConfig.accountName, "name")} copied={copiedField === "name"} />
        <DetailRow label="A/C Number" value={paymentConfig.accountNumber} onCopy={() => onCopy(paymentConfig.accountNumber, "acc")} copied={copiedField === "acc"} />
        <DetailRow label="IFSC" value={paymentConfig.ifsc} onCopy={() => onCopy(paymentConfig.ifsc, "ifsc")} copied={copiedField === "ifsc"} />
      </div>
    </div>
  );
}

function DetailRow({ label, value, onCopy, copied }: any) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-black/5 bg-[#faf8f2] px-4 py-3">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">{label}</p>
        <p className="text-sm font-bold text-black">{value}</p>
      </div>
      {onCopy && (
        <button onClick={onCopy} className="rounded-full bg-white p-2 text-black shadow-sm hover:bg-[#d9b465] transition-all">
          {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
        </button>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-black/45">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-bold outline-none focus:border-[#d9b465] transition-all"
      />
    </label>
  );
}

function SimpleStat({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="bg-white px-6 py-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-black/42">{kicker}</p>
      <p className="mt-4 text-[2rem] font-bold leading-[1.02] tracking-tight text-black" style={{ fontFamily: "Helvetica-Bold, sans-serif" }}>{title}</p>
    </div>
  );
}