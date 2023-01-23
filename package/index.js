const jq = (arg) => {
  let elements;

  if (typeof arg === "function") {
    document.addEventListener("DOMContentLoaded", arg);
  }

  //HTMLElement
  if (arg instanceof HTMLElement) {
    elements = [arg];
  }

  //CSS selector
  if (typeof arg === "string") {
    elements = document.querySelectorAll(arg);
  }

  elements.css = (...args) => {
    const [property, value] = args;
    const isString = typeof property === "string";

    elements.forEach((el) => {
      if (isString) el.style[property] = value;
      else {
        Object.entries(property).forEach(([property, value]) => {
          el.style[property] = value;
        });
      }
    });
    return elements;
  };

  elements.on = (event, callback) => {
    elements.forEach((el) => {
      el.addEventListener(event, callback);
    });
    return elements;
  };

  elements.each = (fn) => {
    elements.forEach((el, index) => {
      fn(index, el);
    });
    return elements;
  };

  elements.fadeIn = (duration = 1000) => {
    elements.forEach((el, index) => {
      const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration,
      });

      animation.onfinish = () => (el.style.opacity = 1);
    });
    return elements;
  };

  elements.toogle = () => {
    elements.forEach((el, index) => {
      el.style.opacity = el.style.opacity === "0" ? "1" : "0";
    });
    return elements;
  };

  return elements;
};

jq(() => {
  jq("#toogle")
    .css("background", "green")
    .css("border", "blue")
    .css({
      padding: "16px",
      borderRadius: "4px",
    })
    .on("click", () => {
      jq("#message").toogle();
    });

  jq("#fadeIn")
    .css("background", "red")
    .css("border", "blue")
    .css({
      padding: "16px",
      borderRadius: "4px",
    })
    .on("click", () => {
      jq("#message").fadeIn();
    });

  jq("li").each((index, el) => {
    if (index === 0) jq(el).css("color", "green");
    if (index === 1) jq(el).css("color", "orange");
    if (index === 2) jq(el).css("color", "purple");
  });
});

module.exports = jq
