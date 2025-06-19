import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center p-4">
      <h1>Oops!</h1>
      <p>Désolé, quelque chose s'est mal passé. Veuillez réessayer.</p>
      {error?.status && <p>Status: {error.status}</p>}
      <pre>{error.message || 'Erreur serveur'}</pre>
    </div>
  );
};

export default ErrorPage;