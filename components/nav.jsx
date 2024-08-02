import Image from "next/image";

export default function Nav() {
  const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";
  return (
    <>
      <div className="text-center">
        <Image
          src={`${basePath}/flower.PNG`}
          alt="flower"
          width={1000}
          height={200}
          className="m-auto"
          priority></Image>
      </div>
    </>
  );
}
