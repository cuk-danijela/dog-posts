import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page text-center">
      <h1>Oops!</h1>
      <p className="text-white">Sorry, an unexpected error has occurred.</p>
      <p className="text-white">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}