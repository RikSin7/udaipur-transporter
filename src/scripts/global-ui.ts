function initGlobalUI() {
  // 1. Accordion Logic
  const accordionGroups = document.querySelectorAll('.faq-group');
  accordionGroups.forEach((group) => {
    if ((group as HTMLElement).dataset.init === "true") return;
    (group as HTMLElement).dataset.init = "true";

    const toggleFaq = (item: HTMLElement, open: boolean) => {
      item.setAttribute("data-open", String(open));
      const trigger = item.querySelector(".faq-trigger");
      const content = item.querySelector(".faq-content") as HTMLElement;
      const icon = item.querySelector(".faq-icon") as HTMLElement;

      if (trigger) trigger.setAttribute("aria-expanded", String(open));
      if (content) {
        content.style.maxHeight = open ? `${content.scrollHeight}px` : "0px";
        content.style.opacity = open ? "1" : "0";
      }
      if (icon) icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
    };

    group.addEventListener("click", (e) => {
      const trigger = (e.target as HTMLElement).closest(".faq-trigger");
      if (!trigger) return;

      const currentItem = trigger.closest(".faq-item") as HTMLElement;
      const isOpen = currentItem.getAttribute("data-open") === "true";

      // Close all currently open items in this group
      group
        .querySelectorAll('.faq-item[data-open="true"]')
        .forEach((openItem) => {
          if (openItem !== currentItem)
            toggleFaq(openItem as HTMLElement, false);
        });

      // Toggle clicked item
      toggleFaq(currentItem, !isOpen);
    });

    // Initialize height and state for any item open by default
    group
      .querySelectorAll('.faq-item[data-open="true"]')
      .forEach((item) => toggleFaq(item as HTMLElement, true));
  });

  // 2. Date Min-Today Validation
  const dateInputs = document.querySelectorAll('input[type="date"].date-min-today');
  if (dateInputs.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    dateInputs.forEach((input) => {
      (input as HTMLInputElement).min = today;
    });
  }

  // 3. Web3Forms Dynamic Redirect Origin Setup
  const redirectInputs = document.querySelectorAll('.web3-redirect');
  redirectInputs.forEach((el) => {
    if (el instanceof HTMLInputElement) {
      el.value = window.location.origin + "/thank-you/";
    }
  });
}

// Register for Astro View Transitions (ClientRouter)
document.addEventListener("astro:page-load", initGlobalUI);
