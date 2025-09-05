interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-2xl transition-all duration-200 active:scale-95 hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  )