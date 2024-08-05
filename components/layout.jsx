export default function Layout({ children }) {
  return (
    <>
      <style>
        {`
    .bg-color{
        background-color: #F9F1E7;
    }
        `}
      </style>

      <main
        className="bg-color vw-100 overflow-hidden"
        style={{ height: "2000px" }}>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
