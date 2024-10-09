import Head from "@/components/shared/Head";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CardGlowing from "./Blog/card-glowing";

const PricingPage = () => {
  return (
    <>
      <Head title="Precios" />
      <div className="overflow-hidden">
        <div className="relative">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-2xl mx-auto mb-8 text-center lg:mb-14">
              <h2 className="text-3xl font-bold lg:text-4xl ">
                Solo, agency or team? We’ve got you covered.
              </h2>
            </div>

            <div className="relative xl:w-10/12 xl:mx-auto">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <CardGlowing>
                  <div className="absolute z-10 w-full font-bold text-center rotate-45 translate-x-1/2 bg-green-600 rounded-md right-10 top-10">
                    $30 off
                  </div>
                  <div className="z-10 flex flex-col w-full h-full gap-4">
                    <div className="flex items-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="flex w-10 h-10 rounded-full stroke-white/40"
                        >
                          <circle cx="12" cy="8" r="5"></circle>
                          <path d="M20 21a8 8 0 1 0-16 0"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-base font-semibold leading-7">
                          Personal
                        </h2>
                        <p className="text-sm leading-5 text-foreground/70">
                          For individual developers and freelancers.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-7xl text-foreground">
                        $49
                      </span>
                      <span className="text-4xl font-bold text-gray-600 line-through dark:text-gray-400">
                        $79
                      </span>
                    </div>
                    <p className="text-sm font-normal tracking-tight text-foreground">
                      Beautifully crafted React + Tailwind CSS + Framer Motion
                      components and templates for your next web project.
                    </p>
                    <a
                      target="_blank"
                      className="relative inline-flex items-center justify-center w-full h-10 gap-1 px-8 overflow-hidden text-lg font-semibold tracking-tighter transition-all duration-300 ease-out rounded-sm shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 group transform-gpu ring-offset-current hover:ring-2 hover:ring-primary hover:ring-offset-2"
                      href="https://buy.stripe.com/dR67vD4Vu4jAekwfZ2?prefilled_promo_code=ONEDAYSPECIAL"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 ease-out translate-x-12 bg-white rotate-12 transform-gpu opacity-10 group-hover:-translate-x-96 dark:bg-black"></span>
                      <p>Get Lifetime Access</p>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-all duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <hr className="w-full h-px m-0 border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
                    <div>
                      <p className="pb-2 font-medium text-foreground">
                        What's included:
                      </p>
                      <ul className="flex flex-col gap-2 font-normal">
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          100+ components (coming soon)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          50+ building blocks (coming soon)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          5+ full templates (coming soon)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Dark mode support
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Lifetime access
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Free lifetime updates
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Use on unlimited projects
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Single developer license
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardGlowing>
                <CardGlowing>
                  <div className="absolute z-10 w-full font-bold text-center rotate-45 translate-x-1/2 bg-green-600 rounded-md right-10 top-10">
                    30% off
                  </div>
                  <div className="z-10 flex flex-col w-full h-full gap-4">
                    <div className="flex items-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="flex w-10 h-10 rounded-full stroke-white/40"
                        >
                          <path d="M14 19a6 6 0 0 0-12 0"></path>
                          <circle cx="8" cy="9" r="4"></circle>
                          <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-base font-semibold leading-7">
                          Teams
                        </h2>
                        <p className="text-sm leading-5 text-foreground/70">
                          For product teams, agencies and startups.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-7xl text-foreground">
                        $349
                      </span>
                      <span className="text-4xl font-bold text-gray-600 line-through dark:text-gray-400">
                        $499
                      </span>
                    </div>
                    <p className="text-sm font-normal tracking-tight text-foreground">
                      Beautifully crafted React + Tailwind CSS + Framer Motion
                      components and templates for your next web project.
                    </p>
                    <a
                      target="_blank"
                      className="relative inline-flex items-center justify-center w-full h-10 gap-1 px-8 overflow-hidden text-lg font-semibold tracking-tighter transition-all duration-300 ease-out rounded-sm shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 group transform-gpu ring-offset-current hover:ring-2 hover:ring-primary hover:ring-offset-2"
                      href="https://buy.stripe.com/eVabLTafO5nE4JWbIN?prefilled_promo_code=EARLYBIRDTEAM"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 ease-out translate-x-12 bg-white rotate-12 transform-gpu opacity-10 group-hover:-translate-x-96 dark:bg-black"></span>
                      <p>Get Lifetime Access</p>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-all duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <hr className="w-full h-px m-0 border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
                    <div>
                      <p className="pb-2 font-medium text-foreground">
                        Everything in Personal, plus:
                      </p>
                      <ul className="flex flex-col gap-2 font-normal">
                        <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-400"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          10 developer licenses
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardGlowing>
              </div>

              <div className="absolute top-0 right-0 hidden translate-x-16 translate-y-16 md:block">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 hidden -translate-x-16 translate-y-16 md:block">
                <svg
                  className="w-56 h-auto text-cyan-500"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    stroke-width="7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mt-7">
              <p className="text-xs">Prices in USD. Taxes may apply.</p>
            </div>
          </div>

          {/* <div className="absolute top-1/2 left-1/2 -z-[1] transform -translate-y-1/2 -translate-x-1/2 w-[340px] h-[340px] border border-dashed border-violet-200 rounded-full dark:border-violet-900/60"></div>
          <div className="absolute top-1/2 left-1/2 -z-[1] transform -translate-y-1/2 -translate-x-1/2 w-[575px] h-[575px] border border-dashed border-violet-200 rounded-full opacity-80 dark:border-violet-900/60"></div>
          <div className="absolute top-1/2 left-1/2 -z-[1] transform -translate-y-1/2 -translate-x-1/2 w-[840px] h-[840px] border border-dashed border-violet-200 rounded-full opacity-60 dark:border-violet-900/60"></div>
          <div className="absolute top-1/2 left-1/2 -z-[1] transform -translate-y-1/2 -translate-x-1/2 w-[1080px] h-[1080px] border border-dashed border-violet-200 rounded-full opacity-40 dark:border-violet-900/60"></div> */}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28 mx-auto">
          <div aria-hidden="true" className="flex absolute left-0 -z-[1]">
            <div className="bg-purple-200 opacity-20 blur-3xl w-[1036px] h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
          </div>

          <div className="lg:grid lg:grid-cols-6 lg:gap-8 lg:items-center">
            <div className="hidden lg:block lg:col-span-2">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Image Description"
              />
            </div>

            <div className="lg:col-span-4">
              <blockquote>
                <svg
                  className="w-24 h-auto mb-4"
                  viewBox="-0.3 0 320.3999999999999 99.9"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2500"
                  height="779"
                >
                  <path
                    d="M168.7 25.1c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5 2.8-6.5 6.5-6.5c3.7.1 6.5 3 6.5 6.5zm-26.8 13.1v1.6s-3.1-4-9.7-4c-10.9 0-19.4 8.3-19.4 19.8 0 11.4 8.4 19.8 19.4 19.8 6.7 0 9.7-4.1 9.7-4.1V73c0 .8.6 1.4 1.4 1.4h8.1V36.8h-8.1c-.8 0-1.4.7-1.4 1.4zm0 24.1c-1.5 2.2-4.5 4.1-8.1 4.1-6.4 0-11.3-4-11.3-10.8s4.9-10.8 11.3-10.8c3.5 0 6.7 2 8.1 4.1zm15.5-25.5h9.6v37.6h-9.6zm143.4-1c-6.6 0-9.7 4-9.7 4V18.7h-9.6v55.7h8.1c.8 0 1.4-.7 1.4-1.4v-1.7s3.1 4.1 9.7 4.1c10.9 0 19.4-8.4 19.4-19.8s-8.5-19.8-19.3-19.8zm-1.6 30.5c-3.7 0-6.6-1.9-8.1-4.1V48.8c1.5-2 4.7-4.1 8.1-4.1 6.4 0 11.3 4 11.3 10.8s-4.9 10.8-11.3 10.8zm-22.7-14.2v22.4h-9.6V53.2c0-6.2-2-8.7-7.4-8.7-2.9 0-5.9 1.5-7.8 3.7v26.2h-9.6V36.8h7.6c.8 0 1.4.7 1.4 1.4v1.6c2.8-2.9 6.5-4 10.2-4 4.2 0 7.7 1.2 10.5 3.6 3.4 2.8 4.7 6.4 4.7 12.7zm-57.7-16.3c-6.6 0-9.7 4-9.7 4V18.7h-9.6v55.7h8.1c.8 0 1.4-.7 1.4-1.4v-1.7s3.1 4.1 9.7 4.1c10.9 0 19.4-8.4 19.4-19.8.1-11.4-8.4-19.8-19.3-19.8zm-1.6 30.5c-3.7 0-6.6-1.9-8.1-4.1V48.8c1.5-2 4.7-4.1 8.1-4.1 6.4 0 11.3 4 11.3 10.8s-4.9 10.8-11.3 10.8zm-26-30.5c2.9 0 4.4.5 4.4.5v8.9s-8-2.7-13 3v26.3H173V36.8h8.1c.8 0 1.4.7 1.4 1.4v1.6c1.8-2.1 5.7-4 8.7-4zM91.5 71c-.5-1.2-1-2.5-1.5-3.6-.8-1.8-1.6-3.5-2.3-5.1l-.1-.1C80.7 47.2 73.3 32 65.5 17l-.3-.6c-.8-1.5-1.6-3.1-2.4-4.7-1-1.8-2-3.7-3.6-5.5C56 2.2 51.4 0 46.5 0c-5 0-9.5 2.2-12.8 6-1.5 1.8-2.6 3.7-3.6 5.5-.8 1.6-1.6 3.2-2.4 4.7l-.3.6C19.7 31.8 12.2 47 5.3 62l-.1.2c-.7 1.6-1.5 3.3-2.3 5.1-.5 1.1-1 2.3-1.5 3.6C.1 74.6-.3 78.1.2 81.7c1.1 7.5 6.1 13.8 13 16.6 2.6 1.1 5.3 1.6 8.1 1.6.8 0 1.8-.1 2.6-.2 3.3-.4 6.7-1.5 10-3.4 4.1-2.3 8-5.6 12.4-10.4 4.4 4.8 8.4 8.1 12.4 10.4 3.3 1.9 6.7 3 10 3.4.8.1 1.8.2 2.6.2 2.8 0 5.6-.5 8.1-1.6 7-2.8 11.9-9.2 13-16.6.8-3.5.4-7-.9-10.7zm-45.1 5.2C41 69.4 37.5 63 36.3 57.6c-.5-2.3-.6-4.3-.3-6.1.2-1.6.8-3 1.6-4.2 1.9-2.7 5.1-4.4 8.8-4.4s7 1.6 8.8 4.4c.8 1.2 1.4 2.6 1.6 4.2.3 1.8.2 3.9-.3 6.1-1.2 5.3-4.7 11.7-10.1 18.6zm39.9 4.7c-.7 5.2-4.2 9.7-9.1 11.7-2.4 1-5 1.3-7.6 1-2.5-.3-5-1.1-7.6-2.6-3.6-2-7.2-5.1-11.4-9.7 6.6-8.1 10.6-15.5 12.1-22.1.7-3.1.8-5.9.5-8.5-.4-2.5-1.3-4.8-2.7-6.8-3.1-4.5-8.3-7.1-14.1-7.1s-11 2.7-14.1 7.1c-1.4 2-2.3 4.3-2.7 6.8-.4 2.6-.3 5.5.5 8.5 1.5 6.6 5.6 14.1 12.1 22.2-4.1 4.6-7.8 7.7-11.4 9.7-2.6 1.5-5.1 2.3-7.6 2.6-2.7.3-5.3-.1-7.6-1-4.9-2-8.4-6.5-9.1-11.7-.3-2.5-.1-5 .9-7.8.3-1 .8-2 1.3-3.2.7-1.6 1.5-3.3 2.3-5l.1-.2c6.9-14.9 14.3-30.1 22-44.9l.3-.6c.8-1.5 1.6-3.1 2.4-4.6.8-1.6 1.7-3.1 2.8-4.4 2.1-2.4 4.9-3.7 8-3.7s5.9 1.3 8 3.7c1.1 1.3 2 2.8 2.8 4.4.8 1.5 1.6 3.1 2.4 4.6l.3.6c7.6 14.9 15 30.1 21.9 45v.1c.8 1.6 1.5 3.4 2.3 5 .5 1.2 1 2.2 1.3 3.2.8 2.6 1.1 5.1.7 7.7z"
                    fill="#ff5a5f"
                  />
                </svg>

                <p className="text-xl font-medium lg:text-2xl lg:leading-normal dark:text-muted">
                  To say that switching to Preline has been life-changing is an
                  understatement. My business has tripled and I got my life
                  back.
                </p>

                <footer className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 lg:hidden">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                        alt="Image Description"
                      />
                    </div>
                    <div className="ml-4 lg:ml-0">
                      <p className="font-medium dark:text-muted">
                        Nicole Grazioso
                      </p>
                      <p className="text-sm text-dark dark">Head of Finance</p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
