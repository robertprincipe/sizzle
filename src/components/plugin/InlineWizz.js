export default class MarkerTool {
  _state;
  button;
  api;
  tag;
  class;
  paraphraseTone;
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;

    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this._state = false;

    this.tag = "SPAN";
    this.class = "cdx-paragraph";
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML =
      '<svg class="w-4 h-4" style="width: 16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range) {
    console.log(range);
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range) {
    const selectedText = range.extractContents();

    const mark = document.createElement(this.tag);

    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    console.log("text", text);

    mark.remove();

    range.insertNode(text);
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag);

    console.log(mark);

    this.state = !!mark;

    if (this.state) {
      this.showActions(mark);
    } else {
      this.hideActions();
    }
  }

  renderActions() {
    this.paraphraseTone = document.createElement("input");
    this.paraphraseTone.classList.add("inline-wizz");
    this.paraphraseTone.text = "color";
    this.paraphraseTone.placeholder = "¿Qué tono quieres?";

    return this.paraphraseTone;
  }

  showActions(mark) {
    const { innerHTML } = mark;
    this.paraphraseTone.value = innerHTML;
    this.paraphraseTone.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        mark.innerHTML = this.paraphraseTone.value;
      }
    });

    this.paraphraseTone.hidden = false;
  }

  hideActions() {
    this.paraphraseTone.removeEventListener("keydown", (e) => {});
    this.paraphraseTone.hidden = true;
  }

  //   convertToHex(color) {
  //     const rgb = color.match(/(\d+)/g);

  //     if (!rgb) return;

  //     let hexr = parseInt(rgb[0]).toString(16);
  //     let hexg = parseInt(rgb[1]).toString(16);
  //     let hexb = parseInt(rgb[2]).toString(16);

  //     hexr = hexr.length === 1 ? "0" + hexr : hexr;
  //     hexg = hexg.length === 1 ? "0" + hexg : hexg;
  //     hexb = hexb.length === 1 ? "0" + hexb : hexb;

  //     return "#" + hexr + hexg + hexb;
  //   }

  static get sanitize() {
    return {
      mark: {
        class: "cdx-marker",
      },
    };
  }

  get shortcut() {
    return "CMD+M";
  }

  clear() {
    // cuando se cierra o se hacer click  fuera del contexto
    this.hideActions();
  }
}
