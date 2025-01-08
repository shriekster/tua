import { HttpStatusCode } from "@solidjs/start";
import { useNavigate } from "@solidjs/router";

export default function NotFound() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <HttpStatusCode code={404} />
      <section class="bg-white dark:bg-gray-950">
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Pagina nu există.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Pagina nu a fost găsită, însă vei găsi ceea ce cauți pe pagina de
              pornire.
            </p>
            <button
              class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              onClick={handleHomeButtonClick}
            >
              Acasă
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
