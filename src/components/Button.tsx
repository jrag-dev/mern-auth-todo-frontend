
interface IButtonProps {
  text: string;
  handler: () => void;
  className: string;
}

const Button = ({ text, handler, className }: IButtonProps) => {
  return (
    <button 
      className={`border px-6 py-2 font-medium rounded-md cursor-pointer ${className} transition-all duration-200 ease-in-out`}
      onClick={() => handler()}
    >
      {text}
    </button>
  )
}

export default Button
