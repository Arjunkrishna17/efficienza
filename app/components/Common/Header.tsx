import Image from "next/image";

const Header = () => {
  return (
    <div className="flex w-full h-20 items-center px-10 py-10 space-x-2 ">
      <Image src="/logo.svg" alt="efficienza" width={40} height={40} />
      <h3 className="font-bold">Efficienza</h3>
    </div>
  );
};

export default Header;
