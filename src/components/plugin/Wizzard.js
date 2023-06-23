export default class Wizzard {
  data;
  wrapper;
  api;
  static get toolbox() {
    return {
      title: "Wizzard",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><rect width="18" height="10" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line></svg>`,
    };
  }

  constructor({ data, api }) {
    this.data = {
      text: data.url || "",
    };
    this.api = api;
    this.wrapper = undefined;
  }
  toolbox;
  pasteConfig;
  conversionConfig;
  isReadOnlySupported;
  isInline;
  sanitize;
  title;

  render() {
    this.wrapper = document.createElement("div");

    this.wrapper.classList.add("wizzard");

    if (this.data && this.data.url) {
      this._genetedText(this.data.url);
      return this.wrapper;
    }

    const input = document.createElement("input");

    this.wrapper.appendChild(input);

    input.placeholder = "Que contenido quiere crear...";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this._genetedText(input.value);
      }
    });

    return this.wrapper;
  }

  _genetedText(text) {
    const span = document.createElement("span");
    span.classList.add("focus:outline-none");
    span.contentEditable = "true";
    span.innerHTML = text || "";

    if (this.wrapper) {
      this.wrapper.innerHTML = "";
      this.wrapper.appendChild(span);
    }
  }

  static get sanitize() {
    return {
      generatedText: true,
    };
  }

  save(blockContent) {
    const generated = blockContent.querySelector("div");

    const sanitizerConfig = {
      div: true,
      p: true,
      i: true,
    };

    return Object.assign(this.data, {
      generatedText: generated,
    });
  }

  // static get pasteConfig() {
  //   return {
  //     tags: ["IMG"],
  //     files: {
  //       mimeTypes: ["image/*"],
  //       extensions: ["gif", "jpg", "png"], // You can specify extensions instead of mime-types
  //     },
  //     patterns: {
  //       image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
  //     },
  //   };
  // }

  // onPaste(event) {
  //   switch (event.type) {
  //     case "tag":
  //       const imgTag = event.detail.data;

  //       this._genetedText(imgTag.src);
  //       break;
  //     case "file":
  //       /* We need to read file here as base64 string */
  //       const file = event.detail.file;
  //       const reader = new FileReader();

  //       reader.onload = (loadEvent) => {
  //         this._genetedText(loadEvent.target.result);
  //       };

  //       reader.readAsDataURL(file);
  //       break;
  //     case "pattern":
  //       const src = event.detail.data;

  //       this._genetedText(src);
  //       break;
  //   }
  // }

  _toggleTune(tune) {
    this.data[tune] = !this.data[tune];
  }

  validate(savedData) {
    if (savedData) {
      return false;
    }

    return true;
  }
}
