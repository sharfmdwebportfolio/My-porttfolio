"use client";

export default function PatentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-2xl font-bold">shield_lock</span>
            <div>
              <h3 className="font-headline-md text-base md:text-lg font-bold text-primary">Patent Details</h3>
              <p className="text-xs text-on-surface-variant">UK Approved Patent (2025)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:text-secondary flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scroll">
          <div>
            <h4 className="font-headline-md text-lg font-bold text-primary mb-2">
              Cyberattack Detection and Prevention Device
            </h4>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              This patented device integrates real-time network packets monitoring with advanced Machine Learning classifiers at the firmware level. It is designed to proactively discover anomaly indicators in Management Information Systems (MIS) and secure corporate databases.
            </p>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant space-y-4">
            <h5 className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider text-center">
              System Architecture Flow
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
              <div className="p-3 bg-white border border-outline-variant rounded-lg">
                <span className="material-symbols-outlined text-secondary text-2xl mb-1">router</span>
                <p className="font-headline-md text-xs font-bold text-primary">1. Packet Sniffer</p>
                <p className="text-[10px] text-on-surface-variant mt-1">Monitors active LAN/WAN network packets.</p>
              </div>
              <div className="flex justify-center rotate-90 md:rotate-0">
                <span className="material-symbols-outlined text-outline">arrow_forward</span>
              </div>
              <div className="p-3 bg-white border border-outline-variant rounded-lg">
                <span className="material-symbols-outlined text-secondary text-2xl mb-1">psychology</span>
                <p className="font-headline-md text-xs font-bold text-primary">2. Edge ML Engine</p>
                <p className="text-[10px] text-on-surface-variant mt-1">Predicts threat patterns in real-time.</p>
              </div>
              <div className="flex justify-center rotate-90 md:rotate-0 col-span-1 md:col-span-3">
                <span className="material-symbols-outlined text-outline">arrow_downward</span>
              </div>
              <div className="p-3 bg-deep-navy text-white rounded-lg md:col-span-3">
                <span className="material-symbols-outlined text-electric-cyan text-2xl mb-1">notifications_active</span>
                <p className="font-headline-md text-xs font-bold">3. Enterprise MIS Integration</p>
                <p className="text-[10px] text-white/70 mt-1">Triggers auto-block firewall protocols and sends metrics to MIS dashboards.</p>
              </div>
            </div>
          </div>

          {/* Device Features list */}
          <div className="space-y-3">
            <h4 className="font-headline-md text-sm font-bold text-primary">Key Specifications &amp; Features</h4>
            <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              <li><strong>Zero-Latency Processing:</strong> Inline filtering operating directly on hardware NIC drivers.</li>
              <li><strong>Dynamic Model Updates:</strong> Can download new threat models from secure cloud containers.</li>
              <li><strong>Dual-Action Defense:</strong> Automatically isolates compromised local nodes while notifying the database administrator.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-high rounded-lg text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <a
            href="mailto:sharfuddin.md50@yahoo.com?subject=Inquiry regarding Cyberattack Detection Patent"
            className="px-5 py-2 bg-secondary text-white hover:bg-primary rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
          >
            Inquire Details
            <span className="material-symbols-outlined text-[14px]">mail</span>
          </a>
        </div>
      </div>
    </div>
  );
}
