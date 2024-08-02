import Image from "next/image";

export default function Nav() {
  return (
    <>
      <div className="text-center">
        <Image
          src="/flower.PNG"
          alt="flower"
          width={1000}
          height={200}
          className="m-auto"
          priority></Image>
      </div>
    </>
  );
}
