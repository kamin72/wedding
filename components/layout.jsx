export default function Layout({ children }) {
  return (
    <>
      <style>
        {`
    .bg-color{
        background-color: #FFFBF7;
    }
        `}
      </style>

      <main className="bg-color ">
        <div className="container">{children}</div>
      </main>
    </>
  );
}
