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
        style={{ height: "1300px" }}>
        <div className="container" style={{ height: "1250px" }}>
          {children}
        </div>
      </main>
    </>
  );
}
