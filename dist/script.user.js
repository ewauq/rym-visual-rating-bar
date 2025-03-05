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
  // src/node/rating-text.ts
  var RatingTextNode = () => {
    const node = document.querySelector("span.avg_rating");
    if (!node)
      throw new Error("Rating node not found");
    return node;
  };

  // src/node/bar-container.ts
  var BarContainerNode = () => {
    const node = document.createElement("div");
    node.setAttribute("userscript-node", "true");
    node.id = "userscript-bar-container";
    node.style.display = "flex";
    node.style.justifyContent = "right";
    node.style.boxSizing = "border-box";
    node.style.height = "30px";
    node.style.width = "100%";
    node.style.marginTop = "10px";
    node.style.borderRadius = "5px";
    node.style.border = "1px solid #dbdbdb";
    node.style.background = "linear-gradient(to right,rgb(255, 0, 0) 0%,rgb(0, 189, 16) 100%)";
    node.style.overflow = "hidden";
    node.style.fontSize = "0";
    return node;
  };

  // src/node/bar-mask.ts
  var BarMaskNode = () => {
    const node = document.createElement("div");
    node.id = "userscript-bar-mask";
    node.style.backgroundColor = "white";
    return node;
  };

  // src/node/release-info-labels.ts
  var ReleaseInfoLabels = () => {
    const nodes = document.querySelectorAll(".info_hdr");
    if (!nodes.length)
      throw new Error("Release info labels not found");
    return nodes;
  };

  // src/main.ts
  var releaseInfoLabelsNodes = ReleaseInfoLabels();
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
  ratingNodeParent?.appendChild(barContainerNode);
  barContainerNode?.appendChild(barMaskNode);
  barMaskNode.style.width = `${releaseRatingPercentage}%`;
  barMaskNode.style.width = `${100 - parseFloat(releaseRatingPercentage)}%`;
  barContainerNode.title = `${releaseRating} / 5 (${releaseRatingPercentage}%)`;
  console.log(ratingText, releaseRatingPercentage);
})();
