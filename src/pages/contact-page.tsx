import InputSpotlight from "@/components/input-spotlight";
import Head from "@/components/shared/Head";
import TextareaSpotlight from "@/components/textarea-spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Head title="Contacto" />

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto lg:max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
            <p className="mt-1 text-muted-foreground">
              We'd love to talk about how we can help you.
            </p>
          </div>

          <div className="grid items-center gap-6 mt-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col p-4 border border-border rounded-xl sm:p-6 lg:p-8">
              <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>

              <form>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="hs-firstname-contacts-1"
                        className="sr-only"
                      >
                        First Name
                      </label>
                      <InputSpotlight
                        type="text"
                        name="hs-firstname-contacts-1"
                        id="hs-firstname-contacts-1"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="hs-lastname-contacts-1"
                        className="sr-only"
                      >
                        Last Name
                      </label>
                      <InputSpotlight
                        type="text"
                        name="hs-lastname-contacts-1"
                        id="hs-lastname-contacts-1"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hs-email-contacts-1" className="sr-only">
                      Email
                    </label>
                    <InputSpotlight
                      type="email"
                      name="hs-email-contacts-1"
                      id="hs-email-contacts-1"
                      autoComplete="email"
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="hs-phone-number-1" className="sr-only">
                      Phone Number
                    </label>
                    <InputSpotlight
                      type="text"
                      name="hs-phone-number-1"
                      id="hs-phone-number-1"
                      placeholder="Phone Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="hs-about-contacts-1" className="sr-only">
                      Details
                    </label>
                    <TextareaSpotlight
                      id="hs-about-contacts-1"
                      name="hs-about-contacts-1"
                      rows={4}
                      placeholder="Details"
                    ></TextareaSpotlight>
                  </div>
                </div>

                <div className="grid mt-4">
                  <Button type="submit">Send inquiry</Button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">
                    We'll get back to you in 1-2 business days.
                  </p>
                </div>
              </form>
            </div>

            <div className="divide-y divide-border">
              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-1.5 text-gray-800 dark:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Knowledgebase
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We're here to help with any questions or code.
                  </p>
                  <a
                    className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Contact support
                    <svg
                      className="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-1.5 text-gray-800 dark:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    FAQ
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Search our FAQ for answers to anything you might ask.
                  </p>
                  <a
                    className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Visit FAQ
                    <svg
                      className="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-1.5 text-gray-800 dark:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m7 11 2-2-2-2" />
                  <path d="M11 13h4" />
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Developer APIs
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Check out our development quickstart guide.
                  </p>
                  <a
                    className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Contact sales
                    <svg
                      className="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 w-6 h-6 mt-1.5 text-gray-800 dark:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Contact us by email
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    If you wish to write us an email instead please use
                  </p>
                  <a
                    className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    example@site.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
