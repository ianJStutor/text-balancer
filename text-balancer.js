function balanceText(elementWithText) {
    elementWithText.style.boxSizing = "border-box";
	const { width, height } = elementWithText.getBoundingClientRect(),
		style = window.getComputedStyle(elementWithText),
		paddingTop = Number(style.getPropertyValue("padding-top").replace("px", "")) || 0,
        paddingRight = Number(style.getPropertyValue("padding-right").replace("px", "")) || 0,
        paddingBottom = Number(style.getPropertyValue("padding-bottom").replace("px", "")) || 0,
        paddingLeft = Number(style.getPropertyValue("padding-left").replace("px", "")) || 0,
		[maxPadL, maxPadR] = getMaxPadding(elementWithText, {width, height: height - paddingTop - paddingBottom, paddingLeft, paddingRight});
	elementWithText.style.paddingLeft = maxPadL + "px";
	elementWithText.style.paddingRight = maxPadR + "px";
}

function getMaxPadding(el, {width, height, paddingLeft, paddingRight} = {}) {
	const div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = "-9999px";
	div.style.width = width + "px";
	div.style.boxSizing = "border-box";
	div.dataset.padL = paddingLeft;
	div.dataset.padR = paddingRight;
	div.innerHTML = el.innerHTML;
	document.body.append(div);
	while(getHeight() <= height && div.offsetWidth <= width){
		div.dataset.padL++;
		div.dataset.padR++;
	}
	const padL = div.dataset.padL - 1,
		  padR = div.dataset.padR - 1;
	div.remove();
	return [padL, padR];

	function getHeight(){
		div.style.paddingLeft = div.dataset.padL + "px";
		div.style.paddingRight = div.dataset.padR + "px";
		return div.offsetHeight;
	}
}

export { balanceText };
