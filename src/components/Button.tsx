
interface IButtonProps {
  text: string;
  _id: string | undefined;
  handler: (...args: any[]) => void;
  className: string;
}

const Button = ({ text, _id, handler, className }: IButtonProps) => {
  const handlerButton = (_id?: string) => {
    if (_id) {
      handler(_id);
    } else {
      handler();
    }
  }
  return (
    <button 
      className={`border px-6 py-2 font-medium rounded-md cursor-pointer ${className} transition-all duration-200 ease-in-out`}
      onClick={() => handlerButton(_id)}
    >
      {text}
    </button>
  )
}

export default Button
