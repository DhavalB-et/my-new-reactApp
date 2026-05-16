import { Link } from "react-router-dom";

const Button = ({ 
  text, 
  link, 
  onClick, 
  type = "button", 
  className = "", 
  disabled = false,
  bgClass = "bg-[var(--text-color)]",
  textClass = "text-[var(--white-color)]",
  hoverTextClass = "group-hover:text-[var(--text-color)]",
  hoverBgClass = "bg-[var(--bg-color)]"
}) => {
  const baseClasses = `inline-flex items-center justify-center group relative z-0 h-12 overflow-hidden rounded-[5px] ${bgClass} px-10 py-3 text-[16px] ${textClass} shadow-sm transition-all duration-300 ${disabled ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"} ${className}`;
  
  const content = (
    <>
      <span className={`relative z-10 transition-colors duration-300 ${hoverTextClass}`}>
        {text}
      </span>
      {!disabled && (
        <span className="absolute inset-0 overflow-hidden rounded-[5px]">
          <span className={`absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full ${hoverBgClass} transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150`}></span>
        </span>
      )}
    </>
  );

  if (link) {
    if (link.startsWith("http") || link.startsWith("mailto") || link.startsWith("tel")) {
      return (
        <a href={link} className={baseClasses} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link to={link} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;

