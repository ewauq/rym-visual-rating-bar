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
  // src/builder/bar-container.ts
  var BarContainerNode = () => {
    const node = document.createElement("div");
    node.setAttribute("userscript-node", "true");
    node.id = "userscript-bar-container";
    node.style.borderRadius = "25px";
    node.style.boxSizing = "border-box";
    node.style.display = "flex";
    node.style.fontSize = "0";
    node.style.height = "30px";
    node.style.justifyContent = "right";
    node.style.marginTop = "10px";
    node.style.overflow = "hidden";
    node.style.width = "100%";
    return node;
  };

  // src/builder/bar-mask.ts
  var BarMaskNode = () => {
    const node = document.createElement("div");
    node.id = "userscript-bar-mask";
    node.style.backgroundColor = "#f2f2f2";
    return node;
  };

  // src/constant/theme.ts
  var themes = {
    default5: ["#dc231c", "#fd7902", "#fdd514", "#62bd21", "#018ea6"],
    default10: [
      "#dc231c",
      "#f03c03",
      "#fd7902",
      "#fda506",
      "#fdd514",
      "#62bd21",
      "#0b9e53",
      "#018ea6",
      "#015ca1",
      "#163993"
    ]
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
        case "blend":
          cssValue = `${color} ${currentStepPercentage}%`;
          break;
        case "gradual":
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
    console.log(gradientColors);
    return `linear-gradient(to right, ${gradientColors.join(", ")})`;
  };

  // src/main.ts
  var releaseInfoLabelsNodes = ReleaseInfoLabelsNode();
  var releaseInfoLabelsAdNode = ReleaseInfoLabelsAdNode();
  var ratingNode = RatingTextNode();
  var ratingNodeParent = ratingNode?.parentNode?.parentNode;
  var barContainerNode = BarContainerNode();
  var barMaskNode = BarMaskNode();
  var ratingText = ratingNode.textContent?.trim();
  if (!ratingText)
    throw new Error("Rating text not found");
  var releaseRating = parseFloat(ratingText);
  var releaseRatingPercentage = (releaseRating * 100 / 5).toFixed(2);
  releaseInfoLabelsNodes.forEach((node) => node.style.verticalAlign = "top");
  releaseInfoLabelsAdNode?.remove();
  ratingNodeParent?.appendChild(barContainerNode);
  barContainerNode?.appendChild(barMaskNode);
  barMaskNode.style.width = `${releaseRatingPercentage}%`;
  barMaskNode.style.width = `${100 - parseFloat(releaseRatingPercentage)}%`;
  barContainerNode.title = `${releaseRating} / 5 (${releaseRatingPercentage}%)`;
  barContainerNode.style.background = generateLinearGradientValue(themes.default10, "gradual");
})();
