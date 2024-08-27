import { Formatter } from "fracturedjsonjs";
import { readAsText } from "promise-file-reader";
import is from "@sindresorhus/is";

const fmt = new Formatter();

export function useFileLoad(text: Ref<string>, error: Ref<string | null>) {
  async function handleFileChange(e: Event) {
    const f = (e.currentTarget as HTMLInputElement).files;

    if (is.nullOrUndefined(f)) {
      text.value = "";

      return;
    }

    try {
      const parsedText = JSON.parse(await readAsText(f[0]));

      text.value = fmt.Serialize(parsedText) as string;
    } catch (err) {
      error.value = err as string;
    }
  }

  return {
    handleFileChange,
  };
}
