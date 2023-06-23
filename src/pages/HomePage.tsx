import Hero from "@/components/molecules/Hero";
import Head from "@/components/shared/Head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  return (
    <>
      <Head title="Inicio" />
      <Hero />
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group flex h-full flex-col rounded-xl border border-border shadow-sm dark:border-muted dark:bg-dark bg-[#fff]">
            <div className="flex flex-col items-center justify-center bg-link h-52 rounded-t-xl">
              <svg
                className="h-28 w-28"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="56" height="56" rx="10" fill="white" />
                <path
                  d="M20.2819 26.7478C20.1304 26.5495 19.9068 26.4194 19.6599 26.386C19.4131 26.3527 19.1631 26.4188 18.9647 26.5698C18.848 26.6622 18.7538 26.78 18.6894 26.9144L10.6019 43.1439C10.4874 43.3739 10.4686 43.6401 10.5496 43.884C10.6307 44.1279 10.805 44.3295 11.0342 44.4446C11.1681 44.5126 11.3163 44.5478 11.4664 44.5473H22.7343C22.9148 44.5519 23.0927 44.5037 23.2462 44.4084C23.3998 44.3132 23.5223 44.1751 23.5988 44.011C26.0307 38.9724 24.5566 31.3118 20.2819 26.7478Z"
                  fill="url(#paint0_linear_2204_541)"
                />
                <path
                  d="M28.2171 11.9791C26.201 15.0912 25.026 18.6755 24.8074 22.3805C24.5889 26.0854 25.3342 29.7837 26.9704 33.1126L32.403 44.0113C32.4833 44.1724 32.6067 44.3079 32.7593 44.4026C32.912 44.4973 33.088 44.5475 33.2675 44.5476H44.5331C44.6602 44.5479 44.7861 44.523 44.9035 44.4743C45.0209 44.4257 45.1276 44.3543 45.2175 44.2642C45.3073 44.1741 45.3785 44.067 45.427 43.9492C45.4755 43.8314 45.5003 43.7052 45.5 43.5777C45.5001 43.4274 45.4659 43.2791 45.3999 43.1441L29.8619 11.9746C29.7881 11.8184 29.6717 11.6864 29.5261 11.594C29.3805 11.5016 29.2118 11.4525 29.0395 11.4525C28.8672 11.4525 28.6984 11.5016 28.5529 11.594C28.4073 11.6864 28.2908 11.8184 28.2171 11.9746V11.9791Z"
                  fill="#2684FF"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2204_541"
                    x1="24.734"
                    y1="29.2284"
                    x2="16.1543"
                    y2="44.0429"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0052CC" />
                    <stop offset="0.92" stopColor="#2684FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-link dark:text-link">
                Atlassian API
              </span>
              <h3 className="text-xl font-semibold dark:text-light dark:hover:text-light">
                Atlassian
              </h3>
              <p className="mt-3 text-[#5d6668] dark:text-[#bdcece]">
                A software that develops products for software developers and
                developments.
              </p>
            </div>
            <div className="flex mt-auto border-t divide-x border-border divide-border dark:divide-muted dark:border-muted">
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-bl-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View sample
              </a>
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-br-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View API
              </a>
            </div>
          </div>

          <div className="group flex h-full flex-col rounded-xl border border-border shadow-sm dark:border-muted dark:bg-dark bg-[#fff]">
            <div className="flex flex-col items-center justify-center h-52 rounded-t-xl bg-rose-500">
              <svg
                className="h-28 w-28"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="56" height="56" rx="10" fill="white" />
                <g clipPath="url(#clip0_2204_541)">
                  <path
                    d="M37.0409 28.8697C33.1968 28.8697 30.0811 31.9854 30.0811 35.8288C30.0811 39.6726 33.1968 42.789 37.0409 42.789C40.8843 42.789 44 39.6726 44 35.8288C44 31.9854 40.8843 28.8697 37.0409 28.8697ZM18.9594 28.8701C15.116 28.8704 12 31.9854 12 35.8292C12 39.6726 15.116 42.7886 18.9594 42.7886C22.8032 42.7886 25.9192 39.6726 25.9192 35.8292C25.9192 31.9854 22.8032 28.8701 18.9591 28.8701H18.9594ZM34.9595 20.1704C34.9595 24.0138 31.8438 27.1305 28.0004 27.1305C24.1563 27.1305 21.0406 24.0138 21.0406 20.1704C21.0406 16.3269 24.1563 13.2109 28.0003 13.2109C31.8438 13.2109 34.9591 16.3269 34.9591 20.1704H34.9595Z"
                    fill="url(#paint0_radial_2204_541)"
                  />
                </g>
                <defs>
                  <radialGradient
                    id="paint0_radial_2204_541"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28.0043 29.3944) scale(21.216 19.6102)"
                  >
                    <stop stopColor="#FFB900" />
                    <stop offset="0.6" stopColor="#F95D8F" />
                    <stop offset="0.999" stopColor="#F95353" />
                  </radialGradient>
                  <clipPath id="clip0_2204_541">
                    <rect
                      width="32"
                      height="29.5808"
                      fill="white"
                      transform="translate(12 13.2096)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-rose-600 dark:text-rose-500">
                Asana API
              </span>
              <h3 className="text-xl font-semibold dark:hover:text-light">
                Asana
              </h3>
              <p className="mt-3 text-[#c7cdce]">
                Track tasks and projects, use agile boards, measure progress.
              </p>
            </div>
            <div className="flex mt-auto border-t divide-x border-border divide-border dark:divide-muted dark:border-muted">
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-bl-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View sample
              </a>
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-br-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View API
              </a>
            </div>
          </div>

          <div className="group flex h-full flex-col rounded-xl border border-border shadow-sm dark:border-muted dark:bg-dark bg-[#fff]">
            <div className="flex flex-col items-center justify-center h-52 rounded-t-xl bg-amber-500">
              <svg
                className="h-28 w-28"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="56" height="56" rx="10" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.7326 11.968C21.9637 11.9693 20.5321 13.4049 20.5334 15.1738C20.5321 16.9427 21.965 18.3782 23.7339 18.3795H26.9345V15.1751C26.9358 13.4062 25.5029 11.9706 23.7326 11.968C23.7339 11.968 23.7339 11.968 23.7326 11.968M23.7326 20.5184H15.2005C13.4316 20.5197 11.9987 21.9553 12 23.7242C11.9974 25.4931 13.4303 26.9286 15.1992 26.9312H23.7326C25.5016 26.9299 26.9345 25.4944 26.9332 23.7255C26.9345 21.9553 25.5016 20.5197 23.7326 20.5184V20.5184Z"
                  fill="#36C5F0"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M44.0001 23.7242C44.0014 21.9553 42.5684 20.5197 40.7995 20.5184C39.0306 20.5197 37.5977 21.9553 37.599 23.7242V26.9312H40.7995C42.5684 26.9299 44.0014 25.4944 44.0001 23.7242ZM35.4666 23.7242V15.1738C35.4679 13.4062 34.0363 11.9706 32.2674 11.968C30.4985 11.9693 29.0656 13.4049 29.0669 15.1738V23.7242C29.0643 25.4931 30.4972 26.9286 32.2661 26.9312C34.035 26.9299 35.4679 25.4944 35.4666 23.7242Z"
                  fill="#2EB67D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.2661 44.0322C34.035 44.0309 35.4679 42.5953 35.4666 40.8264C35.4679 39.0575 34.035 37.622 32.2661 37.6207H29.0656V40.8264C29.0642 42.594 30.4972 44.0295 32.2661 44.0322ZM32.2661 35.4804H40.7995C42.5684 35.4791 44.0013 34.0436 44 32.2747C44.0026 30.5058 42.5697 29.0702 40.8008 29.0676H32.2674C30.4985 29.0689 29.0656 30.5045 29.0669 32.2734C29.0656 34.0436 30.4972 35.4791 32.2661 35.4804V35.4804Z"
                  fill="#ECB22E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 32.2746C11.9987 34.0435 13.4316 35.479 15.2005 35.4804C16.9694 35.479 18.4024 34.0435 18.401 32.2746V29.0688H15.2005C13.4316 29.0702 11.9987 30.5057 12 32.2746ZM20.5334 32.2746V40.825C20.5308 42.5939 21.9637 44.0295 23.7326 44.0321C25.5016 44.0308 26.9345 42.5952 26.9332 40.8263V32.2772C26.9358 30.5083 25.5029 29.0728 23.7339 29.0702C21.9637 29.0702 20.5321 30.5057 20.5334 32.2746C20.5334 32.2759 20.5334 32.2746 20.5334 32.2746Z"
                  fill="#E01E5A"
                />
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-amber-500">
                Slack API
              </span>
              <h3 className="text-xl font-semibold dark:hover:text-light">
                Slack
              </h3>
              <p className="mt-3 text-[#c7cdce]">
                Email collaboration and email service desk made easy.
              </p>
            </div>
            <div className="flex mt-auto border-t divide-x border-border divide-border dark:divide-muted dark:border-muted">
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-bl-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View sample
              </a>
              <a
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium align-middle transition-all shadow-sm rounded-br-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-muted dark:bg-dark dark:hover:bg-dark dark:hover:text-light dark:focus:ring-offset-dark sm:p-4"
                href="#"
              >
                View API
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <a
            className="flex flex-col transition border shadow-sm border-border group rounded-xl hover:shadow-md dark:border-muted dark:bg-dark bg-[#fff]"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                </svg>

                <div className="ml-5 grow">
                  <h3 className="font-semibold">Ask our community</h3>
                  <p className="text-sm text-[#c7cdce]">
                    Get help from 40k+ Preline users
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a
            className="flex flex-col transition border shadow-sm border-border group rounded-xl hover:shadow-md dark:border-muted dark:bg-dark bg-[#fff]"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                  <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>

                <div className="ml-5 grow">
                  <h3 className="font-semibold">Get help in the app</h3>
                  <p className="text-sm text-[#c7cdce]">
                    Just head to «Help» in the app
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a
            className="flex flex-col transition border shadow-sm group border-border rounded-xl hover:shadow-md dark:border-muted dark:bg-dark bg-[#fff]"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
                </svg>

                <div className="ml-5 grow">
                  <h3 className="font-semibold">Email us</h3>
                  <p className="text-sm text-[#c7cdce]">
                    Reach us at{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-500">
                      info@site.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default HomePage;
