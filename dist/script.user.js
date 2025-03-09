// ==UserScript==
// @name         RateYourMusic - Visual Rating Bar
// @namespace    rym-visual-rating-bar
// @version      2.0.0
// @description  Adds a visual rating bar on every releases pages.
// @author       ewauq
// @supportURL   https://github.com/ewauq/userscripts/issues
// @match        https://rateyourmusic.com/release/*
// @icon         https://www.google.com/s2/favicons?domain=rateyourmusic.com
// @downloadURL  https://update.greasyfork.org/scripts/423566/RateYourMusic%20-%20Visual%20Rating%20Bar.user.js
// @updateURL    https://update.greasyfork.org/scripts/423566/RateYourMusic%20-%20Visual%20Rating%20Bar.meta.js
// ==/UserScript==


(() => {
  // src/builder/bar/bar-container.ts
  var BarContainerNode = () => {
    const node = document.createElement("div");
    node.id = "userscript-bar-container";
    node.style.borderRadius = "5px";
    node.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 0px 4px 0px inset";
    node.style.boxSizing = "border-box";
    node.style.display = "flex";
    node.style.fontSize = "0";
    node.style.height = "16px";
    node.style.justifyContent = "right";
    node.style.overflow = "hidden";
    node.style.width = "100%";
    return node;
  };

  // src/builder/bar/bar-mask.ts
  var BarMaskNode = () => {
    const node = document.createElement("div");
    node.id = "userscript-bar-mask";
    node.style.backgroundColor = "#f2f2f2";
    node.style.transition = "width 400ms cubic-bezier(.25, 1, 0.5, 1)";
    return node;
  };

  // src/builder/bar/bar-wrapper.ts
  var BarWrapperNode = () => {
    const node = document.createElement("div");
    node.setAttribute("userscript-node", "true");
    node.id = "userscript-bar-wrapper";
    node.style.display = "flex";
    node.style.gap = "10px";
    node.style.marginTop = "10px";
    node.style.width = "100%";
    return node;
  };

  // src/builder/settings/settings-button.ts
  var SettingsButtonNode = () => {
    const node = document.createElement("button");
    node.id = "userscript-settings-button";
    node.style.backgroundColor = "blue";
    node.style.border = "0";
    node.style.cursor = "pointer";
    node.style.fontSize = "16px";
    node.style.height = "16px";
    node.style.margin = "0";
    node.style.width = "16px";
    node.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nK2T4Q3CIBCFvwH8JT+pe3SM7qHdzugA3QDH6BAYzCMhVyW0+BIS4N49HscBv+GAqHGmASfAF+uxEEjzDC/uJnkBVmACZiAUAkF7kziLFfEKxMaxGrcfTDsEEneDeYfAzVZ7BF6GdJfNAXiYWFCOo3JKSsy4VHh0CzjZKZ8tyvag5GftCt1F/Msz+t5Gsq2cLNpWvtZaOYsc/kzf0PSd3/xGibT0C78vAAAAAElFTkSuQmCC) no-repeat";
    node.style.backgroundSize = "contain";
    node.style.opacity = "0.2";
    node.setAttribute("title", "Open the visual bar settings");
    node.onmouseover = () => node.style.opacity = "0.6";
    node.onmouseout = () => node.style.opacity = "0.2";
    return node;
  };

  // src/builder/settings/settings-container.ts
  var SettingsContainerNode = () => {
    const node = document.createElement("div");
    node.setAttribute("userscript-node", "true");
    node.id = "userscript-settings-container";
    node.style.padding = "10px";
    node.style.border = "1px solid red";
    node.style.marginTop = "10px";
    node.style.width = "100%";
    node.style.backgroundColor = "#fbfbfb";
    node.style.border = "1px solid #dddddd";
    node.style.borderRadius = "5px";
    node.style.display = "none";
    return node;
  };

  // src/constant/theme.ts
  var themes = {
    default5: ["#ea4335", "#f27f1d", "#fbbc04", "#98b22b", "#34a853"],
    default10: [
      "#ea4335",
      "#ee6129",
      "#f27f1d",
      "#f69d11",
      "#fbbc04",
      "#cab717",
      "#98b22b",
      "#66ad3f",
      "#34a853",
      "#34a853"
    ]
  };

  // src/helper/generate-gradient.ts
  var generateLinearGradientValue = (colors, style) => {
    if (!Array.isArray(colors)) {
      return `linear-gradient(to right, ${colors} 0%, transparent 98%)`;
    }
    const stepPercentage = 100 / colors.length;
    let currentStepPercentage = 0;
    const gradientColors = colors.map((color) => {
      let cssValue = "";
      let nextStepPercentage = currentStepPercentage + stepPercentage;
      if (currentStepPercentage >= 100)
        currentStepPercentage = 98;
      if (nextStepPercentage >= 100)
        nextStepPercentage = 98;
      switch (style) {
        case "gradient":
          cssValue = `${color} ${currentStepPercentage}%`;
          break;
        case "block":
          cssValue = `${color} ${currentStepPercentage}%, ${color} ${nextStepPercentage}%`;
          break;
        default:
          cssValue = `${color} ${currentStepPercentage}%`;
          break;
      }
      currentStepPercentage = nextStepPercentage;
      return cssValue;
    });
    gradientColors.push("transparent 98%");
    return `linear-gradient(to right, ${gradientColors.join(", ")})`;
  };

  // src/selector/rating-text.ts
  var RatingTextNode = () => {
    const node = document.querySelector("span.avg_rating");
    if (!node)
      throw new Error("Rating node not found");
    return node;
  };

  // src/selector/release-info-labels.ts
  var ReleaseInfoLabelsNode = () => {
    const nodes = document.querySelectorAll(".info_hdr");
    if (!nodes.length)
      throw new Error("Release info labels not found");
    return nodes;
  };

  // src/selector/release-info-labels-ad.ts
  var ReleaseInfoLabelsAdNode = () => {
    const node = document.querySelector(".album_info_outer > tbody > tr > td:nth-of-type(2)");
    return node;
  };

  // src/main.ts
  var ANIMATION = true;
  var releaseInfoLabelsNodes = ReleaseInfoLabelsNode();
  var releaseInfoLabelsAdNode = ReleaseInfoLabelsAdNode();
  var ratingNode = RatingTextNode();
  var ratingNodeParent = ratingNode?.parentNode?.parentNode;
  var barWrapperNode = BarWrapperNode();
  var barContainerNode = BarContainerNode();
  var barMaskNode = BarMaskNode();
  var settingsButtonNode = SettingsButtonNode();
  var settingsContainerNode = SettingsContainerNode();
  var ratingText = ratingNode.textContent?.trim();
  if (!ratingText)
    throw new Error("Rating text not found");
  var releaseRating = parseFloat(ratingText);
  var releaseRatingPercentage = releaseRating * 100 / 5;
  releaseInfoLabelsNodes.forEach((node) => node.style.verticalAlign = "top");
  releaseInfoLabelsAdNode?.remove();
  barContainerNode.appendChild(barMaskNode);
  barWrapperNode.appendChild(barContainerNode);
  barWrapperNode.appendChild(settingsButtonNode);
  ratingNodeParent?.appendChild(barWrapperNode);
  barWrapperNode.after(settingsContainerNode);
  barMaskNode.style.width = ANIMATION ? `100%` : `${100 - releaseRatingPercentage}%`;
  barContainerNode.title = `${releaseRating}/5 (${releaseRatingPercentage.toFixed(2)}%)`;
  barContainerNode.style.background = generateLinearGradientValue(themes.default10, "block");
  var visibilityCheckInterval = window.setInterval(function() {
    if (barContainerNode) {
      barMaskNode.style.width = `${100 - releaseRatingPercentage}%`;
      window.clearInterval(visibilityCheckInterval);
    }
  }, 100);
  settingsButtonNode.onclick = () => settingsContainerNode.style.display = settingsContainerNode.style.display === "none" ? "flex" : "none";
})();
