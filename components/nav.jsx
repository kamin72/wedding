import Image from "next/image";
import flowerImage from "../public/flower.PNG";

export default function Nav() {
  //   const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";
  return (
    <>
      <div className="text-center">
        <Image
          src={flowerImage}
          alt="flower"
          width={1000}
          height={200}
          className="m-auto"
          priority></Image>
      </div>
    </>
  );
}
