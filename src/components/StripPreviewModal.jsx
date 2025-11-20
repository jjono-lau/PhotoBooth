export default function StripPreviewModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <div className="relative z-10 rounded-lg shadow-2xl">
                {children}
            </div>
        </div>
    );
}
