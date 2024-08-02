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

      <div className="container bg-color">{children}</div>
    </>
  );
}
