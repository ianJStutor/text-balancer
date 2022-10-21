function balanceText(elementWithText) {
    elementWithText.removeAttribute("style");
    elementWithText.style.boxSizing = "border-box";
	const { width, height } = elementWithText.getBoundingClientRect(),
		style = window.getComputedStyle(elementWithText),
		paddingTop = Number(style.getPropertyValue("padding-top").replace("px", "")) || 0,
        paddingRight = Number(style.getPropertyValue("padding-right").replace("px", "")) || 0,
        paddingBottom = Number(style.getPropertyValue("padding-bottom").replace("px", "")) || 0,
        paddingLeft = Number(style.getPropertyValue("padding-left").replace("px", "")) || 0,
		borderTop = Number(style.getPropertyValue("border-top-width").replace("px", "")) || 0,
        borderRight = Number(style.getPropertyValue("border-right-width").replace("px", "")) || 0,
        borderBottom = Number(style.getPropertyValue("border-bottom-width").replace("px", "")) || 0,
        borderLeft = Number(style.getPropertyValue("border-left-width").replace("px", "")) || 0,
		[maxPadL, maxPadR] = getMaxPadding(elementWithText, {width: width - borderLeft - borderRight, height: height - paddingTop - paddingBottom - borderTop - borderBottom, paddingLeft, paddingRight});
    if (maxPadL > paddingLeft) elementWithText.style.paddingLeft = maxPadL + "px";
	if (maxPadR > paddingRight) elementWithText.style.paddingRight = maxPadR + "px";
}

function getMaxPadding(el, {width, height, paddingLeft, paddingRight} = {}) {
	const div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "-9999px";
	div.style.width = width + "px";
	div.style.boxSizing = "border-box";
	div.dataset.padL = paddingLeft ?? 0;
	div.dataset.padR = paddingRight ?? 0;
	div.innerHTML = el.innerHTML;
	document.body.append(div);
	while(getHeight() <= height && div.offsetWidth <= width){
		div.dataset.padL++;
		div.dataset.padR++;
	}
    const isSingleLine = div.offsetWidth > width ? true : false,
          padL = isSingleLine ? paddingLeft ?? 0 : div.dataset.padL - 1,
		  padR = isSingleLine ? paddingRight ?? 0 : div.dataset.padR - 1;
	div.remove();
	return [padL, padR];

	function getHeight(){
		div.style.paddingLeft = div.dataset.padL + "px";
		div.style.paddingRight = div.dataset.padR + "px";
		return div.offsetHeight;
	}
}

export { balanceText };
