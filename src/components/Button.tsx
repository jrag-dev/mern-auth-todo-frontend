

interface IButtonProps {
  text: string;
}

const Button = ({ text }: IButtonProps) => {
  return (
    <button className="border border-slate-600 px-6 py-1.5 text-slate-500 rounded-md cursor-pointer">
      {text}
    </button>
  )
}

export default Button
