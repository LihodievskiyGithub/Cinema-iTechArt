import { notify } from "@kyvg/vue3-notification";

export default function (errOrMessage, config) {
    console.log("!!!!!!!")
  const message =
    typeof errOrMessage === "string"
      ? errOrMessage
      : errOrMessage?.response?.data?.message;
  notify({
    ...config,
    text: message || "Unexpected error",
  });
}
