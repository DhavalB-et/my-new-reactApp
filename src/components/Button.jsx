

const Button = ({ text, link = "#", className = "" }) => {
  return (
    <a
      href={link}
      className={`group relative z-0 h-12 overflow-hidden rounded-[5px] bg-[var(--text-color)] px-10 py-3 text-[16px] text-[var(--white-color)] shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--text-color)]">
        {text}
      </span>
      <span className="absolute inset-0 overflow-hidden rounded-[5px]">
        <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-[var(--bg-color)] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
      </span>
    </a>
  );
};

export default Button;
