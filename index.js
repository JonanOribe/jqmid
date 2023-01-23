const $ = (arg) => {
  if (typeof arg === "function") {
    document.addEventListener("DOMContentLoaded", arg);
    return;
  }

  let elements;

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
        const entriesCSS = Object.entries(property);
        entriesCSS.forEach(([property, value]) => {
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
        const animation = el.animate([
            {opacity:0},
            {opacity:1}
        ],{
            duration
        })

        animation.onfinish = () => el.style.opacity = 1
    })
    return elements
  }

  return elements;
};

$(() => {
  console.log("DOMContentLoaded");

  $("button")
    .css("background", "red")
    .css("border", "blue")
    .css({
      padding: "16px",
      borderRadius: "4px",
    })
    .on("click", () => {
      $('#message').fadeIn();
    });

  $("li").each((index, el) => {
    if (index === 0) $(el).css("color", "green");
    if (index === 1) $(el).css("color", "orange");
    if (index === 2) $(el).css("color", "yellow");
  });
});
