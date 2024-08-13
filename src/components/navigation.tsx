import Link from "next/link";

const Navigation = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-white flex gap-4">
        <Link
          href="/"
          passHref>
          <button className="border border-white p-2">pick players</button>
        </Link>
        <Link
          href="/list"
          passHref>
          <button className="border border-white p-2">view list</button>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Navigation;
