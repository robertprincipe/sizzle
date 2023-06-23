import { Link } from "react-router-dom";
import NotFound from "@/assets/images/404.png";

const NotFoundPage = () => {
  return (
    <div className="grid h-screen grid-cols-1 py-6 mb-3 bg-white lg:grid-cols-2 dark:bg-indigo-500 sm:py-8 lg:py-12">
      <div className="text-center">
        <img src={NotFound} className="mx-auto h-96" alt="alt" />
        <p className="text-base font-semibold text-indigo-600">Error 404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-app-dark sm:text-5xl dark:text-light">
          Pagina No Encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-dark dark:text-light">
          No encontramos el recurso que estas buscando
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-light shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="mt-6 text-base leading-7 text-center text-dark dark:text-light">
          O quizas estas buscando...
        </p>
        <div className="px-6 divide-y divide-muted dark:divide-dark lg:w-[420px]">
          <div className="flex py-6 gap-x-7">
            <svg
              className="mt-1.5 h-6 w-6 shrink-0 text-dark dark:text-muted"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <div>
              <h3 className="font-semibold text-dark dark:text-muted">
                Knowledgebase
              </h3>
              <p className="mt-1 text-sm text-muted">
                Were here to help with any questions or code.
              </p>
              <a
                className="inline-flex items-center mt-2 text-sm font-medium text-dark gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
                href="#"
              >
                Contact support
                <svg
                  className="h-2.5 w-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex py-6 gap-x-7">
            <svg
              className="mt-1.5 h-6 w-6 shrink-0 text-dark dark:text-muted"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-dark dark:text-muted">FAQ</h3>
              <p className="mt-1 text-sm text-muted">
                Search our FAQ for answers to anything you might ask.
              </p>
              <a
                className="inline-flex items-center mt-2 text-sm font-medium text-dark gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
                href="#"
              >
                Visit FAQ
                <svg
                  className="h-2.5 w-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex py-6 gap-x-7">
            <svg
              className="mt-1.5 h-6 w-6 shrink-0 text-dark dark:text-muted"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z" />
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z" />
            </svg>
            <div>
              <h3 className="font-semibold text-dark dark:text-muted">
                Developer APIs
              </h3>
              <p className="mt-1 text-sm text-muted">
                Check out our development quickstart guide.
              </p>
              <a
                className="inline-flex items-center mt-2 text-sm font-medium text-dark gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
                href="#"
              >
                Contact sales
                <svg
                  className="h-2.5 w-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex py-6 gap-x-7">
            <svg
              className="mt-1.5 h-6 w-6 shrink-0 text-dark dark:text-muted"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            <div>
              <h3 className="font-semibold text-dark dark:text-muted">
                Contact us by email
              </h3>
              <p className="mt-1 text-sm text-muted">
                If you wish to write us an email instead please use
              </p>
              <a
                className="inline-flex items-center mt-2 text-sm font-medium text-dark gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
                href="#"
              >
                example@site.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
