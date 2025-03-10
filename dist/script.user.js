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
  // src/dom/node-creator.ts
  class NodeCreator {
    nodeSelector;
    constructor(nodeSelector) {
      this.nodeSelector = nodeSelector;
    }
    createBarWrapperNode() {
      const node = document.createElement("div");
      node.setAttribute("userscript-node", "true");
      node.id = "userscript-bar-wrapper";
      node.style.display = "flex";
      node.style.gap = "10px";
      node.style.marginTop = "10px";
      node.style.width = "100%";
      return node;
    }
    createBarContainerNode() {
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
    }
    createBarMaskNode() {
      const node = document.createElement("div");
      node.id = "userscript-bar-mask";
      node.style.backgroundColor = "#f2f2f2";
      node.style.transition = "width 400ms cubic-bezier(.25, 1, 0.5, 1)";
      return node;
    }
    createSettingsButtonNode() {
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
      const settingsContainerNode = this.nodeSelector.getSettingsPanelContainerNode();
      node.onclick = () => settingsContainerNode.style.display = settingsContainerNode.style.display === "none" ? "flex" : "none";
      return node;
    }
    createSettingsPanelContainerNode() {
      const node = document.createElement("div");
      node.setAttribute("userscript-node", "true");
      node.id = "userscript-settings-panel-container";
      node.style.padding = "10px";
      node.style.border = "1px solid red";
      node.style.marginTop = "10px";
      node.style.width = "100%";
      node.style.backgroundColor = "#fbfbfb";
      node.style.border = "1px solid #dddddd";
      node.style.borderRadius = "5px";
      node.style.display = "none";
      return node;
    }
  }

  // src/dom/node-selector.ts
  class NodeSelector {
    getRatingNode() {
      const node = document.querySelector(".avg_rating");
      if (!node)
        throw new Error("Rating node not found");
      return node;
    }
    getReleaseInfoLabelsNodes() {
      const nodes = document.querySelectorAll(".info_hdr");
      if (!nodes.length)
        throw new Error("Release info labels not found");
      return nodes;
    }
    getReleaseInfoLabelsAdNode() {
      return document.querySelector(".album_info_outer > tbody > tr > td:nth-of-type(2)");
    }
    getBarWrapperNode() {
      const node = document.querySelector("#userscript-bar-wrapper");
      if (!node)
        throw new Error("Bar wrapper node not found");
      return node;
    }
    getSettingsPanelContainerNode() {
      const node = document.querySelector("#userscript-settings-panel-container");
      if (!node)
        throw new Error("Settings panel container node not found");
      return node;
    }
  }

  // src/dom/settings-panel-builder.ts
  class SettingsPanelBuilder {
    nodeSelector;
    nodeCreator;
    constructor(nodeSelector, nodeCreator) {
      this.nodeSelector = nodeSelector;
      this.nodeCreator = nodeCreator;
    }
    build() {
      const barWrapperNode = this.nodeSelector.getBarWrapperNode();
      const settingsPanelContainerNode = this.nodeCreator.createSettingsPanelContainerNode();
      barWrapperNode.after(settingsPanelContainerNode);
      const settingsButtonNode = this.nodeCreator.createSettingsButtonNode();
      barWrapperNode.appendChild(settingsButtonNode);
    }
  }

  // src/constant/theme.ts
  var theme = {
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
  var generateGradientValues = (colors, style) => {
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

  // src/helper/get-release-rating.ts
  var getReleaseRating = (ratingNode) => {
    const ratingText = ratingNode.textContent?.trim();
    if (!ratingText)
      throw new Error("Rating text not found");
    const releaseRating = parseFloat(ratingText);
    const releaseRatingPercentage = releaseRating * 100 / 5;
    return { releaseRating, releaseRatingPercentage };
  };

  // src/dom/bar-builder.ts
  var ANIMATION = true;

  class BarBuilder {
    nodeSelector;
    nodeCreator;
    constructor(nodeSelector, nodeCreator) {
      this.nodeSelector = nodeSelector;
      this.nodeCreator = nodeCreator;
    }
    build() {
      this.nodeSelector.getReleaseInfoLabelsNodes().forEach((node) => {
        node.style.verticalAlign = "top";
      });
      this.nodeSelector.getReleaseInfoLabelsAdNode()?.remove();
      const ratingNode = this.nodeSelector.getRatingNode();
      const barWrapperNode = this.nodeCreator.createBarWrapperNode();
      const ratingParentNode = ratingNode.parentNode?.parentNode;
      const barContainerNode = this.nodeCreator.createBarContainerNode();
      const barMaskNode = this.nodeCreator.createBarMaskNode();
      barContainerNode.appendChild(barMaskNode);
      barWrapperNode.appendChild(barContainerNode);
      ratingParentNode?.appendChild(barWrapperNode);
      const { releaseRating, releaseRatingPercentage } = getReleaseRating(ratingNode);
      barMaskNode.style.width = ANIMATION ? `100%` : `${100 - releaseRatingPercentage}%`;
      barContainerNode.title = `${releaseRating}/5 (${releaseRatingPercentage.toFixed(2)}%)`;
      barContainerNode.style.background = generateGradientValues(theme.default10, "block");
      const visibilityCheckInterval = window.setInterval(function() {
        if (barContainerNode) {
          barMaskNode.style.width = `${100 - releaseRatingPercentage}%`;
          window.clearInterval(visibilityCheckInterval);
        }
      }, 100);
    }
  }

  // src/main.ts
  console.log("\uD83D\uDD04 Loading the userscript...");
  var nodeSelector = new NodeSelector;
  var nodeCreator = new NodeCreator(nodeSelector);
  var barBuilder = new BarBuilder(nodeSelector, nodeCreator);
  var settingsPanelBuilder = new SettingsPanelBuilder(nodeSelector, nodeCreator);
  barBuilder.build();
  settingsPanelBuilder.build();
  console.log("✅ Userscript loaded!");
})();
