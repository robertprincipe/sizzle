const FaqPage = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-light">
              Frequently
              <br />
              asked questions
            </h2>
            <p className="hidden mt-1 text-dark md:block dark:text-muted">
              Answers to the most frequently asked questions.
            </p>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="divide-y divide-muted hs-accordion-group dark:divide-dark">
            <div
              className="pb-3 hs-accordion active"
              id="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
              >
                Can I cancel at anytime?
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    Yes, you can cancel anytime no questions are asked while you
                    cancel but we would highly appreciate if you will give us
                    some feedback.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pt-6 pb-3 hs-accordion"
              id="hs-basic-with-title-and-arrow-stretched-heading-two"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
              >
                My team has credits. How do we use them?
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    Once your team signs up for a subscription plan. This is
                    where we sit down, grab a cup of coffee and dial in the
                    details.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pt-6 pb-3 hs-accordion"
              id="hs-basic-with-title-and-arrow-stretched-heading-three"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
              >
                How does Preline's pricing work?
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    Our subscriptions are tiered. Understanding the task at hand
                    and ironing out the wrinkles is key.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pt-6 pb-3 hs-accordion"
              id="hs-basic-with-title-and-arrow-stretched-heading-four"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
              >
                How secure is Preline?
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-four"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    Protecting the data you trust to Preline is our first
                    priority. This part is really crucial in keeping the project
                    in line to completion.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pt-6 pb-3 hs-accordion"
              id="hs-basic-with-title-and-arrow-stretched-heading-five"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five"
              >
                How do I get access to a theme I purchased?
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-five"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    If you lose the link for a theme you purchased, don't panic!
                    We've got you covered. You can login to your account, tap
                    your avatar in the upper right corner, and tap Purchases. If
                    you didn't create a login or can't remember the information,
                    you can use our handy Redownload page, just remember to use
                    the same email you originally made your purchases with.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pt-6 pb-3 hs-accordion"
              id="hs-basic-with-title-and-arrow-stretched-heading-six"
            >
              <button
                className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-dark transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-muted dark:text-muted dark:hover:text-muted"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six"
              >
                Upgrade License Type
                <svg
                  className="block w-3 h-3 text-dark hs-accordion-active:hidden group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hidden w-3 h-3 text-dark hs-accordion-active:block group-hover:text-muted dark:text-muted"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-six"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six"
              >
                <div className="pr-8">
                  <p className="text-dark dark:text-muted">
                    There may be times when you need to upgrade your license
                    from the original type you purchased and we have a solution
                    that ensures you can apply your original purchase cost to
                    the new license purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
